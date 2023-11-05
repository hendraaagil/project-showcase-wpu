'use client'

import type { Project, ProjectPerSeason } from '@/app/types/showcase'

import Image from 'next/image'
import clsx from 'clsx'
import htmr from 'htmr'
import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Link,
} from '@/app/components/ui'
import { toKebabCase, toTitleCase } from '@/app/libs/format'
import { imageBaseUrl } from '@/app/constants/url'

const Project = ({
  position,
  project,
}: {
  position: number
  project: Project
}) => {
  const { image, link, message, username } = project
  const imageUrl = imageBaseUrl + image

  return (
    <li className="space-y-2">
      <h3 className="text-lg font-bold">
        {position}. {username} -{' '}
        <Link href={link} className="font-bold">
          {link}
        </Link>
      </h3>
      <Image
        src={imageUrl}
        alt={`Preview of ${username} project`}
        width={1280}
        height={720}
        className="rounded"
      />
      <p>
        {htmr(message, {
          transform: {
            a: ({ children, href }) => (
              <Link href={href as string}>{children}</Link>
            ),
            p: ({ children }) => <p className="my-2">{children}</p>,
          },
        })}
      </p>
    </li>
  )
}

export const Projects = ({
  projects: projectsProp,
}: {
  projects: ProjectPerSeason
}) => {
  const { dates } = projectsProp
  const [opened, setOpened] = useState('')

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setOpened(toTitleCase(hash.replace('#', '')))
    }
  }, [])

  const handleToggle = (date: string) => {
    if (date === opened) {
      setOpened('')
    } else {
      setOpened(date)
    }
  }

  return (
    <Accordion type="single" className="w-full" value={opened} collapsible>
      {dates.map(({ date, projects }) => (
        <AccordionItem value={date} key={date}>
          <a href={`#${toKebabCase(date)}`}>
            <AccordionTrigger
              onClick={() => handleToggle(date)}
              className={clsx('rounded-t px-4 py-2 hover:bg-gray-300', {
                'bg-gray-300': date === opened,
              })}
            >
              {date}
            </AccordionTrigger>
          </a>
          <AccordionContent className="rounded-b bg-gray-300 py-2">
            <ol className="space-y-4 px-6">
              {projects.map((project, index) => (
                <Project
                  position={index + 1}
                  project={project}
                  key={project.link}
                />
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
