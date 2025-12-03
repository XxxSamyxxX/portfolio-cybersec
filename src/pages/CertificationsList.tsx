import React, { useEffect } from 'react';
import { Award, Terminal, Cpu, Shield, BookOpen } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { THMCyberSecurity101Certification } from '../components/certifications/THMCyberSecurity101Certification';
import { THMPreSecurityCertification } from '../components/certifications/THMPreSecurityCertification';

export const CertificationsList: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead 
        title="Certifications & Diplômes | Samy DJEDJIG"
        description="Parcours de certification : TryHackMe Cyber Security 101, Pre Security. Master Cybersécurité EPSI."
        keywords="TryHackMe, Cybersécurité, Certification, EPSI, Master, Pre Security"
        url="https://samydjedjig.com/certifications"
      />
      
      <div className="min-h-screen pt-32 pb-24 bg-black text-gray-100">
        <div className="container mx-auto px-6">
          
          {/* En-tête */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="p-4 bg-[#1a1a1f] rounded-2xl border border-white/10 mb-6 shadow-2xl">
              <Award className="w-12 h-12 text-violet-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Formation & Certifications
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              Validation continue de mes compétences en cybersécurité.
              <br />
              <span className="text-sm font-mono text-violet-400 mt-2 block">
                En progression : Top 5% TryHackMe
              </span>
            </p>
          </div>

          {/* SECTION CERTIFICATIONS TRYHACKME */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6 pl-2">
                <Shield className="w-6 h-6 text-[#9FEF00]" />
                <h2 className="text-2xl font-bold text-white">Certifications TryHackMe</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <THMCyberSecurity101Certification />
                <THMPreSecurityCertification />
            </div>
          </div>

          {/* SECTION EN PRÉPARATION */}
          <div>
            <div className="flex items-center gap-3 mb-6 pl-2">
                <Terminal className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">Objectifs & En Préparation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Objectif 1 */}
                <div className="bg-[#1a1a1f] rounded-lg p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">
                            En cours
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">SOC Level 1</h3>
                    <p className="text-gray-400 text-sm">TryHackMe - Parcours analyste SOC</p>
                </div>

                {/* Objectif 2 */}
                <div className="bg-[#1a1a1f] rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                            Planifié
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">CompTIA Security+</h3>
                    <p className="text-gray-400 text-sm">Certification fondamentale cybersécurité</p>
                </div>

                {/* Objectif 3 */}
                <div className="bg-[#1a1a1f] rounded-lg p-6 border border-red-500/20 hover:border-red-500/40 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                            Objectif 2026
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">eJPT / CPTS</h3>
                    <p className="text-gray-400 text-sm">Certifications Pentest pratiques</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}