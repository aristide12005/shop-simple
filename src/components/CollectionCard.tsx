
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CollectionWithImages } from '@/types/database';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CollectionCardProps {
  collection: CollectionWithImages;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { addToCart } = useCart();
  const images = collection.collection_images || [];
  const displayImage = images.length > 0 ? images[0].image_url : '/placeholder.svg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(collection);
    toast.success(`${collection.name} added to cart!`);
  };

  return (
    <div className="group flex flex-col gap-2 relative">
      {/* Image Container with Grayscale Effect */}
      <Link to={`/product/${collection.id}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={displayImage}
          alt={collection.name}
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
        />

        {/* Quick Add Button - Slides Up on Hover */}
        <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <Button
            onClick={handleAddToCart}
            className="w-full h-12 rounded-none bg-brand-red text-white hover:bg-black uppercase tracking-widest font-bold text-xs"
          >
            Add to Cart — ${Number(collection.price).toFixed(2)}
          </Button>
        </div>
      </Link>

      {/* Details - Minimal & Sharp */}
      <div className="flex justify-between items-start pt-2">
        <div>
          <h3 className="font-heading text-lg font-bold leading-none uppercase tracking-wide group-hover:text-brand-red transition-colors">
            <Link to={`/product/${collection.id}`}>
              {collection.name}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {collection.stock_quantity > 0 ? 'In Stock' : 'Sold Out'}
          </p>
        </div>
        <span className="font-bold text-sm tracking-tight">${Number(collection.price).toFixed(2)}</span>
      </div>
    </div>
  );
}
