'use client'

import Link from 'next/link'
import { Sparkles, Clock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_AI_RECOMMENDATIONS } from '@/lib/constants/demoData'
import { cn } from '@/lib/utils'

export function AIRecommendationsWidget() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 fill-current/30" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">AI Recommendations</h3>
          </div>
        </div>
        <span className="text-[11px] liquid-pill font-mono font-bold px-2.5 py-1 rounded-full">
          Personalized
        </span>
      </div>

      <div className="space-y-3">
        {DEMO_AI_RECOMMENDATIONS.map((rec, idx) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
          >
            <Link
              href={`/topics/${rec.topicId}`}
              className="block p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.08] transition-all group"
            >
              <div className="flex items-start gap-3">
                {/* Priority dot */}
                <span
                  className={cn(
                    'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                    rec.priority === 'high'
                      ? 'bg-[#E2E800] shadow-[0_0_8px_rgba(226,232,0,0.8)]'
                      : 'bg-muted-foreground'
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground group-hover:text-[#E2E800] transition-colors leading-snug">
                    {rec.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rec.reason}
                  </p>
                  <div className="flex items-center gap-2 mt-2 font-mono">
                    <span className="bg-black/5 dark:bg-white/5 text-foreground text-[11px] px-2 py-0.5 rounded-md border border-black/10 dark:border-white/10 font-semibold">
                      {rec.subject}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      ~{rec.estimatedMinutes}min
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
