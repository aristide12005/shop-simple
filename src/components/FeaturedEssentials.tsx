import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export default function FeaturedEssentials() {
    const { data: products, isLoading } = useProducts();
    const displayProducts = products?.slice(0, 6) || [];

    if (isLoading) {
        return <div className="py-20 flex justify-center"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <section id="products" className="section-padding bg-secondary/30">
            <div className="container-luxury">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 animate-fade-up">
                    <div>
                        <span className="text-sm tracking-luxury uppercase text-muted-foreground mb-4 block">
                            New Arrivals
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {displayProducts.map((product, index) => {
                        const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800";

                        return (
                            <div
                                key={product.id}
                                className="group animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Link to={`/product/${product.id}`}>
                                    {/* Image Container */}
                                    <div className="relative img-zoom aspect-[3/4] bg-secondary mb-6 overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                                        {/* Quick Add Button - Visual Only for now to match design */}
                                        <button
                                            className="absolute bottom-4 left-4 right-4 btn-ghost opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/90 backdrop-blur"
                                        >
                                            View Details
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-2">
                                        <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                                            {typeof product.category === 'object' && product.category?.name ? product.category.name : "Essentials"}
                                        </span>
                                        <h3 className="font-serif text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                                            {product.name}
                                        </h3>
                                        <p className="font-sans text-foreground font-medium">
                                            ${Number(product.price).toFixed(2)}
                                        </p>
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
