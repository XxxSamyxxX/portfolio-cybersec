import {
  Award,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const THMCyberSecurity101Certification = () => {
  return (
    <div className="bg-[#1a1a1f] rounded-lg overflow-hidden border border-[#9FEF00]/20 hover:border-[#9FEF00]/40 transition-all duration-300 group h-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-semibold text-[#9FEF00]">
                Cyber Security 101
              </h3>
              <span className="bg-[#9FEF00]/20 text-[#9FEF00] px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <Award className="w-4 h-4" />
                Obtenue
              </span>
            </div>
            <span className="text-sm bg-[#9FEF00]/10 text-[#9FEF00] px-3 py-1 rounded-full inline-block mt-2">
              TryHackMe
            </span>
          </div>
          <div className="relative group/badge">
            <img 
              src="https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/assets/THM.png"
              alt="Badge TryHackMe"
              className="w-24 h-24 object-contain rounded-lg bg-[#9FEF00]/10 p-3 transition-transform duration-300 group-hover/badge:scale-105"
            />
          </div>
        </div>

        {/* Date de délivrance */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>2024</span>
        </div>

        <div className="space-y-4">
          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm">
            Parcours complet d'introduction à la cybersécurité couvrant les fondamentaux : 
            réseaux, cryptographie, vulnérabilités web, et initiation au pentesting.
          </p>

          {/* Compétences */}
          <div className="bg-[#2a2a2f] p-4 rounded-lg">
            <h4 className="font-medium mb-3 text-[#9FEF00] text-sm">Compétences acquises</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#9FEF00] mt-0.5" />
                <span>Fondamentaux réseaux et protocoles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#9FEF00] mt-0.5" />
                <span>Introduction à la cryptographie</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#9FEF00] mt-0.5" />
                <span>Vulnérabilités Web (OWASP)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-[#9FEF00] mt-0.5" />
                <span>Outils de base (Nmap, Burp)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
