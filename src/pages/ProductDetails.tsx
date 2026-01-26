import { useParams, useNavigate, Link } from 'react-router-dom';

// ... (existing imports)

export default function ProductDetails() {
  // ... (existing state)

  // ... (error handling)

  // ... (render)
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
          {/* ... (existing gallery and info) */}
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
import { useCollection } from '@/hooks/useCollections';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronLeft, ShoppingCart, Loader2, Star, Truck, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { ProductVariant } from '@/types/database';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useCollection(id || '');
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

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
          <h2 className="text-2xl font-heading font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')} variant="outline" className="rounded-none uppercase tracking-widest">
            Return to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const variants = product.product_variants || [];
  const hasVariants = variants.length > 0;
  
  // Calculate current price based on selected variant
  const currentPrice = selectedVariant?.price ?? product.price;
  
  // Check stock
  const isInStock = hasVariants 
    ? (selectedVariant ? selectedVariant.stock_quantity > 0 : variants.some(v => v.stock_quantity > 0))
    : product.stock_quantity > 0;

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariant) {
      toast.error('Please select an option before adding to cart');
      return;
    }
    
    if (selectedVariant && selectedVariant.stock_quantity <= 0) {
      toast.error('This variant is out of stock');
      return;
    }
    
    addToCart(product, selectedVariant || undefined);
    const variantText = selectedVariant ? ` (${selectedVariant.name})` : '';
    toast.success(`${product.name}${variantText} added to cart!`);
  };

  const images = product.collection_images?.length
    ? product.collection_images
    : [{ id: 'placeholder', image_url: '/placeholder.svg', collection_id: '', display_order: 0, created_at: '' }];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-transparent pl-0 -ml-4 text-muted-foreground hover:text-primary uppercase tracking-widest text-xs rounded-none"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Gallery Section */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4 h-fit sticky top-24">
            {images.length > 1 && (
              <div className="flex md:flex-col gap-4 overflow-auto md:overflow-visible order-2 md:order-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 md:w-20 md:h-32 flex-shrink-0 bg-muted transition-all ${
                      selectedImageIndex === idx ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-80'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 bg-muted order-1 md:order-2 aspect-[3/4] relative overflow-hidden group">
              <img
                src={images[selectedImageIndex]?.image_url || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!isInStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-widest text-lg">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4 border-b border-border pb-8">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                <span className="text-xs uppercase tracking-widest ml-2 text-muted-foreground">Top Rated</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-primary">
                ${Number(currentPrice).toFixed(2)}
                {selectedVariant?.price && selectedVariant.price !== product.price && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${Number(product.price).toFixed(2)}
                  </span>
                )}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-base font-bold border-l-4 border-primary pl-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {product.description || 'Constructed with premium materials for durability and style. This piece embodies the essence of modern streetwear luxury.'}
              </p>

              <ul className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold uppercase tracking-wider text-foreground">
                <li className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Free Worldwide Shipping</li>
                <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Lifetime Warranty</li>
              </ul>
            </div>

            <div className="space-y-6 pt-6">
              {/* Dynamic Variants Section */}
              {hasVariants && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Select Option
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {variants.map(variant => {
                      const isSelected = selectedVariant?.id === variant.id;
                      const isOutOfStock = variant.stock_quantity <= 0;
                      
                      return (
                        <button
                          key={variant.id}
                          onClick={() => !isOutOfStock && setSelectedVariant(variant)}
                          disabled={isOutOfStock}
                          className={`
                            min-w-14 h-14 px-4 border flex items-center justify-center font-bold 
                            uppercase tracking-widest text-sm transition-all relative
                            ${isSelected 
                              ? 'bg-foreground text-background border-foreground' 
                              : 'border-border hover:bg-muted hover:border-foreground'
                            }
                            ${isOutOfStock ? 'opacity-40 cursor-not-allowed line-through' : 'cursor-pointer'}
                          `}
                          title={isOutOfStock ? 'Out of stock' : `${variant.name} - ${variant.stock_quantity} in stock`}
                        >
                          {variant.name}
                          {variant.price && variant.price !== product.price && (
                            <span className="absolute -top-2 -right-2 text-[10px] bg-primary text-primary-foreground px-1 rounded">
                              ${Number(variant.price).toFixed(0)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selectedVariant && (
                    <p className="text-xs text-muted-foreground">
                      {selectedVariant.stock_quantity} units available
                      {selectedVariant.sku && ` • SKU: ${selectedVariant.sku}`}
                    </p>
                  )}
                </div>
              )}

              {/* Stock warning for base product */}
              {!hasVariants && product.stock_quantity > 0 && product.stock_quantity < 10 && (
                <div className="flex items-center gap-2 text-amber-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Only {product.stock_quantity} left in stock!
                </div>
              )}

              <div className="grid grid-cols-1 pt-6">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  disabled={!isInStock || (hasVariants && !selectedVariant)}
                  className="h-16 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-lg font-bold uppercase tracking-[0.2em] shadow-none transition-all disabled:opacity-50"
                >
                  {!isInStock 
                    ? 'Out of Stock' 
                    : hasVariants && !selectedVariant 
                      ? 'Select an Option'
                      : `Add to Cart — $${Number(currentPrice).toFixed(2)}`
                  }
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3 uppercase tracking-wider">
                  Secure checkout with PayPal
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
