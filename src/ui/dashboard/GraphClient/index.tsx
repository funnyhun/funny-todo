'use client';

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
import { useIdeas } from '@/common/hooks/useIdeas';
import { BrainCircuit, Maximize2, Plus, Share2, Target, Network, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  graphStyles, 
  graphClasses, 
  nodeStyles, 
  getCustomNodeStyles 
} from './GraphClient.style';

// Custom Node Component for a more premium look
const CustomNode = ({ data, id }: any) => {
  const status = (data.status || 'active').toLowerCase();
  const isIdea = data.type === 'idea';
  const dynamicNodeStyles = getCustomNodeStyles(status);
  
  return (
    <div className={graphClasses.nodeContainer}>
      <div 
        className="graph-node-indicator" 
        style={dynamicNodeStyles.indicator} 
      />
      
      <Handle 
        type="target" 
        position={Position.Top} 
        style={dynamicNodeStyles.handle} 
      />
      
      <div style={nodeStyles.header}>
        <div style={dynamicNodeStyles.iconWrapper}>
          {status === 'completed' ? <CheckCircle2 size={16} /> : (isIdea ? <BrainCircuit size={16} /> : <Target size={16} />)}
        </div>
        <div style={nodeStyles.headerTextWrapper}>
          <div style={nodeStyles.title}>
            {data.label}
          </div>
          <div style={nodeStyles.subtitle}>
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
          className={graphClasses.nodeButton}
          style={nodeStyles.navigateBtn}
        >
          <Maximize2 size={14} />
        </button>
      </div>
      
      <div style={nodeStyles.content}>
        {data.content || "상세 내용을 추가하려면 클릭하세요..."}
      </div>

      <div style={nodeStyles.footer}>
        <div style={nodeStyles.footerLeft}>
          <div style={dynamicNodeStyles.statusDot} />
          <span style={nodeStyles.statusLabel}>
            {status === 'completed' ? '완료' : '진행 중'}
          </span>
        </div>
        <div style={nodeStyles.footerRight}>
          {status === 'completed' ? '작업 완료' : '진행 중'}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={dynamicNodeStyles.handle} 
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
    <div className={graphClasses.pageRoot} style={graphStyles.pageRoot}>
      {/* Header Panel */}
      <div className={graphClasses.headerControl} style={graphStyles.headerPanel}>
        <div style={graphStyles.headerTitleGroup}>
          <Network size={22} color="var(--primary)" />
          <h2 style={graphStyles.headerTitle}>마인드 그래프</h2>
        </div>
        <p style={graphStyles.headerDesc}>아이디어들의 연결된 흐름을 시각화하세요.</p>
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
        style={graphStyles.reactFlow}
      >
        <Background color="#1d1e31" gap={24} size={2} />
        <Controls style={graphStyles.controls} />
        <MiniMap 
          style={graphStyles.minimap}
          maskColor="rgba(0, 0, 0, 0.4)"
          nodeColor={() => 'var(--primary)'}
          nodeBorderRadius={8}
        />
        
        <Panel position="top-right" style={graphStyles.topRightPanel}>
          <button 
            onClick={() => {
              setNewNodePos({ x: 100, y: 100 });
              setShowAddModal(true);
            }}
            className="btn btn-primary" 
            style={graphStyles.createBtn}
          >
            <Plus size={18} /> 새 주제 추가
          </button>
          <button 
            className="btn btn-ghost glass" 
            style={graphStyles.shareBtn}
          >
            <Share2 size={20} />
          </button>
        </Panel>

        <Panel position="bottom-center" style={graphStyles.bottomPanel}>
          <div className={graphClasses.headerControl} style={graphStyles.instructionsCard}>
            더블 클릭하여 추가 • 드래그하여 구성 • 연결하여 관계 생성 • Delete 키로 삭제
          </div>
        </Panel>
      </ReactFlow>

      {/* Add Node Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div style={graphStyles.modalOverlay}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)} 
              style={graphStyles.modalBg} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={graphClasses.modalContent} 
              style={graphStyles.modalContainer}
            >
              <h2 style={graphStyles.modalTitle}>새 주제 추가</h2>
              <form onSubmit={handleCreateNode} style={graphStyles.modalForm}>
                <div style={graphStyles.inputWrapper}>
                  <label style={graphStyles.inputLabel}>주제 제목</label>
                  <input 
                    type="text"
                    required
                    autoFocus
                    placeholder="주제 이름을 입력하세요..."
                    value={newNodeTitle}
                    onChange={(e) => setNewNodeTitle(e.target.value)}
                    style={graphStyles.inputField}
                  />
                </div>
                <div style={graphStyles.modalBtnGroup}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-ghost" style={graphStyles.flexBtn}>취소</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={graphStyles.flexBtn}>
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

export default function GraphClient() {
  return (
    <ReactFlowProvider>
      <GraphInner />
    </ReactFlowProvider>
  );
}
