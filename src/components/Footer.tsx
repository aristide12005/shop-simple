import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Accicoa" className="h-10 w-auto opacity-90" />
              <span className="text-xl font-heading font-bold text-brand-dark">ACCICOA</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Refined clothing for the modern individual. Quality, heritage, and dignity in every thread.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-design-teal transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-design-teal transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-design-teal transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-heading text-brand-dark font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-design-teal transition-colors">All Products</Link></li>
              <li><Link to="/collections" className="hover:text-design-teal transition-colors">Collections</Link></li>
              <li><Link to="/shop?sort=newest" className="hover:text-design-teal transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-heading text-brand-dark font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-design-teal transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-design-teal transition-colors">Our Story</Link></li>
              <li><Link to="/shipping" className="hover:text-design-teal transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-heading text-brand-dark font-bold mb-6">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join our community for exclusive offers and heritage stories.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-design-teal"
              />
              <button className="bg-brand-dark text-white px-4 py-2 rounded-md text-sm hover:bg-design-teal transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2025 Accicoa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-brand-dark">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-dark">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
