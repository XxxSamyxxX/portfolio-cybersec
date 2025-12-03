import React from 'react';
import { Sword, ExternalLink, Target, Award, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      onClick={() => onPlatformClick('hackthebox')}
      className="group relative bg-dark-800/80 backdrop-blur-sm p-6 rounded-2xl border border-cyber-green-500/20
                hover:border-cyber-green-500/60 transition-all duration-300 cursor-pointer
                flex flex-col h-full overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-cyber-green-500/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-cyber-green-500/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 flex items-center gap-4 mb-6">
        <motion.div
          className="p-3 bg-gradient-to-br from-cyber-green-600 to-cyber-green-700 rounded-xl shadow-lg shadow-cyber-green-500/20"
          whileHover={{ scale: 1.15, rotate: 5 }}
        >
          <Sword className="w-8 h-8 text-white" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-wide">HackTheBox</h3>
          <p className="text-cyber-green-400 font-mono text-sm font-semibold">Rank: {stats.rank}</p>
        </div>
      </div>

      <p className="relative z-10 text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
        Pentesting avancé. Machines et challenges réalistes pour perfectionner l'exploitation en conditions réelles.
      </p>

      <div className="relative z-10 grid grid-cols-3 gap-2 mb-6">
        {[
          { icon: Target, label: "Machines", value: "0" },
          { icon: Award, label: "Status", value: "In Progress" },
          { icon: Flag, label: "Goal", value: "CPTS" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-dark-900/70 p-3 rounded-lg border border-cyber-green-500/20 text-center hover:border-cyber-green-500/40 hover:bg-dark-900 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <stat.icon className="w-4 h-4 text-cyber-green-400 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">{stat.label}</p>
            <p className="text-sm font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <a
        href="https://app.hackthebox.com/profile/2129647"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 mt-auto flex items-center gap-2 text-cyber-green-400 text-sm font-semibold group/link hover:text-cyber-green-300 transition-colors"
      >
        <span>Voir mon profil</span>
        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:scale-110" />
      </a>
    </motion.div>
  );
};