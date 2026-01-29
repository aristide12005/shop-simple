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

    // Get top 6 featured items
    const featuredProducts = products?.slice(0, 6) || [];

    return (
        <section className="py-20 bg-neutral-50 border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-xl">
                        <span className="text-logo-ochre text-xs font-bold uppercase tracking-[0.2em] mb-2 block animate-fade-in-up">
                            Curated Selection
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl text-brand-dark animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Essential Luxuries
                        </h2>
                    </div>
                    <Link to="/shop" className="hidden md:block">
                        <Button variant="link" className="text-brand-dark hover:text-logo-brown group">
                            View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-logo-brown" />
                    </div>
                ) : (
                    <div className="relative">
                        {/* Horizontal Scroll Container */}
                        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                            {featuredProducts.map((product) => {
                                const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

                                return (
                                    <div
                                        key={product.id}
                                        className="min-w-[280px] md:min-w-[320px] snap-start group cursor-pointer"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-200">
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button className="w-full bg-white/90 backdrop-blur text-brand-dark hover:bg-logo-brown hover:text-white rounded-none uppercase text-xs tracking-widest font-bold">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                        <h3 className="font-sans text-lg text-brand-dark group-hover:text-logo-brown transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-logo-brown font-medium mt-1">
                                            ${Number(product.price).toFixed(2)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="md:hidden text-center mt-8">
                    <Link to="/shop">
                        <Button variant="outline" className="w-full border-brand-dark text-brand-dark">
                            View All Products
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
