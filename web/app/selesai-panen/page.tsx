"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Home, MessageSquare, User } from "lucide-react"
import { Suspense } from "react"
import Image from "next/image"

interface Plant {
  id: string
  name: string
  progress: number
  plantDate: string
  harvestDate: string
  location: string
  type: string
}

interface HarvestData {
  kondisiTanaman: string
  tinggiTanaman: string
  totalPendapatan: string
  totalPengeluaran: string
}

function SelesaiPanenContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [harvestData, setHarvestData] = useState<HarvestData>({
    kondisiTanaman: "",
    tinggiTanaman: "",
    totalPendapatan: "",
    totalPengeluaran: "",
  })

  useEffect(() => {
    // Read params just once
    const plantId = searchParams.get("plantId")
    const kondisiTanaman = searchParams.get("kondisiTanaman") ?? ""
    const tinggiTanaman = searchParams.get("tinggiTanaman") ?? ""
    const totalPendapatan = searchParams.get("totalPendapatan") ?? ""
    const totalPengeluaran = searchParams.get("totalPengeluaran") ?? ""

    if (plantId) {
      const plants: Plant[] = JSON.parse(localStorage.getItem("plants") || "[]")
      const found = plants.find((p) => p.id === plantId)
      if (found) setPlant({ ...found, progress: 100 })
    }

    setHarvestData({
      kondisiTanaman,
      tinggiTanaman,
      totalPendapatan,
      totalPengeluaran,
    })
  }, []) // Only run once

  const handleTanamLagi = () => {
    router.push("/home")
  }

  const handleBack = () => {
    router.back()
  }

  if (!plant) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-gray-200">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Selesai Panen</h1>
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Selamat!</h2>
          <p className="text-gray-600">Anda telah berhasil menyelesaikan panen {plant.name}</p>
        </div>

        {/* Plant Summary */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
              <Image src="/Wortel.svg" alt="Wortel" width={40} height={40} className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{plant.name}</h3>
              <p className="text-sm text-gray-600">Tanggal tanam: {plant.plantDate}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full w-full"></div>
            </div>
          </div>
        </div>

        {/* Harvest Summary */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Panen</h3>

          <div className="space-y-3">
            {harvestData.kondisiTanaman && (
              <div className="flex justify-between">
                <span className="text-gray-600">Kondisi Tanaman:</span>
                <span className="font-medium text-gray-800">{harvestData.kondisiTanaman}</span>
              </div>
            )}

            {harvestData.tinggiTanaman && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tinggi Tanaman:</span>
                <span className="font-medium text-gray-800">{harvestData.tinggiTanaman} cm</span>
              </div>
            )}

            {harvestData.totalPendapatan && (
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pendapatan:</span>
                <span className="font-medium text-green-600">{harvestData.totalPendapatan}</span>
              </div>
            )}

            {harvestData.totalPengeluaran && (
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pengeluaran:</span>
                <span className="font-medium text-red-600">{harvestData.totalPengeluaran}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleTanamLagi}
            className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-4 rounded-2xl font-bold transition-colors text-lg"
          >
            Tanam Lagi
          </button>

          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-2xl font-medium transition-colors">
            Bagikan Hasil
          </button>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-2xl border-2 border-blue-200 p-4 mt-6">
          <h4 className="font-bold text-blue-800 mb-2">💡 Tips untuk Panen Selanjutnya</h4>
          <p className="text-sm text-blue-700">
            Berdasarkan hasil panen Anda, pertimbangkan untuk menggunakan pupuk organik pada penanaman selanjutnya untuk
            hasil yang lebih optimal.
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t-2 border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          <button onClick={() => router.push("/home")} className="flex flex-col items-center space-y-1">
            <Home className="w-7 h-7 text-gray-400" />
          </button>
          <button onClick={() => router.push("/chatbot")} className="flex flex-col items-center space-y-1">
            <Image src="/Logo Chatbot.svg" alt="Chatbot" width={28} height={28} className="w-7 h-7" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <MessageSquare className="w-7 h-7 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-7 h-7 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SelesaiPanenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelesaiPanenContent />
    </Suspense>
  )
}
