import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Star, CheckCircle, ArrowLeft, Globe, Copy, Check, Terminal, Layers, Cpu, Award, BookOpen, GitMerge, HelpCircle, AlertTriangle, Database } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'workflow' | 'architecture' | 'features' | 'faq' | 'learnings'
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedClone, setCopiedClone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const cloneCommand = project.githubUrl ? `git clone ${project.githubUrl}.git` : '';

  const handleCopyClone = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-[#fafafa] border-[3px] border-black rounded-2xl shadow-[14px_14px_0px_#000000] overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-brand-yellow border-b-[3px] border-black select-none">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 bg-white hover:bg-black hover:text-white rounded-lg border-2 border-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-black/70">
                  {project.category || "PROJECT CASE STUDY"}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-black text-brand-yellow rounded font-bold">
                  VERIFIED BUILD
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-black leading-tight uppercase flex items-center gap-2">
                <span>{project.title}</span>
                <span className="text-sm font-normal text-gray-700 hidden sm:inline">— {project.subtitle}</span>
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 bg-white hover:bg-black hover:text-white rounded-lg border-2 border-black transition-colors shadow-[2px_2px_0px_#000]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 px-3 sm:px-6 pt-2.5 bg-gray-100 border-b-2 border-black overflow-x-auto select-none no-scrollbar relative z-10">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('overview');
            }}
            className={`px-3 py-2 font-black text-xs uppercase tracking-wider rounded-t-lg border-2 transition-all flex items-center gap-1.5 whitespace-nowrap -mb-[2px] ${
              activeTab === 'overview'
                ? 'bg-white text-black border-black border-b-2 !border-b-white z-20 shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]'
                : 'bg-gray-200 text-gray-700 border-black/40 hover:bg-gray-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Overview & Screens</span>
          </button>

          {project.caseStudy.workflowSteps && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('workflow');
              }}
              className={`px-3 py-2 font-black text-xs uppercase tracking-wider rounded-t-lg border-2 transition-all flex items-center gap-1.5 whitespace-nowrap -mb-[2px] ${
                activeTab === 'workflow'
                  ? 'bg-white text-black border-black border-b-2 !border-b-white z-20 shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]'
                  : 'bg-gray-200 text-gray-700 border-black/40 hover:bg-gray-300'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>Step-by-Step Flow ({project.caseStudy.workflowSteps.length} Steps)</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('architecture');
            }}
            className={`px-3 py-2 font-black text-xs uppercase tracking-wider rounded-t-lg border-2 transition-all flex items-center gap-1.5 whitespace-nowrap -mb-[2px] ${
              activeTab === 'architecture'
                ? 'bg-white text-black border-black border-b-2 !border-b-white z-20 shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]'
                : 'bg-gray-200 text-gray-700 border-black/40 hover:bg-gray-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Decisions</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('features');
            }}
            className={`px-3 py-2 font-black text-xs uppercase tracking-wider rounded-t-lg border-2 transition-all flex items-center gap-1.5 whitespace-nowrap -mb-[2px] ${
              activeTab === 'features'
                ? 'bg-white text-black border-black border-b-2 !border-b-white z-20 shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]'
                : 'bg-gray-200 text-gray-700 border-black/40 hover:bg-gray-300'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Key Features ({project.caseStudy.keyFeatures.length})</span>
          </button>

          {project.caseStudy.interviewQA && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab('faq');
              }}
              className={`px-3 py-2 font-black text-xs uppercase tracking-wider rounded-t-lg border-2 transition-all flex items-center gap-1.5 whitespace-nowrap -mb-[2px] ${
                activeTab === 'faq'
                  ? 'bg-white text-black border-black border-b-2 !border-b-white z-20 shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]'
                  : 'bg-gray-200 text-gray-700 border-black/40 hover:bg-gray-300'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Interview Prep</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('learnings');
            }}
            className={`px-3 py-2 font-black text-xs uppercase tracking-wider rounded-t-lg border-2 transition-all flex items-center gap-1.5 whitespace-nowrap -mb-[2px] ${
              activeTab === 'learnings'
                ? 'bg-white text-black border-black border-b-2 !border-b-white z-20 shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]'
                : 'bg-gray-200 text-gray-700 border-black/40 hover:bg-gray-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Takeaways & Scope</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* ================= TAB 1: OVERVIEW & SCREENS ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Tagline Callout */}
              <div className="p-4 bg-amber-50 border-[2.5px] border-black rounded-xl shadow-[3px_3px_0px_#000]">
                <div className="text-[10px] font-mono font-bold uppercase text-brand-orange">
                  Core Mission & Tagline
                </div>
                <p className="text-sm sm:text-base font-bold text-gray-900 mt-1 leading-snug">
                  "{project.tagline}"
                </p>
              </div>

              {/* Interactive Screen Gallery */}
              <div className="space-y-2.5">
                <div className="relative w-full rounded-xl border-[3px] border-black overflow-hidden bg-black aspect-video sm:aspect-[21/9] flex items-center justify-center shadow-[4px_4px_0px_#000]">
                  <img
                    src={project.images[selectedImageIndex] || project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Bottom Image Caption Overlay */}
                  {project.imageCaptions && project.imageCaptions[selectedImageIndex] && (
                    <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-lg border border-white/20 text-xs font-mono flex items-center justify-between">
                      <span>{project.imageCaptions[selectedImageIndex]}</span>
                      <span className="text-[10px] text-brand-yellow font-bold">
                        {selectedImageIndex + 1} of {project.images.length}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {project.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setSelectedImageIndex(idx);
                        }}
                        className={`relative w-24 h-14 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-transform ${
                          selectedImageIndex === idx
                            ? 'border-black ring-2 ring-brand-yellow scale-105 shadow-sm'
                            : 'border-gray-300 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4 Stats Cards */}
              {project.stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.stats.map((s, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]">
                      <div className="text-[10px] font-mono text-gray-500 uppercase">{s.label}</div>
                      <div className="font-black text-sm text-black mt-0.5">{s.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* The Problem & Solution Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#fff1f2] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
                  <div className="flex items-center gap-2 text-brand-red font-black text-xs uppercase tracking-wider mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                    The Problem
                  </div>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                    {project.caseStudy.problem}
                  </p>
                </div>

                <div className="p-4 bg-[#f0fdf4] border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
                  <div className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-wider mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    The Solution
                  </div>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: STEP-BY-STEP WORKFLOW ================= */}
          {activeTab === 'workflow' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="font-black text-base sm:text-lg text-black uppercase tracking-tight flex items-center gap-2">
                  <span className="w-3 h-3 bg-brand-orange rounded-full border border-black" />
                  <span>End-to-End Processing Workflow ({project.caseStudy.workflowSteps.length} Steps)</span>
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Detailed technical walk-through of the data flow and execution pipeline.
                </p>
              </div>

              <div className="space-y-3">
                {project.caseStudy.workflowSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-3.5 bg-gray-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-black text-brand-yellow font-black text-xs flex items-center justify-center flex-shrink-0 border border-black">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-xs sm:text-sm text-black uppercase tracking-wide">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium mt-1">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Entities Table if available */}
              {project.caseStudy.dataEntities && (
                <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                  <h4 className="font-black text-xs sm:text-sm text-black uppercase mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-brand-blue" />
                    <span>Main Data Entities & Schema Role</span>
                  </h4>
                  <div className="overflow-hidden rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-gray-100 border-b border-black">
                        <tr>
                          <th className="p-2.5 font-black uppercase text-gray-700 w-1/3">Entity</th>
                          <th className="p-2.5 font-black uppercase text-gray-700 w-2/3">Data Responsibility</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white font-mono">
                        {project.caseStudy.dataEntities.map((row, idx) => (
                          <tr key={idx} className="hover:bg-amber-50/50">
                            <td className="p-2.5 font-bold text-black border-r border-gray-200">{row.entity}</td>
                            <td className="p-2.5 text-gray-800">{row.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: ARCHITECTURE & DECISIONS ================= */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="font-black text-base sm:text-lg text-black uppercase tracking-tight flex items-center gap-2">
                  <span className="w-3 h-3 bg-brand-blue rounded-full border border-black" />
                  <span>Subsystem Component Mapping</span>
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Subsystem responsibility and concrete implementation libraries.
                </p>
              </div>

              {/* Technology Table */}
              <div className="overflow-hidden rounded-xl border-[2.5px] border-black shadow-[4px_4px_0px_#000]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-gray-100 border-b-2 border-black">
                    <tr>
                      <th className="p-3 font-black uppercase text-gray-700 w-1/3">Subsystem / Component</th>
                      <th className="p-3 font-black uppercase text-gray-700 w-2/3">Concrete Technologies & Stack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white font-mono">
                    {project.caseStudy.techStackTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                        <td className="p-3 font-bold text-black border-r border-gray-200">
                          {row.component}
                        </td>
                        <td className="p-3 font-semibold text-gray-800">
                          {row.tech}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Engineering Decisions Worth Discussing */}
              {project.caseStudy.engineeringDecisions && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-black text-sm uppercase text-black flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-orange" />
                    <span>Key Engineering Decisions & Trade-offs</span>
                  </h4>
                  <div className="space-y-2">
                    {project.caseStudy.engineeringDecisions.map((dec, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 border-2 border-black rounded-lg text-xs leading-relaxed font-medium">
                        {dec}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 4: KEY FEATURES ================= */}
          {activeTab === 'features' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="font-black text-base sm:text-lg text-black uppercase tracking-tight flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#1fc16b] rounded-full border border-black" />
                  <span>Key Features & Functional Requirements</span>
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Verified features built and tested in the current version.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {project.caseStudy.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-gray-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: INTERVIEW PREP & FAQ ================= */}
          {activeTab === 'faq' && project.caseStudy.interviewQA && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="font-black text-base sm:text-lg text-black uppercase tracking-tight flex items-center gap-2">
                  <span className="w-3 h-3 bg-brand-blue rounded-full border border-black" />
                  <span>Technical Interview Questions & Architecture Answers</span>
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Questions interviewers ask about this system and their technical justifications.
                </p>
              </div>

              <div className="space-y-3.5">
                {project.caseStudy.interviewQA.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] space-y-2"
                  >
                    <div className="font-black text-xs sm:text-sm text-black flex items-start gap-2">
                      <span className="px-1.5 py-0.5 bg-brand-yellow border border-black rounded font-mono text-[10px]">Q{idx + 1}</span>
                      <span>{item.q}</span>
                    </div>
                    <div className="text-xs text-gray-700 leading-relaxed font-medium pl-6 border-l-2 border-brand-orange">
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: LEARNINGS & SCOPE ================= */}
          {activeTab === 'learnings' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* My Contribution */}
              <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
                <h4 className="font-black text-sm uppercase text-black mb-1.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-orange" />
                  <span>My Engineering Contribution</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {project.caseStudy.myContribution}
                </p>
              </div>

              {/* What I Learned */}
              <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
                <h4 className="font-black text-sm uppercase text-black mb-1.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-blue" />
                  <span>Key Architectural Insights</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {project.caseStudy.whatILearned}
                </p>
              </div>

              {/* Accuracy Note */}
              <div className="p-4 bg-amber-50/90 border-2 border-dashed border-amber-500 rounded-xl">
                <h4 className="font-mono font-bold text-xs uppercase text-amber-800 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Technical Accuracy & Scope Note</span>
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {project.caseStudy.accuracyNote}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-5 sm:px-7 py-3 bg-gray-100 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 select-none">
          {/* Git Clone Snippet */}
          {project.githubUrl && (
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg border border-black font-mono text-xs">
              <Terminal className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-300 hidden sm:inline">{cloneCommand}</span>
              <button
                type="button"
                onClick={handleCopyClone}
                title="Copy git clone command"
                className="hover:text-brand-yellow ml-1 text-[11px] font-bold uppercase transition-colors"
              >
                {copiedClone ? 'COPIED ✓' : 'COPY CLONE'}
              </button>
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center gap-2.5 ml-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-black hover:text-white text-black font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <img src="/assets/icon-github.svg" alt="GitHub" className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-5 py-2 bg-brand-blue hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>VISIT LIVE DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
