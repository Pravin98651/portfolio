import React, { useState, useEffect } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Eye,
  GraduationCap,
  Award,
  Layers,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  Mail,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, resume, hackathons } = portfolioData;
  const [viewMode, setViewMode] = useState('dossier'); // 'dossier' | 'pdf'
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-[#fafafa] border-[3px] border-black rounded-2xl shadow-[14px_14px_0px_#000000] overflow-hidden flex flex-col">
        
        {/* Top Header Plaque */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-brand-yellow border-b-[3px] border-black">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black text-brand-yellow flex items-center justify-center font-black text-base border-2 border-black">
              CV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-black/70">
                  OFFICIAL CURRICULUM VITAE & DOSSIER
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-emerald-500 text-white rounded font-bold">
                  UPDATED JUNE 2026
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-black leading-tight uppercase">
                {personal.fullName} · {personal.role}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/Pravin_Resume.pdf"
              download="Pravin_G_Resume.pdf"
              onClick={() => sound.playSuccess()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#ffd31e] hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-brand-yellow" />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 bg-white hover:bg-black hover:text-white rounded-lg border-2 border-black transition-colors shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-2 bg-gray-100 border-b-2 border-black font-mono text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode('dossier');
              }}
              className={`px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'dossier'
                  ? 'bg-black text-white border-black shadow-[2px_2px_0px_#ffd31e]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>INTERACTIVE DOSSIER</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode('pdf');
              }}
              className={`px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'pdf'
                  ? 'bg-black text-white border-black shadow-[2px_2px_0px_#ffd31e]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL PDF VIEWER</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] text-gray-600">
            <span>📍 {personal.location}</span>
            <span>✉️ {personal.email}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* ================= VIEW 1: INTERACTIVE DOSSIER ================= */}
          {viewMode === 'dossier' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Header Contact Strip */}
              <div className="p-4 sm:p-5 bg-[#fffdf0] border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-black uppercase tracking-tight">
                    {personal.fullName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-xs text-gray-700">
                    <span className="font-bold text-brand-orange-dark">{personal.location}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="hover:underline flex items-center gap-1 font-bold text-black cursor-pointer"
                    >
                      <span>{personal.email}</span>
                      {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <span>•</span>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-bold hover:underline"
                    >
                      LinkedIn ↗
                    </a>
                    <span>•</span>
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black font-bold hover:underline"
                    >
                      GitHub ↗
                    </a>
                  </div>
                </div>

                <a
                  href="/assets/Pravin_Resume.pdf"
                  download="Pravin_G_Resume.pdf"
                  onClick={() => sound.playSuccess()}
                  className="px-4 py-2 bg-brand-yellow hover:bg-[#ffde59] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD OFFICIAL PDF</span>
                </a>
              </div>

              {/* About Me Executive Summary */}
              <div className="p-4 bg-gray-50 border-2 border-black rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-brand-orange">
                  EXECUTIVE SUMMARY
                </span>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  {resume.summary}
                </p>
              </div>

              {/* Education & Patents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Education */}
                <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-gray-500">
                    <GraduationCap className="w-4 h-4 text-black" />
                    <span>EDUCATION</span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-black uppercase">
                      {resume.education.institution}
                    </h4>
                    <p className="text-xs font-bold text-brand-orange-dark font-mono mt-0.5">
                      {resume.education.degree}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200 text-xs font-mono">
                      <span className="text-gray-600 font-semibold">{resume.education.period}</span>
                      <span className="px-2 py-0.5 bg-brand-yellow border border-black rounded font-black text-black">
                        {resume.education.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patents & Key Honours */}
                <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-gray-500">
                    <Award className="w-4 h-4 text-brand-orange" />
                    <span>PATENTS & HONORS</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-800">
                    <li className="flex items-start gap-2 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>20+ Patents Published:</strong> Across software engineering, AI, and computer vision.</span>
                    </li>
                    <li className="flex items-start gap-2 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>VIT Achiever Award (2025–26):</strong> Recognized for national-level merit.</span>
                    </li>
                    <li className="flex items-start gap-2 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>2x 1st Place National Hackathon Wins:</strong> KRXGEN & Maadhyamik.</span>
                    </li>
                    <li className="flex items-start gap-2 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span><strong>2nd Place Danfoss Innovator 2026:</strong> ₹50,000 cash prize.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Key Systems & Experience */}
              <div className="space-y-3">
                <h4 className="font-black text-sm uppercase text-black tracking-wide flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-blue" />
                  <span>Verified Projects & Systems</span>
                </h4>
                
                <div className="space-y-3">
                  {resume.experiences.map((exp, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-black text-sm sm:text-base text-black uppercase">
                          {exp.company}
                        </h5>
                        <span className="font-mono text-[11px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-300 self-start sm:self-auto">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold text-brand-orange-dark">
                        {exp.role}
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        {exp.description}
                      </p>
                      {exp.tech && (
                        <div className="pt-1.5 border-t border-gray-200 font-mono text-[10px] text-gray-600 font-bold">
                          STACK: {exp.tech}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorized Skills Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="font-black text-sm uppercase text-black tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-orange" />
                  <span>Technical Skills & Frameworks</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {resume.skills.map((group, gIdx) => (
                    <div key={gIdx} className="p-3.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] space-y-2">
                      <span className="text-[11px] font-mono font-black uppercase text-gray-500 block border-b border-gray-200 pb-1">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {group.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="px-2 py-0.5 bg-gray-100 rounded border border-gray-300 text-[10px] font-mono text-gray-800 font-semibold"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Languages Known */}
                  <div className="p-3.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_#000] space-y-2">
                    <span className="text-[11px] font-mono font-black uppercase text-gray-500 block border-b border-gray-200 pb-1">
                      Languages Known
                    </span>
                    <div className="space-y-1 font-mono text-xs">
                      {resume.languagesKnown.map((lang, lIdx) => (
                        <div key={lIdx} className="flex items-center justify-between">
                          <span className="font-bold text-black">{lang.name}</span>
                          <span className="text-[10px] text-gray-500 font-bold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-300">{lang.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= VIEW 2: EMBEDDED PDF VIEWER ================= */}
          {viewMode === 'pdf' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-black/80 font-mono text-xs">
                <span className="font-bold text-gray-700">Displaying official single-page PDF (Pravin_Resume.pdf):</span>
                <a
                  href="/assets/Pravin_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-orange-dark hover:underline flex items-center gap-1"
                >
                  <span>Open In New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="w-full h-[70vh] border-[3px] border-black rounded-xl overflow-hidden bg-gray-900 shadow-[4px_4px_0px_#000]">
                <iframe
                  src="/assets/Pravin_Resume.pdf#toolbar=0&navpanes=0"
                  title="Pravin G Official Resume"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Bar */}
        <div className="px-5 sm:px-7 py-3 bg-gray-100 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-gray-600 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified credentials · Last updated June 2026</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/Pravin_Resume.pdf"
              download="Pravin_G_Resume.pdf"
              onClick={() => sound.playSuccess()}
              className="px-4 py-1.5 bg-brand-yellow hover:bg-[#ffde59] text-black font-black uppercase tracking-wider rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-3.5 py-1.5 bg-black hover:bg-gray-800 text-white font-bold uppercase rounded-lg border-2 border-black transition-colors cursor-pointer"
            >
              CLOSE [ESC]
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
