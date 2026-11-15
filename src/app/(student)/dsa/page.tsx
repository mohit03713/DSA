'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  CheckCircle2,
  Circle,
  Binary,
  Layers,
  ArrowUpDown,
  Filter,
  ArrowRight,
  Bookmark,
  Sparkles,
  GitBranch,
  Network,
  Link2,
} from 'lucide-react'
import { DEMO_DSA_CATEGORIES } from '@/lib/constants/demoData'
import { DSA_PROBLEMS } from '@/lib/constants/dsaData'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'

export default function DSALibraryPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredProblems = DSA_PROBLEMS.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false
    if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false
    if (selectedStatus === 'solved' && !p.isSolved) return false
    if (selectedStatus === 'unsolved' && p.isSolved) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const matchTitle = p.title.toLowerCase().includes(q)
      const matchTag = p.tags.some((t) => t.toLowerCase().includes(q))
      if (!matchTitle && !matchTag) return false
    }
    return true
  })

  const solvedCount = DSA_PROBLEMS.filter((p) => p.isSolved).length

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
            <Binary className="w-4 h-4" /> Complete DSA Library
          </div>
          <h1 className="text-3xl font-bold text-foreground">Data Structures & Algorithms</h1>
          <p className="text-muted-foreground mt-1">
            Master university & interview coding problems with C and C++ multi-approach solutions.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
            {solvedCount}/{DSA_PROBLEMS.length}
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Problems Solved</div>
            <div className="text-sm font-bold text-foreground">
              {Math.round((solvedCount / DSA_PROBLEMS.length) * 100)}% Completed
            </div>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Carousel */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary/15 border-primary text-primary font-semibold shadow-sm'
                : 'bg-card border-border hover:bg-secondary/60 text-foreground'
            }`}
          >
            <div className="text-sm font-semibold">All Topics</div>
            <div className="text-xs text-muted-foreground mt-0.5">{DSA_PROBLEMS.length} problems</div>
          </button>
          {DEMO_DSA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary/15 border-primary text-primary font-semibold shadow-sm'
                  : 'bg-card border-border hover:bg-secondary/60 text-foreground'
              }`}
            >
              <div className="text-sm font-semibold truncate">{cat.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{cat.problemCount} problems</div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems, algorithms, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-secondary/50 rounded-xl text-sm border border-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-secondary/60 text-foreground text-xs px-3 py-2 rounded-xl border border-border focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-secondary/60 text-foreground text-xs px-3 py-2 rounded-xl border border-border focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>

          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all' || search) && (
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedDifficulty('all')
                setSelectedStatus('all')
                setSearch('')
              }}
              className="text-xs text-primary hover:underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Problem Table / List */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="divide-y divide-border">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Binary className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <h3 className="text-base font-semibold text-foreground">No problems found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search criteria or clearing your filters.
              </p>
            </div>
          ) : (
            filteredProblems.map((problem, idx) => (
              <div
                key={problem.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex-shrink-0">
                    {problem.isSolved ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/dsa/problems/${problem.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors text-base"
                      >
                        {problem.title}
                      </Link>
                      {problem.isBookmarked && (
                        <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <DifficultyBadge difficulty={problem.difficulty} />
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:block text-right text-xs text-muted-foreground">
                    <div>{problem.solveCount.toLocaleString()} solves</div>
                    <div className="text-[11px] text-emerald-500">
                      {problem.approaches.length} Solutions (C & C++)
                    </div>
                  </div>
                  <Link
                    href={`/dsa/problems/${problem.id}`}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <span>Solve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

