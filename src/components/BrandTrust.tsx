import { Sparkles, Truck, Shield } from "lucide-react";

const values = [
    {
        icon: Sparkles,
        title: "Artisan Craftsmanship",
        description: "Each piece is handcrafted by skilled artisans, preserving traditional techniques passed down through generations.",
    },
    {
        icon: Truck,
        title: "Worldwide Delivery",
        description: "We ship to over 100 countries with careful packaging to ensure your pieces arrive in perfect condition.",
    },
    {
        icon: Shield,
        title: "Sustainable Practice",
        description: "Committed to ethical sourcing and sustainable materials, honoring both our heritage and our planet.",
    },
];

export default function BrandTrust() {
    return (
        <section className="section-padding bg-background">
            <div className="container-luxury">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="text-center animate-fade-up"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border mb-6">
                                <value.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
                                {value.title}
                            </h3>

                            {/* Description */}
                            <p className="font-sans text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                                {value.description}
                            </p>

                            {/* Separator (hidden on last item) */}
                            {index < values.length - 1 && (
                                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-border" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
