import React from 'react';
import { motion } from 'framer-motion';
import { PostCard, StoryCard, DarkCard, SideWidget, GoalsWidget, MusicPlayerWidget, TitleCard } from '../components/ui/MockUI';
import { Heart, MessageCircle, TrendingUp, PenTool, Plus } from 'lucide-react';
import { FloatingIcons } from '../components/Decorative';

const M = motion as any;

export const SceneSocial: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-start justify-center overflow-hidden bg-black/50 backdrop-blur-sm transform-style-3d">
       <TitleCard title="SOCIAL" subtitle="Connect with Creators" color="text-blue-500" />
       
       <FloatingIcons type="social" />
       
       <div className="w-full max-w-7xl px-4 grid grid-cols-12 gap-6 pt-10 h-full relative z-10 transform-style-3d">
            {/* Left Sidebar - 3D Push In */}
            <M.div 
                initial={{ x: -200, opacity: 0, rotateY: 30 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 2.2, type: "spring" }}
                className="hidden lg:block col-span-3 space-y-2 transform-style-3d"
            >
                 <div className="flex items-center gap-3 px-4 py-3 text-white font-bold bg-white/5 rounded-xl border border-white/10 mb-6">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                        <span className="font-serif italic">W</span>
                    </div>
                    <span>Writers Guild</span>
                 </div>
                 {['Home', 'Search', 'Explore', 'Stories', 'Leaderboard', 'Quests'].map((item: string, i: number) => (
                    <div key={i} className={`px-4 py-3 rounded-xl text-sm font-bold cursor-pointer flex items-center gap-3 ${i===0 ? 'bg-purple-600/10 text-purple-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'} transition-colors`}>
                        {item}
                    </div>
                 ))}
                 
                 <M.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} // Fast beat sync
                    className="w-full mt-6 bg-purple-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                 >
                    <PenTool size={18} /> Make a Post
                 </M.button>
            </M.div>

            {/* Center Feed - Infinite Scroll Illusion */}
            <div className="col-span-12 lg:col-span-6 h-full relative overflow-hidden mask-image-gradient transform-style-3d">
                <M.div 
                    className="flex flex-col gap-6 pb-20 origin-top transform-style-3d"
                    initial={{ y: 500, opacity: 0, rotateX: 20 }}
                    animate={{ y: -600, opacity: 1, rotateX: 0 }}
                    transition={{ 
                        y: { duration: 8, ease: "linear", delay: 2.5 },
                        opacity: { duration: 0.5, delay: 2.5 },
                        rotateX: { duration: 1, delay: 2.5 }
                    }}
                >
                        <M.div whileHover={{ scale: 1.02 }} className="origin-center">
                            <DarkCard className="p-6 bg-[#0a0a0a]">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src="https://picsum.photos/id/100/100" className="w-8 h-8 rounded-full border border-gray-700" />
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-white font-bold text-sm">Zeke</span>
                                            <span className="text-blue-500 text-[10px]">✓</span>
                                        </div>
                                        <div className="bg-gray-800 text-gray-400 text-[10px] px-1.5 py-0.5 rounded w-fit">general</div>
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-1">was it casual?</h3>
                                <p className="text-gray-400 text-sm">so it was?</p>
                            </DarkCard>
                        </M.div>

                        <M.div whileHover={{ scale: 1.02 }}>
                            <PostCard 
                                avatar="https://picsum.photos/id/100/200/200" 
                                name="Zeke" 
                                isVerified={true}
                                category="literary"
                                title="declaration of one's own identity"
                                subtitle="of my own becoming"
                                time="1 min read"
                                date="Nov 21, 2025"
                            />
                        </M.div>

                        <M.div whileHover={{ scale: 1.02 }}>
                            <DarkCard className="p-0 overflow-hidden bg-[#0a0a0a]">
                                <div className="relative h-64 overflow-hidden">
                                    <img src="https://picsum.photos/id/237/800/600" className="w-full h-full object-cover grayscale brightness-50 hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-[#9333ea] text-white text-[10px] font-bold px-2 py-1 rounded-full">literary</div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-white mb-1">I will be</h2>
                                    <p className="text-gray-400 text-sm">what it means to be the one who remembers</p>
                                    <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs">
                                        <img src="https://picsum.photos/id/100/50" className="w-5 h-5 rounded-full grayscale" />
                                        <span>Zeke</span>
                                    </div>
                                </div>
                            </DarkCard>
                        </M.div>
                </M.div>
            </div>

            {/* Right Sidebar - Staggered Slide In */}
            <M.div 
                initial={{ x: 200, opacity: 0, rotateY: -30 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 2.4, type: "spring" }}
                className="hidden lg:block col-span-3 space-y-4 transform-style-3d"
            >
                <SideWidget title="Trending in Writing" icon={TrendingUp}>
                    <div className="space-y-3">
                         {['The Forgotten', 'Neon Nights', 'Cyber Junk', 'Void Walkers'].map((t, i) => (
                             <M.div 
                                key={i} 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.6 + (i * 0.1) }}
                                className="flex justify-between items-center text-sm group cursor-pointer"
                             >
                                 <span className="text-gray-300 group-hover:text-purple-400 transition-colors">#{t.replace(' ', '')}</span>
                                 <span className="text-gray-600 text-xs">{10 - i}k posts</span>
                             </M.div>
                         ))}
                    </div>
                </SideWidget>
                
                <GoalsWidget />
                <MusicPlayerWidget />

            </M.div>
       </div>

       {/* Floating Interaction Popups - Sync to Beat */}
       <div className="absolute right-10 bottom-20 flex flex-col gap-4 z-50">
            <M.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, scale: [1, 1.1, 1] }}
                transition={{ 
                    x: { delay: 3, type: "spring" },
                    scale: { repeat: Infinity, duration: 0.4 } // High bpm beat
                }}
                className="bg-red-500/10 backdrop-blur-md border border-red-500/50 p-3 rounded-full flex items-center gap-2 text-red-500 font-bold pr-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
                <div className="bg-red-500 p-2 rounded-full text-white"><Heart size={16} fill="currentColor" /></div>
                <span>Zeke liked your post</span>
            </M.div>
       </div>
    </div>
  );
};