import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1590735213920-68192a487bc2?q=80&w=2070&auto=format&fit=crop"
          alt="African fashion model"
          className="w-full h-full object-cover object-center animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-6">
        <span
          className="text-sm md:text-base font-sans tracking-luxury uppercase text-white/80 mb-6 alpha opacity-0 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          Premium African Fashion
        </span>

        <h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 text-balance max-w-4xl opacity-0 animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          Elegance Rooted in Heritage
        </h1>

        <p
          className="font-sans text-lg md:text-xl text-white/80 max-w-xl mb-12 font-light opacity-0 animate-fade-up"
          style={{ animationDelay: "700ms" }}
        >
          Discover timeless pieces that celebrate African craftsmanship with contemporary sophistication
        </p>

        <a
          href="#collections"
          className="btn-gold opacity-0 animate-fade-up"
          style={{ animationDelay: "900ms" }}
        >
          Explore Collections
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 opacity-0 animate-fade-in"
        style={{ animationDelay: "1500ms" }}
      >
        <div className="animate-bounce duration-[2s]">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
