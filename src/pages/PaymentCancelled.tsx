import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentCancelled() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <XCircle className="h-16 w-16 text-amber-500 mx-auto" />
        <h1 className="text-2xl font-serif font-bold">Payment Cancelled</h1>
        <p className="text-muted-foreground">
          Your payment was cancelled. Your cart items are still saved if you'd like to try again.
        </p>
        <div className="flex gap-4 justify-center mt-4">
          <Button onClick={() => navigate('/')} variant="outline">
            Return to Shop
          </Button>
        </div>
      </div>
    </div>
  );
}
