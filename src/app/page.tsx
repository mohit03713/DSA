'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Sparkles, Lock, Mail, ArrowRight, UserCheck, Shield,
  BookOpen, Binary, Layers, CheckCircle2, ChevronRight
} from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { toast } from 'sonner'

export default function HomePage() {
  const router = useRouter()
  const { user, login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'admin'>('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // If already authenticated, redirect automatically to dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const res = await login(email, password, role)
    setLoading(false)

    if (res.success) {
      toast.success('Signed in successfully!')
      router.push(role === 'admin' ? '/admin' : '/dashboard')
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.')
    }
  }

  const handleQuickDemo = async (demoRole: 'student' | 'admin') => {
    setError(null)
    setLoading(true)
    const demoEmail = demoRole === 'admin' ? 'admin@chitkara.edu.in' : 'mohit.sharma@chitkara.edu.in'

    const res = await login(demoEmail, 'password', demoRole)
    setLoading(false)

    if (res.success) {
      toast.success(`Logged in as ${demoRole === 'admin' ? 'Faculty Admin' : 'Student (Mohit Sharma)'}!`)
      router.push(demoRole === 'admin' ? '/admin' : '/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-between">
      {/* Ambient gradient lighting */}
      <div className="absolute top-0 left-1/4 w-[36rem] h-[36rem] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[36rem] h-[36rem] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="h-20 border-b border-border/80 px-6 sm:px-12 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-black flex items-center justify-center font-extrabold text-lg shadow-sm">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-foreground block">
              StudySphere AI
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Engineering Learning Cloud
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuickDemo('student')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-all"
          >
            <span>Demo Student</span>
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-sm"
          >
            <span>Enter as Guest</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero & Login Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 sm:p-12 gap-12 max-w-7xl mx-auto w-full relative z-10">
        {/* Left Column: Platform Showcase */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Course: Digital Image Processing (Units 1-5 + Numericals)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Master Computer Science & <span className="text-cyan-400">Image Processing</span> with AI
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Your university companion for Data Structures, Digital Image Processing, Operating Systems, and DBMS. Complete with step-by-step solved numericals, formula sheets, interactive animated studios, and AI tutor.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
            <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-left">
              <span className="text-cyan-400 font-bold text-sm block">5 Units + Solved</span>
              <span className="text-xs text-muted-foreground">Digital Image Processing</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-left">
              <span className="text-purple-400 font-bold text-sm block">∑ Master Sheet</span>
              <span className="text-xs text-muted-foreground">Formulas & Exam Tips</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-card border border-border/80 text-left col-span-2 sm:col-span-1">
              <span className="text-emerald-400 font-bold text-sm block">Interactive</span>
              <span className="text-xs text-muted-foreground">2D Convolution Studio</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Login Card */}
        <div className="w-full max-w-md bg-card/95 backdrop-blur-xl border border-border rounded-3xl p-7 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Sign In to StudySphere</h2>
            <p className="text-xs text-muted-foreground">
              Sign in with your university credentials or click 1-Click Demo
            </p>
          </div>

          {/* Quick 1-Click Demo Logins */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground text-center">
              Fast 1-Click Sign-in
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Student Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                disabled={loading}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Faculty Demo</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full" />
            <span className="bg-card px-3 text-[10px] font-mono text-muted-foreground uppercase absolute">
              Or with University Email
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Custom Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  role === 'student'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-secondary/40 text-muted-foreground border-border'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  role === 'admin'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                    : 'bg-secondary/40 text-muted-foreground border-border'
                }`}
              >
                Faculty
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-1 border-t border-border/60">
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-cyan-400 font-bold hover:underline">
                Register as Student
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border/80 text-center text-xs text-muted-foreground relative z-10">
        StudySphere AI • Engineering Curriculum & Digital Image Processing • 2024
      </footer>
    </div>
  )
}
