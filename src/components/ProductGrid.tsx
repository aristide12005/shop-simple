
import { ShoppingBag, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/hooks/useCollections";
import { useCart } from "@/context/CartContext";

interface ProductGridProps {
    sortBy?: string;
    searchQuery?: string;
    priceRange?: number[];
    category?: string | null;
}

export default function ProductGrid({
    sortBy = "featured",
    searchQuery = "",
    priceRange = [0, 1000],
    category = null
}: ProductGridProps) {
    const { data: products, isLoading } = useCollections();
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
                <p className="text-gray-500">No products found in the catalog.</p>
            </div>
        );
    }

    // Filter products
    const filteredProducts = products.filter(product => {
        // Filter by Search Query
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filter by Price Range
        const price = Number(product.price);
        if (price < priceRange[0] || price > priceRange[1]) {
            return false;
        }

        // Filter by Category - currently not implemented in schema
        // TODO: Add category field to products table for proper filtering

        return true;
    });

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-12 col-span-full bg-gray-50 rounded-lg">
                <p className="text-gray-500">No products match your filters.</p>
            </div>
        );
    }

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return Number(a.price) - Number(b.price);
            case "price-high":
                return Number(b.price) - Number(a.price);
            case "newest":
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default: // featured / default
                return 0;
        }
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => {
                // Use the first image if available, otherwise a placeholder
                const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

                return (
                    <div key={product.id} className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                        {/* Image Container */}
                        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <Button
                                    size="icon"
                                    className="bg-white text-black hover:bg-design-teal hover:text-white rounded-full"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                </Button>
                                <Link to={`/product/${product.id}`}>
                                    <Button size="icon" className="bg-white text-black hover:bg-design-teal hover:text-white rounded-full">
                                        <Eye className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 text-center">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-design-teal transition-colors line-clamp-1">{product.name}</h3>
                            <p className="font-serif text-design-red font-medium">${Number(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
