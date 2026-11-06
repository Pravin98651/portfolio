import React, { useState, useEffect } from 'react';
import Signboard from './components/Signboard';
import Zipper from './components/Zipper';
import BackpackPocket from './components/BackpackPocket';
import IdBadge from './components/IdBadge';
import CaseStudyModal from './components/CaseStudyModal';
import BentoGrid from './components/BentoGrid';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import DeveloperTerminal from './components/DeveloperTerminal';
import { portfolioData } from './portfolioData';
import { Volume2, VolumeX, Sparkles, ArrowUp, ChevronDown, Terminal, Sun, Moon, Palette } from 'lucide-react';
import { sound } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [zipperProgress, setZipperProgress] = useState(0);
  const [isUnzipped, setIsUnzipped] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark';
  });
  const [bgPalette, setBgPalette] = useState(() => {
    return (typeof window !== 'undefined' && localStorage.getItem('bg_palette')) || 'amber';
  });

  const bgPalettes = [
    { id: 'amber', name: 'Warm Amber', dot: '#f3670e' },
    { id: 'sunset', name: 'Sunset Punch', dot: '#f97316' },
    { id: 'slate', name: 'Nordic Slate', dot: '#38bdf8' },
    { id: 'emerald', name: 'Matrix Emerald', dot: '#10b981' },
  ];

  useEffect(() => {
    if (bgPalette && bgPalette !== 'amber') {
      document.documentElement.setAttribute('data-bg-theme', bgPalette);
    } else {
      document.documentElement.removeAttribute('data-bg-theme');
    }
    localStorage.setItem('bg_palette', bgPalette);
  }, [bgPalette]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '`') {
        e.preventDefault();
        sound.playClick();
        setIsTerminalOpen(prev => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleUnzip = (open) => {
    setIsUnzipped(open);
  };

  const handleOpenResume = () => {
    sound.playClick();
    setActiveTab('resume');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleToggleTheme = () => {
    sound.playClick();
    setIsDark(prev => !prev);
  };

  const handleCycleBgPalette = () => {
    sound.playClick();
    const currentIndex = bgPalettes.findIndex(p => p.id === bgPalette);
    const nextPalette = bgPalettes[(currentIndex + 1) % bgPalettes.length];
    setBgPalette(nextPalette.id);
  };

  const scrollToSection = (id) => {
    sound.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-orange-ribbed flex flex-col justify-between overflow-x-hidden relative selection:bg-brand-yellow selection:text-black transition-colors duration-300">
      
      {/* Top Header / Floating Navigation Bar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 flex items-center justify-between select-none bg-orange-ribbed/90 backdrop-blur-md border-b-2 border-black/10">
        
        {/* Brand identity pill */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-transform"
        >
          <div className="w-6 h-6 rounded-full bg-black text-brand-yellow font-black text-xs flex items-center justify-center border border-black">
            P
          </div>
          <span className="font-mono font-bold text-xs tracking-wider uppercase text-black">
            {portfolioData.personal.fullName} · Portfolio
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
        </button>

        {/* Center / Right Control Shortcuts */}
        <div className="flex items-center gap-2">
          
          {/* Section Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs font-bold bg-white/90 backdrop-blur-md p-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
            <button
              type="button"
              onClick={() => scrollToSection('bento')}
              className="px-3 py-1 rounded-full border border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black transition-all"
            >
              OVERVIEW
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="px-3 py-1 rounded-full border border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black transition-all"
            >
              PROJECTS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="px-3 py-1 rounded-full border border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black transition-all"
            >
              ABOUT
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              className="px-3 py-1 rounded-full border border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black transition-all"
            >
              SKILLS
            </button>
            <button
              type="button"
              onClick={handleOpenResume}
              className="px-3 py-1 rounded-full border border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black transition-all"
            >
              RÉSUMÉ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-3 py-1 rounded-full bg-brand-red text-white hover:bg-red-700 border border-black shadow-sm font-extrabold transition-all"
            >
              CONTACT
            </button>
          </nav>

          {/* Developer CLI Terminal Trigger Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsTerminalOpen(true);
            }}
            title="Launch Developer Terminal (Ctrl+K)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded-full border-2 border-black shadow-[2px_2px_0px_#ffd31e] font-mono text-xs font-bold transition-all hover:scale-105"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLI</span>
          </button>

          {/* Canvas Background Atmosphere Palette Switcher */}
          <button
            type="button"
            onClick={handleCycleBgPalette}
            title={`Current Canvas Atmosphere: ${bgPalettes.find(p => p.id === bgPalette)?.name}. Click to cycle background color palette.`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-black hover:text-white text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-[11px] font-bold transition-all hover:scale-105"
          >
            <Palette className="w-3.5 h-3.5" />
            <span
              className="w-2.5 h-2.5 rounded-full border border-black shadow-xs inline-block"
              style={{ backgroundColor: bgPalettes.find(p => p.id === bgPalette)?.dot }}
            />
            <span className="hidden xl:inline uppercase text-[10px] tracking-wider">
              {bgPalettes.find(p => p.id === bgPalette)?.name}
            </span>
          </button>

          {/* Theme Mode Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTheme}
            title={isDark ? 'Switch to Day Light Canvas' : 'Switch to Night Obsidian Tactical'}
            className="p-2 bg-white hover:bg-black hover:text-white text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* Sound Audio Mute Toggle Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute tactile audio' : 'Mute tactile audio'}
            className="p-2 bg-white hover:bg-black hover:text-white text-black rounded-full border-2 border-black shadow-[2px_2px_0px_#000] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ================= HERO INTERACTIVE STAGE ================= */}
      <main className="relative flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-4 sm:px-8 py-4 sm:py-6 z-10 max-w-7xl mx-auto w-full">
        
        {/* Left Side: Screwed Signboard & Floating Stickers */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center py-2">
          <Signboard />
        </div>

        {/* Center: The Central Interactive Zipper (Synced with Page Scroll) */}
        <div className="hidden lg:flex items-center justify-center h-[720px] z-30">
          <Zipper
            progress={zipperProgress}
            onProgressChange={setZipperProgress}
            isOpen={isUnzipped}
            onToggleOpen={handleToggleUnzip}
          />
        </div>

        {/* Right Side: Red Backpack Pocket + Hanging ID Badge */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-6 py-2">
          
          {/* Backpack Pocket with 3 interactive folder tabs */}
          <div className="w-full max-w-[480px]">
            <BackpackPocket
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onOpenCaseStudy={setSelectedCaseStudy}
              currentProjectIndex={currentProjectIndex}
              onSelectProjectIndex={setCurrentProjectIndex}
            />
          </div>

          {/* Suspended ID Badge */}
          <div className="flex-shrink-0 -mt-2 sm:mt-6">
            <IdBadge onOpenResume={handleOpenResume} />
          </div>

        </div>
      </main>

      {/* Mobile / Tablet Quick Scroll Indicator */}
      <div className="lg:hidden w-full flex justify-center py-4 px-4 z-20">
        <button
          type="button"
          onClick={() => scrollToSection('bento')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-[3px] border-black rounded-full font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:bg-brand-yellow transition-all"
        >
          <span>EXPLORE OVERVIEW & CASE STUDIES</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* ================= 1. BENTO GRID CAPABILITIES & LIVE METRICS ================= */}
      <BentoGrid
        onOpenCaseStudy={setSelectedCaseStudy}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={handleOpenResume}
      />

      {/* ================= 2. PROJECTS & CASE STUDIES SECTION ================= */}
      <ProjectsSection onOpenCaseStudy={setSelectedCaseStudy} />

      {/* ================= 3. ABOUT & PHILOSOPHY SECTION ================= */}
      <AboutSection />

      {/* ================= 4. SKILLS & TECHNOLOGY MATRIX ================= */}
      <SkillsSection />

      {/* ================= 5. GET IN TOUCH & DISPATCH ================= */}
      <ContactSection />

      {/* Floating "Back to Top" Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Back to Top / Backpack"
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-brand-yellow hover:bg-[#ffde59] text-black border-[3px] border-black rounded-full shadow-[4px_4px_0px_#000] hover:scale-110 transition-transform animate-in fade-in"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Bottom Hint / Info Bar */}
      <footer className="relative z-20 w-full px-6 py-4 flex flex-wrap items-center justify-between text-xs font-mono text-black/85 border-t-2 border-black/20 select-none bg-orange-ribbed/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-orange-dark" />
          <span>Interactive tactile portfolio · Press Ctrl+K for CLI · Drag zipper or scroll wheel · Click badge to flip in 3D</span>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <a
            href={portfolioData.personal.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black font-extrabold underline underline-offset-2"
          >
            GitHub: Pravin98651
          </a>
          <span>© {new Date().getFullYear()} Pravin · Software Developer</span>
        </div>
      </footer>

      {/* Developer CLI Terminal Modal */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenCaseStudy={setSelectedCaseStudy}
        onOpenResume={handleOpenResume}
        onToggleTheme={handleToggleTheme}
        isDark={isDark}
      />

      {/* Case Study Full Modal Dialog */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

    </div>
  );
}
