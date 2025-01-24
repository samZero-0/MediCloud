import  { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

// Mock data (replace with actual data from your backend)
const initialMedicines = [
  { id: 1, name: 'Aspirin', genericName: 'Acetylsalicylic acid', price: 5.99, stock: 100 },
  { id: 2, name: 'Ibuprofen', genericName: 'Ibuprofen', price: 7.99, stock: 75 },
];

const initialPayments = [
  { id: 1, medicine: 'Aspirin', amount: 59.90, status: 'paid', date: '2023-05-15' },
  { id: 2, medicine: 'Ibuprofen', amount: 79.90, status: 'pending', date: '2023-05-16' },
];

const initialAds = [
  { id: 1, medicine: 'Aspirin', status: 'active', image: 'aspirin-ad.jpg' },
  { id: 2, medicine: 'Ibuprofen', status: 'pending', image: 'ibuprofen-ad.jpg' },
];

const SellerDashboard = () => {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [payments, setPayments] = useState(initialPayments);
  const [ads, setAds] = useState(initialAds);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const [showAddAdModal, setShowAddAdModal] = useState(false);

  // Calculate totals
  const paidTotal = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const handleAddMedicine = (medicine) => {
    setMedicines([...medicines, { ...medicine, id: medicines.length + 1 }]);
    setShowAddMedicineModal(false);
  };

  const handleAddAd = (ad) => {
    setAds([...ads, { ...ad, id: ads.length + 1, status: 'pending' }]);
    setShowAddAdModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

      {/* Sales Revenue */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Sales Revenue</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Paid Total</p>
            <p className="text-2xl font-bold">${paidTotal.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-600">Pending Total</p>
            <p className="text-2xl font-bold">${pendingTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Manage Medicines */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Medicines</h2>
          <button
            onClick={() => setShowAddMedicineModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Medicine
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generic Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{medicine.genericName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${medicine.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{medicine.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">{payment.medicine}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ask For Advertisement */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Ask For Advertisement</h2>
          <button
            onClick={() => setShowAddAdModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Advertisement
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">{ad.medicine}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={ad.image || "/placeholder.svg"} alt={ad.medicine} className="h-10 w-10 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Medicine Modal */}
      {showAddMedicineModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Medicine</h3>
              <form className="mt-2 text-left" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newMedicine = Object.fromEntries(formData);
                handleAddMedicine(newMedicine);
              }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Item Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genericName">
                    Generic Name
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="genericName" name="genericName" type="text" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Short Description
                  </label>
                  <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" required></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Image Upload
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" name="image" type="file" accept="image/*" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                    Category
                  </label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" name="category" required>
                    <option value="">Select a category</option>
                    <option value="painkillers">Painkillers</option>
                    <option value="antibiotics">Antibiotics</option>
                    <option value="vitamins">Vitamins</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                    Company
                  </label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" name="company" required>
                    <option value="">Select a company</option>
                    <option value="pharma-a">Pharma A</option>
                    <option value="pharma-b">Pharma B</option>
                    <option value="pharma-c">Pharma C</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                    Item Mass Unit
                  </label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="unit" name="unit" required>
                    <option value="mg">Mg</option>
                    <option value="ml">ML</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Per Unit Price
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" name="price" type="number" step="0.01" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
                    Discount Percentage
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="discount" name="discount" type="number" min="0" max="100" defaultValue="0" />
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add Medicine
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setShowAddMedicineModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Advertisement Modal */}
      {showAddAdModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Advertisement</h3>
              <form className="mt-2 text-left" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newAd = Object.fromEntries(formData);
                handleAddAd(newAd);
              }}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adMedicine">
                    Medicine
                  </label>
                  <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adMedicine" name="medicine" required>
                    <option value="">Select a medicine</option>
                    {medicines.map((medicine) => (
                      <option key={medicine.id} value={medicine.name}>{medicine.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adImage">
                    Advertisement Image
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adImage" name="image" type="file" accept="image/*" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adDescription">
                    Advertisement Description
                  </label>
                  <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adDescription" name="description" required></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add Advertisement
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setShowAddAdModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;