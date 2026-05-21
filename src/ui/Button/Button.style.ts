import React from 'react';

export const styles: {
  button: React.CSSProperties;
  primary: React.CSSProperties;
  secondary: React.CSSProperties;
  success: React.CSSProperties;
  ghost: React.CSSProperties;
  [key: string]: React.CSSProperties;
} = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 24px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '16px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.04)',
    color: '#0f172a',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    userSelect: 'none' as React.CSSProperties['userSelect'],
  },
  primary: {
    background: 'rgba(2, 132, 199, 0.15)',
    borderColor: 'rgba(2, 132, 199, 0.3)',
    color: '#0284c7',
  },
  secondary: {
    background: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    color: '#64748b',
  },
  success: {
    background: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    color: '#10b981',
  },
  ghost: {
    background: 'transparent',
    borderColor: 'transparent',
    color: '#0f172a',
    boxShadow: 'none',
  }
};
