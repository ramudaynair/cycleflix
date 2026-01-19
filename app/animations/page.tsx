"use client"

import { useState } from "react"
import { TudumSplash } from "@/components/tudum-splash"

type AnimationType = "original" | null

export default function AnimationDemo() {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>(null)

  const animations = [
    { id: "original", name: "Netflix Style Tudum", component: TudumSplash },
  ]

  const handleComplete = () => {
    setCurrentAnimation(null)
  }

  const CurrentComponent = animations.find(a => a.id === currentAnimation)?.component

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-[#E50914]">CYCLEFLIX</span> Animation Demo
        </h1>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          {animations.map((animation) => (
            <button
              key={animation.id}
              onClick={() => setCurrentAnimation(animation.id as AnimationType)}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-[#E50914] p-6 rounded-lg transition-all duration-300 text-left"
            >
              <h3 className="text-xl font-semibold mb-2 text-[#E50914]">
                {animation.name}
              </h3>
              <p className="text-gray-400 text-sm">
                Click to preview the Netflix-style intro animation
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Experience the authentic Netflix intro with audio
          </p>
          {currentAnimation && (
            <button
              onClick={() => setCurrentAnimation(null)}
              className="bg-[#E50914] hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
            >
              Stop Animation
            </button>
          )}
        </div>
      </div>

      {/* Render current animation */}
      {CurrentComponent && (
        <CurrentComponent onComplete={handleComplete} />
      )}
    </div>
  )
}