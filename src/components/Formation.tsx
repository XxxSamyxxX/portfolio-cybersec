import React, { useRef } from 'react';
import {
  Award,
  Shield,
  CheckCircle2,
  Calendar,
  Target,
  Network,
  Server,
  Terminal,
  ArrowRight,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Medal,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

export const Formation: React.FC = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCertificationClick = () => {
    navigate('/certifications');
  };

  const certifications = [
    {
      name: 'Cyber Security 101',
      platform: 'TryHackMe',
      color: 'cyber-green',
      icon: Shield,
      status: 'completed',
      date: '2024',
      topics: ['Réseaux', 'Crypto', 'Web']
    },
    {
      name: 'Pre Security',
      platform: 'TryHackMe',
      color: 'cyber-green',
      icon: Terminal,
      status: 'completed',
      date: '2024',
      topics: ['OSI', 'Linux', 'Windows']
    },
    {
      name: 'Jr Penetration Tester',
      platform: 'TryHackMe',
      color: 'cyber-green',
      icon: Target,
      status: 'in_progress',
      date: 'En cours',
      topics: ['Pentest', 'BurpSuite', 'Metasploit']
    },
    {
      name: 'Web Fundamentals',
      platform: 'TryHackMe',
      color: 'cyber-green',
      icon: Network,
      status: 'in_progress',
      date: 'En cours',
      topics: ['OWASP', 'XSS', 'SQLi']
    }
  ];

  const tools = {
    offensive: ['Nmap', 'Metasploit', 'Burp Suite', 'sqlmap', 'OWASP ZAP', 'Gobuster', 'Ffuf'],
    defensive: ['Wazuh', 'Splunk', 'Suricata', 'Snort', 'Qualys', 'Grafana', 'TheHive']
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:4rem_4rem] opacity-[0.02]" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-cyan-500/10 border border-cyber-cyan-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cyber-cyan-400" />
            <span className="text-sm font-medium text-cyber-cyan-300">Formation & Parcours</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyber-cyan-200 to-cyber-green-200 bg-clip-text text-transparent">
              Formation & Certifications
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Parcours académique et montée en compétences via challenges pratiques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 rounded-2xl opacity-20 blur group-hover:opacity-30 transition" />
            <div className="relative bg-dark-800/80 backdrop-blur-sm p-8 rounded-2xl border border-cyber-cyan-500/20">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-4">
                  <motion.div
                    className="p-6 bg-gradient-to-br from-cyber-cyan-600 to-cyber-green-600 rounded-2xl"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <Shield className="w-20 h-20 text-white" />
                  </motion.div>
                  <div className="flex flex-col items-center lg:items-start gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-cyan-500/10 border border-cyber-cyan-500/30 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-cyber-cyan-400" />
                      <span className="text-xs font-semibold text-cyber-cyan-300">2024 - 2026</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">EPSI Montpellier</span>
                  </div>
                </div>

                <div className="lg:col-span-9">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Master Expert en Cybersécurité
                      </h3>
                      <p className="text-cyber-cyan-400 font-semibold text-lg">Msc - Bac+5 | RNCP Niveau 7</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyber-green-500/10 border border-cyber-green-500/30 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-cyber-green-400" />
                      <span className="text-sm font-semibold text-cyber-green-300">En cours</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 text-base">
                    Formation d'expert axée sur la sécurité offensive et défensive. Maîtrise du pentest,
                    de l'architecture SOC, de la gouvernance sécurité et de la réponse aux incidents.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-dark-900/50 p-4 rounded-xl border border-cyber-cyan-500/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-cyber-cyan-500/20 rounded">
                          <Shield className="w-4 h-4 text-cyber-cyan-400" />
                        </div>
                        <h4 className="text-white font-semibold text-sm">Sécurité Offensive</h4>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-cyan-500" />
                          Pentest Web & Infrastructure
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-cyan-500" />
                          Red Team & Exploitation
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-cyan-500" />
                          Active Directory Attacks
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-900/50 p-4 rounded-xl border border-cyber-green-500/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-cyber-green-500/20 rounded">
                          <Network className="w-4 h-4 text-cyber-green-400" />
                        </div>
                        <h4 className="text-white font-semibold text-sm">Sécurité Défensive</h4>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-green-500" />
                          SIEM & SOC (Wazuh, Splunk)
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-green-500" />
                          IDS/IPS (Suricata, Snort)
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-green-500" />
                          Forensics & Incident Response
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-green-600 to-cyber-cyan-600 rounded-2xl opacity-20 blur group-hover:opacity-30 transition" />
            <div className="relative bg-dark-800/80 backdrop-blur-sm p-8 rounded-2xl border border-cyber-green-500/20">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-3 flex flex-col items-center lg:items-start gap-4">
                  <motion.div
                    className="p-6 bg-gradient-to-br from-cyber-green-600 to-cyber-cyan-600 rounded-2xl"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                  >
                    <Server className="w-20 h-20 text-white" />
                  </motion.div>
                  <div className="flex flex-col items-center lg:items-start gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-green-500/10 border border-cyber-green-500/30 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyber-green-400" />
                      <span className="text-xs font-semibold text-cyber-green-300">Obtenu 2024</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">EPSI Montpellier</span>
                  </div>
                </div>

                <div className="lg:col-span-9">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Bachelor ASRBD
                  </h3>
                  <p className="text-cyber-green-400 font-semibold text-lg mb-4">
                    Administration Systèmes, Réseaux et Bases de Données | Bac+3
                  </p>

                  <p className="text-gray-300 leading-relaxed mb-6 text-base">
                    Administration et sécurisation d'infrastructures IT. Maîtrise de Windows Server,
                    Linux, virtualisation et bases de données en environnement professionnel.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-dark-900/50 p-4 rounded-xl border border-cyber-green-500/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-cyber-green-500/20 rounded">
                          <Server className="w-4 h-4 text-cyber-green-400" />
                        </div>
                        <h4 className="text-white font-semibold text-sm">Systèmes & Virtualisation</h4>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-green-500" />
                          Windows Server (AD, DNS, DHCP)
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-green-500" />
                          Linux Administration (Bash)
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-green-500" />
                          Hyper-V, Proxmox, VMware
                        </li>
                      </ul>
                    </div>

                    <div className="bg-dark-900/50 p-4 rounded-xl border border-cyber-cyan-500/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-cyber-cyan-500/20 rounded">
                          <Network className="w-4 h-4 text-cyber-cyan-400" />
                        </div>
                        <h4 className="text-white font-semibold text-sm">Réseau & BDD</h4>
                      </div>
                      <ul className="space-y-1.5 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-cyan-500" />
                          Architecture LAN/WAN (VLAN, VPN)
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-cyan-500" />
                          Firewalling (PfSense, FortiGate)
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="w-3 h-3 text-cyber-cyan-500" />
                          SQL & NoSQL
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-blue-500/10 rounded-lg">
                  <Award className="w-6 h-6 text-neon-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Certifications Pratiques</h3>
                  <p className="text-sm text-gray-500">TryHackMe Learning Paths</p>
                </div>
              </div>
              <motion.button
                onClick={handleCertificationClick}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-neon-blue-500/10 hover:bg-neon-blue-500/20 border border-neon-blue-500/30 rounded-lg text-neon-blue-300 font-medium transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Voir tout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex-shrink-0 w-80 snap-start"
                    >
                      <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyber-green-500/20 hover:border-cyber-green-500/40 transition-all h-full group cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-cyber-green-500/10 rounded-lg group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-cyber-green-400" />
                          </div>
                          {cert.status === 'completed' ? (
                            <div className="flex items-center gap-1 px-2 py-1 bg-cyber-green-500/10 border border-cyber-green-500/30 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-cyber-green-400" />
                              <span className="text-xs font-semibold text-cyber-green-300">Obtenu</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 px-2 py-1 bg-cyber-orange-500/10 border border-cyber-orange-500/30 rounded-full">
                              <TrendingUp className="w-3 h-3 text-cyber-orange-400" />
                              <span className="text-xs font-semibold text-cyber-orange-300">En cours</span>
                            </div>
                          )}
                        </div>

                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyber-green-400 transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-cyber-green-400 mb-3">{cert.platform}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {cert.topics.map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-dark-900/50 border border-white/5 rounded text-xs text-gray-400">
                              {topic}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-neon-pink-500/20 hover:border-neon-pink-500/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-neon-pink-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-neon-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sécurité Offensive</h3>
                  <p className="text-sm text-neon-pink-400">Red Team & Pentest</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.offensive.map((tool, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="px-3 py-1.5 bg-neon-pink-500/10 border border-neon-pink-500/20 rounded-lg text-sm text-neon-pink-300 font-medium hover:bg-neon-pink-500/20 transition-colors cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-neon-blue-500/20 hover:border-neon-blue-500/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-neon-blue-500/10 rounded-lg">
                  <Network className="w-6 h-6 text-neon-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Sécurité Défensive</h3>
                  <p className="text-sm text-neon-blue-400">Blue Team & SOC</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.defensive.map((tool, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="px-3 py-1.5 bg-neon-blue-500/10 border border-neon-blue-500/20 rounded-lg text-sm text-neon-blue-300 font-medium hover:bg-neon-blue-500/20 transition-colors cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={handleCertificationClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 hover:from-cyber-cyan-500 hover:to-cyber-green-500 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-cyber-cyan-500/50 group"
          >
            <Medal className="w-5 h-5" />
            <span>Voir toutes les certifications</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
