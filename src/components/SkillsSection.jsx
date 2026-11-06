import React from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import { Sparkles, Code2, Server, BrainCircuit, Database, Smartphone, Wrench } from 'lucide-react';

export default function SkillsSection() {
  const { skills } = portfolioData.resume;

  const categoryIcons = {
    "Programming Languages": Code2,
    "AI / ML & Agents": BrainCircuit,
    "Web & API Engineering": Server,
    "Data & Infrastructure": Database,
    "Computer Vision & Tools": Wrench,
    "Frontend Development": Code2,
    "Backend & Systems": Server,
    "Applied AI & Retrieval": BrainCircuit,
    "Databases & Storage": Database,
    "Mobile & Automation": Smartphone,
  };

  return (
    <section id="skills" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Plaque Header */}
      <div className="relative bg-[#fcfcfc] border-[3px] border-black rounded-2xl p-6 sm:p-9 shadow-[8px_8px_0px_#000000] mb-8 select-none scroll-reveal">
        {/* Screws */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/80 border border-black rounded-full text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>// 03. TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase leading-none">
              Skills & <span className="text-brand-orange">Technology Matrix</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-700 font-medium max-w-2xl leading-relaxed">
              Grounded in technologies actively used across verified projects. Grouped cleanly by domain rather than arbitrary percentage bars.
            </p>
          </div>

          <div className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-lg border border-gray-300 self-start md:self-end">
            CONFIDENT IN TECHNICAL INTERVIEWS
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, idx) => {
          const Icon = categoryIcons[group.category] || Code2;
          const delays = ['delay-100', 'delay-150', 'delay-200', 'delay-250', 'delay-300', 'delay-350'];
          const delayClass = delays[idx % delays.length];

          return (
            <div
              key={idx}
              className={`bg-white border-[3px] border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col justify-between scroll-reveal scroll-reveal-scale ${delayClass}`}
            >
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black mb-4">
                  <div className="p-2 bg-brand-yellow border-2 border-black rounded-lg text-black shadow-[1px_1px_0px_#000]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-black text-base text-black uppercase tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      onClick={() => sound.playClick()}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold border border-black bg-gray-50 hover:bg-brand-yellow text-black transition-colors cursor-default shadow-[1px_1px_0px_rgba(0,0,0,0.1)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-[10px] font-mono font-bold text-gray-500">
                <span>{group.items.length} TECHNOLOGIES</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  VERIFIED IN CODE
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
