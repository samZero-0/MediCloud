import { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet';

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

  const filteredMedicines = medicines.filter(medicine =>
    medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Category Details</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6 dark:text-white">{category}</h1>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by medicine name..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 whitespace-nowrap dark:text-white">Sort by price:</span>
          <select
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Responsive Table/Card View */}
      <div className="overflow-x-auto rounded-lg shadow">
        {/* Desktop Table View */}
        <table className="hidden md:table w-full border-collapse bg-white dark:bg-transparent dark:border">
          <thead className="bg-gray-100 dark:bg-transparent">
            <tr>
              <th className="p-4 text-left dark:text-white">Medicine Name</th>
              <th className="p-4 text-left dark:text-white">Manufacturer</th>
              <th className="p-4 text-left dark:text-white">Price</th>
              <th className="p-4 text-left dark:text-white">Dosage</th>
              <th className="p-4 text-center dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine._id} className="border-b hover:bg-gray-600">
                <td className="p-4 dark:text-white">{medicine.medicineName}</td>
                <td className="p-4 dark:text-white">{medicine.manufactureName}</td>
                <td className="p-4 dark:text-white">${medicine.price}</td>
                <td className="p-4 dark:text-white">{medicine.dosage}</td>
                <td className="p-4 dark:text-white flex justify-center space-x-3">
                  <button 
                    onClick={() => handleViewDetails(medicine)}
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    title="View Details"
                  >
                    👁️
                  </button>
                  <button 
                    onClick={() => handleAddToCart(medicine)}
                    className="text-green-500 hover:text-green-700 text-xl"
                    title="Add to Cart"
                  >
                    ➕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredMedicines.map((medicine) => (
            <div key={medicine._id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{medicine.medicineName}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewDetails(medicine)}
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    title="View Details"
                  >
                    👁️
                  </button>
                  <button 
                    onClick={() => handleAddToCart(medicine)}
                    className="text-green-500 hover:text-green-700 text-xl"
                    title="Add to Cart"
                  >
                    ➕
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Manufacturer: {medicine.manufactureName}</p>
                <p>Price: ${medicine.price}</p>
                <p>Dosage: {medicine.dosage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medicine Details Modal */}
      {modalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-black p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✖️
            </button>
            <div className="flex flex-col space-y-4">
              <img 
                src={selectedMedicine.image} 
                alt={selectedMedicine.medicineName} 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="space-y-2">
                <h2 className="text-xl dark:text-white font-bold">{selectedMedicine.medicineName}</h2>
                <div className="grid grid-cols-1 gap-2 text-sm dark:text-white">
                  <p><span className="font-semibold dark:text-white">Category:</span> {selectedMedicine.category}</p>
                  <p><span className="font-semibold">Manufacturer:</span> {selectedMedicine.manufactureName}</p>
                  <p><span className="font-semibold">Seller:</span> {selectedMedicine.sellerName}</p>
                  <p><span className="font-semibold">Price:</span> ${selectedMedicine.price}</p>
                  <p><span className="font-semibold">Dosage:</span> {selectedMedicine.dosage}</p>
                  <p><span className="font-semibold">Symptoms:</span> {selectedMedicine.symptoms.join(', ')}</p>
                  <p><span className="font-semibold">Create Date:</span> {selectedMedicine.createDate}</p>
                  <p><span className="font-semibold">Expire Date:</span> {selectedMedicine.expireDate}</p>
                  <p><span className="font-semibold">Discount:</span> {selectedMedicine.discountStatus ? 'Available' : 'Not Available'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineCategoryPage;