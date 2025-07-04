"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import Image from "next/image"

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
      <div className="bg-[#658100] px-6 py-5 flex items-center shadow-lg">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-7 h-7 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">Pilih Tanaman</h1>
      </div>

      {/* Plant Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-5 mb-10">
          {plants.map((plant, index) => (
            <button
              key={index}
              className={`flex flex-col items-center p-5 rounded-2xl transition-all duration-200 ${
                index === 1
                  ? "bg-orange-100 border-3 border-orange-400 shadow-lg scale-105"
                  : "bg-gray-100 hover:bg-gray-200 border-2 border-gray-200"
              }`}
              onClick={handleSelectPlant}
            >
              <div
                className={`w-18 h-18 rounded-2xl flex items-center justify-center mb-3 ${
                  index === 1 ? "bg-orange-200" : "bg-gray-300"
                }`}
              >
                {index === 1 ? (
                  <Image src="/Wortel.svg" alt="Wortel" width={40} height={40} className="w-10 h-10" />
                ) : (
                  <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                )}
              </div>
              <span className="text-sm font-bold text-gray-800">{plant}</span>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSelectPlant}
          className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-4 rounded-2xl font-bold transition-colors shadow-lg text-lg"
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
