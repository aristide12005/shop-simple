
import { useParams, useNavigate } from 'react-router-dom';
import { useCollection } from '@/hooks/useCollections';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, ShoppingCart, Loader2, Star, Check } from 'lucide-react';
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
          <Button onClick={() => navigate('/')} variant="outline" className="rounded-full">
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
    : [{ id: 'placeholder', image_url: '/placeholder.svg' }]; // Fallback if no images

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-transparent pl-0 -ml-4 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Collections
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="md:col-span-7 space-y-4">
            <div className="aspect-[4/5] bg-brand-grey rounded-3xl overflow-hidden border border-border/50 shadow-sm relative group">
              <img
                src={images[selectedImageIndex].image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full px-3 py-1 text-xs font-bold font-heading shadow-sm">
                NEW ARRIVAL
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImageIndex === idx ? 'border-brand-red scale-95' : 'border-transparent hover:border-brand-grey'
                      }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:col-span-5 space-y-8 sticky top-24">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-cyan">
                <Star className="w-4 h-4 fill-brand-cyan" />
                <Star className="w-4 h-4 fill-brand-cyan" />
                <Star className="w-4 h-4 fill-brand-cyan" />
                <Star className="w-4 h-4 fill-brand-cyan" />
                <Star className="w-4 h-4 fill-brand-cyan" />
                <span className="text-xs text-muted-foreground ml-2">(4.8 Stars)</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-[0.9] uppercase">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-brand-red font-heading">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="prose prose-stone dark:prose-invert max-w-none bg-brand-grey/30 p-6 rounded-2xl">
              <h3 className="font-heading text-lg font-bold mb-2 uppercase">Description</h3>
              <p className="text-muted-foreground/80 leading-relaxed font-light">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {["S", "M", "L", "XL"].map(size => (
                  <div key={size} className="w-12 h-12 rounded-full border border-border flex items-center justify-center font-bold hover:bg-foreground hover:text-background cursor-pointer transition-colors cursor-not-allowed opacity-50" title="Coming soon">
                    {size}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-green-600 mb-6">
                <Check className="w-4 h-4" /> In Stock & Ready to Ship
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full h-16 rounded-full bg-foreground text-background hover:bg-brand-red hover:text-white text-xl font-heading font-bold uppercase tracking-wide shadow-xl transition-all hover:scale-[1.02]"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
