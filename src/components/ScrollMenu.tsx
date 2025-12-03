import React, { useEffect, useState } from 'react';

interface ScrollMenuProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  color: string;
  ascii: string;
}

export const ScrollMenu: React.FC<ScrollMenuProps> = ({ activeSection, setActiveSection }) => {
  const menuItems: MenuItem[] = [
    { id: 'writeups', label: 'WRITEUPS', color: '#00D9FF', ascii: '>' },
    { id: 'projects', label: 'PROJETS', color: '#CCFF00', ascii: '⚡' },
    { id: 'formation', label: 'CERTIF', color: '#FFFF00', ascii: '▓' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block font-mono">
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative block text-left transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex flex-col items-start">
                    <span
                      className="text-2xl leading-none font-bold"
                      style={{ color: isActive ? item.color : '#333' }}
                    >
                      {item.ascii}
                    </span>
                  </div>

                  {isActive && (
                    <div
                      className="absolute -left-1 top-0 bottom-0 w-1"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}`
                      }}
                    />
                  )}
                </div>

                <div>
                  <span
                    className={`text-sm font-black tracking-wider transition-all duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'
                    }`}
                    style={{ color: isActive ? item.color : '#666' }}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <div className="text-xs mt-0.5 opacity-60" style={{ color: item.color }}>
                      Documentation CTF : HackTheBox & TryHackMe
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};