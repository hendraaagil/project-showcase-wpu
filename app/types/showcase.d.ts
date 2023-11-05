export type Season = {
  key: string
  name: string
}

export type Project = {
  link: string
  username: string
  message: string
  image: string
}

export type ProjectPerDate = {
  date: string
  projects: Project[]
}

export type ProjectPerSeason = {
  season: string
  dates: ProjectPerDate[]
}

export type Showcase = {
  updatedAt: string
  seasons: Season[]
  projectPerSeason: ProjectPerSeason
}
