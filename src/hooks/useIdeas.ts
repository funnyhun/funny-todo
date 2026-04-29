"use client";

import { useState, useEffect } from "react";
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

  const fetchIdeas = async () => {
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createIdea = async (idea: Partial<Idea>) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("ideas")
        .insert([{ ...idea, user_id: user.id }])
        .select();

      if (error) throw error;
      setIdeas([data[0], ...ideas]);
      return data[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateIdeaPosition = async (id: string, x: number, y: number) => {
    try {
      const { error } = await supabase
        .from("ideas")
        .update({ position_x: x, position_y: y })
        .eq("id", id);

      if (error) throw error;
      setIdeas(ideas.map(i => i.id === id ? { ...i, position_x: x, position_y: y } : i));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [user]);

  return { ideas, relations, blogEdges, loading, error, fetchIdeas, createIdea, updateIdeaPosition };
};
