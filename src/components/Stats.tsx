import React from 'react';
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
    <section className="py-12 bg-[#0d0d12]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Layout adaptatif selon la taille d'écran */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <TryHackMeCard 
            stats={stats.tryhackme}
            onPlatformClick={handlePlatformClick}
          />
          <HackTheBoxCard 
            stats={stats.hackthebox}
            onPlatformClick={handlePlatformClick}
          />
        </div>
      </div>
    </section>
  );
};