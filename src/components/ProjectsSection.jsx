import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';
import { 
  ExternalLink, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  GitMerge, 
  Layers, 
  Cpu, 
  Sparkles,
  Eye,
  Filter
} from 'lucide-react';

export default function ProjectsSection({ onOpenCaseStudy }) {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeImageMap, setActiveImageMap] = useState({});

  const categories = [
    { id: 'ALL', label: 'All Projects', count: projects.length },
    { id: 'FLAGSHIP', label: 'Flagship Systems', count: 2 },
    { id: 'AI', label: 'Applied AI & Retrieval', count: 3 },
    { id: 'FULLSTACK', label: 'Full-Stack & Mobile', count: 1 },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'FLAGSHIP') return p.id === 'kidtube' || p.id === 'job-hunt-ai';
    if (selectedCategory === 'AI') return p.tags.some(t => t.includes('AI') || t.includes('GEMINI') || t.includes('RAG') || t.includes('FAISS'));
    if (selectedCategory === 'FULLSTACK') return p.tags.some(t => t.includes('FULL') || t.includes('MOBILE') || t.includes('NEXT'));
    return true;
  });

  const handleSelectImage = (projectId, imgIndex) => {
    sound.playClick();
    setActiveImageMap(prev => ({ ...prev, [projectId]: imgIndex }));
  };

  const projectColorThemes = {
    'kidtube': {
      border: 'border-red-500',
      tagBg: 'bg-red-50 dark:bg-red-950/40',
      accent: '#ef4444',
      badge: 'bg-[#ff385c] text-white',
      shadow: 'shadow-[8px_8px_0px_#000]'
    },
    'job-hunt-ai': {
      border: 'border-purple-500',
      tagBg: 'bg-purple-50 dark:bg-purple-950/40',
      accent: '#8b5cf6',
      badge: 'bg-[#8b5cf6] text-white',
      shadow: 'shadow-[8px_8px_0px_#000]'
    },
    'lexifyd-tamil': {
      border: 'border-emerald-500',
      tagBg: 'bg-emerald-50 dark:bg-emerald-950/40',
      accent: '#10b981',
      badge: 'bg-[#10b981] text-black',
      shadow: 'shadow-[8px_8px_0px_#000]'
    },
    'multi-role-rag-chatbot': {
      border: 'border-cyan-500',
      tagBg: 'bg-cyan-50 dark:bg-cyan-950/40',
      accent: '#00f0ff',
      badge: 'bg-[#00f0ff] text-black',
      shadow: 'shadow-[8px_8px_0px_#000]'
    }
  };

  return (
    <section id="projects" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Section Header Plaque with 3D Tilt */}
      <ThreeDTilt maxTilt={4} scale={1.005} glare={true} className="rounded-2xl mb-10">
        <div className="relative bg-[#fcfcfc] dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-6 sm:p-9 shadow-[10px_10px_0px_#000000] select-none">
          {/* Four Screws */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffd31e] border-2 border-black rounded-full text-xs font-mono font-black mb-3 shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>// 01. SELECTED WORKS & DEEP DIVES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white tracking-tight uppercase leading-none">
                Featured <span className="text-brand-orange">Engineering</span> Projects
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium max-w-2xl leading-relaxed">
                End-to-end applications combining modern full-stack architecture, applied artificial intelligence, and robust software workflows. Click any case study to explore step-by-step execution flows, data schemas, and architectural trade-offs.
              </p>
            </div>

            {/* Quick Count Pill */}
            <div className="flex items-center gap-2 font-mono text-xs font-black bg-black text-[#ffd31e] px-4 py-2 rounded-xl self-start md:self-end border-2 border-black shadow-[3px_3px_0px_#ffd31e]">
              <span>{projects.length} VERIFIED CASE STUDIES</span>
            </div>
          </div>

          {/* Filter Category Tabs with 3D Tactile Buttons */}
          <div className="mt-6 pt-5 border-t-2 border-gray-200 dark:border-gray-700 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-black border-2 transition-all whitespace-nowrap flex items-center gap-1.5 btn-tactile-3d ${
                  selectedCategory === cat.id
                    ? 'bg-black text-[#ffd31e] border-black shadow-[3px_3px_0px_#ffd31e]'
                    : 'bg-white text-gray-800 border-black hover:bg-gray-100 shadow-[2px_2px_0px_#000]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedCategory === cat.id ? 'bg-[#ffd31e] text-black font-black' : 'bg-gray-200 text-gray-800'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </ThreeDTilt>

      {/* Projects Container with 3D Parallax Tilt Cards */}
      <div className="space-y-10">
        {filteredProjects.map((project, idx) => {
          const isFlagship = project.id === 'kidtube' || project.id === 'job-hunt-ai';
          const currentImageIdx = activeImageMap[project.id] || 0;
          const currentImg = project.images[currentImageIdx] || project.images[0];
          const theme = projectColorThemes[project.id] || {
            border: 'border-black',
            accent: '#f3670e',
            badge: 'bg-black text-white',
            shadow: 'shadow-[8px_8px_0px_#000]'
          };

          return (
            <ThreeDTilt key={project.id} maxTilt={5} scale={1.01} glare={true} className="rounded-2xl">
              <div
                className={`relative bg-white dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-[10px_10px_0px_#000000] transition-all duration-200 ${
                  isFlagship ? 'ring-2 ring-brand-yellow' : ''
                }`}
              >
                {/* Flagship Ribbon if applicable */}
                {isFlagship && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#ffd31e] border-2 border-black rounded-full text-[11px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] flex items-center gap-1.5 z-20">
                    <Star className="w-3.5 h-3.5 fill-black" />
                    <span>Flagship Production System</span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Visual Screen Gallery & Mockup */}
                  <div className="lg:col-span-6 space-y-3">
                    {/* Main Screen Preview Box */}
                    <div
                      onClick={() => {
                        sound.playClick();
                        onOpenCaseStudy(project);
                      }}
                      className="relative w-full h-56 sm:h-72 rounded-xl border-[3px] border-black overflow-hidden bg-black flex items-center justify-center cursor-pointer group shadow-[5px_5px_0px_#000]"
                    >
                      <img
                        src={currentImg}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-black text-sm uppercase tracking-wider backdrop-blur-[2px]">
                        <div className="p-3 bg-[#ffd31e] text-black rounded-full border-2 border-black shadow-[3px_3px_0px_#000]">
                          <Eye className="w-6 h-6" />
                        </div>
                        <span className="bg-black/80 px-3 py-1 rounded border border-white/20">Open Technical Deep Dive</span>
                      </div>

                      {/* Bottom Status Ribbon on Image */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                        <div className="px-2.5 py-1 bg-black/90 backdrop-blur-md rounded border border-white/20 text-white text-[10px] font-mono font-bold truncate max-w-[70%]">
                          {project.imageCaptions ? project.imageCaptions[currentImageIdx] : project.title}
                        </div>
                        <div className="px-2 py-0.5 bg-[#ffd31e] border border-black rounded text-[10px] font-black text-black">
                          {project.country} {project.flag}
                        </div>
                      </div>
                    </div>

                    {/* Smart Screen & Architecture View Switchers */}
                    {project.images.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                        {project.images.map((img, i) => {
                          const caption = project.imageCaptions ? project.imageCaptions[i] || '' : '';
                          let label = `View ${i + 1}`;
                          let isArch = img.includes('arch') || caption.toLowerCase().includes('architecture');
                          
                          if (isArch) {
                            label = '📐 Architecture Blueprint';
                          } else if (img.includes('child') || caption.toLowerCase().includes('child')) {
                            label = '📱 Child Player';
                          } else if (img.includes('resume') || caption.toLowerCase().includes('resume')) {
                            label = '📄 Resume Parser';
                          } else if (i === 0) {
                            label = '💻 Live Interface';
                          }

                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSelectImage(project.id, i)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-black border-2 transition-all whitespace-nowrap cursor-pointer btn-tactile-3d ${
                                currentImageIdx === i
                                  ? isArch 
                                    ? 'bg-[#1e293b] text-[#ffd31e] border-black shadow-[3px_3px_0px_#000]'
                                    : 'bg-[#ffd31e] text-black border-black shadow-[3px_3px_0px_#000]'
                                  : 'bg-white text-gray-700 border-black hover:bg-gray-100 shadow-[1px_1px_0px_#000]'
                              }`}
                            >
                              <span>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Metrics Badges with High-Contrast Colors */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {project.stats.map((st, i) => (
                        <div key={i} className="p-2.5 bg-gray-50 dark:bg-black/30 border-2 border-black rounded-xl text-center shadow-[2px_2px_0px_#000]">
                          <div className="font-mono text-[10px] text-gray-500 uppercase font-black truncate">
                            {st.label}
                          </div>
                          <div className="font-black text-xs text-black dark:text-white truncate mt-0.5">
                            {st.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Project Context, Architecture & Actions */}
                  <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                    
                    {/* Category & Rating */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-black text-gray-500 uppercase tracking-wide">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-lg border-2 border-black shadow-[1px_1px_0px_#000]">
                          <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                          <span>{project.rating} · {project.ratingSource}</span>
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-black text-brand-orange mt-0.5 font-mono">
                        {project.subtitle}
                      </p>

                      {/* Summary */}
                      <p className="mt-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Key Highlights from Case Study with Colorful Checkmarks */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-black/40 dark:to-black/20 border-2 border-black rounded-xl space-y-2 shadow-[2px_2px_0px_#000]">
                      <div className="text-[11px] font-mono font-black uppercase text-gray-600 dark:text-gray-400 tracking-wider flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-black dark:text-white" />
                        <span>Verified Technical Highlights</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-gray-800 dark:text-gray-200">
                        {project.caseStudy.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 leading-snug">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="font-medium">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Tags with Vibrant Neo Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-black border-2 border-black uppercase shadow-[1px_1px_0px_#000] ${
                            tag.includes('AI') || tag.includes('GEMINI') || tag.includes('RAG')
                              ? 'bg-[#00f0ff] text-black'
                              : tag.includes('NEXT') || tag.includes('FASTAPI') || tag.includes('FULL')
                              ? 'bg-[#92f080] text-black'
                              : 'bg-[#ffd31e] text-black'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons Row with 3D Push Physics */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5 border-t-2 border-black/10 dark:border-white/10">
                      
                      {/* Big Radiant READ CASE STUDY button */}
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          onOpenCaseStudy(project);
                        }}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-[#ffd31e] via-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] btn-tactile-3d text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>READ FULL CASE STUDY</span>
                        {project.caseStudy.workflowSteps && (
                          <span className="font-mono text-[11px] bg-black text-[#ffd31e] px-2 py-0.5 rounded font-black">
                            {project.caseStudy.workflowSteps.length} Steps
                          </span>
                        )}
                        <ExternalLink className="w-4 h-4 ml-0.5" />
                      </button>

                      {/* GitHub Link */}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          title="GitHub Repository"
                          className="py-3 px-4 bg-black hover:bg-gray-800 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] btn-tactile-3d flex items-center justify-center gap-2"
                        >
                          <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                          <span className="hidden sm:inline">CODE</span>
                        </a>
                      )}

                      {/* Live Demo / Dashboard Link */}
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          title="Live Deployed Application"
                          className="py-3 px-4 bg-[#10b981] hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] btn-tactile-3d flex items-center justify-center gap-2"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="hidden sm:inline">LIVE DEMO</span>
                        </a>
                      )}

                    </div>

                  </div>

                </div>
              </div>
            </ThreeDTilt>
          );
        })}
      </div>

    </section>
  );
}
