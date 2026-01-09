"use client"

interface CTASectionProps {
  onSignUpClick: () => void
}

export function CTASection({ onSignUpClick }: CTASectionProps) {
  return (
    <section className="bg-[#132440] text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Build Your Dream PC?</h2>
        <p className="text-lg text-gray-300 mb-8">
          Join thousands of builders who trust PartStack for quality components and competitive prices.
        </p>
        <button
          onClick={onSignUpClick}
          className="bg-[#BF092F] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#9a062a] transition shadow-lg"
        >
          Get Started Now
        </button>
      </div>
    </section>
  )
}
