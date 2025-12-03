import React, { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { THMCyberSecurity101Certification } from '../components/certifications/THMCyberSecurity101Certification';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const THMCyberSecurity101Page: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="TryHackMe Cyber Security 101 | Samy DJEDJIG"
        description="Certification TryHackMe Cyber Security 101 - Fondamentaux de la cybersécurité offensive et défensive."
        keywords="TryHackMe, Cyber Security 101, certification, cybersécurité, pentest, CTF"
        url="https://samydjedjig.com/certifications/thm-cybersecurity101"
        type="article"
        publishedTime="2024-12-15T00:00:00+00:00"
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
            <THMCyberSecurity101Certification />
          </motion.div>
        </div>
      </div>
    </>
  );
};
