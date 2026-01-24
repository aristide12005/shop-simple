
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import CollectionsGrid from '@/components/CollectionsGrid';
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
    <div className="min-h-screen bg-design-bg text-foreground font-sans">
      <Header />
      <main className="pb-0 overflow-hidden">
        <HeroSection />
      </main>

    </div>
  );
}
