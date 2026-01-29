import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import { Button } from "./ui/button";

export default function FeaturedEssentials() {
    return (
        <section className="py-24 bg-white border-t border-gray-50">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header: Calm & Centered */}
                <div className="text-center mb-12">
                    <span className="text-design-teal text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                        Selected for You
                    </span>
                    {/* Title removed as per user request */}
                </div>

                {/* The Grid: Reusing ProductGrid but limiting items naturally via constraints */}
                {/* Note: Ideally pass a 'limit' prop to ProductGrid, or just let it flow. 
            For now, we let it display 3-6 items cleanly. */}
                <div className="min-h-[400px]">
                    <ProductGrid sortBy="featured" priceRange={[0, 1000]} limit={3} />
                </div>

                {/* The Action: "View All" */}
                <div className="text-center mt-12">
                    <Link to="/shop">
                        <Button variant="outline" size="lg" className="px-8 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-colors">
                            View All Products
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
