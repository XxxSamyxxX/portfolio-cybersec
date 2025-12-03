import React from 'react';
import { Sword, ExternalLink, Target, Award, Flag } from 'lucide-react';

interface HackTheBoxStats {
  rank: string;
  points?: number;
}

interface HackTheBoxCardProps {
  stats: HackTheBoxStats;
  onPlatformClick: (platform: string) => void;
}

export const HackTheBoxCard: React.FC<HackTheBoxCardProps> = ({ stats, onPlatformClick }) => {
  return (
    <div
      onClick={() => onPlatformClick('hackthebox')}
      className="group relative bg-surface-900/80 backdrop-blur-sm p-6 rounded-2xl border border-cyber-green-500/20
                hover:border-cyber-green-500/60 transition-all duration-300 cursor-pointer
                hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]
                flex flex-col h-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-cyber-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-green-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex items-center gap-4 mb-6">
        <div className="p-3 bg-cyber-green-500/10 rounded-xl border border-cyber-green-500/30 group-hover:scale-110 transition-transform duration-300">
          <Sword className="w-8 h-8 text-cyber-green-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-wide">HackTheBox</h3>
          <p className="text-cyber-green-400 font-mono text-sm">Rank: {stats.rank}</p>
        </div>
      </div>

      <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
        Pentesting avancé. Machines et challenges réalistes pour perfectionner l'exploitation en conditions réelles.
      </p>

      <div className="relative z-10 grid grid-cols-3 gap-2 mb-6">
        {[
          { icon: Target, label: "Machines", value: "0" },
          { icon: Award, label: "Status", value: "In Progress" },
          { icon: Flag, label: "Goal", value: "CPTS" }
        ].map((stat, i) => (
          <div key={i} className="bg-black/50 p-2 rounded-lg border border-cyber-green-500/20 text-center group-hover:border-cyber-green-500/40 transition-colors">
            <stat.icon className="w-4 h-4 text-cyber-green-400 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 uppercase font-bold">{stat.label}</p>
            <p className="text-sm font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <a
        href="https://app.hackthebox.com/profile/2129647"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 mt-auto flex items-center gap-2 text-cyber-green-400 text-sm font-semibold group/link hover:underline"
      >
        <span>Voir mon profil</span>
        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
      </a>
    </div>
  );
};