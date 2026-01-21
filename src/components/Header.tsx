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
      <header className="sticky top-0 z-50 gradient-primary text-primary-foreground shadow-elevated">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-wider">
              Accicoa
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
              >
                Home
              </Link>
              <a
                href="#collections"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
              >
                Collections
              </a>
              <a
                href="#about"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="hidden md:flex items-center gap-4">
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="hidden md:block">
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-primary-foreground/20 animate-slide-down">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                >
                  Home
                </Link>
                <a
                  href="#collections"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                >
                  Collections
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                >
                  About
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                >
                  Contact
                </a>
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors font-medium"
                  >
                    Login
                  </Link>
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
