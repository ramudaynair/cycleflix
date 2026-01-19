"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  {
    src: "/images/ni.jpeg",
    alt: "CYCLFLIX bicycle with integrated entertainment system",
    caption: "Premium Carbon Frame",
  },
  {
    src: "/images/cockpit-display.png",
    alt: "CYCLFLIX 5-inch smart display showing Netflix content and ride stats",
    caption: "5-inch Entertainment Display",
  },
  {
    src: "/images/helmet.png",
    alt: "CYCLFLIX smart helmet with built-in headphones and safety features",
    caption: "Smart Helmet with Audio",
  },
]

export function BikeShowcase() {
  const ref = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <section ref={ref} className="bg-black py-24 md:py-32 overflow-hidden relative" id="bike-showcase">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Red glow background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-[600px] h-[400px] bg-[#E50914]/25 rounded-full blur-[150px]"
            />
          </div>

          <motion.div
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-gradient-to-t from-[#E50914]/15 to-transparent blur-2xl"
          />

          <motion.div
            className="relative z-10 flex items-center justify-center py-8"
          >
            <div className="relative w-full max-w-4xl mx-auto aspect-[16/10] overflow-hidden group">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x)
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1)
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1)
                    }
                  }}
                  whileHover={{ scale: 1.05, rotateY: 2 }}
                  className="absolute w-full h-full object-contain cursor-grab active:cursor-grabbing transition-all duration-300 group-hover:filter group-hover:brightness-110"
                  style={{
                    filter: "drop-shadow(0 0 80px rgba(229,9,20,0.4)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                    transformStyle: "preserve-3d",
                  }}
                />
              </AnimatePresence>
              
              {/* Zoom overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
              />
            </div>

            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-black/50 border border-[#E50914]/30 text-white hover:bg-[#E50914]/20 hover:border-[#E50914] transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-black/50 border border-[#E50914]/30 text-white hover:bg-[#E50914]/20 hover:border-[#E50914] transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>

          <div className="relative z-10 flex flex-col items-center gap-4 mt-6">
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-[#E50914]" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/60 text-sm tracking-wider uppercase"
            >
              {images[currentIndex].caption}
            </motion.p>
            <p className="text-white/40 text-xs">Swipe or use arrows to explore</p>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#E50914]/60 rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
