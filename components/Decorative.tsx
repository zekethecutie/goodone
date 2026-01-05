import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Coins, Zap, PenTool, Feather, Heart, Music, Star, MessageCircle, Trophy, BookOpen, Scroll, Crown, Sword } from 'lucide-react';
import { Scene } from '../types';

const M = motion as any;

export const RetroGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <M.div 
        animate={{ y: [0, 64] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
    />
  </div>
);

export const FloatingIcons = ({ type }: { type: 'social' | 'gaming' | 'writing' }) => {
  const icons = {
    social: [Heart, MessageCircle, Star, Music],
    gaming: [Gamepad2, Coins, Zap, Trophy],
    writing: [PenTool, Feather, BookOpen, Scroll],
  }[type];

  // Helper for lucide icons since they are components
  const Icon1 = icons[0];
  const Icon2 = icons[1];
  const Icon3 = icons[2];
  const Icon4 = icons[3];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[Icon1, Icon2, Icon3, Icon4].map((Icon: any, i: number) => (
        <M.div
          key={i}
          className={`absolute text-white/10 ${i % 2 === 0 ? 'text-purple-500/20' : 'text-blue-500/20'}`}
          initial={{ 
            x: Math.random() * 1000 - 500, 
            y: 1000, 
            rotate: 0,
            scale: 0.5 + Math.random() 
          }}
          animate={{ 
            y: -1000, 
            rotate: 360,
            x: Math.random() * 1000 - 500
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "linear", 
            delay: i * 2 
          }}
          style={{ left: '50%' }}
        >
          <Icon size={40 + Math.random() * 60} />
        </M.div>
      ))}
    </div>
  );
};

export const SceneFloater = ({ scene }: { scene: Scene }) => {
  const config: any = {
    [Scene.Intro]: [],
    [Scene.Social]: [
        { icon: Heart, color: "text-red-500" },
        { icon: MessageCircle, color: "text-blue-500" },
        { char: "❤️" }, { char: "🔥" }, { char: "💬" }, { char: "✨" }
    ],
    [Scene.Arcade]: [
        { icon: Gamepad2, color: "text-purple-500" },
        { icon: Coins, color: "text-yellow-500" },
        { char: "👾" }, { char: "🪙" }, { char: "🕹️" }, { char: "🆙" }
    ],
    [Scene.Guilds]: [
        { icon: Feather, color: "text-purple-300" },
        { icon: Sword, color: "text-gray-400" },
        { char: "📜" }, { char: "⚔️" }, { char: "🏰" }, { char: "🛡️" }
    ],
    [Scene.Profile]: [
        { icon: Trophy, color: "text-yellow-400" },
        { icon: Crown, color: "text-yellow-600" },
        { char: "👑" }, { char: "📈" }, { char: "🎉" }, { char: "🌟" }
    ],
    [Scene.Outro]: []
  };

  const items = config[scene] || [];
  if (items.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
       {Array.from({ length: 20 }).map((_, i) => {
          const item = items[i % items.length];
          return (
             <M.div
                key={`${scene}-${i}`}
                initial={{ y: "120vh", x: Math.random() * 100 + "%", opacity: 0, scale: 0 }}
                animate={{ y: "-20vh", opacity: [0, 1, 1, 0], scale: [0.5, 1, 0.5], rotate: Math.random() * 360 }}
                transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
                className={`absolute ${item.color || 'text-white'} text-3xl opacity-30 drop-shadow-lg`}
             >
                {item.icon ? <item.icon size={32} /> : item.char}
             </M.div>
          )
       })}
    </div>
  )
};