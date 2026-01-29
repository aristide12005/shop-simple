import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CollectionsGrid from '@/components/CollectionsGrid';
import FeaturedEssentials from '@/components/FeaturedEssentials';
import BrandTrust from '@/components/BrandTrust';
import BrandQuote from '@/components/BrandQuote';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Header />

      <main>
        {/* 1. Hero (Welcome) */}
        <Hero />

        {/* 2. Featured Collections */}
        <CollectionsGrid limit={4} />

        {/* 3. Selected Products (Essentials) */}
        <FeaturedEssentials />

        {/* 4. Value Propositions (Brand Trust) */}
        <BrandTrust />

        {/* 5. Brand Quote */}
        <BrandQuote />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}