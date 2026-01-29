import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { Button } from "./ui/button";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, ArrowRight } from "lucide-react";

export default function FeaturedEssentials() {
    const { data: products, isLoading } = useProducts();
    const navigate = useNavigate();

    // Limit to 3 or 6 for a perfect grid
    const featuredProducts = products?.slice(0, 3) || [];

    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-4 md:px-12">

                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="text-logo-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-fade-in-up">
                        Curated Selection
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl text-logo-charcoal animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Essential Luxuries
                    </h2>
                    <div className="w-px h-16 bg-logo-gold/30 mx-auto mt-8"></div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-logo-gold" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                        {featuredProducts.map((product, idx) => {
                            const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

                            return (
                                <div
                                    key={product.id}
                                    className="group cursor-pointer animate-fade-in-up"
                                    style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                        />

                                        {/* Ghost Button Overlay */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <Button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-white text-logo-charcoal hover:bg-logo-charcoal hover:text-white rounded-full px-8 py-6 uppercase tracking-widest text-xs font-bold shadow-lg">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Minimal Info */}
                                    <div className="text-center space-y-2">
                                        <h3 className="font-heading text-xl text-logo-charcoal">
                                            {product.name}
                                        </h3>
                                        <p className="text-logo-gold font-medium text-sm tracking-wide">
                                            ${Number(product.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="text-center mt-24">
                    <Link to="/shop">
                        <Button variant="outline" className="border-logo-charcoal text-logo-charcoal hover:bg-logo-charcoal hover:text-white rounded-full px-10 py-6 uppercase tracking-[0.2em] text-xs transition-all duration-300">
                            View All Products
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
