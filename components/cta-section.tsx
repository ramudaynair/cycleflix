"use client"

import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden" data-section="preorder">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-[800px] h-[400px] bg-[#E50914]/10 rounded-full blur-[200px]"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(229,9,20,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(229,9,20,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6 text-balance">
            {"Ready to Change How You Move?".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Join the revolution and be among the first to experience the CYCLEFLIX N1. Configure your perfect setup and secure your pre-order today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="bg-[#E50914] hover:bg-[#b8070f] text-white text-lg px-12 py-7 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(229,9,20,0.5)] group relative overflow-hidden"
              onClick={() => window.location.href = '/preorder'}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              <span className="relative z-10 flex items-center">
                Pre-Order Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-white/30 text-sm mt-8"
          >
            Starting at $2,999 · Expected {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} · 2-year warranty
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
