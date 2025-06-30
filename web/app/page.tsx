"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RenderScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          {/* Logo placeholder - triangular design with waves */}
          <div className="w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              {/* Triangle outline */}
              <path d="M60 20 L100 80 L20 80 Z" fill="none" stroke="#7CB342" strokeWidth="3" />
              {/* Inner triangle */}
              <path d="M60 30 L85 70 L35 70 Z" fill="#8BC34A" />
              {/* Wave elements */}
              <path d="M35 65 Q45 60 55 65 T75 65" fill="none" stroke="white" strokeWidth="2" />
              <path d="M40 70 Q50 65 60 70 T80 70" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7CB342] mb-1">PaPi</h1>
          <p className="text-sm text-gray-600">Panen Pintar</p>
        </div>
      </div>
    </div>
  )
}
