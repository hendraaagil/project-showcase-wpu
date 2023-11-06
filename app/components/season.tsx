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
      aria-label="Season"
      className="w-full max-w-xs cursor-pointer rounded bg-transparent p-2 transition-all hover:bg-gray-300"
      defaultValue={searchParams.get('season')?.toString() ?? seasons[0].key}
      onChange={(e) => handleChange(e.target.value)}
    >
      {seasons.map((season) => (
        <option key={season.key} value={season.key} className="bg-gray-300">
          {season.name}
        </option>
      ))}
    </select>
  )
}
