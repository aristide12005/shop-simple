
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
    { name: "All Products", href: "/shop" },
    { name: "Men's Wear", href: "/shop?category=men" },
    { name: "Women's Wear", href: "/shop?category=women" },
    { name: "Accessories", href: "/shop?category=accessories" },
    { name: "Footwear", href: "/shop?category=footwear" },
];

const BRANDS = [
    { name: "Sahel Edit", icon: "S", color: "bg-orange-500", href: "/collections" },
    { name: "Royal Agbada", icon: "R", color: "bg-purple-600", href: "/collections" },
    { name: "Urban Dakar", icon: "U", color: "bg-teal-500", href: "/collections" },
    { name: "Lagos Street", icon: "L", color: "bg-yellow-500", href: "/collections" },
    { name: "Accicoa Luxe", icon: "A", color: "bg-design-red", href: "/collections" },
    { name: "Heritage", icon: "H", color: "bg-stone-500", href: "/collections" },
];

export default function ShopMegaMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative z-40 bg-white border-b border-gray-100"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Trigger Bar */}
            <div className="container mx-auto px-4 md:px-8 py-3 flex items-center gap-6 text-sm font-medium tracking-wide">
                <span className="flex items-center gap-2 cursor-pointer hover:text-design-teal transition-colors uppercase">
                    Shop By Category <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </span>
                <span className="text-gray-400">|</span>
                <span className="uppercase text-gray-500 text-xs tracking-widest hidden md:inline-block">
                    Quick Navigate the Collection
                </span>
            </div>

            {/* Mega Menu Dropdown */}
            <div
                className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="container mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Column 1: Text Categories */}
                    <div className="space-y-4 border-r border-gray-100 pr-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</h3>
                        <ul className="space-y-3">
                            {CATEGORIES.map((cat) => (
                                <li key={cat.name}>
                                    <Link
                                        to={cat.href}
                                        className="text-lg font-serif hover:text-design-teal hover:pl-2 transition-all block"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Visual Brands (Takes up 3 cols) */}
                    <div className="md:col-span-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Featured Collections</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {BRANDS.map((brand) => (
                                <Link
                                    key={brand.name}
                                    to={brand.href}
                                    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                                >
                                    {/* Visual Icon (Placeholder for Logo) */}
                                    <div className={`w-12 h-12 rounded-full ${brand.color} text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition-transform`}>
                                        {brand.icon}
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900 group-hover:text-design-teal transition-colors">
                                            {brand.name}
                                        </span>
                                        <span className="text-xs text-gray-500">View Collection</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
