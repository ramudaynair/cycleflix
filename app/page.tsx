"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TudumSplash } from "@/components/tudum-splash"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  useEffect(() => {
    const skipSplash = sessionStorage.getItem('skipSplash')
    const savedScrollY = sessionStorage.getItem('scrollPosition')
    
    console.log('Page load - skipSplash:', skipSplash, 'scrollPosition:', savedScrollY)
    
    // Always skip splash if coming from any other page
    if (skipSplash === 'true' || window.history.length > 1) {
      setContentReady(true)
      if (savedScrollY) {
        const scrollPosition = parseInt(savedScrollY)
        setTimeout(() => {
          window.scrollTo(0, scrollPosition)
          console.log('Restored scroll to:', scrollPosition)
        }, 100)
      }
      // Clean up after restoring
      setTimeout(() => {
        sessionStorage.removeItem('skipSplash')
        sessionStorage.removeItem('scrollPosition')
      }, 500)
    } else {
      // Only show splash on fresh page load
      setShowSplash(true)
    }
  }, [])

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
    setContentReady(true)
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <TudumSplash onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {contentReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <HomeContent />
        </motion.div>
      )}
      
      {!showSplash && !contentReady && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      )}
    </>
  )
}
