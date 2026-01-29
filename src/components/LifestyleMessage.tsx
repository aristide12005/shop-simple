export default function LifestyleMessage() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1920&auto=format&fit=crop')" }}
            />

            <div className="container mx-auto px-4 relative z-20 text-center py-20">
                <h2 className="font-heading text-3xl md:text-5xl text-white font-bold mb-6 drop-shadow-md">
                    "Clothes for daily comfort — crafted with care."
                </h2>
                <p className="text-white/90 text-lg md:text-xl font-light tracking-wide">
                    More than just fashion. A statement of dignity.
                </p>
            </div>
        </section>
    );
}
