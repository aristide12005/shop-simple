import { useParams, Link } from "react-router-dom";
import { useProductCollection } from "@/hooks/useProductCollections";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";

export default function CollectionDetails() {
    const { id } = useParams<{ id: string }>();
    const { data: collection, isLoading } = useProductCollection(id || "");

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-foreground" />
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Collection Not Found</h1>
                <Link to="/collections">
                    <Button>Back to Collections</Button>
                </Link>
            </div>
        );
    }

    // Determine Banner Image
    let bannerUrl = collection.banner_image_url;
    if (!bannerUrl) {
        // Fallback logic similar to CollectionsGrid if needed, or default image
        bannerUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200";
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={bannerUrl}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
                        {collection.name}
                    </h1>
                    {collection.description && (
                        <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
                            {collection.description}
                        </p>
                    )}

                    <Link to={`/shop?collection=${collection.id}`}>
                        <Button
                            size="lg"
                            className="rounded-none bg-white text-black hover:bg-logo-brown hover:text-white px-8 h-12 text-base uppercase tracking-widest font-bold animate-fade-up"
                            style={{ animationDelay: "200ms" }}
                        >
                            Shop Collection <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Collection Products */}
            <main className="container mx-auto px-4 py-20">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-serif font-medium">Collection Pieces</h2>
                    <Link to={`/shop?collection=${collection.id}`} className="text-sm uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors">
                        View All in Shop
                    </Link>
                </div>

                <ProductGrid
                    collectionId={collection.id}
                    limit={8} // Show top 8 products only? Or remove limit to show all? User said "products in that single collection". Let's show all or a good amount.
                    // Actually, ProductGrid handles pagination internally if we want, but "limit" disables pagination usually.
                    // Let's passed itemsPerPage=12 to show a full grid.
                    itemsPerPage={12}
                />

                <div className="mt-16 text-center">
                    <Link to={`/shop?collection=${collection.id}`}>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-none px-10 h-14 text-base uppercase tracking-widest"
                        >
                            View Full Collection in Shop
                        </Button>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
