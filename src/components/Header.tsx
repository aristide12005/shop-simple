
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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const isHome = location.pathname === '/';
  // Text color logic: On Home and not scrolled -> White, else -> Charcoal
  const textColorClass = isHome && !isScrolled ? 'text-white hover:text-logo-gold' : 'text-logo-charcoal hover:text-logo-gold';
  const logoTextClass = isHome && !isScrolled ? 'text-white' : 'text-logo-charcoal';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-8'
          }`}
      >
        <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">

          {/* 1. Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 z-50 group">
            {/* Ideally replace with a white version of the logo for dark backgrounds if available, filtering for now */}
            <img
              src={logo}
              alt="Accicoa"
              className={`h-10 w-auto transition-all duration-300 ${isHome && !isScrolled ? 'brightness-0 invert' : ''}`}
            />
            <span className={`text-xl font-heading font-bold tracking-tight uppercase transition-colors duration-300 ${logoTextClass}`}>
              Accicoa
            </span>
          </Link>

          {/* 2. Navigation (Center) - Clean Text Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium tracking-[0.1em] uppercase transition-colors duration-300 group py-2 ${textColorClass}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-logo-gold transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* 3. Actions (Right) - Minimal Icons */}
          <div className={`hidden md:flex items-center gap-6 ${textColorClass}`}>
            <button className="transition-colors duration-300 hover:text-logo-gold">
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <button onClick={() => signOut()} title="Sign Out" className="transition-colors duration-300 hover:text-logo-gold">
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/auth" className="transition-colors duration-300 hover:text-logo-gold">
                <User className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative group transition-colors duration-300 hover:text-logo-gold"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-logo-gold text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden z-50 p-2 transition-colors duration-300 ${isMobileMenuOpen ? 'text-logo-charcoal' : textColorClass}`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-700 cubic-bezier(0.77,0,0.175,1) flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-heading font-medium text-logo-charcoal hover:text-logo-gold transition-colors tracking-tight"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-8 mt-12 w-1/2 justify-center">
            <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="h-8 w-8 text-logo-charcoal hover:text-logo-gold transition-colors" />
            </Link>
            <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
              <ShoppingBag className="h-8 w-8 text-logo-charcoal hover:text-logo-gold transition-colors" />
            </button>
          </div>
        </div>
      </header>
      <CartModal />
    </>
  );
}
