import clsx from 'clsx'
import React from 'react'

export const Link = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode
  className?: string
  href: string
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={clsx('font-medium underline hover:text-blue-700', className)}
  >
    {children}
  </a>
)
