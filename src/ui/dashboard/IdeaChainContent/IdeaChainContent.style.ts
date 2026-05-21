import React from 'react';

export const containerStyle: React.CSSProperties = {
  height: "calc(100vh - 152px)",
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
};

export const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "1rem",
  flexShrink: 0,
};

export const flowIndicatorStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.25rem",
};

export const flowDotStyle: React.CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "3px",
  background: "var(--primary-gradient)",
};

export const flowTextStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 700,
  color: "var(--primary)",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
};

export const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  margin: 0,
};

export const filterBadgeContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  marginTop: "0.5rem",
};

export const filterBadgeStyle: React.CSSProperties = {
  padding: "0.25rem 0.6rem",
  borderRadius: "var(--radius-full)",
  fontSize: "0.65rem",
  fontWeight: 700,
  color: "var(--primary)",
  border: "1px solid rgba(124, 92, 252, 0.2)",
  background: "rgba(124, 92, 252, 0.1)",
};

export const clearFilterButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--text-muted)",
  fontSize: "0.65rem",
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
};

export const addButtonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "var(--radius-full)",
  fontSize: "0.85rem",
  height: "fit-content",
};

export const mainLayoutStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  flex: 1,
  minHeight: 0,
};

export const listColumnStyle: React.CSSProperties = {
  width: "360px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  overflowY: "auto",
  paddingRight: "0.5rem",
};

export const emptyStateStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "4rem 2rem",
  color: "var(--text-muted)",
};

export const emptyIconStyle: React.CSSProperties = {
  margin: "0 auto 1rem",
  opacity: 0.2,
};

export const emptyTextStyle: React.CSSProperties = {
  fontSize: "0.9rem",
};

export const detailColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  position: "relative",
};

export const getCardStyle = (isActive: boolean, isLocked: boolean, status: string): React.CSSProperties => {
  const borderLeft = isActive 
    ? "4px solid var(--primary)" 
    : (isLocked ? "4px solid var(--text-muted)" : `4px solid ${status === 'completed' ? 'var(--status-completed)' : 'transparent'}`);
  const background = isActive ? "rgba(124, 92, 252, 0.15)" : "rgba(255, 255, 255, 0.03)";
  const borderColor = isActive ? "rgba(124, 92, 252, 0.3)" : "var(--glass-border)";
  const boxShadow = isActive ? "0 8px 32px rgba(124, 92, 252, 0.1)" : "none";

  return {
    cursor: "pointer",
    padding: "0.85rem 1rem",
    borderLeft,
    background,
    borderColor,
    boxShadow,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };
};

export const cardInnerStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
};

export const getCardIconWrapperStyle = (isLocked: boolean, status: string): React.CSSProperties => {
  const background = isLocked ? "rgba(255,255,255,0.05)" : (status === 'completed' ? "rgba(16, 185, 129, 0.15)" : "rgba(124, 92, 252, 0.15)");
  const color = isLocked ? "var(--text-muted)" : (status === 'completed' ? "var(--status-completed)" : "var(--primary)");
  const border = `1px solid ${isLocked ? "rgba(255,255,255,0.1)" : (status === 'completed' ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)")}`;

  return {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background,
    color,
    border,
  };
};

export const cardContentStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
};

export const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.2rem',
};

export const getCardTitleStyle = (isLocked: boolean): React.CSSProperties => ({
  fontSize: "0.95rem", 
  fontWeight: 700, 
  color: isLocked ? "var(--text-muted)" : "white",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: 0,
});

export const cardTypeStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  opacity: 0.7,
};

export const cardMetaStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const cardMetaTextStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
};

export const detailWrapperStyle: React.CSSProperties = {
  height: "100%", 
  display: "flex", 
  flexDirection: "column", 
  borderRadius: "24px", 
  overflow: "hidden",
  background: "var(--surface-container-low)",
  border: "1px solid var(--glass-border)",
  boxShadow: "var(--shadow-lg)",
};

