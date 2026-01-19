"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function StillRidingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    '5" AMOLED touch display',
    "GPS + GLONASS navigation",
    "Automatic ride detection",
    "Over-the-air updates",
  ]

  return (
    <section ref={ref} id="engineering" className="bg-black py-24 md:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[#E50914] text-sm uppercase tracking-widest mb-4 font-medium"
            >
              Intelligent Navigation
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-none text-balance"
            >
              Are You Still Riding?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg"
            >
              The integrated cockpit features a high-contrast AMOLED display with turn-by-turn navigation, real-time
              performance metrics, and seamless smartphone connectivity. Your ride data, beautifully visualized.
            </motion.p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-white/70 group cursor-default"
                >
                  <motion.span
                    className="w-1.5 h-1.5 bg-[#E50914] rounded-full"
                    whileHover={{ scale: 2 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="transition-colors duration-300 group-hover:text-white">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <motion.div className="order-1 lg:order-2 relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-lg overflow-hidden"
            >
              <img
                src="/sleek-bicycle-handlebars-with-modern-digital-displ.jpg"
                alt="N1 integrated cockpit with digital display"
                className="w-full h-auto rounded-lg transition-transform duration-700 group-hover:scale-105"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-tr from-[#E50914]/30 via-transparent to-transparent"
              />

              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatDelay: 2 }}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914]/50 to-transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#E50914]/20 rounded-lg -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -left-4 w-20 h-20 border border-[#E50914]/10 rounded-lg -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
