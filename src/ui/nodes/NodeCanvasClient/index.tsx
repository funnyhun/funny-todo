'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NeoButton, NeoNode } from '@/ui';
import { ChevronLeft, Plus, Save, Compass } from 'lucide-react';
import { nodeCanvasStyles, nodeCanvasInlineStyles } from './NodeCanvasClient.style';

const nodeTypes = {
  neo: NeoNode,
};

interface NodeCanvasClientProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

export default function NodeCanvasClient({ initialNodes, initialEdges }: NodeCanvasClientProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ 
      ...params, 
      style: nodeCanvasInlineStyles.edge,
      type: 'smoothstep'
    }, eds)),
    [setEdges]
  );

  return (
    <div className={nodeCanvasStyles.container}>
      {/* Background abstract shape for Canvas */}
      <div className={nodeCanvasStyles.radialBg} />

      {/* Canvas Header */}
      <header className={nodeCanvasStyles.header}>
        <div className={nodeCanvasStyles.headerLeft}>
          <Link href="/" className={nodeCanvasStyles.exitLink}>
            <ChevronLeft size={16} strokeWidth={3} />
            Exit Canvas
          </Link>
          <div className={nodeCanvasStyles.divider} />
          <h1 className={nodeCanvasStyles.title}>Blog Node Canvas</h1>
        </div>
        <div className={nodeCanvasStyles.headerRight}>
          <NeoButton variant="secondary" onClick={() => console.log(nodes)} className="h-10 px-5 text-xs font-black shadow-sm flex items-center gap-1.5">
            <Save size={14} /> SAVE MAP
          </NeoButton>
          <NeoButton variant="primary" className="h-10 px-5 text-xs font-black shadow-sm flex items-center gap-1.5">
            <Plus size={14} /> ADD BRAIN NODE
          </NeoButton>
        </div>
      </header>

      {/* Real ReactFlow Canvas */}
      <div className={nodeCanvasStyles.canvasArea}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className={nodeCanvasStyles.reactFlow}
        >
          <Background 
            color="#0ea5e9" 
            gap={40} 
            size={1.5} 
            variant={BackgroundVariant.Dots} 
            style={nodeCanvasInlineStyles.background}
          />
          <Controls className="!border !border-white/50 !shadow-lg !rounded-2xl !bg-white/60 !backdrop-blur !p-1" />
        </ReactFlow>

        {/* Floating Info */}
        <div className={nodeCanvasStyles.infoCard}>
           <div className={nodeCanvasStyles.infoIconWrapper}>
             <Compass size={20} className="animate-spin" style={nodeCanvasInlineStyles.compass} />
           </div>
           <div>
             <p className={nodeCanvasStyles.infoTitle}>Neural Sync Active</p>
             <p className={nodeCanvasStyles.infoDesc}>Your idea chains are being processed. Smashed nodes will turn green automatically.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
