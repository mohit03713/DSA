'use client'

import { useState } from 'react'
import {
  Sparkles,
  UploadCloud,
  FileText,
  TrendingUp,
  Brain,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { DEMO_SUBJECTS } from '@/lib/constants/demoData'

interface ExamQuestionPrediction {
  id: string
  question: string
  subject: string
  unit: string
  frequency: number
  marks: number
  probability: number
  importance: 'Very High' | 'High' | 'Medium'
}

const PREDICTIONS: ExamQuestionPrediction[] = [
  {
    id: 'p1',
    question: 'Explain Dijkstra\'s Single Source Shortest Path Algorithm with a detailed step-by-step example. Trace distance array updates.',
    subject: 'Data Structures',
    unit: 'Unit 4: Graphs',
    frequency: 9,
    marks: 10,
    probability: 96,
    importance: 'Very High',
  },
  {
    id: 'p2',
    question: 'Define Deadlock. State the four necessary conditions. Explain Banker\'s Algorithm for deadlock avoidance with safety algorithm.',
    subject: 'Operating Systems',
    unit: 'Unit 3: Deadlocks',
    frequency: 8,
    marks: 10,
    probability: 92,
    importance: 'Very High',
  },
  {
    id: 'p3',
    question: 'What is Normalization? Explain 1NF, 2NF, 3NF, and BCNF with suitable relational schema examples.',
    subject: 'DBMS',
    unit: 'Unit 3: SQL & Normalization',
    frequency: 7,
    marks: 10,
    probability: 88,
    importance: 'High',
  },
  {
    id: 'p4',
    question: 'Construct an AVL tree by inserting the following sequence: [21, 26, 30, 9, 4, 14, 28, 18, 15, 10]. Show LL, RR, LR, RL rotations.',
    subject: 'Data Structures',
    unit: 'Unit 3: Trees',
    frequency: 7,
    marks: 8,
    probability: 85,
    importance: 'High',
  },
  {
    id: 'p5',
    question: 'Compare OSI 7-Layer Architecture with TCP/IP reference model. Explain functions of each layer.',
    subject: 'Computer Networks',
    unit: 'Unit 1: Fundamentals',
    frequency: 6,
    marks: 8,
    probability: 82,
    importance: 'High',
  },
  {
    id: 'p6',
    question: 'Explain Virtual Memory management. Describe FIFO, LRU, and Optimal page replacement algorithms with reference string.',
    subject: 'Operating Systems',
    unit: 'Unit 4: Virtual Memory',
    frequency: 6,
    marks: 10,
    probability: 80,
    importance: 'Medium',
  },
]

export default function ExamAIPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'University_EndSem_2023_DS.pdf',
    'MidSem_2023_OS.pdf',
    'PreviousYear_2022_DBMS.pdf',
  ])
  const [activeTab, setActiveTab] = useState<'predictions' | 'breakdown' | 'upload'>('predictions')

  const handleUploadSim = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setUploadedFiles((prev) => [...prev, 'Dec_2023_PastPaper_Analyzed.pdf'])
      alert('Paper analyzed successfully! Extracted 14 exam questions and updated probability weights.')
    }, 1200)
  }

  const filteredPredictions = PREDICTIONS.filter((p) => {
    if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false
    return true
  })

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
            <Sparkles className="w-4 h-4" /> AI Exam Analysis & Intelligence
          </div>
          <h1 className="text-3xl font-bold text-foreground">Exam Prediction Engine</h1>
          <p className="text-muted-foreground mt-1">
            Machine learning analysis of 5+ years of university question papers to predict semester exam patterns.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('upload')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs transition-all hover:bg-primary/90 self-start md:self-center shadow-sm"
        >
          <UploadCloud className="w-4 h-4" />
          Upload Past Paper (PDF)
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Analyzed Papers</span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">{uploadedFiles.length + 9} Papers</div>
          <div className="text-[11px] text-emerald-500 mt-1">Spans 2018 - 2024 sessions</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Prediction Confidence</span>
            <Brain className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">94.2%</div>
          <div className="text-[11px] text-purple-400 mt-1">High semantic correlation</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Top Recurring Topics</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">18 Topics</div>
          <div className="text-[11px] text-muted-foreground mt-1">Accounting for ~65% marks</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Next Target Exam</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">13 Days Left</div>
          <div className="text-[11px] text-amber-500 mt-1">Data Structures Mid-Sem</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('predictions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'predictions'
              ? 'bg-card border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          High-Probability Questions ({PREDICTIONS.length})
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'upload'
              ? 'bg-card border border-border text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Paper Extraction & Repository ({uploadedFiles.length})
        </button>
      </div>

      {activeTab === 'predictions' && (
        <div className="space-y-4">
          {/* Subject Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSubject === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:bg-secondary'
              }`}
            >
              All Subjects
            </button>
            {DEMO_SUBJECTS.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedSubject === sub.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:bg-secondary'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Predictions Cards */}
          <div className="space-y-4">
            {filteredPredictions.map((pred) => (
              <div
                key={pred.id}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">
                      {pred.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">{pred.unit}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                        pred.importance === 'Very High'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-amber-500/10 text-amber-500'
                      }`}
                    >
                      {pred.importance} Priority
                    </span>
                  </div>

                  <p className="text-sm md:text-base font-semibold text-foreground leading-relaxed">
                    {pred.question}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      Appeared <strong className="text-foreground">{pred.frequency} times</strong> in past papers
                    </span>
                    <span>
                      Weightage: <strong className="text-foreground">{pred.marks} Marks</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-500">{pred.probability}%</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Occurrence Probability
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-8 text-center bg-card flex flex-col items-center justify-center transition-colors">
            <UploadCloud className="w-12 h-12 text-primary mb-3" />
            <h3 className="text-base font-bold text-foreground">Upload University Question Papers</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              Drag and drop past mid-term or end-semester exam question papers (PDF, PNG, JPG). Our OCR model will automatically extract and categorize every question.
            </p>
            <button
              onClick={handleUploadSim}
              disabled={isAnalyzing}
              className="mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? 'Extracting & Analyzing Questions with AI...' : 'Select Question Paper File'}
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="text-sm font-bold text-foreground mb-3">Extracted & Indexed Past Papers</h4>
            <div className="divide-y divide-border">
              {uploadedFiles.map((file, i) => (
                <div key={i} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>{file}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Indexed & Processed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

