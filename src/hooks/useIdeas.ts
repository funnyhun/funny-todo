"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/providers/AuthProvider";

export type IdeaType = 'idea' | 'blog';
export type IdeaStatus = 'active' | 'completed' | 'archived' | 'locked';
export type RelationType = 'prerequisite' | 'sequential';

export type Idea = {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  type: IdeaType;
  status: IdeaStatus;
  start_date: string | null;
  end_date: string | null;
  position_x: number;
  position_y: number;
  created_at: string;
  updated_at: string;
};

export type IdeaRelation = {
  id: string;
  parent_id: string;
  child_id: string;
  relation_type: RelationType;
};

export type BlogEdge = {
  id: string;
  source_idea_id: string;
  target_idea_id: string;
  label: string | null;
};

export const useIdeas = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [relations, setRelations] = useState<IdeaRelation[]>([]);
  const [blogEdges, setBlogEdges] = useState<BlogEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: ideasData, error: ideasError } = await supabase
        .from("ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (ideasError) throw ideasError;

      const { data: relationsData, error: relationsError } = await supabase
        .from("idea_relations")
        .select("*");

      if (relationsError) throw relationsError;

      const { data: edgesData, error: edgesError } = await supabase
        .from("blog_nodes")
        .select("*");

      if (edgesError) throw edgesError;

      setIdeas(ideasData || []);
      setRelations(relationsData || []);
      setBlogEdges(edgesData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createIdea = useCallback(async (idea: Partial<Idea>) => {
    if (!user) return;
    try {
      // Normalize status to lowercase if present
      const normalizedIdea = {
        ...idea,
        status: idea.status ? (idea.status.toLowerCase() as IdeaStatus) : 'active'
      };

      const { data, error } = await supabase
        .from("ideas")
        .insert([{ ...normalizedIdea, user_id: user.id }])
        .select();

      if (error) throw error;
      setIdeas(prev => [data[0], ...prev]);
      return data[0];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, [user]);

  const updateIdea = useCallback(async (id: string, updates: Partial<Idea>) => {
    try {
      // Normalize status to lowercase if present
      const normalizedUpdates = {
        ...updates,
        status: updates.status ? (updates.status.toLowerCase() as IdeaStatus) : undefined
      };

      // Remove undefined keys
      if (normalizedUpdates.status === undefined) delete normalizedUpdates.status;

      const { data, error } = await supabase
        .from("ideas")
        .update(normalizedUpdates)
        .eq("id", id)
        .select();

      if (error) throw error;
      setIdeas(prev => prev.map(i => i.id === id ? data[0] : i));
      return data[0];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, []);

  const deleteIdea = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("ideas")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setIdeas(prev => prev.filter(i => i.id !== id));
      setRelations(prev => prev.filter(r => r.parent_id !== id && r.child_id !== id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, []);

  const addRelation = useCallback(async (parent_id: string, child_id: string, type: RelationType = 'prerequisite') => {
    try {
      const { data, error } = await supabase
        .from("idea_relations")
        .insert([{ parent_id, child_id, relation_type: type }])
        .select();

      if (error) throw error;
      setRelations(prev => [...prev, data[0]]);
      return data[0];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, []);

  const removeRelation = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("idea_relations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setRelations(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, []);

  const updateIdeaPosition = useCallback(async (id: string, x: number, y: number) => {
    try {
      const { error } = await supabase
        .from("ideas")
        .update({ position_x: x, position_y: y })
        .eq("id", id);

      if (error) throw error;
      setIdeas(prev => prev.map(i => i.id === id ? { ...i, position_x: x, position_y: y } : i));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    }
  }, []);

  const addBlogEdge = useCallback(async (source_idea_id: string, target_idea_id: string, label: string | null = null) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("blog_nodes")
        .insert([{ source_idea_id, target_idea_id, label, user_id: user.id }])
        .select();

      if (error) throw error;
      setBlogEdges(prev => [...prev, data[0]]);
      return data[0];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, []);

  const removeBlogEdge = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("blog_nodes")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setBlogEdges(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  return { 
    ideas, 
    relations, 
    blogEdges, 
    loading, 
    error, 
    fetchIdeas, 
    createIdea, 
    updateIdea, 
    deleteIdea, 
    addRelation, 
    removeRelation, 
    updateIdeaPosition,
    addBlogEdge,
    removeBlogEdge
  };
};
