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
} from '@/app/components/ui'
import { toKebabCase, toTitleCase } from '@/app/libs/format'
import { imageBaseUrl } from '@/app/constants/url'

const Project = ({ project }: { project: Project }) => {
  const { image, link, message, username } = project
  const imageUrl = imageBaseUrl + image

  return (
    <li className="space-y-2">
      <a href={link}>{link}</a>
      <Image
        src={imageUrl}
        alt={`Preview of ${username} project`}
        width={1280}
        height={720}
        className="rounded"
      />
      <p>{htmr(message)}</p>
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
            <ol className="list-decimal space-y-4 px-6">
              {projects.map((project) => (
                <Project project={project} key={project.link} />
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}