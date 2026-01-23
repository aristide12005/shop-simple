
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";

export function HeroSection() {
    const scrollToCollections = () => {
        const element = document.getElementById('collections');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-background pt-4 pb-12 px-2 md:px-4">

            {/* 1. TOP MARQUEE BANNER (Scrolling Text) */}
            <div className="w-full overflow-hidden bg-foreground text-background py-2 mb-4">
                <div className="animate-marquee whitespace-nowrap flex gap-8 items-center text-sm font-bold tracking-widest uppercase">
                    <span>HANDCRAFTED IN THE MOTHERLAND</span> • <span>GLOBAL PAN-AFRICAN SHIPPING</span> • <span>AUTHENTIC TEXTILES</span> • <span>LIMITED ROYAL EDITIONS</span> • <span>WEAR YOUR ROOTS</span> •
                    <span>HANDCRAFTED IN THE MOTHERLAND</span> • <span>GLOBAL PAN-AFRICAN SHIPPING</span> • <span>AUTHENTIC TEXTILES</span> • <span>LIMITED ROYAL EDITIONS</span> • <span>WEAR YOUR ROOTS</span>
                </div>
            </div>

            <div className="container mx-auto max-w-[1600px]">
                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-12 md:grid-rows-2 gap-2 h-auto md:h-[800px]">

                    {/* A. HERO TEXT BLOCK (Top Left) */}
                    <div className="md:col-span-8 md:row-span-2 relative bg-secondary/30 p-8 md:p-16 flex flex-col justify-between group overflow-hidden">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
                                alt="Hero Model"
                                className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105 filter grayscale contrast-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-brand-primary text-brand-dark text-xs font-bold uppercase tracking-wider mb-4">
                                2026 Collection
                            </span>
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 uppercase">
                                WEAR YOUR <br />
                                LEGACY <br />
                                UNAPOLOGETICALLY
                            </h1>
                            <p className="text-white/90 text-lg mb-6 max-w-lg font-medium">
                                Where ancestral threads meet modern cuts. The new definition of African luxury.
                            </p>
                            <Button
                                onClick={scrollToCollections}
                                className="h-12 px-8 bg-white text-brand-dark hover:bg-brand-secondary hover:text-brand-dark transition-colors text-base font-semibold rounded-none uppercase"
                            >
                                EXPLORE THE LINEAGE <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* B. SECONDARY PROMO (Top Right) */}
                    <div className="md:col-span-4 md:row-span-1 bg-brand-primary text-brand-dark p-8 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <ArrowRight className="w-24 h-24 -rotate-45" />
                        </div>
                        <h3 className="text-4xl font-bold mb-2 uppercase">THE SAHEL <span className="text-white">EDIT</span></h3>
                        <p className="text-brand-dark/80 mb-6 max-w-xs">Breezy linens and structured cottons for the modern nomad.</p>
                        <div className="flex gap-2 mt-auto">
                            <Button
                                onClick={scrollToCollections}
                                variant="outline"
                                className="border-brand-dark text-brand-dark hover:bg-white hover:text-brand-dark rounded-none w-full font-bold uppercase"
                            >
                                VIEW LOOKBOOK
                            </Button>
                        </div>
                    </div>

                    {/* C. FEATURED ITEM (Bottom Right) */}
                    <div className="md:col-span-4 md:row-span-1 bg-brand-highlight p-6 relative group border border-border">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-2xl font-bold uppercase">ROYAL AGBADA</h4>
                                <span className="text-sm text-brand-dark/70 font-semibold">V3.0 / MIDNIGHT BLUE</span>
                            </div>
                            <span className="font-bold text-xl">$120</span>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 translate-y-4 translate-x-4">
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop"
                                alt="Product"
                                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <Button
                            onClick={scrollToCollections}
                            size="icon"
                            className="absolute bottom-6 left-6 rounded-none bg-brand-dark text-white hover:bg-brand-primary hover:text-brand-dark"
                        >
                            <MoveRight className="h-4 w-4" />
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
