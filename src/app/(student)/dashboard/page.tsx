import type { Metadata } from 'next'
import { DashboardView } from '@/components/dashboard/DashboardView'

export const metadata: Metadata = {
  title: 'Dashboard — StudySphere AI',
  description: 'Personalised engineering syllabus dashboard with AI analytics, lab trackers, and practice schedule.',
}

export default function DashboardPage() {
  return <DashboardView />
}
