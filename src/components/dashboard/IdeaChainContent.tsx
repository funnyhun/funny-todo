"use client";

import { useIdeas, Idea, RelationType } from "@/hooks/useIdeas";
import { 
  Plus, 
  BrainCircuit, 
  ChevronRight, 
  MoreVertical, 
  Lock, 
  Unlock,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  Trash2,
  Edit3,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { format } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";

export default function IdeaChainContent() {
  const { 
    ideas, 
    relations, 
    loading, 
    createIdea, 
    updateIdea, 
    deleteIdea, 
    addRelation, 
    removeRelation 
  } = useIdeas();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRelationModal, setShowRelationModal] = useState(false);
  const [newIdea, setNewIdea] = useState<{title: string, content: string, type: 'idea' | 'blog'}>({ title: "", content: "", type: "idea" });
  const [editIdeaData, setEditIdeaData] = useState<Idea | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [selectedRelationType, setSelectedRelationType] = useState<RelationType>('prerequisite');

  const statusFilter = searchParams.get('status');
  const filteredIdeas = ideas.filter(i => {
    if (statusFilter) {
      const currentStatus = (i.status || 'active').toLowerCase();
      const filter = statusFilter.toLowerCase();
      if (filter === 'pending') {
        return currentStatus === 'locked' || currentStatus === 'archived';
      }
      return currentStatus === filter;
    }
    return true;
  });

  // Sync from URL to state
  useEffect(() => {
    const idParam = searchParams.get('id');
    const newParam = searchParams.get('new');
    
    if (idParam) {
      if (idParam !== selectedIdeaId) {
        setSelectedIdeaId(idParam);
      }
    } else {
      // No ID in URL, check if current selection is still valid for the filter
      const isCurrentValid = selectedIdeaId && filteredIdeas.some(i => i.id === selectedIdeaId);
      if (!isCurrentValid && filteredIdeas.length > 0) {
        setSelectedIdeaId(filteredIdeas[0].id);
      } else if (filteredIdeas.length === 0) {
        setSelectedIdeaId(null);
      }
    }

    if (newParam === 'true') {
      setShowAddModal(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('new');
      router.replace(`/dashboard/idea?${params.toString()}`);
    }
  }, [searchParams, filteredIdeas, selectedIdeaId, router]);

  // Handle selection change and update URL
  const handleSelectIdea = useCallback((id: string) => {
    setSelectedIdeaId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', id);
    router.push(`/dashboard/idea?${params.toString()}`);
  }, [searchParams, router]);

  // handleSelectIdea already defined below but used here, let's move it up if needed or keep it as is

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const created = await createIdea(newIdea);
      setShowAddModal(false);
      setNewIdea({ title: "", content: "", type: "idea" });
      if (created) {
        handleSelectIdea(created.id);
      }
    } catch (err) {
      console.error("Failed to create idea:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editIdeaData || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await updateIdea(editIdeaData.id, {
        title: editIdeaData.title,
        content: editIdeaData.content,
        status: editIdeaData.status.toLowerCase() as any,
        type: editIdeaData.type
      });
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update idea:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 아이디어를 정말 삭제하시겠습니까?")) return;
    try {
      await deleteIdea(id);
        if (selectedIdeaId === id) {
          setSelectedIdeaId(null);
          const params = new URLSearchParams(searchParams.toString());
          params.delete('id');
          router.push(`/dashboard/idea?${params.toString()}`);
        }
    } catch (err) {
      console.error("Failed to delete idea:", err);
    }
  };

  const handleStatusToggle = async (idea: Idea) => {
    const statusStr = idea.status || 'active';
    const nextStatus = statusStr.toLowerCase() === 'completed' ? 'active' : 'completed';
    try {
      await updateIdea(idea.id, { status: nextStatus as any });
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleAddRelationAction = async (targetId: string) => {
    if (!selectedIdeaId || targetId === selectedIdeaId) return;
    try {
      // If adding prerequisite, target is parent, selected is child
      // If adding sequential, selected is parent, target is child
      if (selectedRelationType === 'prerequisite') {
        await addRelation(targetId, selectedIdeaId, 'prerequisite');
      } else {
        await addRelation(selectedIdeaId, targetId, 'sequential');
      }
    } catch (err) {
      console.error("Failed to add relation:", err);
    }
  };

  const handleRemoveRelation = async (relationId: string) => {
    try {
      await removeRelation(relationId);
    } catch (err) {
      console.error("Failed to remove relation:", err);
    }
  };

  const getPrerequisites = (ideaId: string) => {
    return relations
      .filter(rel => rel.child_id === ideaId && rel.relation_type === 'prerequisite')
      .map(rel => ideas.find(i => i.id === rel.parent_id))
      .filter(Boolean) as Idea[];
  };

  const getSequentialTargets = (ideaId: string) => {
    return relations
      .filter(rel => rel.parent_id === ideaId && rel.relation_type === 'sequential')
      .map(rel => ideas.find(i => i.id === rel.child_id))
      .filter(Boolean) as Idea[];
  };

  const isLocked = (ideaId: string) => {
    const prereqs = getPrerequisites(ideaId);
    if (prereqs.length === 0) return false;
    return prereqs.some(p => (p.status || 'active').toLowerCase() !== 'completed');
  };

  const selectedIdea = ideas.find(i => i.id === selectedIdeaId);
  const selectedPrereqs = selectedIdeaId ? getPrerequisites(selectedIdeaId) : [];

  if (loading && ideas.length === 0) return (
    <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BrainCircuit className="animate-pulse" size={48} color="var(--primary)" />
    </div>
  );

  return (
    <div className="fade-in" style={{ height: "calc(100vh - 152px)", display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1rem", flexShrink: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "var(--primary-gradient)" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.12em" }}>CREATIVE FLOW</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>아이디어 뱅크</h1>
          {statusFilter && (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.5rem" }}>
              <span className="glass" style={{ padding: "0.25rem 0.6rem", borderRadius: "var(--radius-full)", fontSize: "0.65rem", fontWeight: 700, color: "var(--primary)", border: "1px solid rgba(124, 92, 252, 0.2)", background: "rgba(124, 92, 252, 0.1)" }}>
                필터: {statusFilter.toLowerCase() === 'active' ? '진행 중' : (statusFilter.toLowerCase() === 'completed' ? '완료' : '잠금/보관')}
              </span>
              <button 
                onClick={() => router.push('/dashboard/idea')} 
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.65rem", cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                전체 보기
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn btn-primary"
          style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-full)", fontSize: "0.85rem", height: "fit-content" }}
        >
          <Plus size={14} />
          <span>새 아이디어 추가</span>
        </button>
      </div>

      <div style={{ display: "flex", gap: "2rem", flex: 1, minHeight: 0 }}>
        {/* Left Column: Idea List */}
        <div style={{ width: "360px", display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto", paddingRight: "0.5rem" }} className="custom-scrollbar">
          {filteredIdeas.map((idea) => {
            const locked = isLocked(idea.id);
            const active = selectedIdeaId === idea.id;
            const status = (idea.status || 'active').toLowerCase();

            return (
              <motion.div 
                key={idea.id}
                whileHover={{ x: 4 }}
                onClick={() => handleSelectIdea(idea.id)}
                className={`glass-card ${active ? 'active' : ''}`}
                style={{ 
                  cursor: "pointer",
                  padding: "0.85rem 1rem",
                  borderLeft: active 
                    ? "4px solid var(--primary)" 
                    : (locked ? "4px solid var(--text-muted)" : `4px solid ${status === 'completed' ? 'var(--status-completed)' : 'transparent'}`),
                  background: active ? "rgba(124, 92, 252, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  borderColor: active ? "rgba(124, 92, 252, 0.3)" : "var(--glass-border)",
                  boxShadow: active ? "0 8px 32px rgba(124, 92, 252, 0.1)" : "none",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ 
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: locked ? "rgba(255,255,255,0.05)" : (status === 'completed' ? "rgba(16, 185, 129, 0.15)" : "rgba(124, 92, 252, 0.15)"),
                    color: locked ? "var(--text-muted)" : (status === 'completed' ? "var(--status-completed)" : "var(--primary)"),
                    border: `1px solid ${locked ? "rgba(255,255,255,0.1)" : (status === 'completed' ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)")}`
                  }}>
                    {locked ? <Lock size={16} /> : (status === 'completed' ? <CheckCircle2 size={16} /> : <Target size={16} />)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                      <h3 style={{ 
                        fontSize: "0.95rem", 
                        fontWeight: 700, 
                        color: locked ? "var(--text-muted)" : "white",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        margin: 0
                      }}>
                        {idea.title}
                      </h3>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                        {idea.type === 'blog' ? '노드' : '아이디어'}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {status === 'completed' ? '완료됨' : (locked ? '잠금됨' : '진행 중')}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" style={{ opacity: active ? 1 : 0.3 }} />
                </div>
              </motion.div>
            );
          })}

          {filteredIdeas.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
              <BrainCircuit size={48} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
              <p style={{ fontSize: "0.9rem" }}>{statusFilter ? `${statusFilter} 상태의 아이디어가 없습니다.` : "아직 아이디어가 없습니다."}</p>
            </div>
          )}
        </div>

        {/* Right Column: Detail View */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
          <AnimatePresence mode="wait">
            {selectedIdea ? (
              <motion.div
                key={selectedIdea.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass"
                style={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  borderRadius: "24px", 
                  overflow: "hidden",
                  background: "var(--surface-container-low)",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "var(--shadow-lg)"
                }}
              >
                {/* Fixed Header */}
                <div style={{ padding: "1.5rem", flexShrink: 0, borderBottom: "1px solid var(--border)", background: "var(--surface-container-high)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ 
                        padding: "0.2rem 0.6rem", 
                        borderRadius: "999px", 
                        fontSize: "10px", 
                        fontWeight: 700, 
                        letterSpacing: "0.05em", 
                        textTransform: "uppercase", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "0.4rem",
                        background: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "rgba(16, 185, 129, 0.15)" : "rgba(124, 92, 252, 0.15)",
                        color: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "var(--status-completed)" : "var(--primary-container)",
                        border: `1px solid ${(selectedIdea.status || 'active').toLowerCase() === 'completed' ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)"}`
                      }}>
                        <div style={{ 
                          width: "6px", 
                          height: "6px", 
                          borderRadius: "50%", 
                          background: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "var(--status-completed)" : "var(--primary)" 
                        }} />
                        {(selectedIdea.status || 'active').toLowerCase() === 'completed' ? '완료' : 
                         (selectedIdea.status || 'active').toLowerCase() === 'locked' ? '잠금' : 
                         (selectedIdea.status || 'active').toLowerCase() === 'archived' ? '보관' : '진행 중'}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button 
                        onClick={() => setSelectedIdeaId(null)}
                        className="show-mobile"
                        style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
                        title="닫기"
                      >
                        <X size={15} />
                      </button>
                      <button 
                        onClick={() => {
                          setEditIdeaData(selectedIdea);
                          setShowEditModal(true);
                        }}
                        style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
                        title="수정"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button 
                        onClick={() => handleDelete(selectedIdea.id)}
                        style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(239, 68, 68, 0.05)", color: "var(--text-muted)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer" }}
                        title="삭제"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white", letterSpacing: "-0.01em", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {selectedIdea.title}
                  </h2>
                </div>
 
                {/* Scrollable Content Area */}
                <div className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", minHeight: 0 }}>
                  {/* Metadata & Progress Mini-Dashboard */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div style={{ padding: "1rem", borderRadius: "16px", background: "var(--surface-container-high)", border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <Clock size={12} color="var(--text-muted)" />
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>생성일</span>
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                        {selectedIdea.created_at ? format(new Date(selectedIdea.created_at), "yyyy.MM.dd") : "-"}
                      </div>
                    </div>
                    <div style={{ padding: "1rem", borderRadius: "16px", background: "var(--surface-container-high)", border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Target size={12} color="var(--text-muted)" />
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>진행률</span>
                        </div>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--primary-container)" }}>{(selectedIdea.status || 'active').toLowerCase() === 'completed' ? "100%" : "40%"}</span>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "999px", overflow: "hidden" }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "100%" : "40%" }}
                          style={{ height: "100%", background: "var(--primary)", boxShadow: "0 0 8px rgba(124, 92, 252, 0.5)" }}
                        />
                      </div>
                    </div>
                  </div>
 
                  {/* Description Box */}
                  <div>
                    <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "4px", height: "12px", background: "var(--primary)", borderRadius: "999px" }} />
                      상세 설명
                    </h4>
                    <div style={{ padding: "1.25rem", borderRadius: "16px", background: "var(--surface-container-highest)", border: "1px solid var(--border)", fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7, minHeight: "100px" }}>
                      {selectedIdea.content || "아이디어에 대한 상세 설명이 없습니다."}
                    </div>
                  </div>
 
                  {/* Flow Visualization (Visual Chain) */}
                  <div style={{ position: "relative", padding: "1.25rem", borderRadius: "16px", background: "var(--surface-container-low)", border: "1px solid var(--border)", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(124, 92, 252, 0.4), transparent)" }} />
                    <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>아이디어 체인 흐름</h4>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                      {selectedPrereqs.slice(0, 1).map((p) => (
                        <React.Fragment key={p.id}>
                          <div style={{ padding: "0.4rem 0.75rem", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {p.title}
                          </div>
                          <ArrowRight size={12} color="rgba(255,255,255,0.2)" />
                        </React.Fragment>
                      ))}
                      
                      <div style={{ padding: "0.5rem 1rem", borderRadius: "12px", background: "var(--primary)", color: "white", fontSize: "0.75rem", fontWeight: 700, boxShadow: "0 4px 12px rgba(124, 92, 252, 0.2)", border: "1px solid rgba(255,255,255,0.2)" }}>
                        {selectedIdea.title}
                      </div>
 
                      {getSequentialTargets(selectedIdea.id).slice(0, 1).map((t) => (
                        <React.Fragment key={t.id}>
                          <ArrowRight size={12} color="rgba(124, 92, 252, 0.4)" />
                          <div style={{ padding: "0.4rem 0.75rem", borderRadius: "12px", background: "rgba(124, 92, 252, 0.1)", border: "1px solid rgba(124, 92, 252, 0.2)", fontSize: "0.75rem", color: "var(--primary-container)" }}>
                            {t.title}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
 
                  {/* Relations Management */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>선행 관계</h4>
                        <button onClick={() => { setSelectedRelationType('prerequisite'); setShowRelationModal(true); }} style={{ padding: "0.25rem", borderRadius: "4px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Plus size={12} /></button>
                      </div>
                      <div className="custom-scrollbar" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "100px", overflowY: "auto", paddingRight: "0.25rem" }}>
                        {selectedPrereqs.length > 0 ? selectedPrereqs.map(p => (
                          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <span style={{ fontSize: "11px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const rel = relations.find(r => r.parent_id === p.id && r.child_id === selectedIdeaId && r.relation_type === 'prerequisite');
                                if (rel) handleRemoveRelation(rel.id);
                              }}
                              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.25rem" }}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        )) : (
                          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "0.5rem", fontStyle: "italic", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: "12px" }}>없음</div>
                        )}
                      </div>
                    </div>
 
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>후속 관계</h4>
                        <button onClick={() => { setSelectedRelationType('sequential'); setShowRelationModal(true); }} style={{ padding: "0.25rem", borderRadius: "4px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}><Plus size={12} /></button>
                      </div>
                      <div className="custom-scrollbar" style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "100px", overflowY: "auto", paddingRight: "0.25rem" }}>
                        {getSequentialTargets(selectedIdea.id).length > 0 ? getSequentialTargets(selectedIdea.id).map(t => (
                          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <span style={{ fontSize: "11px", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const rel = relations.find(r => r.parent_id === selectedIdeaId && r.child_id === t.id && r.relation_type === 'sequential');
                                if (rel) handleRemoveRelation(rel.id);
                              }}
                              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "0.25rem" }}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        )) : (
                          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", textAlign: "center", padding: "0.5rem", fontStyle: "italic", border: "1px dashed rgba(255,255,255,0.05)", borderRadius: "12px" }}>없음</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Fixed Footer Actions */}
                <div style={{ padding: "1.25rem", flexShrink: 0, borderTop: "1px solid var(--border)", background: "var(--surface-container-high)", display: "flex", gap: "0.75rem" }}>
                  <button 
                    onClick={() => handleStatusToggle(selectedIdea)}
                    style={{ 
                      flex: 1, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      gap: "0.5rem", 
                      padding: "0.65rem", 
                      borderRadius: "12px", 
                      fontSize: "0.875rem", 
                      fontWeight: 700, 
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "rgba(255,255,255,0.05)" : "var(--primary)",
                      color: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "var(--text-muted)" : "white",
                      border: "none",
                      boxShadow: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "none" : "0 4px 12px rgba(124, 92, 252, 0.2)"
                    }}
                  >
                    {(selectedIdea.status || 'active').toLowerCase() === 'completed' ? '진행 중으로 변경' : '실행 완료 처리'}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="glass" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "24px", background: "var(--surface-container-low)", border: "1px solid var(--glass-border)" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "280px" }}>
                  <div style={{ 
                    width: "80px", 
                    height: "80px", 
                    margin: "0 auto", 
                    borderRadius: "24px", 
                    background: "rgba(124, 92, 252, 0.05)", 
                    border: "1px solid rgba(124, 92, 252, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(124, 92, 252, 0.05)"
                  }}>
                    <BrainCircuit size={40} color="var(--primary)" style={{ opacity: 0.5 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>아이디어를 선택하세요</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>좌측 리스트에서 아이디어를 선택하여 상세 내용과 관계 흐름을 확인하세요</p>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
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
                maxWidth: "540px", 
                padding: "2.5rem", 
                borderRadius: "var(--radius-2xl)", 
                position: "relative",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
            >
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "2rem", letterSpacing: "-0.02em" }}>새 아이디어 추가</h2>
              <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>제목</label>
                  <input 
                    type="text" 
                    required
                    autoFocus
                    placeholder="당신의 다음 위대한 생각은 무엇인가요?"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "var(--radius-lg)", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid var(--glass-border)", 
                      color: "white",
                      fontSize: "1.1rem",
                      outline: "none"
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>설명</label>
                  <textarea 
                    rows={4}
                    placeholder="아이디어의 흐름을 설명해주세요..."
                    value={newIdea.content}
                    onChange={(e) => setNewIdea({...newIdea, content: e.target.value})}
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "var(--radius-lg)", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid var(--glass-border)", 
                      color: "white", 
                      resize: "none",
                      fontSize: "1rem",
                      outline: "none",
                      lineHeight: 1.6
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>유형</label>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button 
                      type="button"
                      onClick={() => setNewIdea({...newIdea, type: 'idea'})}
                      style={{ 
                        flex: 1, 
                        padding: "0.75rem", 
                        borderRadius: "var(--radius-md)", 
                        background: newIdea.type === 'idea' ? "var(--primary)" : "rgba(255,255,255,0.05)",
                        color: "white",
                        border: "1px solid",
                        borderColor: newIdea.type === 'idea' ? "rgba(255,255,255,0.2)" : "var(--glass-border)",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      💡 일반 아이디어 (Idea)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewIdea({...newIdea, type: 'blog'})}
                      style={{ 
                        flex: 1, 
                        padding: "0.75rem", 
                        borderRadius: "var(--radius-md)", 
                        background: newIdea.type === 'blog' ? "#10B981" : "rgba(255,255,255,0.05)",
                        color: "white",
                        border: "1px solid",
                        borderColor: newIdea.type === 'blog' ? "rgba(255,255,255,0.2)" : "var(--glass-border)",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      🕸️ 마인드 그래프 노드 (Node)
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-ghost" style={{ flex: 1, padding: "1rem" }}>취소</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ flex: 1, padding: "1rem" }}>
                    {isSubmitting ? "생성 중..." : "아이디어 생성"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showEditModal && editIdeaData && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)} 
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass" 
              style={{ 
                width: "100%", 
                maxWidth: "540px", 
                padding: "2.5rem", 
                borderRadius: "var(--radius-2xl)", 
                position: "relative",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
            >
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "2rem", letterSpacing: "-0.02em" }}>아이디어 수정</h2>
              <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>제목</label>
                  <input 
                    type="text" 
                    required
                    value={editIdeaData.title}
                    onChange={(e) => setEditIdeaData({...editIdeaData, title: e.target.value})}
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "var(--radius-lg)", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid var(--glass-border)", 
                      color: "white",
                      fontSize: "1.1rem",
                      outline: "none"
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>설명</label>
                  <textarea 
                    rows={4}
                    value={editIdeaData.content || ""}
                    onChange={(e) => setEditIdeaData({...editIdeaData, content: e.target.value})}
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "var(--radius-lg)", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid var(--glass-border)", 
                      color: "white", 
                      resize: "none",
                      fontSize: "1rem",
                      outline: "none",
                      lineHeight: 1.6
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>상태</label>
                  <select 
                    value={(editIdeaData.status || 'active').toLowerCase()}
                    onChange={(e) => setEditIdeaData({...editIdeaData, status: e.target.value.toLowerCase() as any})}
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "var(--radius-lg)", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid var(--glass-border)", 
                      color: "white",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  >
                    <option value="active">진행 중 (Active)</option>
                    <option value="completed">완료됨 (Completed)</option>
                    <option value="locked">잠금됨 (Locked)</option>
                    <option value="archived">보관됨 (Archived)</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>유형</label>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button 
                      type="button"
                      onClick={() => setEditIdeaData({...editIdeaData, type: 'idea'})}
                      style={{ 
                        flex: 1, 
                        padding: "0.75rem", 
                        borderRadius: "var(--radius-md)", 
                        background: editIdeaData.type === 'idea' ? "var(--primary)" : "rgba(255,255,255,0.05)",
                        color: "white",
                        border: "1px solid",
                        borderColor: editIdeaData.type === 'idea' ? "rgba(255,255,255,0.2)" : "var(--glass-border)",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      💡 일반 아이디어
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditIdeaData({...editIdeaData, type: 'blog'})}
                      style={{ 
                        flex: 1, 
                        padding: "0.75rem", 
                        borderRadius: "var(--radius-md)", 
                        background: editIdeaData.type === 'blog' ? "#10B981" : "rgba(255,255,255,0.05)",
                        color: "white",
                        border: "1px solid",
                        borderColor: editIdeaData.type === 'blog' ? "rgba(255,255,255,0.2)" : "var(--glass-border)",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      🕸️ 마인드 그래프 노드
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-ghost" style={{ flex: 1, padding: "1rem" }}>취소</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ flex: 1, padding: "1rem" }}>
                    {isSubmitting ? "수정 중..." : "수정 완료"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showRelationModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRelationModal(false)} 
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass" 
              style={{ 
                width: "100%", 
                maxWidth: "500px", 
                maxHeight: "80vh",
                padding: "2rem", 
                borderRadius: "var(--radius-2xl)", 
                position: "relative",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>{selectedRelationType === 'prerequisite' ? '선행 조건 추가' : '후속 단계 추가'}</h2>
                <button onClick={() => setShowRelationModal(false)} className="btn btn-ghost" style={{ padding: "0.5rem" }}><X size={20} /></button>
              </div>

              {/* Type Switcher */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: '12px' }}>
                <button 
                  onClick={() => setSelectedRelationType('prerequisite')}
                  style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: selectedRelationType === 'prerequisite' ? 'var(--primary)' : 'transparent',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  선행 조건
                </button>
                <button 
                  onClick={() => setSelectedRelationType('sequential')}
                  style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: selectedRelationType === 'sequential' ? 'var(--primary)' : 'transparent',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  후속 단계
                </button>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {selectedRelationType === 'prerequisite' 
                  ? '이 아이디어를 시작하기 위해 먼저 완료되어야 할 아이디어를 선택하세요.'
                  : '이 아이디어 다음에 진행될 아이디어를 선택하세요.'}
              </p>
              
              <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="custom-scrollbar">
                {ideas
                  .filter(i => {
                    if (i.id === selectedIdeaId) return false;
                    if (selectedRelationType === 'prerequisite') {
                      return !relations.some(r => r.parent_id === i.id && r.child_id === selectedIdeaId && r.relation_type === 'prerequisite');
                    } else {
                      return !relations.some(r => r.parent_id === selectedIdeaId && r.child_id === i.id && r.relation_type === 'sequential');
                    }
                  })
                  .map(idea => (
                    <button
                      key={idea.id}
                      onClick={() => {
                        handleAddRelationAction(idea.id);
                        setShowRelationModal(false);
                      }}
                      className="glass-card"
                      style={{ 
                        textAlign: "left", 
                        padding: "1rem", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "1rem",
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                        width: '100%'
                      }}
                    >
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(124, 92, 252, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                        <Plus size={16} />
                      </div>
                      <span style={{ fontWeight: 500 }}>{idea.title}</span>
                    </button>
                  ))
                }
                {ideas.filter(i => {
                  if (i.id === selectedIdeaId) return false;
                  if (selectedRelationType === 'prerequisite') {
                    return !relations.some(r => r.parent_id === i.id && r.child_id === selectedIdeaId && r.relation_type === 'prerequisite');
                  } else {
                    return !relations.some(r => r.parent_id === selectedIdeaId && r.child_id === i.id && r.relation_type === 'sequential');
                  }
                }).length === 0 && (
                  <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem" }}>추가할 수 있는 다른 아이디어가 없습니다.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
