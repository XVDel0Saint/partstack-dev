"use client"

import api from "@/lib/api"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { LoginModal } from "@/components/login-modal"
import { Search, Filter, Plus, X, Lock } from "lucide-react"
import type React from "react"

// defs
interface Product {
  id: number
  name: string
  price: number | string
  stock: number
  image: string
  category: string
}

export default function ProductsPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [addProductModalOpen, setAddProductModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState<{
      name: string;
      category: string;
      price: string;
      stock: string;
      description: string;
      image: File | null; 
    }>({
      name: "",
      category: "CPU",
      price: "",
      stock: "",
      description: "",
      image: null,
    })
  const [dbProducts, setDbProducts] = useState<any[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check auth status on load and when "auth-changed" is triggered
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token")
      setIsLoggedIn(!!token)
      if (!token) setAddProductModalOpen(false)
    }

    checkAuth() // Initial check
    window.addEventListener("auth-changed", checkAuth)
    return () => window.removeEventListener("auth-changed", checkAuth)
  }, [])

  // featch from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products")
        // Laravel Resources usually wrap data in a 'data' key
        setDbProducts(response.data.data || response.data)
      } catch (err) {
        console.error("Failed to fetch products:", err)
      } finally {
        setIsDataLoading(false)
      }
    }
    loadProducts()
  }, [])

  // dynamic filters
  const categories = ["All", ...new Set(dbProducts.map((p) => p.category))]

  const filteredProducts = dbProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Basic validation: 2MB limit
        if (file.size > 2 * 1024 * 1024) {
          setError("Image size must be less than 2MB");
          return;
        }
        
        setFormData(prev => ({ ...prev, image: file }));
      }
  };

  const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB");
      return;
    }
    setFormData(prev => ({ ...prev, image: file }));
  }
};

