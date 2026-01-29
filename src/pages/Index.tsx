import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CollectionsGrid from '@/components/CollectionsGrid';
import AboutSection from '@/components/AboutSection';
import FeaturedEssentials from '@/components/FeaturedEssentials'; // New Component
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-foreground font-sans selection:bg-design-teal/20">
      <Header />

      <main>
        {/* 1. The Welcome: Calm & Clear */}
        <Hero />

        {/* 2. The Philosophy: Establishes Trust immediately */}
        <div id="about">
          <AboutSection />
        </div>

        {/* 3. The Exploration: Guided Categories */}
        {/* 3. The Exploration: Guided Categories */}
        <section id="collections" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            {/* Header simplified as requested */}
            <h2 className="font-heading text-2xl md:text-3xl text-center text-brand-dark mb-12 leading-relaxed max-w-3xl mx-auto">
              Explore our curated selection of authentic African craftsmanship
            </h2>
            <CollectionsGrid limit={4} hideHeader={true} />
          </div>
        </section>

        {/* 4. The Essentials: "Timeless Favorites" (Not "Trending") */}
        <FeaturedEssentials />
      </main>

      <Footer />
    </div>
  );
}
