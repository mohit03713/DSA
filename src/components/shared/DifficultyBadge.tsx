'use client'

import { cn } from '@/lib/utils'
import type { Difficulty } from '@/types'

const CONFIG: Record<Difficulty, { label: string; dot: string; className: string }> = {
  Easy: {
    label: 'Easy',
    dot: 'bg-[#E2E800] shadow-[0_0_6px_rgba(226,232,0,0.8)]',
    className: 'bg-[#E2E800]/15 text-[#E2E800] border-[#E2E800]/30',
  },
  Medium: {
    label: 'Medium',
    dot: 'bg-[#D6D6D6] shadow-[0_0_6px_rgba(214,214,214,0.6)]',
    className: 'bg-black/5 dark:bg-white/10 text-foreground border-black/10 dark:border-white/15',
  },
  Hard: {
    label: 'Hard',
    dot: 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]',
    className: 'bg-red-500/15 text-red-500 border-red-500/30',
  },
}

interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = CONFIG[difficulty] || CONFIG.Easy
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border backdrop-blur-md',
        config.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  )
}
