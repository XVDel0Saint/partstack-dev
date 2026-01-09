import { Zap, Shield, Truck, RotateCcw } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Fast Shipping",
    description: "Get your parts delivered quickly with reliable logistics partners.",
  },
  {
    icon: Shield,
    title: "Verified Quality",
    description: "All products are tested and verified for quality and authenticity.",
  },
  {
    icon: Truck,
    title: "Wide Selection",
    description: "Browse thousands of components from top brands.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy with hassle-free exchanges.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#132440]">Why Choose PartStack?</h2>
          <p className="text-gray-600 mt-2">Industry-leading service and quality you can trust</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-[#F5F5F5] p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <Icon className="w-10 h-10 text-[#BF092F] mb-4" />
                <h3 className="text-lg font-serif font-bold text-[#132440] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
