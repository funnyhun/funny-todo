'use client';

import React from 'react';
import Link from 'next/link';
import { NeoButton, StatusBadge } from '@/ui';
import { mockIdeas } from '@/data/mockData';

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const idea = mockIdeas.find((i) => i.id === params.id) || mockIdeas[0];

  return (
    <div className="min-h-screen bg-[#fef7ff] flex flex-col">
      {/* Mini Header - Locked at top */}
      <header className="h-20 bg-white border-b-[3px] border-black flex items-center justify-between px-10 sticky top-0 z-50 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-black text-black no-underline hover:text-primary transition-colors text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            BACK
          </Link>
          <div className="h-8 w-[2px] bg-black/10" />
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Relation Editor</h1>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={idea.status} />
          <NeoButton variant="primary" className="h-12 px-6 text-sm">Sync Chain</NeoButton>
        </div>
      </header>

      {/* Main Content - Dual Column like Stitch Relation Editor */}
      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Column: Mission Overview & Steps */}
        <section className="flex-1 p-8 lg:p-12 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-4">Current Node</p>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6">{idea.title}</h2>
              <p className="text-xl font-bold text-[#494454] leading-relaxed">
                {idea.content}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase italic mb-8">Mission Steps</h3>
              {[1, 2, 3].map((step) => (
                <div key={step} className="neo-container p-6 bg-white flex items-start gap-6 group cursor-pointer hover:bg-secondary-container transition-colors">
                  <div className="w-10 h-10 border-[3px] border-black flex items-center justify-center font-black text-xl italic bg-white shadow-[3px_3px_0px_0px_black]">
                    0{step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-lg uppercase mb-1">Modular Sketch {step}</h4>
                    <p className="text-sm font-bold text-[#494454]">Execute high-fidelity prototype and sync with core chain.</p>
                  </div>
                  <div className="w-6 h-6 border-[3px] border-black rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Logic & Controls */}
        <section className="lg:w-[450px] bg-white p-8 lg:p-12 flex flex-col gap-10">
          <div>
            <h3 className="text-xl font-black uppercase italic mb-6">Chain Logic</h3>
            <div className="p-8 bg-secondary-container border-[3px] border-black shadow-[8px_8px_0px_0px_black] rotate-2">
              <h4 className="font-black text-lg uppercase italic mb-4">Auto-Activation</h4>
              <p className="text-sm font-bold leading-relaxed mb-6">
                When all prerequisites are <span className="bg-black text-white px-1">SMASHED</span>, this mission will automatically move to &apos;Ready to Launch&apos;.
              </p>
              <div className="flex items-center justify-between p-4 bg-white border-[3px] border-black">
                <span className="font-black text-xs uppercase">Chain Status</span>
                <span className="font-black text-xs text-primary italic">LOCKED</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black uppercase italic mb-6">Prerequisites</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border-[3px] border-black bg-zinc-50 font-bold text-sm">
                <div className="w-4 h-4 bg-primary border-2 border-black" />
                <span>Define Color Palette</span>
              </div>
              <div className="flex items-center gap-4 p-4 border-[3px] border-black bg-zinc-50 font-bold text-sm">
                <div className="w-4 h-4 bg-white border-2 border-black" />
                <span>Sketch Modular Layouts</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <NeoButton variant="secondary" className="w-full h-16 text-lg italic">Archive Node</NeoButton>
          </div>
        </section>

      </main>
    </div>
  );
}
