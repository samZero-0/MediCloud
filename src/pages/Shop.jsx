import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";

const ShopPage = () => {
  const { cart, setCart } = useContext(AuthContext); // Get cart and setCart from AuthContext
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting by price
  const [searchQuery, setSearchQuery] = useState(""); // Search functionality

  // Fetch medicines on component mount
  useEffect(() => {
    axios
      .get("https://assignment-12-blue.vercel.app/allMedicines")
      .then((res) => setMedicines(res.data));
  }, []);

  // Open modal for medicine details
  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  // Add medicine to cart
  const addToCart = (medicine) => {
    setCart((prevCart) => [...prevCart, medicine]);
    toast.success("Added to cart");
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter medicines based on search query
  const filteredMedicines = medicines.filter((medicine) =>
    Object.values(medicine).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort medicines by price
  const sortedMedicines = filteredMedicines.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change items per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medicine Shop</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by medicine name, generic name, company, etc."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Sort by Price Button */}
      <div className="mb-4">
        <button
          onClick={toggleSortOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
      </div>

      {/* Medicine Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMedicines.map((medicine) => (
            <tr key={medicine.id}>
              <td className="border border-gray-300 p-2">{medicine.medicineName}</td>
              <td className="border border-gray-300 p-2">${medicine.price}</td>
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>
            Items per page:
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="ml-2 p-1 border border-gray-300 rounded-md"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
        <div>
          {Array.from({ length: Math.ceil(filteredMedicines.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 border rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Details Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{selectedMedicine.medicineName}</h2>
            <img
              src={selectedMedicine.image || "/placeholder.svg"}
              alt={selectedMedicine.medicineName}
              className="w-full h-60 object-cover mb-2"
            />
            <p className="mb-2">Price: ${selectedMedicine.price}</p>
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

      {/* Cart Section */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.medicineName} - ${item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShopPage;