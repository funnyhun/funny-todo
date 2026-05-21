import React from 'react';

export const styles: {
  loadingContainer: React.CSSProperties;
  loadingText: React.CSSProperties;
  pageContainer: React.CSSProperties;
  greetingHeader: React.CSSProperties;
  profileWrapper: React.CSSProperties;
  quickStatsGrid: React.CSSProperties;
  progressSection: React.CSSProperties;
  heroWrapper: React.CSSProperties;
  heroImage: React.CSSProperties;
  activeBadge: React.CSSProperties;
  pipelineSection: React.CSSProperties;
} = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
  },
  loadingText: {
    fontSize: '1.875rem',
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: '0.1em',
    color: '#0284c7',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '3rem',
  },
  greetingHeader: {
    padding: '2rem 2rem',
    zIndex: 10,
  },
  profileWrapper: {
    width: '3.5rem',
    height: '3.5rem',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    backgroundColor: '#e0f2fe',
    borderRadius: '9999px',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    position: 'relative',
  },
  quickStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  progressSection: {
    marginBottom: '3rem',
  },
  heroWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    position: 'relative',
    minHeight: '260px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 10,
    opacity: 0.9,
  },
  activeBadge: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    backgroundColor: 'rgba(224, 242, 254, 0.75)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    padding: '0.75rem',
    borderRadius: '1rem',
    transform: 'rotate(12deg)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 20,
  },
  pipelineSection: {
    marginTop: '2rem',
  },
};
