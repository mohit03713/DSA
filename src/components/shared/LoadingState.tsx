'use client'

import { cn } from '@/lib/utils'

interface LoadingStateProps {
  variant?: 'card' | 'list' | 'page' | 'inline'
  count?: number
  className?: string
}

function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/10', className)}
      style={style}
    />
  )
}

function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 'w-5 h-5 border-2' : size === 'lg' ? 'w-10 h-10 border-3' : 'w-7 h-7 border-2'
  return (
    <div
      className={cn('rounded-full border-black/10 dark:border-white/10 border-t-[#E2E800] animate-spin', dim)}
    />
  )
}

export function LoadingState({ variant = 'card', count = 3, className }: LoadingStateProps) {
  if (variant === 'inline') {
    return (
      <span className={cn('inline-flex items-center gap-2', className)}>
        <Spinner size="sm" />
        <span className="text-xs font-mono text-muted-foreground animate-pulse">Loading...</span>
      </span>
    )
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center gap-2.5 mb-3">
          <Spinner size="sm" />
          <span className="text-xs font-mono text-muted-foreground">Loading items...</span>
        </div>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex gap-3.5 p-3.5 rounded-2xl liquid-glass"
            style={{ opacity: 1 - i * 0.15 }}
          >
            <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'page') {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner size="lg" />
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Loading workspace...
          </p>
        </div>
        <Skeleton className="h-28 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-3xl" style={{ opacity: 1 - i * 0.1 }} />
          ))}
        </div>
      </div>
    )
  }

  // Default: card grid
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="liquid-glass rounded-3xl p-5 space-y-3"
          style={{ opacity: 1 - i * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <div className="pt-2 flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}
