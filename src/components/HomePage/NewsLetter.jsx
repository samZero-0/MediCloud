import React, { useState } from 'react';
import { Bell, Check, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-[#14213D]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Subscribe & Save
              </h2>
              <p className="text-gray-600 mb-6">
                Join our subscription program and get:
              </p>
              <ul className="space-y-4">
                {[
                  'Monthly medicine delivery at your doorstep',
                  '15% off on all regular purchases',
                  'Priority customer support',
                  'Free health consultations'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="text-green-500 w-5 h-5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#E5E5E5] p-6 rounded-xl">
              <div className="flex items-center mb-6">
                <Bell className="w-8 h-8 text-[#14213D] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Newsletter Signup
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#FCA311] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              
              {submitted && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg animate-fade-in-down">
                  Thank you for subscribing!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;