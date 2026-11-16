'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldAlert,
  Users,
  BookOpen,
  FlaskConical,
  Sparkles,
  Check,
  X,
  Plus,
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react'

interface AIReviewItem {
  id: string
  type: 'Lab Solution' | 'Exam Prediction' | 'Topic Notes'
  title: string
  subject: string
  generatedAt: string
  confidence: number
  status: 'pending' | 'approved' | 'rejected'
}

const REVIEW_QUEUE: AIReviewItem[] = [
  {
    id: 'rq1',
    type: 'Lab Solution',
    title: 'C Solution for 2D Spatial Filtering & Zero-Padding Border Handling',
    subject: 'Digital Image Processing',
    generatedAt: '10 mins ago',
    confidence: 96,
    status: 'pending',
  },
  {
    id: 'rq2',
    type: 'Exam Prediction',
    title: 'Kruskal\'s Algorithm Disjoint Set Union optimization question',
    subject: 'Data Structures & Algorithms',
    generatedAt: '1 hour ago',
    confidence: 91,
    status: 'pending',
  },
  {
    id: 'rq3',
    type: 'Topic Notes',
    title: '2D Discrete Cosine Transform (DCT) Matrix Derivation & Energy Compaction',
    subject: 'Digital Image Processing',
    generatedAt: '3 hours ago',
    confidence: 95,
    status: 'pending',
  },
]

export default function AdminDashboardPage() {
  const [items, setItems] = useState<AIReviewItem[]>(REVIEW_QUEUE)

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    )
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" /> Faculty & Admin Management Console
          </div>
          <h1 className="text-3xl font-bold text-foreground">Content Management System</h1>
          <p className="text-muted-foreground text-xs md:text-sm mt-0.5">
            Approve AI-generated educational materials, manage lab manuals, and oversee curriculum.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80 transition-colors"
          >
            Switch to Student Portal
          </Link>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add New Subject
          </button>
        </div>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">1,248</div>
          <div className="text-[11px] text-emerald-500 mt-1">+12% this semester</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Active Curricula</span>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">4 Subjects</div>
          <div className="text-[11px] text-muted-foreground mt-1">155 total topics</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Lab Submissions</span>
            <FlaskConical className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">3,892</div>
          <div className="text-[11px] text-amber-500 mt-1">Across 16 practicals</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold mb-1">
            <span>Pending AI Approvals</span>
            <Sparkles className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-foreground">
            {items.filter((i) => i.status === 'pending').length} Drafts
          </div>
          <div className="text-[11px] text-red-400 mt-1">Requires human review</div>
        </div>
      </div>

      {/* AI Moderation & Review Workflow Section */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Draft Review & Publishing Queue
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Strict Rule: AI-generated solutions and questions must be verified by faculty before being published to students.
            </p>
          </div>
        </div>

        <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card hover:bg-secondary/20 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-secondary font-semibold text-primary">
                    {item.type}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">{item.subject}</span>
                  <span className="text-xs text-emerald-500 font-medium">
                    AI Confidence: {item.confidence}%
                  </span>
                </div>
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <div className="text-[11px] text-muted-foreground">Generated {item.generatedAt}</div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {item.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(item.id, 'approved')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve & Publish
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'rejected')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-red-500/20 text-red-500 text-xs font-semibold transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                      item.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    {item.status === 'approved' ? '✓ Approved & Published' : '✕ Rejected'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

