import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToCollections = () => {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#f8f9fa] overflow-hidden">
      {/* Background - Kept clean/neutral as per "Mature UI" guide */}

      <div className="container mx-auto px-4 text-center relative z-10 py-12">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 animate-fade-in-up leading-tight tracking-wider">
          Heritage-inspired clothing for <br />
          <span className="text-design-teal italic block mt-2">comfort and timeless style.</span>
        </h1>

        <p className="hidden md:block text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          {/* Optional subtext if needed, or remove if the header is enough as per "Simplicity" */}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Button
            onClick={scrollToCollections}
            size="lg"
            className="bg-brand-dark hover:bg-brand-dark/90 text-white text-lg px-8 py-6 shadow-md transition-transform hover:-translate-y-1"
          >
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
