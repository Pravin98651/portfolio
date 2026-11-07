import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import { sound } from '../utils/soundEffects';
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
    <section id="contact" className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 z-20 scroll-mt-20 sm:scroll-mt-24">
      
      {/* Plaque Container (Retro Dispatch Envelope) */}
      <div className="relative manila-card border-[3.5px] border-black rounded-3xl p-6 sm:p-10 shadow-[12px_12px_0px_#000000] select-none scroll-reveal">
        
        {/* Screws */}
        <div className="absolute top-3.5 left-3.5 plaque-screw" />
        <div className="absolute top-3.5 right-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 left-3.5 plaque-screw" />
        <div className="absolute bottom-3.5 right-3.5 plaque-screw" />

        {/* Top Caution Striping Trim */}
        <div className="w-full h-3 bg-caution-stripes-sm rounded-full border border-black mb-5 shadow-xs" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Action Buttons */}
          <div className="lg:col-span-6 space-y-5 scroll-reveal-left delay-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow border-2 border-black rounded-full text-xs font-mono font-black mb-3 shadow-[2px_2px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>// 04. GET IN TOUCH & COLLABORATE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight uppercase leading-none">
                LET'S BUILD <span className="text-brand-orange wavy-accent">SOMETHING</span> EXTRAORDINARY
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-900 font-medium leading-relaxed">
                {contact.subtitle}
              </p>
            </div>

            {/* Availability Badges */}
            <div className="p-4 bg-gray-50 border-2 border-black rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-800">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Status:</span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  {contact.availability}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-800">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Location:</span>
                <span>{contact.location}</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_#000000] space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-gray-500">
                Direct Email Dispatch
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-gray-100 border border-black rounded-lg font-mono text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {contact.email}
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-2 bg-brand-yellow hover:bg-[#ffde59] text-black font-extrabold text-xs font-mono rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'COPIED!' : 'COPY'}</span>
                </button>
              </div>

              {/* Direct Mailto */}
              <a
                href={`mailto:${contact.email}`}
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-black hover:text-brand-orange underline underline-offset-2"
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
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold text-xs font-mono rounded-lg border-2 border-black shadow-[2px_2px_0px_#ffd31e] flex items-center gap-2 transition-all"
              >
                <img src="/assets/icon-github.svg" alt="GitHub" className="w-4 h-4 invert" />
                <span>GitHub: Pravin98651</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-2 bg-[#0077b5] hover:bg-[#005f93] text-white font-bold text-xs font-mono rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-2 transition-all"
              >
                <img src="/assets/icon-linkedin.svg" alt="LinkedIn" className="w-4 h-4 invert" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right: Quick Message Dispatch Box */}
          <div className="lg:col-span-6 bg-[#fffdf0] border-2 border-black rounded-xl p-5 sm:p-7 shadow-[6px_6px_0px_#000000] scroll-reveal-right delay-200">
            <h3 className="font-black text-xl text-black uppercase tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-orange" />
              <span>Send a Quick Dispatch</span>
            </h3>
            <p className="text-xs text-gray-600 font-medium mt-1 mb-4">
              Send a note regarding software roles, contract collaborations, or technical architecture inquiries.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about the problem, project scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH MESSAGE</span>
              </button>

              {sentSuccess && (
                <div className="p-2.5 bg-emerald-100 border border-emerald-400 rounded-lg text-emerald-800 text-xs font-mono font-bold text-center animate-in fade-in">
                  ✓ Dispatch prepared! Mail client triggered with your note.
                </div>
              )}
            </form>
          </div>

        </div>

      </div>

    </section>
  );
}
