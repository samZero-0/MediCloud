import { useEffect, useState } from 'react';
import { Check, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // Fetch payments from the backend
  useEffect(() => {
    axios.get('https://assignment-12-blue.vercel.app/payments')
      .then((res) => {
        // Map "succeeded" to "pending" in the frontend
        const mappedPayments = res.data.map(payment => ({
          ...payment,
          status: payment.status === 'succeeded' ? 'pending' : payment.status,
        }));
        setPayments(mappedPayments);

        // Calculate total, pending, and paid amounts
        const total = mappedPayments.reduce((sum, payment) => sum + payment.amount, 0);
        const pending = mappedPayments
          .filter(payment => payment.status === 'pending')
          .reduce((sum, payment) => sum + payment.amount, 0);
        const paid = mappedPayments
          .filter(payment => payment.status === 'paid')
          .reduce((sum, payment) => sum + payment.amount, 0);

        setTotalAmount(total);
        setPendingAmount(pending);
        setPaidAmount(paid);
      })
      .catch((error) => {
        
      });
  }, []);

  // Handle accepting a payment
  const handleAcceptPayment = async (paymentId) => {
    try {
      // Update the payment status in the backend to "paid"
      await axios.patch(`https://assignment-12-blue.vercel.app/payments/${paymentId}`, {
        status: 'paid',
      });

      // Update the local state to reflect the change
      const updatedPayments = payments.map(payment =>
        payment._id === paymentId ? { ...payment, status: 'paid' } : payment
      );
      setPayments(updatedPayments);

      // Recalculate total, pending, and paid amounts
      const total = updatedPayments.reduce((sum, payment) => sum + payment.amount, 0);
      const pending = updatedPayments
        .filter(payment => payment.status === 'pending')
        .reduce((sum, payment) => sum + payment.amount, 0);
      const paid = updatedPayments
        .filter(payment => payment.status === 'paid')
        .reduce((sum, payment) => sum + payment.amount, 0);

      setTotalAmount(total);
      setPendingAmount(pending);
      setPaidAmount(paid);
    } catch (error) {
      
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <p className="text-gray-600">Monitor and manage payment transactions</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by order number or customer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Payments</h3>
          <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Amount</h3>
          <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Paid Amount</h3>
          <p className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment, index) => (
                <motion.tr
                  key={payment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.status === 'pending' && (
                      <button
                        onClick={() => handleAcceptPayment(payment._id)}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;