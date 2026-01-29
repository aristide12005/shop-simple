import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: The Narrative */}
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-brand-dark leading-tight">
              Honoring tradition, <br />
              <span className="text-design-teal italic">embracing comfort.</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At Accicoa, we believe that style should never come at the expense of dignity or comfort.
                In a world of fast fashion, we choose to slow down.
              </p>
              <p>
                Our collections are inspired by the rich heritage of African artistry,
                reimagined for the contemporary wardrobe. Every stitch tells a story of
                excellence, patience, and respect for the wearer.
              </p>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="link" className="text-brand-dark font-medium hover:text-design-teal p-0 h-auto text-lg group">
                  Read our full story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: The Visual Anchor */}
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-200 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop"
                alt="Craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Decorative "Badge" - Adds depth */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg border border-gray-100 hidden md:block">
              <p className="font-heading text-4xl text-design-teal font-bold">100%</p>
              <p className="text-sm font-medium text-brand-dark uppercase tracking-wide mt-1">Authentic Quality</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
