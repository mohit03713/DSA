import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import { DEMO_SUBJECTS } from '@/lib/constants/demoData'
import { SUBJECT_CURRICULUM } from '@/lib/constants/curriculum'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'

export const metadata: Metadata = { title: 'Subject Detail' }

export default function SubjectDetailPage({ params }: { params: { subjectId: string } }) {
  const subject = DEMO_SUBJECTS.find((s) => s.id === params.subjectId)
  if (!subject) notFound()

  const units = SUBJECT_CURRICULUM[subject.id] || SUBJECT_CURRICULUM['ds']

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link href="/subjects" className="hover:text-foreground">
              Subjects
            </Link>
            <span>/</span>
            <span className="text-foreground">{subject.name}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{subject.name}</h1>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">
            {subject.code} · {units.length} Units · Curriculum Semester {subject.semester}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {subject.id === 'dip' && (
            <>
              <Link
                href="/subjects/dip/formulas"
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                ∑ Formula Sheet
              </Link>
              <Link
                href="/subjects/dip/visualizer"
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                ✨ Interactive Studio
              </Link>
            </>
          )}
          <DifficultyBadge difficulty={subject.difficulty} />
          <Link
            href={`/labs?subject=${subject.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-xs font-semibold text-foreground transition-colors"
          >
            Subject Labs
          </Link>
        </div>
      </div>

      {subject.id === 'dip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/subjects/dip/formulas"
            className="bg-gradient-to-r from-cyan-950/40 via-card to-card border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-2xl transition-all group flex items-start justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Exam Preparation
              </span>
              <h3 className="text-base font-bold text-foreground group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>📐</span> Unit-wise Formula Sheet & Solved Numericals
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Step-by-step arithmetic, derivation steps, exam tips, and quick-search for Units 1 through 5.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-cyan-400 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/subjects/dip/visualizer"
            className="bg-gradient-to-r from-cyan-950/40 via-card to-card border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-2xl transition-all group flex items-start justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Visual Learning
              </span>
              <h3 className="text-base font-bold text-foreground group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>✨</span> Interactive DIP Studio & Animated Simulators
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Live 2D spatial convolution mask sliding, histogram equalization generator, and pixel distance calculator.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-cyan-400 mt-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      <div className="space-y-5">
        {units.map((unit) => (
          <div key={unit.id} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Unit {unit.number}
                </span>
                <h3 className="font-bold text-foreground text-base md:text-lg">{unit.title}</h3>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {unit.topics.length} topics
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {unit.topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.id}`}
                  className="flex flex-col justify-between p-3.5 rounded-xl bg-secondary/30 hover:bg-secondary/70 border border-border/60 hover:border-primary/40 transition-all text-sm group"
                >
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-xs md:text-sm">
                      {topic.title}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {topic.duration}
                    </span>
                    <DifficultyBadge difficulty={topic.difficulty} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
