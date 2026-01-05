import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { Background } from './components/Background';
import { SceneController } from './SceneController';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick } from './audioUtils';

const M = motion as any;

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [customAudioSrc, setCustomAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStart = async () => {
    // 1. Play UI Sound
    if (!isMuted) playClick();

    // 2. Handle Music
    if (audioRef.current) {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            // Force reset to ensure it plays from start
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.6; 
            audioRef.current.muted = isMuted;
            
            // We ignore the promise result to prevent unhandled rejections blocking the UI
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play prevented or file missing. User interaction will fix this.");
                });
            }
        } catch (e) {
            console.log("Audio context error.", e);
        }
    }

    // 3. Start Visuals
    setIsPlaying(true);
  };

  const toggleMute = () => {
    playClick(); 
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (audioRef.current) {
        audioRef.current.muted = newMutedState;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAudioSrc(url);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Audio Element - Defaults to treasure.mp3 */}
      <audio 
        ref={audioRef} 
        src={customAudioSrc || "./treasure.mp3"} 
        loop 
        preload="auto"
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="audio/*" 
        className="hidden" 
        onChange={handleFileChange}
      />
      
      <Background />

      {/* GLOBAL GRAIN & GLOW */}
      <div className="absolute inset-0 pointer-events-none z-[9999] opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full flex flex-col">
        {!isPlaying ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/80 backdrop-blur-md z-50">
             <M.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center w-full max-w-md px-6 relative"
             >
                {/* Glow behind start button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/30 blur-[80px] -z-10 rounded-full animate-pulse"></div>

                <div className="mb-6 w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.6)] animate-bounce-slow border border-white/20">
                  <Play size={40} className="ml-1 fill-white text-white" />
                </div>
                <h1 className="text-5xl font-black mb-2 text-white tracking-tighter drop-shadow-2xl">WRITERS GUILD</h1>
                <p className="text-gray-400 mb-8 font-medium tracking-wide uppercase text-xs">Interactive Promo Experience</p>
                
                <div className="mb-8 flex justify-center gap-4">
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-gray-500 hover:text-white underline decoration-gray-700 underline-offset-4 transition-colors"
                     >
                        Upload Custom Song (Optional)
                     </button>
                </div>

                <button 
                  onClick={handleStart}
                  className="w-full group relative inline-flex items-center justify-center px-8 py-5 font-black text-xl text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 hover:scale-105 hover:shadow-[0_0_60px_rgba(147,51,234,0.8)] active:scale-95 border border-white/20"
                >
                  <Play className="mr-3 fill-current" size={24} />
                  ENTER WORLD
                </button>
             </M.div>
          </div>
        ) : (
          <SceneController isPlaying={isPlaying} isMuted={isMuted} />
        )}
      </main>

      <div className="absolute top-8 right-8 z-50 cursor-pointer p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/5 backdrop-blur-md" onClick={toggleMute}>
         {isMuted ? <VolumeX className="text-gray-400" size={20} /> : <Volume2 className="text-white" size={20} />}
      </div>
    </div>
  );
}