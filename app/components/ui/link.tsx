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
    className={clsx('text-blue-700 hover:underline', className)}
  >
    {children}
  </a>
)
