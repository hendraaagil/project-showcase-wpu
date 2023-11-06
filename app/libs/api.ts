import { apiUrl } from '@/app/constants/url'

export const fetchProjects = async () => {
  const data = await fetch(apiUrl)
  const dataJson = await data.json()

  return { projects: dataJson.data.reverse(), updatedAt: dataJson.fetched_at }
}
