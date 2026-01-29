import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToCollections = () => {
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col lg:flex-row bg-[#FAF9F6]">
      {/* LEFT: Content (Editorial Style) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
        <div className="max-w-xl text-left space-y-8">
          <div className="hidden lg:block w-20 h-1 bg-logo-brown mb-8" />

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-brand-dark leading-[1.1] animate-fade-in-up">
            <span className="block text-logo-brown text-2xl md:text-3xl font-sans font-medium mb-4 tracking-widest uppercase">
              The African Corner
            </span>
            Authentic craft, <br />
            <span className="italic text-slate-500">modern soul.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover a curated collection of premium African products, where traditional artistry meets contemporary design.
          </p>

          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              onClick={scrollToCollections}
              className="bg-brand-dark text-white rounded-none px-10 py-7 text-sm uppercase tracking-[0.2em] hover:bg-logo-brown transition-colors duration-500"
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT: Visual (Immersive Image) */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative order-1 lg:order-2 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/10 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop"
          alt="African Fashion Lifestyle"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]"
        />
      </div>
    </section>
  );
}
