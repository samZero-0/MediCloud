import { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import ManageBanner from "./ManageBanner";
import ManageCategories from "./ManageCategories";
import ManageUsers from "./ManageUsers";
import PaymentManagement from "./PaymentManagement";
import SalesReport from "./SalesReport";
import { Helmet } from "react-helmet";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

  // Prepare data for charts
  const pieChartData = [
    { name: 'Paid', value: paidTotal , fill: '#16a34a'  },
    { name: 'Pending', value: pendingTotal, fill: '#dc2626'}
  ];

  // Group transactions by date for the line chart
  const getLineChartData = () => {
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, amount: 0 };
      }
      acc[date].amount += transaction.amount;
      return acc;
    }, {});
    return Object.values(groupedData);
  };

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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
              {/* Payment Distribution Pie Chart */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Payment Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Trend Line Chart */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getLineChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
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
      <div className="flex-1 p-4 md:p-6 lg:p-10">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;