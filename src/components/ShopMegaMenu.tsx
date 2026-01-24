
import { useState } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCollections } from '@/hooks/useCollections';

const CATEGORIES = [
    { name: "All Products", href: "/shop" },
    { name: "Men's Wear", href: "/shop?category=men" },
    { name: "Women's Wear", href: "/shop?category=women" },
    { name: "Accessories", href: "/shop?category=accessories" },
    { name: "Footwear", href: "/shop?category=footwear" },
];

export default function ShopMegaMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: products, isLoading } = useCollections();

    // Get first 6 items for the menu
    const menuItems = products?.slice(0, 6) || [];

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
                    Direct Product Access
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

                    {/* Column 2: Visual Products (Takes up 3 cols) */}
                    <div className="md:col-span-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Featured Items</h3>

                        {isLoading ? (
                            <div className="flex items-center justify-center h-20">
                                <Loader2 className="w-6 h-6 animate-spin text-design-teal" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {menuItems.map((product) => {
                                    const imageUrl = product.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop";

                                    return (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                                        >
                                            {/* Visual Icon (Product Image) */}
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
                                                <img
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <span className="block font-bold text-gray-900 group-hover:text-design-teal transition-colors line-clamp-1">
                                                    {product.name}
                                                </span>
                                                <span className="text-xs text-gray-500">View Product</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
