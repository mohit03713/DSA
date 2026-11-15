'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FlaskConical,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle,
} from 'lucide-react'
import { LABS_DATA } from '@/lib/constants/labsData'
import { DEMO_SUBJECTS } from '@/lib/constants/demoData'

export default function LabsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all')

  const filteredLabs = LABS_DATA.filter((lab) => {
    if (selectedSubject !== 'all' && lab.subjectId !== selectedSubject) return false
    return true
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
            <FlaskConical className="w-4 h-4" /> University Lab Assignments
          </div>
          <h1 className="text-3xl font-bold text-foreground">Laboratory Practicals</h1>
          <p className="text-muted-foreground mt-1">
            Complete curriculum lab manuals with step-by-step algorithms, C & C++ code, and dry runs.
          </p>
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedSubject('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedSubject === 'all'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-card border border-border text-foreground hover:bg-secondary'
          }`}
        >
          All Subjects ({LABS_DATA.length} Labs)
        </button>
        {DEMO_SUBJECTS.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubject(sub.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubject === sub.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-foreground hover:bg-secondary'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLabs.map((lab) => {
          const completedCount = lab.questions.filter((q) => q.isCompleted).length
          const totalQuestions = lab.questions.length
          const percent = Math.round((completedCount / totalQuestions) * 100)

          return (
            <div
              key={lab.id}
              className="bg-card border border-border rounded-2xl p-6 card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-semibold">
                    {lab.subjectName} · Lab {lab.labNo}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    Due: {lab.dueDate}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {lab.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {lab.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-semibold text-foreground">
                      {completedCount} of {totalQuestions} questions completed ({percent}%)
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {totalQuestions} comprehensive practicals
                </div>
                <Link
                  href={`/labs/${lab.subjectId}/${lab.labNo}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all"
                >
                  <span>Open Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

