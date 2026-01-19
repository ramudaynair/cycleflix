"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"

const openNetflix = () => {
  window.location.href = "https://www.netflix.com";
};

export function HeroSection() {
  const ref = useRef(null)

  return (
    <section
      ref={ref}
      id="the-n1"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      style={{
        backgroundImage: 'url(/images/ni.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/70">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E50914]/15 rounded-full blur-[200px] morph-shape"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#E50914]/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-[#E50914]/8 rounded-full blur-[120px]"
        />
      </div>

      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto velocity-blur">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#E50914] text-sm uppercase tracking-[0.3em] mb-6 font-medium"
        >
          Introducing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none mb-6 text-balance flex items-baseline justify-center text-reveal"
        >
          <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]">C</span>
          <span className="text-white">YCLE</span>
          <span className="text-[#E50914] drop-shadow-[0_0_30px_rgba(229,9,20,0.8)]">FLIX</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto text-pretty"
        >
          Stream while you ride. The world's first Netflix-integrated bicycle with smart display that switches between audio-only while pedaling and full video when stationary for the ultimate safe entertainment experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-[#E50914] hover:bg-[#b8070f] text-white text-lg px-10 py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(229,9,20,0.5)]"
            onClick={() => window.location.href = '/preorder'}
          >
            Configure Your CYCLEFLIX N1
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 text-lg px-10 py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            onClick={openNetflix}
          >
            <Play className="mr-2 h-5 w-5" />
            Open Netflix
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 hover:border-[#E50914]/50 transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
