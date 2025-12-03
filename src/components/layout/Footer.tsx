import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pure-black border-t-4 border-electric-blue relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-electric-blue border-2 border-pure-white">
                <Terminal className="w-6 h-6 text-pure-black" />
              </div>
              <span className="text-2xl font-black text-pure-white uppercase tracking-wider">
                SAMY DJEDJIG
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              IT Admin. Pentester. Builder.
            </p>
          </div>

          <div>
            <h3 className="font-black text-pure-white mb-4 uppercase text-sm tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/writeups" className="text-gray-400 hover:text-electric-blue transition-colors font-bold uppercase text-xs">
                  Writeups
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-neon-pink transition-colors font-bold uppercase text-xs">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-gray-400 hover:text-acid-lime transition-colors font-bold uppercase text-xs">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-pure-white mb-4 uppercase text-sm tracking-wider">
              Réseaux
            </h3>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/samy-djedjig/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-3 bg-pure-white text-pure-black hover:bg-acid-lime border-2 border-pure-black transition-all duration-200"
                 title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/XxxSamyxxX"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="p-3 bg-pure-white text-pure-black hover:bg-electric-blue border-2 border-pure-black transition-all duration-200"
                 title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:samydje26@gmail.com"
                 className="p-3 bg-pure-white text-pure-black hover:bg-neon-pink border-2 border-pure-black transition-all duration-200"
                 title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                © {currentYear} Samy DJEDJIG
            </p>

            <Link
              to="/admin/analytics"
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-acid-lime transition-colors font-bold uppercase"
              title="Voir les statistiques"
            >
              <Activity className="w-3 h-3" />
              <span className="font-mono">SYSTEM ONLINE</span>
            </Link>
        </div>
      </div>
    </footer>
  );
};