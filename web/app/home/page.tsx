"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Home, Calendar, MessageSquare, User, Droplets, Clock, Zap, X } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()
  const [showPlants, setShowPlants] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const notifications = [
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      title: "Saatnya menyiram tanaman Bayam",
      subtitle: "Lorem Ipsum Dolor Sit Amet",
      time: "20 November 2020, 13:40 WIB",
    },
    {
      icon: <Clock className="w-5 h-5 text-gray-500" />,
      title: "Panen tanaman Bayam 1 hari lagi",
      subtitle: "Lorem Ipsum Dolor Sit Amet",
      time: "20 November 2020, 13:40 WIB",
    },
    {
      icon: <Zap className="w-5 h-5 text-green-500" />,
      title: "Saatnya memupuk tanaman Bayam",
      subtitle: "Lorem Ipsum Dolor Sit Amet",
      time: "20 November 2020, 13:40 WIB",
    },
  ]

  const plants = [
    {
      name: "Wortel",
      progress: 50,
      plantDate: "12/12/2025",
      harvestDate: "Lusa Libur, xx Pebruari",
      location: "Kebun Kita",
    },
    {
      name: "Wortel",
      progress: 50,
      plantDate: "12/12/2025",
      harvestDate: "Lusa Libur, xx Pebruari",
      location: "Kebun Kita",
    },
  ]

  const handleAddPlant = () => {
    setShowModal(true)
  }

  const handlePlanningPlant = () => {
    setShowModal(false)
    router.push("/pilih-tanaman?type=rencana")
  }

  const handleActivePlant = () => {
    setShowModal(false)
    router.push("/pilih-tanaman?type=aktif")
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold text-[#658100]">PaPi</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-8 pb-24">
        {/* Notifications */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notifikasi</h2>
          <div className="p-5 border-2 border-orange-300 bg-orange-50 rounded-2xl shadow-sm">
            <div className="space-y-4">
              {notifications.map((notif, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="mt-1">{notif.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-600">{notif.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Plant Button */}
        <button
          onClick={handleAddPlant}
          className="w-full bg-gradient-to-r from-[#658100] to-[#FFA726] hover:from-[#689F38] hover:to-[#FF9800] text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 transition-colors shadow-lg text-lg"
        >
          <Plus className="w-6 h-6" />
          <span>Tambah Tanaman</span>
        </button>

        {/* Plants Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tanaman yang Ditanam</h2>

          {!showPlants ? (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-gray-200">
              <div className="mb-6">
                <Image src="/Rencana Tanam.svg" alt="No Plants" width={80} height={40} className="mx-auto opacity-60" />
              </div>
              <p className="text-gray-600 text-sm font-medium px-4">
                Belum ada tanaman yang ditambahkan. Mulailah menanam dan pantau pertumbuhannya di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {plants.map((plant, index) => (
                <div key={index} className="p-5 bg-white rounded-2xl border-2 border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Image src="/Tanaman Aktif.svg" alt="Tanaman Aktif" width={32} height={32} className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-800">{plant.name}</h3>
                        <span className="text-sm font-bold text-gray-600">{plant.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3 mb-3">
                        <div className="bg-[#658100] h-3 rounded-full" style={{ width: `${plant.progress}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>
                          <span className="font-semibold">Tanggal tanam:</span> {plant.plantDate}
                        </p>
                        <p>{plant.harvestDate}</p>
                        <p>{plant.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t-2 border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1">
            <Home className="w-7 h-7 text-[#658100]" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Calendar className="w-7 h-7 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <MessageSquare className="w-7 h-7 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-7 h-7 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex justify-end mb-6">
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Rencana Tanam */}
              <button
                onClick={handlePlanningPlant}
                className="w-full p-6 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors border-2 border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-12 flex items-center justify-center">
                    <Image
                      src="/Rencana Tanam.svg"
                      alt="Rencana Tanam"
                      width={80}
                      height={40}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Rencana Tanam</h3>
                    <p className="text-xs text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </div>
                </div>
              </button>

              {/* Tanaman Aktif */}
              <button
                onClick={handleActivePlant}
                className="w-full p-6 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors border-2 border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-12 flex items-center justify-center">
                    <Image
                      src="/Tanaman Aktif.svg"
                      alt="Tanaman Aktif"
                      width={80}
                      height={60}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg">Tanaman Aktif</h3>
                    <p className="text-xs text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
