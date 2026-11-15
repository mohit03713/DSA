import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Binary, Database, Cpu, Network, TrendingUp } from 'lucide-react'
import { DEMO_SUBJECTS } from '@/lib/constants/demoData'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'

export const metadata: Metadata = { title: 'Subjects' }

const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Binary, Database, Cpu, Network, BookOpen,
}

export default function SubjectsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
        <p className="text-muted-foreground mt-1">Your enrolled subjects for Semester 4</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_SUBJECTS.map((subject) => {
          const Icon = ICONS[subject.iconName] || BookOpen
          return (
            <div
              key={subject.id}
              className="bg-card border border-border rounded-2xl p-6 card-hover group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: subject.color + '20' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: subject.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.code}</p>
                  </div>
                </div>
                <DifficultyBadge difficulty={subject.difficulty} />
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {subject.description}
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-foreground">{subject.unitCount}</p>
                  <p className="text-xs text-muted-foreground">Units</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{subject.topicCount}</p>
                  <p className="text-xs text-muted-foreground">Topics</p>
                </div>
                <div className="flex-1" />
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Progress
                  </span>
                  <span className="font-semibold text-foreground">{subject.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${subject.progress}%`, background: subject.color }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/subjects/${subject.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-all"
                  style={{ background: subject.color + '15', color: subject.color }}
                >
                  <BookOpen className="w-4 h-4" />
                  Study
                </Link>
                <Link
                  href={`/labs?subject=${subject.id}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                >
                  Labs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

