"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Network, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)" }}>
      <div className="glass" style={{ padding: "2rem", borderRadius: "var(--radius-lg)" }}>
        <Sparkles className="animate-spin" size={32} color="var(--primary)" />
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)", color: "white" }}>
      {/* Sidebar - Desktop */}
      <aside className="glass hidden-mobile" style={{ 
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
        background: "var(--surface-container-low)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.25rem", fontWeight: "bold", marginBottom: "3rem" }}>
          <div style={{ 
            width: "36px", 
            height: "36px", 
            borderRadius: "var(--radius-md)", 
            background: "linear-gradient(135deg, var(--primary), var(--primary-container))", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(124, 92, 252, 0.3)"
          }}>
            <Sparkles size={20} color="white" />
          </div>
          <span style={{ letterSpacing: "-0.02em" }}>Funny Todo</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`btn ${isActive ? "btn-primary" : "btn-ghost"}`}
                style={{ 
                  justifyContent: "flex-start", 
                  width: "100%",
                  background: isActive ? undefined : "transparent",
                  border: isActive ? undefined : "1px solid transparent"
                }}
              >
                <item.icon size={20} style={{ opacity: isActive ? 1 : 0.7 }} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", color: "var(--text-muted)", border: "none", background: "transparent" }}>
            <LogOut size={20} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 60, backdropFilter: "blur(4px)" }}
        />
      )}
      <aside className="glass" style={{ 
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
        transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.25rem", fontWeight: "bold" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} color="white" />
            </div>
            <span>Funny Todo</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "white", padding: "0.5rem", borderRadius: "50%" }}>
            <X size={20} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`btn ${isActive ? "btn-primary" : "btn-ghost"}`}
                style={{ 
                  justifyContent: "flex-start", 
                  width: "100%",
                  background: isActive ? undefined : "transparent",
                  border: isActive ? undefined : "1px solid transparent"
                }}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", border: "none", background: "transparent" }}>
            <LogOut size={20} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }} className="desktop-margin">
        <header style={{ 
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
          zIndex: 40
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="show-mobile"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "white", padding: "0.5rem", borderRadius: "var(--radius-md)" }}
            >
              <Menu size={20} />
            </button>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
              {navItems.find(item => item.href === pathname)?.name || "대시보드"}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div className="glass" style={{ 
              padding: "0.35rem 0.85rem", 
              borderRadius: "var(--radius-full)", 
              fontSize: "0.75rem", 
              fontWeight: 700,
              color: "white", 
              background: "linear-gradient(90deg, var(--primary), #947DFF)",
              border: "none",
              boxShadow: "0 2px 8px rgba(124, 92, 252, 0.3)"
            }}>
              PRO
            </div>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "var(--radius-full)", 
              background: "linear-gradient(135deg, #7C5CFC, #CABEFF)", 
              border: "2px solid rgba(255,255,255,0.1)",
              cursor: "pointer"
            }} />
          </div>
        </header>

        <main style={{ padding: "2.5rem", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );

}
