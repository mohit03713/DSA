'use client'

import { usePathname } from 'next/navigation'
import { Search, Bell, Moon, Sun, User, LogOut, Settings, ChevronRight, ShieldCheck } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/context/AuthContext'

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/dashboard' }]
  const labelMap: Record<string, string> = {
    dashboard: 'Dashboard',
    subjects: 'Subjects',
    topics: 'Topics',
    dsa: 'DSA Library',
    problems: 'Problems',
    labs: 'Labs',
    practice: 'Code Editor',
    'exam-ai': 'Exam AI',
    tutor: 'AI Tutor',
    notes: 'Notes',
    progress: 'Progress',
    bookmarks: 'Bookmarks',
    settings: 'Settings',
    admin: 'Admin',
  }
  let href = ''
  segments.forEach((seg) => {
    href += `/${seg}`
    if (!seg.startsWith('[')) {
      crumbs.push({ label: labelMap[seg] || seg, href })
    }
  })
  return crumbs
}

export function TopNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const [userOpen, setUserOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const crumbs = getBreadcrumbs(pathname)

  const displayName = user?.name || 'Mohit Sharma'
  const displayEmail = user?.email || 'mohit.sharma@chitkara.edu.in'
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'MS'

  return (
    <header className="h-16 border-b border-black/10 dark:border-white/10 liquid-glass flex items-center px-4 md:px-6 gap-4 sticky top-0 z-20">
      {/* Breadcrumbs */}
      <nav className="hidden sm:flex items-center gap-1.5 text-sm flex-1 min-w-0">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
            {i === crumbs.length - 1 ? (
              <span className="font-bold text-foreground truncate text-xs md:text-sm">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors truncate font-medium"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Global Quick Search Button */}
      <div className="flex-1 sm:flex-none sm:w-64 max-w-sm">
        <button className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/[0.04] text-muted-foreground text-xs hover:text-foreground transition-colors border border-black/10 dark:border-white/10">
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search topics, labs, codes...</span>
          <span className="sm:hidden">Search...</span>
          <span className="ml-auto text-[10px] font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-black/10 dark:border-white/10"
          aria-label="Toggle theme"
          title="Toggle light / dark mode"
        >
          <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative border border-black/10 dark:border-white/10"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#E2E800] rounded-full shadow-chartreuse-sm" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 liquid-glass border border-black/15 dark:border-white/15 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                  <p className="font-bold text-xs uppercase tracking-wider text-foreground font-mono">Notifications</p>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E2E800] text-[#141414]">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-black/10 dark:divide-white/10">
                  {[
                    { text: 'Lab 5 is due tomorrow at 11:59 PM', time: '1h ago' },
                    { text: 'AI Tutor analyzed your binary tree solution', time: '3h ago' },
                    { text: 'Mid-term exam predictions updated', time: '1d ago' },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                      <p className="text-xs font-semibold text-foreground">{n.text}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Menu or Sign In */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-black/10 dark:border-white/10"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E2E800] text-[#141414] flex items-center justify-center font-extrabold text-xs shadow-chartreuse-sm">
                {initials}
              </div>
              <span className="hidden md:block text-xs font-bold text-foreground">
                {displayName.split(' ')[0]}
              </span>
            </button>

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 liquid-glass border border-black/15 dark:border-white/15 rounded-2xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-sm text-foreground truncate">{displayName}</p>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#E2E800] text-[#141414]">
                        {user.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5 font-medium">{displayEmail}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-1">
                      Semester {user.semester || '4'} • {user.branch || 'CSE'}
                    </p>
                  </div>

                  <div className="p-1.5 space-y-0.5">
                    <Link
                      href="/progress"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
                      onClick={() => setUserOpen(false)}
                    >
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      Profile & Analytics
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-foreground"
                      onClick={() => setUserOpen(false)}
                    >
                      <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                      Preferences & Dark Mode
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#E2E800]"
                        onClick={() => setUserOpen(false)}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Faculty Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setUserOpen(false)
                        logout()
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl hover:bg-red-500/10 text-red-500 transition-colors border-t border-black/10 dark:border-white/10 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-sm transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  )
}
