"use client";

import Image from "next/image";
import {  ArrowRight, BrainCircuit, Network, Calendar, MousePointer2 } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="landing-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0',
      background: 'var(--bg)',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Dynamic Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(124, 92, 252, 0.08) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(124, 92, 252, 0.05) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <header style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        padding: '1.5rem 4rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'var(--primary)',
            boxShadow: '0 0 20px rgba(124, 92, 252, 0.4)'
          }}>
            {/* <Sparkles size={18} color="white" /> */}
          </div>
          <span>Funny Todo</span>
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="#" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Features</Link>
          <Link href="#" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Workflow</Link>
          {!loading && (
            user ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Dashboard</Link>
            ) : (
              <Link href="/auth" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Login</Link>
            )
          )}
        </nav>
      </header>

      <main style={{ 
        textAlign: 'center', 
        maxWidth: '1200px', 
        padding: '12rem 2rem 8rem',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass" 
          style={{ 
            display: 'inline-flex', 
            padding: '0.5rem 1.25rem', 
            borderRadius: 'var(--radius-full)', 
            gap: '0.6rem', 
            alignItems: 'center', 
            marginBottom: '2.5rem', 
            fontSize: '0.85rem', 
            fontWeight: 700,
            color: 'var(--primary)',
            border: '1px solid var(--border)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          {/* <Sparkles size={14} /> */}
          <span>Idea Bank & Creative Workflow Engine</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)', 
            fontWeight: 900, 
            lineHeight: 0.95, 
            marginBottom: '2rem', 
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)'
          }}
        >
          Unleash Your<br />
          <span style={{ 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(124, 92, 252, 0.3))'
          }}>Creative Flow</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            color: 'var(--text-secondary)', 
            maxWidth: '800px', 
            margin: '0 auto 4rem', 
            lineHeight: 1.5,
            fontWeight: 500
          }}
        >
          Transform scattered thoughts into structured idea chains and visual knowledge nodes. Designed for creators who live in the flow.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '8rem' }}
        >
          {!loading && (
            user ? (
              <Link href="/dashboard" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-xl)' }}>
                Enter Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <Link href="/auth" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-xl)' }}>
                Start Chaining <ArrowRight size={20} />
              </Link>
            )
          )}
          <button className="btn btn-ghost" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            Watch Workflow
          </button>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2.5rem', 
          width: '100%',
          padding: '0 2rem'
        }}>
          {[
            {
              icon: <BrainCircuit size={32} />,
              title: "Idea Chaining",
              desc: "Connect ideas with prerequisites and sequential triggers. One completion activates the next automatically."
            },
            {
              icon: <Network size={32} />,
              title: "MindGraph Visuals",
              desc: "Visualize your blog topics as interactive nodes. Expand themes and discover connections in a spatial canvas."
            },
            {
              icon: <Calendar size={32} />,
              title: "Editorial Calendar",
              desc: "Set periods, track status, and manage your creative output from seed to published article."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card" 
              style={{ 
                padding: '3rem 2.5rem', 
                textAlign: 'left',
                border: '1px solid var(--border)',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ 
                color: 'var(--primary)', 
                marginBottom: '2rem',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(124, 92, 252, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer style={{ 
        width: '100%',
        padding: '4rem 2rem', 
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)', 
        fontSize: '0.9rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontWeight: 700 }}>&copy; 2026 Funny Todo.</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="#">Twitter</Link>
          <Link href="#">Github</Link>
          <Link href="#">Discord</Link>
        </div>
      </footer>
    </div>
  );
}
