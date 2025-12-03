import React, { useState, useEffect } from 'react';
import { ScrollReveal } from './ScrollReveal';
import {
  Mail,
  MapPin,
  Linkedin,
  FileText,
  Download,
  Building2,
  CheckCircle2,
  MessageSquare
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
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-[#00ff41] font-mono text-sm">root@portfolio:~$</span>
              <span className="text-gray-400 font-mono text-sm">cat contact.txt</span>
            </div>
            <h2 className="text-4xl font-bold text-white font-mono tracking-tight mb-2">
              &gt; Contact & <span className="text-violet-400">Connexion</span>
            </h2>
            <div className="mt-2 h-[2px] w-64 mx-auto bg-gradient-to-r from-violet-500 via-blue-500 to-transparent"></div>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4 font-mono text-sm">
              Technicien ou Pentester ? Discutons technique, opportunités ou Active Directory.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <ScrollReveal>
            <div className="bg-[#0d0d12] border border-violet-500/20 shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
              <div className="border-b border-violet-500/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-gray-400 font-mono text-xs ml-2">contact/info.sh</span>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 font-mono">
                  <span className="w-1 h-6 bg-violet-500"></span>
                  Me contacter
                </h3>

                <div className="space-y-6">
                  <a
                    href="mailto:samydje26@gmail.com"
                    className="flex items-center gap-4 p-4 bg-black border border-violet-500/20 hover:border-violet-500/50 transition-all group/item"
                  >
                    <div className="p-3 bg-[#1a1a1f] text-violet-400 group-hover/item:text-white transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-mono font-medium">EMAIL</p>
                      <p className="text-white font-mono group-hover/item:text-violet-300 transition-colors">
                        samydje26@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/samy-djedjig/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-black border border-blue-500/20 hover:border-blue-500/50 transition-all group/item"
                  >
                    <div className="p-3 bg-[#1a1a1f] text-blue-400 group-hover/item:text-white transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-mono font-medium">LINKEDIN</p>
                      <p className="text-white font-mono group-hover/item:text-blue-300 transition-colors">
                        Samy DJEDJIG
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-black border border-white/5 opacity-80">
                    <div className="p-3 bg-[#1a1a1f] text-gray-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-mono font-medium">LOCATION</p>
                      <p className="text-gray-300 font-mono">Béziers, France</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-[#0d0d12] border border-blue-500/20 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex flex-col">
              <div className="border-b border-blue-500/20 p-3 bg-[#1a1a1f] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-gray-400 font-mono text-xs ml-2">status/professional.log</span>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 font-mono">
                  <span className="w-1 h-6 bg-blue-500"></span>
                  Statut Professionnel
                </h3>

                <div className="bg-black p-6 border border-white/5 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white">
                      <Building2 className="w-6 h-6 text-violet-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg font-mono">En poste chez SLB</h4>
                      <p className="text-blue-300 text-sm font-mono mb-3">Alternance 2023 - 2026</p>
                      <div className="flex items-center gap-2 text-green-400 text-xs font-mono bg-green-400/10 w-fit px-2 py-1 border border-green-400/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Actuellement indisponible
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-gray-400 text-sm leading-relaxed font-mono">
                    Bien que je ne sois pas en recherche active, je reste <strong>toujours ouvert</strong> pour :
                  </p>
                  <ul className="space-y-2">
                    {['Échanger sur des sujets techniques (Pentest/AD)', 'Partager des ressources & Write-ups', 'Étendre mon réseau professionnel'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-violet-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="mt-auto w-full group relative overflow-hidden bg-white text-black py-4 px-6 font-mono font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {downloading ? (
                       <>
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Téléchargement...</span>
                       </>
                    ) : (
                       <>
                          <FileText className="w-5 h-5" />
                          <span>Télécharger mon CV complet</span>
                          <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-violet-600" />
                       </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};