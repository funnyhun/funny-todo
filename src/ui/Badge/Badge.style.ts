import React from 'react';

// .pen: Component/StatusBadge
// fill: "#0284c71f" | stroke.fill: "#38bdf84d" | effect.radius: 8
// cornerRadius: 999 | padding: [4, 12] | fontFamily: "Inter" | fontSize: 10 | fontWeight: "800"
export const styles: {
  badge: React.CSSProperties;
  locked: React.CSSProperties;
  ready: React.CSSProperties;
  smashed: React.CSSProperties;
  'in-progress': React.CSSProperties;
  [key: string]: React.CSSProperties;
} = {
  // --- 공통 베이스: 테두리 색상은 각 상태별로 오버라이드 ---
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '999px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '0.05em',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    userSelect: 'none' as React.CSSProperties['userSelect'],
  },
  // locked: 비활성 회색 계열
  locked: {
    background: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.3)',
    color: '#64748b',
  },
  // ready: .pen fill "#0284c71f", stroke "#38bdf84d", text "$primary" (#0284C7)
  ready: {
    background: '#0284c71f',
    borderColor: '#38bdf84d',
    color: '#0284c7',
  },
  // smashed: 성공 초록 계열
  smashed: {
    background: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    color: '#10b981',
  },
  // in-progress: 연한 스카이 블루 계열
  'in-progress': {
    background: 'rgba(14, 165, 233, 0.12)',
    borderColor: '#38bdf84d',
    color: '#0ea5e9',
  },
};
