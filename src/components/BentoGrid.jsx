import React, { useState, useEffect } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import { getProjectUrl } from '../utils/projectRoutes';
import { 
  Sparkles, 
  Terminal, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  ArrowRight, 
  Cpu, 
  Layers, 
  CheckCircle2,
  Code2
} from 'lucide-react';

export default function BentoGrid({ onOpenCaseStudy, onOpenTerminal, onOpenResume, onNavigateToProject }) {
  const { projects, personal, contact } = portfolioData;

  // Real-time ticking Indian Standard Time (IST) clock
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="bento" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 z-20 scroll-mt-20 sm:scroll-mt-24">
      
      {/* Plaque Header Bar (Tactile Workbench Dossier) */}
      <div className="relative manila-card border-[3.5px] border-black rounded-2xl p-5 sm:p-7 shadow-[10px_10px_0px_#000000] mb-8 select-none scroll-reveal">
        <div className="absolute top-3 left-3 plaque-screw" />
        <div className="absolute top-3 right-3 plaque-screw" />
        <div className="absolute bottom-3 left-3 plaque-screw" />
        <div className="absolute bottom-3 right-3 plaque-screw" />

        {/* Top Caution Striping Trim */}
        <div className="w-full h-2.5 bg-caution-stripes-sm rounded-full border border-black mb-4 shadow-xs" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-brand-yellow border-2 border-black rounded-full text-xs font-mono font-black mb-2 shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// 00. SYSTEM OVERVIEW & WORKBENCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight uppercase leading-none">
              ENGINEERING <span className="text-brand-orange wavy-accent">AT A GLANCE</span>
            </h2>
          </div>

          {/* Quick Terminal Trigger Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="self-start sm:self-center px-4 py-2 bg-black hover:bg-gray-800 text-brand-yellow font-mono font-black text-xs uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#ffd31e] flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>LAUNCH DEVELOPER CLI</span>
          </button>
        </div>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ================= 1. VERIFIED ARCHITECTURES (7 Cols) ================= */}
        <div className="md:col-span-7 manila-card border-[3.5px] border-black rounded-2xl p-6 shadow-[10px_10px_0px_#000000] flex flex-col justify-between scroll-reveal scroll-reveal-scale delay-100">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-yellow border border-black rounded-lg text-black">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-black text-lg text-black uppercase tracking-tight">
                  {projects.length} Verified Systems Built
                </h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300">
                100% REPRODUCIBLE
              </span>
            </div>

            <p className="text-xs text-gray-700 font-medium mb-4 leading-relaxed">
              Every project is backed by public source code, verified workflows, strict schemas, and zero synthetic guarantees.
            </p>

            {/* 4 Project Mini-Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    if (onNavigateToProject) {
                      onNavigateToProject(getProjectUrl(p.id));
                    } else {
                      onOpenCaseStudy(p);
                    }
                  }}
                  className="p-3.5 bg-gray-50 hover:bg-brand-yellow/20 border-2 border-black rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 shadow-[2px_2px_0px_#000] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-black text-black group-hover:text-brand-orange-dark">
                        {p.title}
                      </span>
                      <span className="text-xs">{p.flag}</span>
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 font-bold line-clamp-1 mb-2">
                      {p.subtitle}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-[10px] font-mono font-bold text-gray-600">
                    <span className="text-brand-orange-dark font-black">FULL SPECIFICATION</span>
                    <span className="text-black group-hover:underline flex items-center gap-0.5">
                      Case Study <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs font-mono font-bold text-gray-500">
            <span>FULL-STACK & APPLIED AI</span>
            <span className="text-black underline cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              Scroll down for deep dives ↓
            </span>
          </div>
        </div>

        {/* ================= 2. LIVE METRICS & PERFORMANCE (5 Cols) ================= */}
        <div className="md:col-span-5 bg-white border-[3px] border-black rounded-2xl p-6 shadow-[8px_8px_0px_#000000] flex flex-col justify-between scroll-reveal scroll-reveal-scale delay-150">
          <div>
            <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#92f080] border border-black rounded-lg text-black">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-black text-lg text-black uppercase tracking-tight">
                  Architecture Benchmarks
                </h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-gray-500">
                PROVEN SPECS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 border-2 border-black rounded-xl text-center">
                <div className="text-2xl font-black text-black font-mono">&lt;15ms</div>
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase mt-0.5">
                  FAISS Retrieval
                </div>
                <div className="text-[9px] text-gray-400 font-mono">Dense Vector Search</div>
              </div>

              <div className="p-3 bg-gray-50 border-2 border-black rounded-xl text-center">
                <div className="text-2xl font-black text-black font-mono">0.92</div>
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase mt-0.5">
                  Cosine Threshold
                </div>
                <div className="text-[9px] text-gray-400 font-mono">pgvector Deduplication</div>
              </div>

              <div className="p-3 bg-gray-50 border-2 border-black rounded-xl text-center">
                <div className="text-2xl font-black text-black font-mono">100%</div>
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase mt-0.5">
                  Parent Allowlist
                </div>
                <div className="text-[9px] text-gray-400 font-mono">Zero Algorithmic Creep</div>
              </div>

              <div className="p-3 bg-gray-50 border-2 border-black rounded-xl text-center">
                <div className="text-2xl font-black text-black font-mono">5 Sources</div>
                <div className="text-[10px] font-mono font-bold text-gray-600 uppercase mt-0.5">
                  Async Scrapers
                </div>
                <div className="text-[9px] text-gray-400 font-mono">LangGraph Orchestrated</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 text-xs font-mono text-gray-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tested with structured Pydantic schemas & fallbacks</span>
          </div>
        </div>

        {/* ================= 3. LIVE CLOCK & AVAILABILITY (4 Cols) ================= */}
        <div className="md:col-span-4 bg-[#fffdf0] border-[3px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_#000000] flex flex-col justify-between scroll-reveal scroll-reveal-scale delay-200">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-black mb-3">
              <span className="font-mono text-xs font-bold uppercase text-gray-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Live Timezone</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-black font-mono text-black tracking-tight">
                {timeStr || '10:00:00 AM'}
              </div>
              <div className="text-xs font-mono font-bold text-gray-500 mt-0.5">
                IST (UTC+5:30) · India Standard Time
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-emerald-100 border border-emerald-400 rounded-lg text-emerald-900 text-xs font-mono font-bold">
              🟢 Available for Full-Stack & Applied AI Engineering Roles
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-dashed border-gray-400 text-[11px] font-mono text-gray-600">
            Open to remote worldwide & hybrid positions
          </div>
        </div>

        {/* ================= 4. EMBEDDED MINI TERMINAL (4 Cols) ================= */}
        <div 
          onClick={() => {
            sound.playClick();
            onOpenTerminal();
          }}
          className="md:col-span-4 bg-[#0d0e12] border-[3px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_#000000] text-gray-200 flex flex-col justify-between cursor-pointer group hover:border-brand-yellow transition-colors scroll-reveal scroll-reveal-scale delay-250"
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-800 mb-3 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-1 text-gray-400">cli@pravin:~</span>
              </div>
              <span className="text-[10px] text-brand-yellow font-bold group-hover:underline">
                CLICK TO LAUNCH ↗
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs text-gray-300">
              <div className="text-emerald-400">$ pravin --status</div>
              <div className="text-gray-400 text-[11px]">→ Full-Stack & AI Systems Active</div>
              <div className="text-emerald-400">$ pravin --skills</div>
              <div className="text-gray-400 text-[11px]">→ FastAPI, Next.js 14, LangGraph, pgvector</div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between font-mono text-[10px] text-gray-400">
            <span>Terminal v2.4.0</span>
            <span className="text-brand-yellow font-bold">Interactive Shell</span>
          </div>
        </div>

        {/* ================= 5. ENGINEERING STANDARDS (4 Cols) ================= */}
        <div className="md:col-span-4 bg-white border-[3px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_#000000] flex flex-col justify-between scroll-reveal scroll-reveal-scale delay-300">
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-black mb-3">
              <div className="flex items-center gap-1.5">
                <div className="p-1 bg-amber-100 border border-black rounded text-black">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-black text-sm text-black uppercase">
                  Engineering Principles
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-500">TRUST</span>
            </div>

            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-black font-mono">01.</span>
                <span><strong>Honest Scoping:</strong> Transparent boundary between working prototype and enterprise RBAC.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black font-mono">02.</span>
                <span><strong>Resilient Fallbacks:</strong> Keyword matching ensures discovery succeeds if third-party LLM APIs drop.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-black font-mono">03.</span>
                <span><strong>Strict Schemas:</strong> Relational integrity & Pydantic typing protect frontend UI from hallucinations.</span>
              </li>
            </ul>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-200 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 text-center">
            Production Software Mindset
          </div>
        </div>

      </div>

    </section>
  );
}
