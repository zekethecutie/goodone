
let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Jolly 8-bit Coin Sound (Two-tone BING!)
export const playCoin = () => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    
    const now = ctx.currentTime;
    
    // Tone 1: 987.77 Hz (B5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square'; // Square wave for retro feel
    osc1.frequency.setValueAtTime(987.77, now);
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // Jump to E6
    
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.4);
  } catch (e) {
    // Silent fail
  }
};

// ASMR Mechanical Switch / Pop
export const playClick = () => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    // The Click (High pass noise)
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i/bufferSize, 2);
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    
    const gain = ctx.createGain();
    gain.gain.value = 0.5;
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    
    // The Thud (Low sine)
    const osc = ctx.createOscillator();
    const gainOsc = ctx.createGain();
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    gainOsc.gain.setValueAtTime(0.3, now);
    gainOsc.gain.linearRampToValueAtTime(0, now + 0.1);
    
    osc.connect(gainOsc);
    gainOsc.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);

  } catch (e) {
    // Silent fail
  }
};

// Magical Sparkle / Transition
export const playTransition = () => {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    // Arpeggio up
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major arpeggio
    
    freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        
        const time = now + (i * 0.05);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.1, time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.4);
    });
  } catch (e) {
    // Silent fail
  }
};