// Essential to prevent the browser from just opening the image file
const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    // 1. Frontend Validation
    if (!formData.name || !formData.price || !formData.stock || !formData.description || !formData.image) {
      setError("Please fill in all required fields, including an image.")
      setLoading(false)
      return
    }

    // 2. Prepare FormData (Browser handles boundaries automatically)
    const data = new FormData()
    data.append("name", formData.name)
    data.append("category", formData.category)
    data.append("price", formData.price)
    data.append("stock", formData.stock)
    data.append("description", formData.description)
    data.append("image", formData.image)

    try {
      // 3. Request
      const response = await api.post("/products", data)

      // Laravel returns a 201 or 200 on success
      if (response.status === 200 || response.status === 201) {
        setSuccess("Product added successfully!")
        
        // Reset to initial state
        setFormData({
          name: "",
          category: "CPU", // Maintain the default dropdown value
          price: "",
          stock: "",
          description: "",
          image: null,
        })

        // Refresh or Close Modal after delay
        setTimeout(() => {
          setSuccess("")
          setAddProductModalOpen(false)
          window.location.reload() // Refresh to see the new product
        }, 2000)
      }
    } catch (err: any) {
      console.error("Submission Error:", err)
      
      // Handle Validation vs Server Errors
      if (err.response?.status === 422) {
        const firstError = Object.values(err.response.data.errors)[0] as string[];
        setError(firstError[0]);
      } else if (err.response?.status === 500) {
        setError("Server Error: Check if the storage link is created and directories are writable.");
      } else {
        setError(err.response?.data?.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false)
    }
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

  return (
    <main className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setLoginModalOpen(true)} />

      {/* Page Header */}
      <section className="bg-linear-to-r from-[#BF092F] to-[#132440] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Our Products</h1>
            <p className="text-gray-100">Browse our extensive catalog of quality computer hardware</p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-[#EAEAEA] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F]"
              />
            </div>

            {/* Filter Button and Add Product Button */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Showing {filteredProducts.length} products</span>
              </div>

              {/* Add Product btn visible if logged in */}
              {isLoggedIn && (
                <button
                  onClick={() => setAddProductModalOpen(true)}
                  className="flex items-center gap-2 bg-[#BF092F] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#9a062a] transition whitespace-nowrap ml-auto"
                >
                  <Plus className="w-5 h-5" />
                    Add Product
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium text-sm transition ${
                  selectedCategory === category
                    ? "bg-[#BF092F] text-white"
                    : "bg-[#F5F5F5] text-[#132440] hover:bg-[#EAEAEA]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
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
                onClick={() => setLoginModalOpen(true)}
                className="bg-[#BF092F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition shadow-md"
              >
                Sign In to View
              </button>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="bg-white text-[#132440] border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          /* 4. The Original Grid (Only shown if logged in) */
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isDataLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg animate-pulse">Loading catalog...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => addToCart(product)}
                  // Ensure the image path is valid
                  image={
                    product.image 
                      ? (product.image.startsWith('http') ? product.image : `http://localhost:8000/storage/products/${product.image}`)
                      : "/placeholder.svg"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
        <     p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
      )}

      {addProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#BF092F] to-[#132440] text-white p-6 flex justify-between items-center border-b">
              <h2 className="text-2xl font-serif font-bold">Add New Product</h2>
              <button
                onClick={() => setAddProductModalOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-lg">{error}</div>
              )}

              {success && (
                <div className="mb-6 bg-[#3B9797]/10 border border-[#3B9797] text-[#3B9797] px-4 py-4 rounded-lg">
                  ✓ {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-[#132440] mb-2">
                    Product Name <span className="text-[#BF092F]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., NVIDIA RTX 4090"
                    className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20"
                    disabled={loading}
                  />
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#132440] mb-2">
                      Category <span className="text-[#BF092F]">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] focus:outline-none focus:border-[#BF092F]"
                      disabled={loading}
                    >
                      <option>CPU</option>
                      <option>GPU</option>
                      <option>Memory</option>
                      <option>Storage</option>
                      <option>Cooling</option>
                      <option>Power</option>
                      <option>Case</option>
                      <option>Motherboard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#132440] mb-2">
                      Price USD <span className="text-[#BF092F]">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="199.99"
                      step="0.01"
                      className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-[#132440] mb-2">
                    Stock Quantity <span className="text-[#BF092F]">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="50"
                    className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20"
                    disabled={loading}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#132440] mb-2">
                    Description <span className="text-[#BF092F]">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed description of your product..."
                    rows={4}
                    className="w-full px-4 py-2 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] focus:ring-2 focus:ring-[#BF092F]/20 resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Product Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#132440] mb-2">
                    Product Image <span className="text-[#BF092F]">*</span>
                  </label>
  
                  <label 
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#EAEAEA] border-dashed rounded-lg bg-[#F5F5F5] hover:border-[#BF092F] transition-all cursor-pointer group relative"
                  >
                    {/* Hidden File Input - now covers the whole area */}
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      disabled={loading}
                    />

                    {formData.image ? (
                      <div className="space-y-2 text-center z-10">
                        <img 
                          src={URL.createObjectURL(formData.image)} 
                          alt="Preview" 
                          className="mx-auto h-32 w-32 object-cover rounded-md border border-[#EAEAEA]"
                        />
                        <p className="text-xs text-[#BF092F] font-semibold group-hover:underline">
                         Click or drag to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#BF092F] transition-colors"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <span className="font-medium text-[#BF092F]">Upload a file</span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#BF092F] text-white py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Adding Product..." : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddProductModalOpen(false)}
                    className="flex-1 border border-[#EAEAEA] text-[#132440] py-3 rounded-lg font-semibold hover:bg-[#F5F5F5] transition"
                  >
                    Cancel
                  </button>
                </div>
                
              </form>

              {/* Info Box */}
              <div className="mt-8 bg-[#F5F5F5] border border-[#EAEAEA] rounded-lg p-4">
                <h3 className="font-serif font-bold text-[#132440] mb-2">Tips for Adding Products</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Only Admins can add products</li>
                  <li>• Be descriptive with your product names and descriptions</li>
                  <li>• Ensure pricing is competitive and accurate</li>
                  <li>• Keep accurate stock counts to avoid overselling</li>
                  <li>• Optimize image for better visibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} onLoginSuccess={function (user: any): void {
        throw new Error("Function not implemented.")
      } } />
    </main>
  )
}
