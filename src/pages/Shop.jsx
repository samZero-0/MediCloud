import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const ShopPage = () => {
  const { cart, setCart } = useContext(AuthContext); // Get cart and setCart from AuthContext
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const addToCart = (medicine) => {
    setCart((prevCart) => [...prevCart, medicine]);
    toast.success("Added to cart");
  };

  useEffect(() => {
    axios.get('https://assignment-12-blue.vercel.app/allMedicines')
      .then((res) => setMedicines(res.data));
  }, []);

  console.log(cart);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Shop</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td className="border border-gray-300 p-2">{medicine.medicineName}</td>
              <td className="border border-gray-300 p-2">${medicine.price.toFixed(2)}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => openModal(medicine)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  👁️
                </button>
                <button
                  onClick={() => addToCart(medicine)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg ">
            <h2 className="text-xl font-bold mb-2">{selectedMedicine.name}</h2>
            <img
              src={selectedMedicine.image || "/placeholder.svg"}
              alt={selectedMedicine.name}
              className="w-full h-60 object-cover mb-2"
            />
            <p className="mb-2">Price: ${selectedMedicine.price.toFixed(2)}</p>
            <p className="mb-4">{selectedMedicine.description}</p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.medicineName} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
