import React from 'react';

export const styles: {
  container: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  desc: React.CSSProperties;
  grid: React.CSSProperties;
  recentGrid: React.CSSProperties;
  cardHeader: React.CSSProperties;
  recentList: React.CSSProperties;
  recentItem: React.CSSProperties;
  statCard: React.CSSProperties;
  decorativeAccent: (color: string) => React.CSSProperties;
  iconWrapper: (color: string) => React.CSSProperties;
  statName: React.CSSProperties;
  statValue: React.CSSProperties;
  recentCard: React.CSSProperties;
  recentTitle: React.CSSProperties;
  badge: (isActive: boolean) => React.CSSProperties;
  metaText: React.CSSProperties;
  actionCard: React.CSSProperties;
  actionTitle: React.CSSProperties;
  actionDesc: React.CSSProperties;
  actionButton: React.CSSProperties;
  tipCard: React.CSSProperties;
  tipTitle: React.CSSProperties;
  tipDesc: React.CSSProperties;
  actionWrapper: React.CSSProperties;
} = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  desc: {
    color: "var(--text-secondary)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  recentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "2rem",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  recentList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  recentItem: {
    padding: "1rem",
    borderRadius: "var(--radius-md)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid var(--glass-border)",
  },
  statCard: {
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
    overflow: "hidden",
  },
  decorativeAccent: (color: string) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: color,
  }),
  iconWrapper: (color: string) => ({
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: `${color}15`,
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${color}20`,
  }),
  statName: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginBottom: "0.25rem",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  recentCard: {
    padding: "1.5rem",
  },
  recentTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  badge: (isActive: boolean) => ({
    fontSize: "0.7rem",
    padding: "0.15rem 0.5rem",
    borderRadius: "4px",
    background: isActive ? "rgba(124, 92, 252, 0.15)" : "rgba(255, 255, 255, 0.05)",
    color: isActive ? "var(--primary)" : "var(--text-muted)",
    border: "none",
  }),
  metaText: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
  },
  actionCard: {
    background: "linear-gradient(135deg, var(--primary), #a78bfa)",
    border: "none",
  },
  actionTitle: {
    color: "white",
    marginBottom: "0.75rem",
  },
  actionDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  actionButton: {
    background: "white",
    color: "var(--primary)",
    border: "none",
    width: "100%",
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  tipCard: {
    cursor: 'pointer',
  },
  tipTitle: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
  },
  tipDesc: {
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
    lineHeight: 1.5,
  },
  actionWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
};
