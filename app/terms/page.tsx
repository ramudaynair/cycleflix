"use client"

import { motion, useInView } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bike, Play, Shield, FileText } from "lucide-react"

export default function Terms() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px", amount: 0.3 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const router = useRouter()

  const handleBack = () => {
    console.log('Terms back button clicked')
    sessionStorage.setItem('skipSplash', 'true')
    // Don't overwrite the scroll position - it should already be saved from main page
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
              Terms of Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-lg max-w-3xl mx-auto"
            >
              Guidelines and agreements for using CYCLFLIX products and services.
            </motion.p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Bike,
                title: "Product Usage",
                content: "CYCLFLIX products are designed for safe cycling entertainment. Users must follow all traffic laws and safety guidelines."
              },
              {
                icon: Play,
                title: "Netflix Subscription", 
                content: "A valid Netflix subscription is required for content streaming. Netflix terms apply to all streaming services."
              },
              {
                icon: Shield,
                title: "Safety Responsibility",
                content: "Users are responsible for safe cycling practices. Always prioritize road safety over entertainment."
              },
              {
                icon: FileText,
                title: "Warranty",
                content: "2-year limited warranty covers manufacturing defects. Damage from accidents or misuse not covered."
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