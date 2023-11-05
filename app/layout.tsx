import type { Metadata } from 'next'
import './globals.css'

import { plusJakartaSans } from '@/app/libs/fonts'

export const metadata: Metadata = {
  title: 'Project Showcase WPU',
  description: `List of projects in WPU's showcase`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  )
}
