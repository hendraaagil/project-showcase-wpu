'use client'

import type { Showcase } from '@/app/types/showcase'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const Season = ({ seasons }: { seasons: Showcase['seasons'] }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('season', term)
    } else {
      params.delete('season')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      name="season"
      id="season"
      className="w-full max-w-xs rounded bg-transparent p-2"
      defaultValue={searchParams.get('season')?.toString() ?? seasons[0].key}
      onChange={(e) => handleChange(e.target.value)}
    >
      {seasons.map((season) => (
        <option key={season.key} value={season.key}>
          {season.name}
        </option>
      ))}
    </select>
  )
}