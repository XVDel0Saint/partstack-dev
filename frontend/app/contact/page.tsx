"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 4000)
    } else {
      setSubmitStatus("error")
      setTimeout(() => setSubmitStatus("idle"), 4000)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setLoginModalOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3B9797] to-[#132440] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch with Us</h1>
          <p className="text-lg text-gray-100">We're here to help with any questions or support needs</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#132440] mb-4">Contact Information</h3>
                <p className="text-gray-600 mb-6">
                  Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-[#BF092F] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-[#132440] mb-1">Email</h4>
                  <a href="mailto:support@partstack.com" className="text-[#3B9797] hover:underline">
                    support@partstack.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#BF092F] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-[#132440] mb-1">Phone</h4>
                  <a href="tel:+639123456789" className="text-[#3B9797] hover:underline">
                    +63 912 345 6789
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#BF092F] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-[#132440] mb-1">Address</h4>
                  <p className="text-gray-600">123 Tech Street, Manila, Philippines</p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-serif font-bold text-[#132440] mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#132440] hover:bg-[#BF092F] hover:text-white transition"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#132440] hover:bg-[#BF092F] hover:text-white transition"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#132440] hover:bg-[#BF092F] hover:text-white transition"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center text-[#132440] hover:bg-[#BF092F] hover:text-white transition"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-medium text-[#132440] mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] transition"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#132440] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#132440] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] transition"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#132440] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-lg bg-[#F5F5F5] text-[#132440] placeholder-gray-500 focus:outline-none focus:border-[#BF092F] transition resize-none"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">Message sent successfully! We'll be in touch soon.</p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">Please fill in all fields before sending.</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#BF092F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#9a062a] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-[#F5F5F5] rounded-lg overflow-hidden shadow-md h-96">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="PartStack Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5524053527536!2d121.00969!3d14.599512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9d2e0d0d0d1%3A0x0!2sManila%2C%20Philippines!5e0!3m2!1sen!2sph!4v1234567890"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#132440] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Browse our full catalog and find the perfect components for your PC build.
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
