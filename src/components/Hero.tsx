import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax-like fixed feel - Apple Style */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2800&auto=format&fit=crop')",
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 md:bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">

        {/* Subtle Brand Tag - Aesop Style Typography */}
        <span className="mb-8 inline-block text-logo-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase opacity-0 animate-fade-in-up border-b border-logo-gold pb-2" style={{ animationDelay: '0.2s' }}>
          Modern African Luxury
        </span>

        {/* Cinematic Heading - Massive Serif */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl text-white font-bold leading-none mb-8 tracking-tight opacity-0 animate-fade-in-up drop-shadow-2xl" style={{ animationDelay: '0.4s' }}>
          Elegance <br className="md:hidden" /> Redefined.
        </h1>

        {/* Refined Subtitle */}
        <p className="max-w-xl text-lg md:text-xl text-neutral-200 font-light leading-relaxed mb-12 opacity-0 animate-fade-in-up tracking-wide" style={{ animationDelay: '0.6s' }}>
          Timeless pieces crafted with heritage and designed for the contemporary soul.
        </p>

        {/* Primary Action - Ghost/Glass Button */}
        <div className="flex flex-col md:flex-row gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Link to="/shop">
            <Button size="lg" className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-logo-charcoal hover:scale-105 transition-all duration-500 rounded-full px-12 py-8 text-sm uppercase tracking-widest font-bold min-w-[220px]">
              Explore Collection
            </Button>
          </Link>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>
    </section>
  );
}
