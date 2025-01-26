import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
    const {user} = useContext(AuthContext)
  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://assignment-12-blue.vercel.app/payments'); // Replace with your API endpoint
        // Filter transactions where sellerName matches the logged-in user's email
        const filteredTransactions = response.data.filter((transaction) =>
          transaction.cartItems.some((item) => item.sellerName === user?.email)
        );
        setTransactions(filteredTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [user?.email]);

  return (
    <div className="p-6">
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Transaction ID: {transaction.transactionId}</p>
              <p
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  transaction.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {transaction.status || 'pending'}
              </p>
            </div>
            <p className="text-gray-600">User: {transaction.user}</p>
            <p className="text-gray-600">Amount: ${transaction.amount.toFixed(2)}</p>

            {/* Sold Medicines */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Sold Medicines</h3>
              {transaction.cartItems
                .filter((item) => item.sellerName === user?.email) // Filter medicines sold by the logged-in seller
                .map((item) => (
                  <div key={item._id} className="bg-gray-50 p-3 rounded-lg mb-2">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.medicineName}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-lg font-semibold">{item.medicineName}</p>
                        <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                        <p className="text-gray-600">Category: {item.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;