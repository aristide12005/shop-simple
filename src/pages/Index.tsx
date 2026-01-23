
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import CollectionsGrid from '@/components/CollectionsGrid';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="space-y-20 pb-20">
        <HeroSection />

        {/* Promotional Banner */}
        <section className="container mx-auto px-4 md:px-8">
          <div className="bg-brand-red text-white p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="z-10 space-y-4 max-w-xl">
              <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase leading-none">
                Winter Sale <br /> Is Here
              </h2>
              <p className="text-white/80 text-lg">
                Get up to 50% off on selected items. Upgrade your winter wardrobe with our premium collection.
              </p>
              <Button variant="secondary" className="rounded-full font-bold px-8 hover:bg-white hover:text-brand-red">
                Shop Now
              </Button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />

            {/* Image Placeholder or Graphic */}
            <div className="relative z-10 w-full max-w-md aspect-video bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
              <span className="font-heading text-2xl font-bold">50% OFF</span>
            </div>
          </div>
        </section>

        <CollectionsGrid />

        <section className="container mx-auto px-4 md:px-8 text-center py-20 bg-muted/30 rounded-3xl mx-4">
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-foreground uppercase">
            Elevate Your Style
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Our latest collection combines urban utility with modern aesthetics. Quality materials, bold designs.
          </p>
          <Button size="lg" className="rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-10 h-14 text-lg font-bold shadow-lg shadow-brand-cyan/20">
            Explore All <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
