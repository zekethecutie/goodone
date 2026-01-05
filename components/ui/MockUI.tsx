import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Repeat, Share2, Users, CheckCircle, Verified, MoreVertical, ArrowRight, Trophy, TrendingUp, Music, Target } from 'lucide-react';

const M = motion as any;

// === KINETIC TITLE CARD ===
export const TitleCard = ({ title, subtitle, color = "text-white" }: { title: string, subtitle: string, color?: string }) => {
  return (
    <M.div 
        className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-[#050505]"
        initial={{ clipPath: "circle(150% at 50% 50%)" }}
        animate={{ clipPath: "circle(0% at 50% 50%)" }} 
        transition={{ duration: 0.8, delay: 2, ease: [0.76, 0, 0.24, 1] }} 
    >
        <M.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.2, repeat: 4 }}
            className={`absolute inset-0 ${color.replace('text-', 'bg-')}/20`}
        />

        <div className="relative overflow-visible perspective-1000">
            {/* Main Title Slam */}
            <M.h1 
                initial={{ scale: 3, opacity: 0, rotateX: 45 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className={`text-8xl md:text-[10rem] font-black italic tracking-tighter ${color} mb-2 uppercase leading-none mix-blend-screen drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]`}
            >
                {title}
            </M.h1>
            
            <M.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`absolute top-0 left-1 text-8xl md:text-[10rem] font-black italic tracking-tighter text-red-500 mb-2 uppercase leading-none mix-blend-screen pointer-events-none blur-[1px]`}
            >
                {title}
            </M.h1>
             <M.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className={`absolute top-0 -left-1 text-8xl md:text-[10rem] font-black italic tracking-tighter text-blue-500 mb-2 uppercase leading-none mix-blend-screen pointer-events-none blur-[1px]`}
            >
                {title}
            </M.h1>
        </div>

        <div className="overflow-hidden">
             <M.p 
                initial={{ y: "100%", skewY: 10 }}
                animate={{ y: 0, skewY: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
                className="text-xl md:text-3xl font-black text-gray-400 tracking-[0.5em] uppercase border-t border-gray-700 pt-4 mt-4 drop-shadow-md"
             >
                {subtitle}
             </M.p>
        </div>
    </M.div>
  );
};

// Premium Dark Card with Glow
export const DarkCard = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] hover:border-purple-500/30 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// Sidebar Widgets
export const SideWidget = ({ title, icon: Icon, children }: any) => (
    <DarkCard className="p-4 mb-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
            <Icon size={14} /> {title}
        </div>
        {children}
    </DarkCard>
);

export const MusicPlayerWidget = () => (
    <SideWidget title="Popular Soundtrack" icon={Music}>
        <div className="flex items-center gap-3 mb-3 group cursor-pointer">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                <Music size={18} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">Let Down</div>
                <div className="text-xs text-gray-500 truncate">Unknown Artist</div>
            </div>
        </div>
        <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                <Music size={18} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">Multo</div>
                <div className="text-xs text-gray-500 truncate">Cup of Joe</div>
            </div>
        </div>
    </SideWidget>
);

export const GoalsWidget = () => (
    <SideWidget title="Your Writing Goals" icon={Target}>
        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Daily Word Count</span>
                    <span className="text-gray-500">0 / 500</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Weekly Posts</span>
                    <span className="text-gray-500">0 / 5</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
            </div>
            <div className="flex justify-between text-xs pt-2 border-t border-gray-800">
                <span className="text-orange-500 flex items-center gap-1"><span className="animate-pulse">🔥</span> Current Streak</span>
                <span className="font-bold text-white">0 days</span>
            </div>
        </div>
    </SideWidget>
);

// Feed Post
export const PostCard = ({ avatar, name, handle, category, title, subtitle, isVerified = false, time = "1 min read", date = "Nov 21, 2025" }: any) => (
  <DarkCard className="w-full max-w-2xl p-6 hover:border-purple-500/40 transition-colors duration-300 bg-[#0a0a0a] group">
    {/* Category Pill */}
    {category && (
        <div className="mb-4">
            <span className="bg-[#9333ea] text-white text-xs font-bold px-3 py-1 rounded-full lowercase shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                {category}
            </span>
        </div>
    )}

    {/* Title & Subtitle */}
    <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-purple-200 transition-colors">{title}</h2>
        {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
    </div>

    {/* User Row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-10 h-10 rounded-full object-cover filter grayscale brightness-75 contrast-125 group-hover:grayscale-0 transition-all duration-300 ring-2 ring-transparent group-hover:ring-purple-500/50" alt="avatar" />
        <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">{name}</span>
            <div className="flex gap-1 items-center">
                 <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-[10px]">💯</div>
                 <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center text-[10px] text-yellow-500">⚒️</div>
                 {isVerified && <Verified className="text-blue-500 w-4 h-4" />}
            </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <span>{time}</span>
          <span>•</span>
          <span>{date}</span>
          <MoreVertical size={16} className="ml-2 text-gray-600" />
      </div>
    </div>
  </DarkCard>
);

// Story Card
export const StoryCard = ({ title, author, cover, tags, description, stats }: any) => (
  <DarkCard className="flex p-0 gap-0 hover:border-purple-500/40 transition-colors group h-full bg-[#0a0a0a]">
    <div className="w-32 shrink-0 relative overflow-hidden">
      <img src={cover} className="w-full h-full object-cover filter grayscale brightness-50 contrast-125 group-hover:brightness-75 transition-all duration-500 scale-105 group-hover:scale-110" alt="cover" />
    </div>
    <div className="flex flex-col flex-1 justify-between p-5">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-2">{title}</h3>
        </div>
        <p className="text-sm text-gray-400 mt-1 line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t: string, i: number) => (
            <span key={i} className="px-2 py-1 rounded text-[10px] font-bold bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 uppercase tracking-wide group-hover:border-purple-500/30 transition-colors">
              {t}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1a1a1a]">
         <div className="flex items-center gap-2">
            <img src={author.avatar} className="w-6 h-6 rounded-full filter grayscale brightness-75" />
            <span className="text-xs text-gray-500">by {author.name}</span>
         </div>
         <button className="bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-bold px-6 py-2 rounded-lg transition-colors w-full max-w-[120px] shadow-[0_0_15px_rgba(147,51,234,0.4)]">
            Read Now
         </button>
      </div>
    </div>
  </DarkCard>
);

// Arcade Card
export const ArcadeCard = ({ title, icon: Icon, color, description, players, type, features }: any) => {
  const colorMap: any = {
    purple: { bg: 'bg-[#9333ea]', text: 'text-[#9333ea]', border: 'border-[#9333ea]/20', pill: 'text-purple-300 bg-purple-500/10 border-purple-500/20', glow: 'shadow-[0_0_20px_rgba(147,51,234,0.3)]' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500/20', pill: 'text-blue-300 bg-blue-500/10 border-blue-500/20', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500/20', pill: 'text-orange-300 bg-orange-500/10 border-orange-500/20', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]' },
  };
  const theme = colorMap[color] || colorMap.purple;

  return (
    <DarkCard className="h-full flex flex-col p-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 bg-[#0e0e0e] border-[#1f1f1f] relative group">
       {/* Card Glow Background */}
       <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${theme.text.replace('text-', 'from-')}/10 to-transparent pointer-events-none`} />

       <div className="flex justify-between items-start mb-6 relative z-10">
          <div className={`p-3 rounded-2xl ${theme.bg}/10 ${theme.text} group-hover:scale-110 transition-transform ${theme.glow}`}>
             <Icon size={28} strokeWidth={1.5} />
          </div>
          <span className={`text-[10px] font-bold border px-3 py-1 rounded-full ${theme.pill}`}>{type}</span>
       </div>
       
       <h3 className="text-xl font-bold text-white mb-3 relative z-10">{title}</h3>
       <p className="text-sm text-gray-400 leading-relaxed mb-6 relative z-10">{description}</p>
       
       {/* Stats Row */}
       <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-6 pb-6 border-b border-[#222] relative z-10">
          <div className="flex items-center gap-2">
             <Users size={14} />
             <span>{players}</span>
          </div>
          <div className="flex items-center gap-2">
             <Trophy size={14} />
             <span>Skill</span>
          </div>
       </div>

       {/* Features List */}
       <ul className="space-y-3 mb-8 flex-1 relative z-10">
          {features && features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                  <div className={`w-1 h-1 rounded-full ${theme.bg} shadow-[0_0_5px_currentColor]`}></div>
                  {feature}
              </li>
          ))}
       </ul>
       
       <button className={`w-full py-3 rounded-lg ${theme.bg} hover:brightness-110 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 relative z-10 shadow-lg`}>
          Play Now <ArrowRight size={16} />
       </button>
    </DarkCard>
  );
}

// Badge
export const Badge = ({ icon: Icon, label, color, subtext }: any) => (
  <div 
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#333] transition-colors aspect-square hover:scale-105 duration-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
  >
    <Icon className={`mb-3 ${color} opacity-80`} size={28} />
    <span className="text-[10px] font-bold text-gray-300 text-center uppercase tracking-wider">{label}</span>
  </div>
);