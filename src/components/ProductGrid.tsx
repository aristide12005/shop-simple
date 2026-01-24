
import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock Data
const PRODUCTS = [
    {
        id: "1",
        name: "Lagos Street Hoodie",
        price: 89.00,
        category: "Apparel",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Royal Agbada Set",
        price: 245.00,
        category: "Suits",
        image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "Dakar Tunic",
        price: 120.00,
        category: "Tops",
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "4",
        name: "Ancestral Print Shirt",
        price: 75.00,
        category: "Tops",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "5",
        name: "Sahara Linen Trousers",
        price: 95.00,
        category: "Bottoms",
        image: "https://images.unsplash.com/photo-1542272617-08f082287809?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "6",
        name: "Kente Pattern Scarf",
        price: 45.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=600&auto=format&fit=crop"
    }
];

export default function ProductGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
                <div key={product.id} className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Image Container */}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <Button size="icon" className="bg-white text-black hover:bg-design-teal hover:text-white rounded-full">
                                <ShoppingBag className="w-5 h-5" />
                            </Button>
                            <Link to={`/product/${product.id}`}>
                                <Button size="icon" className="bg-white text-black hover:bg-design-teal hover:text-white rounded-full">
                                    <Eye className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</p>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-design-teal transition-colors">{product.name}</h3>
                        <p className="font-serif text-design-red font-medium">${product.price.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
