import React from "react";
import { motion } from "framer-motion";

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-pure-black">
      <div className="absolute inset-0 bg-gradient-mesh" />

      <div
        className="absolute inset-0 bg-grid-brutal opacity-20"
        style={{ backgroundSize: '60px 60px' }}
      />

      <motion.div
        className="absolute top-[20%] left-[15%] w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(157, 0, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.25) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[50%] right-[30%] w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.2) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pure-black/50" />
    </div>
  );
};

