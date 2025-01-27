import { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import axios from 'axios';
import AskForAdvertisement from './Advertisement';
import PaymentHistory from './PaymentHistory';
import ManageMedicines from './ManageMedicine';
import { AuthContext } from '../../providers/AuthProvider';
import { Helmet } from 'react-helmet';

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [transactions, setTransactions] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://assignment-12-blue.vercel.app/payments');
        setTransactions(response.data);

        let totalRevenue = 0;
        let paid = 0;
        let pending = 0;

        response.data.forEach((transaction) => {
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
        console.error(error);
      }
    };

    fetchTransactions();
  }, [user.email]);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Seller Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-base md:text-lg font-semibold">Total Sales Revenue</h3>
              <p className="text-xl md:text-2xl font-bold text-blue-600">
                ${totalSalesRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-base md:text-lg font-semibold">Paid Total</h3>
              <p className="text-xl md:text-2xl font-bold text-green-600">
                ${paidTotal.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-base md:text-lg font-semibold">Pending Total</h3>
              <p className="text-xl md:text-2xl font-bold text-red-600">
                ${pendingTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === 'manageMedicine') {
      return (
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Manage Medicine</h2>
          <ManageMedicines userEmail={user.email} />
        </div>
      );
    } else if (activeSection === 'paymentHistory') {
      return (
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Payment History</h2>
          <PaymentHistory userEmail={user.email} />
        </div>
      );
    } else if (activeSection === 'askForAdvertisement') {
      return (
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Ask for Advertisement</h2>
          <AskForAdvertisement />
        </div>
      );
    }
  };

  const NavLinks = () => (
    <ul className="space-y-1">
      <li
        className={`p-4 cursor-pointer rounded transition-colors ${
          activeSection === 'home' 
            ? 'bg-blue-50 text-blue-600' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => handleNavClick('home')}
      >
        Home
      </li>
      <li
        className={`p-4 cursor-pointer rounded transition-colors ${
          activeSection === 'manageMedicine' 
            ? 'bg-blue-50 text-blue-600' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => handleNavClick('manageMedicine')}
      >
        Manage Medicine
      </li>
      <li
        className={`p-4 cursor-pointer rounded transition-colors ${
          activeSection === 'paymentHistory' 
            ? 'bg-blue-50 text-blue-600' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => handleNavClick('paymentHistory')}
      >
        Payment History
      </li>
      <li
        className={`p-4 cursor-pointer rounded transition-colors ${
          activeSection === 'askForAdvertisement' 
            ? 'bg-blue-50 text-blue-600' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => handleNavClick('askForAdvertisement')}
      >
        Ask for Advertisement
      </li>
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Seller Dashboard</title>
      </Helmet>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Seller Panel</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] lg:min-h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold">Seller Panel</h1>
          </div>
          <nav className="mt-6">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-lg">
            <nav className="p-4">
              <NavLinks />
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;