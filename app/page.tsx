import type { Showcase } from '@/app/types/showcase'

import { apiUrl } from '@/app/constants/url'
import { toTitleCase } from '@/app/libs/format'
import { Hero, Projects } from '@/app/components'

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
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center px-1 pb-12 sm:px-4">
      <Hero seasons={seasons} updatedAt={updatedAt} />
      <hr className="mb-4 w-full border-gray-400" />
      <Projects projects={projectPerSeason} />
    </main>
  )
}
