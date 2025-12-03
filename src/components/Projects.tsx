import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, FileText, FolderGit2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectDetail } from './ProjectDetail';
import { Project } from '../types/project';
import { SOCWebProject } from './projects/SOCWebProject';
import { WAFIDSProject } from './projects/WAFIDSProject';
import { MOXAProject } from './projects/MOXAProject';
import { ADProject } from './projects/ADProject';
import { ExegolProject } from './projects/ExegolProject';
import { getOptimizedUrl } from '../lib/imageUtils';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    SOCWebProject,
    WAFIDSProject,
    MOXAProject,
    ADProject,
    ExegolProject
  ];

  const colors = ['electric-blue', 'neon-pink', 'acid-lime', 'holo-purple', 'cyber-orange'];

  const handleProjectClick = (project: Project) => {
    if (project.articleUrl) {
      navigate(project.articleUrl);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
                MES <span className="text-neon-pink">PROJETS</span>
              </h2>
              <div className="w-32 h-2 bg-neon-pink border-4 border-pure-black"></div>
              <p className="text-gray-400 max-w-xl mt-6 text-lg">
                Labs, Scripts & Infrastructure. Du code qui fonctionne.
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="group px-6 py-3 bg-neon-pink text-pure-black font-black uppercase border-4 border-pure-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              Voir tout
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const color = colors[index % colors.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleProjectClick(project)}
                className={`group relative bg-pure-black border-4 border-${color} cursor-pointer hover:translate-x-2 hover:translate-y-2 hover:shadow-none shadow-brutal transition-all duration-200 overflow-hidden`}
              >
                <div className="relative h-48 overflow-hidden border-b-4 border-pure-black">
                  <img
                    src={getOptimizedUrl(project.image, 600)}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-transparent to-transparent opacity-80" />

                  {project.articleUrl && (
                    <div className={`absolute top-4 right-4 bg-${color} text-pure-black px-3 py-1 font-black text-xs uppercase border-2 border-pure-black`}>
                      <FileText className="inline-block w-3 h-3 mr-1" />
                      Article
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className={`inline-block p-2 bg-${color} border-2 border-pure-black mb-4`}>
                    <Code className="w-6 h-6 text-pure-black" />
                  </div>

                  <h3 className="text-2xl font-black text-pure-white uppercase mb-3 group-hover:text-${color} transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`text-[10px] uppercase font-bold tracking-wider bg-pure-black text-${color} px-2 py-1 border-2 border-${color}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] px-2 py-1 text-gray-500 font-medium">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className={`mt-4 flex items-center text-${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <span className="font-bold text-sm uppercase">Voir le projet</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal de détail (si pas d'article dédié) */}
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