'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronLeft, Search, Copy, Check, Calculator, BookOpen,
  Sparkles, Filter, ChevronDown, ChevronUp, Layers, HelpCircle
} from 'lucide-react'
import { DIP_FORMULA_SHEET, FormulaItem } from '@/lib/constants/dipFormulas'
import { toast } from 'sonner'

export default function DIPFormulaSheetPage() {
  const [search, setSearch] = useState('')
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula)
    setCopiedId(id)
    toast.success('Formula copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredFormulas = DIP_FORMULA_SHEET.filter((item) => {
    const matchesUnit = selectedUnit === 'all' || item.unit === selectedUnit
    const q = search.toLowerCase()
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.formula.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q) ||
      item.exampleProblem.question.toLowerCase().includes(q)
    return matchesUnit && matchesSearch
  })

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link href="/subjects" className="hover:text-foreground">Subjects</Link>
            <span>/</span>
            <Link href="/subjects/dip" className="hover:text-foreground">Digital Image Processing</Link>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">Formula Sheet & Numericals</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/30">
              ∑
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                DIP Master Formula Sheet
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Every essential formula from Unit 1 to Unit 5 with step-by-step solved numericals & exam tips
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/subjects/dip/visualizer"
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Animated Studio
          </Link>
          <Link
            href="/subjects/dip"
            className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Syllabus
          </Link>
        </div>
      </div>

      {/* Search & Unit Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search formulas, variables, topics, or numericals (e.g. Wiener, Entropy, D4)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedUnit === 'all'
                ? 'bg-cyan-500 text-black font-bold shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            All Units
          </button>
          {[1, 2, 3, 4, 5].map((u) => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedUnit === u
                  ? 'bg-cyan-500 text-black font-bold shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              Unit {u}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="space-y-4">
        {filteredFormulas.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center space-y-3">
            <Calculator className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="font-semibold text-foreground">No formulas match your search.</p>
            <p className="text-xs text-muted-foreground">Try clearing filters or searching for terms like &quot;DCT&quot; or &quot;Histogram&quot;.</p>
          </div>
        ) : (
          filteredFormulas.map((item) => {
            const isExpanded = expandedId === item.id

            return (
              <div
                key={item.id}
                className="bg-card border border-border/80 hover:border-cyan-500/40 rounded-2xl p-5 md:p-6 transition-all shadow-sm space-y-4"
              >
                {/* Card Top */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.unitTitle}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                    <button
                      onClick={() => handleCopy(item.formula, item.id)}
                      className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
                      title="Copy formula"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                        isExpanded
                          ? 'bg-cyan-500 text-black border-cyan-400'
                          : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      {isExpanded ? 'Hide Numerical' : 'Solved Numerical'}
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Formula Highlight Box */}
                <div className="bg-black/40 border border-border/80 rounded-xl p-4 flex items-center justify-between overflow-x-auto">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Formula:
                    </span>
                    <pre className="text-sm md:text-base font-mono font-bold text-cyan-300">
                      {item.formula}
                    </pre>
                  </div>
                </div>

                {/* Variable Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {item.variables.map((v) => (
                    <div key={v.symbol} className="bg-secondary/40 rounded-lg p-2 text-xs">
                      <span className="font-mono font-bold text-primary mr-1.5">{v.symbol}:</span>
                      <span className="text-muted-foreground">{v.meaning}</span>
                    </div>
                  ))}
                </div>

                {/* Exam Tip Alert */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 flex items-start gap-2.5 text-xs text-amber-300/90">
                  <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 flex-shrink-0 mt-0.5">
                    Exam Tip
                  </span>
                  <p>{item.examTip}</p>
                </div>

                {/* Expandable Solved Numerical Problem */}
                {isExpanded && (
                  <div className="pt-2 border-t border-border/80 space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">
                        ✓
                      </span>
                      <h4 className="text-sm font-bold text-foreground">
                        Step-by-Step Solved University Numerical Problem
                      </h4>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-4 border border-border/80 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Problem Statement:
                        </p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">
                          {item.exampleProblem.question}
                        </p>
                      </div>

                      <div className="bg-background/80 rounded-lg p-3 text-xs border border-border/60">
                        <span className="font-bold text-cyan-400 uppercase tracking-wider font-mono mr-2">
                          Given:
                        </span>
                        <span className="text-muted-foreground font-mono">{item.exampleProblem.given}</span>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          Solution Steps:
                        </span>
                        <pre className="text-xs font-mono bg-black/40 text-emerald-400 p-3 rounded-lg border border-border/40 whitespace-pre-wrap leading-relaxed">
                          {item.exampleProblem.solution}
                        </pre>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Final Result:
                        </span>
                        <span className="text-xs font-mono font-bold text-foreground bg-background px-3 py-1 rounded border border-border">
                          {item.exampleProblem.answer}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
