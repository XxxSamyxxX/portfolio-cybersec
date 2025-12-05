import React, { useState } from 'react';
import { Code, ExternalLink, FileText, FolderGit2, ArrowRight, Sparkles, Zap, Box, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';
import { Project, normalizeProject, isArticle } from '../types/project';
import { useProjects, useArticles } from '../lib/queries';
import { getOptimizedUrl } from '../lib/imageUtils';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Use React Query for caching and deduplication
  const { data: showcasesData, isLoading: loadingShowcases } = useProjects();
  const { data: articlesData, isLoading: loadingArticles } = useArticles();

  const loading = loadingShowcases || loadingArticles;

  // Transform and combine data (memoized by React Query)
  const projects = React.useMemo(() => {
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
    ].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).slice(0, 5);
  }, [showcasesData, articlesData]);

  const handleProjectClick = (project: Project) => {
    // Articles have dedicated pages, Showcase projects open modal
    if (isArticle(project) && (project.articleUrl || project.article_url)) {
      navigate(project.articleUrl || project.article_url!);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-dark-950 via-dark-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:4rem_4rem] opacity-[0.02]" />

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-green-500/5 rounded-full blur-3xl"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-green-500/10 border border-cyber-green-500/30 rounded-full mb-6">
            <Box className="w-4 h-4 text-cyber-green-400" />
            <span className="text-sm font-medium text-cyber-green-300">Lab & Infrastructure</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyber-green-200 to-cyber-cyan-200 bg-clip-text text-transparent">
              Lab & Projets Personnels
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            De l'administration système à la cybersécurité : déploiements, scripts et documentations techniques
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyber-green-400 animate-spin" />
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="group relative bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden
                        hover:border-cyber-green-500/50 transition-all duration-300 cursor-pointer
                        hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyber-green-500/10 to-cyber-cyan-500/10 opacity-30 group-hover:opacity-50 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <img
                  src={getOptimizedUrl(project.image, 600)}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/60 to-transparent" />

                {isArticle(project) && (
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="bg-cyber-cyan-500/20 backdrop-blur-sm border border-cyber-cyan-500/50 text-white px-3 py-1.5 rounded-lg
                                flex items-center gap-1.5 text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      <FileText className="w-3.5 h-3.5" />
                      Article
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col relative">
                <div className="-mt-10 mb-4">
                  <div className="w-14 h-14 bg-dark-800 rounded-xl border border-cyber-green-500/50 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all">
                    <Code className="w-6 h-6 text-cyber-green-400" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyber-green-400 transition-colors mb-3 line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white/5 text-gray-300 px-2.5 py-1 rounded-lg border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                  {(project.tags?.length || 0) > 3 && (
                    <span className="text-xs px-2 py-1 text-gray-500 font-medium">
                      +{project.tags!.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/projects')}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-green-600 to-cyber-cyan-600 hover:from-cyber-green-500 hover:to-cyber-cyan-500 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-cyber-green-500/50"
          >
            <Sparkles className="w-5 h-5" />
            <span>Voir la bibliothèque complète</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isModal={true}
          />
        )}
      </div>
    </section>
  );
};
