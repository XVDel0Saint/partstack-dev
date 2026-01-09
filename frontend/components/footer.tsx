import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#132440] text-[#F5F5F5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#BF092F] rounded flex items-center justify-center">
                <span className="text-white font-serif font-bold">P</span>
              </div>
              <span className="text-xl font-serif font-bold">PartStack</span>
            </div>
            <p className="text-sm text-gray-400">Your trusted source for quality PC components.</p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-serif font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-[#3B9797] transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#3B9797] transition">
                  GPUs
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#3B9797] transition">
                  Processors
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#3B9797] transition">
                  Memory
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-[#3B9797] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#3B9797] transition">
                  Features
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B9797] transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B9797] transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-[#3B9797] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B9797] transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B9797] transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#3B9797] transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2025 PartStack. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#3B9797] transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3B9797] transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3B9797] transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
