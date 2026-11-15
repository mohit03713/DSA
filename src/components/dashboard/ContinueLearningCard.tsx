'use client'

import Link from 'next/link'
import { Clock, ArrowRight, Play, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_CONTINUE_LEARNING } from '@/lib/constants/demoData'
import { formatRelativeTime } from '@/lib/utils'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function ContinueLearningCard() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4 fill-current/30" />
          </div>
          <div>
            <h3 className="font-bold text-foreground tracking-tight">Continue Learning</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Resume your recent problem sessions</p>
          </div>
        </div>
        <Link
          href="/subjects"
          className="text-xs font-mono font-semibold text-[#E2E800] dark:text-[#E2E800] hover:underline flex items-center gap-1 transition-colors"
        >
          All topics <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Items */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {DEMO_CONTINUE_LEARNING.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.08] transition-all group"
          >
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                <DifficultyBadge difficulty={item.difficulty} />
              </div>
              <p className="text-xs text-muted-foreground font-mono truncate">{item.unit}</p>

              {/* Progress bar in Electric Chartreuse */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden border border-black/5 dark:border-white/5">
                  <div
                    className="h-full bg-[#E2E800] rounded-full transition-all duration-500 shadow-chartreuse-sm"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-mono font-bold whitespace-nowrap">
                  {item.progress}%
                </span>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground text-xs font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatRelativeTime(item.lastStudied)}</span>
                <span>• ~{item.estimatedMinutes}min left</span>
              </div>
            </div>

            {/* Play button in Electric Chartreuse */}
            <Link
              href={`/topics/${item.topicId}`}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#E2E800] hover:bg-[#E2E800]/90 text-[#141414] flex items-center justify-center transition-all shadow-chartreuse-sm group-hover:scale-105"
              title="Resume topic"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
