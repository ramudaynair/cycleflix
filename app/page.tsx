"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TudumSplash } from "@/components/tudum-splash"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Check if we should show splash based on scroll position
    const savedScrollY = sessionStorage.getItem('scrollPosition')
    const scrollPosition = savedScrollY ? parseInt(savedScrollY) : 0
    
    // Only show splash if we're at the top (intro section)
    if (scrollPosition < 100) {
      setShowSplash(true)
    }
    
    // Restore scroll position after component mounts
    if (savedScrollY) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition)
        sessionStorage.removeItem('scrollPosition')
      }, showSplash ? 0 : 100)
    }
  }, [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
  }, [])

  useEffect(() => {
    // Save scroll position on page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">{showSplash && <TudumSplash onComplete={handleSplashComplete} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <HomeContent />
      </motion.div>
    </>
  )
}
