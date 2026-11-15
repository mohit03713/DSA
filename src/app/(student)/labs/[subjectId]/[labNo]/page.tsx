'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  Circle,
  ArrowRight,
  Code2,
  FileCode,
  Sparkles,
} from 'lucide-react'
import { LABS_DATA } from '@/lib/constants/labsData'

export default function LabDetailPage({
  params,
}: {
  params: { subjectId: string; labNo: string }
}) {
  const lab = LABS_DATA.find(
    (l) => l.subjectId === params.subjectId && l.labNo === parseInt(params.labNo, 10)
  )

  if (!lab) return notFound()

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/labs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Labs
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {lab.subjectName} · Lab Manual #{lab.labNo}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {lab.title}
            </h1>
            <p className="text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              {lab.description}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-xl text-xs text-muted-foreground self-start md:self-center">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Submission Deadline: <strong className="text-foreground">{lab.dueDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Lab Questions List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileCode className="w-5 h-5 text-primary" />
          Practical Assignment Questions ({lab.questions.length})
        </h2>

        <div className="space-y-4">
          {lab.questions.map((q) => (
            <div
              key={q.id}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                    Q{q.number}
                  </div>
                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">
                    {q.title}
                  </h3>
                  {q.isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 pl-10">
                  {q.statement}
                </p>

                <div className="flex items-center gap-2 pl-10 flex-wrap">
                  {q.requiredConcepts.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-md"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="text-[11px] text-muted-foreground font-mono">
                    Time: {q.timeComplexity} | Space: {q.spaceComplexity}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-10 md:pl-0 flex-shrink-0">
                <Link
                  href={`/labs/${lab.subjectId}/${lab.labNo}/${q.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold transition-colors"
                >
                  <span>View Full Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

