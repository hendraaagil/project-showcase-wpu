'use client'

import { ArrowDown10, ArrowUp01, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Link } from '@/app/components/ui'
import { toKebabCase } from '@/app/libs/format'

export const Dates = ({ dates: datesProp }: { dates: string[] }) => {
  const [dates, setDates] = useState(datesProp)
  const [sort, setSort] = useState<'desc' | 'asc'>('desc')

  useEffect(() => {
    setDates(datesProp)
  }, [datesProp])

  const handleSort = () => {
    setSort((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    setDates((prev) => [...prev].reverse())
  }

  return (
    <ul className="w-full space-y-2">
      <li
        className="flex cursor-pointer justify-between rounded px-2 py-2 text-lg font-bold transition-colors hover:bg-gray-300 sm:px-4"
        onClick={handleSort}
      >
        <p>Tanggal</p>
        {sort === 'asc' ? (
          <ArrowUp01 className="h-6 w-6" />
        ) : (
          <ArrowDown10 className="h-6 w-6" />
        )}
      </li>
      {dates.map((date) => (
        <li key={date} className="w-full">
          <Link
            href={`/${toKebabCase(date)}`}
            className="flex w-full justify-between rounded px-2 py-2 no-underline transition-colors hover:bg-gray-300 sm:px-4"
          >
            <p>{date}</p>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
