import { ShoppingBag, Eye, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";

interface ProductGridProps {
    sortBy?: string;
    searchQuery?: string;
    priceRange?: number[];
    categorySlug?: string | null;
    collectionId?: string | null;
    limit?: number;
}

export default function ProductGrid({
    sortBy = "featured",
    searchQuery = "",
    priceRange = [0, 1000],
    categorySlug = null,
    collectionId = null,
    limit
}: ProductGridProps) {
    const { data: products, isLoading } = useProducts();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 w-full col-span-full">
                <Loader2 className="w-8 h-8 animate-spin text-design-teal" />
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

    // Filter products
    const filteredProducts = products.filter(product => {
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        const price = Number(product.price);
        if (price < priceRange[0] || price > priceRange[1]) return false;
        if (categorySlug && product.category?.slug !== categorySlug) return false;
        if (collectionId && product.collection_id !== collectionId) return false;
        return true;
    });

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-12 col-span-full bg-gray-50 rounded-lg">
                <p className="text-gray-500 font-sans">No products match your filters.</p>
            </div>
        );
    }

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low": return Number(a.price) - Number(b.price);
            case "price-high": return Number(b.price) - Number(a.price);
            case "newest": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default: return 0;
        }
    });

    const displayedProducts = limit ? sortedProducts.slice(0, limit) : sortedProducts;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => {
                const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

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
                                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
                            />

                            {/* Catalog Style: Buttons appear at bottom of image on hover */}
                            <div
                                className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2"
                                onClick={(e) => e.stopPropagation()} // Prevent navigating when clicking action area
                            >
                                <Button
                                    className="w-full bg-white/90 text-black hover:bg-white hover:text-design-teal shadow-sm backdrop-blur-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                >
                                    <ShoppingBag className="w-4 h-4 mr-2" />
                                    Add to Bag
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full bg-black/70 text-white hover:bg-black hover:text-white shadow-sm backdrop-blur-sm"
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
                        <div className="space-y-1">
                            {product.category && (
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                    {product.category.name}
                                </p>
                            )}
                            <Link to={`/product/${product.id}`}>
                                <h3 className="font-sans text-lg text-brand-dark group-hover:text-design-teal transition-colors duration-300">
                                    {product.name}
                                </h3>
                            </Link>
                            <p className="font-heading text-lg font-medium text-design-dark">
                                ${Number(product.price).toFixed(2)}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
