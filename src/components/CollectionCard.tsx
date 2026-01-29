
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CollectionWithImages, ProductCollection } from '@/types/database';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface CollectionCardProps {
  collection: CollectionWithImages | ProductCollection;
  variant?: 'default' | 'featured';
}

export default function CollectionCard({ collection, variant = 'default' }: CollectionCardProps) {
  const { addToCart } = useCart();

  // Helper to check if it's a Product (CollectionWithImages)
  const isProduct = 'collection_images' in collection;

  // Image handling
  let displayImage = '/placeholder.svg';
  if (isProduct) {
    const images = (collection as CollectionWithImages).collection_images || [];
    if (images.length > 0) displayImage = images[0].image_url;
  } else {
    // It's a Real Collection (ProductCollection)
    displayImage = (collection as ProductCollection).banner_image_url || '/placeholder.svg';
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProduct) {
      addToCart(collection as CollectionWithImages);
      toast.success(`${collection.name} added to cart!`);
    }
  };

  const linkTarget = isProduct ? `/product/${collection.id}` : `/shop?collection=${collection.id}`;

  if (variant === 'featured') {
    return (
      <div className="group flex flex-col gap-4 relative">
        <Link to={linkTarget} className="block relative aspect-[3/4] overflow-hidden rounded-md bg-secondary">
          <img
            src={displayImage}
            alt={collection.name}
            className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-all duration-700 ease-in-out"
          />
        </Link>
        <div className="text-center space-y-3 px-2">
          <h3 className="text-xl font-heading font-medium text-brand-dark">
            <Link to={linkTarget}>
              {collection.name}
            </Link>
          </h3>
          {collection.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 max-w-[90%] mx-auto">
              {collection.description}
            </p>
          )}
          <Link to={linkTarget} className="inline-block pt-2">
            <Button variant="outline" className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white uppercase text-xs tracking-widest px-6 h-10">
              View Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Default Variant (Shop/Product style with Price & Add to Cart) - ONLY for Products
  if (!isProduct) return null; // Should not happen in 'default' mode if logic is correct, or handle gracefully

  const product = collection as CollectionWithImages;

  return (
    <div className="group flex flex-col gap-2 relative">
      {/* Image Container with Grayscale Effect */}
      <Link to={linkTarget} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
        />

        {/* Quick Add Button - Slides Up on Hover */}
        <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <Button
            onClick={handleAddToCart}
            className="w-full h-12 rounded-none bg-brand-primary text-brand-dark hover:bg-brand-highlight hover:text-brand-dark uppercase tracking-widest font-bold text-xs"
          >
            Add to Cart — ${Number(product.price).toFixed(2)}
          </Button>
        </div>
      </Link>

      {/* Details - Minimal & Sharp */}
      <div className="flex justify-between items-start pt-2">
        <div>
          <h3 className="text-sm font-medium leading-none text-foreground group-hover:text-brand-primary transition-colors">
            <Link to={linkTarget}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {product.stock_quantity > 0 ? 'In Stock' : 'Sold Out'}
          </p>
        </div>
        <span className="font-semibold text-sm">${Number(product.price).toFixed(2)}</span>
      </div>
    </div>
  );
}
