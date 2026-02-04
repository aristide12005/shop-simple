import { Sparkles, Truck, Shield } from "lucide-react";

const values = [
    {
        icon: Sparkles,
        title: "Artisan Craft",
        description: "Handcrafted preserving traditional techniques.",
    },
    {
        icon: Truck,
        title: "Global Delivery",
        description: "Shipping to 100+ countries with care.",
    },
    {
        icon: Shield,
        title: "Sustainable",
        description: "Ethical sourcing honoring our heritage.",
    },
];

export default function BrandTrust() {
    return (
        <section className="py-10 bg-background border-t border-border/40">
            <div className="container-luxury">
                <div className="flex flex-col md:flex-row justify-between items-center divide-y md:divide-y-0 md:divide-x divide-border/40">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="flex-1 flex items-center justify-center gap-6 px-4 py-4 md:py-0 w-full md:w-auto"
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 text-foreground">
                                <value.icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>

                            {/* Text */}
                            <div className="text-left">
                                <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                                    {value.title}
                                </h3>
                                <p className="font-sans text-muted-foreground text-sm leading-snug">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
