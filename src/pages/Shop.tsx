
import Header from '@/components/Header';
import CollectionsGrid from '@/components/CollectionsGrid';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Shop() {
    return (
        <div className="min-h-screen bg-design-bg text-foreground font-sans">
            <Header />
            <main className="pb-20 pt-10">

                {/* Collections Grid Section */}
                <div className="container mx-auto px-4 md:px-8 text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">CRAFTED FOR KINGS & QUEENS</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Authentic craftsmanship from Dakar to Lagos. Every stitch tells a story.</p>
                </div>
                <CollectionsGrid />

                {/* Ancestral Modernity Section */}
                <section className="container mx-auto px-4 md:px-8 text-center py-20 bg-muted/30 rounded-none mx-4 border border-border mt-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground uppercase">
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
