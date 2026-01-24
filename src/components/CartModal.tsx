import { useState } from 'react';
import { X, Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function CartModal() {
  const { items, removeFromCart, updateQuantity, clearCart, totalAmount, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setIsCartOpen(false);
    setIsCheckout(false);
  }

  const handleCheckout = async () => {
    if (!customerEmail) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate customer name if provided
    if (customerName && customerName.trim().length > 100) {
      toast.error('Name must be less than 100 characters');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_email: customerEmail.trim(),
          customer_name: customerName.trim() || null,
          total_amount: totalAmount,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        collection_id: item.collection.id,
        collection_name: item.collection.name,
        price: item.collection.price,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Create PayPal order via secure edge function
      const { data: paypalData, error: paypalError } = await supabase.functions.invoke(
        'create-paypal-order',
        { body: { orderId: order.id } }
      );

      if (paypalError) {
        console.error('PayPal order creation error:', paypalError);
        toast.error('Failed to initialize payment. Please try again.');
        return;
      }

      if (paypalData.approvalUrl) {
        // Clear cart and redirect to PayPal
        clearCart();
        handleClose();
        window.location.href = paypalData.approvalUrl;
      } else {
        toast.error('Failed to get payment URL. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="font-serif text-2xl uppercase tracking-widest text-left">
            {isCheckout ? 'Checkout' : 'Your Bag'} ({items.length})
          </SheetTitle>
        </SheetHeader>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <h3 className="font-bold text-lg text-gray-400 uppercase">Bag is Empty</h3>
              <p className="text-gray-500 text-sm">Looks like you haven't added anything yet.</p>
              <Button variant="outline" onClick={handleClose}>Continue Shopping</Button>
            </div>
          ) : isCheckout ? (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="bg-gray-50 border-gray-200"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 text-xs font-bold uppercase">Pay on Delivery</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.collection.id}
                  className="flex gap-4 group"
                >
                  {/* Image */}
                  <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.collection.collection_images?.[0]?.image_url || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200"}
                      alt={item.collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-bold text-sm text-foreground uppercase tracking-wide truncate">
                        {item.collection.name}
                      </h4>
                      <p className="text-sm text-muted-foreground font-serif">
                        ${Number(item.collection.price).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-gray-200 rounded px-2 h-8">
                        <button
                          className="h-full px-1 hover:text-design-teal"
                          onClick={() => updateQuantity(item.collection.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          className="h-full px-1 hover:text-design-teal"
                          onClick={() => updateQuantity(item.collection.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => removeFromCart(item.collection.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area - Fixed Button */}
        {items.length > 0 && (
          <div className="pt-4 border-t space-y-4">
            {!isCheckout ? (
              <>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => setIsCheckout(true)}
                  className="w-full h-12 bg-black hover:bg-gray-900 text-white uppercase tracking-widest text-sm font-bold rounded-none"
                >
                  Checkout Now
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 h-12 rounded-none"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="flex-1 h-12 bg-design-teal hover:bg-[#238b7e] text-white uppercase tracking-widest text-sm font-bold rounded-none"
                >
                  {isProcessing ? 'Processing' : 'Pay Now'}
                </Button>
              </div>
            )}
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
