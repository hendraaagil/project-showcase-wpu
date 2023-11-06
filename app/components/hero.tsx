import type { Showcase } from '@/app/types/showcase'

import { TimerReset } from 'lucide-react'
import { Season } from '@/app/components'
import { toLocalDate } from '@/app/libs/format'

export const Hero = ({
  seasons,
  updatedAt,
}: {
  seasons: Showcase['seasons']
  updatedAt: string
}) => (
  <section className="flex min-h-screen flex-col items-center justify-center space-y-8 px-2">
    <h1 className="text-center text-4xl font-bold">Project Showcase WPU</h1>
    <Season seasons={seasons} />
    <div className="flex flex-col items-center text-sm sm:flex-row">
      <TimerReset className="mb-2 mr-0 h-4 w-4 sm:mb-0 sm:mr-2" />
      <p className="text-center">
        Terakhir Diupdate: {toLocalDate(new Date(updatedAt))}
      </p>
    </div>
    <div className="absolute -z-10 mx-auto h-full w-full bg-semicolon bg-cover bg-no-repeat opacity-60 blur-md" />
  </section>
)
