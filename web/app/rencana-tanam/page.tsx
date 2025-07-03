"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronDown } from "lucide-react"

export default function RencanaTanamPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    luasLahan: "",
    jumlahTanaman: "",
    provinsi: "",
    kota: "",
    kecamatan: "",
  })

  const handleBack = () => {
    router.back()
  }

  const handleSave = () => {
    // Save the plant planning data
    console.log("Saving rencana tanam:", formData)
    // Navigate back to home and show the new plant
    router.push("/home")
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-[#658100] px-6 py-4 flex items-center">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">Rencana Tanam</h1>
      </div>

      {/* Plant Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-orange-200 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-600">
              <path
                fill="currentColor"
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Wortel</h2>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Luas Lahan</label>
          <input
            type="text"
            placeholder="Luas Lahan"
            value={formData.luasLahan}
            onChange={(e) => setFormData({ ...formData, luasLahan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tanaman yang Ingin Ditanamkan</label>
          <input
            type="text"
            placeholder="Jumlah tanaman"
            value={formData.jumlahTanaman}
            onChange={(e) => setFormData({ ...formData, jumlahTanaman: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Lokasi</label>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Provinsi</label>
              <div className="relative">
                <select
                  value={formData.provinsi}
                  onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Pilih Provinsi</option>
                  <option value="jawa-barat">Jawa Barat</option>
                  <option value="jawa-tengah">Jawa Tengah</option>
                  <option value="jawa-timur">Jawa Timur</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Kota/Kabupaten</label>
              <div className="relative">
                <select
                  value={formData.kota}
                  onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Pilih Kota/Kabupaten</option>
                  <option value="bandung">Bandung</option>
                  <option value="bogor">Bogor</option>
                  <option value="bekasi">Bekasi</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Kecamatan</label>
              <div className="relative">
                <select
                  value={formData.kecamatan}
                  onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Pilih Kecamatan</option>
                  <option value="cicendo">Cicendo</option>
                  <option value="coblong">Coblong</option>
                  <option value="sukasari">Sukasari</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium mt-8 transition-colors"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}
