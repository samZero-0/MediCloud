import  { useState } from 'react';
import AskForAdvertisement from './Advertisement';
import PaymentHistory from './PaymentHistory';

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Dummy data for demonstration
  const totalSalesRevenue = 12000;
  const paidTotal = 8000;
  const pendingTotal = 4000;

  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total Sales Revenue</h3>
              <p className="text-2xl font-bold">${totalSalesRevenue}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Paid Total</h3>
              <p className="text-2xl font-bold text-green-600">${paidTotal}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Pending Total</h3>
              <p className="text-2xl font-bold text-red-600">${pendingTotal}</p>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === 'manageMedicine') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Medicine</h2>
          <p>Here you can manage your medicines.</p>
        </div>
      );
    } else if (activeSection === 'paymentHistory') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Payment History</h2>
          <PaymentHistory></PaymentHistory>
        </div>
      );
    } else if (activeSection === 'askForAdvertisement') {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4"></h2>
          <AskForAdvertisement></AskForAdvertisement>
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