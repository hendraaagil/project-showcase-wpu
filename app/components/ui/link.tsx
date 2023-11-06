import clsx from 'clsx'
import NextLink from 'next/link'
import React from 'react'

export const Link = ({
  children,
  className,
  href,
  isExternal,
}: {
  children: React.ReactNode
  className?: string
  href: string
  isExternal?: boolean
}) => {
  const classNameStr = clsx(
    'font-medium underline hover:text-blue-700',
    className,
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNameStr}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} className={classNameStr}>
      {children}
    </NextLink>
  )
}
