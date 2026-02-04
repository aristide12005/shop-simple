import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShopMegaMenu from '@/components/ShopMegaMenu';
import ShopFilters from '@/components/ShopFilters';
import ProductGrid from '@/components/ProductGrid';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 9;

export default function Shop() {
    const [searchParams] = useSearchParams();
    const categoryDetail = searchParams.get('category');
    const collectionId = searchParams.get('collection');

    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    const handleTotalCountChange = useCallback((count: number) => {
        setTotalProducts(count);
    }, []);

    // Reset to page 1 when filters change
    const handleSortChange = (value: string) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-design-bg text-foreground font-sans">
            <Header />

            {/* Mega Menu (Visual Navigation) */}
            <ShopMegaMenu />

            <main className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Sidebar: Filters (1 Col) */}
                    <aside className="hidden md:block md:col-span-1">
                        <ShopFilters
                            sortBy={sortBy}
                            onSortChange={handleSortChange}
                            priceRange={priceRange}
                            setPriceRange={handlePriceRangeChange}
                            searchQuery={searchQuery}
                            setSearchQuery={handleSearchChange}
                        />
                    </aside>

                    {/* Main Content: Product Grid (3 Cols) */}
                    <div className="md:col-span-3">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-500 text-sm">
                                {categoryDetail
                                    ? `Showing results for ${categoryDetail}`
                                    : collectionId
                                        ? "Showing collection items"
                                        : `Showing ${Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalProducts)}-${Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of ${totalProducts} products`}
                            </p>
                        </div>
                        <ProductGrid
                            sortBy={sortBy}
                            searchQuery={searchQuery}
                            priceRange={priceRange}
                            categorySlug={categoryDetail}
                            collectionId={collectionId}
                            page={currentPage}
                            itemsPerPage={ITEMS_PER_PAGE}
                            onTotalCountChange={handleTotalCountChange}
                        />

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="border-border text-foreground hover:bg-muted"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </Button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                        <Button
                                            key={pageNum}
                                            variant={pageNum === currentPage ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 ${
                                                pageNum === currentPage 
                                                    ? 'bg-brand-dark text-white' 
                                                    : 'text-foreground hover:bg-muted'
                                            }`}
                                        >
                                            {pageNum}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="border-border text-foreground hover:bg-muted"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        )}
                    </div>

                </div>

                {/* Ancestral Modernity Section */}
                <section className="mt-20 py-20 bg-muted/30 rounded-none border border-border text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase">
                        ANCESTRAL MODERNITY
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                        We don't just sell clothes; we export culture. Join the movement redefining African silhouette on the global stage.
                    </p>
                    <Link to="/auth">
                        <Button
                            size="lg"
                            className="rounded-none bg-foreground text-background hover:bg-brand-secondary hover:text-brand-dark px-10 h-14 text-lg font-bold shadow-none uppercase tracking-widest"
                        >
                            Sign Up to Get Started <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </section>

            </main>
            <Footer />
        </div>
    );
}
