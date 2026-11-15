'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  Terminal,
  Code2,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  Share2,
  Layers,
  HelpCircle,
  FileQuestion,
  Lightbulb,
  Check,
  Zap,
  ArrowRight,
  GraduationCap,
} from 'lucide-react'
import { LABS_DATA } from '@/lib/constants/labsData'
import { ComplexityBadge } from '@/components/shared/ComplexityBadge'
import { CodeBlock } from '@/components/shared/CodeBlock'
import { BookmarkButton } from '@/components/shared/BookmarkButton'

export default function LabQuestionDetailPage({
  params,
}: {
  params: { subjectId: string; labNo: string; qId: string }
}) {
  const lab = LABS_DATA.find(
    (l) => l.subjectId === params.subjectId && l.labNo === parseInt(params.labNo, 10)
  )
  if (!lab) return notFound()

  const question = lab.questions.find((q) => q.id === params.qId)
  if (!question) return notFound()

  const [activeApproachIdx, setActiveApproachIdx] = useState(0)
  const [lang, setLang] = useState<'cpp' | 'c'>('c')

  // Build approaches list (either custom approaches or default question code as Approach 1)
  const approaches = question.approaches && question.approaches.length > 0
    ? question.approaches
    : [
        {
          id: 'standard-approach',
          name: 'Standard Academic Implementation',
          tag: 'Recommended Solution',
          intuition: question.explanation,
          algorithm: question.algorithm || [],
          cCode: question.cCode,
          cppCode: question.cppCode,
          timeComplexity: question.timeComplexity,
          spaceComplexity: question.spaceComplexity,
          pros: ['Clean and straightforward to understand', 'Directly conforms to university lab evaluation criteria'],
          cons: ['Observe edge cases such as empty input or boundaries'],
        },
      ]

  const currentApproach = approaches[activeApproachIdx] || approaches[0]

  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between">
        <Link
          href={`/labs/${lab.subjectId}/${lab.labNo}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Lab {lab.labNo}
        </Link>
        <div className="flex items-center gap-2">
          <BookmarkButton
            itemType="lab"
            itemId={question.id}
            isBookmarked={false}
          />
          <Link
            href={`/practice?labId=${question.id}`}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors shadow-sm"
          >
            <Terminal className="w-4 h-4" />
            Open in Code Editor
          </Link>
        </div>
      </div>

      {/* Question Header Card */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              {lab.subjectName} · Lab Manual #{lab.labNo} · Question {question.number}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {question.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ComplexityBadge type="time" value={currentApproach.timeComplexity} />
            <ComplexityBadge type="space" value={currentApproach.spaceComplexity} />
          </div>
        </div>

        {/* Question Statement */}
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Official Practical Problem Statement
          </h3>
          <div className="bg-secondary/40 border border-border rounded-xl p-4 text-foreground font-mono text-sm leading-relaxed whitespace-pre-line">
            {question.statement}
          </div>

          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">
            Conceptual Explanation for Beginners
          </h3>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {question.explanation}
          </p>

          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs font-semibold text-muted-foreground">Key Concepts:</span>
            {question.requiredConcepts.map((c) => (
              <span key={c} className="text-xs px-2.5 py-0.5 rounded-md bg-secondary text-primary font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Approach Solution Section */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Solution Approaches ({approaches.length} {approaches.length === 1 ? 'Method' : 'Methods'})
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore step-by-step algorithms, intuitive explanations, and complete verified code.
            </p>
          </div>

          {/* Approach Switcher Tabs with Framer Motion sliding pill */}
          {approaches.length > 1 && (
            <div className="flex items-center gap-1.5 bg-secondary/80 p-1.5 rounded-2xl border border-border/80">
              {approaches.map((app, idx) => {
                const isActive = activeApproachIdx === idx
                return (
                  <button
                    key={app.id}
                    onClick={() => setActiveApproachIdx(idx)}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeApproachHighlight"
                        className="absolute inset-0 bg-card rounded-xl shadow-sm border border-border/80"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                      Approach {idx + 1}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Selected Approach Details with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentApproach.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                  <Sparkles className="w-3 h-3" />
                  {currentApproach.tag}
                </span>
                <h3 className="text-base md:text-lg font-bold text-foreground mt-1.5">
                  {currentApproach.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono bg-secondary/60 px-2.5 py-1 rounded-lg border border-border/60">
                  Time: <strong className="text-foreground">{currentApproach.timeComplexity}</strong>
                </span>
                <span className="text-xs text-muted-foreground font-mono bg-secondary/60 px-2.5 py-1 rounded-lg border border-border/60">
                  Space: <strong className="text-foreground">{currentApproach.spaceComplexity}</strong>
                </span>
              </div>
            </div>

            {/* Intuition Card */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 md:p-5 flex gap-3.5 items-start shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                <Lightbulb className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1.5 text-xs md:text-sm">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <span>Beginner Intuition & Real-World Analogy</span>
                  <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded font-mono font-medium">Concept Key</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {currentApproach.intuition}
                </p>
              </div>
            </div>

            {/* Step-by-Step Algorithm */}
            <div className="bg-secondary/40 rounded-2xl p-4 md:p-5 border border-border space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Step-by-Step Algorithm
              </h4>
              <div className="space-y-2">
                {(currentApproach.algorithm || []).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm">
                    <span className="w-5 h-5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-foreground/90 font-mono leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer with Animated Language Tabs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-primary" />
                  Verified Program Implementation
                </h4>
                <div className="flex items-center gap-1 bg-secondary p-1 rounded-xl text-xs border border-border/80">
                  {(['c', 'cpp'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`relative px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        lang === l ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {lang === l && (
                        <motion.div
                          layoutId="activeLangHighlight"
                          className="absolute inset-0 bg-card rounded-lg shadow-xs border border-border/80"
                          transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{l === 'c' ? 'C Program' : 'C++ Program'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <CodeBlock
                code={lang === 'c' ? currentApproach.cCode : currentApproach.cppCode}
                language={lang}
                filename={`lab${lab.labNo}_q${question.number}.${lang}`}
              />
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4">
                <h5 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Why use this approach?
                </h5>
                <ul className="list-disc list-inside text-xs text-foreground/85 space-y-1.5">
                  {currentApproach.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4">
                <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Trade-offs & Constraints
                </h5>
                <ul className="list-disc list-inside text-xs text-foreground/85 space-y-1.5">
                  {currentApproach.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Comparison Matrix Table if multiple approaches exist */}
      {approaches.length > 1 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-base font-bold text-foreground mb-3">
            Approach Comparison Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-muted-foreground">
                  <th className="py-2.5 px-3 font-semibold">Approach</th>
                  <th className="py-2.5 px-3 font-semibold">Time Complexity</th>
                  <th className="py-2.5 px-3 font-semibold">Space Complexity</th>
                  <th className="py-2.5 px-3 font-semibold">Best Applied For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {approaches.map((app) => (
                  <tr key={app.id} className="hover:bg-secondary/20">
                    <td className="py-3 px-3 font-semibold text-foreground">{app.name}</td>
                    <td className="py-3 px-3 font-mono text-primary font-bold">{app.timeComplexity}</td>
                    <td className="py-3 px-3 font-mono text-amber-500 font-bold">{app.spaceComplexity}</td>
                    <td className="py-3 px-3 text-muted-foreground">{app.pros[0] || 'Standard approach'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sample Inputs and Outputs */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-foreground">Sample Test Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.sampleIO.map((io, idx) => (
            <div key={idx} className="bg-secondary/40 border border-border rounded-xl p-4 text-xs font-mono space-y-2">
              <div>
                <span className="text-muted-foreground font-sans font-semibold">Input:</span>
                <pre className="mt-1 text-foreground whitespace-pre-wrap">{io.input}</pre>
              </div>
              <div className="pt-2 border-t border-border/40">
                <span className="text-muted-foreground font-sans font-semibold">Output:</span>
                <pre className="mt-1 text-emerald-500 font-bold whitespace-pre-wrap">{io.output}</pre>
              </div>
              {io.explanation && (
                <div className="pt-2 border-t border-border/40 text-muted-foreground font-sans">
                  <strong>Explanation:</strong> {io.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dry Run Walkthrough */}
      {question.dryRun && question.dryRun.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-base font-bold text-foreground mb-4">
            Execution Dry Run Walkthrough
          </h3>
          <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {question.dryRun.map((d) => (
              <div key={d.step} className="p-3.5 text-xs flex gap-3 items-start bg-card">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                  {d.step}
                </span>
                <div>
                  <div className="font-mono text-foreground font-semibold">{d.state}</div>
                  <div className="text-muted-foreground mt-0.5">{d.explanation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes & Edge Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Common Student Mistakes
          </h4>
          <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1.5 leading-relaxed">
            {question.commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Critical Edge Cases
          </h4>
          <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1.5 leading-relaxed">
            {question.edgeCases.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Viva Exam Questions */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-500" />
          Lab Viva & Exam Interview Questions
        </h4>
        <div className="space-y-2">
          <div className="bg-secondary/30 rounded-xl p-3 text-xs space-y-1">
            <div className="font-semibold text-foreground">
              Q1: What is the worst-case time and auxiliary space complexity of your solution?
            </div>
            <div className="text-muted-foreground">
              Answer: Time complexity is {currentApproach.timeComplexity} and space complexity is {currentApproach.spaceComplexity}.
            </div>
          </div>
          <div className="bg-secondary/30 rounded-xl p-3 text-xs space-y-1">
            <div className="font-semibold text-foreground">
              Q2: How does your code handle boundary edge cases like empty inputs or single-element inputs?
            </div>
            <div className="text-muted-foreground">
              Answer: Boundary checks prevent segmentation faults or out-of-bound array indexing before proceeding to the main loop.
            </div>
          </div>
        </div>
      </div>

      {/* AI Help Banner */}
      <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Need line-by-line debugging or deeper intuition?
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Ask StudySphere AI tutor to explain every pointer or line of C code step-by-step.
          </p>
        </div>
        <Link
          href={`/tutor?prompt=Can you explain in beginner detail the step-by-step working and dry run of: ${question.title}`}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold whitespace-nowrap transition-colors"
        >
          Ask AI Tutor
        </Link>
      </div>
    </div>
  )
}
