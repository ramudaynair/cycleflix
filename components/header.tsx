"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

let isMobile = false

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    // Throttle scroll events on mobile
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener("scroll", isMobile ? throttledScroll : handleScroll, { passive: true })
    setIsReady(true)
    
    return () => window.removeEventListener("scroll", isMobile ? throttledScroll : handleScroll)
  }, [])

  const navLinks = [
    { href: "#complete-system", label: "Engineering" },
    { href: "#the-n1", label: "The Bike" },
    { href: "#specs", label: "Specs" },
  ]

  if (!isReady) {
    return <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent" />
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-black/95 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ transform: 'translateZ(0)' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a 
          href="/" 
          className="flex items-center"
          style={{ willChange: 'transform' }}
        >
          <span
            className={`font-black tracking-tight flex items-baseline transition-all duration-200 ${
              isMobile ? 'text-lg' : 'text-xl sm:text-2xl'
            } ${
              scrolled ? 'drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]' : ''
            }`}
          >
            <span className="text-[#E50914]">C</span>
            <span className="text-white">YCLE</span>
            <span className="text-[#E50914]">FLIX</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-white/70 hover:text-white transition-colors duration-200 py-2 group"
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
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E50914] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 -mr-2 touch-manipulation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/5">
          <div className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors py-2 touch-manipulation"
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
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
