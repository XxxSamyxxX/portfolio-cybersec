import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Terminal, Cpu, Shield, BookOpen, CheckCircle2, Clock, Target, TrendingUp, Calendar, ExternalLink, ChevronRight, Star } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { THMCyberSecurity101Certification } from '../components/certifications/THMCyberSecurity101Certification';
import { THMPreSecurityCertification } from '../components/certifications/THMPreSecurityCertification';

export const CertificationsList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'completed' | 'in-progress'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Données des certifications
  const certifications = [
    {
      id: 1,
      title: 'TryHackMe Cyber Security 101',
      provider: 'TryHackMe',
      date: 'Décembre 2024',
      status: 'completed' as const,
      description: 'Fondamentaux de la cybersécurité offensive',
      skills: ['Reconnaissance', 'Exploitation', 'Post-Exploitation', 'Reporting'],
      color: 'emerald',
      icon: Shield,
      link: '/certifications/tryhackme-cybersecurity101'
    },
    {
      id: 2,
      title: 'TryHackMe Pre Security',
      provider: 'TryHackMe',
      date: 'Novembre 2024',
      status: 'completed' as const,
      description: 'Bases de la sécurité informatique et réseaux',
      skills: ['Réseaux', 'Linux', 'Windows', 'Cybersécurité'],
      color: 'cyan',
      icon: BookOpen,
      link: '/certifications/tryhackme-presecurity'
    },
    {
      id: 3,
      title: 'SOC Level 1',
      provider: 'TryHackMe',
      date: 'En cours',
      status: 'in-progress' as const,
      description: 'Parcours analyste SOC - Défense et détection',
      skills: ['SIEM', 'Threat Hunting', 'Incident Response', 'Log Analysis'],
      color: 'amber',
      icon: Terminal,
      progress: 65
    },
    {
      id: 4,
      title: 'CompTIA Security+',
      provider: 'CompTIA',
      date: 'Prévu 2025',
      status: 'in-progress' as const,
      description: 'Certification fondamentale en cybersécurité',
      skills: ['Security Concepts', 'Risk Management', 'Cryptography', 'Network Security'],
      color: 'blue',
      icon: Shield,
      progress: 30
    },
    {
      id: 5,
      title: 'eJPT / CPTS',
      provider: 'eLearnSecurity / HTB',
      date: 'Objectif 2026',
      status: 'in-progress' as const,
      description: 'Certifications pratiques en pentesting',
      skills: ['Penetration Testing', 'Web Exploitation', 'Network Attacks', 'Privilege Escalation'],
      color: 'rose',
      icon: Target,
      progress: 10
    }
  ];

  const filteredCertifications = certifications.filter(cert => {
    if (selectedCategory === 'all') return true;
    return cert.status === selectedCategory;
  });

  const completedCount = certifications.filter(c => c.status === 'completed').length;
  const inProgressCount = certifications.filter(c => c.status === 'in-progress').length;

  return (
    <>
      <SEOHead
        title="Certifications & Diplômes | Samy DJEDJIG"
        description="Parcours de certification : TryHackMe Cyber Security 101, Pre Security. Master Cybersécurité EPSI."
        keywords="TryHackMe, Cybersécurité, Certification, EPSI, Master, Pre Security"
        url="https://samydjedjig.com/certifications"
      />

      <div className="min-h-screen pt-32 pb-24 bg-black text-gray-100">
        <div className="container mx-auto px-6">

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="relative p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              <Award className="w-12 h-12 text-amber-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Certifications
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Parcours de formation continue et validation des compétences techniques. <br />
              <span className="text-sm text-gray-500 font-mono mt-2 inline-block">
                <span className="text-amber-400">Top 5%</span> <span className="text-orange-400">TryHackMe</span>
              </span>
            </p>
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-400"><span className="text-white font-bold">{completedCount}</span> Obtenues</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-gray-400"><span className="text-white font-bold">{inProgressCount}</span> En cours</span>
              </div>
            </div>
          </motion.div>

          {/* Filtres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="flex justify-center gap-3">
              {[
                { id: 'all' as const, label: 'Toutes', count: certifications.length },
                { id: 'completed' as const, label: 'Obtenues', count: completedCount },
                { id: 'in-progress' as const, label: 'En cours', count: inProgressCount }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all border
                    ${selectedCategory === category.id
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-white/10'}`}
                >
                  {category.label} <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Timeline verticale */}
          <div className="max-w-4xl mx-auto relative">
            {/* Ligne verticale */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/50 via-orange-500/50 to-transparent"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {filteredCertifications.map((cert, index) => {
                  const Icon = cert.icon;
                  const isRight = index % 2 === 1;

                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}
                    >
                      {/* Point sur la timeline */}
                      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${cert.color}-500/20 to-${cert.color}-500/5 border-2 border-${cert.color}-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]`}>
                          <Icon className={`w-6 h-6 text-${cert.color}-400`} />
                        </div>
                      </div>

                      {/* Carte de certification */}
                      <div className={`w-full md:w-[calc(50%-3rem)] ${isRight ? 'md:pl-8' : 'md:pr-8'} pl-16 md:pl-0`}>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="group bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 cursor-pointer hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-300"
                          onClick={() => {
                            if (cert.link) {
                              window.location.href = cert.link;
                            }
                          }}
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold mb-3 ${cert.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                                {cert.status === 'completed' ? (
                                  <><CheckCircle2 className="w-3.5 h-3.5" /> Obtenue</>
                                ) : (
                                  <><Clock className="w-3.5 h-3.5" /> En cours</>
                                )}
                              </span>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                                {cert.title}
                              </h3>
                              <p className="text-sm text-gray-500 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {cert.date} • {cert.provider}
                              </p>
                            </div>
                            {cert.link && (
                              <ChevronRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>

                          <p className="text-gray-400 text-sm mb-4">{cert.description}</p>

                          {/* Progress bar (si en cours) */}
                          {cert.progress !== undefined && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <span>Progression</span>
                                <span className="font-bold text-amber-400">{cert.progress}%</span>
                              </div>
                              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cert.progress}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                ></motion.div>
                              </div>
                            </div>
                          )}

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill, i) => (
                              <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </>
  );
}