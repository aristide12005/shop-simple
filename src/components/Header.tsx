
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import CartModal from './CartModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 bg-design-bg py-4 px-4 md:px-12">
        <div className="container mx-auto flex items-center justify-between">

          {/* 1. Logo (Left) */}
          <Link to="/" className="flex items-center gap-2 z-50">
            {/* Simple Text Logo based on image */}
            <h1 className="text-3xl font-bold tracking-tight text-black uppercase font-sans">
              <span className="text-4xl text-black">▵</span> ACCICOA
            </h1>
          </Link>

          {/* 2. Navigation Pill (Center) */}
          <nav className="hidden md:flex items-center bg-[#85D1DB] rounded-full px-8 py-3 gap-8 shadow-sm">
            <Link to="/" className="text-black/80 font-medium hover:text-white transition-colors">Home</Link>
            <Link to="/shop" className="text-black/80 font-medium hover:text-white transition-colors">Shop</Link>
            <Link to="/collections" className="text-black/80 font-medium hover:text-white transition-colors">Collections</Link>
            <Link to="/about" className="text-black/80 font-medium hover:text-white transition-colors">About Us</Link>
          </nav>

          {/* 3. Actions Pill (Right) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-[#85D1DB] rounded-lg p-2 px-4 flex items-center gap-4 shadow-sm">
              {user ? (
                <button onClick={() => signOut()} title="Sign Out">
                  <User className="h-6 w-6 text-black/80 hover:text-white transition-colors" />
                </button>
              ) : (
                <Link to="/auth">
                  <User className="h-6 w-6 text-black/80 hover:text-white transition-colors" />
                </Link>
              )}
              <div className="w-px h-6 bg-black/10"></div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative group"
              >
                <ShoppingBag className="h-6 w-6 text-black/80 hover:text-white transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-design-red text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 z-50"
          >
            {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-design-bg z-40 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-top-10 duration-300">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold uppercase">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold uppercase">Shop</Link>
            <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold uppercase">Collections</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold uppercase">About Us</Link>
            <div className="flex gap-6 mt-8">
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}><User className="h-8 w-8" /></Link>
              <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}><ShoppingBag className="h-8 w-8" /></button>
            </div>
          </div>
        )}
      </header>
      <CartModal />
    </>
  );
}
