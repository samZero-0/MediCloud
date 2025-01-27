import { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const { amount,user,cart,setCart,setInvoice } = useContext(AuthContext);

  useEffect(() => {   
    axios.post('https://assignment-12-blue.vercel.app/create-payment-intent', { price: amount })
      .then(res => setClientSecret(res.data.client_secret))
      .catch(err => setError('Payment initialization failed'));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.email, 
          },
        } 
      });

      axios.post('https://assignment-12-blue.vercel.app/payments', { 
        transactionId: paymentIntent.id,
        user: user?.email, 
        amount, 
        cartItems: cart, // Assuming you have cart state/context
        date: new Date().toISOString(),
        status: paymentIntent.status
      })

     
     

      if (error) {
        setError(error.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
        setCart([])
        const invoice = {
          transactionId: paymentIntent.id,
          invoiceDate: new Date().toISOString(),
          dueDate: new Date().toISOString(),
          items: cart,
          // subtotal: amount  - (amount * 0.1),
          // tax: amount * 0.1,
          total: amount,
          user: user?.email
        }
        setInvoice(invoice)
      }
    } catch (err) {
      setError('Payment processing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-gray-700 text-sm font-bold mb-2">
          Credit or debit card
        </label>
        <div className="border rounded-md p-3">
          <CardElement 
            id="card-element" 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                },
              },
            }}
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xl font-bold">Grand Total: ${amount.toFixed(2)}</p>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { amount } = useContext(AuthContext);

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentDetails(paymentIntent);
    setPaymentComplete(true);
  };

  if (paymentComplete) {
    return (
      <div className="max-w-md mx-auto mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p>Transaction ID: {paymentDetails.id}</p>
        <p>Thank you for your purchase.</p>
        <Link to='/invoice'><button className='btn m-4'>View invoice</button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
        <Helmet>
               
               <title>Checkout</title>
             
           </Helmet>
      <h1 className="text-3xl font-bold text-center my-8">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;