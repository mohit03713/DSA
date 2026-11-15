'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { DEMO_SUBJECTS } from '@/lib/constants/demoData'

const RING_COLORS = ['#E2E800', '#D6D6D6', '#E2E800', '#979797', '#E2E800', '#D6D6D6']

function ProgressRing({
  progress,
  size = 46,
  color = '#E2E800',
}: {
  progress: number
  size?: number
  color?: string
}) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={3.5}
        className="text-black/10 dark:text-white/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function SubjectProgressCard() {
  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground">Subject Progress</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Core B.Tech syllabus tracks</p>
        </div>
        <Link
          href="/subjects"
          className="text-xs font-mono font-semibold text-[#E2E800] dark:text-[#E2E800] hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-3"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {DEMO_SUBJECTS.map((subject, i) => {
          const ringColor = RING_COLORS[i % RING_COLORS.length]
          return (
            <motion.div key={subject.id} variants={itemVariants}>
              <Link
                href={`/subjects/${subject.id}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-black/10 dark:border-white/[0.08] transition-all group"
              >
                <div className="relative flex-shrink-0">
                  <ProgressRing progress={subject.progress} size={44} color={ringColor} />
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono"
                    style={{ color: ringColor }}
                  >
                    {subject.progress}%
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground leading-tight group-hover:text-[#E2E800] transition-colors">
                    {subject.name}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {subject.code}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {subject.topicCount} topics
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
