import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/currency";

export default function FeaturedEssentials() {
    const { data: products, isLoading } = useProducts();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const displayProducts = products?.slice(0, 8) || [];

    if (isLoading) {
        return <div className="py-20 flex justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <section id="products" className="section-padding bg-secondary/30 overflow-hidden">
            <div className="container-luxury">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 animate-fade-up">
                    <div>
                        <span className="text-sm tracking-luxury uppercase text-muted-foreground mb-4 block">
                            New Arrivals
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground">
                            Selected Pieces
                        </h2>
                    </div>
                    <Link
                        to="/shop"
                        className="mt-6 md:mt-0 text-sm tracking-luxury uppercase text-foreground link-underline inline-block"
                    >
                        View All Products
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {displayProducts.map((product, index) => {
                        const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800";
                        const stockQty = product.stock_quantity ?? 0;
                        const isOutOfStock = stockQty === 0;

                        return (
                            <div
                                key={product.id}
                                className="group cursor-pointer animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Link to={`/product/${product.id}`} className="block">
                                    {/* Image Container */}
                                    <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${isOutOfStock ? 'grayscale-[50%]' : ''}`}
                                        />

                                        {/* Gradient Overlay for Top Controls Visibility */}
                                        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />



                                        {/* Heart Icon */}
                                        <div className="absolute top-4 right-4 text-white z-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-7 h-7 hover:scale-110 transition-transform drop-shadow-md"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                />
                                            </svg>
                                        </div>

                                        <div
                                            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-row gap-2 z-20 justify-center items-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Button
                                                className={`flex-1 shadow-sm backdrop-blur-sm transition-colors duration-300 rounded-full h-8 text-[10px] font-bold uppercase tracking-widest ${isOutOfStock
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-white/95 text-black hover:bg-logo-brown hover:text-white'
                                                    }`}
                                                disabled={isOutOfStock}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (!isOutOfStock) addToCart(product);
                                                }}
                                            >
                                                <ShoppingBag className="w-3 h-3 mr-1.5" />
                                                {isOutOfStock ? 'Sold' : 'Add'}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                className="flex-1 bg-black/80 text-white hover:bg-black hover:text-white shadow-sm backdrop-blur-sm rounded-full h-8 text-[10px] font-bold uppercase tracking-widest"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/product/${product.id}`);
                                                }}
                                            >
                                                <Eye className="w-3 h-3 mr-1.5" />
                                                View
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-base text-foreground group-hover:text-primary/80 transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-sm font-medium">
                                                <span>★</span>
                                                <span>4.8</span>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm line-clamp-1">
                                            {typeof product.category === 'object' && product.category?.name ? product.category.name : "Essentials"}
                                        </p>
                                        <div className="mt-1 flex items-baseline gap-2">
                                            <span className="text-foreground font-bold text-base">
                                                {formatPrice(product.price, (product as any).currency || 'USD')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
