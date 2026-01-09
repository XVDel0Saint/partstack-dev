"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CheckCircle2, X } from "lucide-react"
import { LoginModal } from "@/components/login-modal"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  // New state for checkout success
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false)

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(savedCart)
  }, [])

  const updateCart = (newCart: any[]) => {
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
    window.dispatchEvent(new Event("cart-updated"))
  }

  const adjustQuantity = (id: number, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    })
    updateCart(newCart)
  }

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.id !== id)
    updateCart(newCart)
  }

  const handleCheckout = () => {
    // 1. Simulate the process
    setIsCheckoutSuccess(true)
    
    // 2. Clear the cart logic
    localStorage.removeItem("cart")
    setCart([])
    window.dispatchEvent(new Event("cart-updated"))
  }

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0)
  const shipping = subtotal > 1000 ? 0 : 15.00
  const total = subtotal + shipping

  return (
    <main className="min-h-screen bg-[#F5F5F5] relative">
      <Navbar onLoginClick={() => setLoginModalOpen(true)} />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Link href="/products" className="text-gray-500 hover:text-[#BF092F] transition flex items-center gap-1 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <h1 className="text-3xl font-serif font-bold text-[#132440] mb-8">Your Shopping Cart</h1>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-[#EAEAEA] flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.image.startsWith('http') ? item.image : `http://localhost:8000/storage/${item.image}`} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-[#132440]">{item.name}</h3>
                      <p className="text-[#BF092F] font-bold">${Number(item.price).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-lg p-1">
                      <button onClick={() => adjustQuantity(item.id, -1)} className="p-1 hover:text-[#BF092F] transition"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => adjustQuantity(item.id, 1)} className="p-1 hover:text-[#BF092F] transition"><Plus className="w-4 h-4" /></button>
                    </div>

                    <div className="text-right hidden sm:block min-w-[80px]">
                      <p className="font-bold text-[#132440]">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 transition p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-[#BF092F] sticky top-24">
                  <h2 className="text-xl font-bold text-[#132440] mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <hr className="border-[#EAEAEA]" />
                    <div className="flex justify-between text-lg font-bold text-[#132440]">
                      <span>Total</span>
                      <span className="text-[#BF092F]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#132440] text-white py-3 rounded-lg font-bold hover:bg-[#1d355e] transition mb-3 shadow-lg active:scale-95"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">
                    Secure checkout powered by PartStack Payments
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Empty state (shows if cart is cleared)
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-dashed border-gray-300 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#132440] mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any PC parts yet.</p>
              <Link href="/products" className="bg-[#BF092F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#9a062a] transition">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SUCCESS POPUP MODAL */}
      {isCheckoutSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsCheckoutSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-[#132440] mb-2">Order Placed!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your purchase. We've received your order and are getting your parts ready for shipment.
              </p>

              <div className="space-y-3">
                <Link 
                  href="/products"
                  className="block w-full bg-[#BF092F] text-white py-3 rounded-lg font-bold hover:bg-[#9a062a] transition shadow-md"
                >
                  Continue Browsing
                </Link>
                <button 
                  onClick={() => setIsCheckoutSuccess(false)}
                  className="block w-full bg-gray-100 text-[#132440] py-3 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </main>
  )
}