import React from 'react';
import { Node, Edge } from 'reactflow';
import NodeCanvasClient from '@/ui/nodes/NodeCanvasClient';

export const revalidate = 0;

const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'neo',
    position: { x: 250, y: 50 }, 
    data: { label: 'Mega-Blog Launch', color: 'bg-secondary-container', type: 'Main Objective' } 
  },
  { 
    id: '2', 
    type: 'neo',
    position: { x: 100, y: 220 }, 
    data: { label: 'Visual Tokens', color: 'bg-white', type: 'Design' } 
  },
  { 
    id: '3', 
    type: 'neo',
    position: { x: 400, y: 220 }, 
    data: { label: 'Supabase Integration', color: 'bg-primary text-white', type: 'Engineering' } 
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    style: { strokeWidth: 3, stroke: 'rgba(14, 165, 233, 0.5)' },
    animated: true 
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    style: { strokeWidth: 3, stroke: 'rgba(14, 165, 233, 0.3)' } 
  },
];

export default function NodeCanvasPage() {
  return <NodeCanvasClient initialNodes={initialNodes} initialEdges={initialEdges} />;
}
