"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"

interface NavbarProps {
  onLoginClick: () => void
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  
    useEffect(() => {
    const loadUser = () => {
  try {
    const stored = localStorage.getItem("user")

    if (!stored || stored === "undefined") {
      setUser(null)
      return
    }

    setUser(JSON.parse(stored))
  } catch (err) {
    console.error("Invalid user data in localStorage", err)
    localStorage.removeItem("user")
    setUser(null)
  }
}
  loadUser()
  window.addEventListener("auth-changed", loadUser)

  return () => {
    window.removeEventListener("auth-changed", loadUser)
  }
}, [])

const [cartCount, setCartCount] = useState(0)

useEffect(() => {
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    // Sum up the quantity of all items
    const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)
    setCartCount(count)
  }

  updateCartCount()
  window.addEventListener("cart-updated", updateCartCount)
  return () => window.removeEventListener("cart-updated", updateCartCount)
}, [])

  return (
    
    <nav className="bg-white border-b border-[#EAEAEA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#BF092F] rounded flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-serif font-bold text-[#132440] hidden sm:inline">PartStack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-[#132440] hover:text-[#BF092F] transition">
              Products
            </Link>
            <Link href="/features" className="text-[#132440] hover:text-[#BF092F] transition">
              Features
            </Link>
            <Link href="/about" className="text-[#132440] hover:text-[#BF092F] transition">
              About
            </Link>
            <Link href="/contact" className="text-[#132440] hover:text-[#BF092F] transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Button */}
            <Link href="/cart" className="relative p-2 text-[#132440] hover:text-[#BF092F] transition mr-2">
              <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#BF092F] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
                  {cartCount}
                </span>
                )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#BF092F] text-white flex items-center justify-center font-semibold">
                  {user.email?.[0]?.toUpperCase()}
                </div>
                <span className="text-[#132440] font-medium">
                  {user.email}
                </span>
                <button
                  onClick={() => {
                    localStorage.clear()
                    setUser(null)
                    window.dispatchEvent(new Event("auth-changed"))
                  }}
                  className="text-sm text-[#BF092F] font-semibold hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-[#132440] hover:text-[#BF092F] font-medium transition"
                >
                  Log In
                </button>
                <button
                  onClick={onLoginClick}
                  className="bg-[#BF092F] text-white px-6 py-2 rounded-lg hover:bg-[#9a062a] transition shadow-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#132440]" /> : <Menu className="w-6 h-6 text-[#132440]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/products" className="block text-[#132440] hover:text-[#BF092F]">
              Products
            </Link>
            <Link href="/features" className="block text-[#132440] hover:text-[#BF092F]">
              Features
            </Link>
            <Link href="/about" className="block text-[#132440] hover:text-[#BF092F]">
              About
            </Link>
            <Link href="/contact" className="block text-[#132440] hover:text-[#BF092F]">
              Contact
            </Link>
            <button
              onClick={onLoginClick}
              className="w-full bg-[#BF092F] text-white py-2 rounded-lg hover:bg-[#9a062a] transition"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
