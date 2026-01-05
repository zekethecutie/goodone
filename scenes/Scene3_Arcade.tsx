import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Target, Zap, Gamepad2, MousePointer2, Trophy } from 'lucide-react';
import { ArcadeCard, TitleCard } from '../components/ui/MockUI';
import { RetroGrid, FloatingIcons } from '../components/Decorative';

const M = motion as any;

export const SceneArcade: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-full z-10 w-full max-w-7xl mx-auto px-6 relative cursor-none perspective-1000">
      <TitleCard title="ARCADE" subtitle="Play to Win" color="text-yellow-500" />
      
      <RetroGrid />
      <FloatingIcons type="gaming" />

      {/* Header - Zooms in */}
      <M.div 
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring" }}
        className="mb-8 relative z-10 flex justify-between items-end"
      >
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <Gamepad2 className="text-purple-500" size={32} />
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-md">The Arcade</h2>
            </div>
            <p className="text-gray-400 max-w-xl text-lg">
                Sharpen your skills, challenge your friends, and climb the leaderboards.
            </p>
          </div>

          {/* Live Ticker */}
          <M.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="hidden md:flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2"
          >
              <Trophy size={16} className="text-yellow-500 animate-pulse" />
              <div className="text-xs text-yellow-200 font-mono">
                  <span className="font-bold">LIVE:</span> Zeke just won Story Roulette (+500 XP)
              </div>
          </M.div>
      </M.div>

      {/* Grid - Cards Fan Out */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
        
        {/* Card 1 - Left Tilt */}
        <M.div
           initial={{ opacity: 0, x: -100, rotateY: 45 }}
           animate={{ opacity: 1, x: 0, rotateY: 0 }}
           transition={{ delay: 2.4, type: "spring", stiffness: 200 }}
           className="relative perspective-1000"
        >
          <ArcadeCard 
             title="Story Roulette" 
             icon={PenTool}
             color="purple" 
             type="Multiplayer"
             players="2-10 Players"
             description="The classic multiplayer writing challenge. Get a prompt, write a masterpiece."
             features={['Real-time prompts', 'Peer rating', 'Multi-round']}
          />
        </M.div>
        
        {/* Card 2 - Center Pop */}
        <M.div
           initial={{ opacity: 0, y: 100, scale: 0.5 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ delay: 2.6, type: "spring", stiffness: 200 }}
           className="relative perspective-1000"
        >
          <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-2xl animate-pulse -z-10"></div>
          <ArcadeCard 
             title="Word Weaver" 
             icon={Target}
             color="blue" 
             type="Vocabulary"
             players="Solo / Multi"
             description="Expand your lexicon. Guess the correct word from its definition and usage."
             features={['Definitions & Examples', 'Spelling accuracy', 'Leveling system']}
          />
        </M.div>

        {/* Card 3 - Right Tilt */}
        <M.div
           initial={{ opacity: 0, x: 100, rotateY: -45 }}
           animate={{ opacity: 1, x: 0, rotateY: 0 }}
           transition={{ delay: 2.8, type: "spring", stiffness: 200 }}
           className="relative perspective-1000"
        >
          <ArcadeCard 
             title="Sprint Type" 
             icon={Zap}
             color="orange" 
             type="Speed"
             players="Solo / Multi"
             description="How fast can you transcribe literary classics? Race against the clock."
             features={['Literary passages', 'WPM tracking', 'Accuracy metrics']}
          />
        </M.div>
      </div>

      {/* Simulated Cursor Animation - Snappy Move */}
      <M.div
        className="absolute pointer-events-none z-50 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        initial={{ top: "110%", left: "50%" }}
        animate={{ 
            top: ["110%", "50%", "50%", "50%", "110%"],
            left: ["50%", "16%", "50%", "83%", "50%"],
            scale: [1, 1, 0.9, 1, 1]
        }}
        transition={{ duration: 3, ease: "easeInOut", times: [0, 0.1, 0.4, 0.7, 1], delay: 3 }}
      >
          <MousePointer2 size={32} fill="white" />
      </M.div>
    </div>
  );
};