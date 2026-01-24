
import Header from '@/components/Header';
import CollectionsGrid from '@/components/CollectionsGrid';
import Footer from '@/components/Footer';

export default function Collections() {
    return (
        <div className="min-h-screen bg-design-bg text-foreground font-sans">
            <Header />
            <main className="pb-20 pt-10">
                <div className="container mx-auto px-4 md:px-8 text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">OUR COLLECTIONS</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our curated selection of authentic African craftsmanship.</p>
                </div>
                <CollectionsGrid />
            </main>
            <Footer />
        </div>
    );
}
