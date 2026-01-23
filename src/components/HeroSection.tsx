
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[85vh] grid bg-background pt-20 px-4 md:px-8">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">

                {/* Left Content Area - Typography Heavy */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-10">
                    <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9] text-foreground">
                        PICK A <br />
                        CAMPAIGN <br />
                        THAT REFLECTS <br />
                        YOUR <span className="bg-brand-red text-white px-2 inline-block transform -rotate-2">WINTER</span> LOOK
                    </h1>

                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex flex-col">
                            <span className="font-heading text-xl font-bold">WINTER SNEAKERS COLLECTION</span>
                            <p className="text-sm text-muted-foreground w-64 leading-tight">
                                To keep your feet protected this winter, curpte offers you winter sneakers. you can use it safely.
                            </p>
                        </div>
                        <Button size="icon" className="rounded-full h-14 w-14 bg-brand-red hover:bg-brand-red/90 shadow-lg shrink-0">
                            <ArrowRight className="h-6 w-6 text-white" />
                        </Button>
                    </div>
                </div>

                {/* Right Grid Area - Bento Style */}
                <div className="lg:col-span-7 h-full min-h-[500px] relative">
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full">
                        {/* Large Main Image */}
                        <div className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden bg-brand-grey border border-white/20 shadow-xl group">
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                                alt="Winter Fashion"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/50">
                                <Star className="w-5 h-5 text-brand-cyan fill-brand-cyan" />
                            </div>
                        </div>

                        {/* Top Right - Text/Graphic */}
                        <div className="col-span-1 row-span-1 bg-brand-cyan rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                            <span className="font-heading text-4xl text-white z-10">BEST<br />SELLER</span>
                            <div className="self-end bg-white text-brand-cyan font-bold py-1 px-3 rounded-full text-xs z-10">NEW ARRIVAL</div>
                        </div>

                        {/* Bottom Right - Secondary Image */}
                        <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden bg-white border border-border relative group">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                                alt="Red Sneaker"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur px-3 py-1 rounded-md text-xs font-bold font-heading">
                                RED EDITION
                            </div>
                        </div>
                    </div>

                    {/* Floating Element */}
                    <div className="absolute -bottom-6 -right-6 lg:right-10 bg-white p-4 rounded-2xl shadow-elevated border border-border max-w-[200px] hidden md:block animate-bounce-slow">
                        <span className="text-3xl font-heading font-bold text-foreground block">25% OFF</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Our all new arrivals</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
