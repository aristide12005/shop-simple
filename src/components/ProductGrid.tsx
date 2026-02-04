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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => {
                const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";
                const stockQty = product.stock_quantity ?? 0;
                const isOutOfStock = stockQty === 0;
                const isLowStock = stockQty > 0 && stockQty <= 5;

                return (
                    <div key={product.id} className="group relative bg-transparent">
                        {/* Image Container */}
                        <div
                            className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 relative mb-4 shadow-sm group-hover:shadow-md transition-all duration-500 cursor-pointer"
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className={`w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out ${isOutOfStock ? 'opacity-60 grayscale-[30%]' : ''}`}
                            />

                            {/* Stock Badge */}
                            {isOutOfStock && (
                                <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                                    Sold Out
                                </div>
                            )}
                            {isLowStock && (
                                <div className="absolute top-3 left-3 bg-logo-ochre text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                                    Only {stockQty} left!
                                </div>
                            )}

                            {/* Catalog Style: Buttons appear at bottom of image on hover */}
                            <div
                                className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Button
                                    className={`w-full shadow-sm backdrop-blur-sm transition-colors duration-300 rounded-none uppercase tracking-widest text-xs font-bold ${
                                        isOutOfStock 
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                            : 'bg-white/95 text-black hover:bg-logo-brown hover:text-white'
                                    }`}
                                    disabled={isOutOfStock}
                                    onClick={(e) => {
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

                        {/* Product Info - Clean & Readable */}
                        <div className="space-y-1 text-center">
                            {product.category && (
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                    {product.category.name}
                                </p>
                            )}
                            <Link to={`/product/${product.id}`}>
                                <h3 className="font-sans text-lg text-brand-dark group-hover:text-logo-brown transition-colors duration-300">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="font-heading text-lg font-medium text-logo-brown">
                                ${Number(product.price).toFixed(2)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
