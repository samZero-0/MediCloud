import { useState, useEffect } from "react";
import axios from "axios";
import ManageBanner from "./ManageBanner";
import ManageCategories from "./ManageCategories";
import ManageUsers from "./ManageUsers";
import PaymentManagement from "./PaymentManagement";
import SalesReport from "./SalesReport";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [totalSalesRevenue, setTotalSalesRevenue] = useState(0);
  const [paidTotal, setPaidTotal] = useState(0);
  const [pendingTotal, setPendingTotal] = useState(0);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://assignment-12-blue.vercel.app/payments"); // Replace with your API endpoint
        setTransactions(response.data);

        // Calculate totals
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
        console.error("Error fetching transactions:", error);
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
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">Total Sales Revenue</h2>
                <p className="text-2xl font-bold text-blue-600">${totalSalesRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">Paid Total</h2>
                <p className="text-2xl font-bold text-green-600">${paidTotal.toFixed(2)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">Pending Total</h2>
                <p className="text-2xl font-bold text-red-600">${pendingTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-blue-800 text-white w-64 space-y-6 py-7 px-2">
        <div className="text-2xl font-semibold text-center">Admin Panel</div>
        <nav>
          <button
            onClick={() => setActiveComponent("dashboard")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveComponent("manage-users")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveComponent("manage-category")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
          >
            Manage Category
          </button>
          <button
            onClick={() => setActiveComponent("payment-management")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
          >
            Payment Management
          </button>
          <button
            onClick={() => setActiveComponent("sales-report")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
          >
            Sales Report
          </button>
          <button
            onClick={() => setActiveComponent("manage-banner")}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 w-full text-left"
          >
            Manage Banner Advertise
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;