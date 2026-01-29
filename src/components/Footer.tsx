import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-logo-charcoal text-white pt-24 pb-12 font-sans border-t border-logo-charcoal">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-widest text-white">Accicoa</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Elevating African craftsmanship to the global stage. Authentic luxury for the modern soul.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-logo-gold transition-colors duration-300"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-logo-gold transition-colors duration-300"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-logo-gold transition-colors duration-300"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Shop</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li><Link to="/shop" className="hover:text-logo-gold transition-colors duration-300">All Products</Link></li>
              <li><Link to="/collections" className="hover:text-logo-gold transition-colors duration-300">New Arrivals</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-logo-gold transition-colors duration-300">Accessories</Link></li>
              <li><Link to="/shop?category=home" className="hover:text-logo-gold transition-colors duration-300">Home Decor</Link></li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Support</h4>
            <ul className="space-y-4 text-sm font-light text-gray-300">
              <li><Link to="/contact" className="hover:text-logo-gold transition-colors duration-300">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-logo-gold transition-colors duration-300">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-logo-gold transition-colors duration-300">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-logo-gold transition-colors duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Newsletter</h4>
            <p className="text-gray-400 text-sm font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="relative max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-gray-700 py-3 text-sm focus:outline-none focus:border-logo-gold transition-colors text-white placeholder:text-gray-600"
              />
              <button className="absolute right-0 top-3 text-xs uppercase font-bold text-gray-500 hover:text-logo-gold transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-light">
          <p>&copy; {new Date().getFullYear()} Accicoa. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
