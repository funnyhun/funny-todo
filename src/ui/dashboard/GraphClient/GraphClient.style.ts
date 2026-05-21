import { CSSProperties } from 'react';

/**
 * GraphClient 내부에서 쓰이는 CSS 클래스 매핑
 */
export const graphClasses = {
  headerControl: "glass",
  nodeContainer: "graph-node",
  nodeButton: "btn-ghost",
  modalContent: "glass",
  pageRoot: "fade-in",
} as const;

/**
 * GraphClient 관련 레이아웃 인라인 스타일 정의
 */
export const graphStyles = {
  // Graph Canvas Root
  pageRoot: {
    height: 'calc(100vh - 120px)',
    width: '100%',
    position: 'relative',
  } as CSSProperties,

  // Floating Header
  headerPanel: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
    zIndex: 10,
    padding: '1.5rem 2rem',
    borderRadius: 'var(--radius-2xl)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    border: 'none',
    background: 'var(--glass-bg)',
    boxShadow: 'var(--shadow-xl)',
  } as CSSProperties,

  headerTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.25rem',
  } as CSSProperties,

  headerTitle: {
    fontSize: '1.75rem',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-0.02em',
  } as CSSProperties,

  headerDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    margin: 0,
    fontWeight: 500,
  } as CSSProperties,

  // ReactFlow
  reactFlow: {
    background: 'var(--bg-main)',
    borderRadius: 'var(--radius-2xl)',
    border: '1px solid rgba(255,255,255,0.05)',
  } as CSSProperties,

  controls: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    overflow: 'hidden',
  } as CSSProperties,

  minimap: {
    background: 'rgba(29, 30, 49, 0.5)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    backdropFilter: 'blur(8px)',
  } as CSSProperties,

  // Panels
  topRightPanel: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
    marginRight: '1.5rem',
  } as CSSProperties,

  createBtn: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
  } as CSSProperties,

  shareBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)',
  } as CSSProperties,

  bottomPanel: {
    marginBottom: '2rem',
  } as CSSProperties,

  instructionsCard: {
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    border: 'none',
    background: 'var(--glass-bg)',
    boxShadow: 'var(--shadow-lg)',
  } as CSSProperties,

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  } as CSSProperties,

  modalBg: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(12px)",
  } as CSSProperties,

  modalContainer: {
    width: "100%",
    maxWidth: "440px",
    padding: "2.5rem",
    borderRadius: "var(--radius-2xl)",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
  } as CSSProperties,

  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  } as CSSProperties,

  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  } as CSSProperties,

  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  } as CSSProperties,

  inputLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
  } as CSSProperties,

  inputField: {
    padding: '1rem',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
  } as CSSProperties,

  modalBtnGroup: {
    display: 'flex',
    gap: '1rem',
  } as CSSProperties,

  flexBtn: {
    flex: 1,
  } as CSSProperties,
};

/**
 * CustomNode 내부 스타일 시트
 */
export const nodeStyles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.6rem',
  } as CSSProperties,

  headerTextWrapper: {
    flex: 1,
    minWidth: 0,
  } as CSSProperties,

  title: {
    fontSize: '0.9rem',
    fontWeight: 800,
    color: 'white',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as CSSProperties,

  subtitle: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    fontWeight: 600,
  } as CSSProperties,

  navigateBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
  } as CSSProperties,

  content: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    opacity: 0.9,
    marginBottom: '0.75rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as CSSProperties,

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.5rem',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  } as CSSProperties,

  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  } as CSSProperties,

  statusLabel: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    fontWeight: 700,
    textTransform: 'uppercase',
  } as CSSProperties,

  footerRight: {
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
  } as CSSProperties,
};

/**
 * CustomNode 동적 스타일 생성 함수
 */
export const getCustomNodeStyles = (status: string) => {
  const isCompleted = status === 'completed';
  return {
    indicator: {
      background: isCompleted ? 'var(--status-completed)' : 'var(--primary)',
    } as CSSProperties,
    
    handle: {
      background: 'var(--primary)',
      border: '2px solid var(--background)',
      width: '10px',
      height: '10px',
    } as CSSProperties,
    
    iconWrapper: {
      width: '32px',
      height: '32px',
      borderRadius: '10px',
      background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(124, 92, 252, 0.15)',
      color: isCompleted ? 'var(--status-completed)' : 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(124, 92, 252, 0.2)'}`,
    } as CSSProperties,

    statusDot: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: isCompleted ? 'var(--status-completed)' : 'var(--primary)',
    } as CSSProperties,
  };
};
