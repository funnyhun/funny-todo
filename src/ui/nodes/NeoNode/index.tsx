'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';
import { styles } from './NeoNode.style';

interface NeoNodeData {
  label: string;
  color?: string;
  type?: string;
}

export const NeoNode = ({ data }: { data: NeoNodeData }) => {
  const isSpecial = data.color?.includes('bg-primary') || data.color?.includes('bg-secondary');
  const variantStyle = isSpecial ? styles.specialCard : styles.defaultCard;
  
  const combinedStyle = {
    ...styles.card,
    ...variantStyle,
  };

  return (
    <div style={combinedStyle as React.CSSProperties} className="glass-container">
      <Handle 
        type="target" 
        position={Position.Top} 
        style={styles.handle as React.CSSProperties}
        className="!w-3 !h-3 !border-2 !border-white !shadow" 
      />
      <div style={styles.label as React.CSSProperties}>{data.label}</div>
      <div style={styles.sub as React.CSSProperties}>{data.type || 'Knowledge Node'}</div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={styles.handle as React.CSSProperties}
        className="!w-3 !h-3 !border-2 !border-white !shadow" 
      />
    </div>
  );
};

export default NeoNode;
