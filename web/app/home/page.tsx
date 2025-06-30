"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Home, Calendar, MessageSquare, User, Droplets, Clock, Zap, X } from "lucide-react"

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
      <div className="bg-white px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-[#7CB342]">PaPi</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-6 pb-20">
        {/* Notifications */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifikasi</h2>
          <div className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{notif.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{notif.title}</p>
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
          className="w-full bg-gradient-to-r from-[#7CB342] to-[#FFA726] hover:from-[#689F38] hover:to-[#FF9800] text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Tanaman</span>
        </button>

        {/* Plants Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tanaman yang Ditanam</h2>

          {!showPlants ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-sm">
                Belum ada tanaman yang ditambahkan. Mulailah menanam dan pantau pertumbuhannya di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {plants.map((plant, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-600">
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{plant.name}</h3>
                        <span className="text-sm font-medium text-gray-600">{plant.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                        <div className="bg-[#7CB342] h-2 rounded-full" style={{ width: `${plant.progress}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>Tanggal tanam: {plant.plantDate}</p>
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
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t px-6 py-3">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1">
            <Home className="w-6 h-6 text-[#7CB342]" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Calendar className="w-6 h-6 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <MessageSquare className="w-6 h-6 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Rencana Tanam */}
              <button
                onClick={handlePlanningPlant}
                className="w-full p-4 bg-gray-100 rounded-xl text-left hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-4 bg-yellow-600 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">Rencana Tanam</h3>
                    <p className="text-xs text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                  </div>
                </div>
              </button>

              {/* Tanaman Aktif */}
              <button
                onClick={handleActivePlant}
                className="w-full p-4 bg-gray-100 rounded-xl text-left hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-600">
                      <path
                        fill="currentColor"
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">Tanaman Aktif</h3>
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
