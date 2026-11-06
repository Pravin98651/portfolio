import React from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import { Sparkles, Terminal, Code2, Cpu, Database, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const { personal } = portfolioData;

  const pillars = [
    {
      icon: Terminal,
      title: "Problem-First Architecture",
      desc: "Before writing code, I analyze user friction, define strict data entities, and plan the end-to-end user journey so every line of code serves a verified product purpose."
    },
    {
      icon: Cpu,
      title: "Applied AI & Stateful Workflows",
      desc: "Integrating modern LLMs and vector search into real software architectures using LangGraph, structured schemas, semantic embeddings, and resilient fallback mechanisms."
    },
    {
      icon: Database,
      title: "Full-Stack Reliability",
      desc: "Building clean REST APIs with FastAPI and Node.js, reactive frontends with Next.js 14 and React Native, paired with robust relational (PostgreSQL) and document (Firestore) databases."
    }
  ];

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Plaque Container */}
      <div className="relative bg-[#fcfcfc] border-[3px] border-black rounded-2xl p-6 sm:p-10 shadow-[10px_10px_0px_#000000] select-none">
        
        {/* Four Screws */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/80 border border-black rounded-full text-xs font-mono font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>// 02. BACKGROUND & PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Bio & Positioning */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase leading-none">
              Engineering Ideas Into <span className="text-brand-orange">Working Products</span>
            </h2>

            <div className="text-sm sm:text-base text-gray-700 font-medium space-y-3 leading-relaxed">
              <p>
                {personal.aboutLong}
              </p>
              <p className="border-l-4 border-black pl-3 py-1 font-mono text-xs sm:text-sm text-gray-900 bg-gray-50 rounded-r">
                "{personal.coreMessage}"
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={personal.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs font-mono rounded-lg border-2 border-black shadow-[2px_2px_0px_#ffd31e] transition-all"
              >
                <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                <span>Explore GitHub Repositories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow hover:bg-[#ffde59] text-black font-extrabold text-xs font-mono rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] transition-all"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: 3 Engineering Pillars */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-gray-500 tracking-wider mb-2">
              Core Engineering Focus
            </div>

            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-1.5 bg-brand-yellow border border-black rounded-lg text-black">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-black text-sm text-black uppercase tracking-tight">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
