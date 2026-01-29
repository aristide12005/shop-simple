import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Collections", href: "#collections" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? "glass border-b border-white/10 py-4"
            : "bg-transparent py-6"
          }`}
      >
        <nav className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl font-medium tracking-wide"
          >
            <span className={isScrolled ? "text-foreground" : "text-white"}>
              ACCICOA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`link-underline text-sm font-medium tracking-luxury uppercase transition-colors duration-300 ${isScrolled
                      ? "text-foreground/80 hover:text-foreground"
                      : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"
                }`}
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden animate-fade-in">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-3xl font-medium tracking-wide text-foreground hover:text-accent transition-colors animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
