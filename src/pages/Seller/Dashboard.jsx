import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AskForAdvertisement from './Advertisement';
import PaymentHistory from './PaymentHistory';
import ManageMedicines from './ManageMedicine';
import { AuthContext } from '../../providers/AuthProvider';

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [transactions, setTransactions] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);
  const {user} = useContext(AuthContext);
  const [pendingTotal, setPendingTotal] = useState(0);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://assignment-12-blue.vercel.app/payments'); // Replace with your API endpoint
        setTransactions(response.data);

        // Calculate totals
        let totalRevenue = 0;
        let paid = 0;
        let pending = 0;

        response.data.forEach((transaction) => {
          // Check if any cart item belongs to the logged-in seller
          const sellerTransactions = transaction.cartItems.filter(
            (item) => item.sellerName === user.email
          );

          if (sellerTransactions.length > 0) {
            totalRevenue += transaction.amount;

            if (transaction.status === 'succeeded') {
              paid += transaction.amount;
            } else {
              pending += transaction.amount;
            }
          }
        });

        setTotalSalesRevenue(totalRevenue);
        setPaidTotal(paid);
        setPendingTotal(pending);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [user.email]);

  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Sales Revenue</h3>
              <p className="text-2xl font-bold">${totalSalesRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Paid Total</h3>
              <p className="text-2xl font-bold text-green-600">${paidTotal.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Pending Total</h3>
              <p className="text-2xl font-bold text-red-600">${pendingTotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === 'manageMedicine') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Medicine</h2>
          <ManageMedicines userEmail={user.email} />
        </div>
      );
    } else if (activeSection === 'paymentHistory') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Payment History</h2>
          <PaymentHistory userEmail={user.email} />
        </div>
      );
    } else if (activeSection === 'askForAdvertisement') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Ask for Advertisement</h2>
          <AskForAdvertisement />
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold">Seller Panel</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li
              className={`p-4 cursor-pointer ${
                activeSection === 'home' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('home')}
            >
              Home
            </li>
            <li
              className={`p-4 cursor-pointer ${
                activeSection === 'manageMedicine' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('manageMedicine')}
            >
              Manage Medicine
            </li>
            <li
              className={`p-4 cursor-pointer ${
                activeSection === 'paymentHistory' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('paymentHistory')}
            >
              Payment History
            </li>
            <li
              className={`p-4 cursor-pointer ${
                activeSection === 'askForAdvertisement' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('askForAdvertisement')}
            >
              Ask for Advertisement
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default SellerDashboard;