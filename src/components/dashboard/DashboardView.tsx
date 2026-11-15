'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  BookOpen,
  CalendarCheck,
  Code2,
  Flame,
  Layers,
} from 'lucide-react'
import { WelcomeCard } from '@/components/dashboard/WelcomeCard'
import { SubjectProgressCard } from '@/components/dashboard/SubjectProgressCard'
import { ContinueLearningCard } from '@/components/dashboard/ContinueLearningCard'
import { WeakTopicsWidget } from '@/components/dashboard/WeakTopicsWidget'
import { StudyHeatmap } from '@/components/dashboard/StudyHeatmap'
import { UpcomingExamsWidget } from '@/components/dashboard/UpcomingExamsWidget'
import { PendingLabsWidget } from '@/components/dashboard/PendingLabsWidget'
import { AIRecommendationsWidget } from '@/components/dashboard/AIRecommendationsWidget'
import { ImportantQuestionsWidget } from '@/components/dashboard/ImportantQuestionsWidget'
import { RecentTopicsWidget } from '@/components/dashboard/RecentTopicsWidget'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  badge?: string
}

function SectionHeader({ icon: Icon, title, subtitle, badge }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pt-2">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#E2E800]/15 text-[#E2E800] border border-[#E2E800]/30 flex items-center justify-center font-bold">
          <Icon className="w-4 h-4 fill-current/20" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm md:text-base font-bold text-foreground tracking-tight">
              {title}
            </h3>
            {badge && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E2E800]/10 text-[#E2E800] border border-[#E2E800]/25">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function SectionDivider() {
  return <div className="border-t border-black/10 dark:border-white/10 my-6" />
}

type TabKey = 'all' | 'curriculum' | 'labs-exams' | 'practice'

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'all', label: 'All Modules', icon: Layers },
    { key: 'curriculum', label: 'Curriculum & Progress', icon: BookOpen },
    { key: 'labs-exams', label: 'Labs & Deadlines', icon: CalendarCheck },
    { key: 'practice', label: 'DSA & Practice', icon: Code2 },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-14 relative"
    >
      {/* Liquid Glass Category Navigation Dock */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl liquid-glass">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap relative ${
                  isActive
                    ? 'text-[#141414] font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#E2E800] rounded-xl shadow-chartreuse-sm"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-[#141414]' : ''}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2.5 text-xs font-mono text-muted-foreground liquid-glass px-3.5 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-[#E2E800] shadow-[0_0_8px_rgba(226,232,0,0.8)] animate-pulse" />
          <span className="font-semibold">Urban Nocturne</span>
        </div>
      </div>

      {/* TRACK 1: Daily Intelligence & Recommendations */}
      {(activeTab === 'all' || activeTab === 'curriculum') && (
        <motion.section variants={sectionVariants}>
          <SectionHeader
            icon={Sparkles}
            title="Daily Mission & AI Insights"
            subtitle="Personalized recommendations synthesized from your recent submissions"
            badge="Live Feed"
          />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3">
              <WelcomeCard />
            </div>
            <div className="lg:col-span-2">
              <AIRecommendationsWidget />
            </div>
          </div>
        </motion.section>
      )}

      {(activeTab === 'all' || activeTab === 'curriculum') && <SectionDivider />}

      {/* TRACK 2: Academic Track & Next Steps */}
      {(activeTab === 'all' || activeTab === 'curriculum') && (
        <motion.section variants={sectionVariants}>
          <SectionHeader
            icon={BookOpen}
            title="Academic Track & Active Sprints"
            subtitle="Semester 4 core subjects progress and fast resume into your active module"
            badge="Semester 4"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <SubjectProgressCard />
            <ContinueLearningCard />
          </div>
        </motion.section>
      )}

      {(activeTab === 'all' || activeTab === 'curriculum') && <SectionDivider />}

      {/* TRACK 3: Study Momentum Heatmap */}
      {(activeTab === 'all' || activeTab === 'practice') && (
        <motion.section variants={sectionVariants}>
          <SectionHeader
            icon={Flame}
            title="Consistency & Momentum"
            subtitle="Daily code commits, lab solutions, and study session frequency"
            badge="2026 Season"
          />
          <StudyHeatmap />
        </motion.section>
      )}

      {activeTab === 'all' && <SectionDivider />}

      {/* TRACK 4: Deadlines, Lab Deliverables & Diagnostic Targets */}
      {(activeTab === 'all' || activeTab === 'labs-exams') && (
        <motion.section variants={sectionVariants}>
          <SectionHeader
            icon={CalendarCheck}
            title="Priority Radar & Diagnostic Remediation"
            subtitle="Approaching university assessments, pending lab codes, and weak concept targets"
            badge="High Priority"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <UpcomingExamsWidget />
            <PendingLabsWidget />
            <WeakTopicsWidget />
          </div>
        </motion.section>
      )}

      {activeTab === 'all' && <SectionDivider />}

      {/* TRACK 5: Problem Bank & Recently Visited */}
      {(activeTab === 'all' || activeTab === 'practice') && (
        <motion.section variants={sectionVariants}>
          <SectionHeader
            icon={Code2}
            title="Curated Problem Bank & Activity Log"
            subtitle="Chitkara recurring exam questions and your recently viewed topics"
            badge="Exam Prep"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ImportantQuestionsWidget />
            <RecentTopicsWidget />
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}
