'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin' | 'faculty'
  semester: string
  branch: string
  rollNumber?: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (
    email: string,
    password?: string,
    role?: 'student' | 'admin'
  ) => Promise<{ success: boolean; error?: string }>
  register: (userData: {
    name: string
    email: string
    password?: string
    semester?: string
    branch?: string
    rollNumber?: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const DEFAULT_STUDENT: User = {
  id: 'usr_student_mohit',
  name: 'Mohit Sharma',
  email: 'mohit.sharma@chitkara.edu.in',
  role: 'student',
  semester: '4',
  branch: 'Computer Science & Engineering',
  rollNumber: '2210991234',
  createdAt: '2024-01-15T10:00:00Z',
}

const DEFAULT_ADMIN: User = {
  id: 'usr_admin_rajesh',
  name: 'Prof. Rajesh Kumar',
  email: 'admin@chitkara.edu.in',
  role: 'admin',
  semester: 'Faculty',
  branch: 'Department of Computer Science',
  rollNumber: 'FAC-8812',
  createdAt: '2023-08-01T10:00:00Z',
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY_USER = 'studysphere_auth_user'
const STORAGE_KEY_ACCOUNTS = 'studysphere_registered_accounts'

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER)
      if (stored) {
        setUser(JSON.parse(stored))
      } else {
        const hasLoggedOut = localStorage.getItem('studysphere_explicit_logout')
        if (!hasLoggedOut) {
          // Pre-set default student user for first-time session
          setUser(DEFAULT_STUDENT)
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_STUDENT))
        } else {
          setUser(null)
        }
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (
    email: string,
    _password?: string,
    role: 'student' | 'admin' = 'student'
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 350)) // realistic subtle network delay

    if (!email || !email.includes('@')) {
      setIsLoading(false)
      return { success: false, error: 'Please enter a valid university email address.' }
    }

    // Check pre-registered accounts
    let loggedUser: User
    if (email.toLowerCase().includes('admin') || role === 'admin') {
      loggedUser = { ...DEFAULT_ADMIN, email }
    } else if (email.toLowerCase() === DEFAULT_STUDENT.email.toLowerCase()) {
      loggedUser = DEFAULT_STUDENT
    } else {
      // Check if user was registered in localStorage
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY_ACCOUNTS)
        const accounts: User[] = existingRaw ? JSON.parse(existingRaw) : []
        const matched = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())
        if (matched) {
          loggedUser = matched
        } else {
          // Auto-derive profile from email
          const namePart = email.split('@')[0].replace(/[._]/g, ' ')
          const formattedName = namePart
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')

          loggedUser = {
            id: `usr_${Date.now()}`,
            name: formattedName || 'Engineering Student',
            email: email.toLowerCase(),
            role: role || 'student',
            semester: '4',
            branch: 'Computer Science & Engineering',
            rollNumber: `221099${Math.floor(1000 + Math.random() * 9000)}`,
            createdAt: new Date().toISOString(),
          }
        }
      } catch {
        loggedUser = {
          id: `usr_${Date.now()}`,
          name: 'Engineering Student',
          email: email.toLowerCase(),
          role: role || 'student',
          semester: '4',
          branch: 'Computer Science & Engineering',
          createdAt: new Date().toISOString(),
        }
      }
    }

    setUser(loggedUser)
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(loggedUser))
      localStorage.removeItem('studysphere_explicit_logout')
    } catch (e) {
      console.warn('Failed saving user to localStorage:', e)
    }

    setIsLoading(false)
    return { success: true }
  }

  const register = async (userData: {
    name: string
    email: string
    password?: string
    semester?: string
    branch?: string
    rollNumber?: string
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (!userData.name.trim()) {
      setIsLoading(false)
      return { success: false, error: 'Full name is required.' }
    }
    if (!userData.email || !userData.email.includes('@')) {
      setIsLoading(false)
      return { success: false, error: 'A valid email address is required.' }
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      role: 'student',
      semester: userData.semester || '4',
      branch: userData.branch || 'Computer Science & Engineering',
      rollNumber: userData.rollNumber || `221099${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    }

    // Save to accounts list
    try {
      const existingRaw = localStorage.getItem(STORAGE_KEY_ACCOUNTS)
      const accounts: User[] = existingRaw ? JSON.parse(existingRaw) : []
      // Check for duplicate email
      const exists = accounts.some((a) => a.email.toLowerCase() === newUser.email)
      if (exists) {
        setIsLoading(false)
        return { success: false, error: 'An account with this email already exists. Please log in.' }
      }
      accounts.push(newUser)
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts))
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser))
    } catch (e) {
      console.warn('LocalStorage error during registration:', e)
    }

    setUser(newUser)
    setIsLoading(false)
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY_USER)
      localStorage.setItem('studysphere_explicit_logout', 'true')
    } catch {}
    router.push('/auth/login')
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return
    const updated = { ...user, ...data }
    setUser(updated)
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated))
    } catch {}
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

