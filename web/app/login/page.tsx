"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Simple navigation to home for demo
    router.push("/home")
  }

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header with logo */}
      <div className="bg-[#7CB342] px-6 py-8 rounded-b-3xl">
        <div className="flex flex-col items-center text-white">
          <div className="w-20 h-20 mb-4">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <path d="M60 20 L100 80 L20 80 Z" fill="none" stroke="white" strokeWidth="3" />
              <path d="M60 30 L85 70 L35 70 Z" fill="white" fillOpacity="0.3" />
              <path d="M35 65 Q45 60 55 65 T75 65" fill="none" stroke="white" strokeWidth="2" />
              <path d="M40 70 Q50 65 60 70 T80 70" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">PaPi</h1>
          <p className="text-sm opacity-90">Panen Pintar</p>
        </div>
      </div>

      {/* Form section */}
      <div className="px-6 py-8">
        <h2 className="text-lg font-semibold text-center mb-8">Selamat Datang, Sahabat Pintar!</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent"
            />
          </div>

          <div className="text-right">
            <button className="text-sm text-gray-500 hover:text-gray-700">Forgot Password?</button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#7CB342] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium transition-colors"
          >
            Log In
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">atau</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue With Google
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <button onClick={handleRegister} className="text-[#7CB342] font-medium hover:underline">
              Buat Akun
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
