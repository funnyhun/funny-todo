import React from "react";

export const styles: {
  loadingContainer: React.CSSProperties;
  loadingCard: React.CSSProperties;
  layoutContainer: React.CSSProperties;
  desktopAside: React.CSSProperties;
  logoArea: React.CSSProperties;
  logoWrapper: React.CSSProperties;
  logoTitle: React.CSSProperties;
  navContainer: React.CSSProperties;
  navLink: (isActive: boolean) => React.CSSProperties;
  footerArea: React.CSSProperties;
  logoutButton: React.CSSProperties;
  overlay: React.CSSProperties;
  mobileAside: (isOpen: boolean) => React.CSSProperties;
  mobileLogoArea: React.CSSProperties;
  mobileLogoWrapper: React.CSSProperties;
  mobileCloseButton: React.CSSProperties;
  mobileFooterArea: React.CSSProperties;
  mobileLogoutButton: React.CSSProperties;
  mainWrapper: React.CSSProperties;
  headerArea: React.CSSProperties;
  headerTitleWrapper: React.CSSProperties;
  headerMenuTrigger: React.CSSProperties;
  headerTitle: React.CSSProperties;
  headerRightArea: React.CSSProperties;
  badgePro: React.CSSProperties;
  userAvatar: React.CSSProperties;
  mainContentArea: React.CSSProperties;
} = {
  loadingContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-main)",
  },
  loadingCard: {
    padding: "2rem",
    borderRadius: "var(--radius-lg)",
  },
  layoutContainer: {
    display: "flex",
    minHeight: "100vh",
    background: "var(--background)",
    color: "white",
  },
  desktopAside: {
    width: "260px",
    borderRight: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1.5rem",
    zIndex: 50,
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
    background: "var(--surface-container-low)",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "3rem",
  },
  logoWrapper: {
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-md)",
    background: "linear-gradient(135deg, var(--primary), var(--primary-container))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(124, 92, 252, 0.3)",
  },
  logoTitle: {
    letterSpacing: "-0.02em",
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flex: 1,
  },
  navLink: (isActive: boolean) => ({
    justifyContent: "flex-start",
    width: "100%",
    background: isActive ? undefined : "transparent",
    border: isActive ? undefined : "1px solid transparent",
  }),
  footerArea: {
    paddingTop: "2rem",
    borderTop: "1px solid var(--border)",
  },
  logoutButton: {
    width: "100%",
    justifyContent: "flex-start",
    color: "var(--text-muted)",
    border: "none",
    background: "transparent",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 60,
    backdropFilter: "blur(4px)",
  },
  mobileAside: (isOpen: boolean) => ({
    width: "280px",
    zIndex: 70,
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    background: "var(--surface-container-high)",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  }),
  mobileLogoArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3rem",
  },
  mobileLogoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  mobileCloseButton: {
    background: "rgba(255,255,255,0.05)",
    border: "none",
    color: "white",
    padding: "0.5rem",
    borderRadius: "50%",
  },
  mobileFooterArea: {
    paddingTop: "2rem",
    borderTop: "1px solid var(--border)",
  },
  mobileLogoutButton: {
    width: "100%",
    justifyContent: "flex-start",
    border: "none",
    background: "transparent",
  },
  mainWrapper: {
    flex: 1,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  headerArea: {
    height: "72px",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    padding: "0 2rem",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    background: "rgba(17, 18, 36, 0.8)",
    backdropFilter: "blur(20px)",
    zIndex: 40,
  },
  headerTitleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  headerMenuTrigger: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid var(--border)",
    color: "white",
    padding: "0.5rem",
    borderRadius: "var(--radius-md)",
  },
  headerTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: 0,
  },
  headerRightArea: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
  },
  badgePro: {
    padding: "0.35rem 0.85rem",
    borderRadius: "var(--radius-full)",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "white",
    background: "linear-gradient(90deg, var(--primary), #947DFF)",
    border: "none",
    boxShadow: "0 2px 8px rgba(124, 92, 252, 0.3)",
  },
  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-full)",
    background: "linear-gradient(135deg, #7C5CFC, #CABEFF)",
    border: "2px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
  },
  mainContentArea: {
    padding: "2.5rem",
    flex: 1,
  },
};
