import { ShieldCheck, Ruler, Truck } from "lucide-react";

export default function BrandTrust() {
    const features = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-logo-brown" />,
            title: "Quality Fabrics",
            text: "Premium materials that last."
        },
        {
            icon: <Ruler className="w-8 h-8 text-logo-brown" />,
            title: "Perfect Fits",
            text: "Designed for everyday life."
        },
        {
            icon: <Truck className="w-8 h-8 text-logo-brown" />,
            title: "Easy Returns",
            text: "Shop with peace of mind."
        }
    ];

    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group flex flex-col items-center text-center space-y-4 p-8 border border-gray-100 hover:border-logo-brown hover:shadow-sm transition-all duration-300 bg-white">
                            <div className="p-4 bg-neutral-50 rounded-full group-hover:bg-logo-brown/5 transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-heading text-xl font-bold text-brand-dark uppercase tracking-wide">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xs">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
