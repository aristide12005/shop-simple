import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

export default function Collections() {
    const categories = [
        {
            id: 'men',
            name: "Men's Collection",
            image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop",
            link: "/shop?category=men"
        },
        {
            id: 'women',
            name: "Women's Collection",
            image: "https://images.unsplash.com/photo-1541533848490-bc8115cd1b8d?q=80&w=600&auto=format&fit=crop",
            link: "/shop?category=women"
        },
        {
            id: 'accessories',
            name: "Accessories",
            image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=600&auto=format&fit=crop",
            link: "/shop?category=accessories"
        },
        {
            id: 'new',
            name: "New Arrivals",
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop",
            link: "/shop?sortBy=newest"
        }
    ];

    return (
        <div className="min-h-screen bg-design-bg text-foreground font-sans">
            <Header />
            <main className="pb-20 pt-10">
                <div className="container mx-auto px-4 md:px-8 text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">OUR COLLECTIONS</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our curated selection of authentic African craftsmanship.</p>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={cat.link} className="group relative h-96 overflow-hidden rounded-lg block">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-2 tracking-widest">{cat.name}</h2>
                                    <span className="text-sm font-medium uppercase tracking-widest border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                        Shop Now
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
