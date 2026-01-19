"use client"

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function GSAPAnimations() {
  useEffect(() => {
    // Only apply to elements with specific GSAP classes to avoid conflicts
    
    // Magnetic hover effect for tiles (opt-in only)
    gsap.utils.toArray('.magnetic-tile').forEach((tile: any) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = tile.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(tile, {
          x: x * 0.05,
          y: y * 0.05,
          rotation: x * 0.01,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(tile, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        })
      }
      
      tile.addEventListener('mousemove', handleMouseMove)
      tile.addEventListener('mouseleave', handleMouseLeave)
    })

    // Subtle parallax for backgrounds only
    gsap.utils.toArray('.gsap-parallax').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
    })

    // Floating animation for specific elements
    gsap.utils.toArray('.gsap-float').forEach((element: any, index) => {
      gsap.to(element, {
        y: -10 + (index % 3) * 5,
        duration: 3 + (index * 0.2),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return null
}