import { ShieldCheck, Truck, Recycle } from "lucide-react";

export default function BrandTrust() {
    const benefits = [
        {
            icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-logo-charcoal" strokeWidth={1} />,
            title: "Authentic & Quality",
            description: "Every piece is verified for authenticity and crafted with premium materials."
        },
        {
            icon: <Truck className="w-8 h-8 md:w-10 md:h-10 text-logo-charcoal" strokeWidth={1} />,
            title: "Complimentary Shipping",
            description: "Enjoy free worldwide delivery on all orders over $250."
        },
        {
            icon: <Recycle className="w-8 h-8 md:w-10 md:h-10 text-logo-charcoal" strokeWidth={1} />,
            title: "Sustainable Heritage",
            description: "Committed to preserving African craftsmanship through sustainable practices."
        }
    ];

    return (
        <section className="py-24 bg-neutral-50/50">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
                            <div className="mb-6 bg-white p-6 rounded-full shadow-sm">
                                {benefit.icon}
                            </div>
                            <h3 className="font-heading text-xl text-logo-charcoal mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-500 font-light leading-relaxed max-w-xs">
                                {benefit.description}
                            </p>
                        </div>
                    );
}
