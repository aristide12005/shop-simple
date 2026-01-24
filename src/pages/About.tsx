
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-design-bg font-sans flex flex-col">
            <Header />

            <main className="flex-grow">

                {/* Hero Section */}
                <section className="relative py-20 bg-design-teal text-white overflow-hidden">
                    <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
                            Our Story
                        </h1>
                        <p className="text-xl md:text-2xl font-serif max-w-3xl mx-auto opacity-90">
                            "Authentic craftsmanship from Dakar to Lagos. Every stitch tells a story of heritage, artistry, and the modern African silhouette."
                        </p>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </section>

                <div className="container mx-auto px-4 md:px-8 py-16 space-y-20">

                    {/* Quality Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-6 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                            <div className="w-12 h-12 bg-design-red/10 rounded-full flex items-center justify-center text-design-red">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold uppercase text-black">Uncompromised Quality</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                At Accicoa, we believe in the power of authenticity. Our fabrics are sourced directly from artisans in West Africa, ensuring that every piece you wear is not just a garment, but a piece of art. We combine traditional techniques with modern cuts to bring you beautiful, high-quality African inspired clothing that stands the test of time.
                            </p>
                        </div>
                        <div className="order-1 md:order-2 h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg animate-in zoom-in-95 duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"
                                alt="Quality Fabric"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Shipping & Policy Section (Canada Only) */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* Shipping */}
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 bg-[#188FA7]/10 rounded-2xl flex items-center justify-center text-[#188FA7] flex-shrink-0">
                                    <Truck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold uppercase mb-3">Exclusively Shipping to Canada</h3>
                                    <p className="text-gray-600 text-lg">
                                        Currently, we are proud to serve our community within Canada. All our orders are shipped locally to ensure the fastest delivery times and best service for our Canadian customers.
                                    </p>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
                                    <Heart className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold uppercase mb-3">Pay on Delivery</h3>
                                    <p className="text-gray-600 text-lg">
                                        We value your trust. For your convenience and peace of mind, the delivery fee is payable only when you receive your product. No hidden upfront shipping costs.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
