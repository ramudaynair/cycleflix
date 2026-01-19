import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { GSAPAnimations } from "@/components/gsap-animations"
import { PageTransition } from "@/components/page-transition"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cycleflix",
  description:
    "Experience the Cycleflix - a fusion of aerospace-grade carbon and intelligent drive systems. The ultimate high-performance luxury bicycle.",
  generator: "v0.app",
  icons: {
    icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ctext y='75' font-size='80' font-family='system-ui' font-weight='900' fill='%23E50914'%3eC%3c/text%3e%3c/svg%3e",
    apple: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ctext y='75' font-size='80' font-family='system-ui' font-weight='900' fill='%23E50914'%3eC%3c/text%3e%3c/svg%3e",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`font-sans antialiased relative`}>
        <SmoothScroll />
        <GSAPAnimations />
        <PageTransition>
          {children}
        </PageTransition>
        <Analytics />
      </body>
    </html>
  )
}
