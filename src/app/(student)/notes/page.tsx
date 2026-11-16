'use client'

import { useState } from 'react'
import {
  FileText,
  Plus,
  Trash2,
  Edit3,
  Search,
  Tag,
  Calendar,
  Save,
  Check,
} from 'lucide-react'

interface StudentNote {
  id: string
  title: string
  subject: string
  content: string
  tags: string[]
  updatedAt: string
}

const INITIAL_NOTES: StudentNote[] = [
  {
    id: 'n1',
    title: 'Dijkstra vs Bellman-Ford Summary',
    subject: 'Data Structures & Algorithms',
    content: `Dijkstra's Algorithm:
- Works with non-negative edge weights only.
- Greedy approach using Min-Heap priority queue.
- Time Complexity: O((V + E) log V).

Bellman-Ford Algorithm:
- Handles negative edge weights.
- Detects negative weight cycles in graphs.
- Dynamic programming approach.
- Time Complexity: O(V * E).`,
    tags: ['Graph', 'Exam Revision', 'Algorithms'],
    updatedAt: '2024-11-10',
  },
  {
    id: 'n2',
    title: 'DIP Histogram Equalization Derivation',
    subject: 'Digital Image Processing',
    content: `Histogram Equalization Steps:
1. Compute probability density function: p(r_k) = n_k / (M * N).
2. Compute cumulative distribution function (CDF): s_k = T(r_k) = (L - 1) * sum_{j=0}^k p(r_j).
3. Round s_k to the nearest discrete integer gray level in range [0, L-1].
4. Map old gray levels to equalized levels. Resulting histogram has approximately uniform distribution and maximized dynamic contrast.`,
    tags: ['DIP', 'Histogram', 'Contrast Enhancement'],
    updatedAt: '2024-11-16',
  },
  {
    id: 'n3',
    title: 'Image Sampling, Quantization & Memory Footprint',
    subject: 'Digital Image Processing',
    content: `Fundamental DIP Storage Formulas:
1. Total bits required: b = N * M * k, where k = log_2(L) bits/pixel.
2. Storage in Bytes: b / 8.
3. Storage in Kilobytes (KB): (b / 8) / 1024.
4. Nyquist rate: Sampling frequency f_s >= 2 * f_max to avoid spatial aliasing / Moiré patterns.`,
    tags: ['DIP', 'Sampling', 'Quantization', 'Formulas'],
    updatedAt: '2024-11-15',
  },
  {
    id: 'n4',
    title: 'Infix to Postfix Stack Reversal Method',
    subject: 'Data Structures & Algorithms',
    content: `Infix to Prefix Conversion Steps:
1. Reverse the infix string.
2. Swap '(' with ')' and vice versa.
3. Compute postfix expression using standard stack precedence rules.
4. Reverse the postfix string to obtain the final prefix notation!`,
    tags: ['Stacks', 'Parsing', 'Expressions'],
    updatedAt: '2024-11-12',
  },
]

export default function NotesPage() {
  const [notes, setNotes] = useState<StudentNote[]>(INITIAL_NOTES)
  const [selectedNoteId, setSelectedNoteId] = useState<string>(INITIAL_NOTES[0].id)
  const [search, setSearch] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')

  const activeNote = notes.find((n) => n.id === selectedNoteId) || notes[0]

  const handleSelectNote = (note: StudentNote) => {
    setSelectedNoteId(note.id)
    setEditedTitle(note.title)
    setEditedContent(note.content)
    setIsEditing(false)
  }

  const handleCreateNew = () => {
    const newNote: StudentNote = {
      id: `n-${Date.now()}`,
      title: 'Untitled Note',
      subject: 'Data Structures',
      content: 'Write your revision notes, formulas, and pointers here...',
      tags: ['Personal'],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
    setEditedTitle(newNote.title)
    setEditedContent(newNote.content)
    setIsEditing(true)
  }

  const handleSave = () => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === selectedNoteId
          ? {
              ...n,
              title: editedTitle || n.title,
              content: editedContent,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : n
      )
    )
    setIsEditing(false)
  }

  const handleDelete = (id: string) => {
    const remaining = notes.filter((n) => n.id !== id)
    setNotes(remaining)
    if (remaining.length > 0) {
      setSelectedNoteId(remaining[0].id)
    }
  }

  const filteredNotes = notes.filter((n) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
            <FileText className="w-4 h-4" /> Academic Study Notes
          </div>
          <h1 className="text-3xl font-bold text-foreground">Student Notes & Summaries</h1>
          <p className="text-muted-foreground text-xs md:text-sm mt-0.5">
            Create, organize, and review personal revision notes and concept checklists.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-sm self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          Create New Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[520px]">
        {/* Note List Sidebar */}
        <div className="md:col-span-4 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-secondary/50 rounded-xl text-xs border border-transparent focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`w-full text-left p-4 transition-colors flex flex-col gap-1.5 ${
                  selectedNoteId === note.id ? 'bg-primary/10' : 'hover:bg-secondary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-primary">{note.subject}</span>
                  <span className="text-[10px] text-muted-foreground">{note.updatedAt}</span>
                </div>
                <div className="font-semibold text-foreground text-sm truncate">{note.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {note.content}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note Editor / Preview */}
        <div className="md:col-span-8 bg-card border border-border rounded-2xl p-6 flex flex-col">
          {activeNote ? (
            <div className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-1 flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="text-xl font-bold bg-secondary/50 text-foreground px-3 py-1 rounded-lg w-full border border-border focus:outline-none"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-foreground">{activeNote.title}</h2>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activeNote.subject}</span>
                    <span>·</span>
                    <span>Last updated: {activeNote.updatedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      <Save className="w-3.5 h-3.5" /> Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditedTitle(activeNote.title)
                        setEditedContent(activeNote.content)
                        setIsEditing(true)
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 text-xs font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(activeNote.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="flex-1 w-full bg-secondary/30 rounded-xl p-4 text-sm font-mono text-foreground border border-border focus:outline-none resize-none leading-relaxed min-h-[350px]"
                />
              ) : (
                <div className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 font-sans p-2">
                  {activeNote.content}
                </div>
              )}

              {/* Tags */}
              <div className="pt-4 border-t border-border flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                {activeNote.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Select or create a note to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

