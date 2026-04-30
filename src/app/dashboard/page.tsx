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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIdeas } from "@/hooks/useIdeas";

export default function DashboardPage() {
  const { user } = useAuth();
  const { ideas } = useIdeas();
  const router = useRouter();

  const activeCount = ideas.filter(i => i.status?.toLowerCase() === 'active').length;
  const blogCount = ideas.filter(i => i.type === 'blog').length;
  const completedCount = ideas.filter(i => i.status?.toLowerCase() === 'completed').length;
  const pendingCount = ideas.filter(i => {
    const status = i.status?.toLowerCase();
    return status === 'locked' || status === 'archived';
  }).length;

  const stats = [
    { name: "진행 중인 아이디어", value: activeCount.toString(), icon: BrainCircuit, color: "var(--primary)", href: "/dashboard/idea?status=active" },
    { name: "마인드 그래프 노드", value: blogCount.toString(), icon: Network, color: "#10B981", href: "/dashboard/graph" },
    { name: "완료된 항목", value: completedCount.toString(), icon: CheckCircle2, color: "#3B82F6", href: "/dashboard/idea?status=completed" },
    { name: "잠금/보관됨", value: pendingCount.toString(), icon: Clock, color: "#F59E0B", href: "/dashboard/idea?status=pending" },
  ];

  const recentIdeas = ideas.slice(0, 3).map(i => ({
    id: i.id,
    title: i.title,
    status: i.status,
    date: i.created_at ? new Date(i.created_at).toLocaleDateString() : 'Recent'
  }));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          환영합니다, {user?.email?.split('@')[0]}님 👋
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>오늘의 창의적인 흐름을 확인해보세요.</p>
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
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1.25rem", 
              cursor: 'pointer', 
              height: '100%',
              border: "none",
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
              position: "relative",
              overflow: "hidden"
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => router.push(stat.href)}
          >
            {/* Decorative accent */}
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "4px", 
              height: "100%", 
              background: stat.color 
            }} />
            
            <div style={{ 
              width: "48px", 
              height: "48px", 
              borderRadius: "12px", 
              background: `${stat.color}15`, 
              color: stat.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${stat.color}20`
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
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>최근 아이디어</h3>
            <Link href="/dashboard/idea" className="btn btn-ghost" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>모두 보기</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {recentIdeas.length > 0 ? recentIdeas.map((idea) => (
              <Link key={idea.id} href={`/dashboard/idea?id=${idea.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => {
              e.preventDefault();
              router.push(`/dashboard/idea?id=${idea.id}`);
            }}>
                  <div 
                    className="glass"
                    style={{ 
                      padding: "1rem", 
                      borderRadius: "var(--radius-md)", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: "1px solid var(--glass-border)"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{idea.title}</div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ 
                          fontSize: "0.7rem", 
                          padding: "0.15rem 0.5rem", 
                          borderRadius: "4px", 
                          background: idea.status?.toLowerCase() === "active" ? "rgba(124, 92, 252, 0.15)" : "rgba(255, 255, 255, 0.05)",
                          color: idea.status?.toLowerCase() === "active" ? "var(--primary)" : "var(--text-muted)",
                          border: "none"
                        }}>
                          {idea.status?.toLowerCase() === 'completed' ? '완료' : (idea.status?.toLowerCase() === 'locked' ? '잠금' : '진행 중')}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• {idea.date}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} color="var(--text-muted)" />
                  </div>
              </Link>
            )) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>아직 아이디어가 없습니다. 첫 번째 체인을 시작해보세요!</p>
            )}
          </div>
        </div>

        {/* Right Column: Actions & Tips */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div className="glass-card" style={{ background: "linear-gradient(135deg, var(--primary), #a78bfa)", border: "none" }}>
            <h3 style={{ color: "white", marginBottom: "0.75rem" }}>새 아이디어 만들기</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              다음의 위대한 아이디어를 기록할 준비가 되셨나요? 지금 바로 시작하세요.
            </p>
            <Link href="/dashboard/idea?new=true" className="btn" style={{ background: "white", color: "var(--primary)", border: "none", width: "100%", display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <Plus size={20} />
              새 아이디어 추가
            </Link>
          </div>

          <Link href="/dashboard/graph" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{ cursor: 'pointer' }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>창의적인 팁</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.5 }}>
                "마인드 그래프"를 사용하여 블로그 주제 간의 연결을 시각화하세요. 콘텐츠의 공백을 찾고 연재 포스팅을 계획하는 데 도움이 됩니다.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
