import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather } from 'lucide-react';
import { playCoin, playTransition } from '../audioUtils';

const M = motion as any;

// A single word that enters, hits hard, and leaves
const KineticWord = ({ text, color, fontSize = "text-[15vw]" }: any) => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <M.h1 
          initial={{ opacity: 0, scale: 0.2, filter: 'blur(20px)', z: 500 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', z: 0 }}
          exit={{ opacity: 0, scale: 2, filter: 'blur(20px)', z: -200 }} 
          transition={{ 
            duration: 0.5, // Enter duration
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            exit: { duration: 0.2 } // Faster exit to prevent blocking the next word
          }}
          className={`font-black italic tracking-tighter ${color} ${fontSize} leading-none mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] text-center`}
        >
          {text}
        </M.h1>
    </div>
);

// The Final Logo Assembly
const GuildAssembly = () => (
    <M.div 
        key="assembly"
        className="absolute inset-0 z-20 flex flex-col items-center justify-center transform-style-3d gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
    >
        {/* Abstract Background Elements */}
        <M.div 
            initial={{ scale: 0 }}
            animate={{ scale: 30 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute bg-gradient-to-tr from-purple-900/30 to-blue-900/30 w-10 h-10 rounded-full blur-2xl -z-10"
        />

        {/* 1. THE ICON (Restored & On Top) */}
        <M.div
            initial={{ y: -800, rotateX: 180, scale: 0 }}
            animate={{ y: 0, rotateX: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.1 }}
            className="relative z-30 transform-style-3d"
        >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 md:p-8 rounded-[2rem] shadow-[0_0_100px_rgba(147,51,234,0.6)] border-4 border-white/20 relative group">
                 {/* Internal Glow */}
                 <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <Feather size={64} strokeWidth={3} className="drop-shadow-lg md:w-20 md:h-20 relative z-10" />
            </div>
        </M.div>

        {/* 3D Container for Text */}
        <div className="relative z-10 transform-style-3d flex flex-col items-center -space-y-4 md:-space-y-8">
            
            {/* 2. WRITERS */}
            <div className="overflow-visible relative flex items-center justify-center">
                <M.h1
                    initial={{ x: -1000, skewX: -45, opacity: 0 }}
                    animate={{ x: 0, skewX: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                    className="text-[12vw] md:text-[9vw] font-black text-white italic tracking-tighter leading-none drop-shadow-2xl"
                    style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                >
                    WRITERS
                </M.h1>
            </div>

            {/* 3. GUILD */}
            <div className="overflow-visible relative flex items-center justify-center perspective-1000">
                <M.h1
                    initial={{ rotateX: 90, y: 100, opacity: 0 }}
                    animate={{ rotateX: 0, y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.5 }} 
                    className="text-[12vw] md:text-[9vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 italic tracking-tighter leading-none pb-4"
                    style={{ 
                        textShadow: "0 0 40px rgba(168,85,247,0.4)",
                        filter: "brightness(1.2)" 
                    }}
                >
                    GUILD
                </M.h1>
            </div>

        </div>
    </M.div>
);

export const SceneIntro: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // INCREASED TIMING GAPS
    // 100ms -> FIND
    // 1300ms -> YOUR (1.2s gap)
    // 2500ms -> VOICE (1.2s gap)
    // 3800ms -> ASSEMBLY (1.3s gap)
    
    const timings = [
        { phase: 1, time: 100 },   
        { phase: 2, time: 1300 },  
        { phase: 3, time: 2500 },  
        { phase: 4, time: 3800 }, 
    ];

    const timeouts = timings.map(t => setTimeout(() => {
        setPhase(t.phase);
        if (t.phase === 3) playTransition();
        if (t.phase === 4) playCoin();
    }, t.time));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center transform-style-3d bg-black">
      
      {/* Abstract Grid Floor for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(500px)_rotateX(60deg)_scale(2)] opacity-30 origin-bottom pointer-events-none" />

      {/* Kinetic Words Sequence - Mode Wait ensures distinct steps */}
      <AnimatePresence mode="wait">
        {phase === 1 && (
            <KineticWord key="word1" text="FIND" color="text-gray-200" />
        )}
        {phase === 2 && (
            <KineticWord key="word2" text="YOUR" color="text-purple-400" />
        )}
        {phase === 3 && (
            <KineticWord key="word3" text="VOICE" color="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-600" />
        )}
      </AnimatePresence>

      {/* Final Logo Assembly */}
      <AnimatePresence>
        {phase >= 4 && <GuildAssembly />}
      </AnimatePresence>
      
    </div>
  );
};