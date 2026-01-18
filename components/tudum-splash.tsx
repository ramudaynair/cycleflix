"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

let globalAudio: HTMLAudioElement | null = null

export function TudumSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"black" | "logo" | "glow" | "disassemble">("black")
  const [audioPlayed, setAudioPlayed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playTudumSound = async () => {
    if (audioPlayed || globalAudio) return
    
    try {
      // Create persistent audio that won't be destroyed with component
      globalAudio = new Audio()
      globalAudio.src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/netflix-tudum-sfx-n-c-zAKXEHBYl3ICOeHH6eA6pqwzZFt9sF.mp3'
      globalAudio.volume = 0.6
      globalAudio.crossOrigin = 'anonymous'
      
      // Clean up when audio ends
      globalAudio.onended = () => {
        globalAudio = null
      }
      
      await globalAudio.play()
      setAudioPlayed(true)
      console.log('Tudum sound started')
    } catch (error) {
      console.log('Audio failed:', error)
      globalAudio = null
    }
  }

  useEffect(() => {
    // Try to play immediately when logo appears
    const logoTimer = setTimeout(() => {
      setPhase("logo")
      playTudumSound()
    }, 300)
    
    const glowTimer = setTimeout(() => setPhase("glow"), 900)
    const disassembleTimer = setTimeout(() => setPhase("disassemble"), 1900)
    const completeTimer = setTimeout(() => onComplete(), 2400)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(glowTimer)
      clearTimeout(disassembleTimer)
      clearTimeout(completeTimer)
      // Don't destroy globalAudio here - let it finish playing
    }
  }, [])

  const NetflixN = () => (
    <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48">
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

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={playTudumSound}
    >
      <div className="relative">
        {/* Netflix N Logo */}
        {phase !== "black" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: phase === "disassemble" ? 0 : 1,
              scale: 1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <NetflixN />
          </motion.div>
        )}

        {/* Glow effect */}
        {phase === "glow" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.6] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 bg-[#FF2A2A] opacity-30 blur-xl" />
          </motion.div>
        )}

        {/* Disassembly light strips */}
        {phase === "disassemble" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute w-4 h-40 md:w-5 md:h-56"
              style={{ left: "calc(50% - 24px)" }}
              initial={{ x: 0, scaleY: 1, opacity: 1 }}
              animate={{ x: -60, scaleY: 1.3, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
            <motion.div
              className="absolute w-3 h-40 md:w-4 md:h-56"
              style={{ left: "calc(50% - 2px)", transform: "rotate(15deg)" }}
              initial={{ x: 0, scaleY: 1, opacity: 1 }}
              animate={{ x: 0, scaleY: 1.4, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeIn", delay: 0.1 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
            <motion.div
              className="absolute w-4 h-40 md:w-5 md:h-56"
              style={{ left: "calc(50% + 20px)" }}
              initial={{ x: 0, scaleY: 1, opacity: 1 }}
              animate={{ x: 60, scaleY: 1.3, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E50914] to-transparent blur-sm" />
            </motion.div>
          </div>
        )}
      </div>
      
      {!audioPlayed && (
        <div className="absolute bottom-8 text-white/50 text-sm animate-pulse">
          Click for sound
        </div>
      )}
    </motion.div>
  )
}