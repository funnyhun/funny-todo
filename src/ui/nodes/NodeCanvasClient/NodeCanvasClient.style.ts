import { CSSProperties } from 'react';

/**
 * NodeCanvasClient 컴포넌트용 CSS 클래스 스타일 정의
 */
export const nodeCanvasStyles = {
  container: "min-h-screen bg-[#f0f9ff] flex flex-col font-sans relative overflow-hidden",
  
  // Canvas radial background
  radialBg: "absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] background-radial z-0 pointer-events-none opacity-40 bg-radial",
  
  // Header styles
  header: "h-20 bg-white/45 backdrop-blur-md border-b border-white/50 flex items-center justify-between px-8 z-50 shadow-sm relative",
  headerLeft: "flex items-center gap-6",
  exitLink: "font-extrabold text-slate-700 no-underline hover:text-[#0284c7] transition-colors text-sm flex items-center gap-1.5 uppercase tracking-wider",
  divider: "h-6 w-px bg-slate-300/60",
  title: "text-xl font-black italic uppercase tracking-tighter text-slate-800",
  headerRight: "flex gap-3",

  // ReactFlow Canvas Area
  canvasArea: "flex-1 w-full h-[calc(100vh-5rem)] relative bg-transparent overflow-hidden z-10",
  reactFlow: "bg-transparent",
  
  // Floating Info Card
  infoCard: "absolute bottom-8 left-8 p-5 bg-[#10b981]/15 backdrop-blur border border-[#10b981]/30 rounded-2xl shadow-lg pointer-events-none max-w-xs z-30 flex gap-4 items-start",
  infoIconWrapper: "p-2.5 bg-[#10b981]/25 text-emerald-700 rounded-xl",
  infoTitle: "font-extrabold text-sm uppercase italic mb-1 text-emerald-800",
  infoDesc: "text-[11px] font-bold text-emerald-700/80 leading-normal",
} as const;

/**
 * 인라인으로 들어가야 하는 동적/특수 인라인 스타일 상수 정의
 */
export const nodeCanvasInlineStyles = {
  edge: {
    strokeWidth: 3,
    stroke: 'rgba(14, 165, 233, 0.4)',
  } as CSSProperties,
  background: {
    opacity: 0.15,
  } as CSSProperties,
  compass: {
    animationDuration: '6s',
  } as CSSProperties,
};
