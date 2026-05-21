"use client";

import { useEffect } from "react";
import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Check for session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/dashboard");
      }
    });

    // Also listen for sign in event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111224", color: "white" }}>
      <div className="glass" style={{ padding: "3rem", borderRadius: "1.5rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <Sparkles size={32} className="animate-pulse" style={{ color: "var(--primary-light)" }} />
        <h2 style={{ marginBottom: "0.5rem", fontSize: "1.5rem", fontWeight: "700" }}>인증 확인 중</h2>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>로그인 정보를 안전하게 처리하고 있습니다.</p>
      </div>
    </div>
  );
}
