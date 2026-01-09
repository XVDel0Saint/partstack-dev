"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const whyChooseUs = [
  {
    title: "Reliable Stock Updates",
    description: "Always know availability before purchase",
  },
  {
    title: "Competitive Prices",
    description: "Get the best value for your money",
  },
  {
    title: "Fast Support",
    description: "Dedicated team to help anytime",
  },
]

export default function AboutPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setLoginModalOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#132440] to-[#3B9797] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About PartStack</h1>
              <p className="text-xl text-gray-100">Your Trusted Partner for Computer Parts Online</p>
            </div>
            <div className="hidden md:flex justify-center">
              <img
                src="/computer-hardware-components.jpg"
                alt="Computer Assembly"
                className="w-full max-w-md rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#132440] mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At PartStack, we believe building or upgrading your computer should be simple, fast, and reliable. Our
                mission is to provide tech enthusiasts, gamers, and professionals access to a wide range of quality
                computer parts with just a few clicks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-serif font-bold text-[#BF092F] mb-4">Our Commitment</h3>
              <p className="text-gray-600">
                We're committed to delivering exceptional service, competitive pricing, and a seamless shopping
                experience that keeps our customers coming back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/rtx-4090-graphics-card.jpg"
                alt="Premium Components"
                className="w-full max-w-md rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#132440] mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the most trusted online destination for computer components, combining convenience, affordability,
                and excellent service. We envision a world where building your dream PC is easier than ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#132440] text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#3B9797] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#132440] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#132440] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Browse Our Products</h2>
          <p className="text-lg text-gray-300 mb-8">
            Experience the PartStack difference today. Shop our extensive catalog of quality computer components.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#BF092F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#9a062a] transition shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </main>
  )
}
