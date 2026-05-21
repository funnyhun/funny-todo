"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/api/supabase";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleGithubLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="landing-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass" 
        style={{ width: "100%", maxWidth: "400px", padding: "3.5rem 2.5rem", borderRadius: "var(--radius-xl)", position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        <div style={{ marginBottom: "3rem" }}>
          <div className="icon-pulse" style={{ display: "inline-flex", padding: "1.25rem", borderRadius: "1.25rem", background: "rgba(124, 92, 252, 0.1)", color: "var(--primary)", marginBottom: "1.5rem" }}>
            <Sparkles size={40} />
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.75rem", letterSpacing: "-0.02em", color: "white" }}>
            Funny Todo
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.5" }}>
            간편하게 로그인하고<br />당신만의 아이디어를 연결하세요.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button 
            onClick={handleGithubLogin}
            disabled={loading}
            className="btn btn-primary" 
            style={{ 
              width: "100%", 
              padding: "1rem", 
              borderRadius: "var(--radius-lg)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "0.75rem", 
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              border: "none"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            {loading ? "연결 중..." : "GitHub으로 시작하기"}
          </button>
          
          {error && (
            <p style={{ color: "#ff4d4d", fontSize: "0.85rem", textAlign: "center", marginTop: "1rem", background: "rgba(255, 77, 77, 0.1)", padding: "0.5rem", borderRadius: "var(--radius-sm)" }}>
              {error}
            </p>
          )}
        </div>

        <p style={{ marginTop: "4rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          로그인 시 서비스 이용약관에 동의하게 됩니다.
        </p>
      </motion.div>
    </div>
  );
}
