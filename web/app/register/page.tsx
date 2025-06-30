"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = () => {
    router.push("/home")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header with logo */}
      <div className="bg-[#8BC34A] px-6 py-8 rounded-b-3xl">
        <div className="flex flex-col items-center text-white">
          <div className="w-24 h-24 mb-4">
            <Image src="/Logo White.svg" alt="Logo White" width={96} height={96} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold text-center mb-8 text-gray-800">Gabung Jadi Sahabat Pintar!</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-[#658100] hover:bg-[#689F38] text-white py-4 rounded-xl font-bold mt-8 transition-colors text-lg"
          >
            Daftar
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-700">
            Sudah punya akun?{" "}
            <button onClick={handleLogin} className="text-[#658100] font-bold hover:underline">
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
