"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"

function PilihTanamanContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get("type") // 'rencana' or 'aktif'

  const handleBack = () => {
    router.back()
  }

  const handleSelectPlant = () => {
    if (type === "rencana") {
      router.push("/rencana-tanam")
    } else {
      router.push("/tanaman-aktif")
    }
  }

  const plants = Array(15).fill("Wortel")

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-[#7CB342] px-6 py-4 flex items-center">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">Pilih Tanaman</h1>
      </div>

      {/* Plant Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {plants.map((plant, index) => (
            <button
              key={index}
              className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                index === 1 ? "bg-orange-100 border-2 border-orange-300" : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={handleSelectPlant}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  index === 1 ? "bg-orange-200" : "bg-gray-300"
                }`}
              >
                {index === 1 && (
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-600">
                    <path
                      fill="currentColor"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium text-gray-800">{plant}</span>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSelectPlant}
          className="w-full bg-[#7CB342] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium transition-colors"
        >
          Lanjut
        </button>
      </div>
    </div>
  )
}

export default function PilihTanamanPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PilihTanamanContent />
    </Suspense>
  )
}
