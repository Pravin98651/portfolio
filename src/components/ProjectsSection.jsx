import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
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

  return (
    <section id="projects" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Section Header Plaque */}
      <div className="relative bg-[#fcfcfc] border-[3px] border-black rounded-2xl p-6 sm:p-9 shadow-[8px_8px_0px_#000000] mb-10 select-none">
        {/* Four Screws */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/80 border border-black rounded-full text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>// 01. SELECTED WORKS & DEEP DIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase leading-none">
              Featured <span className="text-brand-orange">Engineering</span> Projects
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-700 font-medium max-w-2xl leading-relaxed">
              End-to-end applications combining modern full-stack architecture, applied artificial intelligence, and robust software workflows. Click any case study to explore step-by-step execution flows, data schemas, and architectural trade-offs.
            </p>
          </div>

          {/* Quick Count Pill */}
          <div className="flex items-center gap-2 font-mono text-xs font-bold bg-black text-white px-4 py-2 rounded-xl self-start md:self-end border-2 border-black shadow-[2px_2px_0px_#ffd31e]">
            <span>{projects.length} VERIFIED CASE STUDIES</span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="mt-6 pt-5 border-t-2 border-gray-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono border-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-black text-white border-black shadow-[2px_2px_0px_#ffd31e]'
                  : 'bg-white text-gray-700 border-black hover:bg-gray-100 shadow-[1px_1px_0px_#000]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCategory === cat.id ? 'bg-brand-yellow text-black' : 'bg-gray-200 text-gray-700'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Container */}
      <div className="space-y-10">
        {filteredProjects.map((project, idx) => {
          const isFlagship = project.id === 'kidtube' || project.id === 'job-hunt-ai';
          const currentImageIdx = activeImageMap[project.id] || 0;
          const currentImg = project.images[currentImageIdx] || project.images[0];

          return (
            <div
              key={project.id}
              className={`relative bg-white border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-[10px_10px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ${
                isFlagship ? 'ring-2 ring-brand-yellow' : ''
              }`}
            >
              {/* Flagship Ribbon if applicable */}
              {isFlagship && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-0.5 bg-brand-yellow border-2 border-black rounded-full text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
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
                    className="relative w-full h-56 sm:h-72 rounded-xl border-[3px] border-black overflow-hidden bg-black flex items-center justify-center cursor-pointer group shadow-[4px_4px_0px_#000]"
                  >
                    <img
                      src={currentImg}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-black text-sm uppercase tracking-wider backdrop-blur-[2px]">
                      <div className="p-3 bg-brand-yellow text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                        <Eye className="w-6 h-6" />
                      </div>
                      <span>Open Technical Deep Dive</span>
                    </div>

                    {/* Bottom Status Ribbon on Image */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <div className="px-2.5 py-1 bg-black/85 backdrop-blur-md rounded border border-white/20 text-white text-[10px] font-mono font-bold">
                        {project.imageCaptions ? project.imageCaptions[currentImageIdx] : project.title}
                      </div>
                      <div className="px-2 py-0.5 bg-brand-yellow border border-black rounded text-[10px] font-black text-black">
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
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border-2 transition-all whitespace-nowrap cursor-pointer ${
                              currentImageIdx === i
                                ? isArch 
                                  ? 'bg-[#1e293b] text-brand-yellow border-black shadow-[2px_2px_0px_#000] font-black'
                                  : 'bg-brand-yellow text-black border-black shadow-[2px_2px_0px_#000] font-black'
                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Metrics Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {project.stats.map((st, i) => (
                      <div key={i} className="p-2 bg-gray-50 border-2 border-black rounded-lg text-center">
                        <div className="font-mono text-[10px] text-gray-500 uppercase font-bold truncate">
                          {st.label}
                        </div>
                        <div className="font-black text-xs text-black truncate mt-0.5">
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
                      <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-300">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{project.rating} · {project.ratingSource}</span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-brand-orange-dark mt-0.5 font-mono">
                      {project.subtitle}
                    </p>

                    {/* Summary */}
                    <p className="mt-3 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Highlights from Case Study */}
                  <div className="p-3.5 bg-[#fdfdfd] border-2 border-black rounded-xl space-y-2">
                    <div className="text-[11px] font-mono font-extrabold uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-black" />
                      <span>Verified Technical Highlights</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-800">
                      {project.caseStudy.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 leading-snug">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold border border-black uppercase font-mono ${
                          tag.includes('AI') || tag.includes('GEMINI') || tag.includes('NEXT') || tag.includes('FASTAPI')
                            ? 'bg-[#92f080] text-black font-extrabold shadow-[1px_1px_0px_#000]'
                            : 'bg-white text-gray-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5 border-t-2 border-gray-200">
                    
                    {/* Big Yellow READ CASE STUDY button */}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onOpenCaseStudy(project);
                      }}
                      className="flex-1 py-3 px-4 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>READ FULL CASE STUDY</span>
                      {project.caseStudy.workflowSteps && (
                        <span className="font-mono text-[11px] bg-black text-white px-2 py-0.5 rounded">
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
                        className="py-3 px-4 bg-black hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
                        className="py-3 px-4 bg-[#10b981] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="hidden sm:inline">LIVE DEMO</span>
                      </a>
                    )}

                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