export const detailHeaderStyle: React.CSSProperties = {
  padding: "1.5rem",
  flexShrink: 0,
  borderBottom: "1px solid var(--border)",
  background: "var(--surface-container-high)",
};

export const detailHeaderTopStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "0.75rem",
};

export const getDetailHeaderBadgeStyle = (status: string): React.CSSProperties => {
  const isCompleted = status === 'completed';
  return {
    padding: "0.2rem 0.6rem", 
    borderRadius: "999px", 
    fontSize: "10px", 
    fontWeight: 700, 
    letterSpacing: "0.05em", 
    textTransform: "uppercase", 
    display: "flex", 
    alignItems: "center", 
    gap: "0.4rem",
    background: isCompleted ? "rgba(16, 185, 129, 0.15)" : "rgba(124, 92, 252, 0.15)",
    color: isCompleted ? "var(--status-completed)" : "var(--primary-container)",
    border: `1px solid ${isCompleted ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)"}`,
  };
};

export const getDetailHeaderBadgeDotStyle = (status: string): React.CSSProperties => {
  const isCompleted = status === 'completed';
  return {
    width: "6px", 
    height: "6px", 
    borderRadius: "50%", 
    background: isCompleted ? "var(--status-completed)" : "var(--primary)",
  };
};

export const detailHeaderActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
};

export const detailHeaderTitleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "white",
  letterSpacing: "-0.01em",
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const detailContentStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  minHeight: 0,
};

export const metricsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.75rem",
};

export const metricCardStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "16px",
  background: "var(--surface-container-high)",
  border: "1px solid var(--border)",
};

export const metricHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.4rem",
};

export const metricLabelStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export const metricValueStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "var(--text-secondary)",
};

export const progressHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "0.4rem",
};

export const progressLabelContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const progressPercentStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--primary-container)",
};

export const progressBarBgStyle: React.CSSProperties = {
  height: "6px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "999px",
  overflow: "hidden",
};

export const getProgressBarFillStyle = (isCompleted: boolean): React.CSSProperties => ({
  height: "100%",
  background: "var(--primary)",
  boxShadow: "0 0 8px rgba(124, 92, 252, 0.5)",
});

export const sectionTitleStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

export const sectionTitleDotStyle: React.CSSProperties = {
  width: "4px",
  height: "12px",
  background: "var(--primary)",
  borderRadius: "999px",
};

export const descriptionBoxStyle: React.CSSProperties = {
  padding: "1.25rem",
  borderRadius: "16px",
  background: "var(--surface-container-highest)",
  border: "1px solid var(--border)",
  fontSize: "0.9375rem",
  color: "var(--text-secondary)",
  lineHeight: 1.7,
  minHeight: "100px",
};

export const flowSectionStyle: React.CSSProperties = {
  position: "relative",
  padding: "1.25rem",
  borderRadius: "16px",
  background: "var(--surface-container-low)",
  border: "1px solid var(--border)",
  overflow: "hidden",
};

export const flowGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "2px",
  background: "linear-gradient(90deg, transparent, rgba(124, 92, 252, 0.4), transparent)",
};

export const flowTitleStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: "0.75rem",
};

export const flowContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  flexWrap: "wrap",
};

export const flowParentCardStyle: React.CSSProperties = {
  padding: "0.4rem 0.75rem",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.05)",
  fontSize: "0.75rem",
  color: "var(--text-muted)",
};

export const flowCurrentCardStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "12px",
  background: "var(--primary)",
  color: "white",
  fontSize: "0.75rem",
  fontWeight: 700,
  boxShadow: "0 4px 12px rgba(124, 92, 252, 0.2)",
  border: "1px solid rgba(255,255,255,0.2)",
};

export const flowChildCardStyle: React.CSSProperties = {
  padding: "0.4rem 0.75rem",
  borderRadius: "12px",
  background: "rgba(124, 92, 252, 0.1)",
  border: "1px solid rgba(124, 92, 252, 0.2)",
  fontSize: "0.75rem",
  color: "var(--primary-container)",
};

export const relationsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

