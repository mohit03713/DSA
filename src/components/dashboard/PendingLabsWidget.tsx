'use client'

import Link from 'next/link'
import { FlaskConical, ArrowRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_PENDING_LABS } from '@/lib/constants/demoData'
import { getDaysUntil } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function PendingLabsWidget() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
            <FlaskConical className="w-4 h-4 fill-current/30" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Pending Labs</h3>
          </div>
        </div>
        <Link
          href="/labs"
          className="text-xs font-mono font-semibold text-[#E2E800] dark:text-[#E2E800] hover:underline flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {DEMO_PENDING_LABS.map((lab, idx) => {
          const daysLeft = (lab as { daysLeft?: number }).daysLeft ?? getDaysUntil(lab.dueDate)
          const isUrgent = daysLeft <= 2
          const pct = Math.round((lab.questionsDone / lab.questionsTotal) * 100)
          const labNo = (lab as { labNo?: number }).labNo || idx + 1
          const subjectId = (lab as { subjectId?: string }).subjectId || (lab.subject.toLowerCase().includes('image') ? 'dip' : 'ds')
          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
            >
              <Link
                href={`/labs/${subjectId}/${labNo}`}
                className="block p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.08] transition-all group"
              >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30">
                      LAB {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground leading-tight">{lab.title}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{lab.subject}</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap ml-2 border font-medium',
                    isUrgent
                      ? 'text-[#141414] bg-[#E2E800] border-[#E2E800] font-bold shadow-chartreuse-sm'
                      : 'text-muted-foreground bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'
                  )}
                >
                  <Clock className="w-3 h-3" />
                  <span>{daysLeft <= 0 ? 'Overdue' : `${daysLeft}d left`}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2.5 mt-2">
                <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#E2E800] rounded-full shadow-chartreuse-sm"
                  />
                </div>
                <span className="text-xs text-muted-foreground font-mono font-bold whitespace-nowrap">
                  {lab.questionsDone}/{lab.questionsTotal}
                </span>
              </div>
            </Link>
          </motion.div>
        )
        })}
      </div>
    </div>
  )
}
