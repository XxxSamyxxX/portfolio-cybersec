import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedUrl } from '../lib/imageUtils';

import {
  FolderGit2,
  Search,
  Terminal,
  Code,
  ExternalLink,
  FileText,
  Eye,
  ArrowRight,
  Cpu,
  Boxes,
  Layers,
  Sparkles,
  Rocket,
  Filter,
  Grid3x3,
  LayoutList,
  Tag,
  Loader2
} from 'lucide-react';
import { ProjectDetail } from './ProjectDetail';
import { Project, normalizeProject, isArticle, isShowcase } from '../types/project';
import { useProjects, useArticles } from '../lib/queries';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from './SEOHead';

export const ProjectsList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState<'all' | 'article' | 'showcase'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use React Query for caching
  const { data: showcasesData, isLoading: loadingShowcases } = useProjects();
  const { data: articlesData, isLoading: loadingArticles } = useArticles();

  const loading = loadingShowcases || loadingArticles;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Transform and combine data with memoization
  const allProjects = useMemo(() => {
    const transformedArticles: Project[] = (articlesData || []).map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      description: article.description,
      image: article.header_image || 'https://placehold.co/800x400/1a1a1f/9FEF00?text=Article',
      tags: [],
      features: [],
      technical_details: [],
      status: 'completed' as const,
      project_type: 'article' as const,
      article_url: `/articles/${article.slug}`,
      display_order: article.display_order,
      published: article.published,
      created_at: article.created_at,
      updated_at: article.updated_at,
    }));

    return [
      ...(showcasesData || []).map(normalizeProject),
      ...transformedArticles.map(normalizeProject)
    ].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }, [showcasesData, articlesData]);

  // Extraction des technologies uniques
  const allTechnologies = Array.from(
    new Set(allProjects.flatMap((p) => p.tags || []))
  ).sort();

  // Filtrage
  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTech =
      selectedTech === 'all' ||
      (p.tags || []).some((tag) => tag.toLowerCase() === selectedTech.toLowerCase());

    const matchesType =
      projectTypeFilter === 'all' ||
      (projectTypeFilter === 'article' && isArticle(p)) ||
      (projectTypeFilter === 'showcase' && isShowcase(p));

    return matchesSearch && matchesTech && matchesType;
  });

  // Catégorisation des projets (prendre les 4 premiers comme featured)
  const featuredProjects = filteredProjects.slice(0, 4);
  const otherProjects = filteredProjects.slice(4);

  const handleProjectClick = (project: Project) => {
    // Articles navigate to dedicated page, Showcase opens modal
    if (isArticle(project)) {
      const articleUrl = project.articleUrl || project.article_url;
      if (articleUrl) {
        navigate(articleUrl);
      }
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <>
      <SEOHead
        title="Projets & Lab | Samy DJEDJIG"
        description="Portfolio de projets techniques : scripting Python, déploiement d'infrastructure Active Directory, contributions Open Source et Home Lab."
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
            <div className="relative p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <Boxes className="w-12 h-12 text-emerald-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Lab & Projets
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Infrastructure, automatisation et outils techniques pour la cybersécurité. <br />
              <span className="text-sm text-gray-500 font-mono mt-2 inline-block">
                <span className="text-emerald-400">git clone</span> <span className="text-cyan-400">github.com/XxxSamyxxX</span>
              </span>
            </p>
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-400"><span className="text-white font-bold">{allProjects.length}</span> Projets</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-400"><span className="text-white font-bold">{allTechnologies.length}</span> Technologies</span>
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
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-[0_0_50px_rgba(16,185,129,0.1)]">

              {/* Ligne 1: Search + View Mode */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/50" />
                  <input
                    type="text"
                    placeholder="Rechercher un projet (Python, Docker, Active Directory...)"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-black/50 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid'
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'text-gray-500 hover:text-gray-300'}`}
                    title="Vue grille"
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-lg transition-all ${viewMode === 'list'
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'text-gray-500 hover:text-gray-300'}`}
                    title="Vue liste"
                  >
                    <LayoutList className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Ligne 2: Filtres type de projet */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500 font-medium">Type :</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProjectTypeFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                      ${projectTypeFilter === 'all'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-white/5'}`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => setProjectTypeFilter('article')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5
                      ${projectTypeFilter === 'article'
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-white/5'}`}
                  >
                    <FileText className="w-3 h-3" />
                    Articles
                  </button>
                  <button
                    onClick={() => setProjectTypeFilter('showcase')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5
                      ${projectTypeFilter === 'showcase'
                        ? 'bg-violet-500/20 text-violet-400 border-violet-500/30'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-white/5'}`}
                  >
                    <Boxes className="w-3 h-3" />
                    Projets
                  </button>
                </div>
              </div>

              {/* Ligne 3: Filtres technologies */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500 font-medium">Technologies :</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTech('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                      ${selectedTech === 'all'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-white/5'}`}
                  >
                    Tout
                  </button>
                  {allTechnologies.slice(0, 8).map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                        ${selectedTech === tech
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-white/5'}`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* États : Loading, Empty, Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-[#0a0a0f]/50 border border-white/10 rounded-3xl mx-auto max-w-2xl"
            >
              <Code className="w-20 h-20 text-gray-600 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-400">Essayez de modifier vos critères de recherche ou de filtrage.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-7xl mx-auto"
                >
                  {/* Section Featured Projects */}
                  {featuredProjects.length > 0 && selectedTech === 'all' && searchQuery === '' && (
                    <div className="mb-16">
                      <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <h2 className="text-2xl font-bold text-white">Projets Featured</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredProjects.slice(0, 2).map((project, index) => (
                          <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => handleProjectClick(project)}
                            className="group relative bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300"
                          >
                            <div className="relative h-64 overflow-hidden">
                              <img
                                src={getOptimizedUrl(project.image, 800)}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                              {isArticle(project) && (
                                <div className="absolute top-4 right-4 z-10">
                                  <span className="px-3 py-1.5 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 rounded-lg text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5" />
                                    Article
                                  </span>
                                </div>
                              )}

                              <div className="absolute bottom-4 left-4 right-4 z-10">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                              </div>
                            </div>

                            <div className="p-5 border-t border-white/5">
                              <div className="flex flex-wrap gap-2">
                                {(project.tags || []).slice(0, 4).map((tag, i) => (
                                  <span key={i} className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tous les projets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => handleProjectClick(project)}
                        className="group relative bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col cursor-pointer hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={getOptimizedUrl(project.image, 600)}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                          {isArticle(project) && (
                            <div className="absolute top-3 right-3 z-10">
                              <div className="bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 rounded-lg p-1.5">
                                <FileText className="w-4 h-4 text-cyan-400" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3 flex-grow">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {(project.tags || []).slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-md flex items-center gap-1 border border-white/5">
                                <Terminal className="w-3 h-3 text-emerald-400/50" />
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className={`text-xs font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all ${isArticle(project) ? 'text-cyan-400' : 'text-emerald-400'}`}>
                              {isArticle(project) ? 'Lire l\'article' : 'Voir détails'}
                              <ArrowRight className="w-4 h-4" />
                            </span>
                            <Eye className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-5xl mx-auto space-y-4"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      onClick={() => handleProjectClick(project)}
                      className="group flex items-center gap-6 bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-4 overflow-hidden cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300"
                    >
                      <div className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={getOptimizedUrl(project.image, 300)}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {isArticle(project) && (
                            <span className="px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400">
                              ARTICLE
                            </span>
                          )}
                          {isShowcase(project) && (
                            <span className="px-2 py-0.5 bg-violet-500/20 border border-violet-500/30 rounded text-[10px] font-bold text-violet-400">
                              PROJET
                            </span>
                          )}
                          <span className="text-xs text-gray-500">{(project.tags || []).slice(0, 2).join(' • ')}</span>
                        </div>

                        <h3 className="text-lg font-bold mb-1 truncate text-white group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                      </div>

                      <ArrowRight className="w-5 h-5 text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Modal Detail */}
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isModal={true}
          />
        )}
      </div>
    </>
  );
};