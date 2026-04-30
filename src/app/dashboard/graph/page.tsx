"use client";
import React, { useCallback, useMemo, useState } from 'react';
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
  Panel,
  useReactFlow,
  ReactFlowProvider,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useIdeas, Idea } from '@/hooks/useIdeas';
import { BrainCircuit, Maximize2, Plus, Share2, Target, Network, X, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Custom Node Component for a more premium look
const CustomNode = ({ data, id }: any) => {
  const status = (data.status || 'active').toLowerCase();
  const isIdea = data.type === 'idea';
  
  return (
    <div className="graph-node">
      <div 
        className="graph-node-indicator" 
        style={{ background: status === 'completed' ? 'var(--status-completed)' : 'var(--primary)' }} 
      />
      
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: 'var(--primary)', border: '2px solid var(--background)', width: '10px', height: '10px' }} 
      />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '10px', 
          background: status === 'completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(124, 92, 252, 0.15)',
          color: status === 'completed' ? 'var(--status-completed)' : 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(124, 92, 252, 0.2)'}`
        }}>
          {status === 'completed' ? <CheckCircle2 size={16} /> : (isIdea ? <BrainCircuit size={16} /> : <Target size={16} />)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {data.label}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {isIdea ? '아이디어' : '연결된 주제'}
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (data.onNavigate) {
              data.onNavigate(id);
            } else {
              window.location.href = `/dashboard/idea?id=${id}`;
            }
          }}
          className="btn-ghost"
          style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: 'none', 
            borderRadius: '8px',
            color: 'var(--text-muted)', 
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Maximize2 size={14} />
        </button>
      </div>
      
      <div style={{ 
        fontSize: '0.75rem', 
        color: 'var(--text-secondary)', 
        lineHeight: 1.5, 
        opacity: 0.9, 
        marginBottom: '0.75rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {data.content || "상세 내용을 추가하려면 클릭하세요..."}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: status === 'completed' ? 'var(--status-completed)' : 'var(--primary)' }} />
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            {status === 'completed' ? '완료' : '진행 중'}
          </span>
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
          {status === 'completed' ? '작업 완료' : '진행 중'}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ background: 'var(--primary)', border: '2px solid var(--background)', width: '10px', height: '10px' }} 
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

