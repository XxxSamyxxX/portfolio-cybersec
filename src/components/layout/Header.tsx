import React, { useState, useEffect } from 'react';
import { Laptop, Linkedin, Mail, Menu, X, Award, Github } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Constants
const imageUrl = 'https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/profile-images/photo.jpg';

// Types
interface HeaderProps {
  setShowProfile: (show: boolean) => void;
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ setShowProfile, setActiveSection, activeSection }) => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileAnimating, setIsProfileAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Détection du scroll pour ajuster l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const headerOffset = 100;
          const elementPosition = contactSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        setActiveSection('contact');
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 100;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setActiveSection('contact');
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveSection('home');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileAnimating(true);
    setTimeout(() => {
      setShowProfile(true);
      setIsProfileAnimating(false);
    }, 300);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-4 border-pure-black
      ${scrolled
        ? 'bg-pure-black/95 py-3'
        : 'bg-pure-black/80 py-4'}`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 z-20 group"
          >
            <div className="p-2 bg-electric-blue border-2 border-pure-black group-hover:bg-acid-lime transition-all duration-200">
              <Laptop className="w-6 h-6 text-pure-black transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-xl font-black text-pure-white group-hover:text-electric-blue transition-colors hidden sm:block uppercase tracking-wider">
              SAMY DJEDJIG
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-20 text-gray-400 hover:text-cyber-cyan-400 transition-colors p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className={`fixed inset-0 bg-night-900 transition-all duration-300 md:hidden
            ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}>
            <div className="flex flex-col items-center justify-start pt-28 h-full space-y-8 bg-night-900 px-6">
              <button
                onClick={handleProfileClick}
                className={`w-full bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 text-white px-6 py-4 rounded-xl
                         hover:from-cyber-cyan-500 hover:to-cyber-green-500 transition-all duration-300
                         transform hover:scale-105 flex items-center justify-center gap-3
                         shadow-lg shadow-cyber-cyan-500/20
                         ${isProfileAnimating ? 'scale-95 opacity-80' : ''}`}
              >
                <img 
                  src={imageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                />
                <span className="font-bold text-lg">Mon Profil</span>
              </button>

              <div className="w-full space-y-4">
                <Link
                  to="/writeups"
                  className={`block text-xl uppercase tracking-wider hover:text-cyber-cyan-400 transition-colors w-full text-center py-2
                    ${location.pathname === '/writeups' ? 'text-cyber-cyan-500 font-bold' : 'text-gray-400'}`}
                  onClick={() => { setActiveSection('writeups'); setIsMenuOpen(false); }}
                >
                  Write-ups
                </Link>
                <Link
                  to="/projects"
                  className={`block text-xl uppercase tracking-wider hover:text-cyber-cyan-400 transition-colors w-full text-center py-2
                    ${location.pathname === '/projects' ? 'text-cyber-cyan-500 font-bold' : 'text-gray-400'}`}
                  onClick={() => { setActiveSection('projects'); setIsMenuOpen(false); }}
                >
                  Projects
                </Link>
                <Link
                  to="/certifications"
                  className={`flex items-center justify-center gap-2 text-xl uppercase tracking-wider hover:text-cyber-cyan-400 transition-colors w-full py-2
                    ${location.pathname === '/certifications' ? 'text-cyber-cyan-500 font-bold' : 'text-gray-400'}`}
                  onClick={() => { setActiveSection('certifications'); setIsMenuOpen(false); }}
                >
                  <Award className="w-5 h-5" />
                  <span>Certifications</span>
                </Link>
                <button
                  onClick={scrollToContact}
                  className={`block text-xl uppercase tracking-wider hover:text-cyber-cyan-400 transition-colors w-full text-center py-2
                    ${activeSection === 'contact' ? 'text-cyber-cyan-500 font-bold' : 'text-gray-400'}`}
                >
                  Contact
                </button>
              </div>

              <div className="flex items-center gap-6 mt-auto pb-10">
                <a href="https://github.com/XxxSamyxxX" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface-900 rounded-full text-gray-400 hover:text-white hover:bg-cyber-cyan-500 transition-all border border-cyber-cyan-500/20">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/samy-djedjig/" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface-900 rounded-full text-gray-400 hover:text-white hover:bg-cyber-green-500 transition-all border border-cyber-green-500/20">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:samydje26@gmail.com" className="p-3 bg-surface-900 rounded-full text-gray-400 hover:text-white hover:bg-cyber-orange-500 transition-all border border-cyber-orange-500/20">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              to="/writeups"
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200
                ${location.pathname === '/writeups'
                  ? 'bg-electric-blue text-pure-black border-2 border-pure-black'
                  : 'text-pure-white hover:text-electric-blue'}`}
              onClick={() => setActiveSection('writeups')}
            >
              Writeups
            </Link>
            <Link
              to="/projects"
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200
                ${location.pathname === '/projects'
                  ? 'bg-neon-pink text-pure-black border-2 border-pure-black'
                  : 'text-pure-white hover:text-neon-pink'}`}
              onClick={() => setActiveSection('projects')}
            >
              Projets
            </Link>

            <button
              onClick={handleProfileClick}
              className={`mx-3 flex items-center gap-2 px-4 py-2 bg-acid-lime text-pure-black border-2 border-pure-black font-black text-xs uppercase
                       hover:bg-pure-white transition-all duration-200
                       ${isProfileAnimating ? 'scale-95 opacity-80' : ''}`}
            >
              <img
                src={imageUrl}
                alt="Profile"
                className="w-5 h-5 rounded-full border-2 border-pure-black"
              />
              <span>Profil</span>
            </button>

            <Link
              to="/certifications"
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200
                ${location.pathname === '/certifications'
                  ? 'bg-holo-purple text-pure-white border-2 border-pure-black'
                  : 'text-pure-white hover:text-holo-purple'}`}
              onClick={() => setActiveSection('certifications')}
            >
              <Award className="w-4 h-4" />
              <span>Certif</span>
            </Link>
            <button
              onClick={scrollToContact}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200
                ${activeSection === 'contact'
                  ? 'bg-cyber-orange text-pure-black border-2 border-pure-black'
                  : 'text-pure-white hover:text-cyber-orange'}`}
            >
              Contact
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-2 pl-4 border-l-2 border-electric-blue ml-4">
            <a href="https://github.com/XxxSamyxxX"
               target="_blank"
               rel="noopener noreferrer"
               className="text-pure-white hover:bg-electric-blue hover:text-pure-black p-2 border-2 border-transparent hover:border-pure-black transition-all duration-200"
               title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/samy-djedjig/"
               target="_blank"
               rel="noopener noreferrer"
               className="text-pure-white hover:bg-acid-lime hover:text-pure-black p-2 border-2 border-transparent hover:border-pure-black transition-all duration-200"
               title="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:samydje26@gmail.com"
               className="text-pure-white hover:bg-neon-pink hover:text-pure-black p-2 border-2 border-transparent hover:border-pure-black transition-all duration-200"
               title="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};