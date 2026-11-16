'use client'

import Link from 'next/link'
import { Clock, ArrowRight, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_RECENT_TOPICS } from '@/lib/constants/demoData'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
}

export function RecentTopicsWidget() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-foreground tracking-tight">Recent Topics</h3>
          </div>
        </div>
        <Link
          href="/subjects"
          className="text-xs font-mono font-semibold text-[#E2E800] dark:text-[#E2E800] hover:underline flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Timeline list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-1 relative"
      >
        <div className="absolute left-[13px] top-3 bottom-3 w-px bg-black/10 dark:bg-white/10" />

        {DEMO_RECENT_TOPICS.map((topic, idx) => (
          <motion.div key={topic.id} variants={itemVariants}>
            <Link
              href={`/topics/${(topic as { topicId?: string }).topicId || topic.id}`}
              className="flex items-center gap-3.5 pl-3.5 pr-3 py-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent transition-all group relative"
            >
              {/* Timeline dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 relative z-10 ${
                  idx === 0 ? 'bg-[#E2E800] shadow-[0_0_8px_rgba(226,232,0,0.8)]' : 'bg-muted-foreground/40'
                }`}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground group-hover:text-[#E2E800] transition-colors truncate">
                  {topic.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono text-muted-foreground font-semibold">
                    {topic.subject}
                  </span>
                  <span className="text-[10px] text-muted-foreground opacity-60">•</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {(topic as { timeAgo?: string }).timeAgo || 'Recently'}
                  </span>
                </div>
              </div>

              {/* Resume CTA */}
              <span className="text-xs font-mono font-bold text-[#E2E800] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <RotateCcw className="w-3 h-3" />
                Resume
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
