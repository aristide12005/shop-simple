import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShopMegaMenu from '@/components/ShopMegaMenu';
import ShopFilters from '@/components/ShopFilters';
import ProductGrid from '@/components/ProductGrid';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Shop() {
    const [sortBy, setSortBy] = useState("featured");

    return (
        <div className="min-h-screen bg-design-bg text-foreground font-sans">
            <Header />

            {/* 1. Header Section: Crafted for Kings & Queens (Removed) */}


            {/* 2. Mega Menu (Visual Navigation) */}
            <ShopMegaMenu />

            <main className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Sidebar: Filters (1 Col) */}
                    <aside className="hidden md:block md:col-span-1">
                        <ShopFilters sortBy={sortBy} onSortChange={setSortBy} />
                    </aside>

                    {/* Main Content: Product Grid (3 Cols) */}
                    <div className="md:col-span-3">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-500 text-sm">Showing results</p>
                            {/* Mobile Filter Toggle could go here */}
                        </div>
                        <ProductGrid sortBy={sortBy} />

                        {/* Pagination / Load More */}
                        <div className="mt-12 text-center">
                            <Button variant="outline" className="px-8 border-design-teal text-design-teal hover:bg-design-teal hover:text-white uppercase tracking-widest">
                                Load More Products
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Ancestral Modernity Section (Retained from previous design) */}
                <section className="mt-20 py-20 bg-muted/30 rounded-none border border-border text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase">
                        ANCESTRAL MODERNITY
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                        We don't just sell clothes; we export culture. Join the movement redefining African silhouette on the global stage.
                    </p>
                    <Link to="/collections">
                        <Button
                            size="lg"
                            className="rounded-none bg-foreground text-background hover:bg-brand-secondary hover:text-brand-dark px-10 h-14 text-lg font-bold shadow-none uppercase tracking-widest"
                        >
                            JOIN THE TRIBE <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </section>

            </main>
            <Footer />
        </div>
    );
}
