import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://assignment-12-blue.vercel.app/payments");
        const userTransactions = response.data.filter(
          (transaction) => transaction.user === user.email
        );
        setTransactions(userTransactions);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions");
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user.email]);

  // Open modal with transaction details
  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>User Dashboard</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">{transaction.transactionId}</td>
                <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">${transaction.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openModal(transaction)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Transaction Details */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Transaction ID:</h3>
                <p>{selectedTransaction.transactionId}</p>
              </div>
              <div>
                <h3 className="font-semibold">Date:</h3>
                <p>{new Date(selectedTransaction.date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Amount:</h3>
                <p>${selectedTransaction.amount.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold">Status:</h3>
                <p
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedTransaction.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedTransaction.status}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Cart Items:</h3>
                <div className="space-y-2">
                  {selectedTransaction.cartItems.map((item, index) => (
                    <div key={index} className="border p-3 rounded-lg">
                      <p>
                        <span className="font-semibold">Medicine:</span> {item.medicineName}
                      </p>
                      <p>
                        <span className="font-semibold">Price:</span> ${item.price}
                      </p>
                      <p>
                        <span className="font-semibold">Category:</span> {item.category}
                      </p>
                      <p>
                        <span className="font-semibold">Manufacturer:</span> {item.manufactureName}
                      </p>
                      <p>
                        <span className="font-semibold">Expiry Date:</span> {item.expireDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;