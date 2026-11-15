'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Lock, Mail, User, ArrowRight, GraduationCap, Building2, AlertCircle } from 'lucide-react'
import { useAuth } from '@/lib/context/AuthContext'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [semester, setSemester] = useState('4')
  const [branch, setBranch] = useState('Computer Science & Engineering')
  const [rollNumber, setRollNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    const res = await register({
      name,
      email,
      password,
      semester,
      branch,
      rollNumber,
    })

    setLoading(false)

    if (res.success) {
      toast.success(`Account created! Welcome, ${name}.`)
      router.push('/dashboard')
    } else {
      setErrorMessage(res.error || 'Failed to create account. Please try again.')
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-card/90 backdrop-blur-xl border border-border/80 rounded-3xl p-7 md:p-8 shadow-2xl space-y-6 relative z-10 my-8"
      >
        <div className="text-center space-y-2">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -6 }}
            className="w-12 h-12 rounded-2xl gradient-primary text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-indigo-500/25"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Student Account</h1>
          <p className="text-xs text-muted-foreground">
            Join StudySphere AI to access verified engineering content, DSA solutions, and AI tutor.
          </p>
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

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mohit Sharma"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">University Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mohit.sharma@chitkara.edu.in"
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Semester</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Roll Number (Optional)</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="2210991234"
                className="w-full px-3.5 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Branch / Specialization</label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Password</label>
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
            {loading ? 'Creating Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-1">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign in here
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
