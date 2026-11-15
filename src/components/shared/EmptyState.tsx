'use client'

import { cn } from '@/lib/utils'
import { FileQuestion, SearchX, FlaskConical, BookOpen } from 'lucide-react'

interface EmptyStateProps {
  variant?: 'default' | 'search' | 'labs' | 'notes'
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

const ICONS = {
  default: FileQuestion,
  search: SearchX,
  labs: FlaskConical,
  notes: BookOpen,
}

export function EmptyState({
  variant = 'default',
  title = 'Nothing here yet',
  description = 'No content to display at the moment.',
  action,
  className,
}: EmptyStateProps) {
  const Icon = ICONS[variant]

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center liquid-glass rounded-3xl', className)}>
      {/* Illustration area */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-[#E2E800]/10 border border-[#E2E800]/25 flex items-center justify-center shadow-chartreuse-sm">
          <Icon className="w-8 h-8 text-[#E2E800]" />
        </div>
      </div>

      {/* Text */}
      <h3 className="font-bold text-lg text-foreground mb-1 tracking-tight">{title}</h3>
      <p className="text-xs md:text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed font-medium">{description}</p>

      {/* Action */}
      {action}
    </div>
  )
}
