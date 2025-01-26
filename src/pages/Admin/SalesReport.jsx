import { useEffect, useState } from 'react';
import { Download, Calendar, Filter, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    axios.get('https://assignment-12-blue.vercel.app/payments').then((res) => {
      const data = res.data;
      setSales(data);
      setFilteredSales(data);

      // Calculate metrics
      const totalSalesAmount = data.reduce((sum, payment) => sum + payment.amount, 0);
      const totalOrdersCount = data.length;
      const averageOrderValue = totalSalesAmount / totalOrdersCount;

      setTotalSales(totalSalesAmount);
      setTotalOrders(totalOrdersCount);
      setAverageOrderValue(averageOrderValue);
    });
  }, []);

  // Handle date range filter
  const handleFilter = () => {
    const filtered = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return saleDate >= startDate && saleDate <= endDate;
    });
    setFilteredSales(filtered);

    // Recalculate metrics for filtered data
    const totalSalesAmount = filtered.reduce((sum, payment) => sum + payment.amount, 0);
    const totalOrdersCount = filtered.length;
    const averageOrderValue = totalSalesAmount / totalOrdersCount || 0;

    setTotalSales(totalSalesAmount);
    setTotalOrders(totalOrdersCount);
    setAverageOrderValue(averageOrderValue);
  };

  // Handle export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Medicine', 'Seller', 'Buyer', 'Quantity', 'Price', 'Date']],
      body: filteredSales.flatMap((sale) =>
        sale.cartItems.map((item) => [
          item.medicineName,
          item.sellerName,
          sale.user,
          1, // Assuming quantity is 1
          `$${item.price}`,
          new Date(sale.date).toLocaleDateString(),
        ])
      ),
    });
    doc.save('sales-report.pdf');
  };

  // Handle export to CSV
  const csvData = filteredSales.flatMap((sale) =>
    sale.cartItems.map((item) => ({
      Medicine: item.medicineName,
      Seller: item.sellerName,
      Buyer: sale.user,
      Quantity: 1,
      Price: `$${item.price}`,
      Date: new Date(sale.date).toLocaleDateString(),
    }))
  );

  // Handle export to Excel (XLSX)
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
    XLSX.writeFile(workbook, 'sales-report.xlsx');
  };

  // Table columns
  const columns = [
    {
      name: 'Medicine',
      selector: (row) => row.medicineName,
      sortable: true,
    },
    {
      name: 'Seller',
      selector: (row) => row.sellerName,
      sortable: true,
    },
    {
      name: 'Buyer',
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: () => 1, // Assuming quantity is 1
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
  ];

  // Flatten sales data for the table
  const tableData = filteredSales.flatMap((sale) =>
    sale.cartItems.map((item) => ({
      ...item,
      user: sale.user,
      date: sale.date,
    }))
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sales Report</h1>
        <p className="text-gray-600">View and analyze your sales data</p>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleFilter}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Apply Filter
        </button>
        <div className="relative">
          <button
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)} // Toggle dropdown
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export
            <ArrowDown className="w-4 h-4" />
          </button>
          {/* Dropdown Menu */}
          {isExportDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={handleExportPDF}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                <CSVLink data={csvData} filename="sales-report.csv">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Export as CSV
                  </button>
                </CSVLink>
                <button
                  onClick={handleExportExcel}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Export as Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-900">${totalSales.toFixed(2)}</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% vs last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          <p className="text-sm text-green-600 mt-2">↑ 8% vs last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Order Value</h3>
          <p className="text-2xl font-bold text-gray-900">${averageOrderValue.toFixed(2)}</p>
          <p className="text-sm text-red-600 mt-2">↓ 3% vs last month</p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={tableData}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default SalesReport;