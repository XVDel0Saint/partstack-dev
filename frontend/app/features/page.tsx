"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { Truck, Globe, Lock, BarChart3, Headphones, Tag } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Get your parts delivered right to your door in record time, with tracking included.",
  },
  {
    icon: Globe,
    title: "Wide Selection",
    description: "From high-end GPUs to everyday peripherals, we have all the components you need.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Safe and encrypted payment options – shop with confidence every time.",
  },
  {
    icon: BarChart3,
    title: "Easy Product Comparison",
    description: "Compare prices and specs easily to make the best purchasing decisions.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Our friendly support team is ready to help with any questions or concerns.",
  },
  {
    icon: Tag,
    title: "Inventory Transparency",
    description: "Always know stock availability before you purchase, updated in real-time.",
  },
]

export default function FeaturesPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setLoginModalOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#BF092F] to-[#132440] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Everything You Need to Build Your Perfect Setup
          </h1>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Powerful, Simple, and Affordable – All Computer Parts in One Place
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-[#BF092F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Start Browsing Products
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-[#F5F5F5] p-8 rounded-lg shadow-sm hover:shadow-lg transition">
                  <Icon className="w-12 h-12 text-[#BF092F] mb-4" />
                  <h3 className="text-xl font-serif font-bold text-[#132440] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#132440] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Upgrade Your Setup?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Browse our full catalog and find the perfect components for your build.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#BF092F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#9a062a] transition shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </main>
  )
}
