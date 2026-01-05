import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Scene } from './types';
import { SceneIntro } from './scenes/Scene1_Intro';
import { SceneSocial } from './scenes/Scene2_Social';
import { SceneArcade } from './scenes/Scene3_Arcade';
import { SceneProfile } from './scenes/Scene4_Profile';
import { SceneGuilds } from './scenes/Scene_Guilds';
import { SceneOutro } from './scenes/Scene5_Outro';
import { playTransition } from './audioUtils';
import { SceneFloater } from './components/Decorative';

const M = motion as any;

interface Props {
  isPlaying: boolean;
  isMuted: boolean;
}

// === CINEMATIC CAMERA RIG ===
// Combines automatic scene angles with subtle mouse influence
const CameraRig = ({ children, sceneIndex, scene }: { children: React.ReactNode, sceneIndex: number, scene: Scene }) => {
    // 1. Mouse Parallax (Interactive)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // 2. Automatic Cinematic Angles per Scene
    // Intro: Dead center
    // Social: Tilt Right (Looking at feed)
    // Arcade: Tilt Left & Zoom (Focus on game)
    // Guilds: Slight look up (Grandeur)
    // Profile: Heroic low angle
    const autoAngles: any = {
        [Scene.Intro]: { x: 0, y: 0, z: 0 },
        [Scene.Social]: { x: 5, y: -10, z: 50 },
        [Scene.Arcade]: { x: 2, y: 10, z: 100 },
        [Scene.Guilds]: { x: -5, y: 0, z: -50 },
        [Scene.Profile]: { x: 10, y: 0, z: 0 },
        [Scene.Outro]: { x: 0, y: 0, z: -200 },
    };

    const currentAngle = autoAngles[scene] || { x: 0, y: 0, z: 0 };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalized -0.5 to 0.5
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Combine Auto + Mouse
    // We map mouse movement (-0.5 to 0.5) to a range (e.g., -5deg to 5deg)
    const mouseRotX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
    const mouseRotY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

    return (
        <M.div
            className="w-full h-full perspective-1000 transform-style-3d"
            animate={{
                rotateX: currentAngle.x,
                rotateY: currentAngle.y,
                z: currentAngle.z,
                scale: [1, 1.02, 1], // Heartbeat breathing
            }}
            style={{
                rotateX: mouseRotX, // Reactively add mouse tilt on top of animation
                rotateY: mouseRotY,
            }}
            transition={{
                rotateX: { duration: 2, ease: "easeInOut" },
                rotateY: { duration: 2, ease: "easeInOut" },
                z: { duration: 2, ease: "easeInOut" },
                scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }, 
            }}
        >
            <AnimatePresence mode="wait">
                <M.div
                    key={sceneIndex}
                    className="w-full h-full transform-style-3d backface-hidden absolute inset-0"
                    initial={{ 
                        scale: 1.5, 
                        opacity: 0, 
                        z: -1000, 
                        rotateY: 15
                    }}
                    animate={{ 
                        scale: 1, 
                        opacity: 1, 
                        z: 0, 
                        rotateY: 0,
                        filter: "brightness(1.2) contrast(1.1)" // Pop effect on entry
                    }}
                    exit={{ 
                        scale: 0.5, 
                        opacity: 0, 
                        z: 500, 
                        rotateY: -15,
                        filter: 'blur(15px) brightness(0.5)'
                    }}
                    transition={{ 
                        duration: 1.0, 
                        ease: [0.16, 1, 0.3, 1], // Expo out for snappy entry
                    }}
                >
                    {children}
                </M.div>
            </AnimatePresence>
        </M.div>
    );
};

export const SceneController: React.FC<Props> = ({ isPlaying, isMuted }) => {
  const [scene, setScene] = useState<Scene>(Scene.Intro);
  const [flash, setFlash] = useState(false);

  // Scene Durations (ms) - Tuned for Treasure.mp3 pacing
  const SCENE_DURATION = {
    [Scene.Intro]: 6500,
    [Scene.Social]: 8000, 
    [Scene.Arcade]: 7000,  
    [Scene.Guilds]: 7000,  
    [Scene.Profile]: 7000, 
    [Scene.Outro]: 999999, 
  };

  useEffect(() => {
    if (!isPlaying) return;
    if (scene === Scene.Outro) return; 

    const sequence = [
      Scene.Intro,
      Scene.Social,
      Scene.Arcade,
      Scene.Guilds,
      Scene.Profile,
      Scene.Outro
    ];

    const currentIndex = sequence.indexOf(scene);
    const nextScene = sequence[currentIndex + 1];

    if (!nextScene) return;

    const duration = SCENE_DURATION[scene];

    const timer = setTimeout(() => {
      // Transition Glitch
      setFlash(true);
      if (!isMuted) playTransition();
      
      setTimeout(() => setFlash(false), 150); 
      setScene(nextScene);
    }, duration);

    return () => clearTimeout(timer);
  }, [scene, isPlaying, isMuted]);

  const renderScene = () => {
    switch (scene) {
      case Scene.Intro: return <SceneIntro key="intro" />;
      case Scene.Social: return <SceneSocial key="social" />;
      case Scene.Arcade: return <SceneArcade key="arcade" />;
      case Scene.Guilds: return <SceneGuilds key="guilds" />;
      case Scene.Profile: return <SceneProfile key="profile" />;
      case Scene.Outro: return <SceneOutro key="outro" />;
      default: return null;
    }
  };

  const sceneIndex = [Scene.Intro, Scene.Social, Scene.Arcade, Scene.Guilds, Scene.Profile, Scene.Outro].indexOf(scene);

  return (
    <div className="relative w-full h-full bg-[#050505] overflow-hidden perspective-1000">
        
        {/* Global Particles */}
        <div className="absolute inset-0 z-0">
             <SceneFloater scene={scene} />
        </div>

        {/* Flash Overlay */}
        <AnimatePresence>
            {flash && (
                <M.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                    className="absolute inset-0 bg-white z-[9999] pointer-events-none mix-blend-difference"
                />
            )}
        </AnimatePresence>

        {/* 3D Camera Rig */}
        <CameraRig sceneIndex={sceneIndex} scene={scene}>
            {renderScene()}
        </CameraRig>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)] z-50" />
    </div>
  );
};