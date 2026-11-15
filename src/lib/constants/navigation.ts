import {
  LayoutDashboard,
  BookOpen,
  Code2,
  FlaskConical,
  Brain,
  Sparkles,
  FileText,
  TrendingUp,
  Bookmark,
  Settings,
  Binary,
  Terminal,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string | number
  children?: NavItem[]
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Learn',
    items: [
      { label: 'Subjects', href: '/subjects', icon: BookOpen },
      { label: 'DSA Library', href: '/dsa', icon: Binary },
    ],
  },
  {
    label: 'Practice',
    items: [
      { label: 'Labs', href: '/labs', icon: FlaskConical },
      { label: 'Code Editor', href: '/practice', icon: Terminal },
    ],
  },
  {
    label: 'AI Tools',
    items: [
      { label: 'Exam AI', href: '/exam-ai', icon: Sparkles },
      { label: 'AI Tutor', href: '/tutor', icon: Brain },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Notes', href: '/notes', icon: FileText },
      { label: 'Progress', href: '/progress', icon: TrendingUp },
      { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
]

export const BOTTOM_NAV = [
  { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Learn', href: '/subjects', icon: BookOpen },
  { label: 'Labs', href: '/labs', icon: FlaskConical },
  { label: 'AI', href: '/tutor', icon: Brain },
  { label: 'Profile', href: '/progress', icon: TrendingUp },
]

