import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CollectionsGrid from '@/components/CollectionsGrid';
import FeaturedEssentials from '@/components/FeaturedEssentials';
import BrandTrust from '@/components/BrandTrust';
import LifestyleMessage from '@/components/LifestyleMessage';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-foreground font-sans selection:bg-logo-ochre/20">
      <Header />

      <main>
        {/* 1. Hero (Welcome) */}
        <Hero />

        {/* 2. Top Categories (Collections - Limit 4) */}
        <section id="collections" className="py-10 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-heading text-2xl md:text-3xl text-center text-brand-dark mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore our curated selection of authentic African craftsmanship
            </h2>
            <CollectionsGrid limit={4} hideHeader={true} />
          </div>
        </section>

        {/* 3. Featured Items (Essentials - Limit 3) */}
        <FeaturedEssentials />

        {/* 4. Brand Trust (Why Buy Here) */}
        <BrandTrust />

        {/* 5. Lifestyle Message (Visual) */}
        <LifestyleMessage />
      </main>

      {/* 6. Footer (Clean) */}
      <Footer />
    </div>
  );
}
