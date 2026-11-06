import React from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';
import { Sparkles, Code2, Server, BrainCircuit, Database, Smartphone, Wrench } from 'lucide-react';

export default function SkillsSection() {
  const { skills } = portfolioData.resume;

  const categoryConfigs = {
    "Frontend Development": {
      icon: Code2,
      cardBg: "bg-[#f0f9ff] dark:bg-[#082f49]/30",
      accent: "#00f0ff",
      badgeBg: "bg-[#00f0ff] text-black",
      border: "border-cyan-500"
    },
    "Backend & Systems": {
      icon: Server,
      cardBg: "bg-[#f0fdf4] dark:bg-[#052e16]/30",
      accent: "#00ff88",
      badgeBg: "bg-[#00ff88] text-black",
      border: "border-emerald-500"
    },
    "Applied AI & Retrieval": {
      icon: BrainCircuit,
      cardBg: "bg-[#faf5ff] dark:bg-[#3b0764]/30",
      accent: "#c084fc",
      badgeBg: "bg-[#c084fc] text-black",
      border: "border-purple-500"
    },
    "Databases & Storage": {
      icon: Database,
      cardBg: "bg-[#fefce8] dark:bg-[#451a03]/30",
      accent: "#ffd31e",
      badgeBg: "bg-[#ffd31e] text-black",
      border: "border-amber-500"
    },
    "Mobile & Automation": {
      icon: Smartphone,
      cardBg: "bg-[#fff1f2] dark:bg-[#4c0519]/30",
      accent: "#ff3399",
      badgeBg: "bg-[#ff3399] text-white",
      border: "border-rose-500"
    },
  };

  return (
    <section id="skills" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Plaque Header with 3D Tilt */}
      <ThreeDTilt maxTilt={4} scale={1.005} glare={true} className="rounded-2xl mb-8">
        <div className="relative bg-[#fcfcfc] dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] select-none">
          {/* Screws */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffd31e] border-2 border-black rounded-full text-xs font-mono font-black mb-3 shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>// 03. TECHNICAL CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white tracking-tight uppercase leading-none">
                Skills & <span className="text-brand-orange">Technology Matrix</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium max-w-2xl leading-relaxed">
                Grounded in technologies actively used across verified projects. Grouped cleanly by domain rather than arbitrary percentage bars.
              </p>
            </div>

            <div className="text-xs font-mono font-black text-gray-800 dark:text-gray-200 bg-white dark:bg-black px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#ffd31e] self-start md:self-end">
              CONFIDENT IN TECHNICAL INTERVIEWS
            </div>
          </div>
        </div>
      </ThreeDTilt>

      {/* Skills Grid with 3D Parallax Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, idx) => {
          const cfg = categoryConfigs[group.category] || {
            icon: Code2,
            cardBg: "bg-white",
            accent: "#ffd31e",
            badgeBg: "bg-brand-yellow text-black",
            border: "border-black"
          };
          const Icon = cfg.icon;

          return (
            <ThreeDTilt key={idx} maxTilt={6} scale={1.02} glare={true} className="h-full rounded-2xl">
              <div
                className={`${cfg.cardBg} border-[3px] border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between h-full`}
              >
                <div>
                  <div className="flex items-center gap-2.5 pb-3 border-b-2 border-black mb-4">
                    <div className={`p-2.5 ${cfg.badgeBg} border-2 border-black rounded-xl shadow-[2px_2px_0px_#000]`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-black text-base text-black dark:text-white uppercase tracking-tight">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        onClick={() => sound.playClick()}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-black border-2 border-black bg-white dark:bg-black/50 hover:bg-[#ffd31e] hover:text-black text-black dark:text-white transition-all btn-tactile-3d cursor-pointer shadow-[2px_2px_0px_#000]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono font-black text-gray-600 dark:text-gray-400">
                  <span>PRODUCTION READY</span>
                  <span className="text-black dark:text-white">{group.items.length} Techs</span>
                </div>
              </div>
            </ThreeDTilt>
          );
        })}
      </div>

    </section>
  );
}
