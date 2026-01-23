import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const token = searchParams.get('token'); // PayPal returns order ID as token

    if (!orderId || !token) {
      setStatus('error');
      setErrorMessage('Invalid payment parameters');
      return;
    }

    const capturePayment = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('capture-paypal-order', {
          body: { orderId, paypalOrderId: token },
        });

        if (error) {
          console.error('Capture error:', error);
          setStatus('error');
          setErrorMessage(error.message || 'Failed to capture payment');
          return;
        }

        if (data.success) {
          setStatus('success');
          toast.success('Payment completed successfully!');
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Payment verification failed');
        }
      } catch (err) {
        console.error('Payment capture error:', err);
        setStatus('error');
        setErrorMessage('An unexpected error occurred');
      }
    };

    capturePayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
            <h1 className="text-2xl font-serif font-bold">Processing Payment...</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-serif font-bold text-green-600">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Return to Shop
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-serif font-bold text-destructive">
              Payment Failed
            </h1>
            <p className="text-muted-foreground">{errorMessage}</p>
            <Button onClick={() => navigate('/')} variant="outline" className="mt-4">
              Return to Shop
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
