import React, { useEffect, useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Shield,
  Heart,
  Code2,
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [dynamicStats, setDynamicStats] = useState({
    projects: 0,
    writeups: 0,
    certifications: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from Supabase
        const [projectsRes, writeupsRes, certsRes] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }).eq('published', true),
          supabase.from('writeups').select('id', { count: 'exact', head: true }).eq('published', true),
          supabase.from('certifications').select('id', { count: 'exact', head: true }).eq('published', true)
        ]);

        setDynamicStats({
          projects: projectsRes.count || 0,
          writeups: writeupsRes.count || 0,
          certifications: certsRes.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const footerLinks = [
    {
      title: 'Navigation',
      icon: Terminal,
      links: [
        { label: 'Write-ups CTF', to: '/writeups' },
        { label: 'Projets & Lab', to: '/projects' },
        { label: 'Certifications', to: '/certifications' }
      ]
    },
    {
      title: 'Ressources',
      icon: Code2,
      links: [
        { label: 'GitHub', href: 'https://github.com/XxxSamyxxX', external: true },
        { label: 'TryHackMe', href: 'https://tryhackme.com/p/SamyDJE', external: true },
        { label: 'HackTheBox', href: 'https://app.hackthebox.com/profile/1234567', external: true }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/XxxSamyxxX', label: 'GitHub', color: 'cyan' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/samy-djedjig/', label: 'LinkedIn', color: 'green' },
    { icon: Mail, href: 'mailto:samydje26@gmail.com', label: 'Email', color: 'orange' }
  ];

  const stats = [
    { label: 'Projets', value: dynamicStats.projects, icon: Code2 },
    { label: 'Write-ups', value: dynamicStats.writeups, icon: Terminal },
    { label: 'Certifs', value: dynamicStats.certifications, icon: Shield }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-dark-900 via-dark-950 to-black border-t border-cyber-cyan-500/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:3rem_3rem] opacity-[0.02]" />

      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-green-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-cyber-cyan-500/20 blur-xl rounded-full group-hover:bg-cyber-cyan-500/30 transition-all" />
                <div className="relative p-3 bg-gradient-to-br from-cyber-cyan-500/10 to-cyber-green-500/10 rounded-xl border border-cyber-cyan-500/30">
                  <Terminal className="w-7 h-7 text-cyber-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-cyber-cyan-100 to-cyber-green-100 bg-clip-text text-transparent">
                  Samy DJEDJIG
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-cyber-green-500 animate-pulse" />
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    Cybersecurity Portfolio
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Alternant IT Administrator passionné par la cybersécurité offensive et défensive.
              Spécialisé en Active Directory, pentesting et architecture SOC.
            </p>

            <div className="flex items-center gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-lg border border-white/5 hover:border-cyber-cyan-500/30 transition-all group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon className="w-4 h-4 text-gray-500 group-hover:text-cyber-cyan-400 transition-colors" />
                    <div>
                      <div className="text-white font-bold text-sm">{stat.value}</div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-dark-800/50 rounded-xl border border-white/5 hover:border-cyber-${social.color}-500/50 transition-all group relative overflow-hidden`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`absolute inset-0 bg-cyber-${social.color}-500/0 group-hover:bg-cyber-${social.color}-500/10 transition-all`} />
                    <Icon className={`w-5 h-5 text-gray-400 group-hover:text-cyber-${social.color}-400 transition-colors relative z-10`} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {footerLinks.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Icon className="w-5 h-5 text-cyber-cyan-500" />
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                      {section.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-gray-400 hover:text-cyber-cyan-400 transition-all text-sm"
                          >
                            <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <Link
                            to={link.to!}
                            className="group flex items-center gap-2 text-gray-400 hover:text-cyber-cyan-400 transition-all text-sm"
                          >
                            <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                            <span>{link.label}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="border-t border-white/5 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <span>© {currentYear} Samy DJEDJIG</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                Fait avec <Heart className="w-3 h-3 text-cyber-orange-500 fill-cyber-orange-500 animate-pulse" /> et React
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green-500"></span>
                </span>
                <span>System Status</span>
                <span className="px-2 py-0.5 bg-cyber-green-500/10 text-cyber-green-400 rounded text-[10px] font-medium border border-cyber-green-500/20">
                  Online
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Powered by</span>
                <span className="font-mono text-cyber-cyan-600">React + Vite + Supabase</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan-500/20 to-transparent" />
    </footer>
  );
};
