'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_WEAK_TOPICS } from '@/lib/constants/demoData'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'
import { cn } from '@/lib/utils'

export function WeakTopicsWidget() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-500/15 text-red-500 border border-red-500/30 flex items-center justify-center font-bold">
            <AlertTriangle className="w-4 h-4 fill-current/20" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Needs Attention</h3>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {DEMO_WEAK_TOPICS.map((topic, idx) => {
          const isLow = topic.score < 40
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
            >
              <Link
                href={`/topics/${topic.id}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.08] transition-all group"
              >
                {/* Score badge */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 font-mono border',
                    isLow
                      ? 'bg-red-500/15 text-red-500 border-red-500/30'
                      : 'bg-[#E2E800]/15 text-[#E2E800] border-[#E2E800]/30'
                  )}
                >
                  {topic.score}%
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate group-hover:text-[#E2E800] transition-colors">
                    {topic.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{topic.subject}</p>

                  {/* Progress bar */}
                  <div className="mt-1.5 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.score}%` }}
                      transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        'h-full rounded-full',
                        isLow ? 'bg-red-500' : 'bg-[#E2E800]'
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <DifficultyBadge difficulty={topic.difficulty} />
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
