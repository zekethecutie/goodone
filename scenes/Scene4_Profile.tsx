import React from 'react';
import { motion } from 'framer-motion';
import { Verified, Star, Zap, MessageSquare, Flame, Heart, PenTool, Crown, Clock, Trophy } from 'lucide-react';
import { DarkCard, TitleCard } from '../components/ui/MockUI';

const M = motion as any;

const AnimatedCounter = ({ value, label }: { value: string | number, label: string }) => (
    <div className="flex flex-col items-center flex-1">
        <M.strong 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-white text-lg"
        >
            {value}
        </M.strong>
        <span>{label}</span>
    </div>
);

// Explicitly defined variants for clarity
const itemVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            delay: 2.5 + (i * 0.08), // Faster stagger
            type: "spring",
            stiffness: 300,
            damping: 15
        }
    })
};

const AchievementItem = ({ icon: Icon, title, desc, color, index }: any) => (
    <M.div 
        custom={index}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1, rotate: 3, borderColor: "rgba(255,255,255,0.5)" }}
        className="bg-[#0e0e0e] border border-[#1f1f1f] p-3 rounded-xl flex flex-col items-center text-center gap-2 group hover:bg-[#151515] transition-colors cursor-pointer relative z-20 shadow-lg"
    >
        <div className={`${color} opacity-80 group-hover:scale-125 transition-transform duration-300 drop-shadow-md`}>
            <Icon size={24} strokeWidth={2.5} />
        </div>
        <div>
            <div className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">{title}</div>
            <div className="text-[9px] text-gray-500 mt-1">{desc}</div>
        </div>
    </M.div>
);

export const SceneProfile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full z-10 w-full max-w-6xl mx-auto px-4 perspective-1000">
      <TitleCard title="PROFILE" subtitle="Your Legacy" color="text-red-500" />
      
      <div className="grid grid-cols-12 gap-6 w-full h-full max-h-[85vh] relative z-20">
        
        {/* Left Col: Profile Info - 3D Flip In */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-center gap-4">
             <M.div 
                initial={{ x: -200, rotateY: 90, opacity: 0 }}
                animate={{ x: 0, rotateY: 0, opacity: 1 }}
                transition={{ delay: 2.0, type: "spring", damping: 20 }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] relative transform-style-3d group"
             >
                  {/* Holo Glint */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shine pointer-events-none z-50" />
                  
                  <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/id/106/500/300")', filter: 'grayscale(100%) contrast(120%)' }}></div>
                  <div className="px-6 pb-6 -mt-10 relative z-10">
                        <img src="https://picsum.photos/id/100/200/200" className="w-20 h-20 rounded-full border-4 border-[#0a0a0a] grayscale hover:grayscale-0 transition-all duration-500 shadow-xl" />
                        <div className="mt-2">
                             <h2 className="text-2xl font-black text-white">Zeke</h2>
                             <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                 <span className="bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded font-bold border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]">OWNER</span>
                                 <span className="flex items-center gap-1 text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20"><Verified size={12}/> Verified</span>
                             </div>
                             
                             <div className="mt-4 pt-4 border-t border-gray-800">
                                <div className="text-xs font-bold text-gray-500 uppercase mb-1">Bio</div>
                                <p className="text-gray-300 text-xs leading-relaxed">Owner and Super Administrator of Writers Guild.</p>
                             </div>

                             <div className="flex gap-4 mt-4 text-xs font-mono text-gray-400 bg-[#111] p-3 rounded-xl border border-gray-800/50">
                                 <AnimatedCounter value="12k" label="followers" />
                                 <div className="w-px bg-gray-800"></div>
                                 <AnimatedCounter value="8" label="posts" />
                             </div>
                        </div>
                  </div>
             </M.div>
        </div>

        {/* Right Col: Level & Achievements */}
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center gap-4">
            
            {/* Level Bar */}
            <M.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2, type: "spring" }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-6 relative overflow-hidden shadow-lg"
            >
                <div className="absolute top-0 right-0 p-2 bg-red-900/20 text-red-500 text-[10px] font-bold rounded-bl-xl border-l border-b border-red-500/20">
                    Ascended Master
                </div>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <Crown size={16} className="text-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Max Level Reached</span>
                    </div>
                    <span className="text-xs font-mono text-gray-500">19,800 XP</span>
                </div>
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden relative">
                    <M.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 2.4 }}
                        className="h-full bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                    />
                </div>
            </M.div>

            {/* Achievement Grid - The "Missing" Part Restored */}
            <M.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl"
            >
                <div className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                    <Star size={14} className="text-yellow-500" /> Recent Achievements
                </div>
                
                {/* Grid Container */}
                <div className="grid grid-cols-4 gap-3">
                    <AchievementItem index={0} icon={Star} title="Rising Star" desc="Get 10 likes" color="text-yellow-400" />
                    <AchievementItem index={1} icon={MessageSquare} title="Orator" desc="5 comments" color="text-blue-200" />
                    <AchievementItem index={2} icon={Flame} title="On Fire" desc="7-Day Streak" color="text-orange-500" />
                    <AchievementItem index={3} icon={Heart} title="Beloved" desc="Get 50 likes" color="text-red-500" />
                    
                    <AchievementItem index={4} icon={PenTool} title="Scribe" desc="10 entries" color="text-purple-400" />
                    <AchievementItem index={5} icon={Crown} title="Royalty" desc="Reach lvl 50" color="text-yellow-600" />
                    <AchievementItem index={6} icon={Clock} title="Nocturnal" desc="Write at 3am" color="text-indigo-400" />
                    <AchievementItem index={7} icon={Zap} title="Flash" desc="3 entries/day" color="text-yellow-300" />
                </div>
            </M.div>

            {/* Stats Row */}
             <div className="grid grid-cols-2 gap-4">
                  <M.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.2 }}>
                    <DarkCard className="p-4 flex items-center justify-between hover:border-purple-500/30 transition-colors">
                        <span className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2"><Trophy size={14} /> Badges</span>
                        <span className="text-2xl font-black text-white">17</span>
                    </DarkCard>
                  </M.div>
                  <M.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.3 }}>
                    <DarkCard className="p-4 flex items-center justify-between hover:border-blue-500/30 transition-colors">
                        <span className="text-xs text-gray-500 font-bold uppercase flex items-center gap-2"><Crown size={14} /> Guilds</span>
                        <span className="text-2xl font-black text-white">1</span>
                    </DarkCard>
                  </M.div>
             </div>

        </div>

      </div>
    </div>
  );
};