import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Loader2, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react";
import { useState, useMemo } from "react";
import ProductGrid from "@/components/ProductGrid";
import { formatPrice } from "@/lib/currency";
import { useProduct } from "@/hooks/useProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const { data: product, isLoading, error } = useProduct(id!);

  const variants = product?.product_variants || [];
  const hasVariants = variants.length > 0;
  const selectedVariant = variants.find(v => v.id === selectedVariantId) || null;

  // Determine which images to show based on variant selection
  const images = useMemo(() => {
    if (!product?.collection_images) return [];
    const allImages = product.collection_images;

    // If a variant is selected and has variant-specific images, show only those
    if (selectedVariantId) {
      const variantImages = allImages.filter(img => img.variant_id === selectedVariantId);
      if (variantImages.length > 0) return variantImages.map(img => img.image_url);
    }

    // Otherwise show all non-variant images, or all images if none are untagged
    const generalImages = allImages.filter(img => !img.variant_id);
    return (generalImages.length > 0 ? generalImages : allImages).map(img => img.image_url);
  }, [product?.collection_images, selectedVariantId]);

  // Reset image when variant changes
  const handleVariantSelect = (variantId: string) => {
    setSelectedVariantId(prev => prev === variantId ? null : variantId);
    setSelectedImage(0);
    setQuantity(1);
  };

  const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
  const currentStock = selectedVariant?.stock_quantity ?? product?.stock_quantity ?? 0;
  const isOutOfStock = currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= 5;
  const currency = (product as any)?.currency || 'USD';

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <Link to="/shop">
          <Button variant="outline">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const mainImage = images.length > 0
    ? images[selectedImage] || images[0]
    : "/placeholder.svg";

  const handleAddToCart = () => {
    if (hasVariants && !selectedVariantId) return;
    addToCart(
      { ...product, collection_images: product.collection_images || [] } as any,
      selectedVariant || undefined
    );
  };

  const canAddToCart = !isOutOfStock && (!hasVariants || !!selectedVariantId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 max-w-6xl py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs uppercase tracking-widest text-muted-foreground mb-10">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-24">
          {/* LEFT: Image Gallery */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden rounded-2xl border border-border">
              <img
                src={mainImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                  Sold Out
                </div>
              )}
              {isLowStock && !isOutOfStock && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                  Only {currentStock} left!
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden border-2 transition-all rounded-lg ${
                      selectedImage === idx ? "border-accent ring-1 ring-accent" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="md:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="space-y-3">
                {product.category && (
                  <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">
                    {product.category.name}
                  </span>
                )}
                <h1 className="text-3xl lg:text-4xl font-serif font-medium leading-tight">
                  {product.name}
                </h1>
                <p className="text-2xl font-medium text-accent">
                  {formatPrice(currentPrice, currency)}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-muted-foreground text-sm leading-relaxed border-t border-b border-border py-5">
                  {product.description}
                </p>
              )}

              {/* Variant Selector */}
              {hasVariants && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold uppercase tracking-wider">
                    Select Option <span className="text-destructive">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => {
                      const vStock = variant.stock_quantity ?? 0;
                      const vOutOfStock = vStock === 0;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => !vOutOfStock && handleVariantSelect(variant.id)}
                          disabled={vOutOfStock}
                          className={`px-4 py-2.5 border-2 rounded-lg text-sm font-medium transition-all ${
                            selectedVariantId === variant.id
                              ? 'border-primary bg-primary text-primary-foreground'
                              : vOutOfStock
                                ? 'border-border text-muted-foreground opacity-40 cursor-not-allowed line-through'
                                : 'border-border hover:border-primary text-foreground'
                          }`}
                        >
                          {variant.name}
                          {variant.price && variant.price !== product.price && (
                            <span className="ml-1 text-xs">({formatPrice(variant.price, currency)})</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {hasVariants && !selectedVariantId && (
                    <p className="text-xs text-destructive">Please select an option to add to cart</p>
                  )}
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center border border-border bg-card rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted text-muted-foreground transition-colors"
                      disabled={isOutOfStock}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(quantity + 1, currentStock || 99))}
                      className="p-3 hover:bg-muted text-muted-foreground transition-colors"
                      disabled={isOutOfStock}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className={`w-full h-14 text-xs uppercase tracking-[0.15em] font-bold rounded-full transition-all ${
                    !canAddToCart
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:opacity-90 shadow-lg'
                  }`}
                  disabled={!canAddToCart}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-3 w-4 h-4" />
                  {isOutOfStock ? 'Sold Out' : hasVariants && !selectedVariantId ? 'Select an Option' : 'Add to Bag'}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fast Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">14-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <div className="border-t border-border pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium mb-4">You May Also Like</h2>
            <div className="w-12 h-px bg-accent mx-auto"></div>
          </div>
          <ProductGrid
            categorySlug={product.category?.slug}
            searchQuery=""
            sortBy="featured"
            limit={4}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
