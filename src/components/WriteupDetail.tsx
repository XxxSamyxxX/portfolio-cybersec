import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getOptimizedUrl } from '../lib/imageUtils';
import {
  Shield,
  Award,
  Calendar,
  Tag,
  Terminal,
  ArrowLeft,
  Lock,
  AlertTriangle,
  Target,
  Hash,
  Clock,
  FileText,
  List,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Writeup } from '../types/writeup';

interface WriteupDetailProps {
  writeup: Writeup;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const WriteupDetail: React.FC<WriteupDetailProps> = ({ writeup }) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);

  // Logique pour les machines actives (Protection éthique)
  const isActiveMachine = false;

  // Progress bar avec Framer Motion
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Génération du TOC depuis le contenu
  useEffect(() => {
    if (!writeup.content) return;

    const headings = writeup.content.match(/^##\s+(.+)$/gm);
    if (headings) {
      const items: TocItem[] = headings.map((heading, index) => {
        const text = heading.replace(/^##\s+/, '');
        const id = `section-${index}`;
        return { id, text, level: 2 };
      });
      setTocItems(items);
    }
  }, [writeup.content]);

  // Tracking du scroll pour active section
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sections = contentRef.current.querySelectorAll('h2');
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });

      // Calcul du reading progress
      const windowHeight = window.innerHeight;
      const documentHeight = contentRef.current.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    const d = difficulty?.toLowerCase() || '';
    if (d.includes('easy') || d.includes('facile')) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (d.includes('medium') || d.includes('moyen')) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    if (d.includes('hard') || d.includes('difficile')) return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
  };

  const getWriteupImage = () => {
    if (writeup.images && writeup.images.length > 0) {
      return writeup.images[0];
    }
    if (writeup.slug === 'hackthebox-cat-analysis') return "https://placehold.co/800x400/1a1a1f/9FEF00?text=HackTheBox+Writeup";
    if (writeup.slug === 'hackthebox-dog') return "https://placehold.co/800x400/1a1a1f/9FEF00?text=HackTheBox+Writeup";
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80";
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Custom renderer pour ajouter des IDs aux headings
  const components = {
    h2: ({ node, ...props }: any) => {
      const text = props.children?.[0];
      const index = tocItems.findIndex((item) => item.text === text);
      const id = index >= 0 ? tocItems[index].id : '';
      return <h2 id={id} {...props} />;
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Barre de progression fixe en haut */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500/20 origin-left z-50"
        style={{ scaleX }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500"
          style={{ scaleX }}
        />
      </motion.div>

      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Bouton Retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/writeups')}
          className="group mb-8 flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <div className="p-2 rounded-lg border border-white/10 group-hover:border-cyan-500/50 bg-[#0a0a0f] transition-all group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Retour aux archives</span>
        </motion.button>

        {/* Header Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f]"
        >
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={getOptimizedUrl(getWriteupImage(), 1200)}
              alt={writeup.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1.5 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 rounded-lg text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  {writeup.platform || 'CTF'}
                </span>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border backdrop-blur-md ${getDifficultyColor(writeup.difficulty)}`}>
                  {writeup.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {writeup.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400/50" />
                  {formatDate(writeup.created_at)}
                </span>
                {writeup.points && (
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400/50" />
                    {writeup.points} pts
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400/50" />
                  {Math.ceil((writeup.content?.length || 0) / 1000)} min de lecture
                </span>
              </div>
            </div>

            {/* Overlay si Machine Active */}
            {isActiveMachine && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 text-center">
                <div className="bg-amber-500/10 p-6 rounded-full border border-amber-500/20 mb-6 animate-pulse">
                  <Lock className="w-16 h-16 text-amber-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Rapport Classifié</h2>
                <p className="text-amber-500/80 max-w-lg text-sm border border-amber-500/20 bg-amber-500/5 p-4 rounded-lg">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  Machine active - Publication différée pour conformité éthique
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Layout 2 colonnes : TOC + Contenu */}
        {!isActiveMachine && (
          <div className="flex gap-12 relative" ref={contentRef}>
            {/* Sidebar TOC (sticky) */}
            {tocItems.length > 0 && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block w-64 flex-shrink-0"
              >
                <div className="sticky top-32">
                  <div className="bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                      <List className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Table des matières</h3>
                    </div>
                    <nav className="space-y-2">
                      {tocItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all flex items-center gap-2 group
                            ${activeSection === item.id
                              ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500'
                              : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border-l-2 border-transparent'}`}
                        >
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === item.id ? 'translate-x-1' : ''}`} />
                          <span className="line-clamp-2">{item.text}</span>
                        </button>
                      ))}
                    </nav>

                    {/* Reading Progress */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Progression</span>
                        <span className="font-bold text-cyan-400">{Math.round(readingProgress)}%</span>
                      </div>
                      <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                          style={{ width: `${readingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}

            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 min-w-0"
            >
              <div className="bg-[#0a0a0f]/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
                <div className="prose prose-invert prose-cyan max-w-none
                  prose-headings:font-bold prose-headings:text-white prose-headings:scroll-mt-32
                  prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-code:text-cyan-300 prose-code:bg-black/50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:text-sm
                  prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-lg
                  prose-strong:text-white prose-strong:font-semibold
                  prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline
                  prose-ul:list-disc prose-ul:text-gray-300
                  prose-ol:list-decimal prose-ol:text-gray-300
                  prose-li:text-gray-300 prose-li:my-1
                  prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl"
                >
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
                    {writeup.content}
                  </ReactMarkdown>
                </div>

                {/* Footer Tags */}
                {writeup.tags && writeup.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {writeup.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-xs text-gray-400 font-mono flex items-center gap-1.5 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default"
                        >
                          <Hash className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          </div>
        )}
      </div>
    </div>
  );
};
