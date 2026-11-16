'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  FlaskConical,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle,
  HelpCircle,
} from 'lucide-react'
import { LABS_DATA } from '@/lib/constants/labsData'
import { DEMO_SUBJECTS } from '@/lib/constants/demoData'

function LabsContent() {
  const searchParams = useSearchParams()
  const subjectParam = searchParams.get('subject')

  const [selectedSubject, setSelectedSubject] = useState<string>('all')

  useEffect(() => {
    if (subjectParam) {
      setSelectedSubject(subjectParam)
    }
  }, [subjectParam])

  const filteredLabs = LABS_DATA.filter((lab) => {
    if (selectedSubject !== 'all' && lab.subjectId !== selectedSubject) return false
    return true
  })

  const currentSubjectObj = DEMO_SUBJECTS.find((s) => s.id === selectedSubject)

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
        {DEMO_SUBJECTS.map((sub) => {
          const count = LABS_DATA.filter((l) => l.subjectId === sub.id).length
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === sub.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-foreground hover:bg-secondary'
              }`}
            >
              {sub.name} {count > 0 && `(${count})`}
            </button>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredLabs.length === 0 && (
        <div className="bg-card border border-border rounded-3xl p-10 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            No Lab Manuals for {currentSubjectObj?.name || 'this subject'}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            University lab experiments are currently focused on Data Structures (CS201) and Digital Image Processing (CS405). You can explore the subject theory or review Data Structures practicals.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setSelectedSubject('all')}
              className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
            >
              View All Labs
            </button>
            {selectedSubject !== 'all' && (
              <Link
                href={`/subjects/${selectedSubject}`}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
              >
                Go to Subject Theory
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Labs Grid */}
      {filteredLabs.length > 0 && (
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
      )}
    </div>
  )
}

export default function LabsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Laboratory Practicals...</div>}>
      <LabsContent />
    </Suspense>
  )
}
