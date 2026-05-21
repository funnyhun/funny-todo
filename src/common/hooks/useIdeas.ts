import { useIdeasContext } from '@/store/ideasStore';
import { Idea, RelationType } from '@/types/idea';

export type { Idea };
export type { RelationType };

export function useIdeas() {
  return useIdeasContext();
}
