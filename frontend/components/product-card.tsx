"use client"

import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  // Update: API might send string or number
  price: number | string 
  stock: number
  image: string
  onAddToCart?: () => void
}

export function ProductCard({ name, price, stock, image, onAddToCart }: ProductCardProps) {
  // Convert to number safely
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group border border-[#EAEAEA] flex flex-col h-full">
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        {stock < 10 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Low Stock
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-[#132440] mb-2 line-clamp-2">{name}</h3>
        <div className="flex justify-between items-center mb-4">
          {/* Use numericPrice here */}
          <span className="text-2xl font-bold text-[#BF092F]">
            ${isNaN(numericPrice) ? "0.00" : numericPrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-600 bg-[#F5F5F5] px-2 py-1 rounded">{stock} in stock</span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.();
          }}
          className="w-full bg-[#BF092F] text-white py-2 rounded-lg hover:bg-[#9a062a] active:scale-95 transition-all flex items-center justify-center gap-2 font-medium text-sm mt-auto shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}