const BrandQuote = () => {
    return (
        <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container-luxury relative">
                <div className="max-w-4xl mx-auto text-center animate-fade-up">
                    {/* Quote Mark */}
                    <span className="quote-mark block mb-4">
                        "
                    </span>

                    {/* Quote Text */}
                    <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal leading-relaxed mb-8 text-balance">
                        We don't just create clothing. We weave stories of heritage,
                        craftsmanship, and the timeless beauty of African culture into
                        every piece we make.
                    </blockquote>

                    {/* Attribution */}
                    <div>
                        <div className="accent-line mx-auto mb-6" />
                        <p className="text-sm tracking-luxury uppercase text-primary-foreground/60">
                            ACCICOA — Est. 2020
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandQuote;
