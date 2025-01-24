import  { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Make sure to replace with your actual Stripe publishable key
const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutForm = ({ grandTotal, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      // Here you would typically send the paymentMethod.id to your server
      // to create a charge or save the payment method for later use
      console.log('Payment successful:', paymentMethod);
      setProcessing(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-gray-700 text-sm font-bold mb-2">
          Credit or debit card
        </label>
        <div className="border rounded-md p-3">
          <CardElement id="card-element" />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xl font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const grandTotal = 99.99; // Replace with actual grand total from your cart or state

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    // Here you would typically redirect to an invoice page
    // For this example, we'll just show a success message
  };

  if (paymentComplete) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p>Thank you for your purchase. You will be redirected to your invoice shortly.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm grandTotal={grandTotal} onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;