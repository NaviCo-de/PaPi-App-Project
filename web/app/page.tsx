"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <Image src="/Logo Original.svg" alt="Logo Original" width={120} height={120} className="w-32 h-32" />
        </div>
      </div>
    </div>
  )
}
