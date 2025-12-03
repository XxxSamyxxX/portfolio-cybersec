import React, { useState, useEffect } from 'react';
import { Laptop, Linkedin, Mail, Menu, X, Award, Github, Terminal, Sparkles, Code2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const imageUrl = 'https://kqcszuxrnppqlsdzrccz.supabase.co/storage/v1/object/public/profile-images/photo.jpg';

interface HeaderProps {
  setShowProfile: (show: boolean) => void;
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ setShowProfile, setActiveSection, activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileAnimating, setIsProfileAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / windowHeight) * 100;

      setScrolled(scrollPosition > 20);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { to: '/writeups', label: 'Write-ups', icon: Terminal },
    { to: '/projects', label: 'Projects', icon: Code2 },
    { to: '/certifications', label: 'Certifications', icon: Award }
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan-500 via-cyber-green-500 to-cyber-orange-500 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b
        ${scrolled
          ? 'bg-dark-900/95 backdrop-blur-xl border-cyber-cyan-500/20 py-3 shadow-lg shadow-cyber-cyan-500/5'
          : 'bg-transparent border-transparent py-6'}`}
      >
        <nav className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 z-20 group relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyber-cyan-500/20 blur-xl rounded-full group-hover:bg-cyber-cyan-500/30 transition-all" />
                <div className="relative p-2.5 bg-gradient-to-br from-cyber-cyan-500/10 to-cyber-green-500/10 rounded-xl border border-cyber-cyan-500/30 group-hover:border-cyber-cyan-500/50 transition-all">
                  <Terminal className="w-6 h-6 text-cyber-cyan-400 group-hover:text-cyber-cyan-300 transition-colors" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-gradient-to-r from-white via-cyber-cyan-100 to-cyber-green-100 bg-clip-text text-transparent tracking-tight">
                  Samy DJEDJIG
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-green-500 animate-pulse" />
                  <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Cybersecurity</span>
                </div>
              </div>
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden z-20 p-2.5 rounded-xl bg-dark-800/50 border border-white/10 hover:border-cyber-cyan-500/50 transition-all group"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-cyber-cyan-400" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-400 group-hover:text-cyber-cyan-400 transition-colors" />
                )}
              </motion.div>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-0 bg-dark-950/98 backdrop-blur-xl lg:hidden z-10"
                >
                  <div className="flex flex-col items-center justify-center h-full space-y-6 px-6">
                    <motion.button
                      onClick={handleProfileClick}
                      className="w-full max-w-sm relative group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan-500 to-cyber-green-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 px-8 py-5 rounded-2xl flex items-center justify-center gap-4 border border-white/10">
                        <img
                          src={imageUrl}
                          alt="Profile"
                          className="w-12 h-12 rounded-full border-2 border-white/30 ring-4 ring-white/10"
                        />
                        <div className="text-left">
                          <span className="font-bold text-lg text-white block">Mon Profil</span>
                          <span className="text-xs text-white/70">Voir les détails</span>
                        </div>
                        <Sparkles className="w-5 h-5 text-white/80" />
                      </div>
                    </motion.button>

                    <div className="w-full max-w-sm space-y-3">
                      {navLinks.map((link, index) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.to;

                        return (
                          <motion.div
                            key={link.to}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={link.to}
                              className={`flex items-center gap-4 px-6 py-4 rounded-xl border transition-all group
                                ${isActive
                                  ? 'bg-cyber-cyan-500/10 border-cyber-cyan-500/50 text-cyber-cyan-400'
                                  : 'bg-dark-800/50 border-white/5 text-gray-400 hover:border-cyber-cyan-500/30 hover:text-white'}`}
                              onClick={() => { setActiveSection(link.label.toLowerCase()); setIsMenuOpen(false); }}
                            >
                              <Icon className={`w-5 h-5 ${isActive ? 'text-cyber-cyan-400' : 'text-gray-500 group-hover:text-cyber-cyan-400'} transition-colors`} />
                              <span className="text-lg font-medium">{link.label}</span>
                              {isActive && (
                                <motion.div
                                  layoutId="mobile-active-indicator"
                                  className="ml-auto w-2 h-2 rounded-full bg-cyber-cyan-500"
                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}

                      <motion.button
                        onClick={scrollToContact}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-xl border bg-dark-800/50 border-white/5 text-gray-400 hover:border-cyber-cyan-500/30 hover:text-white transition-all group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Mail className="w-5 h-5 text-gray-500 group-hover:text-cyber-cyan-400 transition-colors" />
                        <span className="text-lg font-medium">Contact</span>
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                      {[
                        { href: 'https://github.com/XxxSamyxxX', icon: Github, color: 'cyan' },
                        { href: 'https://www.linkedin.com/in/samy-djedjig/', icon: Linkedin, color: 'green' },
                        { href: 'mailto:samydje26@gmail.com', icon: Mail, color: 'orange' }
                      ].map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <motion.a
                            key={index}
                            href={social.href}
                            target={social.href.startsWith('http') ? '_blank' : undefined}
                            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`p-4 bg-dark-800 rounded-xl border border-white/10 hover:border-cyber-${social.color}-500/50 transition-all group`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Icon className={`w-6 h-6 text-gray-400 group-hover:text-cyber-${social.color}-400 transition-colors`} />
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2.5 text-sm font-medium tracking-wide transition-all rounded-lg group
                      ${isActive ? 'text-cyber-cyan-400' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveSection(link.label.toLowerCase())}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute inset-0 bg-cyber-cyan-500/10 border border-cyber-cyan-500/30 rounded-lg"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all" />
                    )}
                  </Link>
                );
              })}

              <motion.button
                onClick={handleProfileClick}
                className="relative mx-3 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan-500 to-cyber-green-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-cyber-cyan-600 to-cyber-green-600 rounded-full border border-white/10">
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-7 h-7 rounded-full border-2 border-white/30"
                  />
                  <span className="font-semibold text-sm text-white pr-1">Mon Profil</span>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-4 h-4 text-white/80" />
                  </motion.div>
                </div>
              </motion.button>

              <button
                onClick={scrollToContact}
                className={`px-4 py-2.5 text-sm font-medium tracking-wide transition-all rounded-lg
                  ${activeSection === 'contact' ? 'text-cyber-cyan-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                Contact
              </button>

              <div className="flex items-center gap-1 pl-4 ml-4 border-l border-white/10">
                {[
                  { href: 'https://github.com/XxxSamyxxX', icon: Github, color: 'cyan' },
                  { href: 'https://www.linkedin.com/in/samy-djedjig/', icon: Linkedin, color: 'green' },
                  { href: 'mailto:samydje26@gmail.com', icon: Mail, color: 'orange' }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`p-2 text-gray-400 hover:text-cyber-${social.color}-400 hover:bg-white/5 rounded-lg transition-all`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
