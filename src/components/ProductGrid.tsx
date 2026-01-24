import { ShoppingBag, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/hooks/useCollections";

interface ProductGridProps {
    sortBy?: string;
}

export default function ProductGrid({ sortBy = "featured" }: ProductGridProps) {
    const { data: products, isLoading } = useCollections();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 w-full col-span-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12 col-span-full bg-muted rounded-lg">
                <p className="text-muted-foreground">No products found in the catalog.</p>
            </div>
        );
    }

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return Number(a.price) - Number(b.price);
            case "price-high":
                return Number(b.price) - Number(a.price);
            case "newest":
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default:
                return 0;
        }
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => {
                const imageUrl = product.collection_images?.[0]?.image_url || "/placeholder.svg";

                return (
                    <div key={product.id} className="group relative bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                <Button size="icon" className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground rounded-full">
                                    <ShoppingBag className="w-5 h-5" />
                                </Button>
                                <Link to={`/product/${product.id}`}>
                                    <Button size="icon" className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground rounded-full">
                                        <Eye className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="p-4 text-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Collection</p>
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                            <p className="font-serif text-primary font-medium">${Number(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
