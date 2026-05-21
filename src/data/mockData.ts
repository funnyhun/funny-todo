export interface Idea {
  id: string;
  title: string;
  content: string;
  status: 'locked' | 'ready' | 'smashed' | 'in-progress';
  type: 'idea' | 'blog';
  prerequisites?: string[];
  start_date?: string;
  end_date?: string;
  position_x?: number;
  position_y?: number;
  created_at?: string;
  updated_at?: string;
}



export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Space-Themed Productivity UI',
    content: "Draft the visual tokens for the 'Star-Dust' palette and exaggerated lunar shadows.",
    status: 'smashed',
    type: 'idea',
    start_date: '2026-05-18',
    end_date: '2026-05-20'
  },
  {
    id: '2',
    title: 'NFT Coffee Membership',
    content: 'A loyalty program where each cup brewed earns a unique digital bean fragment.',
    status: 'ready',
    type: 'blog',
    start_date: '2026-05-21',
    end_date: '2026-05-25'
  },
  {
    id: '3',
    title: 'Solar-Powered Server Farm',
    content: "Requires 'Energy Storage' node completion in the Research Node Canvas.",
    status: 'locked',
    type: 'idea',
    prerequisites: ['energy-storage'],
    start_date: '2026-06-01',
    end_date: '2026-06-15'
  },
  {
    id: '4',
    title: 'Neo-Brutalism Todo App',
    content: 'Building the main control center with high-energy colors and bold strokes.',
    status: 'in-progress',
    type: 'idea',
    start_date: '2026-05-20',
    end_date: '2026-05-22'
  }
];

