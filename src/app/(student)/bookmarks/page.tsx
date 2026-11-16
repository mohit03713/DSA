'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bookmark,
  Trash2,
  BookOpen,
  Binary,
  FlaskConical,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

interface SavedBookmark {
  id: string
  title: string
  type: 'topic' | 'dsa' | 'lab'
  category: string
  href: string
  savedAt: string
}

const INITIAL_BOOKMARKS: SavedBookmark[] = [
  {
    id: 'b1',
    title: 'Two Sum (Hash Map Approach)',
    type: 'dsa',
    category: 'DSA Problem · Arrays',
    href: '/dsa/problems/two-sum',
    savedAt: '2 days ago',
  },
  {
    id: 'b2',
    title: 'Bubble Sort In-Place Implementation & Analysis',
    type: 'topic',
    category: 'Data Structures · Unit 3',
    href: '/topics/selection-bubble-insertion',
    savedAt: '3 days ago',
  },
  {
    id: 'b3',
    title: 'Binary Search on Sorted Array (Lab 1)',
    type: 'lab',
    category: 'DS Lab Manual · Lab 1',
    href: '/labs/ds/1/q1',
    savedAt: '5 days ago',
  },
  {
    id: 'b4',
    title: 'Dijkstra\'s Shortest Path Algorithm',
    type: 'dsa',
    category: 'DSA Problem · Graphs',
    href: '/dsa/problems/dijkstra-shortest-path',
    savedAt: '1 week ago',
  },
  {
    id: 'b5',
    title: 'Image Sampling & Quantization (with Numericals)',
    type: 'topic',
    category: 'Digital Image Processing · Unit 1',
    href: '/topics/sampling-quantization',
    savedAt: 'Just now',
  },
]

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>(INITIAL_BOOKMARKS)
  const [filter, setFilter] = useState<'all' | 'topic' | 'dsa' | 'lab'>('all')

  const handleDelete = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  const filtered = bookmarks.filter((b) => {
    if (filter !== 'all' && b.type !== filter) return false
    return true
  })

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <Bookmark className="w-4 h-4" /> Quick Revision Vault
        </div>
        <h1 className="text-3xl font-bold text-foreground">Saved Bookmarks</h1>
        <p className="text-muted-foreground mt-1">
          Your bookmarked topics, algorithms, coding problems, and lab solutions for quick pre-exam review.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-card border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All Items ({bookmarks.length})
        </button>
        <button
          onClick={() => setFilter('topic')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'topic'
              ? 'bg-card border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Theory Topics
        </button>
        <button
          onClick={() => setFilter('dsa')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'dsa'
              ? 'bg-card border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          DSA Coding Problems
        </button>
        <button
          onClick={() => setFilter('lab')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filter === 'lab'
              ? 'bg-card border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Lab Practicals
        </button>
      </div>

      {/* Bookmarks List */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm divide-y divide-border">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
            <h3 className="text-base font-semibold text-foreground">No bookmarks in this section</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Click the bookmark icon on any topic, DSA problem, or lab question to save it here.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {item.type === 'dsa' ? (
                    <Binary className="w-4 h-4" />
                  ) : item.type === 'lab' ? (
                    <FlaskConical className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="font-semibold text-foreground hover:text-primary transition-colors text-sm sm:text-base truncate"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>Saved {item.savedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={item.href}
                  className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

