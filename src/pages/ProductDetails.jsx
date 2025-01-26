import { useState } from 'react';
import { Eye, ShoppingCart, X, Plus, Minus } from 'lucide-react';

const CategoryDetails = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Sample data - replace with your actual data
  const medicines = [
    {
      id: 1,
      name: "Amoxicillin",
      category: "tablet",
      company: "Pfizer",
      price: 12.99,
      stock: 150,
      strength: "500mg",
      expiryDate: "2025-12-31",
      description: "Broad-spectrum antibiotic used to treat various bacterial infections.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
      genericName: "Amoxicillin Trihydrate",
      sideEffects: "Nausea, vomiting, diarrhea",
      dosage: "One tablet three times daily",
    },
    {
      id: 2,
      name: "Paracetamol",
      category: "tablet",
      company: "GSK",
      price: 5.99,
      stock: 200,
      strength: "500mg",
      expiryDate: "2025-10-15",
      description: "Pain reliever and fever reducer.",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800",
      genericName: "Acetaminophen",
      sideEffects: "Rare allergic reactions, liver problems with overdose",
      dosage: "One to two tablets every 4-6 hours",
    },
    {
      id: 3,
      name: "Ibuprofen",
      category: "tablet",
      company: "Novartis",
      price: 8.99,
      stock: 175,
      strength: "400mg",
      expiryDate: "2025-11-20",
      description: "Non-steroidal anti-inflammatory drug (NSAID).",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800",
      genericName: "Ibuprofen",
      sideEffects: "Stomach pain, heartburn, dizziness",
      dosage: "One tablet every 6-8 hours",
    }
  ];

  const handleAddToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const handleQuantityChange = (medicineId, change) => {
    setCart(cart.map(item => {
      if (item.id === medicineId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tablets</h1>
            <p className="mt-1 text-sm text-gray-500">Browse and select from our range of tablets</p>
          </div>
          
          {/* Cart Summary */}
          <div className="relative">
            <button 
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => setCart([])}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Medicine Table */}
          <div className="flex-grow bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Strength</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {medicines.map((medicine) => (
                    <tr key={medicine.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {medicine.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {medicine.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {medicine.strength}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {medicine.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${medicine.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                        <button
                          onClick={() => {
                            setSelectedMedicine(medicine);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(medicine)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cart */}
          {cart.length > 0 && (
            <div className="w-96 bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shopping Cart</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total Amount:</span>
                    <span>${totalAmount}</span>
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Medicine Details Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedMedicine.name}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedMedicine.image}
                    alt={selectedMedicine.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Generic Name</h3>
                    <p className="text-gray-900">{selectedMedicine.genericName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Strength</h3>
                    <p className="text-gray-900">{selectedMedicine.strength}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <p className="text-gray-900">{selectedMedicine.company}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-gray-900 mt-1">{selectedMedicine.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dosage</h3>
                  <p className="text-gray-900 mt-1">{selectedMedicine.dosage}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Side Effects</h3>
                  <p className="text-gray-900 mt-1">{selectedMedicine.sideEffects}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-gray-900 mt-1">${selectedMedicine.price}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                    <p className="text-gray-900 mt-1">{selectedMedicine.stock} units</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="text-gray-900 mt-1 capitalize">{selectedMedicine.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
                    <p className="text-gray-900 mt-1">{selectedMedicine.expiryDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    handleAddToCart(selectedMedicine);
                    setIsModalOpen(false);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;