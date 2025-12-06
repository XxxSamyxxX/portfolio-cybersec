import { useState, useEffect } from 'react';
import {
  Terminal,
  ArrowRight,
  Database,
  Activity,
  Code2,
  TerminalSquare,
  Container,
  Sparkles,
  Award,
  Github
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SecurityWatch } from './SecurityWatch';
import { motion } from 'framer-motion';

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

  const mainCards = [
    {
      title: 'CTF Write-ups',
      description: 'Documentation de mes challenges HackTheBox & TryHackMe',
      icon: Terminal,
      to: '/writeups',
      gradient: 'from-cyber-cyan-600 to-cyber-cyan-800',
      borderColor: 'border-cyber-cyan-500/30',
      glowColor: 'shadow-cyan-500/20',
      iconColor: 'text-cyber-cyan-400'
    },
    {
      title: 'Lab & Projets',
      description: 'Infrastructures, scripts et configurations techniques',
      icon: Database,
      to: '/projects',
      gradient: 'from-cyber-green-600 to-cyber-green-800',
      borderColor: 'border-cyber-green-500/30',
      glowColor: 'shadow-green-500/20',
      iconColor: 'text-cyber-green-400'
    },
    {
      title: 'Certifications',
      description: 'Parcours TryHackMe et objectifs 2025',
      icon: Award,
      to: '/certifications',
      gradient: 'from-cyber-orange-600 to-cyber-orange-800',
      borderColor: 'border-cyber-orange-500/30',
      glowColor: 'shadow-orange-500/20',
      iconColor: 'text-cyber-orange-400'
    }
  ];

  const techStack = [
    { icon: Terminal, label: 'Bash/Zsh', color: 'cyan' },
    { icon: TerminalSquare, label: 'PowerShell', color: 'cyan' },
    { icon: Code2, label: 'Python', color: 'green' },
    { icon: Container, label: 'Docker', color: 'orange' }
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-b from-black via-dark-900 to-dark-950 overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:4rem_4rem] opacity-[0.03]" />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyber-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <motion.div
          className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan-500/10 border border-cyber-cyan-500/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-sm font-medium text-gray-300">
                  Alternant chez SLB · <span className="text-amber-400">En recherche active d'un CDI en Cybersécurité</span>
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-white via-cyber-cyan-200 to-cyber-green-200 bg-clip-text text-transparent relative inline-block">
                    {displayedText}
                    <motion.span
                      className="text-cyber-cyan-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
                  IT Administrator le jour,{' '}
                  <span className="text-cyber-cyan-400 font-semibold">Passionné Cybersécurité</span>{' '}
                  la nuit.
                  <br />
                  <span className="text-gray-500 text-lg mt-2 block">
                    Bienvenue sur ma{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-white font-medium">Knowledge Base</span>
                      <span className="absolute bottom-0 left-0 right-0 h-2 bg-cyber-green-500/30 -z-10"></span>
                    </span>
                    {' '}personnelle
                  </span>
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <motion.button
                    onClick={() => setShowProfile(true)}
                    className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 rounded-xl font-semibold text-white flex items-center gap-3 hover:shadow-lg hover:shadow-cyber-cyan-500/50 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan-500 to-cyber-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10">Découvrir mon profil</span>
                    <Activity className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                  </motion.button>

                  <motion.a
                    href="https://github.com/XxxSamyxxX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-dark-800/50 border border-white/10 hover:border-cyber-cyan-500/50 rounded-xl font-semibold text-gray-300 hover:text-white flex items-center gap-3 backdrop-blur-sm transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </motion.a>
                </div>

                <div className="flex items-center flex-wrap gap-4 p-4 bg-dark-800/30 border border-white/5 rounded-xl backdrop-blur-sm">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Stack :
                  </span>
                  <div className="flex items-center gap-4 flex-wrap">
                    <motion.div
                      className="flex items-center gap-2 text-gray-300 hover:text-cyber-cyan-400 transition-colors cursor-default group"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="font-bold text-xs border-2 border-current px-1.5 py-0.5 rounded group-hover:border-cyber-cyan-400">
                        EX
                      </span>
                      <span className="text-sm font-medium">Exegol</span>
                    </motion.div>
                    {techStack.map((tech, index) => {
                      const Icon = tech.icon;
                      return (
                        <motion.div
                          key={index}
                          className={`flex items-center gap-2 text-gray-400 hover:text-cyber-${tech.color}-400 transition-colors cursor-default group`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{tech.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex-1"
              >
                <Link
                  to={mainCards[0].to}
                  className={`group relative bg-dark-800/50 backdrop-blur-sm p-8 rounded-3xl border ${mainCards[0].borderColor} hover:border-opacity-60 transition-all duration-300 overflow-hidden hover:shadow-xl ${mainCards[0].glowColor} block h-full flex flex-col justify-between min-h-[280px]`}
                >
                  <motion.div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${mainCards[0].gradient} opacity-5 blur-3xl transition-opacity`}
                    whileHover={{ opacity: 0.15 }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className={`inline-flex p-4 bg-gradient-to-br ${mainCards[0].gradient} rounded-2xl opacity-80 mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Terminal className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-cyan-400 transition-colors">
                      {mainCards[0].title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
                      {mainCards[0].description}
                    </p>
                  </div>
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-cyber-cyan-400 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <span>Explorer</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 gap-4"
              >
                {mainCards.slice(1).map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={index}
                      to={card.to}
                      className={`group relative bg-dark-800/50 backdrop-blur-sm p-6 rounded-2xl border ${card.borderColor} hover:border-opacity-60 transition-all duration-300 overflow-hidden hover:shadow-xl ${card.glowColor} block`}
                    >
                      <motion.div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-5 blur-2xl transition-opacity`}
                        whileHover={{ opacity: 0.1 }}
                      />
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className={`p-3 bg-gradient-to-br ${card.gradient} rounded-xl opacity-80`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </motion.div>
                          <div>
                            <h3 className={`text-base font-bold text-white group-hover:${card.iconColor} transition-colors`}>
                              {card.title}
                            </h3>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ x: 3 }}
                        >
                          <ArrowRight className={`w-5 h-5 ${card.iconColor}`} />
                        </motion.div>
                      </div>
                    </Link>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-16 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <SecurityWatch />
          </motion.div>

          <motion.div
            className="flex justify-center w-full mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="flex items-center gap-3 text-xs uppercase tracking-wider text-gray-600 font-mono bg-black/30 px-6 py-3 rounded-full border border-cyber-cyan-500/20 hover:border-cyber-cyan-500/40 transition-all cursor-help group backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 bg-cyber-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
                System Ready. Press{' '}
                <kbd className="text-cyber-cyan-400 font-bold border border-cyber-cyan-500/30 px-2 py-0.5 rounded mx-1 bg-cyber-cyan-500/10">
                  ²
                </kbd>
                {' '}or{' '}
                <kbd className="text-cyber-cyan-400 font-bold border border-cyber-cyan-500/30 px-2 py-0.5 rounded mx-1 bg-cyber-cyan-500/10">
                  CTRL+K
                </kbd>
                {' '}to initialize shell
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
    </section>
  );
};
