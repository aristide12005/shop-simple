import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Clock, Globe, Shield } from 'lucide-react';
import { useDeliveryZones } from '@/hooks/useDeliveryZones';
import { formatPrice } from '@/lib/currency';

export default function Shipping() {
  const { data: zones } = useDeliveryZones();
  const activeZones = zones?.filter(z => z.is_active) || [];

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We ship worldwide with care. Every order is packed with love and attention to detail.
          </p>
        </div>

        {/* Delivery Zones */}
        {activeZones.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-accent" /> Delivery Zones & Rates
            </h2>
            <div className="grid gap-4">
              {activeZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-5 border border-border rounded-xl bg-card">
                  <div>
                    <h3 className="font-semibold">{zone.name}</h3>
                    {zone.description && <p className="text-sm text-muted-foreground">{zone.description}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      Est. {zone.estimated_delivery_days} business days
                      {zone.min_order_amount > 0 && ` · Min. order: ${formatPrice(zone.min_order_amount, zone.currency)}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{formatPrice(zone.delivery_fee, zone.currency)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Shipping Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 border border-border rounded-xl">
            <Truck className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-serif font-bold mb-2">Processing Time</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Orders are processed within 1–3 business days. You'll receive a confirmation email once your order has been shipped.
            </p>
          </div>
          <div className="p-6 border border-border rounded-xl">
            <Clock className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-serif font-bold mb-2">Tracking</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Once shipped, you can track your order status using the email you provided at checkout on our order tracking page.
            </p>
          </div>
          <div className="p-6 border border-border rounded-xl">
            <Shield className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-serif font-bold mb-2">Secure Packaging</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All items are carefully wrapped in premium packaging to ensure they arrive in perfect condition.
            </p>
          </div>
          <div className="p-6 border border-border rounded-xl">
            <Globe className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-serif font-bold mb-2">International Orders</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              International customers may be subject to customs duties and taxes, which are the responsibility of the buyer.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
