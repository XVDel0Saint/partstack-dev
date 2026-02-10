"use client"

import api from "@/lib/api"
import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: any) => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isAdmin, setIsAdmin] = useState(false) 

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const endpoint = isSignUp ? "/register" : "/login"

      const response = await api.post(endpoint, {
        email,
        password,
        role: isAdmin ? "admin" : "user",
      })

      /**
       * SUPPORT BOTH COMMON BACKEND SHAPES
       */
      const payload = response.data

      const access_token =
      payload?.access_token ||
      payload?.data?.access_token ||
      payload?.data?.token

      const user =
      payload?.user ||
      payload?.data?.user

      if (!access_token || !user) {
        console.error("Unexpected login response:", payload)
        throw new Error("Invalid login response format")
      }


      localStorage.setItem("access_token", access_token)
      localStorage.setItem("user", JSON.stringify(user))

      setSuccess(
        isSignUp
          ? "Account created successfully!"
          : "Login successful!"
      )

      setTimeout(() => {
        onClose()
        setEmail("")
        setPassword("")
        setError("")
        setSuccess("")
        window.dispatchEvent(new Event("auth-changed"))
      }, 600)

    } catch (err: any) {
      console.error(err)

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-zoom-in">
        <div className="p-6 border-b border-[#EAEAEA] flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-[#132440]">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <button onClick={() => {
              setEmail("");
              setPassword("");
              setError("");
              onClose();
            }} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {success && (
            <div className="bg-[#3B9797]/10 border border-[#3B9797] text-[#3B9797] px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#132440] mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20 transition"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#132440] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20 transition"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-[#132440] mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20 transition"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          )}

          {isSignUp && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-[#EAEAEA]">
              <input
                type="checkbox"
                id="admin-check"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="w-4 h-4 text-[#BF092F] focus:ring-[#BF092F] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="admin-check" className="text-sm font-medium text-[#132440] cursor-pointer">
                Register as Administrator
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BF092F] text-white py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
          </button>


          {/* for future reference, disabled social login for now */}

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EAEAEA]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div> */}

          
          {/* <button
            type="button"
            className="w-full border border-[#EAEAEA] py-3 rounded-lg font-medium text-[#132440] hover:bg-[#F5F5F5] transition"
          >
            Continue with Google
          </button> */}
        </form>

        <div className="px-6 py-4 border-t border-[#EAEAEA] text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
                setSuccess("")
              }}
              className="text-[#BF092F] font-semibold hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
