import { ShieldCheck, Ruler, Truck } from "lucide-react";

export default function BrandTrust() {
    const features = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-design-teal" />,
            title: "Quality Fabrics",
            text: "Premium materials that last."
        },
        {
            icon: <Ruler className="w-8 h-8 text-design-teal" />,
            title: "Perfect Fits",
            text: "Designed for everyday life."
        },
        {
            icon: <Truck className="w-8 h-8 text-design-teal" />,
            title: "Easy Returns",
            text: "Shop with peace of mind."
        }
    ];

    return (
        <section className="py-16 bg-[#F8F9FA]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300">
                            <div className="p-3 bg-white rounded-full shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="font-heading text-xl font-bold text-brand-dark">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
