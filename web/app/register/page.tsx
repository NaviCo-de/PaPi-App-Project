"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister =async () => {
      // Simple navigation to home for demo
      try {
      const res = await axios.post('http://localhost:3000/register', {
        username,
        password,
        email,
      });
      console.log('Registration success:');
      alert('Registration successful');
      router.push("/login")
    } catch (err) {
      console.log(err)
      alert('Registration failed');
    }
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header with logo */}
      <div className="bg-[#8BC34A] px-6 py-8 rounded-b-3xl">
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
        <h2 className="text-lg font-semibold text-center mb-8">Gabung Jadi Sahabat Pintar!</h2>

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-[#7CB342] hover:bg-[#689F38] text-white py-3 rounded-lg font-medium mt-6 transition-colors"
          >
            Log In
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <button onClick={handleLogin} className="text-[#7CB342] font-medium hover:underline">
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
