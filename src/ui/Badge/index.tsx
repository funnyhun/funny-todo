'use client';

import React from 'react';
import { styles } from './Badge.style';

interface StatusBadgeProps {
  status: 'locked' | 'ready' | 'smashed' | 'in-progress';
}

// .pen: Component/StatusBadge (ref: sA80K)
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyle = styles[status] || {};
  const combinedStyle: React.CSSProperties = {
    ...styles.badge,
    ...statusStyle,
  };

  const labels: Record<StatusBadgeProps['status'], string> = {
    locked: 'LOCKED',
    ready: 'READY',          // .pen: content: "READY"
    smashed: 'SMASHED!',
    'in-progress': 'PROCESSING...',
  };

  return (
    <span
      className="glass-badge"
      style={combinedStyle as React.CSSProperties}
    >
      {labels[status]}
    </span>
  );
};
