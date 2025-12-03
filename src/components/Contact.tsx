import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Linkedin,
  FileText,
  Download,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-pure-white uppercase tracking-tight mb-4">
            CONTACTEZ <span className="text-cyber-orange">MOI</span>
          </h2>
          <div className="w-32 h-2 bg-cyber-orange mx-auto border-4 border-pure-black"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg font-medium">
            Discutons technique, opportunités ou Active Directory.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-pure-black border-4 border-electric-blue p-6 shadow-brutal"
          >
            <h3 className="text-2xl font-black text-pure-white uppercase mb-6">CONTACT</h3>

            <div className="space-y-4">
              <a
                href="mailto:samydje26@gmail.com"
                className="flex items-center gap-4 p-4 bg-pure-black border-2 border-electric-blue hover:bg-electric-blue hover:text-pure-black transition-all duration-200 group"
              >
                <div className="p-2 bg-electric-blue border-2 border-pure-black group-hover:bg-pure-black">
                  <Mail className="w-6 h-6 text-pure-black group-hover:text-electric-blue" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                  <p className="text-pure-white font-bold">samydje26@gmail.com</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/samy-djedjig/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-pure-black border-2 border-acid-lime hover:bg-acid-lime hover:text-pure-black transition-all duration-200 group"
              >
                <div className="p-2 bg-acid-lime border-2 border-pure-black group-hover:bg-pure-black">
                  <Linkedin className="w-6 h-6 text-pure-black group-hover:text-acid-lime" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">LinkedIn</p>
                  <p className="text-pure-white font-bold">Samy DJEDJIG</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-pure-black border-2 border-gray-700">
                <div className="p-2 bg-gray-700 border-2 border-pure-black">
                  <MapPin className="w-6 h-6 text-pure-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Localisation</p>
                  <p className="text-gray-300 font-bold">Béziers, France</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-pure-black border-4 border-neon-pink p-6 shadow-brutal flex flex-col"
          >
            <h3 className="text-2xl font-black text-pure-white uppercase mb-6">STATUT</h3>

            <div className="bg-pure-black border-2 border-neon-pink p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-neon-pink border-2 border-pure-black">
                  <Building2 className="w-6 h-6 text-pure-black" />
                </div>
                <div>
                  <h4 className="font-black text-pure-white text-lg uppercase">SLB</h4>
                  <p className="text-neon-pink text-xs font-bold mb-2">2023 - 2026</p>
                  <div className="flex items-center gap-2 text-acid-lime text-xs font-black bg-pure-black px-2 py-1 border-2 border-acid-lime w-fit uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid-lime opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-acid-lime"></span>
                    </span>
                    Indisponible
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-gray-400 text-sm font-medium">
                Ouvert pour :
              </p>
              <ul className="space-y-2">
                {['Discussions techniques', 'Partage de ressources', 'Networking'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-neon-pink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="mt-auto w-full group bg-cyber-orange text-pure-black py-4 px-6 font-black uppercase border-4 border-pure-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-3">
                {downloading ? (
                   <>
                      <div className="w-5 h-5 border-2 border-pure-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Téléchargement...</span>
                   </>
                ) : (
                   <>
                      <FileText className="w-5 h-5" />
                      <span>Télécharger CV</span>
                      <Download className="w-4 h-4" />
                   </>
                )}
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};