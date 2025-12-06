import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CertificationDetail } from '../components/CertificationDetail';
import { supabase } from '../lib/supabase';
import { Certification } from '../types/certification';

export const DynamicCertificationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: certification, isLoading, error } = useQuery<Certification | null>({
    queryKey: ['certification', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw error;
      }
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (error || !certification) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/certifications')}
            className="group mb-8 flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors"
          >
            <div className="p-2 rounded-lg border border-white/10 group-hover:border-amber-500/50 bg-[#0a0a0f] transition-all group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Retour aux certifications</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Certification non trouvée</h1>
            <p className="text-gray-400 mb-6">
              La certification que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <button
              onClick={() => navigate('/certifications')}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Voir toutes les certifications
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${certification.title} | Samy DJEDJIG`}
        description={certification.description}
        keywords={`${certification.title}, ${certification.provider}, certification, cybersécurité, ${certification.skills?.join(', ') || ''}`}
        url={`https://samydjedjig.com/certifications/${certification.slug}`}
        type="article"
      />
      <div className="min-h-screen pt-24 pb-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/certifications')}
            className="group mb-8 flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-amber-400 transition-colors"
          >
            <div className="p-2 rounded-lg border border-white/10 group-hover:border-amber-500/50 bg-[#0a0a0f] transition-all group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Retour aux certifications</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CertificationDetail certification={certification} />
          </motion.div>
        </div>
      </div>
    </>
  );
};
