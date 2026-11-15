'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    const isDark = () => document.documentElement.classList.contains('dark')

    // Fine floating particles / grain dust
    const particleCount = Math.min(Math.floor((width * height) / 20000), 50)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const isChartreuse = Math.random() < 0.3
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        color: isChartreuse ? 'rgba(226, 232, 0, ' : 'rgba(214, 214, 214, ',
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const dark = isDark()

      // Subtle particle connections for high-tech liquid mesh
      const maxDistance = 110
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (dark ? 0.08 : 0.05)
            ctx.beginPath()
            ctx.strokeStyle = dark ? `rgba(226, 232, 0, ${alpha})` : `rgba(68, 68, 68, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw shiny/matte grain particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color + (dark ? '0.45)' : '0.25)')
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Liquid fluid shapes that refract through liquid glass cards */}
      <div className="absolute top-[-10%] right-[10%] w-[520px] h-[520px] rounded-full bg-[#E2E800]/[0.08] dark:bg-[#E2E800]/[0.09] blur-[150px] animate-fluid-drift pointer-events-none" />
      <div
        className="absolute top-[40%] left-[-10%] w-[580px] h-[580px] rounded-full bg-[#444444]/[0.15] dark:bg-[#444444]/[0.35] blur-[140px] animate-fluid-drift pointer-events-none"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[480px] h-[480px] rounded-full bg-[#D6D6D6]/[0.1] dark:bg-[#D6D6D6]/[0.04] blur-[130px] animate-fluid-drift pointer-events-none"
        style={{ animationDelay: '6s' }}
      />

      {/* Floating grain dust canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* Matte Film Grain Texture Overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-70" />
    </div>
  )
}
