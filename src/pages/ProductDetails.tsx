import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { formatPrice } from "@/lib/currency";

const fetchProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      category:categories(name, slug),
      collection_images(id, collection_id, variant_id, image_url, display_order, created_at)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="w-8 h-8 animate-spin text-logo-brown" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-neutral-50 text-center px-4">
        <h2 className="text-2xl font-heading mb-4 text-brand-dark">Product Not Found</h2>
        <Link to="/shop">
          <Button variant="outline" className="border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const images = product.collection_images?.map(img => img.image_url) || [];
  const mainImage = images.length > 0
    ? images[selectedImage]
    : "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs uppercase tracking-widest text-muted-foreground mb-12 animate-fade-in-up">
          <Link to="/" className="hover:text-logo-brown transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-logo-brown transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-dark font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-24">

          {/* LEFT: Image Gallery */}
          <div className="md:col-span-7 space-y-6">
            <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-sm border border-gray-100/50 rounded-[2rem]">
              <img
                src={mainImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 aspect-[3/4] flex-shrink-0 overflow-hidden border transition-all rounded-lg ${selectedImage === idx ? "border-logo-brown ring-1 ring-logo-brown" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Description */}
            <div className="hidden md:block prose prose-stone max-w-none mt-16 pt-10 border-t border-gray-100">
              <h3 className="font-heading text-xl mb-6 text-brand-dark uppercase tracking-wide">Product Details</h3>
              <p className="text-gray-600 leading-relaxed font-light">{product.description}</p>
            </div>
          </div>

          {/* RIGHT: Product Info (Sticky) */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-32 space-y-10">

              <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {product.category && (
                  <span className="text-logo-ochre text-xs font-bold uppercase tracking-[0.2em]">
                    {product.category.name}
                  </span>
                )}

                <h1 className="text-4xl lg:text-5xl font-heading font-medium text-brand-dark leading-tight">
                  {product.name}
                </h1>

                <p className="text-2xl font-sans text-logo-brown font-medium">
                  {formatPrice(product.price, (product as any).currency || 'USD')}
                </p>
              </div>

              {/* Mobile Description */}
              <div className="md:hidden text-gray-600 text-sm leading-relaxed border-t border-b border-gray-100 py-6 font-light">
                {product.description}
              </div>

              {/* Stock Status */}
              {(() => {
                const stockQty = product.stock_quantity ?? 0;
                const isOutOfStock = stockQty === 0;
                const isLowStock = stockQty > 0 && stockQty <= 5;

                return (
                  <>
                    {isOutOfStock && (
                      <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 text-sm font-medium uppercase tracking-wide text-center rounded-lg">
                        Currently Out of Stock
                      </div>
                    )}
                    {isLowStock && (
                      <div className="bg-logo-ochre/10 border border-logo-ochre/30 text-logo-ochre px-4 py-3 text-sm font-medium uppercase tracking-wide text-center rounded-lg">
                        Only {stockQty} left — Order soon!
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Actions */}
              <div className="space-y-8 pt-6">
                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">Quantity</span>
                  <div className="flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 text-gray-500 transition-colors"
                      disabled={(product.stock_quantity ?? 0) === 0}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(quantity + 1, product.stock_quantity ?? 99))}
                      className="p-3 hover:bg-gray-50 text-gray-500 transition-colors"
                      disabled={(product.stock_quantity ?? 0) === 0}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className={`w-full h-12 text-xs uppercase tracking-[0.15em] font-bold shadow-lg transition-all duration-300 rounded-full transform active:scale-[0.99] ${(product.stock_quantity ?? 0) === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300'
                      : 'bg-black text-white hover:bg-neutral-800'
                    }`}
                  disabled={(product.stock_quantity ?? 0) === 0}
                  onClick={() => addToCart({
                    ...product,
                    collection_images: product.collection_images || []
                  } as any)}
                >
                  <ShoppingBag className="mr-3 w-4 h-4" />
                  {(product.stock_quantity ?? 0) === 0 ? 'Out of Stock' : 'Add to Bag'}
                </Button>

                <p className="text-xs text-center text-gray-400 uppercase tracking-widest">
                  Free Shipping on orders over $200
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <div className="border-t border-gray-200 pt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-medium text-brand-dark mb-4">You May Also Like</h2>
            <div className="w-12 h-0.5 bg-logo-ochre mx-auto"></div>
          </div>
          <ProductGrid
            categorySlug={product.category?.slug}
            searchQuery=""
            sortBy="featured"
          />
        </div>

      </div>
    </div>
  );
}