export const relationColStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export const relationColHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const relationTitleStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

export const relationAddBtnStyle: React.CSSProperties = {
  padding: "0.25rem",
  borderRadius: "4px",
  background: "none",
  border: "none",
  color: "var(--text-muted)",
  cursor: "pointer",
};

export const relationsListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  maxHeight: "100px",
  overflowY: "auto",
  paddingRight: "0.25rem",
};

export const relationItemStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.05)",
};

export const relationItemTitleStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--text-secondary)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const relationItemDelBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--text-muted)",
  cursor: "pointer",
  padding: "0.25rem",
};

export const relationEmptyStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "rgba(255,255,255,0.2)",
  textAlign: "center",
  padding: "0.5rem",
  fontStyle: "italic",
  border: "1px dashed rgba(255,255,255,0.05)",
  borderRadius: "12px",
};

export const detailFooterStyle: React.CSSProperties = {
  padding: "1.25rem",
  flexShrink: 0,
  borderTop: "1px solid var(--border)",
  background: "var(--surface-container-high)",
  display: "flex",
  gap: "0.75rem",
};

export const getStatusToggleButtonStyle = (isCompleted: boolean): React.CSSProperties => {
  const background = isCompleted ? "rgba(255,255,255,0.05)" : "var(--primary)";
  const color = isCompleted ? "var(--text-muted)" : "white";
  const boxShadow = isCompleted ? "none" : "0 4px 12px rgba(124, 92, 252, 0.2)";

  return {
    flex: 1, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: "0.5rem", 
    padding: "0.65rem", 
    borderRadius: "12px", 
    fontSize: "0.875rem", 
    fontWeight: 700, 
    cursor: "pointer",
    transition: "all 0.2s",
    background,
    color,
    border: "none",
    boxShadow,
  };
};

export const emptyDetailWrapperStyle: React.CSSProperties = {
  height: "100%", 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center", 
  justifyContent: "center", 
  borderRadius: "24px", 
  background: "var(--surface-container-low)", 
  border: "1px solid var(--glass-border)",
};

export const emptyDetailInnerStyle: React.CSSProperties = {
  textAlign: "center", 
  display: "flex", 
  flexDirection: "column", 
  gap: "1.5rem", 
  maxWidth: "280px",
};

export const emptyDetailIconBgStyle: React.CSSProperties = {
  width: "80px", 
  height: "80px", 
  margin: "0 auto", 
  borderRadius: "24px", 
  background: "rgba(124, 92, 252, 0.05)", 
  border: "1px solid rgba(124, 92, 252, 0.1)", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center",
  boxShadow: "0 0 30px rgba(124, 92, 252, 0.05)",
};

export const emptyDetailTitleStyle: React.CSSProperties = {
  fontSize: "1.1rem", 
  fontWeight: 700, 
  color: "var(--text-primary)", 
  margin: 0,
};

export const emptyDetailDescStyle: React.CSSProperties = {
  fontSize: "0.85rem", 
  color: "var(--text-muted)", 
  margin: 0, 
  lineHeight: 1.5,
};

export const modalOverlayStyle: React.CSSProperties = {
  position: "fixed", 
  inset: 0, 
  zIndex: 100, 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  padding: "1rem",
};

export const modalBgStyle: React.CSSProperties = {
  position: "absolute", 
  inset: 0, 
  background: "rgba(0,0,0,0.8)", 
  backdropFilter: "blur(12px)",
};

export const modalWrapperStyle: React.CSSProperties = {
  width: "100%", 
  maxWidth: "540px", 
  padding: "2.5rem", 
  borderRadius: "var(--radius-2xl)", 
  position: "relative",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
};

export const modalTitleStyle: React.CSSProperties = {
  fontSize: "1.75rem", 
  fontWeight: 800, 
  marginBottom: "2rem", 
  letterSpacing: "-0.02em",
};

export const formStyle: React.CSSProperties = {
  display: "flex", 
  flexDirection: "column", 
  gap: "1.5rem",
};

