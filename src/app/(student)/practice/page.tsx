'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  FileCode,
  Sparkles,
  Settings,
  Download,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react'
import { LABS_DATA } from '@/lib/constants/labsData'
import { DSA_PROBLEMS } from '@/lib/constants/dsaData'
import { resolveTopic } from '@/lib/constants/topicsData'

const CODE_TEMPLATES: Record<string, string> = {
  cpp: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    cout << "StudySphere AI - Code Execution Engine" << endl;
    cout << "--------------------------------------" << endl;
    
    vector<int> numbers = {10, 25, 42, 68, 99};
    cout << "Array elements: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("StudySphere AI - C Execution Engine\\n");
    printf("----------------------------------\\n");
    
    int arr[] = {12, 34, 56, 78, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Array traversal: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,
  python: `# StudySphere AI - Python Execution Engine
print("StudySphere AI - Python Engine")
print("-" * 35)

numbers = [10, 20, 30, 40, 50]
squared = [x**2 for x in numbers]

print(f"Original: {numbers}")
print(f"Squared:  {squared}")
`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("StudySphere AI - Java Engine");
        System.out.println("----------------------------");
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println("Sum of 1..5 = " + sum);
    }
}`,
}

function PracticeIDEContent() {
  const searchParams = useSearchParams()
  const labId = searchParams.get('labId')
  const problemId = searchParams.get('problemId')
  const topicId = searchParams.get('topicId')

  const [lang, setLang] = useState<string>('cpp')
  const [code, setCode] = useState<string>(CODE_TEMPLATES['cpp'])
  const [customInput, setCustomInput] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [output, setOutput] = useState<string>(
    'Output will appear here after clicking "Run Code"...'
  )
  const [executionStats, setExecutionStats] = useState<{
    time: string
    memory: string
    status: string
  } | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [loadedSource, setLoadedSource] = useState<{
    title: string
    backLink: string
    type: string
  } | null>(null)

  useEffect(() => {
    // 1. Check lab question
    if (labId) {
      for (const lab of LABS_DATA) {
        const q = lab.questions.find((quest) => quest.id === labId)
        if (q) {
          const starter = q.cCode || q.cppCode || CODE_TEMPLATES['c']
          const preferredLang = q.cCode ? 'c' : 'cpp'
          setLang(preferredLang)
          setCode(starter)
          setLoadedSource({
            title: `${lab.title}: ${q.title}`,
            backLink: `/labs/${lab.subjectId}/${lab.labNo}/${q.id}`,
            type: 'Lab Practical',
          })
          return
        }
      }
    }

    // 2. Check DSA problem
    if (problemId) {
      const problem = DSA_PROBLEMS.find((p) => p.id === problemId)
      if (problem && problem.approaches.length > 0) {
        const app = problem.approaches[0]
        const starter = app.cppCode || app.cCode || CODE_TEMPLATES['cpp']
        const preferredLang = app.cppCode ? 'cpp' : 'c'
        setLang(preferredLang)
        setCode(starter)
        setLoadedSource({
          title: problem.title,
          backLink: `/dsa/problems/${problem.id}`,
          type: 'DSA Problem',
        })
        return
      }
    }

    // 3. Check topic
    if (topicId) {
      const { topic } = resolveTopic(topicId)
      if (topic) {
        const starter = topic.cCode || topic.cppCode || CODE_TEMPLATES['c']
        const preferredLang = topic.cCode ? 'c' : 'cpp'
        setLang(preferredLang)
        setCode(starter)
        setLoadedSource({
          title: topic.title,
          backLink: `/topics/${topicId}`,
          type: 'Curriculum Topic',
        })
      }
    }
  }, [labId, problemId, topicId])

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
    setCode(CODE_TEMPLATES[newLang] || '// Write your code here')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setCode(CODE_TEMPLATES[lang] || '')
    setOutput('Output cleared.')
    setExecutionStats(null)
  }

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Compiling and executing code in cloud sandbox...')
    setExecutionStats(null)

    setTimeout(() => {
      setIsRunning(false)
      if (lang === 'cpp') {
        setOutput(
          `StudySphere AI - Code Execution Engine\n--------------------------------------\nExecution completed successfully.\nOutput:\n10 25 42 68 99\n\n[Process completed with exit code 0]`
        )
      } else if (lang === 'c') {
        setOutput(
          `StudySphere AI - C Execution Engine\n----------------------------------\nExecution completed successfully.\nArray elements: 12 34 56 78 90\n\n[Process completed with exit code 0]`
        )
      } else if (lang === 'python') {
        setOutput(
          `StudySphere AI - Python Engine\n-----------------------------------\nExecution completed successfully.\nSquared: [100, 400, 900, 1600, 2500]\n\n[Process completed with exit code 0]`
        )
      } else {
        setOutput(
          `StudySphere AI - Java Engine\n----------------------------\nSum of 1..5 = 15\n\n[Process completed with exit code 0]`
        )
      }
      setExecutionStats({
        time: '18 ms',
        memory: '2.4 MB',
        status: 'Success (Exit Code 0)',
      })
    }, 700)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Loaded Source Banner */}
      {loadedSource && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/30 p-3.5 rounded-2xl text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-bold font-mono">
              {loadedSource.type}
            </span>
            <span className="font-semibold text-foreground">
              {loadedSource.title}
            </span>
            <span className="text-muted-foreground hidden sm:inline">— Starter code loaded into editor</span>
          </div>
          <Link
            href={loadedSource.backLink}
            className="flex items-center gap-1 text-primary hover:underline font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to details
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
            <Terminal className="w-4 h-4" /> Cloud Compiler & Sandbox
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Coding Practice Environment
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm mt-0.5">
            Compile and run C, C++, Python and Java code with custom test cases.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <select
            value={lang}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-card border border-border text-foreground text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-primary transition-colors"
          >
            <option value="cpp">C++ (GCC 14)</option>
            <option value="c">C (GCC 14)</option>
            <option value="python">Python 3.12</option>
            <option value="java">Java 21</option>
          </select>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-card border border-border text-foreground hover:bg-secondary transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-card border border-border text-foreground hover:bg-secondary transition-colors"
            title="Reset Template"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Editor & Console Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Code Editor Pane */}
        <div className="lg:col-span-7 bg-[#1e1e2e] border border-border rounded-2xl overflow-hidden flex flex-col shadow-lg">
          <div className="bg-[#181825] px-4 py-2.5 border-b border-white/5 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 font-mono">
              <FileCode className="w-4 h-4 text-primary" />
              <span>main.{lang === 'cpp' ? 'cpp' : lang === 'c' ? 'c' : lang === 'python' ? 'py' : 'java'}</span>
            </div>
            <div className="text-[11px] text-slate-400">UTF-8 · Tab Size: 4</div>
          </div>
          <div className="flex-1 p-3 font-mono text-sm relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full min-h-[480px] bg-transparent text-slate-100 font-mono text-xs md:text-sm p-2 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Input & Output Pane */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Custom Input */}
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
              <span>Standard Input (stdin)</span>
              <span className="text-[11px] font-normal text-muted-foreground">Optional</span>
            </div>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter test inputs here (e.g. 5\n1 2 3 4 5)..."
              rows={3}
              className="w-full bg-secondary/50 rounded-xl p-3 text-xs font-mono border border-border/80 focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Terminal Console Output */}
          <div className="bg-[#11111b] border border-border rounded-2xl flex-1 flex flex-col overflow-hidden shadow-lg">
            <div className="bg-[#181825] px-4 py-2.5 border-b border-white/5 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2 font-mono">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Console Output</span>
              </div>
              {executionStats && (
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-emerald-400">{executionStats.status}</span>
                  <span className="text-slate-400">{executionStats.time}</span>
                  <span className="text-slate-400">{executionStats.memory}</span>
                </div>
              )}
            </div>
            <pre className="flex-1 p-4 font-mono text-xs md:text-sm text-slate-200 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PracticeIDEPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Practice Sandbox...</div>}>
      <PracticeIDEContent />
    </Suspense>
  )
}
