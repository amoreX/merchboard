"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function PaymentPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
    { id: 'upi', name: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'All major banks' },
    { id: 'wallet', name: 'Wallet', icon: '👛', desc: 'Paytm, Amazon Pay' },
  ];

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod || !amount) return;
    
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-foreground/60 mb-6">
            {user?.role === 'brand' 
              ? `₹${parseInt(amount).toLocaleString()} has been added to your wallet`
              : `Your payout of ₹${parseInt(amount).toLocaleString()} is being processed`
            }
          </p>
          <div className="p-4 bg-background rounded-xl border border-border mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground/60">Transaction ID</span>
              <span className="font-mono">TXN{Date.now()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground/60">Amount</span>
              <span className="font-medium">₹{parseInt(amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Status</span>
              <span className="text-green-500">Completed</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 bg-accent text-background rounded-xl font-semibold hover:bg-accent-hover transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-background font-bold">M</span>
            </div>
            <span className="font-bold">Merch Nest</span>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {user?.role === 'brand' ? 'Add Funds' : 'Request Payout'}
            </h1>
            <p className="text-foreground/60 mb-6">
              {user?.role === 'brand' 
                ? 'Add funds to your wallet for campaigns'
                : 'Withdraw your earnings to your bank account'
              }
            </p>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-4 bg-card border border-border rounded-xl text-2xl font-bold focus:outline-none focus:border-accent transition-colors"
                    min="100"
                    required
                  />
                </div>
                {user?.role === 'influencer' && (
                  <p className="text-sm text-foreground/60 mt-2">Available balance: ₹12,500</p>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2">
                {[1000, 5000, 10000, 25000, 50000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      amount === amt.toString()
                        ? 'bg-accent text-background'
                        : 'bg-card border border-border hover:border-accent/50'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedMethod === method.id
                          ? 'bg-accent/10 border-2 border-accent'
                          : 'bg-card border border-border hover:border-accent/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{method.icon}</span>
                      <p className="font-medium text-sm">{method.name}</p>
                      <p className="text-xs text-foreground/60">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Details (if card selected) */}
              {selectedMethod === 'card' && (
                <div className="space-y-4 p-4 bg-card border border-border rounded-xl">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Input (if UPI selected) */}
              {selectedMethod === 'upi' && (
                <div className="p-4 bg-card border border-border rounded-xl">
                  <label className="block text-sm font-medium mb-1">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!amount || !selectedMethod || processing}
                className="w-full py-4 bg-accent text-background rounded-xl font-semibold hover:bg-accent-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {user?.role === 'brand' ? 'Add Funds' : 'Request Payout'}
                    {amount && ` • ₹${parseInt(amount).toLocaleString()}`}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary / Info */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 sticky top-8">
              <h2 className="font-semibold mb-4">Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Amount</span>
                  <span className="font-medium">₹{amount ? parseInt(amount).toLocaleString() : '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Processing Fee</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-border my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{amount ? parseInt(amount).toLocaleString() : '0'}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl mb-4">
                <div className="flex items-center gap-2 text-green-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium text-sm">Secure Payment</span>
                </div>
                <p className="text-xs text-foreground/60 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Info */}
              <div className="text-xs text-foreground/50 space-y-2">
                <p>• This is a demo payment page with no real transactions</p>
                <p>• All payment data is simulated for demonstration</p>
                <p>• No actual money will be charged or transferred</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
