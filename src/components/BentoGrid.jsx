import React, { useState, useEffect } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';
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

export default function BentoGrid({ onOpenCaseStudy, onOpenTerminal, onOpenResume }) {
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
    <section id="bento" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 z-20">
      
      {/* Plaque Header Bar with 3D Tilt */}
      <ThreeDTilt maxTilt={4} scale={1.005} glare={true} className="rounded-2xl mb-8">
        <div className="relative bg-[#fcfcfc] dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-5 sm:p-7 shadow-[10px_10px_0px_#000000] select-none">
          <div className="absolute top-3 left-3 plaque-screw" />
          <div className="absolute top-3 right-3 plaque-screw" />
          <div className="absolute bottom-3 left-3 plaque-screw" />
          <div className="absolute bottom-3 right-3 plaque-screw" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffd31e] border-2 border-black rounded-full text-xs font-mono font-black mb-2 shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>// SYSTEM OVERVIEW & LIVE METRICS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black dark:text-white tracking-tight uppercase leading-none">
                Engineering <span className="text-brand-orange">At A Glance</span>
              </h2>
            </div>

            {/* Quick Terminal Trigger Button with 3D Tactile Physics */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              className="self-start sm:self-center px-4 py-2 bg-black hover:bg-gray-800 text-[#ffd31e] font-mono font-black text-xs uppercase rounded-xl border-2 border-black shadow-[4px_4px_0px_#ffd31e] flex items-center gap-2 btn-tactile-3d cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[#00ff88]" />
              <span>LAUNCH DEVELOPER CLI</span>
            </button>
          </div>
        </div>
      </ThreeDTilt>

      {/* Bento Layout Grid with Vibrant Neo Colors & 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ================= 1. VERIFIED ARCHITECTURES (7 Cols - Electric Sky Tint) ================= */}
        <div className="md:col-span-7">
          <ThreeDTilt maxTilt={6} scale={1.015} glare={true} className="h-full rounded-2xl">
            <div className="bg-[#f0f9ff] dark:bg-[#0c2438] border-[3px] border-black rounded-2xl p-6 shadow-[8px_8px_0px_#000000] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#00f0ff] border-2 border-black rounded-xl text-black shadow-[2px_2px_0px_#000]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="font-black text-lg text-black dark:text-white uppercase tracking-tight">
                      4 Verified Systems Built
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-black text-emerald-900 bg-[#a7f3d0] px-2.5 py-1 rounded-md border-2 border-black shadow-[1px_1px_0px_#000]">
                    100% REPRODUCIBLE
                  </span>
                </div>

                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium mb-4 leading-relaxed">
                  Every project is backed by public source code, verified workflows, strict schemas, and zero synthetic guarantees.
                </p>

                {/* 4 Project Mini-Bento Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.map((p, idx) => {
                    const cardColors = [
                      'bg-rose-50 hover:bg-rose-100 border-rose-300',
                      'bg-purple-50 hover:bg-purple-100 border-purple-300',
                      'bg-emerald-50 hover:bg-emerald-100 border-emerald-300',
                      'bg-cyan-50 hover:bg-cyan-100 border-cyan-300'
                    ];
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          sound.playClick();
                          onOpenCaseStudy(p);
                        }}
                        className={`p-3.5 ${cardColors[idx % cardColors.length]} dark:bg-black/30 border-2 border-black rounded-xl cursor-pointer transition-all btn-tactile-3d shadow-[3px_3px_0px_#000] flex flex-col justify-between group`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-black text-black dark:text-white group-hover:text-brand-orange-dark">
                              {p.title}
                            </span>
                            <span className="text-sm">{p.flag}</span>
                          </div>
                          <div className="text-[10px] font-mono text-gray-600 dark:text-gray-400 font-bold line-clamp-1 mb-2">
                            {p.subtitle}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-black/20 text-[10px] font-mono font-black text-gray-700 dark:text-gray-300">
                          <span className="bg-white/80 dark:bg-black/40 px-1.5 py-0.5 rounded border border-black/30">{p.caseStudy.workflowSteps.length} Steps</span>
                          <span className="text-black dark:text-white group-hover:underline flex items-center gap-0.5 font-bold">
                            Case Study <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono font-black text-gray-600 dark:text-gray-400">
                <span className="text-cyan-800 dark:text-cyan-300">FULL-STACK & APPLIED AI</span>
                <span className="text-black dark:text-white underline cursor-pointer hover:text-brand-orange" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore deep dives ↓
                </span>
              </div>
            </div>
          </ThreeDTilt>
        </div>

        {/* ================= 2. LIVE METRICS & PERFORMANCE (5 Cols - Mint Neon Tint) ================= */}
        <div className="md:col-span-5">
          <ThreeDTilt maxTilt={6} scale={1.015} glare={true} className="h-full rounded-2xl">
            <div className="bg-[#f0fdf4] dark:bg-[#0a2919] border-[3px] border-black rounded-2xl p-6 shadow-[8px_8px_0px_#000000] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-[#00ff88] border-2 border-black rounded-xl text-black shadow-[2px_2px_0px_#000]">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="font-black text-lg text-black dark:text-white uppercase tracking-tight">
                      Architecture Benchmarks
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-200/60 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400">
                    PROVEN SPECS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Metric 1 */}
                  <div className="p-3 bg-white dark:bg-black/40 border-2 border-black rounded-xl text-center shadow-[3px_3px_0px_#000] btn-tactile-3d">
                    <div className="text-2xl font-black text-[#0284c7] font-mono">&lt;15ms</div>
                    <div className="text-[10px] font-mono font-black text-gray-800 dark:text-gray-200 uppercase mt-0.5">
                      FAISS Retrieval
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono">Dense Vector Search</div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3 bg-white dark:bg-black/40 border-2 border-black rounded-xl text-center shadow-[3px_3px_0px_#000] btn-tactile-3d">
                    <div className="text-2xl font-black text-[#7c3aed] font-mono">0.92</div>
                    <div className="text-[10px] font-mono font-black text-gray-800 dark:text-gray-200 uppercase mt-0.5">
                      Cosine Threshold
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono">pgvector Deduplication</div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-3 bg-white dark:bg-black/40 border-2 border-black rounded-xl text-center shadow-[3px_3px_0px_#000] btn-tactile-3d">
                    <div className="text-2xl font-black text-[#e11d48] font-mono">100%</div>
                    <div className="text-[10px] font-mono font-black text-gray-800 dark:text-gray-200 uppercase mt-0.5">
                      Parent Allowlist
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono">Zero Algorithmic Creep</div>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-3 bg-white dark:bg-black/40 border-2 border-black rounded-xl text-center shadow-[3px_3px_0px_#000] btn-tactile-3d">
                    <div className="text-2xl font-black text-[#059669] font-mono">5 Sources</div>
                    <div className="text-[10px] font-mono font-black text-gray-800 dark:text-gray-200 uppercase mt-0.5">
                      Async Scrapers
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono">LangGraph Orchestrated</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-white/10 text-xs font-mono font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tested with structured Pydantic schemas & fallbacks</span>
              </div>
            </div>
          </ThreeDTilt>
        </div>

        {/* ================= 3. LIVE CLOCK & AVAILABILITY (4 Cols - Goldenrod Solar Tint) ================= */}
        <div className="md:col-span-4">
          <ThreeDTilt maxTilt={6} scale={1.015} glare={true} className="h-full rounded-2xl">
            <div className="bg-[#fefce8] dark:bg-[#382b05] border-[3px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_#000000] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-black mb-3">
                  <span className="font-mono text-xs font-black uppercase text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Live Timezone</span>
                  </span>
                  <span className="w-3 h-3 rounded-full bg-[#00ff88] animate-ping" />
                </div>

                <div className="my-2">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-black dark:text-white tracking-tight">
                    {timeStr || '10:00:00 AM'}
                  </div>
                  <div className="text-xs font-mono font-bold text-gray-600 dark:text-gray-400 mt-0.5">
                    IST (UTC+5:30) · India Standard Time
                  </div>
                </div>

                <div className="mt-3 p-3 bg-emerald-100 dark:bg-emerald-950/80 border-2 border-black rounded-xl text-emerald-950 dark:text-emerald-200 text-xs font-mono font-black shadow-[2px_2px_0px_#000]">
                  🟢 AVAILABLE FOR FULL-STACK & APPLIED AI ROLES
                </div>
              </div>

              <div className="mt-4 pt-2 border-t-2 border-dashed border-gray-400 text-[11px] font-mono text-gray-700 dark:text-gray-300 font-bold">
                Open to remote worldwide & hybrid positions
              </div>
            </div>
          </ThreeDTilt>
        </div>

        {/* ================= 4. EMBEDDED MINI TERMINAL (4 Cols - Cyberpunk Slate) ================= */}
        <div className="md:col-span-4">
          <ThreeDTilt maxTilt={6} scale={1.015} glare={false} className="h-full rounded-2xl">
            <div 
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              className="bg-[#0a0c10] border-[3px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_#000000] text-gray-200 flex flex-col justify-between cursor-pointer group hover:border-[#ffd31e] transition-colors h-full"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-gray-800 mb-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-1 text-gray-400">cli@pravin:~</span>
                  </div>
                  <span className="text-[10px] text-[#ffd31e] font-black group-hover:underline">
                    CLICK TO LAUNCH ↗
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="text-[#00ff88] font-bold glow-green">$ pravin --status</div>
                  <div className="text-gray-400 text-[11px]">→ Full-Stack & AI Systems Active</div>
                  <div className="text-[#00f0ff] font-bold glow-cyan">$ pravin --skills</div>
                  <div className="text-gray-400 text-[11px]">→ FastAPI, Next.js 14, LangGraph, pgvector</div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <span>Terminal v2.4.0</span>
                <span className="text-[#ffd31e] font-black">Interactive Shell</span>
              </div>
            </div>
          </ThreeDTilt>
        </div>

        {/* ================= 5. ENGINEERING STANDARDS (4 Cols - Peach Coral Tint) ================= */}
        <div className="md:col-span-4">
          <ThreeDTilt maxTilt={6} scale={1.015} glare={true} className="h-full rounded-2xl">
            <div className="bg-[#fff7ed] dark:bg-[#3b1c09] border-[3px] border-black rounded-2xl p-5 shadow-[8px_8px_0px_#000000] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-2 border-b-2 border-black mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 bg-[#ffedd5] border-2 border-black rounded-lg text-black shadow-[1px_1px_0px_#000]">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-orange-dark" />
                    </div>
                    <h4 className="font-black text-sm text-black dark:text-white uppercase">
                      Engineering Principles
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-black text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded border border-black">TRUST</span>
                </div>

                <ul className="space-y-2 text-xs text-gray-800 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black dark:text-white font-mono bg-white dark:bg-black px-1 rounded border border-black text-[10px]">01</span>
                    <span><strong>Honest Scoping:</strong> Transparent boundary between working prototype and enterprise RBAC.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black dark:text-white font-mono bg-white dark:bg-black px-1 rounded border border-black text-[10px]">02</span>
                    <span><strong>Resilient Fallbacks:</strong> Keyword matching ensures discovery succeeds if third-party LLM APIs drop.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-black text-black dark:text-white font-mono bg-white dark:bg-black px-1 rounded border border-black text-[10px]">03</span>
                    <span><strong>Strict Schemas:</strong> Relational integrity & Pydantic typing protect frontend UI from hallucinations.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-3 pt-2 border-t-2 border-black/10 dark:border-white/10 text-[10px] font-mono font-black text-emerald-950 bg-emerald-200/80 px-2 py-1 rounded-lg border-2 border-black text-center shadow-[2px_2px_0px_#000]">
                Production Software Mindset
              </div>
            </div>
          </ThreeDTilt>
        </div>

      </div>

    </section>
  );
}
