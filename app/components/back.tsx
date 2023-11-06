'use client'

import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Back = () => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center space-x-2 rounded px-4 py-2 font-semibold no-underline transition-colors hover:bg-gray-300 hover:text-blue-700"
    >
      <Home className="h-5 w-5" />
      <p>Back to Home</p>
    </button>
  )
}
