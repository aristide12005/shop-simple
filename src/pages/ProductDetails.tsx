import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const fetchProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      collection_images(image_url)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">
        <Loader2 className="w-8 h-8 animate-spin text-design-teal" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F9FAFB] text-center px-4">
        <h2 className="text-2xl font-heading mb-4">Product Not Found</h2>
        <Link to="/shop">
          <Button variant="outline">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const images = product.collection_images?.map(img => img.image_url) || [];
  const mainImage = images.length > 0
    ? images[selectedImage]
    : "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Breadcrumb - Clean navigation anchor */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8 animate-fade-in-up">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT: Image Section */}
          {/* Fixed "Large Excess": Added max-w constraints so image doesn't explode on large screens */}
          <div className="md:col-span-7 space-y-6">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 max-w-lg mx-auto md:mx-0 md:max-w-full">
              <div className="aspect-[3/4] md:aspect-[4/5] relative">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 max-w-lg mx-auto md:mx-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border transition-all ${selectedImage === idx ? "border-design-teal shadow-sm ring-1 ring-design-teal" : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description moved here for Desktop to fill space naturally */}
            <div className="hidden md:block prose prose-stone max-w-none mt-10 pt-10 border-t border-gray-100">
              <h3 className="font-heading text-xl mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* RIGHT: Product Details */}
          {/* Fixed "Weak Looks": Sticky positioning anchors the info so it doesn't float away */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-28 space-y-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm md:shadow-none md:bg-transparent md:border-none md:p-0">

              <div className="space-y-4">
                {product.category && (
                  <span className="text-design-teal text-xs font-bold uppercase tracking-widest bg-design-teal/10 px-2 py-1 rounded">
                    {product.category.name}
                  </span>
                )}

                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-design-dark leading-tight">
                  {product.name}
                </h1>

                <p className="text-2xl font-serif text-design-dark font-medium">
                  ${Number(product.price).toFixed(2)}
                </p>
              </div>

              {/* Mobile Description (Hidden on Desktop) */}
              <div className="md:hidden text-gray-600 text-sm leading-relaxed border-t border-b border-gray-100 py-4">
                {product.description}
              </div>

              {/* Action Area */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Quantity</span>
                  <div className="flex items-center border border-gray-200 rounded-md bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-gray-50 text-gray-500 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-design-dark text-white hover:bg-design-dark/90 h-12 text-base shadow-md transition-transform active:scale-[0.98]"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  Add to Bag
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
