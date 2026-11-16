'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Binary, FlaskConical, Terminal,
  Sparkles, Brain, FileText, TrendingUp, Bookmark, Settings,
  ChevronLeft, ChevronRight, GraduationCap, Cpu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_GROUPS } from '@/lib/constants/navigation'
import { useAuth } from '@/lib/context/AuthContext'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, BookOpen, Binary, FlaskConical, Terminal,
  Sparkles, Brain, FileText, TrendingUp, Bookmark, Settings, Cpu,
}

interface SidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const displayName = user?.name || 'Mohit Sharma'
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'MS'

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 z-30',
        'liquid-glass border-r border-black/10 dark:border-white/10',
        'transition-all duration-200 ease-in-out overflow-hidden',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo Area */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 h-16 border-b border-black/10 dark:border-white/10 flex-shrink-0',
          collapsed && 'justify-center px-0'
        )}
      >
        <div className="w-8 h-8 rounded-xl bg-[#E2E800] text-[#141414] flex items-center justify-center flex-shrink-0 font-extrabold shadow-chartreuse-sm">
          <GraduationCap className="w-5 h-5 fill-current" />
        </div>

        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <p className="font-extrabold text-sm leading-tight text-foreground tracking-tight">
                StudySphere
              </p>
              <p className="text-[10px] font-mono font-bold text-[#E2E800] uppercase tracking-wider">
                Urban Nocturne
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground px-3 py-1.5 mt-1">
                {group.label}
              </p>
            )}
            {collapsed && <div className="h-px bg-black/10 dark:bg-white/10 mx-2 my-2" />}

            {group.items.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 group relative',
                    collapsed && 'justify-center px-0 w-10 h-10 mx-auto',
                    active
                      ? 'text-[#141414] font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute inset-0 bg-[#E2E800] rounded-xl shadow-chartreuse-sm"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                    />
                  )}

                  <Icon
                    className={cn(
                      'w-4.5 h-4.5 flex-shrink-0 relative z-10 transition-colors',
                      active ? 'text-[#141414] fill-current/20' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  />

                  {!collapsed && (
                    <span className="relative z-10 truncate">{item.label}</span>
                  )}

                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        'ml-auto relative z-10 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border',
                        active
                          ? 'bg-[#141414]/15 text-[#141414] border-[#141414]/20'
                          : 'bg-black/5 dark:bg-white/5 text-muted-foreground border-black/10 dark:border-white/10'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip for collapsed mode */}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2.5 py-1 bg-popover border border-border rounded-lg text-xs font-semibold text-popover-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                      {item.label}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User Info & Collapse Button */}
      <div className="border-t border-black/10 dark:border-white/10 flex-shrink-0 p-2">
        {!collapsed && (
          user ? (
            <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/[0.04] mb-1.5 border border-black/10 dark:border-white/10">
              <div className="w-7 h-7 rounded-lg bg-[#E2E800] text-[#141414] flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">{displayName}</p>
                <p className="text-[10px] text-muted-foreground font-mono truncate">
                  {user.role === 'admin' ? 'Faculty Admin' : `Sem ${user.semester || '4'} • CSE`}
                </p>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all mb-1.5"
            >
              <span>Sign In / Demo</span>
            </Link>
          )
        )}

        <button
          onClick={() => onCollapse(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
