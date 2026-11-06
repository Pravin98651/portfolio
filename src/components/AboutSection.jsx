import React from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';
import { Sparkles, Terminal, Code2, Cpu, Database, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const { personal } = portfolioData;

  const pillars = [
    {
      icon: Terminal,
      title: "Problem-First Architecture",
      desc: "Before writing code, I analyze user friction, define strict data entities, and plan the end-to-end user journey so every line of code serves a verified product purpose.",
      color: "bg-[#ffd31e] text-black",
      cardBg: "bg-[#fefce8] dark:bg-[#382b05]"
    },
    {
      icon: Cpu,
      title: "Applied AI & Stateful Workflows",
      desc: "Integrating modern LLMs and vector search into real software architectures using LangGraph, structured schemas, semantic embeddings, and resilient fallback mechanisms.",
      color: "bg-[#00f0ff] text-black",
      cardBg: "bg-[#f0f9ff] dark:bg-[#0c2438]"
    },
    {
      icon: Database,
      title: "Full-Stack Reliability",
      desc: "Building clean REST APIs with FastAPI and Node.js, reactive frontends with Next.js 14 and React Native, paired with robust relational (PostgreSQL) and document (Firestore) databases.",
      color: "bg-[#00ff88] text-black",
      cardBg: "bg-[#f0fdf4] dark:bg-[#0a2919]"
    }
  ];

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Plaque Container with 3D Tilt */}
      <ThreeDTilt maxTilt={4} scale={1.005} glare={true} className="rounded-2xl">
        <div className="relative bg-[#fcfcfc] dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-6 sm:p-10 shadow-[10px_10px_0px_#000000] select-none">
          
          {/* Four Screws */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffd31e] border-2 border-black rounded-full text-xs font-mono font-black mb-3 shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>// 02. BACKGROUND & PHILOSOPHY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Bio & Positioning */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white tracking-tight uppercase leading-none">
                Engineering Ideas Into <span className="text-brand-orange">Working Products</span>
              </h2>

              <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium space-y-3 leading-relaxed">
                <p>
                  {personal.aboutLong}
                </p>
                <p className="border-l-4 border-black pl-3 py-1.5 font-mono text-xs sm:text-sm text-gray-900 dark:text-gray-100 bg-[#fefce8] dark:bg-yellow-950/40 rounded-r border-2 border-l-4 border-black shadow-[2px_2px_0px_#000]">
                  "{personal.coreMessage}"
                </p>
              </div>

              {/* Quick Action Links with 3D Push Physics */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={personal.socials[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs font-mono rounded-xl border-2 border-black shadow-[3px_3px_0px_#ffd31e] btn-tactile-3d transition-all"
                >
                  <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                  <span>Explore GitHub Repositories</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ffd31e]" />
                </a>

                <a
                  href="#contact"
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ffd31e] to-[#fbbf24] hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs font-mono rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] btn-tactile-3d transition-all"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right: 3 Engineering Pillars with 3D Hover Lift */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono font-black uppercase text-gray-600 dark:text-gray-400 tracking-wider mb-2">
                Core Engineering Focus
              </div>

              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 ${pillar.cardBg} border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] btn-tactile-3d transition-all`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`p-2 ${pillar.color} border-2 border-black rounded-lg shadow-[1px_1px_0px_#000]`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-black text-sm text-black dark:text-white uppercase tracking-tight">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </ThreeDTilt>

    </section>
  );
}
