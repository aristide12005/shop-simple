import { Sparkles, Truck, Shield, CreditCard, Globe } from "lucide-react";

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

const partners = [
    { name: "DHL", type: "delivery" },
    { name: "FedEx", type: "delivery" },
    { name: "UPS", type: "delivery" },
    { name: "VISA", type: "payment" },
    { name: "Mastercard", type: "payment" },
    { name: "PayPal", type: "payment" },
    { name: "Stripe", type: "payment" },
    { name: "Amex", type: "payment" },
];

export default function BrandTrust() {
    return (
        <section className="py-12 bg-background border-t border-border/40">
            <div className="container-luxury">

                {/* Compact Value Props */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-12">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="flex items-center gap-4 animate-fade-up group hover:bg-muted/30 p-4 rounded-xl transition-colors cursor-default"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground group-hover:scale-110 transition-transform duration-500">
                                <value.icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>

                            {/* Text */}
                            <div className="text-left">
                                <h3 className="font-serif text-base font-medium text-foreground mb-1">
                                    {value.title}
                                </h3>
                                <p className="font-sans text-muted-foreground text-xs leading-snug">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Partner Marquee */}
                <div className="relative border-t border-border/40 pt-8 overflow-hidden pause-on-hover">
                    {/* Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                    <div className="flex w-max animate-scroll">
                        {/* Double the list for seamless loop */}
                        {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                            <div key={`${partner.name}-${index}`} className="flex items-center justify-center mx-8 md:mx-12 opacity-50 hover:opacity-100 transition-opacity duration-300 select-none">
                                <span className={`text-xl md:text-2xl font-bold tracking-tight ${partner.name === "DHL" ? "font-sans italic font-black text-[#D40511]" :
                                        partner.name === "FedEx" ? "font-sans font-bold text-[#4D148C]" :
                                            partner.name === "VISA" ? "font-serif italic text-[#1A1F71]" :
                                                partner.name === "PayPal" ? "font-sans font-bold text-[#003087]" :
                                                    "font-serif text-foreground"
                                    }`}>
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
