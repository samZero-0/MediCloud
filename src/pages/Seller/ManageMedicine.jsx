import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider'
import { toast } from 'react-toastify';
const ManageMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const [newMedicine, setNewMedicine] = useState({
    image: '',
    category: '',
    medicineName: '',
    price: 0,
    symptoms: [],
    dosage: '',
    discountStatus: false,
    sellerName: user?.email, // Pre-fill sellerName with logged-in user's email
    manufactureName: '',
    expireDate: '',
    createDate: new Date().toISOString().split('T')[0], // Set createDate to current date
  });

  // Fetch medicines from the API
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://assignment-12-blue.vercel.app/allMedicines'); // Replace with your API endpoint
        // Filter medicines where sellerName matches the logged-in user's email
        const filteredMedicines = response.data.filter((medicine) => medicine.sellerName === user?.email);
        setMedicines(filteredMedicines);
      } catch (error) {
       error
      }
    };
    fetchMedicines();
  }, [user?.email]);

  // Handle input change for the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({ ...newMedicine, [name]: value });
  };

  // Handle symptoms input (comma-separated)
  const handleSymptomsChange = (e) => {
    const symptomsArray = e.target.value.split(',').map((symptom) => symptom.trim());
    setNewMedicine({ ...newMedicine, symptoms: symptomsArray });
  };

  // Handle form submission for adding a new medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://assignment-12-blue.vercel.app/allMedicines', newMedicine); 
      setMedicines([...medicines, response.data]);
      toast.success('Medicine added successfully!');
      setIsModalOpen(false);
      setNewMedicine({
        image: '',
        category: '',
        medicineName: '',
        price: 0,
        symptoms: [],
        dosage: '',
        discountStatus: false,
        sellerName: user?.email,
        manufactureName: '',
        expireDate: '',
        createDate: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      error
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
                <td className="px-4 py-2 border-b">${medicine.price}</td>
                <td className="px-4 py-2 border-b">{medicine.dosage}</td>
                <td className="px-4 py-2 border-b">
                  {medicine.discountStatus ? 'Yes' : 'No'}
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
          <div className="bg-white p-6 rounded-lg w-1/2"> {/* Wider modal */}
            <h3 className="text-xl font-bold mb-4">Add Medicine</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
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
                <div>
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
                <div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newMedicine.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Symptoms (comma-separated)</label>
                  <input
                    type="text"
                    name="symptoms"
                    value={newMedicine.symptoms.join(', ')}
                    onChange={handleSymptomsChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    value={newMedicine.dosage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
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
                <div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount Status</label>
                  <select
                    name="discountStatus"
                    value={newMedicine.discountStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  >
                    <option value={false}>No Discount</option>
                    <option value={true}>Discount Available</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
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