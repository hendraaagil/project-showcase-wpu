import type { ProjectPerSeason } from '@/app/types/showcase'

import { ChevronRight } from 'lucide-react'
import { Link } from '@/app/components/ui'
import { toKebabCase } from '@/app/libs/format'

export const Dates = ({ dates }: { dates: ProjectPerSeason['dates'] }) => (
  <ul className="w-full space-y-2">
    {dates.map(({ date }) => (
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
