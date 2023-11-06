import type { Project, ProjectPerDate } from '@/app/types/showcase'

import htmr from 'htmr'
import Image from 'next/image'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Link,
} from '@/app/components/ui'
import { Back } from '@/app/components'
import { imageBaseUrl } from '@/app/constants/url'
import { fetchProjects } from '@/app/libs/api'
import { toKebabCase } from '@/app/libs/format'

export async function generateStaticParams() {
  const { projects } = await fetchProjects()
  const dates: string[] = []

  projects.forEach((project: { dates: { date: string }[] }) => {
    project.dates.forEach((item: { date: string }) => {
      dates.push(toKebabCase(item.date))
    })
  })

  return dates
}

const getProject = async (date: string): Promise<ProjectPerDate> => {
  const { projects } = await fetchProjects()
  const project = projects
    .find((project: { dates: { date: string }[] }) =>
      project.dates.find(
        (item: { date: string }) => toKebabCase(item.date) === date,
      ),
    )
    .dates.find((item: { date: string }) => toKebabCase(item.date) === date)

  return project
}

const Project = ({ project }: { project: Project }) => {
  const { image, link, message, username } = project
  const imageUrl = imageBaseUrl + image

  return (
    <li className="space-y-2">
      <Link href={link} isExternal>
        <h3 className="text-lg font-semibold">{link}</h3>
      </Link>
      <Image
        src={imageUrl}
        alt={`Preview of ${username} project`}
        width={1280}
        height={720}
        className="rounded"
      />
      {htmr(message, {
        transform: {
          a: ({ children, href }) => (
            <Link href={href as string} isExternal>
              {children}
            </Link>
          ),
          ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
          ol: ({ children }) => (
            <ul className="list-decimal pl-4">{children}</ul>
          ),
        },
      })}
    </li>
  )
}

export default async function Page({ params }: { params: { date: string } }) {
  const { date, projects } = await getProject(params.date)

  return (
    <section className="flex min-h-screen w-full flex-col justify-center pt-8">
      <Back />
      <h2 className="my-8 px-4 text-3xl font-bold">Showcase {date}</h2>
      <Accordion type="single" className="w-full space-y-2" collapsible>
        {projects.map((project, index) => {
          const position = index + 1
          const name = `${position}. ${project.username}`

          return (
            <AccordionItem value={project.link} key={project.link}>
              <AccordionTrigger className="rounded-t px-4 py-2 hover:bg-gray-300 [&[data-state=open]]:bg-gray-300">
                {name}
              </AccordionTrigger>
              <AccordionContent className="rounded-b bg-gray-300 py-2">
                <ol className="space-y-4 px-2 sm:px-4">
                  <Project project={project} />
                </ol>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}
