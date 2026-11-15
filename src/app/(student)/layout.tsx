'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { MobileNav } from '@/components/layout/MobileNav'
import { TechBackground } from '@/components/shared/TechBackground'
import { cn } from '@/lib/utils'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* High-tech AI background with video loop and particle constellation */}
      <TechBackground />

      {/* Sidebar — sits above background */}
      <div className="relative z-10">
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
      </div>

      {/* Main content area — sits above background */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        <main
          className={cn(
            'flex-1 overflow-y-auto pb-16 md:pb-0 bg-transparent',
          )}
        >
          <div className="max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  )
}
