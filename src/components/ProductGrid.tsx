import { ShoppingBag, Eye, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

interface ProductGridProps {
    sortBy?: string;
    searchQuery?: string;
    priceRange?: number[];
    categorySlug?: string | null;
    collectionId?: string | null;
    limit?: number;
    page?: number;
    itemsPerPage?: number;
    onTotalCountChange?: (count: number) => void;
}

export default function ProductGrid({
    // Standard Catalog Layout
    sortBy = "featured",
    searchQuery = "",
    priceRange = [0, 1000],
    categorySlug = null,
    collectionId = null,
    limit,
    page = 1,
    itemsPerPage = 9,
    onTotalCountChange
}: ProductGridProps) {
    const { data: products, isLoading } = useProducts();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Filter products
    const filteredProducts = (products || []).filter(product => {
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        const price = Number(product.price);
        if (price < priceRange[0] || price > priceRange[1]) return false;
        if (categorySlug && product.category?.slug !== categorySlug) return false;
        if (collectionId && product.collection_id !== collectionId) return false;
        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low": return Number(a.price) - Number(b.price);
            case "price-high": return Number(b.price) - Number(a.price);
            case "newest": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default: return 0;
        }
    });

    // Report total count to parent for pagination
    useEffect(() => {
        if (onTotalCountChange) {
            onTotalCountChange(sortedProducts.length);
        }
    }, [sortedProducts.length, onTotalCountChange]);

    // Apply pagination or limit
    let displayedProducts = sortedProducts;
    if (limit) {
        displayedProducts = sortedProducts.slice(0, limit);
    } else {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        displayedProducts = sortedProducts.slice(startIndex, endIndex);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 w-full col-span-full">
                <Loader2 className="w-8 h-8 animate-spin text-logo-brown" />
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12 col-span-full bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-sans">No products found in the catalog.</p>
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-12 col-span-full bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-sans">No products match your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedProducts.map((product) => {
                const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";
                const stockQty = product.stock_quantity ?? 0;
                const isOutOfStock = stockQty === 0;

                return (
                    <div key={product.id} className="group cursor-pointer">
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

                                {/* Catalog Style: Buttons appear at bottom of image on hover */}
                                <div
                                    className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 z-20"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Button
                                        className={`w-full shadow-sm backdrop-blur-sm transition-colors duration-300 rounded-none uppercase tracking-widest text-xs font-bold ${isOutOfStock
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
                                        <ShoppingBag className="w-4 h-4 mr-2" />
                                        {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="w-full bg-black/80 text-white hover:bg-black hover:text-white shadow-sm backdrop-blur-sm rounded-none uppercase tracking-widest text-xs"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/product/${product.id}`);
                                        }}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Details
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
                                        ${Number(product.price).toFixed(0)}
                                    </span>
                                    <span className="text-muted-foreground text-sm font-normal">
                                        total
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
