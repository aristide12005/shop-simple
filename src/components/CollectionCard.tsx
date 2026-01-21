import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CollectionWithImages } from '@/types/database';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CollectionCardProps {
  collection: CollectionWithImages;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const images = collection.collection_images || [];

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleAddToCart = () => {
    addToCart(collection);
    toast.success(`${collection.name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all duration-300 animate-scale-in">
      {/* Image Section */}
      <Link to={`/product/${collection.id}`} className="block relative aspect-square overflow-hidden bg-muted cursor-pointer">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex].image_url}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Navigation arrows for multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-background/80 hover:bg-background rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-background/80 hover:bg-background rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Image dots indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`h-2 w-2 rounded-full transition-colors ${index === currentImageIndex
                        ? 'bg-primary'
                        : 'bg-background/50 hover:bg-background/80'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Package className="h-16 w-16 opacity-50" />
          </div>
        )}
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${collection.id}`} className="block">
          <h3 className="font-serif text-lg font-semibold text-card-foreground mb-1 line-clamp-1 hover:text-primary transition-colors">
            {collection.name}
          </h3>
        </Link>

        {collection.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {collection.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-primary">
            ${Number(collection.price).toFixed(2)}
          </span>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
