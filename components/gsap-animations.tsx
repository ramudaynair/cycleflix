"use client"

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function GSAPAnimations() {
  useEffect(() => {
    // Check if elements exist before applying animations
    const elements = document.querySelectorAll('.magnetic-tile, .gsap-parallax, .gsap-float, .velocity-blur, .text-reveal, .morph-shape')
    if (elements.length === 0) return

    // GPU acceleration for all animated elements
    gsap.set(elements, {
      force3D: true,
      willChange: 'transform'
    })

    // Text reveal animations - character by character
    gsap.utils.toArray('.text-reveal').forEach((element: any) => {
      const text = element.textContent || element.innerText
      const chars = text.split('')
      
      element.innerHTML = chars.map((char: string) => 
        `<span style="display: inline-block; opacity: 0; transform: translateY(20px)">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')
      
      gsap.to(element.children, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Velocity-based blur effects
    gsap.utils.toArray('.velocity-blur').forEach((element: any) => {
      gsap.to(element, {
        filter: 'blur(var(--scroll-blur, 0px))',
        duration: 0.1,
        ease: 'none'
      })
    })

    // Morphing shapes that transform on scroll
    gsap.utils.toArray('.morph-shape').forEach((element: any) => {
      gsap.to(element, {
        rotation: 360,
        scale: 1.2,
        borderRadius: '50%',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1
        }
      })
    })

    // Enhanced parallax with configurable speeds
    gsap.utils.toArray('.gsap-parallax').forEach((element: any) => {
      const speed = parseFloat(element.dataset.speed) || 0.5
      gsap.to(element, {
        yPercent: -20 * speed,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
    })

    // Magnetic hover effect with GPU acceleration
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
          ease: "power2.out",
          force3D: true
        })
      }
      
      const handleMouseLeave = () => {
        gsap.to(tile, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
          force3D: true
        })
      }
      
      tile.addEventListener('mousemove', handleMouseMove, { passive: true })
      tile.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    })

    // Floating animation with reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      gsap.utils.toArray('.gsap-float').forEach((element: any, index) => {
        gsap.to(element, {
          y: -10 + (index % 3) * 5,
          duration: 3 + (index * 0.2),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
          force3D: true
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      // Clean up will-change
      gsap.set('.magnetic-tile, .gsap-parallax, .gsap-float, .velocity-blur, .text-reveal, .morph-shape', {
        willChange: 'auto'
      })
    }
  }, [])

  return null
}