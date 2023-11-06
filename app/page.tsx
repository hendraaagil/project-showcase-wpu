import type { Showcase } from '@/app/types/showcase'

import { Dates, Hero } from '@/app/components'
import { fetchProjects } from '@/app/libs/api'
import { toTitleCase } from '@/app/libs/format'

const getShowcase = async (season?: string): Promise<Showcase> => {
  const { projects, updatedAt } = await fetchProjects()

  const seasons = projects.map((project: { season: string }) => ({
    key: project.season,
    name: toTitleCase(project.season),
  }))
  const seasonQuery = season ?? seasons[0].key
  const projectPerSeason = projects.find(
    (project: { season: string }) => project.season === seasonQuery,
  )

  return { updatedAt, seasons, projectPerSeason }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { updatedAt, seasons, projectPerSeason } = await getShowcase(
    searchParams['season']?.toString(),
  )
  const dates = projectPerSeason.dates.map(({ date }) => date).reverse()

  return (
    <>
      <Hero seasons={seasons} updatedAt={updatedAt} />
      <hr className="mb-4 w-full border-gray-400" />
      <Dates dates={dates} />
    </>
  )
}
