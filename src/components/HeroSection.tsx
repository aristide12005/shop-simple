
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
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 h-full items-center">

                {/* 1. LEFT SIDE: 3-Image Stack on Teal Pill (cols 1-5) */}
                <div className="md:col-span-5 relative h-[90%] w-full flex items-center justify-center hidden md:flex animate-in fade-in slide-in-from-left-10 duration-1000 ease-out">
                    {/* Teal Vertical Pill Background with Gradient/Depth */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[70%] bg-gradient-to-br from-[#188FA7] to-[#0f6c80] rounded-t-full rounded-b-full z-0 shadow-2xl skew-y-0"></div>

                    {/* Image 1: Light Blue Shirt (Top, Circular) */}
                    <div className="absolute top-[8%] -left-[5%] w-[50%] aspect-square rounded-full border-4 border-[#F1F1F1] shadow-xl z-20 bg-white overflow-hidden animate-in zoom-in-50 duration-700 delay-300 fill-mode-backwards hover:scale-105 transition-transform">
                        <img
                            src="/hero-images/hero-blue.jpg"
                            alt="Light Blue Shirt"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Image 2: Cream Tunic (Middle, Rounded Rect) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-[3/4] rounded-[40px] border-4 border-[#F1F1F1] shadow-2xl z-30 bg-white overflow-hidden animate-in zoom-in-50 duration-700 delay-500 fill-mode-backwards hover:scale-105 transition-transform">
                        <img
                            src="/hero-images/hero-cream.jpg"
                            alt="Cream Tunic"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Image 3: Purple Shirt (Bottom, Circular) */}
                    <div className="absolute bottom-[8%] -right-[5%] w-[50%] aspect-square rounded-full border-4 border-[#F1F1F1] shadow-xl z-20 bg-white overflow-hidden animate-in zoom-in-50 duration-700 delay-700 fill-mode-backwards hover:scale-105 transition-transform">
                        <img
                            src="/hero-images/hero-purple.jpg"
                            alt="Purple Shirt"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* 2. RIGHT SIDE: Typography & Content (cols 6-12) */}
                <div className="col-span-1 md:col-span-7 flex flex-col space-y-2 md:space-y-4 z-10 pl-0 md:pl-8 justify-center h-full text-center md:text-left">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-normal tracking-tight text-black">
                                WELCOME TO
                            </h1>
                            {/* Red Arrow Pill */}
                            <div className="h-10 md:h-14 lg:h-16 px-6 md:px-10 bg-design-red rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                                <MoveRight className="text-white w-6 h-6 md:w-10 md:h-10" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-design-teal animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
                            ACCICOA
                        </h1>

                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-sans font-normal tracking-tight text-black pt-1 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-backwards">
                            CORNER OF AFRICA
                        </h1>
                    </div>

                    <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards">
                        Discover premium African products crafted with excellence. Each piece tells a story of heritage, artistry, and culture.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 fill-mode-backwards">
                        <Link to="/shop">
                            <Button
                                className="h-12 md:h-14 px-8 bg-design-red hover:bg-[#7a1b1e] text-white text-base md:text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95 duration-300"
                            >
                                Shop Now
                            </Button>
                        </Link>
                        <Link to="/shop">
                            <Button
                                className="h-12 md:h-14 px-8 bg-[#188FA7] hover:bg-[#137488] text-white text-base md:text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95 duration-300"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>

                    <p className="text-xs md:text-sm text-gray-500 italic pt-1 animate-in fade-in duration-1000 delay-1000 fill-mode-backwards">
                        Your gateway to authentic African artistry.
                    </p>
                </div>

            </div>

            {/* Background Decor (White Circle Top) */}
            <div className="absolute -top-20 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        </section>
    );
}
