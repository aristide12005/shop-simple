
import { Button } from "@/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="w-full bg-background pt-4 pb-12 px-2 md:px-4">

            {/* 1. TOP MARQUEE BANNER (Scrolling Text) */}
            <div className="w-full overflow-hidden bg-foreground text-background py-2 mb-4">
                <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-heading text-sm tracking-widest uppercase">
                    <span>Worldwide Shipping</span> • <span>New Winter Collection</span> • <span>Limited Stock Available</span> • <span>Secure Checkout</span> •
                    <span>Worldwide Shipping</span> • <span>New Winter Collection</span> • <span>Limited Stock Available</span> • <span>Secure Checkout</span> •
                    <span>Worldwide Shipping</span> • <span>New Winter Collection</span> • <span>Limited Stock Available</span> • <span>Secure Checkout</span>
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
                            <span className="inline-block px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider mb-4">
                                2026 Collection
                            </span>
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <h1 className="text-6xl md:text-9xl font-heading font-bold text-white leading-[0.85] tracking-tighter mb-6">
                                DEFINE <br />
                                YOUR <br />
                                <span className="text-transparent border-white border-2 px-2" style={{ WebkitTextStroke: "2px white" }}>SILHOUETTE</span>
                            </h1>
                            <Button className="h-14 px-8 bg-white text-black hover:bg-brand-red hover:text-white transition-colors text-lg font-bold uppercase rounded-none">
                                Shop The Drop <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* B. SECONDARY PROMO (Top Right) */}
                    <div className="md:col-span-4 md:row-span-1 bg-black text-white p-8 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <ArrowRight className="w-24 h-24 -rotate-45" />
                        </div>
                        <h3 className="font-heading text-4xl mb-2">Winter <span className="text-brand-red">Sale</span></h3>
                        <p className="text-gray-400 mb-6 max-w-xs">Up to 50% off on selected archive pieces. No code needed.</p>
                        <div className="flex gap-2 mt-auto">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none w-full">
                                Access Archive
                            </Button>
                        </div>
                    </div>

                    {/* C. FEATURED ITEM (Bottom Right) */}
                    <div className="md:col-span-4 md:row-span-1 bg-brand-grey p-6 relative group border border-border">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-heading text-2xl uppercase">Tactical Vest</h4>
                                <span className="text-sm text-muted-foreground">V2.0 / Black</span>
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
                        <Button size="icon" className="absolute bottom-6 left-6 rounded-none bg-black text-white hover:bg-brand-red">
                            <MoveRight className="h-4 w-4" />
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}
