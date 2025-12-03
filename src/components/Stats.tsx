import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Zap, ArrowRight } from 'lucide-react';

interface StatsData {
  rank: string;
  points?: number;
  challenges?: number;
}

interface StatsProps {
  stats: {
    tryhackme: StatsData;
    hackthebox: StatsData;
    rootme: StatsData;
  };
}

export const Stats: React.FC<StatsProps> = () => {
  const navigate = useNavigate();

  const handlePlatformClick = (platform: string) => {
    navigate(`/writeups?platform=${platform.toLowerCase()}`);
  };

  const stats = {
    tryhackme: {
      rank: "Top 5%",
      machines: 20,
      challenges: 40
    },
    hackthebox: {
      rank: "Psychooo0",
      points: 0,
      machines: "0/20",
      progression: "0"
    },
    rootme: {
      rank: "N/A",
      points: 0,
      challenges: 0
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-pure-white uppercase tracking-tight mb-4">
            MES <span className="text-electric-blue">STATS</span>
          </h2>
          <div className="w-32 h-2 bg-electric-blue mx-auto border-4 border-pure-black"></div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => handlePlatformClick('tryhackme')}
              className="group relative bg-pure-black border-4 border-acid-lime p-8 cursor-pointer hover:translate-x-2 hover:translate-y-2 hover:shadow-none shadow-brutal-lime transition-all duration-200"
            >
              <div className="absolute top-4 right-4 text-acid-lime opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-pure-white uppercase">TryHackMe</h3>
                  <div className="bg-acid-lime text-pure-black px-3 py-1 font-black text-xs uppercase">
                    {stats.tryhackme.rank}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border-2 border-acid-lime/30 p-4">
                    <div className="text-4xl font-black text-acid-lime">{stats.tryhackme.machines}</div>
                    <div className="text-sm text-gray-400 uppercase font-bold">Machines</div>
                  </div>
                  <div className="border-2 border-acid-lime/30 p-4">
                    <div className="text-4xl font-black text-acid-lime">{stats.tryhackme.challenges}</div>
                    <div className="text-sm text-gray-400 uppercase font-bold">Challenges</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-acid-lime group-hover:translate-x-2 transition-transform">
                  <span className="font-bold uppercase text-sm">Voir les writeups</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => handlePlatformClick('hackthebox')}
              className="group relative bg-pure-black border-4 border-neon-pink p-8 cursor-pointer hover:translate-x-2 hover:translate-y-2 hover:shadow-none shadow-brutal-neon transition-all duration-200"
            >
              <div className="absolute top-4 right-4 text-neon-pink opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-pure-white uppercase">HackTheBox</h3>
                  <div className="bg-neon-pink text-pure-black px-3 py-1 font-black text-xs uppercase">
                    {stats.hackthebox.rank}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="border-2 border-neon-pink/30 p-4">
                    <div className="text-4xl font-black text-neon-pink">{stats.hackthebox.points}</div>
                    <div className="text-sm text-gray-400 uppercase font-bold">Points</div>
                  </div>
                  <div className="border-2 border-neon-pink/30 p-4">
                    <div className="text-4xl font-black text-neon-pink">{stats.hackthebox.machines}</div>
                    <div className="text-sm text-gray-400 uppercase font-bold">Machines</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-neon-pink group-hover:translate-x-2 transition-transform">
                  <span className="font-bold uppercase text-sm">Voir les writeups</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 bg-electric-blue border-4 border-pure-black p-6 shadow-brutal"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-pure-black p-3 border-2 border-pure-white">
                  <Zap className="w-8 h-8 text-electric-blue fill-current" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-pure-black uppercase">Progression Active</h4>
                  <p className="text-pure-black/80 font-bold">Focus actuel : Active Directory & Pivoting</p>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-4xl font-black text-pure-black">{Number(stats.tryhackme.machines) + Number(stats.hackthebox.points)}</div>
                <div className="text-sm font-bold text-pure-black/80 uppercase">Total Machines</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};