import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Target,
  Calendar,
  Terminal,
  Lock,
  Hash,
  FileWarning,
  Filter,
  Shield,
  ArrowRight,
  AlertCircle,
  Award,
  Eye,
  SlidersHorizontal,
  Grid3x3,
  LayoutList
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Writeup } from '../types/writeup';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from './SEOHead';
import { getOptimizedUrl } from '../lib/imageUtils';

export const WriteupsList: React.FC = () => {
  const [writeups, setWriteups] = useState<Writeup[]>([]);
  const [filteredWriteups, setFilteredWriteups] = useState<Writeup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'difficulty' | 'title'>('date');
  const [viewMode, setViewMode] = useState<'masonry' | 'list'>('masonry');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchWriteups();
  }, []);

  // Filtrage et tri dynamique
  useEffect(() => {
    let results = [...writeups];

    // Filtre Recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(w =>
        w.title.toLowerCase().includes(query) ||
        w.description?.toLowerCase().includes(query) ||
        w.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filtre Plateforme
    if (selectedPlatform !== 'all') {
      results = results.filter(w => {
        const platform = w.platform?.toLowerCase() || '';
        if (selectedPlatform === 'htb') return platform === 'hackthebox' || platform.includes('htb');
        if (selectedPlatform === 'thm') return platform === 'tryhackme' || platform.includes('thm');
        if (selectedPlatform === 'rootme') return platform === 'rootme' || platform.includes('root-me');
        if (selectedPlatform === 'portswigger') return platform === 'portswigger';
        return true;
      });
    }

    // Filtre Difficulté
    if (selectedDifficulty !== 'all') {
      results = results.filter(w => {
        const diff = w.difficulty?.toLowerCase() || '';
        return diff.includes(selectedDifficulty);
      });
    }

    // Tri
    results.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.completed_at || a.created_at).getTime();
        const dateB = new Date(b.completed_at || b.created_at).getTime();
        return dateB - dateA;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'difficulty') {
        const diffOrder: Record<string, number> = {
          'easy': 1, 'facile': 1,
          'medium': 2, 'moyen': 2,
          'hard': 3, 'difficile': 3,
          'insane': 4
        };
        const aDiff = diffOrder[a.difficulty?.toLowerCase() || ''] || 0;
        const bDiff = diffOrder[b.difficulty?.toLowerCase() || ''] || 0;
        return aDiff - bDiff;
      }
      return 0;
    });

    setFilteredWriteups(results);
  }, [searchQuery, selectedPlatform, selectedDifficulty, sortBy, writeups]);

  const fetchWriteups = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWriteups(data || []);
      setFilteredWriteups(data || []);
    } catch (err: any) {
      console.error('Error fetching writeups:', err);
      setError('Impossible de charger les archives. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyStyles = (difficulty: string) => {
    const d = difficulty?.toLowerCase() || '';
    if (d.includes('easy') || d.includes('facile')) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
    if (d.includes('medium') || d.includes('moyen')) return 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
    if (d.includes('hard') || d.includes('difficile') || d.includes('insane')) return 'text-rose-400 border-rose-500/30 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.15)]';
    return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
  };

  const getDifficultyIcon = (difficulty: string) => {
    const d = difficulty?.toLowerCase() || '';
    if (d.includes('easy') || d.includes('facile')) return '◆';
    if (d.includes('medium') || d.includes('moyen')) return '◆◆';
    if (d.includes('hard') || d.includes('difficile') || d.includes('insane')) return '◆◆◆';
    return '○';
  };

  const getPlatformLabel = (slug: string) => {
    if (slug.includes('hackthebox')) return 'HackTheBox';
    if (slug.includes('tryhackme')) return 'TryHackMe';
    if (slug.includes('root-me')) return 'Root-Me';
    return 'CTF';
  };

  const getWriteupImage = (writeup: Writeup) => {
    // 1. Priorité absolue : L'image définie dans la base de données (Supabase)
    if (writeup.images && writeup.images.length > 0) {
      return writeup.images[0];
    }

    // 2. Fallbacks (Ancienne méthode "en dur", à garder au cas où)
    if (writeup.slug === 'hackthebox-cat-analysis') return "https://placehold.co/800x400/1a1a1f/9FEF00?text=HackTheBox+Writeup";
    if (writeup.slug === 'hackthebox-dog') return "https://placehold.co/800x400/1a1a1f/9FEF00?text=HackTheBox+Writeup";
    
    // 3. Image par défaut (Si rien n'est trouvé)
    return "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80";
  };

  return (
    <>
      <SEOHead
        title="Archives Write-ups & CTF | Samy DJEDJIG"
        description="Base de connaissances techniques : rapports d'intrusion, solutions de CTF (HackTheBox, TryHackMe) et documentation de vulnérabilités."
      />

      <div className="min-h-screen pt-32 pb-24 bg-black text-gray-100">
        <div className="container mx-auto px-6">

          {/* En-tête de page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="relative p-4 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-2xl border border-cyan-500/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <Terminal className="w-12 h-12 text-cyan-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Write-ups Archive
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Documentation complète de mes opérations offensives et analyses de sécurité. <br />
              <span className="text-sm text-gray-500 font-mono mt-2 inline-block">
                <span className="text-cyan-400">[HTB]</span> • <span className="text-emerald-400">[THM]</span> • <span className="text-orange-400">[RM]</span>
              </span>
            </p>
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400"><span className="text-white font-bold">{writeups.length}</span> Rapports</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-400"><span className="text-white font-bold">{filteredWriteups.length}</span> Affichés</span>
              </div>
            </div>
          </motion.div>

          {/* Barre de Contrôle Moderne */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-7xl mx-auto mb-12"
          >
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-[0_0_50px_rgba(6,182,212,0.1)]">

              {/* Ligne 1: Search + View Mode */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                  <input
                    type="text"
                    placeholder="Rechercher un write-up (nom, tag, CVE...)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-black/50 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'masonry'
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'text-gray-500 hover:text-gray-300'}`}
                    title="Vue grille"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'list'
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'text-gray-500 hover:text-gray-300'}`}
                    title="Vue liste"
                  >
                    <LayoutList className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Ligne 2: Filtres avancés */}
              <div className="flex flex-wrap gap-3 mb-4">
                {/* Platform Filters */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: 'all', label: 'Toutes', icon: Target, color: 'cyan' },
                    { id: 'htb', label: 'HTB', icon: Shield, color: 'emerald' },
                    { id: 'thm', label: 'THM', icon: Terminal, color: 'green' },
                    { id: 'rootme', label: 'Root-Me', icon: Award, color: 'orange' }
                  ].map((platform) => {
                    const Icon = platform.icon;
                    const isActive = selectedPlatform === platform.id;
                    return (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5
                          ${isActive
                            ? `bg-${platform.color}-500/20 text-${platform.color}-400 border-${platform.color}-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]`
                            : 'bg-black/30 text-gray-400 border-white/5 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {platform.label}
                      </button>
                    );
                  })}
                </div>

                <div className="w-px h-8 bg-white/10"></div>

                {/* Difficulty Filters */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: 'all', label: 'Toutes' },
                    { id: 'easy', label: 'Facile' },
                    { id: 'medium', label: 'Moyen' },
                    { id: 'hard', label: 'Difficile' }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border
                        ${selectedDifficulty === diff.id
                          ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                          : 'bg-black/30 text-gray-400 border-white/5 hover:bg-white/5 hover:text-white hover:border-white/10'}`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ligne 3: Tri */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500 font-medium">Trier par :</span>
                <div className="flex gap-2">
                  {[
                    { id: 'date', label: 'Date' },
                    { id: 'difficulty', label: 'Difficulté' },
                    { id: 'title', label: 'Titre' }
                  ].map((sort) => (
                    <button
                      key={sort.id}
                      onClick={() => setSortBy(sort.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${sortBy === sort.id
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* États : Loading, Error, Empty, Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-2 border-cyan-500/20 border-t-cyan-500"></div>
                <Terminal className="absolute inset-0 m-auto w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              <p className="mt-6 text-gray-500 text-sm">Chargement des write-ups...</p>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-rose-500/5 border border-rose-500/20 rounded-3xl mx-auto max-w-2xl"
            >
              <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Erreur système</h3>
              <p className="text-gray-400">{error}</p>
            </motion.div>
          ) : filteredWriteups.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-[#0a0a0f]/50 border border-white/10 rounded-3xl mx-auto max-w-2xl"
            >
              <Shield className="w-20 h-20 text-gray-600 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">Aucun rapport trouvé</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche ou de filtrage.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'masonry' ? (
                <motion.div
                  key="masonry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto"
                >
                  {filteredWriteups.map((writeup, index) => {
                    const isActiveMachine = false;
                    const platformLabel = getPlatformLabel(writeup.slug || '');
                    const platformColor = platformLabel === 'HackTheBox' ? 'emerald' : platformLabel === 'TryHackMe' ? 'green' : 'orange';

                    return (
                      <motion.div
                        key={writeup.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => !isActiveMachine && navigate(`/writeups/${writeup.slug}`)}
                        className={`group relative bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden mb-6 break-inside-avoid
                          transition-all duration-300 ${isActiveMachine ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]'}`}
                      >
                        {/* Image avec overlay gradient au hover */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={getOptimizedUrl(getWriteupImage(writeup), 600)}
                            alt={writeup.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Gradient overlay qui apparaît au hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                          {/* Badge plateforme */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className={`px-2.5 py-1 bg-${platformColor}-500/20 backdrop-blur-md border border-${platformColor}-500/30 rounded-lg text-[10px] font-bold uppercase tracking-wider text-${platformColor}-400 shadow-lg`}>
                              {platformLabel}
                            </span>
                          </div>

                          {/* Badge difficulté */}
                          <div className="absolute top-3 right-3 z-10">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getDifficultyStyles(writeup.difficulty)}`}>
                              {getDifficultyIcon(writeup.difficulty)} {writeup.difficulty || 'N/A'}
                            </span>
                          </div>

                          {/* Overlay machine active */}
                          {isActiveMachine && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 backdrop-blur-sm">
                              <Lock className="w-8 h-8 text-amber-500 mb-2" />
                              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Active Machine</span>
                            </div>
                          )}
                        </div>

                        {/* Contenu */}
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400/50" />
                              {new Date(writeup.completed_at || writeup.created_at).toLocaleDateString('fr-FR')}
                            </div>
                            {writeup.points && (
                              <div className="flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-emerald-400/50" />
                                {writeup.points} pts
                              </div>
                            )}
                          </div>

                          <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isActiveMachine ? 'text-gray-500' : 'text-white group-hover:text-cyan-400'} transition-colors`}>
                            {writeup.title}
                          </h3>

                          <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                            {isActiveMachine ? (
                              <span className="flex items-center gap-2 text-amber-500/80 italic text-xs">
                                <FileWarning className="w-4 h-4" /> Contenu restreint
                              </span>
                            ) : (
                              writeup.description || "Analyse technique détaillée d'une machine ou d'un challenge CTF."
                            )}
                          </p>

                          {/* Tags */}
                          {writeup.tags && writeup.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {writeup.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-md flex items-center gap-1 border border-white/5">
                                  <Hash className="w-3 h-3 text-cyan-400/50" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer avec action */}
                          {!isActiveMachine && (
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <span className="text-xs text-cyan-400 font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                Lire le rapport
                                <ArrowRight className="w-4 h-4" />
                              </span>
                              <Eye className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-5xl mx-auto space-y-4"
                >
                  {filteredWriteups.map((writeup, index) => {
                    const isActiveMachine = false;
                    const platformLabel = getPlatformLabel(writeup.slug || '');

                    return (
                      <motion.div
                        key={writeup.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        onClick={() => !isActiveMachine && navigate(`/writeups/${writeup.slug}`)}
                        className={`group flex items-center gap-6 bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-4 overflow-hidden
                          transition-all duration-300 ${isActiveMachine ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]'}`}
                      >
                        {/* Image miniature */}
                        <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={getOptimizedUrl(getWriteupImage(writeup), 300)}
                            alt={writeup.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getDifficultyStyles(writeup.difficulty)}`}>
                              {writeup.difficulty || 'N/A'}
                            </span>
                            <span className="text-xs text-gray-500">{platformLabel}</span>
                            <span className="text-xs text-gray-600">•</span>
                            <span className="text-xs text-gray-500">{new Date(writeup.completed_at || writeup.created_at).toLocaleDateString('fr-FR')}</span>
                          </div>

                          <h3 className={`text-lg font-bold mb-1 truncate ${isActiveMachine ? 'text-gray-500' : 'text-white group-hover:text-cyan-400'} transition-colors`}>
                            {writeup.title}
                          </h3>

                          <p className="text-sm text-gray-400 line-clamp-1">
                            {isActiveMachine ? "Contenu restreint" : writeup.description || "Analyse technique détaillée"}
                          </p>
                        </div>

                        {/* Action */}
                        {!isActiveMachine && (
                          <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};