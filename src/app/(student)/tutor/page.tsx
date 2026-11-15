'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Brain,
  Send,
  Sparkles,
  Bot,
  User,
  Plus,
  MessageSquare,
  Trash2,
  Code2,
  HelpCircle,
  Lightbulb,
} from 'lucide-react'
import { DEMO_CHAT_SESSIONS } from '@/lib/constants/demoData'
import { CodeBlock } from '@/components/shared/CodeBlock'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  codeSnippet?: { code: string; language: string }
}

const STARTER_PROMPTS = [
  'Explain AVL Tree Rotations (LL, RR, LR, RL) with balance factors.',
  'How does Banker\'s Algorithm prevent Deadlocks in Operating Systems?',
  'What is the difference between 3NF and BCNF with a database example?',
  'Help me optimize Dijkstra\'s Algorithm using a Min-Heap priority queue.',
]

export default function AITutorPage() {
  const [sessions, setSessions] = useState(DEMO_CHAT_SESSIONS)
  const [activeSessionId, setActiveSessionId] = useState<string>(DEMO_CHAT_SESSIONS[0].id)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      content:
        'Hello Mohit! I am your StudySphere AI Personal Tutor. I have full context of your Semester 4 engineering curriculum: Data Structures, Operating Systems, DBMS, and Computer Networks.\n\nWhat topic, algorithm, or lab assignment would you like to explore today?',
      timestamp: 'Just now',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue.trim()
    if (!text) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputValue('')
    setIsTyping(true)

    // Simulate Socratic AI tutor response
    setTimeout(() => {
      let replyContent = ''
      let snippet: { code: string; language: string } | undefined

      if (text.toLowerCase().includes('avl') || text.toLowerCase().includes('rotation')) {
        replyContent = `An **AVL Tree** is a self-balancing binary search tree where the difference between heights of left and right subtrees (the **Balance Factor**) cannot be more than 1 for all nodes.\n\n### Balance Factor Formula:\n\`BalanceFactor = height(LeftSubtree) - height(RightSubtree)\`\n\nAllowed values: **-1, 0, +1**.\n\n### The 4 Rotation Types:\n1. **LL Rotation (Left of Left)**: Single Right Rotation at node.\n2. **RR Rotation (Right of Right)**: Single Left Rotation at node.\n3. **LR Rotation (Right of Left)**: Double rotation — Left rotation on child, then Right rotation on node.\n4. **RL Rotation (Left of Right)**: Double rotation — Right rotation on child, then Left rotation on node.`
        snippet = {
          language: 'cpp',
          code: `// Right rotation for LL imbalance
Node* rightRotate(Node* y) {
    Node* x = y->left;
    Node* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = 1 + max(height(y->left), height(y->right));
    x->height = 1 + max(height(x->left), height(x->right));
    return x; // New root
}`,
        }
      } else if (text.toLowerCase().includes('deadlock') || text.toLowerCase().includes('banker')) {
        replyContent = `In **Operating Systems**, **Banker\'s Algorithm** is a deadlock avoidance algorithm named after the banking system where a bank never allocates cash exceeding its reserves.\n\n### Core Matrices:\n1. **Allocation Matrix [N x M]**: Resources currently allocated to process $P_i$.\n2. **Max Matrix [N x M]**: Maximum demand of process $P_i$.\n3. **Available Vector [M]**: Available instances of each resource.\n4. **Need Matrix [N x M]**: \`Need[i][j] = Max[i][j] - Allocation[i][j]\`.\n\nA state is **Safe** if there exists a safe execution sequence such that every process can finish.`
      } else if (text.toLowerCase().includes('3nf') || text.toLowerCase().includes('bcnf')) {
        replyContent = `### Normalization Comparison: 3NF vs BCNF\n\n- **Third Normal Form (3NF)**: Eliminates transitive dependencies. For every non-trivial functional dependency $X \\rightarrow Y$, either:\n  1. $X$ is a super key, OR\n  2. $Y$ is a prime attribute (part of any candidate key).\n\n- **Boyce-Codd Normal Form (BCNF)**: Strictly stronger. For every non-trivial functional dependency $X \\rightarrow Y$:\n  - $X$ **MUST** be a super key.\n\n*Key rule:* Every relation in BCNF is in 3NF, but not every 3NF relation is in BCNF!`
      } else {
        replyContent = `That's an important topic in your engineering curriculum! Let's break it down conceptually:\n\n1. **Core Intuition**: Always inspect the underlying invariants before writing code.\n2. **Time Complexity**: Aim for optimal bounds like $O(N)$ or $O(N \\log N)$ using appropriate data structures.\n3. **Practical Implementation**: Make sure to check base cases and boundary constraints.\n\nWould you like me to generate a complete C/C++ solution or a dry run diagram?`
      }

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet: snippet,
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, assistantMsg])
    }, 900)
  }

  const handleNewSession = () => {
    const newSession = {
      id: `s-${Date.now()}`,
      title: 'New Study Discussion',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 0,
    }
    setSessions([newSession, ...sessions])
    setActiveSessionId(newSession.id)
    setMessages([
      {
        id: `m-init`,
        role: 'assistant',
        content: 'New session started. How can I assist your engineering study right now?',
        timestamp: 'Just now',
      },
    ])
  }

  return (
    <div className="h-[calc(100vh-140px)] min-h-[580px] flex gap-6 animate-fade-in">
      {/* Sessions Sidebar */}
      <div className="hidden md:flex w-72 bg-card border border-border rounded-2xl flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground font-bold text-sm">
            <Brain className="w-4 h-4 text-primary" />
            <span>Chat Sessions</span>
          </div>
          <button
            onClick={handleNewSession}
            className="p-1.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground transition-colors"
            title="New Chat Session"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSessionId(s.id)}
              className={`w-full text-left p-3 rounded-xl text-xs transition-colors flex items-center gap-2.5 ${
                activeSessionId === s.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-secondary/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-card border border-border rounded-2xl flex flex-col overflow-hidden shadow-sm">
        {/* Chat Top Bar */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card/60 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">StudySphere AI Tutor</h2>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active RAG Context: 4 Subjects, 155 Topics, Lab Manuals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-3xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-primary'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs md:text-sm space-y-3 shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-xs'
                    : 'bg-secondary/60 text-foreground border border-border/80 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>

                {msg.codeSnippet && (
                  <div className="pt-2">
                    <CodeBlock
                      code={msg.codeSnippet.code}
                      language={msg.codeSnippet.language}
                      filename="AI_Snippet"
                    />
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 text-right ${
                    msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3.5 items-center">
              <div className="w-8 h-8 rounded-xl bg-secondary text-primary flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-secondary/60 rounded-2xl px-4 py-3 text-xs text-muted-foreground flex items-center gap-1.5 border border-border/80">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Starter Suggestions */}
        <div className="px-6 py-2 border-t border-border/40 flex items-center gap-2 overflow-x-auto bg-secondary/15">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 flex-shrink-0">
            <Lightbulb className="w-3 h-3 text-amber-500" /> Prompts:
          </span>
          {STARTER_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs px-3 py-1 rounded-full bg-card hover:bg-secondary text-foreground border border-border/80 whitespace-nowrap transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about algorithms, code snippets, labs, or past exams..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-secondary/50 rounded-xl px-4 py-3 text-xs md:text-sm border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

