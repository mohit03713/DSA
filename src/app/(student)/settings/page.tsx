'use client'

import { useState } from 'react'
import {
  Settings,
  User,
  Key,
  Moon,
  Sun,
  Bell,
  Save,
  Shield,
  Laptop,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { DEMO_USER } from '@/lib/constants/demoData'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState(DEMO_USER.name)
  const [email, setEmail] = useState(DEMO_USER.email)
  const [semester, setSemester] = useState('4')
  const [geminiKey, setGeminiKey] = useState('')
  const [judge0Url, setJudge0Url] = useState('https://judge0-ce.p.rapidapi.com')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl">
      <div>
        <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
          <Settings className="w-4 h-4" /> Preferences & Config
        </div>
        <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your student profile, API credentials for Gemini AI & Judge0, and appearance.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Student Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-secondary/20 border border-border/50 rounded-xl px-4 py-2.5 text-xs text-muted-foreground cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Current Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4 (Current)</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">Enrolled Program</label>
              <input
                type="text"
                value="B.Tech Computer Science & Engineering"
                disabled
                className="w-full bg-secondary/20 border border-border/50 rounded-xl px-4 py-2.5 text-xs text-muted-foreground cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-500" />
            Appearance & Interface Theme
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border bg-secondary/30 text-foreground hover:bg-secondary/60'
              }`}
            >
              <Moon className="w-5 h-5" />
              <span className="text-xs">Dark Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border bg-secondary/30 text-foreground hover:bg-secondary/60'
              }`}
            >
              <Sun className="w-5 h-5" />
              <span className="text-xs">Light Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                theme === 'system'
                  ? 'border-primary bg-primary/10 text-primary font-bold'
                  : 'border-border bg-secondary/30 text-foreground hover:bg-secondary/60'
              }`}
            >
              <Laptop className="w-5 h-5" />
              <span className="text-xs">System Default</span>
            </button>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-500" />
            AI & Execution Engine Credentials
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Optionally supply your own API keys. If left blank, the platform uses pre-configured sandbox fallback models.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Google Gemini API Key
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground mb-1 block">
                Judge0 Compiler API URL
              </label>
              <input
                type="text"
                value={judge0Url}
                onChange={(e) => setJudge0Url(e.target.value)}
                className="w-full bg-secondary/40 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          {savedSuccess && (
            <span className="text-xs font-semibold text-emerald-500 animate-fade-in">
              Settings updated successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

