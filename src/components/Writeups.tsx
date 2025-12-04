import React, { useState, useEffect } from 'react';
import { getOptimizedUrl } from '../lib/imageUtils';
import {
  Target,
  ArrowRight,
  AlertCircle,
  Calendar,
  Terminal,
  Shield,
  Lock,
  Eye,
  Hash,
  Sparkles,
  FileText
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Writeup } from '../types/writeup';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Writeups: React.FC = () => {
  const [writeups, setWriteups] = useState<Writeup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWriteups();
  }, []);

  const fetchWriteups = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setWriteups(data || []);
    } catch (err: any) {
      console.error('Error fetching writeups:', err);
      setError('Impossible de charger les rapports récents.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile': case 'easy': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'moyen': case 'medium': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'difficile': case 'hard': case 'insane': return 'text-red-400 border-red-500/30 bg-red-500/10';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  const getPlatformIcon = (slug: string) => {
    if (slug.includes('hackthebox')) return 'HTB';
    if (slug.includes('tryhackme')) return 'THM';
    if (slug.includes('root-me')) return 'RM';
    return 'CTF';
  };

  const getWriteupImage = (writeup: Writeup) => {
    if (writeup.images && writeup.images.length > 0) {
      return writeup.images[0];
    }

    if (writeup.slug === 'hackthebox-cat-analysis') return "https://placehold.co/800x400/1a1a1f/9FEF00?text=HackTheBox+Writeup";
    if (writeup.slug === 'hackthebox-dog') return "https://placehold.co/800x400/1a1a1f/9FEF00?text=HackTheBox+Writeup";
    return "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80";
  };

  return (
    <section id="writeups" className="py-24 bg-gradient-to-b from-black via-dark-900 to-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:4rem_4rem] opacity-[0.02]" />

      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyber-cyan-500/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-cyan-500/10 border border-cyber-cyan-500/30 rounded-full mb-6">
            <Terminal className="w-4 h-4 text-cyber-cyan-400" />
            <span className="text-sm font-medium text-cyber-cyan-300">CTF & Pentesting</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyber-cyan-200 to-cyber-orange-200 bg-clip-text text-transparent">
              Rapports d'Intrusion
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Documentation technique des machines compromises et méthodologies d'exploitation
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyber-cyan-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-red-500/20"
          >
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-gray-400">{error}</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {writeups.map((writeup, index) => {
                const isActiveMachine = false;

                return (
                  <motion.div
                    key={writeup.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => !isActiveMachine && navigate(`/writeups/${writeup.slug}`)}
                    className={`group relative bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full
                             transition-all duration-300 ${isActiveMachine ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:-translate-y-2 hover:border-cyber-cyan-500/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]'}`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-cyber-cyan-500/10 to-cyber-orange-500/10 opacity-30 group-hover:opacity-50 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <img
                        src={getOptimizedUrl(getWriteupImage(writeup), 600)}
                        alt={writeup.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-cyber-cyan-500/30 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                          {getPlatformIcon(writeup.slug || '')}
                        </span>
                      </div>

                      {isActiveMachine && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                          <div className="p-3 bg-amber-500/10 rounded-full border border-amber-500/20 mb-2">
                            <Lock className="w-6 h-6 text-amber-400" />
                          </div>
                          <span className="text-amber-400 font-bold text-sm tracking-widest uppercase border border-amber-500/30 px-3 py-1 rounded bg-black/50">
                            Classified / Active
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${getDifficultyColor(writeup.difficulty)}`}>
                          {writeup.difficulty || 'Unknown'}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(writeup.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      <h3 className={`text-xl font-bold mb-3 line-clamp-1 ${isActiveMachine ? 'text-gray-500' : 'text-white group-hover:text-cyber-cyan-400'} transition-colors`}>
                        {writeup.title}
                      </h3>

                      <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2 flex-grow">
                        {isActiveMachine
                          ? "Le rapport est verrouillé car la machine est toujours active sur la plateforme. Conformité éthique."
                          : writeup.description || "Analyse technique détaillée de la compromission : reconnaissance, exploitation et élévation de privilèges."}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex items-center gap-3">
                          {writeup.tags?.slice(0, 2).map((tag, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
                              <Hash className="w-3 h-3 text-cyber-cyan-500/50" />
                              {tag}
                            </div>
                          ))}
                        </div>

                        {!isActiveMachine && (
                          <div className="flex items-center gap-2 text-xs font-bold text-cyber-cyan-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            Lire
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <button
                onClick={() => navigate('/writeups')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-cyan-600 to-cyber-orange-600 hover:from-cyber-cyan-500 hover:to-cyber-orange-500 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-cyber-cyan-500/50"
              >
                <FileText className="w-5 h-5" />
                <span>Archives complètes</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
