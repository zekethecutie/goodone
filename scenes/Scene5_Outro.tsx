import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Feather } from 'lucide-react';

const M = motion as any;

export const SceneOutro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full z-10 relative overflow-hidden bg-black transform-style-3d">
      
      {/* Glitchy CRT Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-20" />

      {/* Main Container */}
      <M.div
        className="relative z-30 flex flex-col items-center transform-style-3d"
        initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
      >
        {/* Floating Logo */}
        <M.div
            animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -20, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="mb-10 relative group cursor-pointer"
        >
            <div className="absolute inset-0 bg-purple-600 blur-[80px] opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="relative z-10 bg-white/5 p-8 rounded-full border border-white/10 backdrop-blur-md">
                <Feather size={80} className="text-white relative z-10" />
            </div>
        </M.div>

        {/* Glitch Title Reveal */}
        <div className="relative overflow-hidden mb-4">
            <M.h2 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                className="text-6xl md:text-8xl font-black text-center text-white tracking-tighter italic leading-none"
            >
                JOIN THE GUILD
            </M.h2>
        </div>
        
        <M.p
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-gray-400 font-mono text-lg mb-12 tracking-widest uppercase text-center"
        >
            Find Your Voice • Build Your World
        </M.p>

        {/* CTA Button */}
        <M.button
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.5 }}
            className="bg-white text-black font-black text-2xl px-12 py-5 rounded-2xl flex items-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.4)] group relative overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">START WRITING <ArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
        </M.button>

        {/* Platforms */}
        <M.div 
            className="absolute -bottom-40 flex gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 2.5 }}
        >
            <span className="text-gray-500 font-mono text-sm hover:text-white transition-colors cursor-pointer">iOS</span>
            <span className="text-gray-500 font-mono text-sm hover:text-white transition-colors cursor-pointer">ANDROID</span>
            <span className="text-gray-500 font-mono text-sm hover:text-white transition-colors cursor-pointer">WEB</span>
        </M.div>
      </M.div>

      {/* Shutdown Flash (TV Off Effect) */}
      <M.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="absolute inset-0 bg-white z-[100] pointer-events-none mix-blend-overlay"
      />
    </div>
  );
};