'use client'

import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  BarChart2,
  Zap,
} from 'lucide-react'
import { DEMO_SUBJECTS, DEMO_DSA_CATEGORIES } from '@/lib/constants/demoData'

export default function ProgressPage() {
  const totalTopics = DEMO_SUBJECTS.reduce((acc, s) => acc + s.topicCount, 0)
  const averageProgress = Math.round(
    DEMO_SUBJECTS.reduce((acc, s) => acc + s.progress, 0) / DEMO_SUBJECTS.length
  )
  const totalDSASolved = DEMO_DSA_CATEGORIES.reduce((acc, c) => acc + c.solvedCount, 0)
  const totalDSAProblems = DEMO_DSA_CATEGORIES.reduce((acc, c) => acc + c.problemCount, 0)

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <TrendingUp className="w-4 h-4" /> Academic Performance & Mastery
        </div>
        <h1 className="text-3xl font-bold text-foreground">Learning Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track semester progress, DSA problem mastery, study streaks, and subject completion.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Curriculum Progress</div>
            <div className="text-2xl font-bold text-foreground">{averageProgress}%</div>
            <div className="text-[11px] text-emerald-500 mt-0.5">Across 4 subjects</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Active Study Streak</div>
            <div className="text-2xl font-bold text-foreground">14 Days</div>
            <div className="text-[11px] text-amber-500 mt-0.5">Top 5% consistency</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">DSA Problems Solved</div>
            <div className="text-2xl font-bold text-foreground">
              {totalDSASolved} / {totalDSAProblems}
            </div>
            <div className="text-[11px] text-purple-400 mt-0.5">
              {Math.round((totalDSASolved / totalDSAProblems) * 100)}% solved
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">Study Hours Logged</div>
            <div className="text-2xl font-bold text-foreground">48.5 hrs</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">This semester</div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Mastery Breakdown */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Subject-Wise Completion
        </h2>
        <div className="space-y-6">
          {DEMO_SUBJECTS.map((subject) => (
            <div key={subject.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span>{subject.name}</span>
                  <span className="text-xs text-muted-foreground">({subject.code})</span>
                </div>
                <div className="font-bold text-foreground">{subject.progress}%</div>
              </div>
              <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
                <span>{subject.unitCount} Units · {subject.topicCount} Topics</span>
                <span>Target: 100% before Final Exams</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DSA Category Mastery Grid */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary" />
          DSA Category Breakdown
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_DSA_CATEGORIES.map((cat) => {
            const pct = Math.round((cat.solvedCount / cat.problemCount) * 100)
            return (
              <div key={cat.id} className="bg-secondary/30 border border-border/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{cat.name}</span>
                  <span className="text-xs font-bold text-primary">{pct}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {cat.solvedCount} of {cat.problemCount} solved
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

