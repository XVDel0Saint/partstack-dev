"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Loader2, Lock } from "lucide-react"
import api from "@/lib/api"
import { LoginModal } from "./login-modal" 

interface Product {
  id: number
  name: string
  price: number | string
  stock: number
  image: string
  category: string
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // 1. Auth Detection Logic
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      setIsLoggedIn(!!token)
    }

    checkAuth() // Initial check
    window.addEventListener("auth-changed", checkAuth)
    return () => window.removeEventListener("auth-changed", checkAuth)
  }, [])

  // 2. Fetch Logic (Only runs if logged in)
  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false)
      return
    }

    const fetchFeatured = async () => {
      try {
        setLoading(true)
        const response = await api.get("/products")
        const allProducts = response.data.data || response.data
        setProducts(allProducts.slice(0, 6))
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [isLoggedIn])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
    alert(`${product.name} added to cart!`)
  }

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center bg-[#F5F5F5]">
        <Loader2 className="w-10 h-10 text-[#BF092F] animate-spin mb-4" />
        <p className="text-gray-600">Loading latest components...</p>
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#132440]">Featured Products</h2>
          <p className="text-gray-600 mt-2">Explore our top-selling components</p>
        </div>

        {!isLoggedIn ? (
          /* 3. Call to Action Style for Logged Out Users */
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-16 text-center shadow-sm">
            <div className="bg-[#fdf2f4] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="text-[#BF092F] w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#132440] mb-4">Exclusive Content</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Our featured product catalog is reserved for members. Sign in to view prices, availability, and start shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#BF092F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition shadow-md"
              >
                Sign In to View
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white text-[#132440] border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          /* 4. The Original Grid (Only shown if logged in) */
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group">
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={product.image?.startsWith('http') ? product.image : `http://localhost:8000/storage/products/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-[#132440] mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-[#BF092F]">${Number(product.price).toLocaleString()}</span>
                      <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#BF092F] text-white py-2 rounded-lg hover:bg-[#9a062a] transition flex items-center justify-center gap-2 font-medium"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/products" className="bg-[#BF092F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition inline-block shadow-md">
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Login Modal Component */}
      {isLoginModalOpen && (
        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={function (user: any): void {
            throw new Error("Function not implemented.")
          } }        />
      )}
    </section>
  )
}