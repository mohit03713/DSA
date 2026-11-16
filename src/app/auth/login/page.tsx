'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lock, Mail, ArrowRight, UserCheck, Shield, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'admin'>('student')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    const res = await login(email, password, role)
    setLoading(false)

    if (res.success) {
      toast.success('Signed in successfully!')
      if (role === 'admin' || email.toLowerCase().includes('admin')) {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.')
    }
  }

  const handleQuickDemo = async (demoRole: 'student' | 'admin') => {
    setErrorMessage(null)
    setLoading(true)
    const demoEmail = demoRole === 'admin' ? 'admin@chitkara.edu.in' : 'mohit.sharma@chitkara.edu.in'
    setEmail(demoEmail)
    setPassword('••••••••')
    setRole(demoRole)

    const res = await login(demoEmail, 'password', demoRole)
    setLoading(false)

    if (res.success) {
      toast.success(`Logged in as ${demoRole === 'admin' ? 'Faculty Admin' : 'Student (Mohit Sharma)'}!`)
      if (demoRole === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-center items-center p-4">
      {/* Background ambient glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-[110px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-7 md:p-8 shadow-2xl space-y-6 relative z-10"
      >
        <div className="text-center space-y-2">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 6 }}
            className="w-12 h-12 rounded-2xl gradient-primary text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-indigo-500/25"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome to StudySphere AI</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access your personalised engineering syllabus, lab manuals, and AI tutor.
          </p>
        </div>

        {/* Role Selector Tabs with Sliding Pill */}
        <div className="flex p-1 bg-secondary rounded-2xl border border-border/80 relative">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`relative flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
              role === 'student' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {role === 'student' && (
              <motion.div
                layoutId="authRolePill"
                className="absolute inset-0 bg-card rounded-xl shadow-xs border border-border"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              Student Portal
            </span>
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`relative flex-1 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
              role === 'admin' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {role === 'admin' && (
              <motion.div
                layoutId="authRolePill"
                className="absolute inset-0 bg-card rounded-xl shadow-xs border border-border"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              Faculty / Admin
            </span>
          </button>
        </div>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">University Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'admin' ? 'faculty.admin@university.edu' : 'student@university.edu'}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <button
                type="button"
                onClick={() => setPassword('password123')}
                className="text-[11px] text-primary hover:underline"
                title="Fill default demo password"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl gradient-primary text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md shadow-indigo-500/25"
          >
            {loading ? 'Authenticating...' : `Sign In as ${role === 'admin' ? 'Faculty Admin' : 'Student'}`}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        {/* Quick Demo Logins */}
        <div className="pt-4 border-t border-border/80 space-y-2">
          <div className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-wider">
            Quick 1-Click Demo Profiles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="py-2.5 px-3 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-border/70 shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              Mohit (Student)
            </motion.button>
            <motion.button
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2.5 px-3 rounded-xl bg-secondary/70 hover:bg-secondary text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-border/70 shadow-xs"
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              Prof. Rajesh (Admin)
            </motion.button>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-1">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary hover:underline font-semibold">
            Register new account
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
