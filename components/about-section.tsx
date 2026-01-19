"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="about" className="bg-black py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[#E50914] text-sm uppercase tracking-widest mb-4 font-medium"
            >
              Our Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-none text-balance"
            >
              Born from Innovation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed mb-6"
            >
              What started as a simple question—"Why can't I listen to Netflix content while cycling?"—evolved into a revolutionary fusion of entertainment and fitness. Our team of aerospace engineers and entertainment technology experts spent three years perfecting the balance between safety, performance, and audio immersion.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/50 text-lg leading-relaxed"
            >
              The result? The world's first Netflix-integrated bicycle with intelligent content switching. While pedaling, enjoy audio-only mode with music documentaries, podcasts, and shows. When you stop for a break, the display automatically switches to full video mode so you can watch where you left off. Every component of the CYCLEFLIX N1 is designed to enhance your ride while keeping you safely connected to the content you love.
            </motion.p>
          </div>

          {/* Stats/Highlights */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E50914] mb-2">3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Years R&D</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E50914] mb-2">47</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Patents Filed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E50914] mb-2">12</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Safety Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E50914] mb-2">1st</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">In The World</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-[#E50914]/10 to-transparent border border-[#E50914]/20 rounded-2xl p-6"
            >
              <h3 className="text-white font-semibold mb-3">Safety First Philosophy</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Smart content switching based on pedaling status. Audio-only mode while cycling automatically switches to full video when you stop, with seamless content synchronization and emergency override systems to ensure you stay safe and entertained.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}