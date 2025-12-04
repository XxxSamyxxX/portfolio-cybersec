import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, CheckCircle, XCircle, Clipboard, ClipboardCheck } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  Article, 
  ContentBlock, 
  CodeBlock, 
  StepsBlock, 
  ComparisonBlock, 
  FAQBlock, 
  GridBlock, 
  AlertBlock
} from '../types/article';

// Utility function to get Lucide icon by name
function getIcon(name: string) {
  return (LucideIcons as Record<string, any>)[name] || LucideIcons.FileText;
}

// ============================================
// Code Block Component
// ============================================
function CodeBlockRenderer({ block }: { block: CodeBlock }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(block.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {block.title && (
        <div className="absolute top-0 left-0 px-4 py-2 bg-violet-600/20 text-violet-400 text-sm font-medium rounded-tl-lg border-b border-r border-violet-500/30">
          {block.title}
        </div>
      )}
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100 z-10"
      >
        {copied ? <ClipboardCheck className="w-4 h-4 text-green-400" /> : <Clipboard className="w-4 h-4" />}
      </button>
      <pre className={`bg-gray-900 rounded-xl p-4 overflow-x-auto border border-gray-800 ${block.title ? 'pt-12' : ''}`}>
        <code className={`language-${block.language} text-sm text-gray-300`}>
          {block.code}
        </code>
      </pre>
      <div className="absolute bottom-3 right-3 px-2 py-1 bg-gray-800/80 rounded text-xs text-gray-500">
        {block.language}
      </div>
    </div>
  );
}

