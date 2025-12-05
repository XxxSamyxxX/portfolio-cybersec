import React, { useEffect, useState, useCallback } from 'react';
import {
  Briefcase,
  Target,
  Lightbulb,
  Server,
  Cpu,
  Network,
  Terminal,
  Award,
  CheckCircle2,
  ArrowUpRight,
  X,
  Home,
  BookOpen,
  Shield,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [handleClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-dark-900/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-cyber-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.2)] p-8 custom-scrollbar relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-dark-800/80 p-2.5 rounded-xl hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 z-20 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10 relative">
              <motion.div
                className="absolute -top-6 -left-6 w-24 h-24 bg-cyber-cyan-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div>
                <h2 className="text-5xl font-extrabold bg-gradient-to-r from-white via-cyber-cyan-200 to-cyber-green-200 bg-clip-text text-transparent tracking-tight mb-3">
                  Samy DJEDJIG
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 bg-cyber-cyan-500/10 text-cyber-cyan-300 px-4 py-2 rounded-xl text-sm font-medium border border-cyber-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <Briefcase className="w-4 h-4" />
                    IT Administrator
                  </span>
                  <span className="flex items-center gap-2 bg-cyber-green-500/10 text-cyber-green-300 px-4 py-2 rounded-xl text-sm font-medium border border-cyber-green-500/30">
                    <Shield className="w-4 h-4" />
                    Passionné Cybersécurité
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-dark-800/80 to-dark-900/80 border border-cyber-cyan-500/30 rounded-2xl p-8 mb-8 overflow-hidden transition-all duration-300 hover:border-cyber-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-cyber-cyan-500/5 rounded-full blur-3xl"
                animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyber-cyan-600 to-cyber-cyan-800 rounded-2xl p-2 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.3)] border-2 border-cyber-cyan-500/30">
                      <span className="text-white font-bold text-2xl">SLB</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                        Alternance chez SLB
                        <ArrowUpRight className="w-5 h-5 text-cyber-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-gray-400 text-sm font-medium mt-1">2023 — 2026 • Administrateur Système Réseau</p>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 text-emerald-300 px-4 py-2.5 rounded-xl text-sm font-bold border border-emerald-500/30 flex items-center gap-3 shadow-[0_0_15px_rgba(16,185,129,0.15)] self-start md:self-center">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Poste Actuel
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-cyber-cyan-300 font-semibold flex items-center gap-2 uppercase text-sm tracking-wider">
                      <Server className="w-4 h-4" />
                      Missions & Environnement
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      J'évolue dans un environnement technique <strong className="text-cyber-cyan-200">riche et exigeant</strong>. Administration des serveurs Windows Hyper-V, supervision avec Splunk, gestion des vulnérabilités avec Qualys et pilotage de la sécurité multi-sites.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {[
                        { icon: Network, text: "Hyper-V & Azure Cloud" },
                        { icon: Server, text: "Supervision Splunk" },
                        { icon: Target, text: "Vulnérabilités Qualys" },
                        { icon: Cpu, text: "ITSM ServiceNow" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-dark-800/80 p-3 rounded-xl border border-white/5 hover:border-cyber-cyan-500/30 transition-colors">
                          <item.icon className="w-4 h-4 text-cyber-cyan-400" />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-dark-800/80 rounded-2xl p-6 border border-white/10 flex flex-col justify-center hover:border-cyber-cyan-500/30 transition-all relative overflow-hidden group/stack">
                    <motion.div
                      className="absolute inset-0 bg-cyber-cyan-500/5 opacity-0 group-hover/stack:opacity-100 transition-opacity"
                      initial={false}
                    />
                    <h4 className="text-cyber-cyan-300 font-semibold mb-4 flex items-center gap-2 uppercase text-sm tracking-wider relative z-10">
                      <Cpu className="w-4 h-4" />
                      Stack Technique
                    </h4>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {['Hyper-V', 'Azure', 'Splunk', 'Qualys', 'ServiceNow', 'Windows Server', 'FortiGate', 'PowerShell'].map((tech) => (
                        <span key={tech} className="px-3 py-1.5 bg-dark-900/80 hover:bg-cyber-cyan-500/20 text-gray-300 hover:text-cyber-cyan-100 text-xs font-medium rounded-lg border border-white/10 hover:border-cyber-cyan-500/30 transition-all duration-200 cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-dark-800/80 p-8 rounded-2xl border border-cyber-green-500/20 hover:border-cyber-green-500/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-cyber-green-500/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-cyber-green-400" />
                  </div>
                  Proactivité & Auto-formation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                  En parallèle de mon alternance, je consacre mes soirées à forger mon profil d'expert. Je ne me contente pas de la théorie : <strong className="text-cyber-green-300">je pratique dans mon Home Lab et je prépare les certifs de haut niveau.</strong>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-dark-900/80 p-5 rounded-xl border border-white/5 hover:border-cyber-green-500/30 hover:bg-cyber-green-500/5 transition-all">
                    <span className="text-xs text-cyber-green-400 uppercase font-extrabold tracking-wider flex items-center gap-2">
                      <Home className="w-3.5 h-3.5" />
                      Laboratoire
                    </span>
                    <p className="text-white font-semibold mt-2 text-sm">Home Lab AD & Pentest</p>
                    <p className="text-gray-500 text-xs mt-1">Simulations d'attaques & Défense</p>
                  </div>

                  <div className="bg-dark-900/80 p-5 rounded-xl border border-white/5 hover:border-cyber-cyan-500/30 hover:bg-cyber-cyan-500/5 transition-all">
                    <span className="text-xs text-cyber-cyan-400 uppercase font-extrabold tracking-wider flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      En préparation
                    </span>
                    <div className="mt-2 flex flex-col gap-1">
                      <span className="text-white font-semibold text-xs">• Microsoft Cloud</span>
                      <span className="text-white font-semibold text-xs">• CCNA (Réseau)</span>
                      <span className="text-white font-semibold text-xs">• OSCP (Offensive)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/80 p-8 rounded-2xl border border-cyber-orange-500/20 hover:border-cyber-orange-500/40 transition-all duration-300 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-gray-200 uppercase mb-6 flex items-center gap-3 tracking-wider">
                  <Award className="w-5 h-5 text-amber-400" />
                  Certifications Validées
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between p-3 bg-dark-900/80 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all group/item">
                    <span className="text-gray-100 font-medium text-sm">HTB CPTS</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 opacity-0 group-hover/item:opacity-100 transition-opacity">Expert</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  </li>
                  <li className="flex items-center justify-between p-3 bg-dark-900/80 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all">
                    <span className="text-gray-100 font-medium text-sm">THM Cyber Security 101</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </li>
                  <li className="flex items-center justify-between p-3 bg-dark-900/80 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all">
                    <span className="text-gray-100 font-medium text-sm">THM Pre-Security</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                <div className="p-2 bg-cyber-cyan-500/10 rounded-xl">
                  <Network className="w-6 h-6 text-cyber-cyan-400" />
                </div>
                Mon Background : De la Fibre à l'IT
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    Avant de basculer dans le monde du système et de la cyber, j'ai été technicien fibre optique terrain. Cette expérience a façonné ma méthodologie : <strong className="text-cyber-cyan-200">il n'y a pas de place pour l'approximation</strong> quand on touche à l'infrastructure physique critique.
                  </p>
                  <div className="bg-dark-800/80 p-6 rounded-2xl border border-white/10 hover:border-cyber-cyan-500/20 transition-all">
                    <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Acquis de terrain :</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Gestion du stress', 'Travail d\'équipe', 'Rigueur & Précision', 'Autonomie'].map((skill) => (
                        <div key={skill} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                          <div className="w-2 h-2 rounded-sm bg-cyber-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-dark-800/80 p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-xl">
                        <Lightbulb className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Philosophie</h4>
                        <p className="text-amber-200/80 italic mt-2 text-base font-medium">
                          "Une journée sans apprendre est une journée perdue."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-800/80 p-6 rounded-2xl border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl">
                        <Target className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Objectif Long Terme</h4>
                        <p className="text-gray-300 mt-2 leading-relaxed text-sm">
                          Devenir <strong className="text-red-300">Expert Cybersécurité / Pentester</strong> en capitalisant sur la double compétence : Infra Réelle + Expertise Offensive.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
