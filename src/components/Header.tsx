
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import CartModal from './CartModal';
import logo from '@/assets/logo.png';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import CartModal from './CartModal';
import logo from '@/assets/logo.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();

  // Scroll detection for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* 1. Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <img src={logo} alt="Accicoa" className="h-10 w-auto transition-transform group-hover:scale-105" />
            <span className={`text-xl font-heading font-bold tracking-tight uppercase transition-colors ${isScrolled || location.pathname !== '/' ? 'text-brand-dark' : 'text-brand-dark'
              }`}>
              Accicoa
            </span>
          </Link>

          {/* 2. Navigation (Center) - Clean Text Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm font-medium tracking-wide text-brand-dark hover:text-logo-brown transition-colors group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-logo-brown transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 3. Actions (Right) - Minimal Icons */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-brand-dark hover:text-logo-brown transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <button onClick={() => signOut()} title="Sign Out" className="text-brand-dark hover:text-logo-brown transition-colors">
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/auth" className="text-brand-dark hover:text-logo-brown transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group text-brand-dark hover:text-logo-brown transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-logo-brown text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-brand-dark"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-heading font-bold text-brand-dark hover:text-logo-brown transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-8 mt-8 border-t border-gray-100 pt-8 w-1/2 justify-center">
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="h-8 w-8 text-brand-dark" />
            </Link>
            <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
              <ShoppingBag className="h-8 w-8 text-brand-dark" />
            </button>
          </div>
        </div>
      </header>
      <CartModal />
    </>
  );
}
