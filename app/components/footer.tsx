import { Github } from 'lucide-react'
import { Link } from '@/app/components/ui'

export const Footer = () => (
  <footer className="mx-auto max-w-5xl px-2 pb-4 text-sm font-medium sm:px-6">
    <hr className="mb-4 w-full border-gray-400" />
    <div className="flex justify-between">
      <p className="flex items-center">
        <Github className="mr-2 h-4 w-4" />
        <Link
          href="https://github.com/hendraaagil/project-showcase-wpu"
          isExternal
        >
          Source Code
        </Link>
      </p>
      <p>
        Created by{' '}
        <Link href="https://hendraaagil.dev" isExternal>
          Hendra Agil
        </Link>
      </p>
    </div>
  </footer>
)
