
import { useParams, useNavigate } from 'react-router-dom';
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
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-transparent pl-0 -ml-4 text-muted-foreground hover:text-brand-red uppercase tracking-widest text-xs rounded-none"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Collections
        </Button>

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

              <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-[0.9] uppercase tracking-tighter">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-brand-primary font-heading tracking-wide">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-heading text-lg font-bold uppercase tracking-widest border-l-4 border-brand-primary pl-3">Description</h3>
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
      </main>

      <Footer />
    </div>
  );
}
