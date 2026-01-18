"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#complete-system", label: "Engineering" },
    { href: "#the-n1", label: "The Bike" },
    { href: "#specs", label: "Specs" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <motion.a 
          href="/" 
          className="flex items-center" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="text-2xl font-black tracking-tight flex items-baseline"
            animate={{
              textShadow: scrolled ? "0 0 20px rgba(229,9,20,0.5)" : "0 0 0px rgba(229,9,20,0)",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[#E50914]">C</span>
            <span className="text-white">YCLE</span>
            <span className="text-[#E50914]">FLIX</span>
          </motion.span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm text-white/70 hover:text-white transition-colors duration-300 py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover="hover"
              onClick={(e) => {
                e.preventDefault()
                if (window.location.pathname !== '/') {
                  router.push('/' + link.href)
                } else {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {link.label}
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E50914] origin-left"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    if (window.location.pathname !== '/') {
                      router.push('/' + link.href)
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
