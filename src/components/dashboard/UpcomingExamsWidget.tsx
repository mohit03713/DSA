'use client'

import Link from 'next/link'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_UPCOMING_EXAMS } from '@/lib/constants/demoData'
import { getDaysUntil } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function UpcomingExamsWidget() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
          <Calendar className="w-4 h-4 fill-current/30" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Upcoming Exams</h3>
        </div>
      </div>

      <div className="space-y-3">
        {DEMO_UPCOMING_EXAMS.map((exam, idx) => {
          const daysLeft = exam.daysLeft ?? getDaysUntil(exam.date)
          const isUrgent = daysLeft <= 7
          const isSoon = daysLeft <= 14 && !isUrgent
          const displayDate = (exam as { formattedDate?: string }).formattedDate || 'Upcoming'
          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
            >
              <Link
                href="/exam-ai"
                className={cn(
                  'flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all block group hover:brightness-105',
                  isUrgent
                    ? 'border-[#E2E800]/40 bg-[#E2E800]/10 dark:bg-[#E2E800]/10'
                    : isSoon
                    ? 'border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/[0.04]'
                    : 'border-black/10 dark:border-white/[0.08] bg-black/5 dark:bg-white/[0.02]'
                )}
              >
              {/* Countdown block */}
              <div
                className={cn(
                  'w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 font-bold border',
                  isUrgent
                    ? 'bg-[#E2E800] border-[#E2E800] text-[#141414] shadow-chartreuse-sm'
                    : 'bg-black/10 dark:bg-white/10 border-black/15 dark:border-white/15 text-foreground'
                )}
              >
                <span className="text-base leading-none font-mono font-extrabold">{daysLeft}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider">d</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground leading-tight">{exam.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-medium font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-muted-foreground border border-black/10 dark:border-white/10">
                    {exam.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{displayDate}</span>
                  </div>
                </div>
              </div>

              {isUrgent && (
                <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#141414] bg-[#E2E800] px-2.5 py-0.5 rounded-full shadow-chartreuse-sm whitespace-nowrap">
                  <AlertCircle className="w-3 h-3" />
                  Urgent
                </div>
              )}
            </Link>
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
