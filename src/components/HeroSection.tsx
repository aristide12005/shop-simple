
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
    const scrollToCollections = () => {
        const element = document.getElementById('collections');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        // Adjusted height to account for header (approx 80px) and remove default py-12 to fit tightly
        <section className="w-full bg-design-bg h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center overflow-hidden relative px-4 md:px-12 py-0">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center h-full">

                {/* 1. LEFT SIDE: Geometric Composition (Fluid H w/ max constraints) */}
                <div className="relative h-[80%] max-h-[700px] w-full flex items-center justify-center">
                    {/* Teal Vertical Pill Background */}
                    <div className="absolute top-0 bottom-0 left-1/4 w-1/2 bg-[#188FA7] rounded-[100px] transform -rotate-0 z-0 opacity-90"></div>

                    {/* Circle Image 1 (Top Left) */}
                    <div className="absolute top-[5%] left-0 w-[35%] aspect-square rounded-full overflow-hidden border-4 border-[#F1F1F1] shadow-xl z-10 bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop"
                            alt="African Shirt Blue"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Circle Image 2 (Bottom Left) */}
                    <div className="absolute bottom-[5%] left-[5%] w-[40%] aspect-square rounded-full overflow-hidden border-4 border-[#F1F1F1] shadow-xl z-20 bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop"
                            alt="African Shirt Purple"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Center Image (Optional/Placeholder) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[55%] rounded-[100px] overflow-hidden border-4 border-white/20 z-0">
                        {/* Placeholder */}
                    </div>
                </div>

                {/* 2. RIGHT SIDE: Typography & Content (Tighter spacing) */}
                <div className="flex flex-col space-y-4 md:space-y-6 z-10 pl-0 md:pl-12 justify-center h-full">
                    <div className="space-y-1">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight text-black">
                            WELCOME
                        </h1>
                        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-normal tracking-tight text-black">
                                TO
                            </h1>
                            {/* Red Arrow Pill */}
                            <div className="h-12 md:h-16 lg:h-20 px-8 md:px-12 bg-design-red rounded-full flex items-center justify-center">
                                <MoveRight className="text-white w-8 h-8 md:w-12 md:h-12" />
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tight text-design-teal">
                                ACCICOA
                            </h1>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-normal tracking-tight text-black pt-1">
                            CORNER OF AFRICA
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                        Discover premium African products crafted with excellence. Each piece tells a story of heritage, artistry, and culture.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link to="/shop">
                            <Button
                                className="h-14 md:h-16 px-8 md:px-10 bg-design-red hover:bg-[#7a1b1e] text-white text-lg md:text-xl font-medium rounded-full shadow-lg transition-transform hover:scale-105"
                            >
                                Shop Now
                            </Button>
                        </Link>
                        <Link to="/shop">
                            <Button
                                className="h-14 md:h-16 px-8 md:px-10 bg-[#188FA7] hover:bg-[#137488] text-white text-lg md:text-xl font-medium rounded-full shadow-lg transition-transform hover:scale-105"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500 italic pt-2">
                        Your gateway to authentic African artistry.
                    </p>
                </div>

            </div>

            {/* Background Decor (White Circle Top) */}
            <div className="absolute -top-20 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        </section>
    );
}
