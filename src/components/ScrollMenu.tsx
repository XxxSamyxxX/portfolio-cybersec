import React, { useEffect, useState } from 'react';
import { Target, Award, Code, Mail, User, Terminal } from 'lucide-react';

// Définition des types interne au fichier
interface ScrollMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const ScrollMenu: React.FC<ScrollMenuProps> = ({ activeSection, setActiveSection }) => {
  const [progress, setProgress] = useState(0);

  // Configuration du menu
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Identity', icon: User },
    { id: 'stats', label: 'Stats', icon: Target },
    { id: 'formation', label: 'Cursus', icon: Award },
    { id: 'projects', label: 'Lab & Projets', icon: Code },
    { id: 'writeups', label: 'Archives', icon: Terminal },
    { id: 'contact', label: 'Comms', icon: Mail }
  ];

  // Gestion du Scroll (Progress Bar + Active Section Detection)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calcul de la barre de progression
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);

      // 2. Détection de la section active améliorée
      const scrollPosition = window.scrollY + 200;

      let currentSection = 'home';

      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;

          if (scrollPosition >= top - 100) {
            currentSection = item.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  // Fonction de scroll fluide
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100; // Ajustement pour le header fixed
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      
      {/* Barre Verticale (Container) */}
      <div className="absolute right-[11px] top-0 bottom-0 w-px bg-white/5">
        {/* Barre de Progression (Néon) */}
        <div
          className="w-full bg-gradient-to-b from-cyber-cyan-500 via-cyber-green-500 to-cyber-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300 ease-out rounded-full"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Points de Navigation */}
      <div className="relative space-y-8">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id;
          
          return (
            <div key={item.id} className="group relative flex items-center justify-end">
              
              {/* Tooltip HUD (Apparaît au survol ou si actif) */}
              <div className={`absolute right-10 px-3 py-1.5
                            bg-black/90 border border-white/10 rounded backdrop-blur-md
                            transition-all duration-300 transform origin-right shadow-xl
                            ${isActive
                              ? 'opacity-100 translate-x-0 scale-100 border-cyber-cyan-500/30'
                              : 'opacity-0 translate-x-4 scale-90 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100'}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-cyber-cyan-400 font-bold' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                  {/* Index décoratif style Cyber */}
                  <span className="text-[8px] text-gray-700 font-mono">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Bouton de navigation (Style Losange Technique) */}
              <button
                onClick={() => scrollToSection(item.id)}
                className={`relative w-6 h-6 flex items-center justify-center transition-all duration-500 group outline-none
                          ${isActive ? 'scale-110' : 'hover:scale-110'}`}
                aria-label={`Aller à la section ${item.label}`}
              >
                {/* Forme du bouton (Carré tourné à 45deg) */}
                <div className={`absolute inset-0 bg-[#0a0a0f] border transition-all duration-500 ease-out rotate-45 rounded-[2px]
                              ${isActive
                                ? 'border-cyber-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-100'
                                : 'border-white/10 scale-75 group-hover:border-cyber-cyan-400/40 group-hover:scale-90'}`}
                />

                {/* Icône */}
                <item.icon
                  className={`relative z-10 w-3 h-3 transition-all duration-500 ease-out
                            ${isActive
                              ? 'text-cyber-cyan-400 opacity-100 scale-100'
                              : 'text-gray-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:text-cyber-cyan-300'}`}
                />

                {/* Point central (quand inactif) */}
                {!isActive && (
                  <div className="absolute w-1 h-1 bg-gray-600 rounded-full group-hover:opacity-0 transition-all duration-300" />
                )}

                {/* Pulse effect when active */}
                {isActive && (
                  <div className="absolute inset-0 border-2 border-cyber-cyan-500/30 rounded-[2px] rotate-45 animate-ping" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};