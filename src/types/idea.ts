export interface Idea {
  id: string;
  title: string;
  content: string;
  status: 'locked' | 'ready' | 'smashed' | 'in-progress' | 'active' | 'completed' | 'archived';
  type: 'idea' | 'blog';
  prerequisites?: string[];
  start_date?: string;
  end_date?: string;
  position_x?: number;
  position_y?: number;
  created_at?: string;
  updated_at?: string;
}

export type RelationType = 'prerequisite' | 'sequential';
