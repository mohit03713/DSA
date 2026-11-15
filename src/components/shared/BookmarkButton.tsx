'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface BookmarkButtonProps {
  isBookmarked?: boolean
  itemId: string
  itemType: 'topic' | 'dsa' | 'lab'
  className?: string
}

export function BookmarkButton({
  isBookmarked: initialBookmarked = false,
  itemId,
  itemType,
  className,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [animating, setAnimating] = useState(false)

  const toggle = () => {
    setAnimating(true)
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Bookmark removed' : 'Bookmarked!')
    setTimeout(() => setAnimating(false), 300)
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200',
        bookmarked
          ? 'bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 shadow-chartreuse-sm'
          : 'bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10',
        animating && 'scale-110',
        className
      )}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-4.5 h-4.5" />
      ) : (
        <Bookmark className="w-4.5 h-4.5" />
      )}
    </button>
  )
}

