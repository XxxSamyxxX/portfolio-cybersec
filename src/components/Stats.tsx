import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TryHackMeCard } from './platforms/TryHackMeCard';
import { HackTheBoxCard } from './platforms/HackTheBoxCard';

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
    <section className="py-12 bg-gradient-to-b from-surface-900 via-black to-night-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TryHackMeCard
              stats={stats.tryhackme}
              onPlatformClick={handlePlatformClick}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <HackTheBoxCard
              stats={stats.hackthebox}
              onPlatformClick={handlePlatformClick}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};