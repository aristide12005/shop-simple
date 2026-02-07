import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Package, Search, Loader2, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

const statusConfig: Record<string, { icon: typeof Clock; label: string; color: string }> = {
  pending: { icon: Clock, label: 'Pending', color: 'text-amber-500' },
  confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'text-blue-500' },
  processing: { icon: Package, label: 'Processing', color: 'text-indigo-500' },
  shipped: { icon: Truck, label: 'Shipped', color: 'text-purple-500' },
  completed: { icon: CheckCircle, label: 'Delivered', color: 'text-green-500' },
  cancelled: { icon: XCircle, label: 'Cancelled', color: 'text-destructive' },
};

export default function OrderTracking() {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['customer-orders', searchEmail],
    queryFn: async () => {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', searchEmail)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch order items for each order
      const orderIds = (ordersData || []).map(o => o.id);
      if (orderIds.length === 0) return [];

      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);

      if (itemsError) throw itemsError;

      return (ordersData || []).map(order => ({
        ...order,
        items: (items || []).filter(i => i.order_id === order.id),
      }));
    },
    enabled: !!searchEmail,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSearchEmail(email.trim().toLowerCase());
  };

  const getStatusInfo = (status: string) => statusConfig[status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 max-w-3xl">
        <div className="text-center mb-10">
          <Package className="w-12 h-12 mx-auto mb-4 text-accent" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">Track Your Order</h1>
          <p className="text-muted-foreground">Enter the email address you used during checkout to view your orders.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10 max-w-lg mx-auto">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1"
          />
          <Button type="submit" className="bg-primary text-primary-foreground">
            <Search className="w-4 h-4 mr-2" /> Track
          </Button>
        </form>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {searchEmail && !isLoading && (!orders || orders.length === 0) && (
          <div className="text-center py-12 bg-muted/50 rounded-xl">
            <p className="text-muted-foreground">No orders found for <strong>{searchEmail}</strong></p>
            <p className="text-sm text-muted-foreground mt-2">Make sure you're using the same email you used at checkout.</p>
          </div>
        )}

        {orders && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = getStatusInfo(order.status);
              const StatusIcon = status.icon;
              return (
                <div key={order.id} className="border border-border rounded-xl p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Order</p>
                      <p className="font-mono text-sm">{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${status.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold uppercase tracking-wide">{status.label}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.collection_name} × {item.quantity}</span>
                        <span className="font-medium">{formatPrice(item.price * item.quantity, order.currency || 'USD')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border mt-4 pt-4 flex justify-between">
                    <div className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="font-bold">
                      {formatPrice(order.total_amount, order.currency || 'USD')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
