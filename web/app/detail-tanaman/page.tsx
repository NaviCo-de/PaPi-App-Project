"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ChevronLeft, ChevronRight, Home, MessageSquare, User, ChevronDown } from "lucide-react"
import { Suspense } from "react"
import Image from "next/image"

interface Plant {
  id: string
  name: string
  progress: number
  plantDate: string
  harvestDate: string
  location: string
  luasLahan?: string
  jumlahTanaman?: string
  pupuk?: string
  waktuPenyiraman?: string
  provinsi?: string
  kecamatan?: string
  type: string
}

interface HarvestData {
  kondisiTanaman: string
  tinggiTanaman: string
  totalPendapatan: string
  totalPengeluaran: string
  pengalaman: string
}

function DetailTanamanContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plantId = searchParams.get("id")
  const [activeTab, setActiveTab] = useState("rekomendasi")
  const [plant, setPlant] = useState<Plant | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showInitialModal, setShowInitialModal] = useState(false)
  const [showFinalModal, setShowFinalModal] = useState(false)
  const [harvestData, setHarvestData] = useState<HarvestData>({
    kondisiTanaman: "",
    tinggiTanaman: "",
    totalPendapatan: "",
    totalPengeluaran: "",
    pengalaman: "",
  })

  useEffect(() => {
    if (plantId) {
      const plants = JSON.parse(localStorage.getItem("plants") || "[]")
      const foundPlant = plants.find((p: Plant) => p.id === plantId)
      setPlant(foundPlant || null)
    }
  }, [plantId])

  const handleBack = () => {
    router.back()
  }

  const handleSelesaiPanen = () => {
    setShowInitialModal(true)
  }

  const handleBelum = () => {
    setShowInitialModal(false)
  }

  const handleSudah = () => {
    setShowInitialModal(false)
    setShowFinalModal(true)
  }

  const handleLanjut = () => {
    setShowFinalModal(false)
    // Navigate to completion page with harvest data
    const queryParams = new URLSearchParams({
      plantId: plantId || "",
      ...harvestData,
    })
    router.push(`/selesai-panen?${queryParams.toString()}`)
  }

  const products = Array(6).fill({
    name: "Nama Barang",
    price: "Rp90.000",
  })

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Previous month's trailing days
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0)
    const prevMonthDays = prevMonth.getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${prevMonthDays - i}`}
          className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
        >
          {prevMonthDays - i}
        </div>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isHighlighted = [1, 7, 15, 21].includes(day)
      days.push(
        <div
          key={`current-${day}`}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full ${
            isHighlighted ? "bg-[#658100] text-white font-bold" : "text-gray-700"
          }`}
        >
          {day}
        </div>,
      )
    }

    // Next month's leading days
    const totalCells = 42 // 6 rows × 7 days
    const remainingCells = totalCells - days.length
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="w-8 h-8 flex items-center justify-center text-sm text-gray-400">
          {day}
        </div>,
      )
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
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
      </div>

      {/* Plant Info Header */}
      <div className="bg-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">{plant.name}</h1>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <Image src="/Wortel.svg" alt="Wortel" width={64} height={64} />
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1 mb-6">
          <p>Tanggal tanam: {plant.plantDate}</p>
          <p>Luas lahan: xx hektar</p>
          <p>Kuantitas: xx</p>
        </div>

        {/* Progress Section */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Hari ke: xx</span>
          </div>

          {/* Progress Bar with Pointer */}
          <div className="relative">
            <div className="w-full bg-white rounded-full h-6 border-2 border-orange-300">
              <div
                className="bg-[#658100] h-full rounded-full transition-all duration-300"
                style={{ width: `${plant.progress}%` }}
              ></div>
            </div>

            {/* Progress Pointer */}
            <div
              className="absolute top-0 transform -translate-x-1/2 -translate-y-2"
              style={{ left: `${plant.progress}%` }}
            >
              <div className="bg-[#658100] text-white px-2 py-1 rounded text-xs font-bold">{plant.progress}%</div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#658100] mx-auto"></div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4 mb-4">Perkiraan Panen: {plant.plantDate}</p>

          {/* Selesai Panen Button */}
          <button
            onClick={handleSelesaiPanen}
            className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium transition-colors"
          >
            Selesai Panen
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <div className="flex">
          <button
            onClick={() => setActiveTab("jadwal")}
            className={`flex-1 py-4 px-4 text-sm font-medium ${
              activeTab === "jadwal" ? "bg-[#FFA726] text-white" : "bg-orange-100 text-gray-700"
            }`}
          >
            Jadwal Penyiraman
          </button>
          <button
            onClick={() => setActiveTab("proyeksi")}
            className={`flex-1 py-4 px-4 text-sm font-medium ${
              activeTab === "proyeksi" ? "bg-[#FFA726] text-white" : "bg-orange-100 text-gray-700"
            }`}
          >
            Proyeksi Keuangan
          </button>
          <button
            onClick={() => setActiveTab("rekomendasi")}
            className={`flex-1 py-4 px-4 text-sm font-medium ${
              activeTab === "rekomendasi" ? "bg-[#FFA726] text-white" : "bg-orange-100 text-gray-700"
            }`}
          >
            Rekomendasi Produk
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 pb-24">
        {/* Rekomendasi Produk Tab */}
        {activeTab === "rekomendasi" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Rekomendasi Produk</h2>
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, index) => (
                <div key={`product-${index}`} className="bg-white rounded-2xl border-2 border-orange-300 p-4">
                  <div className="w-full h-32 bg-gray-300 rounded-lg mb-3"></div>
                  <h3 className="font-semibold text-gray-800 text-center mb-1">{product.name}</h3>
                  <p className="text-center text-gray-600 mb-3">{product.price}</p>
                  <button className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-2 rounded-lg font-medium transition-colors">
                    Beli
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jadwal Penyiraman Tab */}
        {activeTab === "jadwal" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Jadwal Penyiraman</h2>

            {/* Schedule Items */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold text-gray-800">Penyiraman Terakhir</h3>
              <div className="bg-yellow-100 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700">Hari ini</span>
                <span className="text-gray-700">00.00 WIB</span>
              </div>

              <h3 className="font-semibold text-gray-800 mt-6">Penyiraman Selanjutnya</h3>
              {["Hari ini", "Hari ini", "Hari ini"].map((label, index) => (
                <div
                  key={`schedule-${index}`}
                  className="bg-yellow-100 rounded-lg p-4 flex justify-between items-center"
                >
                  <span className="text-gray-700">{label}</span>
                  <span className="text-gray-700">00.00 WIB</span>
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div className="bg-gray-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h3 className="font-semibold text-gray-800">Juli 2025</h3>
                <button onClick={() => navigateMonth("next")}>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div key={`day-header-${index}`} className="text-center text-sm font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
            </div>

            {/* Schedule Details */}
            <div className="space-y-3 mb-6">
              <div className="bg-yellow-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800">7 Juli</p>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800">15 Juli</p>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-3">
                <p className="font-semibold text-gray-800">21 Juli</p>
                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>

            <button className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium mb-6">
              Ekspor ke Kalender
            </button>

            {/* Chatbot Prompt */}
            <div className="bg-white rounded-2xl border-2 border-gray-300 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Punya Pertanyaan?</h3>
                  <p className="text-sm text-gray-600">Yuk tanya ke chatbot kami!</p>
                </div>
                <div className="w-12 h-12 bg-[#658100] rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#658100] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#658100] rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/chatbot")}
                className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-2 rounded-lg font-medium mt-3"
              >
                Chatbot
              </button>
            </div>
          </div>
        )}

        {/* Proyeksi Keuangan Tab */}
        {activeTab === "proyeksi" && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Proyeksi Keuangan</h2>

            {/* Total Section */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Total</h3>
              <div className="space-y-3">
                <div className="bg-yellow-100 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Perkiraan Pengeluaran</span>
                    <span className="text-sm text-gray-800">Rpxxx.xxx.xxx</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Perkiraan Pendapatan</span>
                    <span className="text-sm text-gray-800">Rpxxx.xxx.xxx</span>
                  </div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 flex justify-between">
                  <span className="text-sm text-gray-600">Potensi Laba</span>
                  <span className="text-sm text-gray-800">Rpxxx.xxx.xxx</span>
                </div>
              </div>

              <button className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium mt-4">
                Ekspor Excel
              </button>
            </div>

            {/* Rincian Pendapatan */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Rincian Pendapatan</h3>
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`income-${index}`} className="bg-gray-100 rounded-lg p-3 flex justify-between">
                      <span className="text-gray-700">Penjualan</span>
                      <span className="text-gray-700">Rpxxx.xxx.xxx</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Rincian Pengeluaran */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Rincian Pengeluaran</h3>
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`expense-${index}`} className="bg-gray-100 rounded-lg p-3 flex justify-between">
                      <span className="text-gray-700">Penjualan</span>
                      <span className="text-gray-700">Rpxxx.xxx.xxx</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Product Recommendations */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={`finance-product-${index}`} className="bg-white rounded-xl border-2 border-orange-300 p-3">
                    <div className="w-full h-20 bg-gray-300 rounded-lg mb-2"></div>
                    <h3 className="font-semibold text-gray-800 text-center text-xs mb-1">Nama Barang</h3>
                    <p className="text-center text-gray-600 text-xs mb-2">Rp90.000</p>
                    <button className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-1 rounded text-xs font-medium">
                      Beli
                    </button>
                  </div>
                ))}
            </div>

            {/* Chatbot Prompt */}
            <div className="bg-white rounded-2xl border-2 border-gray-300 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Punya Pertanyaan?</h3>
                  <p className="text-sm text-gray-600">Yuk tanya ke chatbot kami!</p>
                </div>
                <div className="w-12 h-12 bg-[#658100] rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#658100] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#658100] rounded-full ml-1"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/chatbot")}
                className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-2 rounded-lg font-medium mt-3"
              >
                Chatbot
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Initial Modal - Confirmation */}
      {showInitialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Apakah Anda sudah memanen tanaman ini?</h2>
            <p className="text-sm text-gray-600 mb-8 text-center">Pastikan Anda sudah benar-benar memanen hasilnya</p>

            <div className="flex space-x-4">
              <button
                onClick={handleBelum}
                className="flex-1 bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Belum
              </button>
              <button
                onClick={handleSudah}
                className="flex-1 bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium transition-colors"
              >
                Sudah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Modal - Form */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Jawablah pertanyaan di bawah ini</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi Tanaman</label>
                <div className="relative">
                  <select
                    value={harvestData.kondisiTanaman}
                    onChange={(e) => setHarvestData({ ...harvestData, kondisiTanaman: e.target.value })}
                    className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Kondisi Tanaman</option>
                    <option value="sehat">Sehat</option>
                    <option value="cukup-sehat">Cukup Sehat</option>
                    <option value="kurang-sehat">Kurang Sehat</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tinggi Tanaman</label>
                <input
                  type="text"
                  placeholder="Tinggi Tanaman (cm)"
                  value={harvestData.tinggiTanaman}
                  onChange={(e) => setHarvestData({ ...harvestData, tinggiTanaman: e.target.value })}
                  className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Pendapatan</label>
                <input
                  type="text"
                  placeholder="Total Pendapatan"
                  value={harvestData.totalPendapatan}
                  onChange={(e) => setHarvestData({ ...harvestData, totalPendapatan: e.target.value })}
                  className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Pengeluaran</label>
                <input
                  type="text"
                  placeholder="Total Pengeluaran"
                  value={harvestData.totalPengeluaran}
                  onChange={(e) => setHarvestData({ ...harvestData, totalPengeluaran: e.target.value })}
                  className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
                />
              </div>

              <button
                onClick={handleLanjut}
                className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium mt-6 transition-colors"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}

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

export default function DetailTanamanPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailTanamanContent />
    </Suspense>
  )
}
