"use client";

import React, { useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useIdeas } from '@/hooks/useIdeas';
import { BrainCircuit, Maximize2, Plus, Share2 } from 'lucide-react';

const nodeTypes = {
  // Custom node types can be added here
};

export default function NodeGraphPage() {
  const { ideas, blogEdges, updateIdeaPosition } = useIdeas();

  const initialNodes = useMemo(() => 
    ideas.filter(i => i.type === 'blog').map(idea => ({
      id: idea.id,
      position: { x: idea.position_x || 0, y: idea.position_y || 0 },
      data: { label: idea.title },
      style: { 
        background: 'rgba(29, 30, 49, 0.8)', 
        color: '#E1E0FB', 
        border: '1px solid rgba(124, 92, 252, 0.4)',
        borderRadius: '12px',
        padding: '12px',
        width: 180,
        fontSize: '13px',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)'
      }
    })), [ideas]
  );

  const initialEdges = useMemo(() => 
    blogEdges.map(edge => ({
      id: edge.id,
      source: edge.source_idea_id,
      target: edge.target_idea_id,
      label: edge.label,
      animated: true,
      style: { stroke: 'rgba(124, 92, 252, 0.5)', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'rgba(124, 92, 252, 0.5)',
      },
    })), [blogEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  React.useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDragStop = useCallback(
    (_: any, node: any) => {
      updateIdeaPosition(node.id, node.position.x, node.position.y);
    },
    [updateIdeaPosition]
  );

  return (
    <div style={{ height: 'calc(100vh - 160px)', width: '100%', position: 'relative' }}>
      <div className="glass" style={{ 
        position: 'absolute', 
        top: '1rem', 
        left: '1rem', 
        zIndex: 10, 
        padding: '1rem', 
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Blog Graph</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Visualize topic connections</p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        fitView
        style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <Background color="#222" gap={20} />
        <Controls />
        <MiniMap 
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          maskColor="rgba(0, 0, 0, 0.1)"
          nodeColor={(n) => 'var(--primary)'}
        />
        
        <Panel position="top-right" style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <Plus size={16} /> New Topic
          </button>
          <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '12px' }}>
            <Share2 size={18} />
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
