"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setLoginModalOpen(true)} />
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CTASection onSignUpClick={() => setLoginModalOpen(true)} />
      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </main>
  )
}
