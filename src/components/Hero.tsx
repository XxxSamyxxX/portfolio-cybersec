import React, { useState, useEffect } from 'react';
import { getOptimizedUrl } from '../lib/imageUtils';
import {
  Terminal,
  BookOpen,
  Shield,
  ArrowRight,
  Database,
  Server,
  Activity,
  Code2,
  TerminalSquare,
  Container
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SecurityWatch } from './SecurityWatch';

interface HeroProps {
  isLoaded: boolean;
  setShowProfile: (show: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded, setShowProfile }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Samy DJEDJIG';

  useEffect(() => {
    if (!isLoaded) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [isLoaded]);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex flex-col justify-center bg-gradient-to-b from-night-900 via-black to-surface-900">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={getOptimizedUrl("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", 1920)}
          alt="Cyberpunk Background"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-5 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-900 via-black/90 to-surface-900" />
        <div className="absolute inset-0 bg-grid-cyber bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan-500/10 border border-cyber-cyan-500/30 text-cyber-cyan-300 text-sm font-medium mb-6 animate-fade-in-up hover:bg-cyber-cyan-500/20 transition-colors cursor-default shadow-lg shadow-cyber-cyan-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green-500"></span>
              </span>
              Alternant IT Administrator chez SLB
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative">
              <span className="bg-gradient-to-r from-cyber-cyan-400 via-cyber-green-300 to-cyber-cyan-500 bg-clip-text text-transparent relative inline-block">
                {displayedText}
                <span className="animate-pulse text-cyber-cyan-400">_</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              IT Administrator le jour, <span className="text-cyber-cyan-400 font-semibold">Passionné Cybersécurité</span> la nuit.
              <br />
              Bienvenue sur ma <span className="text-white border-b border-cyber-green-500/50">Knowledge Base</span> personnelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            <Link to="/writeups" className="group bg-surface-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyber-cyan-500/20 hover:border-cyber-cyan-500/60 hover:bg-surface-900 transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:shadow-cyber-cyan-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal className="w-24 h-24 text-cyber-cyan-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-cyber-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyber-cyan-500/20">
                  <Terminal className="w-6 h-6 text-cyber-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  CTF Write-ups
                  <ArrowRight className="w-4 h-4 text-cyber-cyan-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Documentation de mes challenges sur HackTheBox & TryHackMe. Focus sur l'Active Directory, le pivot et l'escalade de privilèges.
                </p>
              </div>
            </Link>

            <Link to="/projects" className="group bg-surface-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyber-green-500/20 hover:border-cyber-green-500/60 hover:bg-surface-900 transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:shadow-cyber-green-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Server className="w-24 h-24 text-cyber-green-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-cyber-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyber-green-500/20">
                  <Database className="w-6 h-6 text-cyber-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  Lab & Projets
                  <ArrowRight className="w-4 h-4 text-cyber-green-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mes déploiements d'infrastructure : Lab AD, Scripts d'automatisation, configurations Exegol et Cloud Azure.
                </p>
              </div>
            </Link>

            <Link to="/certifications" className="group bg-surface-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyber-orange-500/20 hover:border-cyber-orange-500/60 hover:bg-surface-900 transition-all duration-300 relative overflow-hidden hover:shadow-xl hover:shadow-cyber-orange-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield className="w-24 h-24 text-cyber-orange-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-cyber-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyber-orange-500/20">
                  <BookOpen className="w-6 h-6 text-cyber-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  Certifications
                  <ArrowRight className="w-4 h-4 text-cyber-orange-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mes certifications TryHackMe : Cyber Security 101, Pre-Security, Jr Penetration Tester et Web Pentesting.
                </p>
              </div>
            </Link>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-900/50 p-6 rounded-2xl border border-cyber-cyan-500/20 backdrop-blur-md">

            <button
              onClick={() => setShowProfile(true)}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 hover:from-cyber-cyan-500 hover:to-cyber-green-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyber-cyan-500/20 hover:shadow-cyber-cyan-500/40 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Découvrir mon profil</span>
              <Activity className="w-4 h-4 group-hover:animate-pulse" />
            </button>

            <div className="flex items-center gap-6 text-gray-500 overflow-x-auto max-w-full pb-2 md:pb-0 hide-scrollbar w-full md:w-auto md:justify-end">
                <span className="text-sm font-medium uppercase tracking-wider text-gray-600 whitespace-nowrap hidden lg:inline">Stack :</span>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2 text-gray-300 hover:text-cyber-cyan-400 transition-colors cursor-default group" title="Exegol">
                        <span className="font-bold text-[10px] border-2 border-current px-1 rounded group-hover:border-cyber-cyan-400">EX</span>
                        <span className="hidden sm:inline text-xs font-medium">Exegol</span>
                    </div>
                    <div className="w-px h-4 bg-gray-800"></div>
                    <TechItem icon={<Terminal size={18} />} label="Bash/Zsh" />
                    <TechItem icon={<TerminalSquare size={18} />} label="PowerShell" />
                    <TechItem icon={<Code2 size={18} />} label="Python" />
                    <TechItem icon={<Container size={18} />} label="Docker" />
                </div>
            </div>
          </div>

          {/* === NOUVEAU : INTEGRATION DE LA VEILLE === */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SecurityWatch />
          </div>

          <div className="flex justify-center w-full mt-8">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-gray-600 font-mono bg-black/50 px-4 py-2 rounded-full border border-cyber-cyan-500/20 hover:border-cyber-cyan-500/40 transition-colors cursor-help group">
                <span className="w-1.5 h-1.5 bg-cyber-green-500 rounded-full animate-pulse"></span>
                System Ready.
                <span className="hidden md:inline text-gray-500 group-hover:text-gray-300 transition-colors">
                  Press <span className="text-cyber-cyan-400 font-bold border border-cyber-cyan-500/30 px-1.5 rounded mx-1 bg-cyber-cyan-500/10">²</span>
                  or <span className="text-cyber-cyan-400 font-bold border border-cyber-cyan-500/30 px-1.5 rounded mx-1 bg-cyber-cyan-500/10">CTRL+K</span>
                  to initialize shell
                </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Composant Helper pour les icônes de la stack
const TechItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-default group" title={label}>
        <div className="group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="hidden sm:inline text-xs font-medium">{label}</span>
    </div>
);