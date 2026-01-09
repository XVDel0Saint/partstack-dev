import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#BF092F] to-[#132440] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-pretty">
                Your One-Stop Shop for Computer Hardware
              </h1>
              <p className="text-lg mt-4 text-gray-100">
                High-quality components at unbeatable prices. Everything you need to build, upgrade, or repair your PC.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-[#BF092F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block text-center shadow-md"
              >
                Browse Products
              </Link >
              <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:flex justify-center">
            <img
              src="/computer-hardware-components.jpg"
              alt="Computer Hardware"
              className="w-full max-w-md rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
