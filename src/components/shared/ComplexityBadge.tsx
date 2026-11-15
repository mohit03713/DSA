'use client'

import { cn } from '@/lib/utils'

interface ComplexityBadgeProps {
  value: string
  type?: 'time' | 'space'
  className?: string
}

export function ComplexityBadge({ value, type = 'time', className }: ComplexityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border backdrop-blur-md',
        type === 'time'
          ? 'bg-[#E2E800]/15 text-[#E2E800] border-[#E2E800]/30'
          : 'bg-black/5 dark:bg-white/10 text-foreground border-black/10 dark:border-white/15',
        className
      )}
    >
      <span className={type === 'time' ? 'text-[#E2E800]' : 'text-muted-foreground'}>
        {type === 'time' ? 'O(t):' : 'O(s):'}
      </span>
      <span>{value}</span>
    </span>
  )
}
