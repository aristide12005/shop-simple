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
      <div className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer">
        <Link to={linkTarget} className="block w-full h-full">
          {/* Background Image - Parallax Scale */}
          <img
            src={displayImage}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />

          {/* Elegant Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
            <span className="text-logo-gold text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 delay-100">
              Collection
            </span>

            <h3 className="font-heading text-3xl md:text-4xl text-white mb-4 leading-tight drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {collection.name}
            </h3>

            {/* Animated Underline */}
            <div className="w-0 group-hover:w-20 h-0.5 bg-white transition-all duration-700 ease-out" />
          </div>
        </Link>
      </div>
    );
  }

  // Default Variant (Shop/Product style) - Kept Clean but updated colors
  if (!isProduct) return null;

  const product = collection as CollectionWithImages;

  return (
    <div className="group flex flex-col gap-3 relative">
      <Link to={linkTarget} className="block relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-2">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ghost 'Add to Cart' */}
        <div className="absolute inset-x-0 bottom-6 px-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(e);
            }}
            className="w-full bg-white/95 backdrop-blur text-logo-charcoal hover:bg-logo-charcoal hover:text-white uppercase tracking-widest text-xs font-bold shadow-md rounded-none py-6"
          >
            Add to Cart
          </Button>
        </div>
      </Link>

      <div className="text-center">
        <h3 className="text-base font-medium text-logo-charcoal group-hover:text-logo-gold transition-colors duration-300">
          <Link to={linkTarget}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-light">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
