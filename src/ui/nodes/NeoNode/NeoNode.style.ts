import React from 'react';

export const styles: {
  card: React.CSSProperties;
  specialCard: React.CSSProperties;
  defaultCard: React.CSSProperties;
  label: React.CSSProperties;
  sub: React.CSSProperties;
  handle: React.CSSProperties;
} = {
  card: {
    minWidth: '200px',
    textAlign: 'center',
    borderRadius: '16px',
    padding: '20px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  specialCard: {
    background: 'rgba(2, 132, 199, 0.15)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(2, 132, 199, 0.3)',
    boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.04)',
    color: '#0f172a',
  },
  defaultCard: {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.04)',
    color: '#0f172a',
  },
  label: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#000000',
  },
  sub: {
    fontSize: '9px',
    fontWeight: '700',
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: '#64748b',
  },
  handle: {
    backgroundColor: '#000000',
    width: '12px',
    height: '12px',
    border: '2px solid white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
  }
};
