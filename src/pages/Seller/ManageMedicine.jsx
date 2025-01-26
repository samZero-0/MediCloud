import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMedicines = ({ userEmail }) => {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    image: '',
    category: '',
    medicineName: '',
    price: 0,
    symptoms: [],
    dosage: '',
    discountStatus: false,
    manufactureName: '',
    expireDate: '',
    itemGenericName: '',
    shortDescription: '',
    itemMassUnit: 'Mg',
    perUnitPrice: 0,
    discountPercentage: 0,
  });

  // Fetch medicines from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('/api/medicines'); // Replace with your API endpoint
        // Filter medicines where sellerName matches the logged-in user's email
        const filteredMedicines = response.data.filter((medicine) => medicine.sellerName === userEmail);
        setMedicines(filteredMedicines);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, [userEmail]);

  // Handle input change for the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  // Handle form submission for adding a new medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const medicineData = {
        ...newMedicine,
        sellerName: userEmail, // Add the logged-in user's email as sellerName
      };
      const response = await axios.post('/api/medicines', medicineData); // Replace with your API endpoint
      setMedicines([...medicines, response.data]);
      setIsModalOpen(false);
      setNewMedicine({
        image: '',
        category: '',
        medicineName: '',
        price: 0,
        symptoms: [],
        dosage: '',
        discountStatus: false,
        manufactureName: '',
        expireDate: '',
        itemGenericName: '',
        shortDescription: '',
        itemMassUnit: 'Mg',
        perUnitPrice: 0,
        discountPercentage: 0,
      });
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Medicines</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Medicine
      </button>

      {/* Medicines Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Medicine Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Dosage</th>
              <th className="px-4 py-2 border-b">Discount</th>
              <th className="px-4 py-2 border-b">Expire Date</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td className="px-4 py-2 border-b">
                  <img src={medicine.image} alt={medicine.medicineName} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-4 py-2 border-b">{medicine.medicineName}</td>
                <td className="px-4 py-2 border-b">{medicine.category}</td>
                <td className="px-4 py-2 border-b">${medicine.price.toFixed(2)}</td>
                <td className="px-4 py-2 border-b">{medicine.dosage}</td>
                <td className="px-4 py-2 border-b">
                  {medicine.discountStatus ? `${medicine.discountPercentage}%` : 'No Discount'}
                </td>
                <td className="px-4 py-2 border-b">{new Date(medicine.expireDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Medicine */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Medicine</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  value={newMedicine.medicineName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Generic Name</label>
                <input
                  type="text"
                  name="itemGenericName"
                  value={newMedicine.itemGenericName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                  name="shortDescription"
                  value={newMedicine.shortDescription}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newMedicine.image}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={newMedicine.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Thyroid Medication">Thyroid Medication</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Vitamins">Vitamins</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  name="manufactureName"
                  value={newMedicine.manufactureName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Item Mass Unit</label>
                <select
                  name="itemMassUnit"
                  value={newMedicine.itemMassUnit}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                >
                  <option value="Mg">Mg</option>
                  <option value="Ml">Ml</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Per Unit Price</label>
                <input
                  type="number"
                  name="perUnitPrice"
                  value={newMedicine.perUnitPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={newMedicine.discountPercentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Expire Date</label>
                <input
                  type="date"
                  name="expireDate"
                  value={newMedicine.expireDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMedicines;