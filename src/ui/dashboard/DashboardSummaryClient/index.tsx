"use client";

import React from "react";
import { useAuth } from "@/store/authStore";
import { 
  Plus, 
  BrainCircuit, 
  Network, 
  CheckCircle2, 
  Clock,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIdeas } from "@/common/hooks/useIdeas";
import { styles } from "./DashboardSummaryClient.style";

export const DashboardSummaryClient = () => {
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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          환영합니다, {user?.email?.split('@')[0]}님
        </h1>
        <p style={styles.desc}>오늘의 창의적인 흐름을 확인해보세요.</p>
      </header>

      {/* Stats Grid */}
      <div style={styles.grid}>
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={styles.statCard}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => router.push(stat.href)}
          >
            {/* Decorative accent */}
            <div style={styles.decorativeAccent(stat.color)} />
            
            <div style={styles.iconWrapper(stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <div style={styles.statName}>{stat.name}</div>
              <div style={styles.statValue}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Recent Ideas */}
      <div style={styles.recentGrid}>
        {/* Left Column: Recent Ideas */}
        <div className="glass-card" style={styles.recentCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.recentTitle}>최근 아이디어</h3>
            <Link href="/dashboard/idea" className="btn btn-ghost" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>모두 보기</Link>
          </div>

          <div style={styles.recentList}>
            {recentIdeas.length > 0 ? recentIdeas.map((idea) => (
              <Link key={idea.id} href={`/dashboard/idea?id=${idea.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={(e) => {
                e.preventDefault();
                router.push(`/dashboard/idea?id=${idea.id}`);
              }}>
                <div className="glass" style={styles.recentItem}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{idea.title}</div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={styles.badge(idea.status?.toLowerCase() === "active")}>
                        {idea.status?.toLowerCase() === 'completed' ? '완료' : (idea.status?.toLowerCase() === 'locked' ? '잠금' : '진행 중')}
                      </span>
                      <span style={styles.metaText}>• {idea.date}</span>
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
        <div style={styles.actionWrapper}>
          <div className="glass-card" style={styles.actionCard}>
            <h3 style={styles.actionTitle}>새 아이디어 만들기</h3>
            <p style={styles.actionDesc}>
              다음의 위대한 아이디어를 기록할 준비가 되셨나요? 지금 바로 시작하세요.
            </p>
            <Link href="/dashboard/idea?new=true" className="btn" style={styles.actionButton}>
              <Plus size={20} />
              새 아이디어 추가
            </Link>
          </div>

          <Link href="/dashboard/graph" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={styles.tipCard}>
              <h3 style={styles.tipTitle}>창의적인 팁</h3>
              <p style={styles.tipDesc}>
                "마인드 그래프"를 사용하여 블로그 주제 간의 연결을 시각화하세요. 콘텐츠의 공백을 찾고 연재 포스팅을 계획하는 데 도움이 됩니다.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryClient;
