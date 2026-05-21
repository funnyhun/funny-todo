import React from 'react';

export const styles: {
  sidebar: React.CSSProperties;
  logoContainer: React.CSSProperties;
  logoTitle: React.CSSProperties;
  logoSub: React.CSSProperties;
  navContainer: React.CSSProperties;
  mobileNav: React.CSSProperties;
  mobileFlex: React.CSSProperties;
  mobileItem: React.CSSProperties;
  mobileLabel: React.CSSProperties;
  [key: string]: React.CSSProperties;
} = {
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '18rem', // w-72
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.5)',
    zIndex: 50,
    boxShadow: '4px 0 32px 0 rgba(14, 165, 233, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    padding: '2.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  logoContainer: {
    marginBottom: '4rem',
  },
  logoTitle: {
    fontSize: '1.875rem',
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: '-0.04em',
    color: '#0f172a',
    lineHeight: '1',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
  },
  logoSub: {
    fontSize: '0.65rem',
    fontWeight: '800',
    letterSpacing: '0.15em',
    color: '#0284c7',
    textTransform: 'uppercase',
  },
  navContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  // Mobile Navigation styles
  mobileNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
    zIndex: 50,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    boxShadow: '0 -8px 32px 0 rgba(14, 165, 233, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  mobileFlex: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '4rem',
  },
  mobileItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  mobileLabel: {
    fontSize: '0.6rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
  }
};
