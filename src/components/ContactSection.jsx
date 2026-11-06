import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
import ThreeDTilt from './ThreeDTilt';
import { Sparkles, Mail, Copy, Check, ExternalLink, Send, ArrowUp, MapPin, Briefcase } from 'lucide-react';

export default function ContactSection() {
  const { contact, personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formData.name || 'Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, '_blank');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section id="contact" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20">
      
      {/* Plaque Container with 3D Tilt */}
      <ThreeDTilt maxTilt={4} scale={1.005} glare={true} className="rounded-2xl">
        <div className="relative bg-[#fcfcfc] dark:bg-[#12141c] border-[3px] border-black rounded-2xl p-6 sm:p-10 shadow-[10px_10px_0px_#000000] select-none">
          
          {/* Screws */}
          <div className="absolute top-3.5 left-3.5 plaque-screw" />
          <div className="absolute top-3.5 right-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
          <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Contact Info & Action Buttons */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffd31e] border-2 border-black rounded-full text-xs font-mono font-black mb-3 shadow-[2px_2px_0px_#000]">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>// 04. GET IN TOUCH</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white tracking-tight uppercase leading-none">
                  Let's Build <span className="text-brand-orange">Something</span> Meaningful
                </h2>
                <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                  {contact.subtitle}
                </p>
              </div>

              {/* Availability Badges */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-black/40 dark:to-black/20 border-2 border-black rounded-xl space-y-2 shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-gray-800 dark:text-gray-200">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span>Status:</span>
                  <span className="text-emerald-900 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-400">
                    {contact.availability}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-black text-gray-800 dark:text-gray-200">
                  <MapPin className="w-4 h-4 text-[#00f0ff]" />
                  <span>Location:</span>
                  <span>{contact.location}</span>
                </div>
              </div>

              {/* Email Copy Card */}
              <div className="p-5 bg-white dark:bg-black/40 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] space-y-3">
                <div className="text-xs font-mono font-black uppercase text-gray-600 dark:text-gray-400">
                  Direct Email Dispatch
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2.5 bg-gray-100 dark:bg-gray-800 border-2 border-black rounded-lg font-mono text-xs sm:text-sm font-black text-gray-900 dark:text-gray-100 truncate shadow-inner">
                    {contact.email}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#ffd31e] to-[#fbbf24] hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs font-mono rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 btn-tactile-3d transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIED!' : 'COPY'}</span>
                  </button>
                </div>

                {/* Direct Mailto */}
                <a
                  href={`mailto:${contact.email}`}
                  onClick={() => sound.playClick()}
                  className="inline-flex items-center gap-2 text-xs font-mono font-black text-black dark:text-white hover:text-brand-orange underline underline-offset-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in default email client</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2.5 bg-black hover:bg-gray-800 text-white font-black text-xs font-mono rounded-xl border-2 border-black shadow-[3px_3px_0px_#ffd31e] flex items-center gap-2 btn-tactile-3d transition-all"
                >
                  <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                  <span>GitHub: Pravin98651</span>
                </a>

                {personal.socials.slice(1).map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-4 py-2.5 bg-white hover:bg-gray-100 text-black font-black text-xs font-mono rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-2 btn-tactile-3d transition-all"
                  >
                    <img src={s.icon} alt={s.label} className="w-4 h-4" />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Message Dispatch Form */}
            <div className="lg:col-span-6 bg-white dark:bg-black/30 border-2 border-black rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-black uppercase text-black dark:text-white">
                    Direct Inquiry Form
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-gray-500">
                  RESPONSE TIME &lt;24H
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 border-2 border-black rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd31e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@example.com"
                    className="w-full px-3.5 py-2.5 border-2 border-black rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd31e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-black text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Message / Project Scope
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your open role, software challenge, or project timeline..."
                    className="w-full px-3.5 py-2.5 border-2 border-black rounded-lg text-sm font-medium bg-gray-50 dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffd31e] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#ffd31e] via-[#fbbf24] to-[#f59e0b] hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2 btn-tactile-3d transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH MESSAGE VIA MAIL</span>
                </button>

                {sentSuccess && (
                  <div className="p-3 bg-emerald-100 border-2 border-emerald-500 rounded-lg text-emerald-900 text-xs font-mono font-black text-center animate-in fade-in">
                    ✓ Your default mail client has opened with this note pre-filled!
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>
      </ThreeDTilt>

    </section>
  );
}
