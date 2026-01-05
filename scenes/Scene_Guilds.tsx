import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Shield, ChevronRight } from 'lucide-react';
import { TitleCard } from '../components/ui/MockUI';

const M = motion as any;

const InkDrop = () => (
    <M.div
        className="absolute rounded-full bg-black blur-sm opacity-50 z-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: Math.random() * 2 }}
        style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        }}
    />
);

export const SceneGuilds: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full z-10 w-full max-w-5xl mx-auto px-4 relative">
        <TitleCard title="GUILDS" subtitle="Find Your Tribe" color="text-purple-500" />
        
        {Array.from({ length: 5 }).map((_, i) => <InkDrop key={i} />)}
        
        {/* Main Guild Card */}
        <M.div 
            className="w-full relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
        >
            <div className="rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] relative group shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {/* Header Image with abstract vibes */}
                <div className="h-48 bg-black relative overflow-hidden group">
                    <img src="https://picsum.photos/id/117/1000/400" className="w-full h-full object-cover opacity-50 grayscale hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                    <div className="absolute top-6 left-6 flex items-center gap-4">
                        <div className="w-16 h-16 bg-black rounded-xl border border-gray-700 flex items-center justify-center overflow-hidden">
                             <img src="https://picsum.photos/id/237/200/200" className="w-full h-full object-cover grayscale" />
                        </div>
                        <div>
                             <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">The Umbral Poets' Covenant</h2>
                             <span className="bg-[#331133] text-purple-300 text-[10px] px-2 py-0.5 rounded-full border border-purple-900 shadow-[0_0_10px_rgba(147,51,234,0.3)]">Poetry</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <div className="flex gap-8 border-b border-gray-800 pb-6">
                             <div className="flex flex-col gap-1">
                                 <div className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1"><Users size={12}/> Members</div>
                                 <div className="text-2xl font-black text-white">3</div>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <div className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1"><Zap size={12} className="text-yellow-500"/> XP Bonus</div>
                                 <div className="text-2xl font-black text-white">+10</div>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <div className="text-xs text-gray-500 font-bold uppercase flex items-center gap-1"><Shield size={12}/> Level</div>
                                 <div className="text-2xl font-black text-white">1</div>
                             </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-2">About</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The Umbral Poets' Covenant is a gathering of ink-born wanderers, a fellowship of writers who thrive in the half-light where imagination sharpens and shadows speak. We are the ones who linger where thought turns tender...
                            </p>
                        </div>

                        {/* Chat Preview Bubble */}
                         <M.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2 }}
                            className="bg-[#111] border border-gray-800 rounded-lg p-3 flex gap-3 items-center"
                        >
                            <img src="https://picsum.photos/id/100/30" className="w-8 h-8 rounded-full grayscale" />
                            <div>
                                <div className="text-[10px] text-gray-500 mb-0.5">Zeke • general</div>
                                <div className="text-xs text-gray-300">hey, want to share that stanza again?</div>
                            </div>
                        </M.div>

                        <button className="w-full bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2 hover:scale-[1.02]">
                             Join Guild <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Members List */}
                    <div className="col-span-1 bg-[#111] rounded-xl p-4 border border-[#222]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-white">Members (3)</span>
                            <span className="text-xs text-gray-500">View All</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                {name: 'itszeke2', role: 'Admin', color: 'text-blue-400'},
                                {name: 'Azael.', role: 'Member', color: 'text-gray-400'},
                                {name: 'Zeke', role: 'Founder', color: 'text-yellow-500'}
                            ].map((m, i) => (
                                <M.div 
                                    key={i} 
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 2.5 + (i * 0.1) }}
                                    className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-1 rounded transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                                             <img src={`https://picsum.photos/id/${100+i}/50`} className="grayscale opacity-80 group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <span className="text-sm text-gray-300 font-medium">{m.name}</span>
                                    </div>
                                    <span className={`text-[10px] border border-gray-700 px-2 rounded-full ${m.color}`}>{m.role}</span>
                                </M.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </M.div>
    </div>
  );
};