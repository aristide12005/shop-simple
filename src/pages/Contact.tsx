
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
    const contactInfo = {
        address: "181 Principale St A-10, Gatineau, Quebec J9H 6A6, Canada",
        email: "djmadeinafrica@gmail.com",
        phone: "+1 873-870-1940",
        whatsapp: "+18738701940" // Plain number for API
    };

    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="min-h-screen bg-design-bg font-sans flex flex-col">
            <Header />

            <main className="flex-grow container mx-auto px-4 md:px-8 py-12">

                {/* Page Header */}
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-black mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-serif">
                        We are here to help you find your perfect fit. Reach out to us for inquiries, custom orders, or just to say hello.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Contact Actions */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">

                        {/* Quick Actions Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold uppercase mb-6 text-design-teal">Direct Contact</h2>

                            <div className="space-y-4">
                                {/* Phone */}
                                <a href={`tel:${contactInfo.phone}`} className="block group">
                                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-design-teal/20">
                                        <div className="w-12 h-12 rounded-full bg-design-bg flex items-center justify-center text-design-teal group-hover:scale-110 transition-transform">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-400 uppercase tracking-widest">Call Us</span>
                                            <span className="text-lg font-bold text-gray-800">{contactInfo.phone}</span>
                                        </div>
                                    </div>
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${contactInfo.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors border border-transparent hover:border-green-200">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-400 uppercase tracking-widest">WhatsApp</span>
                                            <span className="text-lg font-bold text-gray-800">Chat with us</span>
                                        </div>
                                    </div>
                                </a>

                                {/* Email */}
                                <a href={`mailto:${contactInfo.email}`} className="block group">
                                    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-design-red/20">
                                        <div className="w-12 h-12 rounded-full bg-design-bg flex items-center justify-center text-design-red group-hover:scale-110 transition-transform">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-gray-400 uppercase tracking-widest">Email Us</span>
                                            <span className="text-lg font-bold text-gray-800">{contactInfo.email}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Address Info */}
                        <div className="bg-design-teal text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                                    <MapPin className="w-6 h-6" /> Visit Our Studio
                                </h2>
                                <p className="text-white/90 text-lg leading-relaxed">
                                    {contactInfo.address}
                                </p>
                                <p className="mt-4 text-sm text-white/70 italic">
                                    By appointment only.
                                </p>
                            </div>
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-4 justify-center md:justify-start pt-4">
                            {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                                <Button key={social} variant="outline" className="rounded-full h-12 px-6 border-gray-300 hover:border-design-teal hover:text-design-teal transition-colors">
                                    {social}
                                </Button>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Map */}
                    <div className="h-[500px] lg:h-full min-h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-md border-4 border-white animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={mapUrl}
                            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