// ============================================
// Steps Block Component
// ============================================
function StepsBlockRenderer({ block }: { block: StepsBlock }) {
  const [openSteps, setOpenSteps] = useState<number[]>([0]);

  const toggleStep = (index: number) => {
    setOpenSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {block.items.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden"
        >
          <button
            onClick={() => toggleStep(index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-400 font-bold text-sm">
                {index + 1}
              </span>
              <span className="text-white font-medium">{step.title}</span>
            </div>
            {openSteps.includes(index) ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {openSteps.includes(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 space-y-4">
                  {step.content && (
                    <p className="text-gray-300">{step.content}</p>
                  )}
                  {step.code && (
                    <CodeBlockRenderer
                      block={{
                        type: 'code',
                        language: step.language || 'bash',
                        code: step.code
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// FAQ Block Component
// ============================================
function FAQBlockRenderer({ block }: { block: FAQBlock }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {block.items.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden"
        >
          <button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
          >
            <span className="text-white font-medium">{item.question}</span>
            {openFaq === index ? (
              <ChevronUp className="w-5 h-5 text-violet-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {openFaq === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-gray-800">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Comparison Block Component
// ============================================
function ComparisonBlockRenderer({ block }: { block: ComparisonBlock }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-4 px-4 text-gray-300 font-medium">Fonctionnalité</th>
            <th className="py-4 px-4 text-center text-violet-400 font-medium">{block.option1Label}</th>
            <th className="py-4 px-4 text-center text-emerald-400 font-medium">{block.option2Label}</th>
          </tr>
        </thead>
        <tbody>
          {block.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-900/30">
              <td className="py-3 px-4 text-white">{item.name}</td>
              <td className="py-3 px-4 text-center">
                {item.option1.supported ? (
                  <span className="inline-flex items-center gap-1 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm text-gray-400">{item.option1.details}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-400">
                    <X className="w-4 h-4" />
                    <span className="text-sm text-gray-400">{item.option1.details}</span>
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {item.option2.supported ? (
                  <span className="inline-flex items-center gap-1 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm text-gray-400">{item.option2.details}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-400">
                    <X className="w-4 h-4" />
                    <span className="text-sm text-gray-400">{item.option2.details}</span>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Grid Block Component
// ============================================
function GridBlockRenderer({ block }: { block: GridBlock }) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[block.columns];

  return (
    <div className={`grid ${colsClass} gap-4`}>
      {block.items.map((item, index) => {
        const Icon = item.icon ? getIcon(item.icon) : null;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-violet-500/30 transition-colors"
          >
            {Icon && (
              <Icon className="w-8 h-8 text-violet-400 mb-4" />
            )}
            <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
            {item.description && (
              <p className="text-gray-400">{item.description}</p>
            )}
            {item.items && item.items.length > 0 && (
              <ul className="mt-3 space-y-2">
                {item.items.map((listItem, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>{listItem}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================
// Alert Block Component
// ============================================
function AlertBlockRenderer({ block }: { block: AlertBlock }) {
  const variants = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: Info,
      iconColor: 'text-blue-400'
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: AlertTriangle,
      iconColor: 'text-amber-400'
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: CheckCircle,
      iconColor: 'text-green-400'
    },
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: XCircle,
      iconColor: 'text-red-400'
    }
  };

  const variant = variants[block.variant];
  const Icon = variant.icon;

  return (
    <div className={`${variant.bg} ${variant.border} border rounded-xl p-4 flex items-start gap-4`}>
      <Icon className={`w-6 h-6 ${variant.iconColor} flex-shrink-0`} />
      <div>
        {block.title && (
          <h4 className="text-white font-semibold mb-1">{block.title}</h4>
        )}
        <p className="text-gray-300">{block.content}</p>
      </div>
    </div>
  );
}

// ============================================
// Content Block Renderer (Dispatcher)
// ============================================
function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {block.content}
          </p>
        </div>
      );
    case 'code':
      return <CodeBlockRenderer block={block} />;
    case 'steps':
      return <StepsBlockRenderer block={block} />;
    case 'faq':
      return <FAQBlockRenderer block={block} />;
    case 'comparison':
      return <ComparisonBlockRenderer block={block} />;
    case 'grid':
      return <GridBlockRenderer block={block} />;
    case 'alert':
      return <AlertBlockRenderer block={block} />;
    case 'image':
      return (
        <figure className="space-y-2">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-xl border border-gray-800"
          />
          {block.caption && (
            <figcaption className="text-center text-gray-400 text-sm">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ============================================
// Diagram Renderer
// ============================================
function DiagramRenderer({ diagram }: { diagram: Article['diagram'] }) {
  if (!diagram || diagram.nodes.length === 0) return null;

  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      {diagram.title && (
        <h3 className="text-xl font-semibold text-white mb-6 text-center">{diagram.title}</h3>
      )}
      <svg className="w-full" viewBox="0 0 800 300" style={{ minHeight: '200px' }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* Connections */}
        {diagram.connections.map((conn, index) => {
          const fromNode = diagram.nodes.find(n => n.id === conn.from);
          const toNode = diagram.nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const fromX = fromNode.x + (fromNode.width || 100) / 2;
          const fromY = fromNode.y + (fromNode.height || 60);
          const toX = toNode.x + (toNode.width || 100) / 2;
          const toY = toNode.y;

          return (
            <line
              key={index}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="#8b5cf6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}

        {/* Nodes */}
        {diagram.nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x},${node.y})`}>
            <rect
              x="0"
              y="0"
              width={node.width || 100}
              height={node.height || 60}
              rx="10"
              fill="rgba(139, 92, 246, 0.1)"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <text
              x={(node.width || 100) / 2}
              y={node.sublabel ? 25 : 35}
              textAnchor="middle"
              fill="#8b5cf6"
              fontSize="12"
            >
              {node.label}
            </text>
            {node.sublabel && (
              <text
                x={(node.width || 100) / 2}
                y={45}
                textAnchor="middle"
                fill="#8b5cf6"
                fontSize="10"
              >
                {node.sublabel}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================
// Main Article Page Component
// ============================================
export function ArticlePage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const activeTab = searchParams.get('tab') || '';

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      
      // Fetch article
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', articleSlug)
        .eq('published', true)
        .single();

      if (articleError) throw articleError;

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('article_sections')
        .select('*')
        .eq('article_id', articleData.id)
        .order('display_order', { ascending: true });

      if (sectionsError) throw sectionsError;

      setArticle({
        ...articleData,
        sections: sectionsData || []
      });

      // Set default tab if not specified
      if (!searchParams.get('tab') && sectionsData && sectionsData.length > 0) {
        setSearchParams({ tab: sectionsData[0].tab_key });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Article non trouvé');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article non trouvé</h1>
          <button
            onClick={() => navigate('/')}
            className="text-violet-400 hover:text-violet-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const IntroIcon = getIcon(article.intro_icon);
  const activeSection = article.sections?.find(s => s.tab_key === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent" />
        {article.header_image && (
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.header_image})` }}
          />
        )}
        
        <div className="relative container mx-auto px-4 py-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-gray-300">
              {article.description}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="py-16 bg-gradient-to-b from-[#0a0a0f] to-gray-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <IntroIcon className="w-8 h-8 text-violet-400" />
              <h2 className="text-2xl font-bold text-white">{article.intro_title}</h2>
            </div>
            
            {article.intro_content && (
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {article.intro_content}
              </p>
            )}

            {/* Intro Cards */}
            {article.intro_cards && article.intro_cards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {article.intro_cards.map((card, index) => {
                  const CardIcon = getIcon(card.icon);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-violet-500/30 transition-colors"
                    >
                      <CardIcon className="w-8 h-8 text-violet-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Diagram */}
            {article.diagram && <DiagramRenderer diagram={article.diagram} />}
          </motion.div>
        </div>
      </section>

      {/* Tabs Navigation */}
      {article.sections && article.sections.length > 0 && (
        <>
          <nav className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
                {article.sections.map((section) => {
                  const TabIcon = getIcon(section.tab_icon);
                  const isActive = activeTab === section.tab_key;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSearchParams({ tab: section.tab_key })}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-violet-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      {section.tab_label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Section Content */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  {activeSection && (
                    <motion.div
                      key={activeSection.tab_key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      {activeSection.content.blocks.map((block, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ContentBlockRenderer block={block} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
