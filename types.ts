export enum Scene {
  Intro = 'INTRO',
  Social = 'SOCIAL',
  Arcade = 'ARCADE',
  Guilds = 'GUILDS',
  Profile = 'PROFILE',
  Outro = 'OUTRO'
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}