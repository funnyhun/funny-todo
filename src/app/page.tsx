"use client";

import Image from "next/image";
import { Sparkles, ArrowRight, BrainCircuit, Network, Calendar } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="landing-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'radial-gradient(circle at top right, rgba(124, 92, 252, 0.15), transparent), radial-gradient(circle at bottom left, rgba(124, 92, 252, 0.1), transparent)'
    }}>
      <header style={{ position: 'fixed', top: 0, width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <div className="glass" style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', boxShadow: 'var(--shadow-glow)' }}>
            <Sparkles size={24} color="white" style={{ margin: 'auto' }} />
          </div>
          <span>Funny Todo</span>
        </div>
        {!loading && (
          user ? (
            <Link href="/dashboard" className="btn btn-ghost">Dashboard</Link>
          ) : (
            <Link href="/auth" className="btn btn-ghost">Login</Link>
          )
        )}
      </header>

      <main style={{ textAlign: 'center', maxWidth: '1000px' }}>
        <div className="glass" style={{ display: 'inline-flex', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', gap: '0.5rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--primary)' }}>
          <Sparkles size={16} />
          <span>Idea Bank & Creative Workflow Engine</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
          Unleash Your <span style={{ color: 'var(--primary)' }}>Creative Flow</span>
        </h1>
        
        <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          Transform your scattered thoughts into structured idea chains and visual knowledge nodes. Designed for developers who live in the flow.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem' }}>
          {!loading && (
            user ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <Link href="/auth" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                Get Started Free <ArrowRight size={20} />
              </Link>
            )
          )}
          <button className="btn btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            View Demo
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>
          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}><BrainCircuit size={32} /></div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Idea Chaining</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Connect ideas with prerequisites and sequential triggers. One completion activates the next step automatically.</p>
          </div>
          
          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}><Network size={32} /></div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Blog Node Graph</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Visualize your blog topics as interactive nodes. Expand themes and discover connections in a spatial canvas.</p>
          </div>

          <div className="glass-card">
            <div style={{ color: 'var(--primary)', marginBottom: '1.25rem' }}><Calendar size={32} /></div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Lifecycle Management</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Set periods, track status, and manage your creative output from seed to published article.</p>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '8rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        &copy; 2026 Funny Todo. Designed for funnyhun.
      </footer>
    </div>
  );
}
