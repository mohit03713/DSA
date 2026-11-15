'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, BookOpen, Binary, FlaskConical, FileText, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const SEARCH_ITEMS = [
  { id: '1', label: 'Bubble Sort', type: 'topic', subject: 'DS', href: '/topics/bubble-sort' },
  { id: '2', label: 'Binary Search Tree', type: 'topic', subject: 'DS', href: '/topics/bst' },
  { id: '3', label: 'Process Scheduling', type: 'topic', subject: 'OS', href: '/topics/process-scheduling' },
  { id: '4', label: 'SQL Joins', type: 'topic', subject: 'DBMS', href: '/topics/sql-joins' },
  { id: '5', label: 'Dijkstra\'s Algorithm', type: 'dsa', subject: 'Graph', href: '/dsa/problems/dijkstra' },
  { id: '6', label: 'Lab 5 - Graph Traversal', type: 'lab', subject: 'DS', href: '/labs/ds/5/1' },
  { id: '7', label: 'Deadlock Avoidance', type: 'topic', subject: 'OS', href: '/topics/deadlock' },
  { id: '8', label: 'Normalization - 1NF/2NF/3NF', type: 'topic', subject: 'DBMS', href: '/topics/normalization' },
]

const TYPE_ICON = {
  topic: BookOpen,
  dsa: Binary,
  lab: FlaskConical,
  note: FileText,
}

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const filtered = SEARCH_ITEMS.filter(
    (item) =>
      query.length > 0 &&
      item.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, labs, DSA problems..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {query.length === 0 && (
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-3">Quick Links</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'DSA Library', href: '/dsa' },
                { label: 'AI Tutor', href: '/tutor' },
                { label: 'Exam AI', href: '/exam-ai' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm text-foreground transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {query.length > 0 && filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No results for "{query}"
          </div>
        )}

        {filtered.length > 0 && (
          <div className="max-h-72 overflow-y-auto divide-y divide-border">
            {filtered.map((item) => {
              const Icon = TYPE_ICON[item.type as keyof typeof TYPE_ICON] || BookOpen
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.type} · {item.subject}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              )
            })}
          </div>
        )}

        <div className="px-4 py-2 border-t border-border flex gap-4 text-[11px] text-muted-foreground">
          <span>↵ to select</span>
          <span>↑↓ to navigate</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  )
}

