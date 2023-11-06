import type { Metadata } from 'next'
import './globals.css'

import clsx from 'clsx'
import { plusJakartaSans } from '@/app/libs/fonts'
import { Footer } from '@/app/components'

export const metadata: Metadata = {
  metadataBase: new URL('https://project-showcase-wpu.vercel.app'),
  title: 'Project Showcase WPU',
  description: `List of projects in WPU's showcase`,
  openGraph: {
    images: { url: '/og-image.png', alt: 'Preview of Project Showcase WPU' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(plusJakartaSans.className, 'bg-gray-200')}>
        <main className="mx-auto flex max-w-5xl flex-col items-center px-1 pb-4 sm:px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
