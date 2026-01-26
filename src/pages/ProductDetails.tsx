
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCollection } from '@/hooks/useCollections';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, ShoppingCart, Loader2, Star, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useCollection(id || '');
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-heading font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')} variant="outline" className="rounded-none uppercase tracking-widest">
            Return to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const images = product.collection_images?.length
    ? product.collection_images
    : [{ id: 'placeholder', image_url: '/placeholder.svg' }];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8 text-xs uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span className="text-gray-300">/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Gallery Section - Industrial/Bento Feel */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 h-fit sticky top-24">
            {/* Thumbs (Left side on desktop) */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-4 overflow-auto md:overflow-visible order-2 md:order-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 md:w-20 md:h-32 flex-shrink-0 bg-secondary transition-all ${selectedImageIndex === idx ? 'ring-2 ring-brand-red ring-offset-2' : 'hover:opacity-80'
                      }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 bg-brand-secondary order-1 md:order-2 aspect-[3/4] relative overflow-hidden group">
              <img
                src={images[selectedImageIndex].image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 bg-brand-primary text-brand-dark text-xs font-bold uppercase py-2 px-4 shadow-sm">
                New Arrival
              </div>
            </div>
          </div>

          {/* Product Info - Editorial Style */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4 border-b border-border pb-8">
              <div className="flex items-center gap-2 text-brand-dark mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-brand-primary text-brand-primary" />)}
                <span className="text-xs uppercase tracking-widest ml-2 text-muted-foreground">Top Rated</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-brand-primary">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-base font-bold border-l-4 border-brand-primary pl-3">Description</h3>
              <p className="text-brand-dark/80 leading-relaxed text-sm md:text-base">
                {product.description || 'Constructed with premium materials for durability and style. This piece embodies the essence of modern streetwear luxury.'}
              </p>

              <ul className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold uppercase tracking-wider text-brand-dark">
                <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-brand-primary" /> Free Worldwide Shipping</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-primary" /> Lifetime Warranty</li>
              </ul>
            </div>

            <div className="space-y-6 pt-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Size</span>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL"].map(size => (
                    <button key={size} className="w-14 h-14 border border-border flex items-center justify-center font-heading font-bold hover:bg-foreground hover:text-background hover:border-foreground transition-colors uppercase tracking-widest text-sm">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 pt-6">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="h-16 rounded-none bg-brand-dark text-white hover:bg-brand-primary hover:text-brand-dark text-lg font-heading font-bold uppercase tracking-[0.2em] shadow-none transition-all"
                >
                  Add to Cart — ${Number(product.price).toFixed(2)}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3 uppercase tracking-wider">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-24 border-t border-border pt-16">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 uppercase tracking-wider text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Placeholder Related Items - In a real app, fetch similar items */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded-sm relative">
                  <div className="absolute inset-0 bg-neutral-200 animate-pulse" /> {/* Placeholder loading state appearance if no image */}
                  {/* Mock Image */}
                  <img
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1617137984095-74e4e5e3613f' : item === 2 ? '1541533848490-bc8115cd1b8d' : item === 3 ? '1576053139778-7e32f2ae3cfd' : '1523381210434-271e8be1f52b'}?q=80&w=400&auto=format&fit=crop`}
                    alt="Related Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                  />
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wide group-hover:text-brand-primary transition-colors">Classic Essential {item}</h3>
                <p className="text-muted-foreground text-xs mt-1">$120.00</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
