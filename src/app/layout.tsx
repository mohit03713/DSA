import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/lib/context/AuthContext'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'StudySphere AI — Smart Learning Platform',
    template: '%s | StudySphere AI',
  },
  description:
    'AI-powered educational platform for engineering students. Master Data Structures & Algorithms and Digital Image Processing with interactive studios, formula sheets, and solved numericals.',
  keywords: ['education', 'AI tutor', 'DSA', 'Digital Image Processing', 'engineering', 'study platform'],
  authors: [{ name: 'StudySphere AI Team' }],
  openGraph: {
    title: 'StudySphere AI',
    description: 'AI-powered educational platform for engineering students',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
