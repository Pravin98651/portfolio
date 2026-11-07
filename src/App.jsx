import React, { useState, useEffect, useRef, useCallback } from 'react';
import Signboard from './components/Signboard';
import Zipper from './components/Zipper';
import BackpackPocket from './components/BackpackPocket';
import IdBadge from './components/IdBadge';
import CaseStudyModal from './components/CaseStudyModal';
import ResumeModal from './components/ResumeModal';
import BentoGrid from './components/BentoGrid';
import ProjectsSection from './components/ProjectsSection';
import HackathonsSection from './components/HackathonsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import DeveloperTerminal from './components/DeveloperTerminal';
import ProjectDetailPage from './components/ProjectDetailPage';
import { portfolioData } from './portfolioData';
import { getProjectBySlug, getProjectUrl, ALL_PROJECT_ROUTES } from './utils/projectRoutes';
import { Volume2, VolumeX, Sparkles, ArrowUp, ChevronDown, Terminal, Sun, Moon, Palette, Zap, ArrowLeft, ExternalLink } from 'lucide-react';
import { sound } from './utils/soundEffects';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash.replace(/^#/, '');
      if (path && path !== '/' && path !== '') return path;
      if (hash && hash !== '' && hash !== '/' && !hash.startsWith('/#')) return '/' + hash.replace(/^\//, '');
    }
    return '/';
  });

  const [activeTab, setActiveTab] = useState('portfolio');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
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

  const isHome = currentRoute === '/' || currentRoute === '' || currentRoute === '/#hero';
  const matchedProject = !isHome ? getProjectBySlug(currentRoute) : null;

  const navigateTo = useCallback((targetPath) => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      let cleanPath = targetPath || '/';
      if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
      window.history.pushState({}, '', cleanPath);
      setCurrentRoute(cleanPath);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Listen to popstate and hashchange events for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace(/^#/, '');
      const route = (path && path !== '' && path !== '/') ? path : (hash ? '/' + hash.replace(/^\//, '') : '/');
      setCurrentRoute(route);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update browser document.title dynamically based on route
  useEffect(() => {
    if (matchedProject) {
      document.title = `${matchedProject.title} — Pravin G Engineering Case Study`;
    } else if (!isHome) {
      document.title = `404: Specification Not Found — Pravin G Portfolio`;
    } else {
      document.title = `${portfolioData.personal.fullName} · Software Developer & AI Engineer Portfolio`;
    }
  }, [matchedProject, isHome]);

  // Enforce starting at the very top (Hero console) on initial visit or refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      setIsUnzipped(false);
      setZipperProgress(0);
      hasTriggeredScrollTransition.current = false;
      setActiveSection('hero');

      const frameId = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });

      const onBeforeUnload = () => {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
      };
      window.addEventListener('beforeunload', onBeforeUnload);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    }
  }, []);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('UNZIPPING WORKSPACE...');

  const hasTriggeredScrollTransition = useRef(false);
  const isTransitioningRef = useRef(false);
  const isDraggingZipperRef = useRef(false);
  const lastScrollY = useRef(0);
  const lastSoundProgress = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimer = useRef(null);

  const triggerUnzipTransition = useCallback((targetId = 'workspace-portal') => {
    sound.playTransition();
    setIsTransitioning(true);
    isTransitioningRef.current = true;
    hasTriggeredScrollTransition.current = true;
    setIsUnzipped(true);
    setZipperProgress(1);

    if (targetId === 'projects') {
      setTransitionText('INITIALIZING PROJECT SHOWCASE EXHIBITION...');
    } else {
      setTransitionText('INITIALIZING ARCHITECTURAL DOSSIER...');
    }

    setTimeout(() => {
      const elem = document.getElementById(targetId) || document.getElementById('bento');
      if (elem) {
        const headerOffset = 75;
        const elemTop = elem.getBoundingClientRect().top;
        const offsetPosition = elemTop + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 260);

    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }, 850);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const isScrollingDown = scrollY > lastScrollY.current;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollPercent(pct);

      if (scrollY > 380) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // If user is manually dragging the zipper handle or programmatic scroll in flight, guard
      if (!isDraggingZipperRef.current && !isProgrammaticScroll.current) {
        // While in hero region (top 380px) and not unzipped yet, sync zipperProgress to scroll
        if (scrollY <= 380 && !hasTriggeredScrollTransition.current) {
          const prog = Math.min(1, Math.max(0, scrollY / 240));
          setZipperProgress(prog);

          // Tactile ratchet audio ticks as teeth unmesh during scroll
          if (Math.abs(prog - lastSoundProgress.current) > 0.08) {
            sound.playZipper();
            lastSoundProgress.current = prog;
          }
        }

        // TRIGGER UNZIP ANIMATION ON SCROLL:
        // When manually scrolling down past 140px from hero and transition hasn't fired yet
        if (
          scrollY > 140 &&
          isScrollingDown &&
          !hasTriggeredScrollTransition.current &&
          !isTransitioningRef.current
        ) {
          hasTriggeredScrollTransition.current = true;
          setZipperProgress(1);
          triggerUnzipTransition('workspace-portal');
        }

        // RE-ARM ONLY ON MANUAL SCROLL BACK UP TO TOP (< 40px):
        if (scrollY < 40 && !isScrollingDown && hasTriggeredScrollTransition.current) {
          hasTriggeredScrollTransition.current = false;
          setIsUnzipped(false);
          setZipperProgress(0);
          lastSoundProgress.current = 0;
        }
      }

      lastScrollY.current = scrollY;

      // Determine active section for nav highlight
      const sections = ['contact', 'skills', 'about', 'hackathons', 'projects', 'bento', 'workspace-portal'];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            current = (id === 'workspace-portal') ? 'bento' : id;
            break;
          }
        }
      }

      // If user reached bottom of page, highlight contact
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        current = 'contact';
      }

      setActiveSection(current);
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
  }, [triggerUnzipTransition]);

  // Global IntersectionObserver to trigger .is-visible on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeAll = () => {
      const targets = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
      );
      targets.forEach((t) => observer.observe(t));
    };

    observeAll();
    const timeout = setTimeout(observeAll, 450);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [activeTab, selectedCaseStudy]);

  const handleToggleUnzip = (open) => {
    setIsUnzipped(open);
  };

  const handleOpenResume = () => {
    sound.playClick();
    setIsResumeOpen(true);
    setActiveTab('resume');
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
    hasTriggeredScrollTransition.current = true;
    setIsUnzipped(true);
    setZipperProgress(1);

    // Provide instant visual active-state feedback on click
    if (id === 'workspace-portal' || id === 'bento') {
      setActiveSection('bento');
    } else {
      setActiveSection(id);
    }

    // Lock out zipper scroll interception during smooth travel
    isProgrammaticScroll.current = true;
    if (programmaticScrollTimer.current) {
      clearTimeout(programmaticScrollTimer.current);
    }
    programmaticScrollTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1200);

    const targetId = id === 'bento' ? 'workspace-portal' : id;
    const elem = document.getElementById(targetId) || document.getElementById(id);
    if (elem) {
      const performScroll = () => {
        const headerOffset = 75;
        const elemTop = elem.getBoundingClientRect().top;
        const offsetPosition = elemTop + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      };

      performScroll();
      setTimeout(performScroll, 60);
    }
  };

  const scrollToTop = () => {
    sound.playClick();
    isProgrammaticScroll.current = true;
    if (programmaticScrollTimer.current) {
      clearTimeout(programmaticScrollTimer.current);
    }
    programmaticScrollTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 1000);

    hasTriggeredScrollTransition.current = false;
    setIsUnzipped(false);
    setZipperProgress(0);
    lastSoundProgress.current = 0;
    setActiveSection('hero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If the user navigated to a dedicated project page (e.g. /lexifyd, /kidtube, /rag-chatbot)
  if (!isHome && matchedProject) {
    return (
      <ProjectDetailPage
        project={matchedProject}
        onBack={() => navigateTo('/')}
        onNavigate={(path) => navigateTo(path)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
    );
  }

  // If the user navigated to an unrecognized sub-page, show a neo-brutalist 404
  if (!isHome && !matchedProject) {
    return (
      <div className="min-h-screen w-full bg-orange-ribbed text-black dark:text-white flex flex-col justify-between p-6 sm:p-12 select-none">
        <div className="max-w-2xl mx-auto my-auto bg-white dark:bg-[#12141f] border-[3px] border-black rounded-2xl p-8 sm:p-12 shadow-[10px_10px_0px_#000] text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-brand-red border border-black rounded-full font-mono text-xs font-black">
            <span>⚠️ ERROR 404</span>
            <span>// SPECIFICATION NOT FOUND</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Project Dossier Relocated
          </h1>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed font-mono">
            No system specification was found at route <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-brand-orange-dark font-black">{currentRoute}</code>.
          </p>
          
          <div className="p-4 bg-gray-50 dark:bg-[#1a1c28] border-2 border-black rounded-xl text-left space-y-2">
            <span className="font-mono text-[11px] font-bold text-gray-500 uppercase block">
              AVAILABLE PROJECT DOSSIERS:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_PROJECT_ROUTES.map((r) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => navigateTo(`/${r.slug}`)}
                  className="px-3 py-2 bg-white dark:bg-gray-800 hover:bg-brand-yellow hover:text-black border border-black rounded-lg text-xs font-mono font-bold text-left flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>/{r.slug}</span>
                  <span className="text-[10px] text-gray-500">→</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow hover:bg-[#ffde59] text-black font-black text-xs uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:scale-105 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO COMPLETE PORTFOLIO DOSSIER</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-orange-ribbed flex flex-col justify-between overflow-x-hidden relative selection:bg-brand-yellow selection:text-black transition-colors duration-300">
      
      {/* Top Global Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-emerald-400 z-50 transition-all duration-75 shadow-[0_0_12px_rgba(243,103,14,0.9)]"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Ambient Atmospheric Backlight Shaders (Hardware-accelerated glow mesh) */}
      <div className="ambient-glow-mesh" aria-hidden="true">
        <div className="glow-orb-top" />
        <div className="glow-orb-left" />
        <div className="glow-orb-right" />
        <div className="glow-orb-bottom" />
      </div>

      {/* Top Header / Floating Navigation Bar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 flex items-center justify-between select-none bg-orange-ribbed/90 dark:bg-[#07090e]/85 backdrop-blur-md border-b-2 border-black/10 dark:border-white/10">
        
        {/* Brand identity pill */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 bg-white/95 dark:bg-[#12141f]/90 dark:text-white dark:border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#f3670e] hover:scale-105 transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-black text-brand-yellow font-black text-xs flex items-center justify-center border border-black dark:border-white/30">
            P
          </div>
          <span className="font-mono font-bold text-xs tracking-wider uppercase text-black dark:text-white">
            {portfolioData.personal.fullName} · Portfolio
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
        </button>

        {/* Center / Right Control Shortcuts */}
        <div className="flex items-center gap-2">
          
          {/* Section Navigation Links with Active State Highlighting */}
          <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs font-bold bg-white/90 dark:bg-[#12141f]/90 backdrop-blur-md p-1 rounded-full border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#f3670e]">
            <button
              type="button"
              onClick={() => scrollToSection('bento')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                activeSection === 'bento'
                  ? 'bg-brand-yellow text-black border-black font-black shadow-[1px_1px_0px_#000]'
                  : 'border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black dark:text-gray-200 dark:hover:text-black'
              }`}
            >
              OVERVIEW
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                activeSection === 'projects'
                  ? 'bg-brand-yellow text-black border-black font-black shadow-[1px_1px_0px_#000]'
                  : 'border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black dark:text-gray-200 dark:hover:text-black'
              }`}
            >
              PROJECTS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('hackathons')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                activeSection === 'hackathons'
                  ? 'bg-brand-yellow text-black border-black font-black shadow-[1px_1px_0px_#000]'
                  : 'border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black dark:text-gray-200 dark:hover:text-black'
              }`}
            >
              HACKATHONS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                activeSection === 'about'
                  ? 'bg-brand-yellow text-black border-black font-black shadow-[1px_1px_0px_#000]'
                  : 'border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black dark:text-gray-200 dark:hover:text-black'
              }`}
            >
              ABOUT
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                activeSection === 'skills'
                  ? 'bg-brand-yellow text-black border-black font-black shadow-[1px_1px_0px_#000]'
                  : 'border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black dark:text-gray-200 dark:hover:text-black'
              }`}
            >
              SKILLS
            </button>
            <button
              type="button"
              onClick={handleOpenResume}
              className="px-3 py-1 rounded-full border border-transparent hover:border-black hover:bg-brand-yellow hover:text-black text-black dark:text-gray-200 dark:hover:text-black transition-all cursor-pointer"
            >
              RÉSUMÉ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className={`px-3 py-1 rounded-full border shadow-sm font-extrabold transition-all cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-red-700 text-white border-black ring-2 ring-brand-yellow'
                  : 'bg-brand-red text-white hover:bg-red-700 border-black'
              }`}
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded-full border-2 border-black dark:border-white/30 shadow-[2px_2px_0px_#ffd31e] font-mono text-xs font-bold transition-all hover:scale-105"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>CLI</span>
          </button>

          {/* Canvas Background Atmosphere Palette Switcher */}
          <button
            type="button"
            onClick={handleCycleBgPalette}
            title={`Current Canvas Atmosphere: ${bgPalettes.find(p => p.id === bgPalette)?.name}. Click to cycle background color palette.`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-[#12141f]/90 hover:bg-black hover:text-white dark:hover:bg-brand-orange dark:hover:text-black text-black dark:text-white rounded-full border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#f3670e] font-mono text-[11px] font-bold transition-all hover:scale-105"
          >
            <Palette className="w-3.5 h-3.5" />
            <span
              className="w-2.5 h-2.5 rounded-full border border-black dark:border-white shadow-xs inline-block"
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
            className="p-2 bg-white dark:bg-[#12141f]/90 hover:bg-black hover:text-white dark:hover:bg-brand-yellow dark:hover:text-black text-black dark:text-white rounded-full border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#ffd31e] transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-gray-700" />}
          </button>

          {/* Sound Audio Mute Toggle Button */}
          <button
            type="button"
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute tactile audio' : 'Mute tactile audio'}
            className="p-2 bg-white dark:bg-[#12141f]/90 hover:bg-black hover:text-white dark:hover:bg-brand-orange dark:hover:text-black text-black dark:text-white rounded-full border-2 border-black dark:border-white/20 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#f3670e] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ================= REALISTIC CENTER-SPLIT UNZIP TRANSITION OVERLAY ================= */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          
          {/* Left Curtain Panel (Peels to the Left with 3D Fold) */}
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#0c0d14] border-r-4 border-brand-yellow animate-unzip-left shadow-[30px_0_70px_rgba(0,0,0,0.95)] flex items-center justify-end overflow-hidden">
            <div className="absolute inset-0 bg-workspace-grid opacity-30 pointer-events-none" />
            
            {/* Metallic Zipper Teeth lining the right vertical edge */}
            <div className="absolute right-0 inset-y-0 w-4 flex flex-col justify-between py-2">
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-2 bg-gradient-to-r from-amber-500 to-amber-300 border border-black rounded-l-xs shadow-xs"
                />
              ))}
            </div>

            {/* Left Status Telemetry Badge */}
            <div className="mr-8 px-4 py-2 bg-black/90 border-2 border-brand-yellow rounded-xl shadow-[4px_4px_0px_#f3670e] text-right font-mono hidden sm:block">
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block">UNZIPPING PORTAL</span>
              <span className="text-xs text-brand-yellow font-black uppercase">STAGE 01 // PARTING</span>
            </div>
          </div>

          {/* Right Curtain Panel (Peels to the Right with 3D Fold) */}
          <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#0c0d14] border-l-4 border-brand-orange animate-unzip-right shadow-[-30px_0_70px_rgba(0,0,0,0.95)] flex items-center justify-start overflow-hidden">
            <div className="absolute inset-0 bg-workspace-grid opacity-30 pointer-events-none" />
            
            {/* Metallic Zipper Teeth lining the left vertical edge */}
            <div className="absolute left-0 inset-y-0 w-4 flex flex-col justify-between py-2">
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-2 bg-gradient-to-l from-amber-500 to-amber-300 border border-black rounded-r-xs shadow-xs translate-y-1"
                />
              ))}
            </div>

            {/* Right Status Telemetry Badge */}
            <div className="ml-8 px-4 py-2 bg-black/90 border-2 border-brand-orange rounded-xl shadow-[4px_4px_0px_#ffd31e] text-left font-mono hidden sm:block">
              <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase block">REVELATION</span>
              <span className="text-xs text-brand-orange font-black uppercase">LEVEL 02 // DOSSIER</span>
            </div>
          </div>

          {/* Center High-Speed Running Golden Zipper Puller Head */}
          <div className="absolute left-1/2 -translate-x-1/2 animate-zipper-head z-50 pointer-events-none flex flex-col items-center">
            {/* Sparks & Voltage Bloom */}
            <div className="w-12 h-12 bg-brand-yellow rounded-full blur-md opacity-85 animate-ping" />
            <div className="w-16 h-20 bg-brand-yellow border-[3px] border-black rounded-2xl shadow-[0_0_30px_rgba(255,211,30,0.95)] flex flex-col items-center justify-between p-2">
              <div className="w-4 h-1 bg-black rounded-full" />
              <Zap className="w-6 h-6 text-black fill-current animate-bounce" />
              <div className="w-5 h-2 bg-black rounded" />
            </div>
          </div>

          {/* Center Telemetry HUD Notification */}
          <div className="relative z-40 px-6 py-3 bg-black/95 border-[3px] border-brand-yellow rounded-2xl shadow-[6px_6px_0px_#f3670e] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-yellow animate-ping" />
            <span className="font-mono font-black text-xs sm:text-sm text-white tracking-widest uppercase">
              {transitionText}
            </span>
          </div>

        </div>
      )}

      {/* ================= HERO INTERACTIVE STAGE ================= */}
      <main className="relative flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 px-4 sm:px-8 py-4 sm:py-6 z-10 max-w-7xl mx-auto w-full">
        
        {/* Left Side: Screwed Signboard & Floating Stickers (Physical 3D divergence during unzipping) */}
        <div
          className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center py-2 transition-transform duration-200"
          style={{
            transform: `translateX(-${zipperProgress * 70}px) translateY(-${zipperProgress * 25}px) rotateY(${zipperProgress * 6}deg)`,
            opacity: Math.max(0.12, 1 - zipperProgress * 0.85),
            perspective: '1200px',
          }}
        >
          <Signboard />
        </div>

        {/* Center: The Central Interactive Zipper (Synced with Page Scroll) */}
        <div className="hidden lg:flex items-center justify-center h-[720px] z-30">
          <Zipper
            progress={zipperProgress}
            onProgressChange={setZipperProgress}
            isOpen={isUnzipped}
            onToggleOpen={handleToggleUnzip}
            onTriggerTransition={() => triggerUnzipTransition('workspace-portal')}
            onDragStateChange={(dragging) => {
              isDraggingZipperRef.current = dragging;
            }}
          />
        </div>

        {/* Right Side: Red Backpack Pocket + Hanging ID Badge (Physical 3D divergence during unzipping) */}
        <div
          className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-6 py-2 transition-transform duration-200"
          style={{
            transform: `translateX(${zipperProgress * 70}px) translateY(-${zipperProgress * 25}px) rotateY(-${zipperProgress * 6}deg)`,
            opacity: Math.max(0.12, 1 - zipperProgress * 0.85),
            perspective: '1200px',
          }}
        >
          
          {/* Backpack Pocket with 3 interactive folder tabs */}
          <div className="w-full max-w-[480px]">
            <BackpackPocket
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onOpenCaseStudy={setSelectedCaseStudy}
              onNavigateToProject={navigateTo}
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
          onClick={() => triggerUnzipTransition('workspace-portal')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow hover:bg-yellow-400 text-black border-[3px] border-black rounded-full font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:scale-105 transition-all"
        >
          <span>⚡ UNZIP & ENTER FULL WORKSPACE</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* ================= WORKSPACE TRANSITION PORTAL / LEVEL 02 GATE ================= */}
      <section
        id="workspace-portal"
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 z-20 scroll-mt-20 sm:scroll-mt-24"
      >
        <div className="relative manila-card border-[3.5px] border-black rounded-3xl p-5 sm:p-7 shadow-[10px_10px_0px_#000000] transition-all">
          {/* Top Caution Hazard Stripe Trim */}
          <div className="w-full h-2.5 bg-caution-stripes-sm rounded-full border border-black mb-4 shadow-xs" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Status Telemetry & Pulse */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-orange flex items-center justify-center text-white font-black text-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-brand-yellow text-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                    ARCHITECTURAL DOSSIER
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-800 dark:text-gray-300">
                    // WORKSPACE UNZIPPED
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-black uppercase tracking-tight mt-1">
                  <span className="bg-brand-yellow text-black px-2 py-0.5 border border-black rounded inline-block shadow-[1px_1px_0px_#000]">Complete Engineering Dossier & Live Architecture</span>
                </h3>
              </div>
            </div>

            {/* Quick Jump Action Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={scrollToTop}
                className="px-3.5 py-2 bg-[#1a2233] hover:bg-black text-white rounded-xl border-2 border-black font-mono text-xs font-bold transition-all shadow-[2px_2px_0px_#000]"
              >
                ↑ CONSOLE HERO
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-xl border-2 border-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_#000]"
              >
                PROJECTS ({portfolioData.projects.length}) ↓
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('hackathons')}
                className="px-4 py-2 bg-brand-yellow hover:bg-yellow-400 text-black rounded-xl border-2 border-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_#000]"
              >
                HACKATHONS ({portfolioData.hackathons.items.length}) ↓
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('skills')}
                className="px-3.5 py-2 bg-white hover:bg-gray-100 text-black rounded-xl border-2 border-black font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_#000]"
              >
                SKILLS ↓
              </button>
            </div>

          </div>

          {/* Mechanical Zipper Track Partition Teeth Graphic */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-gray-400 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-gray-700 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM MODULES: ONLINE
            </span>
            <span className="hidden sm:inline">TAMIL LLM • LANGGRAPH AGENTS • HYBRID RAG • MULTI-ROLE RECRUITER AI</span>
            <span className="font-bold">PRAVIN · APPLIED AI</span>
          </div>
        </div>
      </section>

      {/* ================= 1. BENTO GRID CAPABILITIES & LIVE METRICS ================= */}
      <BentoGrid
        onOpenCaseStudy={setSelectedCaseStudy}
        onNavigateToProject={navigateTo}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={handleOpenResume}
      />

      {/* ================= 2. PROJECTS & CASE STUDIES SECTION ================= */}
      <ProjectsSection 
        onOpenCaseStudy={setSelectedCaseStudy}
        onNavigateToProject={navigateTo}
      />

      {/* ================= 3. AWARDS, HACKATHONS & RECOGNITION ================= */}
      <HackathonsSection onNavigateToProject={navigateTo} />

      {/* ================= 4. ABOUT & PHILOSOPHY SECTION ================= */}
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
        onNavigateToProject={navigateTo}
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

      {/* Official Résumé & Dossier Modal Dialog */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
