import React from 'react';

export const styles: {
  card: React.CSSProperties;
  smashedCard: React.CSSProperties;
  innerContainer: React.CSSProperties;
  title: React.CSSProperties;
  smashedTitle: React.CSSProperties;
  content: React.CSSProperties;
  footer: React.CSSProperties;
  indicatorContainer: React.CSSProperties;
  indicatorDot: React.CSSProperties;
  indicatorDotActive: React.CSSProperties;
  unitLabel: React.CSSProperties;
  actionButton: React.CSSProperties;
  actionButtonInteractable: React.CSSProperties;
  actionButtonDisabled: React.CSSProperties;
  [key: string]: React.CSSProperties;
} = {
  card: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.04)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '320px',
    height: '100%',
    overflow: 'hidden',
  },
  smashedCard: {
    background: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.75,
    boxShadow: 'none',
  },
  innerContainer: {
    marginTop: '24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  smashedTitle: {
    textDecoration: 'line-through',
    opacity: 0.35,
  },
  content: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#64748b',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,
    overflow: 'hidden',
    lineHeight: '1.6',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    paddingTop: '16px',
    marginTop: 'auto',
  },
  indicatorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  indicatorDot: {
    width: '8px',
    height: '8px',
    borderRadius: '999px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    background: '#cbd5e1',
    transition: 'all 0.3s ease',
  },
  indicatorDotActive: {
    background: '#10b981',
    boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
  },
  unitLabel: {
    fontSize: '10px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#64748b',
  },
  actionButton: {
    width: '36px',
    height: '36px',
    borderRadius: '999px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  actionButtonInteractable: {
    background: 'rgba(2, 132, 199, 0.1)',
    borderColor: 'rgba(2, 132, 199, 0.2)',
    color: '#0284c7',
  },
  actionButtonDisabled: {
    background: 'rgba(241, 245, 249, 0.3)',
    borderColor: 'rgba(241, 245, 249, 0.4)',
    color: '#94a3b8',
    cursor: 'default',
    opacity: 0.5,
  }
};
