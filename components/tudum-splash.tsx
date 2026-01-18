"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null
let isMobile = false

export function TudumSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "logo" | "glow" | "disassemble">("black")
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Detect mobile device
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    // Preload audio
    if (!globalAudio) {
      globalAudio = new Audio()
      globalAudio.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3'
      globalAudio.volume = 0.6
      globalAudio.crossOrigin = 'anonymous'
      globalAudio.preload = 'auto'
      globalAudio.onended = () => { globalAudio = null }
    }
    
    // Fast start for mobile, quality for desktop
    const timing = isMobile ? { logo: 100, glow: 400, disassemble: 1000, complete: 1300 } : { logo: 200, glow: 600, disassemble: 1400, complete: 1800 }
    
    setIsReady(true)
    
    const logoTimer = setTimeout(() => {
      setPhase("logo")
      playTudumSound()
    }, timing.logo)
    
    const glowTimer = setTimeout(() => setPhase("glow"), timing.glow)
    const disassembleTimer = setTimeout(() => setPhase("disassemble"), timing.disassemble)
    const completeTimer = setTimeout(() => onComplete(), timing.complete)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(glowTimer)
      clearTimeout(disassembleTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  const playTudumSound = async () => {
    if (!globalAudio || globalAudio.currentTime > 0) return
    try {
      await globalAudio.play()
    } catch (error) {
      // Silent fail for mobile autoplay restrictions
    }
  }

  const NetflixN = () => (
    <svg 
      viewBox="0 0 100 100" 
      className={`${isMobile ? 'w-20 h-20' : 'w-32 h-32 md:w-48 md:h-48'}`}
      style={{ willChange: 'transform' }}
    >
      <defs>
        <linearGradient id="netflix-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E50914" />
          <stop offset="50%" stopColor="#B20710" />
          <stop offset="100%" stopColor="#E50914" />
        </linearGradient>
      </defs>
      <polygon points="15,5 35,5 35,95 15,95" fill="url(#netflix-gradient)" />
      <polygon points="15,5 35,5 85,95 65,95" fill="#E50914" />
      <polygon points="65,5 85,5 85,95 65,95" fill="url(#netflix-gradient)" />
    </svg>
  )

  if (!isReady) {
    return <div className="fixed inset-0 z-[100] bg-black" />
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={playTudumSound}
      style={{ transform: 'translateZ(0)' }} // Hardware acceleration
    >
      <div className="relative" style={{ willChange: 'transform' }}>
        {/* Netflix N Logo */}
        {phase !== "black" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: phase === "disassemble" ? 0 : 1,
              scale: 1
            }}
            transition={{ 
              duration: isMobile ? 0.25 : 0.4, 
              ease: "easeOut",
              type: "tween"
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            <NetflixN />
          </motion.div>
        )}

        {/* Glow effect - reduced on mobile */}
        {phase === "glow" && !isMobile && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.3] }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ willChange: 'opacity' }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 bg-[#FF2A2A] opacity-15 blur-md" />
          </motion.div>
        )}

        {/* Simplified disassembly */}
        {phase === "disassemble" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`absolute ${isMobile ? 'w-2 h-20' : 'w-3 h-32 md:w-4 md:h-40'}`}
              style={{ left: "calc(50% - 12px)", willChange: 'transform, opacity' }}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: isMobile ? -25 : -40, opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3, ease: "easeIn" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
            <motion.div
              className={`absolute ${isMobile ? 'w-2 h-20' : 'w-3 h-32 md:w-4 md:h-40'}`}
              style={{ left: "calc(50% + 8px)", willChange: 'transform, opacity' }}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: isMobile ? 25 : 40, opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3, ease: "easeIn" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
          </div>
        )}
      </div>
      
      {!globalAudio?.currentTime && (
        <div className={`absolute bottom-8 text-white/50 animate-pulse ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {isMobile ? 'Tap' : 'Click'} for sound
        </div>
      )}
    </div>
  )
}