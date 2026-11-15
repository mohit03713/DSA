'use client'

import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronLeft,
  Terminal,
  Clock,
  HardDrive,
  CheckCircle2,
  Bookmark,
  Share2,
  Code2,
  Sparkles,
  Layers,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import { DSA_PROBLEMS } from '@/lib/constants/dsaData'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'
import { ComplexityBadge } from '@/components/shared/ComplexityBadge'
import { BookmarkButton } from '@/components/shared/BookmarkButton'
import { CodeBlock } from '@/components/shared/CodeBlock'

export default function DSAProblemDetailPage({
  params,
}: {
  params: { problemId: string }
}) {
  const problem = DSA_PROBLEMS.find((p) => p.id === params.problemId)
  if (!problem) return notFound()

  const [activeApproachIdx, setActiveApproachIdx] = useState(0)
  const [lang, setLang] = useState<'cpp' | 'c'>('cpp')

  const currentApproach = problem.approaches[activeApproachIdx] || problem.approaches[0]

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dsa"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to DSA Library
        </Link>
        <div className="flex items-center gap-2">
          <BookmarkButton
            itemType="dsa"
            itemId={problem.id}
            isBookmarked={problem.isBookmarked}
          />
          <Link
            href={`/practice?problemId=${problem.id}`}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors shadow-sm"
          >
            <Terminal className="w-4 h-4" />
            Practice in IDE
          </Link>
        </div>
      </div>

      {/* Title & Metadata Header */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-2">
              <DifficultyBadge difficulty={problem.difficulty} />
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {problem.title}
            </h1>
          </div>
          {problem.relatedTopicId && (
            <Link
              href={`/topics/${problem.relatedTopicId}`}
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline bg-primary/10 px-3 py-2 rounded-xl self-start md:self-center"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Study Theory: {problem.relatedTopicId}
            </Link>
          )}
        </div>

        {/* Problem Statement */}
        <div className="mt-6 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Problem Statement
          </h3>
          <p className="text-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
            {problem.description}
          </p>

          {/* Examples */}
          <div className="space-y-3 mt-4">
            <h4 className="text-sm font-semibold text-foreground">Examples:</h4>
            {problem.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-secondary/40 border border-border/80 rounded-xl p-3.5 text-xs md:text-sm font-mono space-y-1.5"
              >
                <div>
                  <span className="text-muted-foreground font-sans font-semibold">Input: </span>
                  <span className="text-foreground">{ex.input}</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-sans font-semibold">Output: </span>
                  <span className="text-emerald-500 font-bold">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div className="font-sans text-xs text-muted-foreground pt-1 border-t border-border/40">
                    <span className="font-semibold text-foreground">Explanation: </span>
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          {problem.constraints && problem.constraints.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/60">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Constraints:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground font-mono">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Solutions / Approaches Section */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Solution Approaches ({problem.approaches.length})
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Study multiple intuition paths, algorithms, and clean C / C++ implementations.
            </p>
          </div>

          {/* Approach Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-secondary/80 p-1 rounded-xl">
            {problem.approaches.map((app, idx) => (
              <button
                key={app.id}
                onClick={() => setActiveApproachIdx(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeApproachIdx === idx
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {app.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Current Approach Overview */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-foreground">{currentApproach.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {currentApproach.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ComplexityBadge type="time" value={currentApproach.timeComplexity} />
              <ComplexityBadge type="space" value={currentApproach.spaceComplexity} />
            </div>
          </div>

          {/* Algorithm & Pseudocode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-secondary/30 rounded-xl p-4 border border-border/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                Step-by-Step Algorithm
              </h4>
              <p className="text-xs text-foreground leading-relaxed whitespace-pre-line font-mono">
                {currentApproach.algorithm}
              </p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4 border border-border/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Pseudocode
              </h4>
              <pre className="text-xs text-foreground font-mono leading-relaxed whitespace-pre-wrap">
                {currentApproach.pseudocode}
              </pre>
            </div>
          </div>

          {/* Code Viewer with Language Tabs */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-primary" />
                Complete Source Code Implementation
              </h4>
              <div className="flex items-center gap-1 bg-secondary p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setLang('cpp')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    lang === 'cpp'
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  C++
                </button>
                <button
                  onClick={() => setLang('c')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    lang === 'c'
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  C
                </button>
              </div>
            </div>

            <CodeBlock
              code={lang === 'cpp' ? currentApproach.cppCode : currentApproach.cCode}
              language={lang === 'cpp' ? 'cpp' : 'c'}
              filename={`Solution.${lang}`}
            />
          </div>

          {/* Dry Run Walkthrough */}
          {currentApproach.dryRun && currentApproach.dryRun.length > 0 && (
            <div className="space-y-3 pt-3">
              <h4 className="text-sm font-semibold text-foreground">
                Step-by-Step Dry Run Walkthrough
              </h4>
              <div className="divide-y divide-border border border-border rounded-xl overflow-hidden bg-card">
                {currentApproach.dryRun.map((step) => (
                  <div key={step.step} className="p-3 text-xs flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <div className="font-mono text-foreground font-semibold">{step.state}</div>
                      <div className="text-muted-foreground mt-0.5">{step.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3.5">
              <h5 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">
                Advantages
              </h5>
              <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1">
                {currentApproach.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5">
              <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                Trade-offs & Limitations
              </h5>
              <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1">
                {currentApproach.cons.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table if multiple approaches exist */}
      {problem.approaches.length > 1 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-base font-bold text-foreground mb-4">
            Approach Comparison Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/30 text-muted-foreground">
                  <th className="py-2.5 px-3 font-semibold">Approach</th>
                  <th className="py-2.5 px-3 font-semibold">Time Complexity</th>
                  <th className="py-2.5 px-3 font-semibold">Space Complexity</th>
                  <th className="py-2.5 px-3 font-semibold">Recommended When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {problem.approaches.map((app, i) => (
                  <tr key={app.id} className="hover:bg-secondary/20">
                    <td className="py-3 px-3 font-semibold text-foreground">{app.name}</td>
                    <td className="py-3 px-3 font-mono text-primary">{app.timeComplexity}</td>
                    <td className="py-3 px-3 font-mono text-amber-500">{app.spaceComplexity}</td>
                    <td className="py-3 px-3 text-muted-foreground">{app.pros[0] || 'Standard approach'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
