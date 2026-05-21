'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { NeoButton, IdeaCard } from '@/ui';
import { useIdeas } from '@/common/hooks/useIdeas';
import { Sparkles, Brain, Network, Compass, Plus } from 'lucide-react';
import { styles } from './DashboardClient.style';

const HERO_IMAGE = '/idea_flow_hero.png';

interface DashboardClientProps {
  initialIdeas: any[];
}

export const DashboardClient = ({ initialIdeas }: DashboardClientProps) => {
  const { ideas, loading, smashIdea } = useIdeas();

  // 만약 훅의 전역 로딩이 끝났다면 실제 상태의 ideas를 쓰고, 로딩 중이면 SSR 초기 데이터를 씁니다.
  const displayIdeas = useMemo(() => {
    return ideas.length > 0 ? ideas : initialIdeas;
  }, [ideas, initialIdeas]);

  const { tasksSmashedCount, progressPercent } = useMemo(() => {
    const smashed = displayIdeas.filter(i => i.status === 'smashed').length;
    const percent = displayIdeas.length > 0 ? Math.round((smashed / displayIdeas.length) * 100) : 0;
    return { tasksSmashedCount: smashed, progressPercent: percent };
  }, [displayIdeas]);

  if (loading && ideas.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={styles.loadingText}
        >
          SYNCING...
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      {/* Header & Greeting Section */}
      <header style={styles.greetingHeader}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none mb-3 flex items-center gap-2">
              Funny Todo <Sparkles className="text-[#0284c7] animate-pulse" size={32} />
            </h1>
            <h2 className="text-lg md:text-xl font-bold text-slate-600 leading-tight">
              Ready to conquer the day, <span className="text-[#0284c7] font-black">Minhulee?</span><br />
              Smash your goals and win some epic digital dust!
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <NeoButton variant="primary" className="h-14 px-8 italic font-black shadow-md flex items-center gap-2">
               <Plus size={20} /> NEW MISSION
             </NeoButton>
             <div style={styles.profileWrapper}>
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=funnyhun" 
                 alt="Profile" 
                 className="w-full h-full object-cover"
               />
             </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={styles.quickStatsGrid}>
          <div className="glass-container p-6 flex items-center gap-5">
             <div className="p-4 bg-sky-100/50 rounded-2xl text-[#0284c7]">
               <Brain size={28} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Ideas Cultivated</p>
               <p className="text-3xl font-black italic text-slate-800">128</p>
             </div>
          </div>
          <div className="glass-container p-6 flex items-center gap-5">
             <div className="p-4 bg-emerald-100/50 rounded-2xl text-emerald-600">
               <Network size={28} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Nodes Synced</p>
               <p className="text-3xl font-black italic text-slate-800">{tasksSmashedCount}</p>
             </div>
          </div>
          <div className="glass-container bg-sky-600/90 text-white p-6 flex items-center gap-5 shadow-lg border-sky-400/30">
             <div className="p-4 bg-white/10 rounded-2xl text-white">
               <Compass size={28} />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-sky-200 mb-1">Brain Load</p>
               <p className="text-3xl font-black italic text-white">OPTIMAL</p>
             </div>
          </div>
        </div>
      </header>

      {/* Main Mission Control */}
      <main className="flex-1 px-8 md:px-12 pb-20 z-10 max-w-[1600px]">
        
        {/* Active Chain Progress Section */}
        <section style={styles.progressSection}>
          <div className="glass-container overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/40">
              <h3 className="text-2xl font-black uppercase italic mb-5 text-slate-800 flex items-center gap-2">
                Active Chain Progress
              </h3>
              <div className="glass-progress mb-5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="glass-progress-fill"
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-base font-bold text-slate-600">
                The <span className="text-[#0284c7] font-black italic">&quot;Mega-Blog&quot;</span> sequence is nearly locked. <br />
                Complete {displayIdeas.length - tasksSmashedCount} more nodes to unleash the beast!
              </p>
            </div>
            <div className="md:w-1/2" style={styles.heroWrapper}>
              <Image 
                src={HERO_IMAGE} 
                alt="Idea Flow" 
                width={360} 
                height={360} 
                className="w-full h-full object-contain relative z-10 opacity-90 drop-shadow-md"
              />
              <div style={styles.activeBadge}>
                <span className="font-black text-xl text-[#0284c7]">ACTIVE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Current Idea Pipeline (The Grid) */}
        <section style={styles.pipelineSection}>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-slate-800">
                Current Idea Pipeline
              </h3>
              <div className="h-1 w-32 bg-[#0284c7] rounded-full" />
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {displayIdeas.map((idea, index) => (
                <motion.div 
                  key={idea.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <IdeaCard 
                    title={idea.title}
                    content={idea.content}
                    status={idea.status}
                    type={idea.type}
                    onAction={() => smashIdea(idea.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      {/* Mobile Floating Action */}
      <div className="fixed bottom-24 right-8 xl:hidden z-40">
        <button className="w-16 h-16 rounded-full border border-sky-400/40 shadow-xl text-3xl font-black bg-sky-600/90 text-white flex items-center justify-center backdrop-blur-md">
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
};

export default DashboardClient;
