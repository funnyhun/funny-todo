"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Network, 
  Calendar, 
  LogOut,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/api/supabase";
import { styles } from "./Sidebar.style";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navItems = [
    { name: "대시보드", href: "/dashboard", icon: LayoutDashboard },
    { name: "아이디어 뱅크", href: "/dashboard/idea", icon: BrainCircuit },
    { name: "마인드 그래프", href: "/dashboard/graph", icon: Network },
    { name: "캘린더", href: "/dashboard/calendar", icon: Calendar },
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="glass" style={styles.loadingCard}>
          <Sparkles className="animate-spin" size={32} color="var(--primary)" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={styles.layoutContainer}>
      {/* Sidebar - Desktop */}
      <aside className="glass hidden-mobile" style={styles.desktopAside}>
        <div style={styles.logoArea}>
          <div style={styles.logoWrapper}>
            <Sparkles size={20} color="white" />
          </div>
          <span style={styles.logoTitle}>Funny Todo</span>
        </div>

        <nav style={styles.navContainer}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`btn ${isActive ? "btn-primary" : "btn-ghost"}`}
                style={styles.navLink(isActive)}
              >
                <item.icon size={20} style={{ opacity: isActive ? 1 : 0.7 }} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={styles.footerArea}>
          <button onClick={handleLogout} className="btn btn-ghost" style={styles.logoutButton}>
            <LogOut size={20} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={styles.overlay}
        />
      )}
      <aside className="glass" style={styles.mobileAside(isSidebarOpen)}>
        <div style={styles.mobileLogoArea}>
          <div style={styles.mobileLogoWrapper}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} color="white" />
            </div>
            <span>Funny Todo</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} style={styles.mobileCloseButton}>
            <X size={20} />
          </button>
        </div>

        <nav style={styles.navContainer}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`btn ${isActive ? "btn-primary" : "btn-ghost"}`}
                style={styles.navLink(isActive)}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={styles.mobileFooterArea}>
          <button onClick={handleLogout} className="btn btn-ghost" style={styles.mobileLogoutButton}>
            <LogOut size={20} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={styles.mainWrapper} className="desktop-margin">
        <header style={styles.headerArea}>
          <div style={styles.headerTitleWrapper}>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="show-mobile"
              style={styles.headerMenuTrigger}
            >
              <Menu size={20} />
            </button>
            <h2 style={styles.headerTitle}>
              {navItems.find(item => item.href === pathname)?.name || "대시보드"}
            </h2>
          </div>

          <div style={styles.headerRightArea}>
            <div className="glass" style={styles.badgePro}>
              PRO
            </div>
            <div style={styles.userAvatar} />
          </div>
        </header>

        <main style={styles.mainContentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
