'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Target, Zap, Sparkles, CheckCircle2 } from 'lucide-react'
import { DEMO_USER } from '@/lib/constants/demoData'
import { useAuth } from '@/lib/context/AuthContext'

export function WelcomeCard() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState('Welcome back')

  useEffect(() => {
    const hour = new Date().getHours()
    setGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening')
  }, [])

  const displayName = user?.name || DEMO_USER.name
  const semester = user?.semester || DEMO_USER.semester
  const branch = user?.branch || 'B.Tech CSE'
  const todayProgress = 65
  const studyStreak = 12

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl liquid-glass liquid-glass-hover p-6 md:p-7"
    >
      {/* Liquid Glass Internal Specular Reflection */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            {/* Pill with Electric Chartreuse highlight */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E2E800] dark:text-[#E2E800]" />
              <span className="text-foreground font-semibold">Urban Nocturne</span>
              <span className="text-muted-foreground">• Semester {semester}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              <span>{greeting}, {displayName.split(' ')[0]}</span>
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5 }}
                className="inline-block origin-bottom-right"
              >
                ⚡
              </motion.span>
            </h2>

            <p className="text-muted-foreground text-xs md:text-sm mt-1.5 font-medium">
              {branch} • Data Structures, OS Kernels & Lab Practicals
            </p>
          </div>

          {/* Electric Chartreuse Hot Streak Badge */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 bg-[#E2E800] text-[#141414] rounded-2xl px-4 py-2.5 shadow-chartreuse-sm hover:shadow-chartreuse-glow transition-all cursor-pointer self-start border border-[#E2E800]/40"
          >
            <div className="w-8 h-8 rounded-xl bg-[#141414] text-[#E2E800] flex items-center justify-center font-bold">
              <Flame className="w-4.5 h-4.5 fill-current" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold text-lg leading-none font-mono text-[#141414]">{studyStreak}</span>
                <span className="text-xs font-bold text-[#141414]/80">DAYS</span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-[#141414]/90">
                Hot Streak
              </span>
            </div>
          </motion.div>
        </div>

        {/* Liquid Glass Goal Progress Container */}
        <div className="mt-6 rounded-2xl p-4 bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#E2E800] text-[#141414] flex items-center justify-center font-bold">
                <Target className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs md:text-sm font-bold text-foreground">
                Today&apos;s Engineering Goal
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30">
              <span>{todayProgress}%</span>
            </div>
          </div>

          {/* Track and Fill in Electric Chartreuse */}
          <div className="h-2.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${todayProgress}%` }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-[#E2E800] rounded-full shadow-chartreuse-sm"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 font-mono">
            <span>2h 36m logged today</span>
            <span>Target: 4h 00m</span>
          </div>
        </div>

        {/* Micro-Stats Liquid Grid */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Topics Studied', value: '3', icon: Zap, highlight: 'text-[#E2E800]' },
            { label: 'Code Solved', value: '5', icon: Target, highlight: 'text-foreground' },
            { label: 'Lab Tasks', value: '2', icon: CheckCircle2, highlight: 'text-foreground' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="rounded-2xl px-3.5 py-2.5 bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.08] backdrop-blur-md flex items-center gap-2.5"
            >
              <stat.icon className={`w-4 h-4 ${stat.highlight} flex-shrink-0`} />
              <div className="min-w-0">
                <p className="text-sm font-bold font-mono text-foreground leading-tight">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground font-medium truncate">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
