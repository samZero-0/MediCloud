import { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';

const MedicineCategoryPage = () => {
  const data = useLoaderData();
  const { category } = useParams();
  const [medicines, setMedicines] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const { cart, setCart } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setModalOpen(true);
  };

  const handleAddToCart = (medicine) => {
    const isInCart = cart.some(item => item._id === medicine._id);
    if (!isInCart) {
      setCart([...cart, medicine]);
      toast.success(`${medicine.medicineName} added to cart!`);
    } else {
      toast.info('Medicine already in cart');
    }
  };

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedMedicines = [...medicines].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else if (order === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });
    setMedicines(sortedMedicines);
  };

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{category}</h1>

      {/* Search and Sort Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by medicine name..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sort by price:</span>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
      
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Medicine Name</th>
            <th className="p-3 text-left">Manufacturer</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Dosage</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map((medicine) => (
            <tr key={medicine._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{medicine.medicineName}</td>
              <td className="p-3">{medicine.manufactureName}</td>
              <td className="p-3">${medicine.price}</td>
              <td className="p-3">{medicine.dosage}</td>
              <td className="p-3 flex justify-center space-x-2">
                <button 
                  onClick={() => handleViewDetails(medicine)}
                  className="text-blue-500 hover:text-blue-700"
                  title="View Details"
                >
                  👁️
                </button>
                <button 
                  onClick={() => handleAddToCart(medicine)}
                  className="text-green-500 hover:text-green-700"
                  title="Add to Cart"
                >
                  ➕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Medicine Details Modal */}
      {modalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖️
            </button>
            <div className="flex flex-col">
              <img 
                src={selectedMedicine.image} 
                alt={selectedMedicine.medicineName} 
                className="w-full h-auto object-cover mr-4 rounded"
              />
              <div>
                <h2 className="text-xl font-bold mb-2">{selectedMedicine.medicineName}</h2>
                <p><strong>Category:</strong> {selectedMedicine.category}</p>
                <p><strong>Manufacturer:</strong> {selectedMedicine.manufactureName}</p>
                <p><strong>Seller:</strong> {selectedMedicine.sellerName}</p>
                <p><strong>Price:</strong> ${selectedMedicine.price}</p>
                <p><strong>Dosage:</strong> {selectedMedicine.dosage}</p>
                <p><strong>Symptoms:</strong> {selectedMedicine.symptoms.join(', ')}</p>
                <p><strong>Create Date:</strong> {selectedMedicine.createDate}</p>
                <p><strong>Expire Date:</strong> {selectedMedicine.expireDate}</p>
                <p><strong>Discount:</strong> {selectedMedicine.discountStatus ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineCategoryPage;