import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Shield,
  CheckCircle2,
  Target,
  Network,
  Server,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Formation: React.FC = () => {
  const navigate = useNavigate();

  const handleCertificationClick = () => {
    navigate('/certifications');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-pure-white uppercase tracking-tight mb-4">
                FORMATION & <span className="text-holo-purple">CERTIF</span>
              </h2>
              <div className="w-32 h-2 bg-holo-purple border-4 border-pure-black"></div>
            </div>

            <button
              onClick={handleCertificationClick}
              className="group px-6 py-3 bg-holo-purple text-pure-white font-black uppercase border-4 border-pure-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              Tout voir
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-pure-black border-4 border-holo-purple p-6 shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-holo-purple border-2 border-pure-black">
                <Shield className="w-10 h-10 text-pure-black" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-holo-purple mb-1">2024-2026 • En cours</div>
                <h3 className="text-2xl font-black text-pure-white uppercase">Master Cybersec</h3>
                <p className="text-sm text-gray-400 font-bold">Bac+5 | EPSI Montpellier</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Red Team, Blue Team, SOC, Forensics & Incident Response
            </p>

            <div className="grid grid-cols-2 gap-2">
              <span className="px-2 py-1 bg-pure-black text-holo-purple border-2 border-holo-purple text-xs font-bold uppercase text-center">Pentest</span>
              <span className="px-2 py-1 bg-pure-black text-holo-purple border-2 border-holo-purple text-xs font-bold uppercase text-center">SOC</span>
              <span className="px-2 py-1 bg-pure-black text-holo-purple border-2 border-holo-purple text-xs font-bold uppercase text-center">AD</span>
              <span className="px-2 py-1 bg-pure-black text-holo-purple border-2 border-holo-purple text-xs font-bold uppercase text-center">IDS/IPS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-pure-black border-4 border-electric-blue p-6 shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-electric-blue border-2 border-pure-black">
                <Server className="w-10 h-10 text-pure-black" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-acid-lime mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  2024 • Obtenu
                </div>
                <h3 className="text-2xl font-black text-pure-white uppercase">Bachelor ASRBD</h3>
                <p className="text-sm text-gray-400 font-bold">Bac+3 | EPSI Montpellier</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              SysAdmin, Réseaux, Virtualisation & Bases de Données
            </p>

            <div className="grid grid-cols-2 gap-2">
              <span className="px-2 py-1 bg-pure-black text-electric-blue border-2 border-electric-blue text-xs font-bold uppercase text-center">AD DS</span>
              <span className="px-2 py-1 bg-pure-black text-electric-blue border-2 border-electric-blue text-xs font-bold uppercase text-center">Linux</span>
              <span className="px-2 py-1 bg-pure-black text-electric-blue border-2 border-electric-blue text-xs font-bold uppercase text-center">Proxmox</span>
              <span className="px-2 py-1 bg-pure-black text-electric-blue border-2 border-electric-blue text-xs font-bold uppercase text-center">PfSense</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={handleCertificationClick}
            className="bg-pure-black border-4 border-acid-lime p-6 shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-acid-lime border-2 border-pure-black">
                <Award className="w-10 h-10 text-pure-black" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-acid-lime mb-1">TryHackMe • Top 5%</div>
                <h3 className="text-2xl font-black text-pure-white uppercase">4 Certifications</h3>
                <p className="text-sm text-gray-400 font-bold">Cybersec, Pentest, Web</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Pre-Security, Cyber Security 101, Jr Pentester, Web Pentesting
            </p>

            <div className="flex items-center text-acid-lime group-hover:translate-x-2 transition-transform">
              <span className="font-bold text-sm uppercase">Voir tout</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-pure-black border-4 border-cyber-orange p-6 shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyber-orange border-2 border-pure-black">
                <Shield className="w-10 h-10 text-pure-black" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-pure-white uppercase">Red Team</h3>
                <p className="text-sm text-gray-400 font-bold">Offensive Security</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Nmap', 'Metasploit', 'Burp Suite', 'sqlmap'].map((tool) => (
                <span key={tool} className="px-2 py-1 bg-pure-black text-cyber-orange border-2 border-cyber-orange text-xs font-bold uppercase">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-pure-black border-4 border-neon-pink p-6 shadow-brutal hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-200"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neon-pink border-2 border-pure-black">
                <Network className="w-10 h-10 text-pure-black" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-pure-white uppercase">Blue Team</h3>
                <p className="text-sm text-gray-400 font-bold">Defensive Security</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Wazuh', 'Splunk', 'Suricata', 'Snort'].map((tool) => (
                <span key={tool} className="px-2 py-1 bg-pure-black text-neon-pink border-2 border-neon-pink text-xs font-bold uppercase">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};