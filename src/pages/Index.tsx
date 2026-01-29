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
        <section id="collections" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl md:text-4xl text-center text-brand-dark mb-4">
              Curated Collections
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-lg">
              Explore our range of thoughtfully designed pieces, crafted for the modern lifestyle.
            </p>
            <CollectionsGrid />
          </div>
        </section>

        {/* 4. The Essentials: "Timeless Favorites" (Not "Trending") */}
        <FeaturedEssentials />
      </main>

      <Footer />
    </div>
  );
}
