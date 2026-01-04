import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { CreditCard, Smartphone, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Payment = () => {
  const navigate = useNavigate();
  const { getCartTotal, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'success' | 'failure' | null>(null);
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  
  const [upiId, setUpiId] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const total = getCartTotal();

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ').substring(0, 19) : '';
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      setCardData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
    } else if (name === 'expiry') {
      setCardData((prev) => ({ ...prev, expiry: formatExpiry(value) }));
    } else if (name === 'cvv') {
      setCardData((prev) => ({ ...prev, cvv: value.replace(/\D/g, '').substring(0, 3) }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Mock: 80% chance of success
      const success = Math.random() > 0.2;
      setPaymentResult(success ? 'success' : 'failure');
      setIsProcessing(false);
      
      if (success) {
        clearCart();
      }
    }, 2500);
  };

  const handleClose = () => {
    if (paymentResult === 'success') {
      navigate('/');
    } else {
      setPaymentResult(null);
    }
  };

  return (
    <Layout>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* YES Bank Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-xl tracking-wide">YES BANK</span>
            </div>
            <h1 className="font-display text-2xl font-bold">Secure Payment Gateway</h1>
            <p className="text-muted-foreground mt-2">Complete your purchase securely</p>
          </div>

          <div className="bg-card rounded-xl shadow-elegant overflow-hidden">
            {/* Amount Display */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 text-center">
              <p className="text-sm opacity-80 mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold">{formatPrice(total)}</p>
            </div>

            <div className="p-6">
              {/* Payment Method Tabs */}
              <div className="flex mb-6 bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all',
                    paymentMethod === 'card'
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <CreditCard className="w-4 h-4" />
                  Card Payment
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all',
                    paymentMethod === 'upi'
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Smartphone className="w-4 h-4" />
                  UPI Payment
                </button>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={cardData.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="password"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="•••"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@yesbank"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter your UPI ID linked to any bank account
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay {formatPrice(total)}</>
                )}
              </Button>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  🔒 Your payment is secured with 256-bit encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Result Modal */}
      {paymentResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-xl shadow-lift p-8 max-w-md w-full mx-4 text-center animate-scale-up">
            {paymentResult === 'success' ? (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2 text-green-600">
                  Payment Successful!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. Your order has been confirmed.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Order confirmation will be sent to your email.
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2 text-red-600">
                  Payment Failed
                </h2>
                <p className="text-muted-foreground mb-6">
                  Sorry, we couldn't process your payment. Please try again.
                </p>
              </>
            )}
            
            <Button
              onClick={handleClose}
              size="lg"
              className={cn(
                'w-full',
                paymentResult === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-primary hover:bg-primary/90'
              )}
            >
              {paymentResult === 'success' ? 'Back to Home' : 'Try Again'}
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Payment;
