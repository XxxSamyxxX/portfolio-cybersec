import React from 'react';
import { Trophy, ExternalLink, Target, Award, Flag } from 'lucide-react';

interface TryHackMeStats {
  rank: string;
  points?: number;
  challenges?: number;
}

interface TryHackMeCardProps {
  stats: TryHackMeStats;
  onPlatformClick: (platform: string) => void;
}

export const TryHackMeCard: React.FC<TryHackMeCardProps> = ({ stats, onPlatformClick }) => {
  return (
    <div
      onClick={() => onPlatformClick('tryhackme')}
      className="group relative bg-surface-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyber-orange-500/20
                hover:border-cyber-orange-500/60 transition-all duration-300 cursor-pointer
                hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,107,53,0.15)]
                flex flex-col h-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyber-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex items-center gap-4 mb-6">
        <div className="p-3 bg-cyber-orange-500/10 rounded-xl border border-cyber-orange-500/30 group-hover:scale-110 transition-transform duration-300">
          <Trophy className="w-8 h-8 text-cyber-orange-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-wide">TryHackMe</h3>
          <p className="text-cyber-orange-400 font-mono text-sm">{stats.rank}</p>
        </div>
      </div>

      <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
        Apprentissage guidé et CTF. Labs complets couvrant l'Active Directory, le Réseau et le Web.
      </p>

      <div className="relative z-10 grid grid-cols-3 gap-2 mb-6">
        {[
          { icon: Target, label: "Rooms", value: "100+" },
          { icon: Award, label: "Rank", value: stats.rank },
          { icon: Flag, label: "Badges", value: "19" }
        ].map((stat, i) => (
          <div key={i} className="bg-black/50 p-2 rounded-lg border border-cyber-orange-500/20 text-center group-hover:border-cyber-orange-500/40 transition-colors">
            <stat.icon className="w-4 h-4 text-cyber-orange-400 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 uppercase font-bold">{stat.label}</p>
            <p className="text-sm font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <a
        href="https://tryhackme.com/p/SamyDJE"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 mt-auto flex items-center gap-2 text-cyber-orange-400 text-sm font-semibold group/link hover:underline"
      >
        <span>Voir mon profil</span>
        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
      </a>
    </div>
  );
};