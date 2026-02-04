import { useState } from 'react';
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PayPalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.65h6.193c2.105 0 3.729.577 4.82 1.712.477.496.818 1.06 1.02 1.686.204.626.26 1.37.167 2.21-.016.152-.038.31-.066.477-.044.267-.093.547-.152.843a8.36 8.36 0 0 1-.35 1.274 6.726 6.726 0 0 1-.598 1.166c-.26.392-.567.739-.92 1.038a5.13 5.13 0 0 1-1.322.81c-.49.203-1.038.36-1.634.468-.597.108-1.25.162-1.951.162H8.534a.77.77 0 0 0-.757.65l-.7 4.771z" />
  </svg>
);

export default function CartModal() {
  const { items, removeFromCart, updateQuantity, clearCart, totalAmount, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = () => {
    setIsCartOpen(false);
    setIsCheckout(false);
  };

  const handleCheckout = async () => {
    if (!customerEmail) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!customerName || customerName.trim().length < 2) {
      toast.error('Please enter your full name');
      return;
    }

    if (customerName.trim().length > 100) {
      toast.error('Name must be less than 100 characters');
      return;
    }

    if (!shippingAddress || shippingAddress.trim().length < 5) {
      toast.error('Please enter your shipping address');
      return;
    }

    if (!shippingCity || shippingCity.trim().length < 2) {
      toast.error('Please enter your city');
      return;
    }

    if (!shippingCountry || shippingCountry.trim().length < 2) {
      toast.error('Please enter your country');
      return;
    }

    setIsProcessing(true);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_email: customerEmail.trim(),
          customer_name: customerName.trim(),
          total_amount: totalAmount,
          status: 'pending',
          shipping_address: shippingAddress.trim(),
          shipping_city: shippingCity.trim(),
          shipping_country: shippingCountry.trim(),
        } as any)
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => {
        const price = item.variant?.price ?? item.collection.price;
        const variantSuffix = item.variant ? ` (${item.variant.name})` : '';
        return {
          order_id: order.id,
          collection_id: item.collection.id,
          collection_name: `${item.collection.name}${variantSuffix}`,
          price: price,
          quantity: item.quantity,
        };
      });

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      if (paymentMethod === 'paypal') {
        const { data: paypalData, error: paypalError } = await supabase.functions.invoke(
          'create-paypal-order',
          { body: { orderId: order.id } }
        );

        if (paypalError) {
          console.error('PayPal order creation error:', paypalError);
          toast.error('Failed to initialize PayPal payment. Please try again.');
          return;
        }

        if (paypalData.approvalUrl) {
          clearCart();
          handleClose();
          window.location.href = paypalData.approvalUrl;
        } else {
          toast.error('Failed to get PayPal payment URL. Please try again.');
        }
      } else {
        toast.info('Card payment coming soon! Please use PayPal for now.');
        setPaymentMethod('paypal');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Get item key for unique identification
  const getItemKey = (item: typeof items[0]) =>
    item.variant ? `${item.collection.id}-${item.variant.id}` : item.collection.id;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background">
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="font-serif text-2xl uppercase tracking-widest text-left">
            {isCheckout ? 'Checkout' : 'Your Bag'} ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <h3 className="font-bold text-lg text-muted-foreground uppercase">Bag is Empty</h3>
              <p className="text-muted-foreground text-sm">Looks like you haven't added anything yet.</p>
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
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="bg-muted border-border"
                />
              </div>

              <div className="space-y-4 border-t border-border pt-4">
                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Shipping Address</h4>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                    required
                    className="bg-muted border-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      placeholder="New York"
                      required
                      className="bg-muted border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      type="text"
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      placeholder="United States"
                      required
                      className="bg-muted border-border"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as 'paypal' | 'card')}
                  className="space-y-2"
                >
                  <div className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}>
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                      <PayPalIcon />
                      <span className="font-medium">PayPal</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}>
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Credit/Debit Card</span>
                      <span className="text-xs text-muted-foreground ml-auto">(Coming Soon)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 text-xs font-bold uppercase">Pay on Delivery</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const price = item.variant?.price ?? item.collection.price;
                const itemKey = getItemKey(item);

                return (
                  <div key={itemKey} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-muted rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={item.collection.collection_images?.[0]?.image_url || "/placeholder.svg"}
                        alt={item.collection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-bold text-sm text-foreground uppercase tracking-wide truncate">
                          {item.collection.name}
                        </h4>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground font-serif">
                          ${Number(price).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-border rounded-full px-2 h-8">
                          <button
                            className="h-full px-1 hover:text-primary"
                            onClick={() => updateQuantity(item.collection.id, item.quantity - 1, item.variant?.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            className="h-full px-1 hover:text-primary"
                            onClick={() => updateQuantity(item.collection.id, item.quantity + 1, item.variant?.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-gray-100 rounded-full"
                          onClick={() => removeFromCart(item.collection.id, item.variant?.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-border space-y-4">
            {!isCheckout ? (
              <>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => setIsCheckout(true)}
                  className="w-full h-12 bg-black hover:bg-neutral-800 text-white uppercase tracking-widest text-sm font-bold rounded-full shadow-lg"
                >
                  Checkout Now
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 h-12 rounded-full border-gray-300"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="flex-1 h-12 bg-black hover:bg-neutral-800 text-white uppercase tracking-widest text-sm font-bold rounded-full shadow-lg"
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
