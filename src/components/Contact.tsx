import React, { useState, useEffect } from 'react';
import {
  Mail,
  MapPin,
  Linkedin,
  FileText,
  Download,
  Building2,
  MessageSquare,
  CheckCircle2,
  Github,
  Send,
  Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ScrollReveal } from './ScrollReveal';
import { motion } from 'framer-motion';

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  const [downloading, setDownloading] = useState(false);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchCvUrl();
  }, []);

  const fetchCvUrl = async () => {
    try {
      const { data: { publicUrl } } = supabase
        .storage
        .from('cv-files')
        .getPublicUrl('CV_Samy_DJEDJIG.pdf');

      if (publicUrl) {
        setCvUrl(publicUrl);
      }
    } catch (error) {
      console.error('Error fetching CV URL:', error);
    }
  };

  const handleDownload = async () => {
    if (!cvUrl) return;
    setDownloading(true);
    try {
      const response = await fetch(cvUrl);
      if (!response.ok) throw new Error('Failed to fetch CV');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV_Samy_DJEDJIG.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
      window.open(cvUrl, '_blank');
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'samydje26@gmail.com', href: 'mailto:samydje26@gmail.com', color: 'cyan' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Samy DJEDJIG', href: 'https://www.linkedin.com/in/samy-djedjig/', color: 'green', external: true },
    { icon: Github, label: 'GitHub', value: '@XxxSamyxxX', href: 'https://github.com/XxxSamyxxX', color: 'orange', external: true }
  ];

  const availability = [
    { text: 'Échanger sur des sujets techniques' },
    { text: 'Partager des ressources & Write-ups' },
    { text: 'Étendre mon réseau professionnel' }
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-dark-950 via-black to-dark-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:3rem_3rem] opacity-[0.02]" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyber-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyber-green-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyber-cyan-500/10 to-cyber-green-500/10 rounded-xl border border-cyber-cyan-500/30">
                <MessageSquare className="w-8 h-8 text-cyber-cyan-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyber-cyan-200 to-cyber-green-200 bg-clip-text text-transparent">
                Contact & Connexion
              </h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Technicien ou Pentester ? Discutons technique, opportunités ou simplement d'Active Directory.
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          <ScrollReveal>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-cyber-cyan-500/30 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyber-cyan-500 to-cyber-green-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">Me contacter</h3>
                </div>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={index}
                        href={method.href}
                        target={method.external ? '_blank' : undefined}
                        rel={method.external ? 'noopener noreferrer' : undefined}
                        className={`group flex items-center gap-4 p-4 rounded-xl bg-dark-900/50 border border-white/5 hover:border-cyber-${method.color}-500/30 transition-all`}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`p-3 bg-cyber-${method.color}-500/10 rounded-lg group-hover:bg-cyber-${method.color}-500/20 transition-colors`}>
                          <Icon className={`w-6 h-6 text-cyber-${method.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{method.label}</p>
                          <p className={`text-white font-medium group-hover:text-cyber-${method.color}-300 transition-colors`}>
                            {method.value}
                          </p>
                        </div>
                        {method.external && (
                          <Send className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-dark-900/30 border border-white/5">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-600 uppercase tracking-wider">Localisation</p>
                    <p className="text-gray-300 font-medium">Béziers, France</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-dark-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-white">Statut Professionnel</h3>
                </div>

                <div className="bg-dark-900/50 p-6 rounded-xl border border-amber-500/20 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg shadow-lg">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-1">Alternant chez SLB</h4>
                      <p className="text-blue-300 text-sm font-medium mb-3">Alternance IT Administrator · 2023 - 2026</p>
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold bg-amber-400/10 w-fit px-3 py-1.5 rounded-full border border-amber-400/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        En recherche active CDI Cybersécurité
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Actuellement en alternance, je recherche un <span className="text-amber-400 font-semibold">CDI dans le domaine de la Cybersécurité</span> pour septembre 2026. <span className="text-white font-semibold">Ouvert également</span> pour :
                  </p>
                  <ul className="space-y-3">
                    {availability.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 text-sm text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyber-cyan-500 flex-shrink-0" />
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 hover:from-cyber-cyan-500 hover:to-cyber-green-500 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyber-cyan-500/50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan-500 to-cyber-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {downloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Téléchargement...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        <span>Télécharger mon CV complet</span>
                        <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/30 border border-cyber-cyan-500/20 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyber-cyan-400" />
            <span className="text-sm text-gray-400">
              Réponse généralement sous <span className="text-cyber-cyan-400 font-semibold">24h</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
