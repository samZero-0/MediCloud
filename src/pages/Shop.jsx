import { useState } from 'react';

// Mock data for medicines
const medicines = [
  { id: 1, name: 'Aspirin', price: 5.99, description: 'Pain reliever', image: 'https://placeholder.com/150' },
  { id: 2, name: 'Ibuprofen', price: 7.99, description: 'Anti-inflammatory', image: 'https://placeholder.com/150' },
  { id: 3, name: 'Acetaminophen', price: 6.99, description: 'Fever reducer', image: 'https://placeholder.com/150' },
  // Add more medicines as needed
];

const ShopPage = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  const addToCart = (medicine) => {
    setCart([...cart, medicine]);
  };

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
              <td className="border border-gray-300 p-2">{medicine.name}</td>
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
          <div className="bg-white p-4 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">{selectedMedicine.name}</h2>
            <img
              src={selectedMedicine.image || "/placeholder.svg"}
              alt={selectedMedicine.name}
              className="w-full h-40 object-cover mb-2"
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
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopPage;