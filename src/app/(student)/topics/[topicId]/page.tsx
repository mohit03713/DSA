import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ChevronLeft,
  Clock,
  Tag,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
  FileCode,
  Terminal,
} from 'lucide-react'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'
import { ComplexityBadge } from '@/components/shared/ComplexityBadge'
import { BookmarkButton } from '@/components/shared/BookmarkButton'
import { CodeBlock } from '@/components/shared/CodeBlock'
import { resolveTopic } from '@/lib/constants/topicsData'

export const metadata: Metadata = { title: 'Topic Detail — StudySphere AI' }

export default function TopicDetailPage({ params }: { params: { topicId: string } }) {
  const { topic: currentTopic, subjectId, relatedLinks } = resolveTopic(params.topicId)
  const isDIP = subjectId === 'dip' || currentTopic.subject.toLowerCase().includes('image')

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/subjects" className="hover:text-foreground">Subjects</Link>
            <span>/</span>
            <Link
              href={`/subjects/${subjectId}`}
              className="hover:text-foreground font-medium text-foreground/80 hover:underline"
            >
              {currentTopic.subject}
            </Link>
            <span>/</span>
            <span className="text-foreground">{currentTopic.unit}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {currentTopic.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <DifficultyBadge difficulty={currentTopic.difficulty} />
            {currentTopic.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary text-muted-foreground px-2.5 py-0.5 rounded-full border border-border"
              >
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs text-muted-foreground ml-1">
              <Clock className="w-3.5 h-3.5" /> ~{currentTopic.estimatedMinutes} min read
            </span>
          </div>
        </div>
        <BookmarkButton itemId={params.topicId} itemType="topic" />
      </div>

      {/* DIP Quick-Study Action Bar */}
      {isDIP && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-cyan-950/40 via-card to-card border border-cyan-500/30 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              ∑
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Digital Image Processing Study Tools</p>
              <p className="text-[11px] text-muted-foreground">Access live animated visualizers and formula cheat sheets</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/subjects/dip/formulas"
              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>📐</span> Master Formulas
            </Link>
            <Link
              href="/subjects/dip/visualizer"
              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>✨</span> Animated Studio
            </Link>
          </div>
        </div>
      )}

      {/* 1. Introduction / Motivation */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
          {isDIP ? 'Conceptual Overview & Motivation' : 'Introduction'}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {currentTopic.introduction}
        </p>
      </section>

      {/* 2. Formal Definition */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {isDIP ? 'Formal Definition & Imaging Principles' : 'Definition'}
          </h2>
        </div>
        <p className="text-foreground leading-relaxed font-medium text-sm md:text-base">
          {currentTopic.definition}
        </p>
      </section>

      {/* 3. Detailed Theory / Explanation */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
          {isDIP ? 'Theoretical Foundations & Mathematical Modeling' : 'Detailed Explanation'}
        </h2>
        <div className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line space-y-3 font-sans">
          {currentTopic.explanation}
        </div>
      </section>

      {/* 4. Real-world Examples */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {isDIP ? 'Real-World Imaging & Industrial Applications' : 'Real-World Examples'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {currentTopic.examples.map((ex) => (
            <div key={ex.title} className="p-4 rounded-xl bg-secondary/40 text-center border border-border/40">
              <div className="text-3xl mb-2">{ex.icon}</div>
              <p className="font-semibold text-sm text-foreground mb-1">{ex.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{ex.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Key Terminology */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {isDIP ? 'Key Mathematical & Technical Terminology' : 'Important Terminology'}
        </h2>
        <div className="space-y-2.5">
          {currentTopic.terminology.map((term) => (
            <div key={term.term} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3.5 rounded-xl bg-secondary/30 border border-border/40">
              <span className="font-mono font-bold text-primary text-xs uppercase tracking-wider w-40 flex-shrink-0">
                {term.term}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {term.definition}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Processing Pipeline / Algorithm */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {isDIP ? 'Signal Processing Pipeline & Mathematical Steps' : 'Step-by-Step Algorithm'}
        </h2>
        <div className="space-y-2.5">
          {currentTopic.algorithm.split('\n').filter(Boolean).map((step, i) => (
            <div key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-secondary/20 transition-colors">
              <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.replace(/^\d+[\.\)]\s*/, '')}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Solved Numericals Section (Primary for DIP) */}
      {currentTopic.numericals && currentTopic.numericals.length > 0 && (
        <section className="bg-card border-2 border-cyan-500/30 rounded-2xl p-6 space-y-6 relative overflow-hidden shadow-lg shadow-cyan-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 text-base flex items-center justify-center font-bold">
                ∑
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Step-by-Step Solved Exam Numericals ({currentTopic.numericals.length})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Standard university examination questions solved with full arithmetic derivations
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              100% Verified
            </span>
          </div>

          <div className="space-y-6">
            {currentTopic.numericals.map((num, idx) => (
              <div
                key={idx}
                className="bg-secondary/20 rounded-2xl p-5 border border-cyan-500/20 space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Numerical Problem #{idx + 1}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-foreground leading-snug">
                    {num.question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="bg-background/80 rounded-xl p-3.5 border border-border/60">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      📋 Given Parameters:
                    </p>
                    <ul className="space-y-1 text-xs text-foreground font-mono">
                      {num.givenData.map((d, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="text-cyan-400">•</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-background/80 rounded-xl p-3.5 border border-border/60">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                      📐 Formula Applied:
                    </p>
                    <pre className="text-xs font-mono text-cyan-300 font-semibold whitespace-pre-wrap">
                      {num.formulaUsed}
                    </pre>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    🔢 Step-by-Step Derivation & Arithmetic:
                  </p>
                  {num.steps.map((st) => (
                    <div key={st.stepNumber} className="border-l-2 border-cyan-500/40 pl-3.5 space-y-1">
                      <p className="text-xs font-bold text-foreground">
                        Step {st.stepNumber}: {st.title}
                      </p>
                      <pre className="text-xs font-mono bg-black/40 text-emerald-400 p-2.5 rounded-lg border border-border/40 whitespace-pre-wrap">
                        {st.calculation}
                      </pre>
                      <p className="text-xs text-muted-foreground italic">{st.explanation}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    🎯 Final Answer:
                  </span>
                  <span className="text-xs font-mono font-bold text-foreground bg-background px-3 py-1.5 rounded-lg border border-border">
                    {num.finalAnswer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CODE SECTIONS ONLY FOR DSA (Never for DIP) */}
      {!isDIP && (
        <>
          {/* Pseudocode */}
          {currentTopic.pseudocode && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Pseudocode</h2>
              <CodeBlock code={currentTopic.pseudocode} language="text" title="Pseudocode" showLineNumbers={false} />
            </section>
          )}

          {/* C Implementation */}
          {currentTopic.cCode && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Implementation in C</h2>
              <CodeBlock code={currentTopic.cCode} language="c" title={`${params.topicId.replace(/-/g, '_')}.c`} />
            </section>
          )}

          {/* C++ Implementation */}
          {currentTopic.cppCode && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Implementation in C++</h2>
              <CodeBlock code={currentTopic.cppCode} language="cpp" title={`${params.topicId.replace(/-/g, '_')}.cpp`} />
            </section>
          )}

          {/* Line-by-line explanation (only if provided for this topic) */}
          {currentTopic.codeExplanation && currentTopic.codeExplanation.length > 0 && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Line-by-Line Code Explanation</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/60">
                      <th className="text-left px-4 py-2.5 font-semibold text-foreground rounded-tl-lg w-1/2">Code</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-foreground rounded-tr-lg">Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTopic.codeExplanation.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                        <td className="px-4 py-2.5">
                          <code className="text-xs font-mono text-primary">{row.line}</code>
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Dry Run (only if provided for this topic) */}
          {currentTopic.dryRun && currentTopic.dryRun.length > 0 && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Dry Run Execution Walkthrough</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/60">
                      <th className="text-left px-4 py-2 font-semibold text-foreground">Step</th>
                      <th className="text-left px-4 py-2 font-semibold text-foreground">State</th>
                      <th className="text-left px-4 py-2 font-semibold text-foreground">Explanation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTopic.dryRun.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                        <td className="px-4 py-2.5 font-mono text-xs text-primary">{row.step}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-foreground">{row.state}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Sample I/O */}
          {currentTopic.sampleIO && currentTopic.sampleIO.length > 0 && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Sample Input / Output</h2>
              <div className="space-y-3">
                {currentTopic.sampleIO.map((io, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border">
                    {io.explanation && (
                      <div className="bg-secondary/60 px-4 py-2 text-xs font-semibold text-muted-foreground">
                        Test Case {i + 1} — {io.explanation}
                      </div>
                    )}
                    <div className="grid grid-cols-2 divide-x divide-border">
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">Input</p>
                        <pre className="text-xs font-mono text-foreground">{io.input}</pre>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">Output</p>
                        <pre className="text-xs font-mono text-primary font-semibold">{io.output}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Complexity Analysis for DSA */}
          {currentTopic.timeComplexity && (
            <section className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Asymptotic Complexity Analysis</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Time Complexity</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Best Case:</span><ComplexityBadge value={currentTopic.timeComplexity.best} type="time" /></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Average Case:</span><ComplexityBadge value={currentTopic.timeComplexity.average} type="time" /></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Worst Case:</span><ComplexityBadge value={currentTopic.timeComplexity.worst} type="time" /></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{currentTopic.timeComplexity.explanation}</p>
                </div>
                {currentTopic.spaceComplexity && (
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider">Auxiliary Space</span>
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Auxiliary Space:</span>
                      <ComplexityBadge value={currentTopic.spaceComplexity.value} type="space" />
                    </div>
                    <p className="text-xs text-muted-foreground">{currentTopic.spaceComplexity.explanation}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}

      {/* Advantages & Disadvantages */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {isDIP ? 'Key Advantages & Practical Limitations' : 'Advantages & Disadvantages'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-green-500 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Advantages
            </h3>
            <ul className="space-y-1.5">
              {currentTopic.advantages.map((adv, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                  {adv}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> {isDIP ? 'Limitations & Artifacts' : 'Disadvantages'}
            </h3>
            <ul className="space-y-1.5">
              {currentTopic.disadvantages.map((dis, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                  {dis}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Common Mistakes & Exam Pitfalls */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          {isDIP ? 'Common Examination Pitfalls & Misconceptions' : 'Common Mistakes'}
        </h2>
        <ul className="space-y-2">
          {currentTopic.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl">
              <span className="text-amber-500 font-bold">•</span>
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      {/* Practice & Viva Questions */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          {isDIP ? 'University Practice Problems & Viva Questions' : 'Practice & Viva Questions'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              {isDIP ? 'Practice Questions (Numericals & Derivations)' : 'Practice Coding Problems'}
            </h3>
            <ol className="space-y-2">
              {currentTopic.practiceQuestions.map((q, i) => (
                <li key={i} className="text-sm text-foreground bg-secondary/40 rounded-xl px-4 py-3">
                  <span className="text-primary font-semibold mr-2">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Viva & Oral Exam Questions
            </h3>
            <ol className="space-y-2">
              {currentTopic.vivaQuestions.map((q, i) => (
                <li key={i} className="text-sm text-foreground bg-secondary/40 rounded-xl px-4 py-3">
                  <span className="text-accent font-semibold mr-2">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Related Topics & Quick Actions */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {isDIP ? 'Related Digital Image Processing Topics' : 'Related DSA Topics'}
          </h2>
          <div className="flex items-center gap-2">
            {!isDIP && (
              <Link
                href={`/practice?topicId=${params.topicId}`}
                className="text-xs px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium flex items-center gap-1"
              >
                <Terminal className="w-3.5 h-3.5" /> Practice in IDE
              </Link>
            )}
            {isDIP && (
              <Link
                href="/subjects/dip/formulas"
                className="text-xs px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 transition-colors font-medium flex items-center gap-1"
              >
                <span>📐</span> Formula Sheet
              </Link>
            )}
            <Link
              href={`/tutor?prompt=Explain the core concepts, mathematical principles, and exam questions for ${currentTopic.title}`}
              className="text-xs px-3 py-1.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-colors font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Ask AI Tutor
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-sm text-foreground transition-colors border border-border hover:border-primary/30"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
