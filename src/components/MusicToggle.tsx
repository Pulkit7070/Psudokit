'use client';

import { useState } from 'react';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { soundInstance } from './BackgroundMusic';

export default function MusicToggle() {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Directly control the Howler instance
    if (soundInstance) {
      soundInstance.mute(newMutedState);
      console.log('Music muted:', newMutedState);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 border border-neutral-200/50 dark:border-neutral-700/50 touch-manipulation select-none cursor-pointer"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      title={isMuted ? 'Unmute music' : 'Mute music'}
      type="button"
    >
      {isMuted ? (
        <HiSpeakerXMark size={18} className="text-neutral-600 dark:text-neutral-400 pointer-events-none" />
      ) : (
        <HiSpeakerWave size={18} className="text-neutral-600 dark:text-neutral-400 pointer-events-none" />
      )}
    </motion.button>
  );
}
