import { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import ManageBanner from "./ManageBanner";
import ManageCategories from "./ManageCategories";
import ManageUsers from "./ManageUsers";
import PaymentManagement from "./PaymentManagement";
import SalesReport from "./SalesReport";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://assignment-12-blue.vercel.app/payments");
        setTransactions(response.data);

        let totalRevenue = 0;
        let paid = 0;
        let pending = 0;

        response.data.forEach((transaction) => {
          totalRevenue += transaction.amount;
          if (transaction.status === "succeeded") {
            paid += transaction.amount;
          } else {
            pending += transaction.amount;
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
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "manage-users":
        return <ManageUsers />;
      case "manage-category":
        return <ManageCategories />;
      case "payment-management":
        return <PaymentManagement />;
      case "sales-report":
        return <SalesReport />;
      case "manage-banner":
        return <ManageBanner />;
      default:
        return (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Admin Dashboard</h1>
            <Helmet>
              <title>Admin Dashboard</title>
            </Helmet>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-base md:text-lg font-semibold text-gray-700">Total Sales Revenue</h2>
                <p className="text-xl md:text-2xl font-bold text-blue-600">${totalSalesRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-base md:text-lg font-semibold text-gray-700">Paid Total</h2>
                <p className="text-xl md:text-2xl font-bold text-green-600">${paidTotal.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-base md:text-lg font-semibold text-gray-700">Pending Total</h2>
                <p className="text-xl md:text-2xl font-bold text-red-600">${pendingTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity.</p>
            </div>
          </div>
        );
    }
  };

  const handleNavClick = (component) => {
    setActiveComponent(component);
    setIsMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <button
        onClick={() => handleNavClick("dashboard")}
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavClick("manage-users")}
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
      >
        Manage Users
      </button>
      <button
        onClick={() => handleNavClick("manage-category")}
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
      >
        Manage Category
      </button>
      <button
        onClick={() => handleNavClick("payment-management")}
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
      >
        Payment Management
      </button>
      <button
        onClick={() => handleNavClick("sales-report")}
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
      >
        Sales Report
      </button>
      <button
        onClick={() => handleNavClick("manage-banner")}
        className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
      >
        Manage Banner Advertise
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-blue-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-blue-700 rounded"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] lg:min-h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block bg-blue-800 text-white w-64 space-y-6 py-7 px-2">
          <div className="text-2xl font-semibold text-center mb-6">Admin Panel</div>
          <nav>
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-800 text-white w-full">
            <nav className="px-2 py-4">
              <NavLinks />
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-10">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;