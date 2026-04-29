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
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Idea Chain", href: "/dashboard/chain", icon: BrainCircuit },
    { name: "Node Graph", href: "/dashboard/graph", icon: Network },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
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
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-main)", color: "white" }}>
      {/* Sidebar - Desktop */}
      <aside className="glass" style={{ 
        width: "260px", 
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        zIndex: 50,
        position: "fixed",
        height: "100vh",
        left: 0,
        top: 0,
        transition: "transform 0.3s ease",
        transform: "translateX(0)"
      }} className="hidden-mobile">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.25rem", fontWeight: "bold", marginBottom: "3rem" }}>
          <div className="glass" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={18} color="white" />
          </div>
          <span>Funny Todo</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`btn ${pathname === item.href ? "btn-primary" : "btn-ghost"}`}
              style={{ justifyContent: "flex-start", gap: "0.75rem", width: "100%" }}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", gap: "0.75rem", color: "var(--text-muted)" }}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 60, backdropFilter: "blur(4px)" }}
        />
      )}
      <aside className="glass" style={{ 
        width: "260px", 
        zIndex: 70,
        position: "fixed",
        height: "100vh",
        left: 0,
        top: 0,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.25rem", fontWeight: "bold" }}>
            <div className="glass" style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} color="white" />
            </div>
            <span>Funny Todo</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} style={{ background: "none", border: "none", color: "white" }}>
            <X size={24} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`btn ${pathname === item.href ? "btn-primary" : "btn-ghost"}`}
              style={{ justifyContent: "flex-start", gap: "0.75rem", width: "100%" }}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", gap: "0.75rem" }}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: "0", transition: "margin 0.3s ease" }} className="desktop-margin">
        <header style={{ 
          height: "64px", 
          borderBottom: "1px solid rgba(255,255,255,0.05)", 
          display: "flex", 
          alignItems: "center", 
          padding: "0 1.5rem",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "rgba(10, 10, 12, 0.8)",
          backdropFilter: "blur(12px)",
          zIndex: 40
        }}>
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="show-mobile"
            style={{ background: "none", border: "none", color: "white" }}
          >
            <Menu size={24} />
          </button>

          <div style={{ fontSize: "1rem", fontWeight: 600 }}>
            {navItems.find(item => item.href === pathname)?.name || "Dashboard"}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="glass" style={{ padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", fontSize: "0.8rem", color: "var(--primary)", border: "1px solid rgba(124, 92, 252, 0.2)" }}>
              PRO
            </div>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), #a78bfa)", border: "2px solid rgba(255,255,255,0.1)" }} />
          </div>
        </header>

        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
