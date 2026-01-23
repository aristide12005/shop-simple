
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Package, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(collection);
    toast.success(`${collection.name} added to cart!`);
  };

  return (
    <div className="group flex flex-col gap-3">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-grey">
        <Link to={`/product/${collection.id}`} className="block h-full w-full">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex].image_url}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Package className="h-12 w-12 opacity-50" />
            </div>
          )}
        </Link>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="rounded-full shadow-md bg-white hover:bg-brand-red hover:text-white transition-colors">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[90%]">
          <Button onClick={handleAddToCart} className="w-full rounded-full bg-white/90 backdrop-blur text-foreground hover:bg-brand-cyan hover:text-white transition-all shadow-lg font-bold">
            Quick Add - ${Number(collection.price).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Details - Minimal */}
      <div className="space-y-1">
        <h3 className="font-heading text-lg font-bold leading-tight uppercase tracking-wide group-hover:text-brand-red transition-colors">
          <Link to={`/product/${collection.id}`}>
            {collection.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{collection.description || "Winter Collection"}</p>
      </div>
    </div>
  );
}
