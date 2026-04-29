"use client";

import { useIdeas, Idea } from "@/hooks/useIdeas";
import { 
  Plus, 
  BrainCircuit, 
  ChevronRight, 
  MoreVertical, 
  Lock, 
  Unlock,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function IdeaChainPage() {
  const { ideas, relations, loading, error, createIdea, fetchIdeas } = useIdeas();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: "", content: "", type: "idea" as const });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createIdea(newIdea);
      setShowAddModal(false);
      setNewIdea({ title: "", content: "", type: "idea" });
      await fetchIdeas();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrerequisites = (ideaId: string) => {
    return relations
      .filter(rel => rel.child_id === ideaId)
      .map(rel => ideas.find(i => i.id === rel.parent_id))
      .filter(Boolean) as Idea[];
  };

  const isLocked = (ideaId: string) => {
    const prereqs = getPrerequisites(ideaId);
    if (prereqs.length === 0) return false;
    return prereqs.some(p => p.status !== 'completed');
  };

  if (loading) return (
    <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BrainCircuit className="animate-pulse" size={48} color="var(--primary)" />
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Idea Chain</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage sequential ideas and prerequisites.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={20} />
          New Idea
        </button>
      </div>

      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div onClick={() => setShowAddModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass" 
            style={{ width: "100%", maxWidth: "500px", padding: "2rem", borderRadius: "var(--radius-xl)", position: "relative" }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>New Idea</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Title</label>
                <input 
                  type="text" 
                  required
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({...newIdea, title: e.target.value})}
                  className="glass"
                  style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "white" }} 
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Description</label>
                <textarea 
                  rows={4}
                  value={newIdea.content}
                  onChange={(e) => setNewIdea({...newIdea, content: e.target.value})}
                  className="glass"
                  style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "white", resize: "none" }} 
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ flex: 1 }}>
                  {isSubmitting ? "Creating..." : "Create Idea"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {error && (
        <div className="glass" style={{ padding: "1rem", borderRadius: "var(--radius-md)", color: "#ff4d4d", display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "2rem" }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {ideas.filter(i => i.type === 'idea').map((idea, i) => {
          const locked = isLocked(idea.id);
          const prereqs = getPrerequisites(idea.id);

          return (
            <motion.div 
              key={idea.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card"
              style={{ 
                opacity: locked ? 0.7 : 1,
                borderLeft: locked ? "4px solid var(--text-muted)" : `4px solid ${idea.status === 'completed' ? 'var(--status-completed)' : 'var(--primary)'}`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ 
                    marginTop: "0.25rem",
                    color: locked ? "var(--text-muted)" : (idea.status === 'completed' ? 'var(--status-completed)' : 'var(--primary)') 
                  }}>
                    {locked ? <Lock size={20} /> : (idea.status === 'completed' ? <CheckCircle2 size={20} /> : <BrainCircuit size={20} />)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem", color: locked ? "var(--text-muted)" : "white" }}>
                      {idea.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                      {idea.content || "No description provided."}
                    </p>
                    
                    {prereqs.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Requires:</span>
                        {prereqs.map(p => (
                          <span 
                            key={p.id}
                            style={{ 
                              fontSize: "0.7rem", 
                              padding: "0.1rem 0.4rem", 
                              borderRadius: "4px", 
                              background: p.status === 'completed' ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 255, 255, 0.05)",
                              color: p.status === 'completed' ? "var(--status-completed)" : "var(--text-muted)",
                              border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}
                          >
                            {p.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button className="btn btn-ghost" style={{ padding: "0.5rem" }}>
                  <MoreVertical size={18} />
                </button>
              </div>
            </motion.div>
          );
        })}

        {ideas.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
            <BrainCircuit size={48} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
            <p>No ideas found. Start by creating your first idea!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckCircle2({ size, color }: { size?: number, color?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color || "currentColor"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
