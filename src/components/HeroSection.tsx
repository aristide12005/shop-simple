
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export function HeroSection() {
    const scrollToCollections = () => {
        const element = document.getElementById('collections');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-design-bg min-h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden relative px-4 md:px-12 py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* 1. LEFT SIDE: Geometric Composition */}
                <div className="relative h-[600px] w-full flex items-center justify-center">
                    {/* Teal Vertical Pill Background */}
                    <div className="absolute top-0 bottom-0 left-1/4 w-1/2 bg-[#188FA7] rounded-[100px] transform -rotate-0 z-0 opacity-90"></div>

                    {/* Circle Image 1 (Top Left) */}
                    <div className="absolute top-10 left-0 w-64 h-64 rounded-full overflow-hidden border-4 border-[#F1F1F1] shadow-xl z-10 bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop"
                            alt="African Shirt Blue"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Circle Image 2 (Bottom Left) */}
                    <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full overflow-hidden border-4 border-[#F1F1F1] shadow-xl z-20 bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop"
                            alt="African Shirt Purple"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Circle Image 3 (Center overlay - Optional based on design complexity, using the main teal shape instead) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-80 rounded-[100px] overflow-hidden border-4 border-white/20 z-0">
                        {/* Placeholder for the main tailored shirt if needed, or just let the teal shape be */}
                    </div>
                </div>

                {/* 2. RIGHT SIDE: Typography & Content */}
                <div className="flex flex-col space-y-8 z-10 pl-0 md:pl-12">
                    <div className="space-y-2">
                        <h1 className="text-6xl md:text-8xl font-sans font-normal tracking-tight text-black">
                            WELCOME
                        </h1>
                        <div className="flex items-center gap-4 flex-wrap">
                            <h1 className="text-6xl md:text-8xl font-sans font-normal tracking-tight text-black">
                                TO
                            </h1>
                            {/* Red Arrow Pill */}
                            <div className="h-16 md:h-20 px-12 bg-design-red rounded-full flex items-center justify-center">
                                <MoveRight className="text-white w-10 h-10 md:w-12 md:h-12" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tight text-design-teal">
                                ACCICOA
                            </h1>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-sans font-normal tracking-tight text-black pt-2">
                            CORNER OF AFRICA
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                        Discover premium African products crafted with excellence. Each piece tells a story of heritage, artistry, and culture.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button
                            onClick={scrollToCollections}
                            className="h-16 px-10 bg-design-red hover:bg-[#7a1b1e] text-white text-xl font-medium rounded-full shadow-lg transition-transform hover:scale-105"
                        >
                            Shop Now
                        </Button>
                        <Button
                            className="h-16 px-10 bg-[#188FA7] hover:bg-[#137488] text-white text-xl font-medium rounded-full shadow-lg transition-transform hover:scale-105"
                        >
                            Contact Us
                        </Button>
                    </div>

                    <p className="text-sm text-gray-500 italic pt-4">
                        Your gateway to authentic African artistry.
                    </p>
                </div>

            </div>

            {/* Background Decor (White Circle Top) */}
            <div className="absolute -top-20 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        </section>
    );
}
