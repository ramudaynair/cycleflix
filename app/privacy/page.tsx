"use client"

import { motion, useInView } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react"

export default function Privacy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px", amount: 0.3 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const router = useRouter()

  const handleBack = () => {
    sessionStorage.setItem('skipSplash', 'true')
    router.push('/')
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={handleBack}
            className="group flex items-center gap-2 mb-8 text-white/70 hover:text-white transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Home</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#E50914] text-sm uppercase tracking-widest mb-4 font-medium"
            >
              Legal
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-lg max-w-3xl mx-auto"
            >
              How we protect and handle your data while you enjoy the CYCLFLIX experience.
            </motion.p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Data Collection",
                content: "We collect ride data, entertainment preferences, and location information to enhance your CYCLFLIX experience."
              },
              {
                icon: Eye,
                title: "Netflix Integration", 
                content: "Your Netflix account data is used solely for content streaming and synchronization across devices."
              },
              {
                icon: Lock,
                title: "Location Services",
                content: "GPS data is used for navigation, safety features, and emergency contact alerts."
              },
              {
                icon: Database,
                title: "Data Security",
                content: "All personal data is encrypted and stored securely. We never share your information with third parties."
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/[0.02] border border-white/10 rounded-xl p-8 transition-all duration-500 hover:border-[#E50914]/50 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#E50914]/10 via-transparent to-transparent pointer-events-none"
                />

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E50914] to-transparent origin-left"
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-6"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <section.icon className="h-7 w-7 text-[#E50914]" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-white/70 leading-relaxed">{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}