import { Quote } from 'lucide-react';

export default function BrandQuote() {
    return (
        <section className="py-24 md:py-32 bg-white flex items-center justify-center border-y border-neutral-100">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <Quote className="w-10 h-10 text-logo-gold/30 mx-auto mb-8" />

                <blockquote className="font-heading text-3xl md:text-5xl lg:text-6xl leading-tight text-logo-charcoal mb-10 animate-fade-in-up">
                    "We believe that true luxury lies in the <span className="italic text-logo-brown">stories</span> we tell and the heritage we preserve."
                </blockquote>

                <cite className="not-italic text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
                    The Accicoa Philosophy
                </cite>
            </div>
        </section>
    );
}