export const formFieldStyle: React.CSSProperties = {
  display: "flex", 
  flexDirection: "column", 
  gap: "0.75rem",
};

export const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem", 
  fontWeight: 600, 
  color: "var(--text-secondary)", 
  textTransform: "uppercase", 
  letterSpacing: "0.05em",
};

export const inputStyle: React.CSSProperties = {
  padding: "1rem", 
  borderRadius: "var(--radius-lg)", 
  background: "rgba(255,255,255,0.05)", 
  border: "1px solid var(--glass-border)", 
  color: "white",
  fontSize: "1.1rem",
  outline: "none",
};

export const textareaStyle: React.CSSProperties = {
  padding: "1rem", 
  borderRadius: "var(--radius-lg)", 
  background: "rgba(255,255,255,0.05)", 
  border: "1px solid var(--glass-border)", 
  color: "white", 
  resize: "none",
  fontSize: "1rem",
  outline: "none",
  lineHeight: 1.6,
};

export const typeBtnContainerStyle: React.CSSProperties = {
  display: "flex", 
  gap: "1rem",
};

export const selectStyle: React.CSSProperties = {
  padding: "1rem", 
  borderRadius: "var(--radius-lg)", 
  background: "rgba(255,255,255,0.05)", 
  border: "1px solid var(--glass-border)", 
  color: "white",
  fontSize: "1rem",
  outline: "none",
};

export const formActionsStyle: React.CSSProperties = {
  display: "flex", 
  gap: "1rem", 
  marginTop: "1rem",
};

export const relationModalWrapperStyle: React.CSSProperties = {
  width: "100%", 
  maxWidth: "500px", 
  maxHeight: "80vh",
  padding: "2rem", 
  borderRadius: "var(--radius-2xl)", 
  position: "relative",
  border: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column",
};

export const relationModalHeaderStyle: React.CSSProperties = {
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  marginBottom: "1.5rem",
};

export const relationModalTitleStyle: React.CSSProperties = {
  fontSize: "1.5rem", 
  fontWeight: 800, 
  margin: 0,
};

export const relationModalCloseBtnStyle: React.CSSProperties = {
  padding: "0.5rem",
};

export const relationModalTypeSwitcherStyle: React.CSSProperties = {
  display: 'flex', 
  gap: '0.5rem', 
  marginBottom: '1.5rem', 
  background: 'rgba(255,255,255,0.05)', 
  padding: '0.25rem', 
  borderRadius: '12px',
};

export const relationModalDescStyle: React.CSSProperties = {
  fontSize: '0.9rem', 
  color: 'var(--text-muted)', 
  marginBottom: '1.5rem',
};

export const relationModalListStyle: React.CSSProperties = {
  flex: 1, 
  overflowY: "auto", 
  display: "flex", 
  flexDirection: "column", 
  gap: "0.5rem",
};

export const relationModalItemStyle: React.CSSProperties = {
  textAlign: "left", 
  padding: "1rem", 
  display: "flex", 
  alignItems: "center", 
  gap: "1rem",
  border: "1px solid var(--border)",
  cursor: "pointer",
  width: '100%',
};

export const relationModalItemIconStyle: React.CSSProperties = {
  width: "32px", 
  height: "32px", 
  borderRadius: "8px", 
  background: "rgba(124, 92, 252, 0.1)", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  color: "var(--primary)",
};

export const getTypeButtonStyle = (isActive: boolean, activeBg: string): React.CSSProperties => ({
  flex: 1, 
  padding: "0.75rem", 
  borderRadius: "var(--radius-md)", 
  background: isActive ? activeBg : "rgba(255,255,255,0.05)",
  color: "white",
  border: "1px solid",
  borderColor: isActive ? "rgba(255,255,255,0.2)" : "var(--glass-border)",
  cursor: "pointer",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
});

export const getSwitcherButtonStyle = (isActive: boolean): React.CSSProperties => ({
  flex: 1, 
  padding: '0.5rem', 
  borderRadius: '8px', 
  border: 'none', 
  background: isActive ? 'var(--primary)' : 'transparent',
  color: 'white',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});
