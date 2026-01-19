"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Wifi, Battery, Shield, Headphones, Navigation, Heart } from "lucide-react"

const addOns = [
  {
    id: "wireless-charging",
    name: "Wireless Charging Pad",
    price: 199,
    image: "/images/cockpit-display.png",
    icon: Battery,
    description: "Qi-compatible wireless charging built into the handlebars for your devices",
    features: ["15W fast charging", "Weather resistant", "Universal compatibility"]
  },
  {
    id: "premium-speakers",
    name: "Premium Sound System",
    price: 399,
    image: "/images/helmet.png", 
    icon: Headphones,
    description: "Upgraded 360° surround sound system with noise cancellation",
    features: ["Dolby Atmos support", "Bone conduction tech", "16-hour battery"]
  },
  {
    id: "gps-tracker",
    name: "Advanced GPS Tracker",
    price: 149,
    image: "/images/ni.jpeg",
    icon: Navigation,
    description: "Real-time location tracking with theft protection and route optimization",
    features: ["Global coverage", "Theft alerts", "Route history"]
  },
  {
    id: "health-monitor",
    name: "Health Monitoring Suite",
    price: 299,
    image: "/images/cockpit-display.png",
    icon: Heart,
    description: "Comprehensive health tracking with heart rate, cadence, and performance metrics",
    features: ["ECG monitoring", "VO2 max tracking", "Recovery insights"]
  },
  {
    id: "security-system",
    name: "Smart Security System",
    price: 249,
    image: "/images/helmet.png",
    icon: Shield,
    description: "Advanced anti-theft system with motion sensors and smartphone alerts",
    features: ["Motion detection", "Remote locking", "Insurance integration"]
  },
  {
    id: "connectivity-hub",
    name: "5G Connectivity Hub",
    price: 179,
    image: "/images/ni.jpeg",
    icon: Wifi,
    description: "Built-in 5G hotspot for seamless streaming and device connectivity",
    features: ["5G/LTE support", "10 device limit", "Unlimited data plan"]
  }
]

export function AddOnsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="addons" className="bg-black py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#E50914] text-sm uppercase tracking-widest mb-4 font-medium">
            Enhance Your Ride
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6 leading-none">
            Premium Add-Ons
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Customize your CYCLEFLIX N1 with cutting-edge accessories designed to elevate every aspect of your cycling experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {addOns.map((addon, index) => {
            const Icon = addon.icon
            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#E50914]/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={addon.image} 
                    alt={addon.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#E50914]/20 backdrop-blur-sm rounded-full p-2">
                    <Icon className="w-5 h-5 text-[#E50914]" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-2xl font-bold text-[#E50914]">${addon.price}</div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{addon.name}</h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {addon.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {addon.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                        <div className="w-1 h-1 bg-[#E50914] rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-white/[0.05] hover:bg-[#E50914]/20 border border-white/10 hover:border-[#E50914]/50 text-white py-3 rounded-xl transition-all duration-300 font-medium">
                    Add to Configuration
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}