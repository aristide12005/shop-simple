import { useParams, useNavigate } from 'react-router-dom';
import { useCollection } from '@/hooks/useCollections';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, ShoppingCart, Loader2 } from 'lucide-react';
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
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <h2 className="text-2xl font-serif font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')} variant="outline">
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
          className="mb-8 hover:bg-transparent pl-0 -ml-4"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Collections
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden border">
              <img 
                src={images[selectedImageIndex].image_url || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${
                      selectedImageIndex === idx ? 'border-primary' : 'border-transparent hover:border-primary/50'
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-primary">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="prose prose-stone dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full md:w-auto min-w-[200px] text-lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
