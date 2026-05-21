"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Idea, RelationType } from '@/types/idea';
import {
  getIdeasAPI,
  createIdeaAPI,
  updateIdeaAPI,
  deleteIdeaAPI,
  smashIdeaAPI
} from '@/api/ideas/ideas';

type IdeasContextType = {
  ideas: Idea[];
  loading: boolean;
  relations: any[];
  blogEdges: any[];
  smashIdea: (ideaId: string) => Promise<void>;
  createIdea: (idea: any) => Promise<Idea>;
  updateIdea: (id: string, updates: Partial<Idea>) => Promise<void>;
  updateIdeaPosition: (id: string, x: number, y: number) => Promise<void>;
  addRelation: (parentId: string, childId: string, type: RelationType) => Promise<void>;
  addBlogEdge: (source: string, target: string) => Promise<void>;
  removeBlogEdge: (id: string) => Promise<void>;
  removeRelation: (id: string) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  fetchIdeas: () => Promise<void>;
};

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider = ({ children }: { children: React.ReactNode }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [relations, setRelations] = useState<any[]>([]);
  const [blogEdges, setBlogEdges] = useState<any[]>([]);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const data = await getIdeasAPI();
      setIdeas(data);
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const smashIdea = async (ideaId: string) => {
    try {
      const updatedIdeas = await smashIdeaAPI(ideaId);
      setIdeas(updatedIdeas);
    } catch (error) {
      console.error('Failed to smash idea:', error);
    }
  };

  const createIdea = async (idea: any) => {
    try {
      const created = await createIdeaAPI(idea);
      setIdeas((current) => [...current, created]);
      return created;
    } catch (error) {
      console.error('Failed to create idea:', error);
      throw error;
    }
  };

  const updateIdea = async (id: string, updates: Partial<Idea>) => {
    try {
      const updated = await updateIdeaAPI(id, updates);
      setIdeas(updated);
    } catch (error) {
      console.error('Failed to update idea:', error);
    }
  };

  const updateIdeaPosition = async (id: string, x: number, y: number) => {
    try {
      const updated = await updateIdeaAPI(id, { position_x: x, position_y: y });
      setIdeas(updated);
    } catch (error) {
      console.error('Failed to update idea position:', error);
    }
  };

  const addRelation = async (parentId: string, childId: string, type: RelationType) => {
    setRelations((current) => [
      ...current,
      { id: String(current.length + 1), parent_id: parentId, child_id: childId, relation_type: type }
    ]);
  };

  const addBlogEdge = async (source: string, target: string) => {
    setBlogEdges((current) => [
      ...current, 
      { id: String(current.length + 1), source_idea_id: source, target_idea_id: target }
    ]);
  };

  const removeBlogEdge = async (id: string) => {
    setBlogEdges((current) => current.filter((edge) => edge.id !== id));
  };

  const removeRelation = async (id: string) => {
    setRelations((current) => current.filter((rel) => rel.id !== id));
  };

  const deleteIdea = async (id: string) => {
    try {
      const updated = await deleteIdeaAPI(id);
      setIdeas(updated);
    } catch (error) {
      console.error('Failed to delete idea:', error);
    }
  };

  return (
    <IdeasContext.Provider value={{
      ideas,
      loading,
      relations,
      blogEdges,
      smashIdea,
      createIdea,
      updateIdea,
      updateIdeaPosition,
      addRelation,
      addBlogEdge,
      removeBlogEdge,
      removeRelation,
      deleteIdea,
      fetchIdeas
    }}>
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeasContext = () => {
  const context = useContext(IdeasContext);
  if (context === undefined) {
    throw new Error('useIdeasContext must be used within an IdeasProvider');
  }
  return context;
};
