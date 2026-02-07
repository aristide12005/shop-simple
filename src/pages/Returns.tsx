import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RotateCcw, Mail, Clock, CheckCircle } from 'lucide-react';

export default function Returns() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your satisfaction is our priority. We want you to love every piece.
          </p>
        </div>

        {/* Policy Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-lg">1</span>
            </div>
            <h3 className="font-serif font-bold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Email us within 14 days of receiving your order to initiate a return or exchange.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-lg">2</span>
            </div>
            <h3 className="font-serif font-bold mb-2">Ship It Back</h3>
            <p className="text-sm text-muted-foreground">
              Send the item back in its original packaging. Return shipping is covered by the customer.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-accent font-bold text-lg">3</span>
            </div>
            <h3 className="font-serif font-bold mb-2">Get Refunded</h3>
            <p className="text-sm text-muted-foreground">
              Once received, refunds are processed within 5–7 business days to your original payment method.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8 mb-16">
          <div className="border border-border rounded-xl p-6">
            <h3 className="text-lg font-serif font-bold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Eligible for Returns
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Items in original, unworn condition with tags attached</li>
              <li>Items returned within 14 days of delivery</li>
              <li>Items in original packaging</li>
            </ul>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h3 className="text-lg font-serif font-bold mb-3 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-accent" /> Exchanges
            </h3>
            <p className="text-sm text-muted-foreground">
              If you'd like to exchange for a different size or color, contact us and we'll arrange it. 
              Exchanges are subject to availability.
            </p>
          </div>

          <div className="border border-border rounded-xl p-6">
            <h3 className="text-lg font-serif font-bold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" /> Non-Returnable Items
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Custom or personalized items</li>
              <li>Items marked as final sale</li>
              <li>Items returned after the 14-day window</li>
            </ul>
          </div>
        </div>

        {/* Contact for Returns */}
        <div className="bg-muted/50 rounded-xl p-8 text-center">
          <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
          <h3 className="font-serif font-bold text-lg mb-2">Need to Start a Return?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Email us at <a href="mailto:djmadeinafrica@gmail.com" className="text-accent underline">djmadeinafrica@gmail.com</a> with your order number and reason for return.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
