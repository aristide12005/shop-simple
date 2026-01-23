
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import CartModal from './CartModal';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="font-heading text-3xl font-bold tracking-tighter uppercase text-foreground">
              LUXE<span className="text-brand-red">THREADS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium uppercase tracking-widest hover:text-brand-red transition-colors">
                Shop
              </Link>
              <a href="#collections" className="text-sm font-medium uppercase tracking-widest hover:text-brand-red transition-colors">
                Collections
              </a>
              <a href="#about" className="text-sm font-medium uppercase tracking-widest hover:text-brand-red transition-colors">
                About
              </a>
              <a href="#sustainability" className="text-sm font-medium uppercase tracking-widest hover:text-brand-red transition-colors">
                Sustainability
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-6">
              {user ? (
                <div className="hidden md:flex items-center gap-4">
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm" className="font-heading uppercase tracking-wider hover:text-brand-red rounded-none">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="font-heading uppercase tracking-wider hover:text-brand-red rounded-none"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="hidden md:block">
                  <Button variant="default" size="sm" className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-6 rounded-none uppercase tracking-wider">
                    Login
                  </Button>
                </Link>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-muted transition-colors group"
              >
                <ShoppingCart className="h-5 w-5 text-foreground group-hover:text-brand-red transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center border border-white rounded-none">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border animate-slide-down bg-background">
              <div className="flex flex-col gap-6 p-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl uppercase border-b border-border pb-2">Shop</Link>
                <a href="#collections" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl uppercase border-b border-border pb-2">Collections</a>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-2xl uppercase border-b border-border pb-2">About</a>

                {user ? (
                  <>
                    {isAdmin && <Link to="/admin" className="text-sm font-medium text-brand-red uppercase">Admin Panel</Link>}
                    <button onClick={() => signOut()} className="text-left text-sm font-medium text-brand-red uppercase">Sign Out</button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium uppercase">Login</Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
