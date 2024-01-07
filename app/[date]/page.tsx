import type { Project, ProjectPerDate } from '@/app/types/showcase'

import htmr from 'htmr'
import Image from 'next/image'
import { notFound } from 'next/navigation'

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

  return dates.map((date) => ({ date }))
}

const getProject = async (date: string): Promise<ProjectPerDate> => {
  const { projects } = await fetchProjects()
  const project = projects
    .find((project: { dates: { date: string }[] }) =>
      project.dates.find(
        (item: { date: string }) => toKebabCase(item.date) === date,
      ),
    )
    ?.dates.find((item: { date: string }) => toKebabCase(item.date) === date)

  if (!project) {
    notFound()
  }

  return project
}

const Project = ({ project }: { project: Project }) => {
  const { image, link, message, username } = project

  const imageUrl = imageBaseUrl + image
  const regexEmoji = /&lt;:\w*:\d*&gt;/g

  /**
   * TODO: Need to remove duplicate same emoji (save unique only)
   */
  const emojis = message.match(regexEmoji)

  let messageWithEmoji = message
  if (emojis) {
    emojis.forEach((emoji) => {
      const [emojiName, emojiId] = emoji
        .replace('&lt;:', '')
        .replace('&gt;', '')
        .split(':')

      /**
       * TODO: use `replaceAll()` here when `emojis` already store unique emoji only
       */
      messageWithEmoji = messageWithEmoji.replace(
        emoji,
        `<img src="https://cdn.discordapp.com/emojis/${emojiId}.png" alt="${emojiName}'s emoji" class="emoji" />`,
      )
    })
  }

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
      {htmr(messageWithEmoji, {
        transform: {
          a: ({ children, href }) => (
            <Link href={href as string} isExternal>
              {children}
            </Link>
          ),
          ul: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
          ol: ({ children }) => (
            <ul className="list-decimal pl-6">{children}</ul>
          ),
          img: ({ className, src, alt, ...props }) => {
            if (className?.includes('emoji')) {
              return (
                <Image
                  src={src as string}
                  alt={alt as string}
                  width={22}
                  height={22}
                  className="m-1"
                />
              )
            }

            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt} className={className} {...props} />
          },
          p: ({ children }) => (
            <p className="flex flex-wrap items-center">{children}</p>
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
      <h2 className="my-8 px-2 text-3xl font-bold sm:px-4">Showcase {date}</h2>
      <Accordion type="single" className="w-full space-y-2" collapsible>
        {projects.map((project, index) => {
          const position = index + 1
          const name = `${position}. ${project.username}`

          return (
            <AccordionItem value={project.link} key={project.link}>
              <AccordionTrigger className="rounded-t px-2 py-2 hover:bg-gray-300 sm:px-4 [&[data-state=open]]:bg-gray-300">
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
