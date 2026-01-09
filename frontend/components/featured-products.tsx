"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Loader2 } from "lucide-react"
import api from "@/lib/api"

// defs
interface Product {
  id: number
  name: string
  price: number | string
  stock: number
  image: string
  category: string
}

const addToCart = (product: Product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  
  // Find if product already exists in cart
  const existingItemIndex = cart.findIndex((item: any) => item.id === product.id)

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  
  // Trigger the update for the Navbar
  window.dispatchEvent(new Event("cart-updated"))
  
  // Optional: Feedback to user
  alert(`${product.name} added to cart!`)
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.get("/products")
        // response.data usually looks like { data: [...] } when using Laravel Resources
        const allProducts = response.data.data || response.data
        
        // Take the latest 6 (assuming API returns latest first)
        setProducts(allProducts.slice(0, 6))
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                    src={
                      product.image 
                        ? (product.image.startsWith('http') 
                            ? product.image 
                            : `http://localhost:8000/storage/products/${product.image}`)
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
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
          <Link
            href="/products"
            className="bg-[#BF092F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition inline-block shadow-md"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}