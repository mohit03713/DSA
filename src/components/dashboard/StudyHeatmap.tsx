'use client'

import { DEMO_STUDY_ACTIVITY } from '@/lib/constants/demoData'
import { cn } from '@/lib/utils'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getIntensity(minutes: number): number {
  if (minutes === 0) return 0
  if (minutes < 30) return 1
  if (minutes < 60) return 2
  if (minutes < 120) return 3
  return 4
}

const intensityClasses: Record<number, string> = {
  0: 'bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/5',
  1: 'bg-[#E2E800]/20 border border-[#E2E800]/30',
  2: 'bg-[#E2E800]/45 border border-[#E2E800]/55',
  3: 'bg-[#E2E800]/75 border border-[#E2E800]/85',
  4: 'bg-[#E2E800] border border-[#E2E800] shadow-chartreuse-sm',
}

export function StudyHeatmap() {
  const activity = DEMO_STUDY_ACTIVITY
  const totalMinutes = activity.reduce((sum, a) => sum + a.minutes, 0)
  const activeDays = activity.filter(a => a.minutes > 0).length

  // Build 12-week grid
  const weeks: (typeof activity[0] | null)[][] = []
  let currentWeek: (typeof activity[0] | null)[] = []

  // Pad start
  const firstDay = new Date(activity[0].date).getDay()
  for (let i = 0; i < firstDay; i++) currentWeek.push(null)

  for (const day of activity) {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null)
    weeks.push(currentWeek)
  }

  // Month labels
  const monthLabels: { label: string; weekIndex: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    for (const day of week) {
      if (day) {
        const m = new Date(day.date).getMonth()
        if (m !== lastMonth) {
          monthLabels.push({ label: MONTHS[m], weekIndex: wi })
          lastMonth = m
        }
        break
      }
    }
  })

  return (
    <div className="liquid-glass liquid-glass-hover rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-foreground">Study Activity</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Yearly algorithmic contribution streak</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span>
            <strong className="text-[#E2E800] font-bold">{activeDays}</strong> active days
          </span>
          <span>
            <strong className="text-[#E2E800] font-bold">{Math.floor(totalMinutes / 60)}h</strong> logged
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex ml-7 mb-1.5">
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find(m => m.weekIndex === wi)
              return (
                <div key={wi} className="w-5 mr-1 text-[10px] font-mono text-muted-foreground">
                  {lbl?.label || ''}
                </div>
              )
            })}
          </div>

          <div className="flex gap-1.5">
            {/* Day labels */}
            <div className="flex flex-col gap-1.5 mr-1 text-[10px] font-mono text-muted-foreground">
              {DAYS.map((day, i) => (
                <div key={day} className="h-4 flex items-center">
                  {i % 2 === 0 ? day[0] : ''}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1.5 mr-1">
                {week.map((day, di) => {
                  if (!day) return <div key={di} className="w-4 h-4" />
                  const intensity = getIntensity(day.minutes)
                  return (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.minutes} min`}
                      className={cn(
                        'w-4 h-4 rounded-md transition-all hover:scale-130 cursor-pointer',
                        intensityClasses[intensity]
                      )}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-4 font-mono">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map(lvl => (
              <div key={lvl} className={cn('w-3.5 h-3.5 rounded-sm', intensityClasses[lvl])} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
