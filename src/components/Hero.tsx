import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Container,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SecurityWatch } from './SecurityWatch';

interface HeroProps {
  isLoaded: boolean;
  setShowProfile: (show: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded, setShowProfile }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'SAMY DJEDJIG';

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
    }, 80);

    return () => clearInterval(typingInterval);
  }, [isLoaded]);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-pure-black border-4 border-electric-blue shadow-brutal-electric">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-acid-lime"></span>
              </span>
              <span className="text-pure-white font-bold text-sm uppercase tracking-wider">
                IT Administrator @ SLB
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-none">
              <span className="text-pure-white block">
                {displayedText}
              </span>
              <span className="text-electric-blue flex items-center gap-4 mt-2">
                <span>_PORTFOLIO</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-12 h-12 fill-current" />
                </motion.div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
              <span className="text-pure-white font-bold">IT Admin</span> le jour,{' '}
              <span className="text-neon-pink font-bold">Pentester</span> la nuit.
              <br />
              Bienvenue sur ma base de connaissances.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowProfile(true)}
                className="group relative px-8 py-4 bg-electric-blue text-pure-black font-black text-lg uppercase tracking-wider border-4 border-pure-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
              >
                Voir le profil
                <Activity className="inline-block ml-2 w-5 h-5 group-hover:animate-pulse" />
              </button>

              <Link
                to="/projects"
                className="group relative px-8 py-4 bg-pure-black text-pure-white font-black text-lg uppercase tracking-wider border-4 border-electric-blue shadow-brutal-electric hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
              >
                Mes projets
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Stack :</span>
              <TechBadge label="Exegol" color="electric-blue" />
              <TechBadge label="Bash" color="acid-lime" />
              <TechBadge label="Python" color="neon-pink" />
              <TechBadge label="Docker" color="electric-blue" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <HeroCard
              title="WRITEUPS"
              description="Documentation CTF : HackTheBox & TryHackMe"
              icon={<Terminal className="w-8 h-8" />}
              link="/writeups"
              color="electric-blue"
            />

            <HeroCard
              title="PROJETS"
              description="Labs, Scripts & Infrastructure"
              icon={<Database className="w-8 h-8" />}
              link="/projects"
              color="neon-pink"
            />

            <HeroCard
              title="CERTIF"
              description="TryHackMe & HTB Academy"
              icon={<Shield className="w-8 h-8" />}
              link="/certifications"
              color="acid-lime"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <SecurityWatch />
        </motion.div>
      </div>
    </section>
  );
};

const TechBadge = ({ label, color }: { label: string; color: string }) => (
  <span className={`px-3 py-1 bg-pure-black text-${color} border-2 border-${color} text-xs font-bold uppercase tracking-wider hover:bg-${color} hover:text-pure-black transition-all duration-200 cursor-default`}>
    {label}
  </span>
);

const HeroCard = ({ title, description, icon, link, color }: { title: string; description: string; icon: React.ReactNode; link: string; color: string }) => (
  <Link
    to={link}
    className={`group relative bg-pure-black border-4 border-${color} p-6 hover:translate-x-2 hover:translate-y-2 hover:shadow-none shadow-brutal-${color === 'electric-blue' ? 'electric' : color === 'neon-pink' ? 'neon' : 'lime'} transition-all duration-200`}
  >
    <div className={`text-${color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-pure-white mb-2 uppercase tracking-wider">
      {title}
    </h3>
    <p className="text-gray-400 text-sm font-medium">
      {description}
    </p>
    <div className={`absolute bottom-4 right-4 text-${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
      <ArrowRight className="w-6 h-6" />
    </div>
  </Link>
);