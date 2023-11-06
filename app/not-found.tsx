import { Link } from '@/app/components/ui'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl font-bold">Oopss! Page Not Found</h2>
      <Link
        href="/"
        className="flex items-center space-x-2 rounded px-4 py-2 font-semibold no-underline transition-colors hover:bg-gray-300 hover:text-blue-700"
      >
        <Home className="h-5 w-5" />
        <p>Back to Home</p>
      </Link>
    </section>
  )
}
