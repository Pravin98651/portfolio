import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import { Terminal, X, CornerDownLeft, Sparkles, Download, Copy, Check } from 'lucide-react';

export default function DeveloperTerminal({ isOpen, onClose, onOpenCaseStudy, onOpenResume, onToggleTheme, isDark }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Pravin Developer Terminal [Version 2.4.0]' },
    { type: 'system', text: 'Type "help" or click command chips below to inspect systems.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    sound.playClick();
    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    const newHistory = [...history, { type: 'user', text: raw }];
    setCommandHistory(prev => [...prev, raw]);
    setHistoryIndex(-1);

    switch (command) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  projects         List all 4 verified technical case studies
  project <name>   Open case study for kidtube, jobhunt, lexifyd, or rag
  hackathons       Display national hackathon wins, Danfoss 2026, and awards
  skills           Print categorized full-stack & AI capabilities
  about            Print engineering philosophy and positioning
  resume           Open / download Pravin's curriculum vitae
  contact          Show direct dispatch channels and social handles
  theme            Toggle Day / Night tactical theme
  clear            Clear terminal screen
  whoami           Display current visitor session info`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `VERIFIED PRODUCTION ARCHITECTURES:
  1. KidTube         - Parent-Controlled Video Platform (Next.js 14, Expo, TF.js)
  2. Job Hunt AI     - LangGraph Multi-Agent Discovery (FastAPI, pgvector, Gemini)
  3. Lexifyd Tamil   - Contextual Polysemy Engine (FastAPI, Redis, Gemini)
  4. Multi-Role RAG  - Role-Scoped Knowledge Assistant (FAISS, Groq, SentenceTransformers)

Type "project kidtube" or click the project cards to open full deep dives.`
        });
        break;

      case 'hackathons':
      case 'awards':
        newHistory.push({
          type: 'output',
          text: `COMPETITIVE HACKATHON PODIUMS & RECOGNITIONS:
  🏆 1st Place Winner - National Hackathon (Sona College / Maadhyamik Technologies)
      Project: AI Trip Planner

  🥈 2nd Place (National) - Danfoss Innovator Award 2026 (Danfoss Chennai)
      Team Foresight | Prize: ₹50,000 Cash Prize
      Project: Robust RPM (Vibration-Based Pump Speed Estimation)

  🥈 2nd Place - National Hackathon (Sairam Engineering College)
      Team: Pravin G & Mohammed Kaif K
      Project: Lexifyd Tamil (Contextual Polysemy Engine)

  🎖️ Achiever Recognition - Vellore Institute of Technology (VIT, 2025–26)
      Official Certificate of Appreciation from Vice Chancellor & Chancellor

  🏆 1st Place Winner - KRXGEN '25 National Hackathon (K. Ramakrishnan College, Trichy)
      Project: AI & AR Smart Shopping Experience Platform & In-Store Navigation

Scrolling to Hackathons & Awards Section...`
        });
        setTimeout(() => {
          const el = document.getElementById('hackathons');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
        break;

      case 'project':
        if (!arg) {
          newHistory.push({ type: 'error', text: 'Please specify project: kidtube, jobhunt, lexifyd, or rag' });
        } else {
          const match = portfolioData.projects.find(p => p.id.includes(arg) || p.title.toLowerCase().includes(arg));
          if (match) {
            newHistory.push({ type: 'success', text: `Opening case study for ${match.title}...` });
            if (onOpenCaseStudy) onOpenCaseStudy(match);
          } else {
            newHistory.push({ type: 'error', text: `Project "${arg}" not found. Try: kidtube, jobhunt, lexifyd, rag` });
          }
        }
        break;

      case 'skills':
        const skillsText = portfolioData.resume.skills.map(s => 
          `[${s.category.toUpperCase()}]\n  ${s.items.join(' · ')}`
        ).join('\n\n');
        newHistory.push({ type: 'output', text: skillsText });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `POSITIONING:
  ${portfolioData.personal.positioning}

CORE PHILOSOPHY:
  "${portfolioData.personal.coreMessage}"

APPROACH:
  1. Analyze user friction and verify requirements before writing code.
  2. Build resilient state machines with structured schemas & keyword fallbacks.
  3. Decouple relational and vector data with clear scope boundaries.`
        });
        break;

      case 'resume':
      case 'cv':
      case 'download':
        newHistory.push({
          type: 'success',
          text: 'Triggering resume download (/assets/Pravin_Resume.pdf)...'
        });
        const link = document.createElement('a');
        link.href = '/assets/Pravin_Resume.pdf';
        link.download = 'Pravin_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        sound.playSuccess();
        break;

      case 'contact':
      case 'email':
        newHistory.push({
          type: 'output',
          text: `DISPATCH CHANNELS:
  Email:    ${portfolioData.contact.email}
  GitHub:   ${portfolioData.contact.github}
  Status:   ${portfolioData.contact.availability}
  Location: ${portfolioData.contact.location}`
        });
        break;

      case 'theme':
        if (onToggleTheme) onToggleTheme();
        newHistory.push({
          type: 'success',
          text: `Switched theme to ${isDark ? 'Day Corduroy Orange' : 'Night Stealth Charcoal'}.`
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([
          { type: 'system', text: 'Terminal cleared.' }
        ]);
        setInputVal('');
        return;

      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `Visitor Session: Guest Engineer
OS: ${navigator.userAgent.includes('Windows') ? 'Windows' : 'Unix / Mac'}
Browser: Client Rendered
Permission: Full Access to Technical Case Studies`
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${raw}". Type "help" to view supported commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
    >
      {/* Terminal Window Card */}
      <div className="relative w-full max-w-3xl bg-[#0c0d10] border-[3px] border-black rounded-2xl shadow-[12px_12px_0px_#000000] overflow-hidden flex flex-col font-mono text-xs sm:text-sm">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181a20] border-b-2 border-black select-none">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ef4444] border border-black/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] border border-black/50" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#10b981] border border-black/50" />
            <span className="ml-2 font-bold text-gray-300 text-xs tracking-wider">
              pravin@portfolio: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase hidden sm:inline">
              ESC to exit
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 bg-white hover:bg-black hover:text-white text-black border border-black rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-[#121318] border-b border-gray-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none text-[11px]">
          <span className="text-gray-500 text-[10px] uppercase font-bold flex-shrink-0">
            CHIPS:
          </span>
          {['help', 'projects', 'skills', 'about', 'download', 'contact', 'clear'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => executeCommand(chip)}
              className="px-2.5 py-1 bg-gray-800 hover:bg-brand-yellow hover:text-black text-gray-200 border border-gray-700 rounded transition-all whitespace-nowrap font-bold"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Terminal Screen Stream */}
        <div className="p-4 sm:p-5 h-80 sm:h-96 overflow-y-auto space-y-2 text-gray-200 selection:bg-brand-yellow selection:text-black">
          {history.map((h, i) => (
            <div key={i} className="leading-relaxed">
              {h.type === 'system' && (
                <div className="text-gray-500 font-semibold">{h.text}</div>
              )}
              {h.type === 'user' && (
                <div className="flex items-center gap-2 text-brand-yellow font-bold">
                  <span className="text-emerald-400">pravin@portfolio:~$</span>
                  <span>{h.text}</span>
                </div>
              )}
              {h.type === 'output' && (
                <pre className="text-gray-300 font-mono whitespace-pre-wrap pl-2 border-l border-gray-700 my-1">
                  {h.text}
                </pre>
              )}
              {h.type === 'success' && (
                <div className="text-emerald-400 font-semibold pl-2">
                  ✓ {h.text}
                </div>
              )}
              {h.type === 'error' && (
                <div className="text-rose-400 font-semibold pl-2">
                  ✗ {h.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-[#121318] border-t-2 border-black flex items-center gap-2">
          <span className="text-emerald-400 font-bold select-none">
            pravin@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command... (e.g. projects, skills, resume)"
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none caret-brand-yellow"
          />
          <button
            type="button"
            onClick={() => executeCommand(inputVal)}
            className="p-1.5 bg-brand-yellow hover:bg-[#ffde59] text-black rounded border border-black shadow-sm font-bold"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
