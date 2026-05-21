"use client";

import { useIdeas } from "@/common/hooks/useIdeas";
import { Idea, RelationType } from "@/types/idea";
import { 
  Plus, 
  BrainCircuit, 
  ChevronRight, 
  Lock, 
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  Trash2,
  Edit3,
  X,
  Lightbulb,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import { format } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import * as styles from "./IdeaChainContent.style";

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
    <div className="fade-in" style={styles.containerStyle}>
      {/* Header */}
      <div style={styles.headerStyle}>
        <div>
          <div style={styles.flowIndicatorStyle}>
            <div style={styles.flowDotStyle} />
            <span style={styles.flowTextStyle}>CREATIVE FLOW</span>
          </div>
          <h1 style={styles.titleStyle}>아이디어 뱅크</h1>
          {statusFilter && (
            <div style={styles.filterBadgeContainerStyle}>
              <span className="glass" style={styles.filterBadgeStyle}>
                필터: {statusFilter.toLowerCase() === 'active' ? '진행 중' : (statusFilter.toLowerCase() === 'completed' ? '완료' : '잠금/보관')}
              </span>
              <button 
                onClick={() => router.push('/dashboard/idea')} 
                style={styles.clearFilterButtonStyle}
              >
                전체 보기
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn btn-primary"
          style={styles.addButtonStyle}
        >
          <Plus size={14} />
          <span>새 아이디어 추가</span>
        </button>
      </div>

      <div style={styles.mainLayoutStyle}>
        {/* Left Column: Idea List */}
        <div style={styles.listColumnStyle} className="custom-scrollbar">
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
                style={styles.getCardStyle(active, locked, status)}
              >
                <div style={styles.cardInnerStyle}>
                  <div style={styles.getCardIconWrapperStyle(locked, status)}>
                    {locked ? <Lock size={16} /> : (status === 'completed' ? <CheckCircle2 size={16} /> : <Target size={16} />)}
                  </div>
                  <div style={styles.cardContentStyle}>
                    <div style={styles.cardHeaderStyle}>
                      <h3 style={styles.getCardTitleStyle(locked)}>
                        {idea.title}
                      </h3>
                      <span style={styles.cardTypeStyle}>
                        {idea.type === 'blog' ? '노드' : '아이디어'}
                      </span>
                    </div>
                    <div style={styles.cardMetaStyle}>
                      <span style={styles.cardMetaTextStyle}>
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
            <div style={styles.emptyStateStyle}>
              <BrainCircuit size={48} style={styles.emptyIconStyle} />
              <p style={styles.emptyTextStyle}>{statusFilter ? `${statusFilter} 상태의 아이디어가 없습니다.` : "아직 아이디어가 없습니다."}</p>
            </div>
          )}
        </div>

        {/* Right Column: Detail View */}
        <div style={styles.detailColumnStyle}>
          <AnimatePresence mode="wait">
            {selectedIdea ? (
              <motion.div
                key={selectedIdea.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass"
                style={styles.detailWrapperStyle}
              >
                {/* Fixed Header */}
                <div style={styles.detailHeaderStyle}>
                  <div style={styles.detailHeaderTopStyle}>
                    <div style={styles.detailHeaderActionsStyle}>
                      <div style={styles.getDetailHeaderBadgeStyle((selectedIdea.status || 'active').toLowerCase())}>
                        <div style={styles.getDetailHeaderBadgeDotStyle((selectedIdea.status || 'active').toLowerCase())} />
                        {(selectedIdea.status || 'active').toLowerCase() === 'completed' ? '완료' : 
                         (selectedIdea.status || 'active').toLowerCase() === 'locked' ? '잠금' : 
                         (selectedIdea.status || 'active').toLowerCase() === 'archived' ? '보관' : '진행 중'}
                      </div>
                    </div>
                    <div style={styles.detailHeaderActionsStyle}>
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
                  
                  <h2 style={styles.detailHeaderTitleStyle}>
                    {selectedIdea.title}
                  </h2>
                </div>
 
                {/* Scrollable Content Area */}
                <div className="custom-scrollbar" style={styles.detailContentStyle}>
                  {/* Metadata & Progress Mini-Dashboard */}
                  <div style={styles.metricsGridStyle}>
                    <div style={styles.metricCardStyle}>
                      <div style={styles.metricHeaderStyle}>
                        <Clock size={12} color="var(--text-muted)" />
                        <span style={styles.metricLabelStyle}>생성일</span>
                      </div>
                      <div style={styles.metricValueStyle}>
                        {selectedIdea.created_at ? format(new Date(selectedIdea.created_at), "yyyy.MM.dd") : "-"}
                      </div>
                    </div>
                    <div style={styles.metricCardStyle}>
                      <div style={styles.progressHeaderStyle}>
                        <div style={styles.progressLabelContainerStyle}>
                          <Target size={12} color="var(--text-muted)" />
                          <span style={styles.metricLabelStyle}>진행률</span>
                        </div>
                        <span style={styles.progressPercentStyle}>{(selectedIdea.status || 'active').toLowerCase() === 'completed' ? "100%" : "40%"}</span>
                      </div>
                      <div style={styles.progressBarBgStyle}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: (selectedIdea.status || 'active').toLowerCase() === 'completed' ? "100%" : "40%" }}
                          style={styles.getProgressBarFillStyle((selectedIdea.status || 'active').toLowerCase() === 'completed')}
                        />
                      </div>
                    </div>
                  </div>
 
                  {/* Description Box */}
                  <div>
                    <h4 style={styles.sectionTitleStyle}>
                      <div style={styles.sectionTitleDotStyle} />
                      상세 설명
                    </h4>
                    <div style={styles.descriptionBoxStyle}>
                      {selectedIdea.content || "아이디어에 대한 상세 설명이 없습니다."}
                    </div>
                  </div>
 
                  {/* Flow Visualization (Visual Chain) */}
                  <div style={styles.flowSectionStyle}>
                    <div style={styles.flowGlowStyle} />
                    <h4 style={styles.flowTitleStyle}>아이디어 체인 흐름</h4>
                    
                    <div style={styles.flowContainerStyle}>
                      {selectedPrereqs.slice(0, 1).map((p) => (
                        <React.Fragment key={p.id}>
                          <div style={styles.flowParentCardStyle}>
                            {p.title}
                          </div>
                          <ArrowRight size={12} color="rgba(255,255,255,0.2)" />
                        </React.Fragment>
                      ))}
                      
                      <div style={styles.flowCurrentCardStyle}>
                        {selectedIdea.title}
                      </div>
 
                      {getSequentialTargets(selectedIdea.id).slice(0, 1).map((t) => (
                        <React.Fragment key={t.id}>
                          <ArrowRight size={12} color="rgba(124, 92, 252, 0.4)" />
                          <div style={styles.flowChildCardStyle}>
                            {t.title}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
 
                  {/* Relations Management */}
                  <div style={styles.relationsGridStyle}>
                    <div style={styles.relationColStyle}>
                      <div style={styles.relationColHeaderStyle}>
                        <h4 style={styles.relationTitleStyle}>선행 관계</h4>
                        <button onClick={() => { setSelectedRelationType('prerequisite'); setShowRelationModal(true); }} style={styles.relationAddBtnStyle}><Plus size={12} /></button>
                      </div>
                      <div className="custom-scrollbar" style={styles.relationsListStyle}>
                        {selectedPrereqs.length > 0 ? selectedPrereqs.map(p => (
                          <div key={p.id} style={styles.relationItemStyle}>
                            <span style={styles.relationItemTitleStyle}>{p.title}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const rel = relations.find(r => r.parent_id === p.id && r.child_id === selectedIdeaId && r.relation_type === 'prerequisite');
                                if (rel) handleRemoveRelation(rel.id);
                              }}
                              style={styles.relationItemDelBtnStyle}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        )) : (
                          <div style={styles.relationEmptyStyle}>없음</div>
                        )}
                      </div>
                    </div>
 
                    <div style={styles.relationColStyle}>
                      <div style={styles.relationColHeaderStyle}>
                        <h4 style={styles.relationTitleStyle}>후속 관계</h4>
                        <button onClick={() => { setSelectedRelationType('sequential'); setShowRelationModal(true); }} style={styles.relationAddBtnStyle}><Plus size={12} /></button>
                      </div>
                      <div className="custom-scrollbar" style={styles.relationsListStyle}>
                        {getSequentialTargets(selectedIdea.id).length > 0 ? getSequentialTargets(selectedIdea.id).map(t => (
                          <div key={t.id} style={styles.relationItemStyle}>
                            <span style={styles.relationItemTitleStyle}>{t.title}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const rel = relations.find(r => r.parent_id === selectedIdeaId && r.child_id === t.id && r.relation_type === 'sequential');
                                if (rel) handleRemoveRelation(rel.id);
                              }}
                              style={styles.relationItemDelBtnStyle}
                            >
                              <X size={10} />
                            </button>
                          </div>
                        )) : (
                          <div style={styles.relationEmptyStyle}>없음</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Fixed Footer Actions */}
                <div style={styles.detailFooterStyle}>
                  <button 
                    onClick={() => handleStatusToggle(selectedIdea)}
                    style={styles.getStatusToggleButtonStyle((selectedIdea.status || 'active').toLowerCase() === 'completed')}
                  >
                    {(selectedIdea.status || 'active').toLowerCase() === 'completed' ? '진행 중으로 변경' : '실행 완료 처리'}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="glass" style={styles.emptyDetailWrapperStyle}>
                <div style={styles.emptyDetailInnerStyle}>
                  <div style={styles.emptyDetailIconBgStyle}>
                    <BrainCircuit size={40} color="var(--primary)" style={{ opacity: 0.5 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <h3 style={styles.emptyDetailTitleStyle}>아이디어를 선택하세요</h3>
                    <p style={styles.emptyDetailDescStyle}>좌측 리스트에서 아이디어를 선택하여 상세 내용과 관계 흐름을 확인하세요</p>
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
          <div style={styles.modalOverlayStyle}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)} 
              style={styles.modalBgStyle} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass" 
              style={styles.modalWrapperStyle}
            >
              <h2 style={styles.modalTitleStyle}>새 아이디어 추가</h2>
              <form onSubmit={handleCreate} style={styles.formStyle}>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>제목</label>
                  <input 
                    type="text" 
                    required
                    autoFocus
                    placeholder="당신의 다음 위대한 생각은 무엇인가요?"
                    value={newIdea.title}
                    onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                    style={styles.inputStyle}
                  />
                </div>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>설명</label>
                  <textarea 
                    rows={4}
                    placeholder="아이디어의 흐름을 설명해주세요..."
                    value={newIdea.content}
                    onChange={(e) => setNewIdea({...newIdea, content: e.target.value})}
                    style={styles.textareaStyle}
                  />
                </div>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>유형</label>
                  <div style={styles.typeBtnContainerStyle}>
                    <button 
                      type="button"
                      onClick={() => setNewIdea({...newIdea, type: 'idea'})}
                      style={styles.getTypeButtonStyle(newIdea.type === 'idea', "var(--primary)")}
                    >
                      <Lightbulb size={16} />
                      <span>일반 아이디어 (Idea)</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewIdea({...newIdea, type: 'blog'})}
                      style={styles.getTypeButtonStyle(newIdea.type === 'blog', "#10B981")}
                    >
                      <Workflow size={16} />
                      <span>마인드 그래프 노드 (Node)</span>
                    </button>
                  </div>
                </div>
                <div style={styles.formActionsStyle}>
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
          <div style={styles.modalOverlayStyle}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditModal(false)} 
              style={styles.modalBgStyle} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass" 
              style={styles.modalWrapperStyle}
            >
              <h2 style={styles.modalTitleStyle}>아이디어 수정</h2>
              <form onSubmit={handleUpdate} style={styles.formStyle}>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>제목</label>
                  <input 
                    type="text" 
                    required
                    value={editIdeaData.title}
                    onChange={(e) => setEditIdeaData({...editIdeaData, title: e.target.value})}
                    style={styles.inputStyle}
                  />
                </div>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>설명</label>
                  <textarea 
                    rows={4}
                    value={editIdeaData.content || ""}
                    onChange={(e) => setEditIdeaData({...editIdeaData, content: e.target.value})}
                    style={styles.textareaStyle}
                  />
                </div>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>상태</label>
                  <select 
                    value={(editIdeaData.status || 'active').toLowerCase()}
                    onChange={(e) => setEditIdeaData({...editIdeaData, status: e.target.value.toLowerCase() as any})}
                    style={styles.selectStyle}
                  >
                    <option value="active">진행 중 (Active)</option>
                    <option value="completed">완료됨 (Completed)</option>
                    <option value="locked">잠금됨 (Locked)</option>
                    <option value="archived">보관됨 (Archived)</option>
                  </select>
                </div>
                <div style={styles.formFieldStyle}>
                  <label style={styles.labelStyle}>유형</label>
                  <div style={styles.typeBtnContainerStyle}>
                    <button 
                      type="button"
                      onClick={() => setEditIdeaData({...editIdeaData, type: 'idea'})}
                      style={styles.getTypeButtonStyle(editIdeaData.type === 'idea', "var(--primary)")}
                    >
                      <Lightbulb size={16} />
                      <span>일반 아이디어</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditIdeaData({...editIdeaData, type: 'blog'})}
                      style={styles.getTypeButtonStyle(editIdeaData.type === 'blog', "#10B981")}
                    >
                      <Workflow size={16} />
                      <span>마인드 그래프 노드</span>
                    </button>
                  </div>
                </div>
                <div style={styles.formActionsStyle}>
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
          <div style={styles.modalOverlayStyle}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRelationModal(false)} 
              style={styles.modalBgStyle} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass" 
              style={styles.relationModalWrapperStyle}
            >
              <div style={styles.relationModalHeaderStyle}>
                <h2 style={styles.relationModalTitleStyle}>{selectedRelationType === 'prerequisite' ? '선행 조건 추가' : '후속 단계 추가'}</h2>
                <button onClick={() => setShowRelationModal(false)} className="btn btn-ghost" style={styles.relationModalCloseBtnStyle}><X size={20} /></button>
              </div>

              {/* Type Switcher */}
              <div style={styles.relationModalTypeSwitcherStyle}>
                <button 
                  onClick={() => setSelectedRelationType('prerequisite')}
                  style={styles.getSwitcherButtonStyle(selectedRelationType === 'prerequisite')}
                >
                  선행 조건
                </button>
                <button 
                  onClick={() => setSelectedRelationType('sequential')}
                  style={styles.getSwitcherButtonStyle(selectedRelationType === 'sequential')}
                >
                  후속 단계
                </button>
              </div>

              <p style={styles.relationModalDescStyle}>
                {selectedRelationType === 'prerequisite' 
                  ? '이 아이디어를 시작하기 위해 먼저 완료되어야 할 아이디어를 선택하세요.'
                  : '이 아이디어 다음에 진행될 아이디어를 선택하세요.'}
              </p>
              
              <div style={styles.relationModalListStyle} className="custom-scrollbar">
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
                      style={styles.relationModalItemStyle}
                    >
                      <div style={styles.relationModalItemIconStyle}>
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
