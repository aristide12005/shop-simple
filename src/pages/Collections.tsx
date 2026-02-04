import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

import { useProductCollections } from '@/hooks/useProductCollections';
import { Loader2 } from 'lucide-react';

export default function Collections() {
    const { data: collections, isLoading } = useProductCollections();

    // Filter only active collections
    const activeCollections = collections?.filter(c => c.is_active) || [];

    return (
        <div className="min-h-screen bg-design-bg text-foreground font-sans">
            <Header />
            <main className="pb-20 pt-10">
                <div className="container mx-auto px-4 md:px-8 text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">OUR COLLECTIONS</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our curated selection of authentic African craftsmanship.</p>
                </div>

                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : activeCollections.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground">
                            <p>No active collections found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {activeCollections.map((collection) => (
                                <Link key={collection.id} to={`/collections/${collection.id}`} className="group relative h-96 overflow-hidden rounded-lg block">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                                    <img
                                        src={collection.banner_image_url || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"}
                                        alt={collection.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                                        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-2 tracking-widest text-center px-4">{collection.name}</h2>
                                        {collection.description && (
                                            <p className="text-sm md:text-base mb-4 max-w-md text-center px-4 opacity-80 line-clamp-2">
                                                {collection.description}
                                            </p>
                                        )}
                                        <span className="text-sm font-medium uppercase tracking-widest border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                            View Collection
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
