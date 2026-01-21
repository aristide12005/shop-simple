import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CollectionsGrid from '@/components/CollectionsGrid';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <CollectionsGrid />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
