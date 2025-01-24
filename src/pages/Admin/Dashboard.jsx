import { useState } from 'react';
import { DollarSign, Users, Package, CreditCard, BarChart2, Image } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats] = useState({
    totalRevenue: 125850.00,
    paidTotal: 98670.00,
    pendingTotal: 27180.00,
    totalUsers: 1250,
    totalCategories: 8,
    totalSales: 456
  });

  const cards = [
    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' },
    { title: 'Paid Total', value: `$${stats.paidTotal.toLocaleString()}`, icon: CreditCard, color: 'bg-blue-500' },
    { title: 'Pending Total', value: `$${stats.pendingTotal.toLocaleString()}`, icon: CreditCard, color: 'bg-yellow-500' },
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-500' },
    { title: 'Categories', value: stats.totalCategories, icon: Package, color: 'bg-pink-500' },
    { title: 'Total Sales', value: stats.totalSales, icon: BarChart2, color: 'bg-indigo-500' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-600">Last 30 days</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-gray-600">{card.title}</p>
            </div>
            <div className="px-6 py-3 bg-gray-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-medium">↑ 12%</span>
                <span className="text-gray-600">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-gray-900">New order received from John Doe</p>
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;