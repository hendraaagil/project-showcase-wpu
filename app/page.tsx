import type { Showcase } from '@/app/types/showcase'

import { TimerReset } from 'lucide-react'
import { apiUrl } from '@/app/constants/url'
import { toLocalDate, toTitleCase } from '@/app/libs/format'
import { Projects, Season } from '@/app/components'

const getShowcase = async (season?: string): Promise<Showcase> => {
  const data = await fetch(apiUrl)
  const dataJson = await data.json()

  const projects = dataJson.data.reverse()
  const seasons = projects.map((project: { season: string }) => ({
    key: project.season,
    name: toTitleCase(project.season),
  }))
  const seasonQuery = season ?? seasons[0].key
  const projectPerSeason = projects.find(
    (project: { season: string }) => project.season === seasonQuery,
  )

  return {
    updatedAt: dataJson.fetched_at,
    seasons,
    projectPerSeason,
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { updatedAt, seasons, projectPerSeason } = await getShowcase(
    searchParams['season']?.toString(),
  )

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center space-y-8 px-1 py-12 sm:px-4">
      <h1 className="text-center text-4xl font-bold">Project Showcase WPU</h1>
      <Season seasons={seasons} />
      <div className="flex items-center text-sm">
        <TimerReset className="mr-2 h-4 w-4" />
        <p>Terakhir Diupdate: {toLocalDate(new Date(updatedAt))}</p>
      </div>
      <hr className="w-full border-gray-400" />
      <Projects projects={projectPerSeason} />
    </main>
  )
}