function GraphInner() {
  const { 
    ideas, 
    relations, 
    blogEdges, 
    createIdea, 
    updateIdeaPosition, 
    addBlogEdge, 
    removeBlogEdge, 
    removeRelation,
    deleteIdea, 
    fetchIdeas 
  } = useIdeas();
  const { screenToFlowPosition } = useReactFlow();
  const router = useRouter();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodePos, setNewNodePos] = useState({ x: 100, y: 100 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialNodes = useMemo(() => 
    ideas.map(idea => ({
      id: idea.id,
      type: 'custom',
      position: { x: idea.position_x || 0, y: idea.position_y || 0 },
      data: { 
        label: idea.title, 
        status: idea.status,
        content: idea.content,
        type: idea.type,
        onNavigate: (id: string) => router.push(`/dashboard/idea?id=${id}`)
      },
    })), [ideas, router]
  );

  const initialEdges = useMemo(() => {
    const edges: Edge[] = [];
    
    // Add manual blog edges
    blogEdges.forEach(edge => {
      edges.push({
        id: `blog-${edge.id}`,
        source: edge.source_idea_id,
        target: edge.target_idea_id,
        label: edge.label || '',
        animated: true,
        style: { stroke: 'var(--primary)', strokeWidth: 2, opacity: 0.8 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'var(--primary)',
        },
      });
    });

    // Add idea relations (Chain relations)
    relations.forEach(rel => {
      const isPrereq = rel.relation_type === 'prerequisite';
      edges.push({
        id: `rel-${rel.id}`,
        source: rel.parent_id,
        target: rel.child_id,
        label: isPrereq ? '선행' : '순차',
        labelStyle: { fill: 'var(--text-muted)', fontSize: '10px', fontWeight: 600 },
        labelBgStyle: { fill: 'var(--surface)', fillOpacity: 0.8 },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 4,
        animated: !isPrereq,
        style: { 
          stroke: isPrereq ? 'var(--status-completed)' : 'var(--primary)', 
          strokeWidth: isPrereq ? 2 : 1.5,
          strokeDasharray: isPrereq ? 'none' : '5,5',
          opacity: 0.6
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isPrereq ? 'var(--status-completed)' : 'var(--primary)',
        },
      });
    });

    return edges;
  }, [blogEdges, relations]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  React.useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const onConnect = useCallback(
    async (params: Connection) => {
      if (params.source && params.target) {
        try {
          await addBlogEdge(params.source, params.target);
          await fetchIdeas();
        } catch (err) {
          console.error(err);
        }
      }
    },
    [addBlogEdge, fetchIdeas]
  );
  
  const onEdgeClick = useCallback(
    (_: any, edge: Edge) => {
      const isBlog = edge.id.startsWith('blog-');
      const isRel = edge.id.startsWith('rel-');
      
      if (isBlog || isRel) {
        if (confirm("이 연결(관계)을 삭제하시겠습니까?")) {
          const id = isBlog ? edge.id.replace('blog-', '') : edge.id.replace('rel-', '');
          if (isBlog) {
            removeBlogEdge(id);
          } else {
            removeRelation(id);
          }
        }
      }
    },
    [removeBlogEdge, removeRelation]
  );

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeTitle) return;
    setIsSubmitting(true);
    try {
      await createIdea({
        title: newNodeTitle,
        type: 'idea', // Default to idea, so it shows up everywhere
        position_x: newNodePos.x,
        position_y: newNodePos.y,
        status: 'active'
      });
      setShowAddModal(false);
      setNewNodeTitle("");
      await fetchIdeas();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNodeDragStop = useCallback(
    (_: any, node: any) => {
      updateIdeaPosition(node.id, node.position.x, node.position.y);
    },
    [updateIdeaPosition]
  );

  const onPaneClick = useCallback(() => {
    // Single click closes modal if open, but double click is for creation
    setShowAddModal(false);
  }, []);

  return (
    <div className="fade-in" style={{ height: 'calc(100vh - 120px)', width: '100%', position: 'relative' }}>
      {/* Header Panel */}
      <div className="glass" style={{ 
        position: 'absolute', 
        top: '1.5rem', 
        left: '1.5rem', 
        zIndex: 10, 
        padding: '1.5rem 2rem', 
        borderRadius: 'var(--radius-2xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        border: 'none',
        background: 'var(--glass-bg)',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
          <Network size={22} color="var(--primary)" />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>마인드 그래프</h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>아이디어들의 연결된 흐름을 시각화하세요.</p>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        onDoubleClick={(event) => {
          const target = event.target as HTMLElement;
          if (target.classList.contains('react-flow__pane')) {
            const position = screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });
            setNewNodePos(position);
            setShowAddModal(true);
          }
        }}
        onNodesDelete={async (deletedNodes) => {
          if (!confirm(`${deletedNodes.length}개의 주제를 삭제하시겠습니까?`)) return;
          for (const node of deletedNodes) {
            try {
              await deleteIdea(node.id);
            } catch (err) {
              console.error(err);
            }
          }
          await fetchIdeas();
        }}
        fitView
        style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <Background color="#1d1e31" gap={24} size={2} />
        <Controls style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }} />
        <MiniMap 
          style={{ 
            background: 'rgba(29, 30, 49, 0.5)', 
            border: '1px solid var(--border)',
            borderRadius: '16px',
            backdropFilter: 'blur(8px)'
          }}
          maskColor="rgba(0, 0, 0, 0.4)"
          nodeColor={(n) => 'var(--primary)'}
          nodeBorderRadius={8}
        />
        
        <Panel position="top-right" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', marginRight: '1.5rem' }}>
          <button 
            onClick={() => {
              setNewNodePos({ x: 100, y: 100 });
              setShowAddModal(true);
            }}
            className="btn btn-primary" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)'
            }}
          >
            <Plus size={18} /> 새 주제 추가
          </button>
          <button 
            className="btn btn-ghost glass" 
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '14px', 
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border)'
            }}
          >
            <Share2 size={20} />
          </button>
        </Panel>

        <Panel position="bottom-center" style={{ marginBottom: '2rem' }}>
          <div className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, border: 'none', background: 'var(--glass-bg)', boxShadow: 'var(--shadow-lg)' }}>
            더블 클릭하여 추가 • 드래그하여 구성 • 연결하여 관계 생성 • Delete 키로 삭제
          </div>
        </Panel>
      </ReactFlow>

      {/* Add Node Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)} 
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass" 
              style={{ 
                width: "100%", 
                maxWidth: "440px", 
                padding: "2.5rem", 
                borderRadius: "var(--radius-2xl)", 
                position: "relative",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>새 주제 추가</h2>
              <form onSubmit={handleCreateNode} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>주제 제목</label>
                  <input 
                    type="text"
                    required
                    autoFocus
                    placeholder="주제 이름을 입력하세요..."
                    value={newNodeTitle}
                    onChange={(e) => setNewNodeTitle(e.target.value)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '12px', 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--border)', 
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>취소</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ flex: 1 }}>
                    {isSubmitting ? "생성 중..." : "주제 생성"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NodeGraphPage() {
  return (
    <ReactFlowProvider>
      <GraphInner />
    </ReactFlowProvider>
  );
}
