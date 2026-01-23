
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import CollectionsGrid from '@/components/CollectionsGrid';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const scrollToCollections = () => {
    const element = document.getElementById('collections');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="space-y-20 pb-20">
        <HeroSection />

        {/* Promotional Banner */}
        <section className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-primary text-brand-dark p-8 md:p-12 rounded-none relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="z-10 space-y-4 max-w-xl">
              <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none">
                The Harmattan <br /> Collection
              </h2>
              <p className="text-brand-dark/80 text-lg">
                Warm earth tones and heavy woven cottons designed to shield you from the wind while you stand out in the crowd.
              </p>
              <Button
                onClick={scrollToCollections}
                variant="secondary"
                className="rounded-none font-bold px-8 bg-brand-dark text-white hover:bg-white hover:text-brand-dark uppercase tracking-widest"
              >
                SHOP THE SEASON
              </Button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

            {/* Image Placeholder or Graphic */}
            <div className="relative z-10 w-full max-w-md aspect-video bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
              <span className="text-2xl font-bold">New Drop</span>
            </div>
          </div>
        </section>

        <div id="collections" className="pt-20">
          <div className="container mx-auto px-4 md:px-8 text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-4">CRAFTED FOR KINGS & QUEENS</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Authentic craftsmanship from Dakar to Lagos. Every stitch tells a story.</p>
          </div>
          <CollectionsGrid />
        </div>

        <section id="about" className="container mx-auto px-4 md:px-8 text-center py-20 bg-muted/30 rounded-none mx-4 border border-border">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground uppercase">
            ANCESTRAL MODERNITY
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            We don't just sell clothes; we export culture. Join the movement redefining African silhouette on the global stage.
          </p>
          <Button
            onClick={scrollToCollections}
            size="lg"
            className="rounded-none bg-foreground text-background hover:bg-brand-secondary hover:text-brand-dark px-10 h-14 text-lg font-bold shadow-none uppercase tracking-widest"
          >
            JOIN THE TRIBE <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
