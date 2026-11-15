'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, BookOpen, FlaskConical, Brain, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const BOTTOM_TABS = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Learn', href: '/subjects', icon: BookOpen },
  { label: 'Labs', href: '/labs', icon: FlaskConical },
  { label: 'AI Tutor', href: '/tutor', icon: Brain },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
]

export function MobileNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 liquid-glass border-t border-black/10 dark:border-white/10">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb relative">
        {BOTTOM_TABS.map((tab) => {
          const active = isActive(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3.5 py-1.5 rounded-xl transition-all relative',
                active
                  ? 'text-[#141414] font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {active && (
                <motion.div
                  layoutId="mobileNavActive"
                  className="absolute inset-0 bg-[#E2E800] rounded-xl shadow-chartreuse-sm"
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                />
              )}
              <tab.icon className={cn('w-4.5 h-4.5 relative z-10', active ? 'text-[#141414]' : '')} />
              <span className="text-[10px] font-bold relative z-10">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
