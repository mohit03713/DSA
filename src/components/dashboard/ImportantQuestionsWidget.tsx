'use client'

import Link from 'next/link'
import { Star, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_IMPORTANT_QUESTIONS } from '@/lib/constants/demoData'

function DifficultyBadge({ difficulty }: { difficulty?: string }) {
  if (!difficulty) return null
  const map: Record<string, { label: string; cls: string }> = {
    Easy: {
      label: 'Easy',
      cls: 'text-[#E2E800] bg-[#E2E800]/15 border-[#E2E800]/30',
    },
    Medium: {
      label: 'Med',
      cls: 'text-foreground bg-black/10 dark:bg-white/10 border-black/15 dark:border-white/15',
    },
    Hard: {
      label: 'Hard',
      cls: 'text-red-500 bg-red-500/15 border-red-500/30',
    },
  }
  const config = map[difficulty] || map['Medium']
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${config.cls}`}>
      {config.label}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
}

export function ImportantQuestionsWidget() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
          <Star className="w-4 h-4 fill-current/30" />
        </div>
        <div>
          <h3 className="font-bold text-foreground tracking-tight">Important Questions</h3>
        </div>
        <span className="ml-auto text-[10px] text-muted-foreground font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-2.5 py-1 rounded-full font-bold">
          Exam Focus
        </span>
      </div>

      {/* Questions list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-2.5"
      >
        {DEMO_IMPORTANT_QUESTIONS.map((q) => (
          <motion.div key={q.id} variants={itemVariants}>
            <Link
              href="/exam-ai"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.08] transition-all group cursor-pointer block"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-muted-foreground border border-black/10 dark:border-white/10">
                    {q.subject}
                  </span>
                  <DifficultyBadge difficulty={(q as { difficulty?: string }).difficulty} />
                  {(q as { marks?: number }).marks && (
                    <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                      {(q as { marks?: number }).marks}M
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-foreground group-hover:text-[#E2E800] transition-colors leading-snug line-clamp-2">
                  {q.question}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
