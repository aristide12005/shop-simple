import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CollectionsGrid from '@/components/CollectionsGrid';
import FeaturedEssentials from '@/components/FeaturedEssentials';
import BrandTrust from '@/components/BrandTrust';
import LifestyleMessage from '@/components/LifestyleMessage';
import BrandQuote from '@/components/BrandQuote';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-logo-charcoal font-sans selection:bg-logo-gold/30">
      <Header />

      <main>
        {/* 1. Hero (Welcome) - Full Viewport */}
        <Hero />

        {/* 2. Brand Quote (Narrative Anchor) */}
        <BrandQuote />

        {/* 3. Top Categories (Collections) */}
        <section id="collections" className="py-0 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <CollectionsGrid limit={3} hideHeader={true} />
          </div>
        </section>

        {/* 4. Featured Items (Essentials) - Premium Grid */}
        <FeaturedEssentials />

        {/* 5. Brand Trust (Why Buy Here) */}
        <BrandTrust />

        {/* 6. Lifestyle Message (Visual) */}
        <LifestyleMessage />
      </main>

      {/* 7. Footer (Clean) */}
      <Footer />
    </div>
  );
}