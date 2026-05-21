import { Idea, RelationType } from '@/types/idea';
import { mockIdeas } from '@/data/mockData';

// 메모리 내부의 Mock 상태 저장소 (실제 Supabase 연동 전 대체 기능용)
let localIdeas: Idea[] = [...mockIdeas];
let localRelations: any[] = [];
let localBlogEdges: any[] = [];

export const getIdeasAPI = async (): Promise<Idea[]> => {
  // 네트워크 지연 모사
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...localIdeas];
};

export const createIdeaAPI = async (idea: Omit<Idea, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<Idea> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const newId = String(localIdeas.length + 1);
  const createdIdea: Idea = {
    ...idea,
    id: newId,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  localIdeas.push(createdIdea);
  return createdIdea;
};

export const updateIdeaAPI = async (id: string, updates: Partial<Idea>): Promise<Idea[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  localIdeas = localIdeas.map((idea) =>
    idea.id === id
      ? { ...idea, ...updates, updated_at: new Date().toISOString() }
      : idea
  );
  return [...localIdeas];
};

export const deleteIdeaAPI = async (id: string): Promise<Idea[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  localIdeas = localIdeas.filter((idea) => idea.id !== id);
  return [...localIdeas];
};

export const smashIdeaAPI = async (ideaId: string): Promise<Idea[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const next = localIdeas.map((idea) =>
    idea.id === ideaId ? { ...idea, status: 'smashed' as const } : idea
  );

  localIdeas = next.map((idea) => {
    if (idea.status === 'locked') {
      const prereqs = idea.prerequisites || [];
      const allSmashed = prereqs.every(
        (pid) => next.find((i) => i.id === pid)?.status === 'smashed'
      );
      if (allSmashed) return { ...idea, status: 'ready' as const };
    }
    return idea;
  });
  return [...localIdeas];
};
