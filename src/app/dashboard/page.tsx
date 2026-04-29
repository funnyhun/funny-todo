"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { 
  Plus, 
  Search, 
  Filter, 
  BrainCircuit, 
  Network, 
  CheckCircle2, 
  Clock,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Active Ideas", value: "12", icon: BrainCircuit, color: "var(--primary)" },
    { name: "Blog Nodes", value: "8", icon: Network, color: "#10B981" },
    { name: "Completed", value: "45", icon: CheckCircle2, color: "#3B82F6" },
    { name: "Pending", value: "3", icon: Clock, color: "#F59E0B" },
  ];

  const recentIdeas = [
    { id: 1, title: "Next.js 16 Performance Guide", status: "Active", tags: ["tech", "blog"], date: "2026-04-29" },
    { id: 2, title: "Funny Todo Architecture", status: "Draft", tags: ["project", "design"], date: "2026-04-28" },
    { id: 3, title: "React Flow Custom Nodes", status: "Completed", tags: ["tutorial"], date: "2026-04-25" },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Welcome back, {user?.email?.split('@')[0]} 👋
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>Here's what's happening with your creative flow today.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            <div style={{ 
              width: "48px", 
              height: "48px", 
              borderRadius: "12px", 
              background: `${stat.color}15`, 
              color: stat.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${stat.color}30`
            }}>
              <stat.icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>{stat.name}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Ideas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
        {/* Left Column: Recent Ideas */}
        <div className="glass-card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Recent Ideas</h3>
            <button className="btn btn-ghost" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>View All</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {recentIdeas.map((idea) => (
              <div 
                key={idea.id} 
                className="glass"
                style={{ 
                  padding: "1rem", 
                  borderRadius: "var(--radius-md)", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "background 0.2s ease"
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{idea.title}</div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      padding: "0.15rem 0.5rem", 
                      borderRadius: "4px", 
                      background: idea.status === "Active" ? "rgba(124, 92, 252, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      color: idea.status === "Active" ? "var(--primary)" : "var(--text-muted)",
                      border: idea.status === "Active" ? "1px solid rgba(124, 92, 252, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)"
                    }}>
                      {idea.status}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• {idea.date}</span>
                  </div>
                </div>
                <ArrowUpRight size={18} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Actions & Tips */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="glass-card" style={{ background: "linear-gradient(135deg, var(--primary), #a78bfa)", border: "none" }}>
            <h3 style={{ color: "white", marginBottom: "0.75rem" }}>Create New Idea</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Ready to capture your next big breakthrough? Start a new idea chain now.
            </p>
            <button className="btn" style={{ background: "white", color: "var(--primary)", border: "none", width: "100%" }}>
              <Plus size={20} />
              New Idea
            </button>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Creative Tip</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Use the "Node Graph" to visualize connections between your blog topics. It helps identify content gaps and potential serial posts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
