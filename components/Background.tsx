import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Particle } from '../types';

const M = motion as any;

export const Background: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Space Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1033_0%,_#050505_80%)]" />
      
      {/* Dynamic Color Spots */}
      <M.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.2, 0.4, 0.2],
          x: [-50, 50, -50],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen" 
      />
      
      <M.div 
        animate={{ 
          scale: [1.2, 1, 1.2], 
          opacity: [0.15, 0.3, 0.15],
          y: [50, -50, 50],
          rotate: [0, -45, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-900/40 rounded-full blur-[100px] mix-blend-screen" 
      />

      <M.div 
        animate={{ 
          scale: [1, 1.5, 1], 
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-pink-900/20 rounded-full blur-[90px] mix-blend-screen" 
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <M.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Noise Texture for Texture/Depth */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>
    </div>
  );
};