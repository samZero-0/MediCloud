import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ShopPage = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Increased for card layout
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("price"); // Added sortBy state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://assignment-12-blue.vercel.app/allMedicines")
      .then((res) => setMedicines(res.data));
  }, []);

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredMedicines = medicines.filter((medicine) =>
    Object.values(medicine).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Updated sorting function to handle multiple sort fields
  const sortedMedicines = filteredMedicines.sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.medicineName.localeCompare(b.medicineName)
        : b.medicineName.localeCompare(a.medicineName);
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      // If already sorting by this field, toggle order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new field, set it and default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Medicine Shop</h1>

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

      {/* Sort Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleSort("price")}
          className={`px-4 py-2 rounded-md  transition ${
            sortBy === "price" ? "bg-[#3A506B] text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Sort by Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("name")}
          className={`px-4 py-2 rounded-md transition ${
            sortBy === "name" ? "bg-[#3A506B] text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Sort by Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      {/* Card Layout for Medicines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMedicines.map((medicine) => (
          <div
            key={medicine._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition dark:bg-transparent"
          >
            <div className="p-4 flex-grow">
          <div className="w-full flex justify-center"><img src={medicine.image} className="w-full h-48 object-cover  rounded-sm"  alt="" /></div>
              <h3 className="font-semibold text-lg mb-2 truncate dark:text-white mt-2">{medicine.medicineName}</h3>
              <p className="text-[#14213D] font-bold text-xl dark:text-green-400">${medicine.price}</p>
              <p className="text-sm text-gray-600 mt-2 truncate dark:text-white">{medicine.manufactureName}</p>
            </div>
            <div className="p-4 ">
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(medicine)}
                  className="flex-1 bg-[#14213D] text-white px-3 py-2 rounded  transition"
                >
                  Details
                </button>
                <button
                  onClick={() => addToCart(medicine)}
                  className="flex-1 bg-[#FCA311] text-white px-3 py-2 rounded  transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div>
          <label className="flex items-center dark:text-white">
            Items per page:
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="ml-2 p-1 border border-gray-300 rounded-md dark:text-black"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap justify-center">
          {Array.from({ length: Math.ceil(filteredMedicines.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 mx-1 border rounded-md ${
                currentPage === i + 1 ? "bg-black text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Details Modal - Unchanged */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedMedicine.medicineName}</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedMedicine.image || "/placeholder.svg"}
                  alt={selectedMedicine.medicineName}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    ${selectedMedicine.price}
                  </p>
                  {selectedMedicine.discountStatus && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                      Discount Available
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Category</h3>
                  <p className="text-gray-600">{selectedMedicine.category}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedicine.symptoms?.map((symptom, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Dosage</h3>
                  <p className="text-gray-600">{selectedMedicine.dosage}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Manufacturer</h3>
                  <p className="text-gray-600">{selectedMedicine.manufactureName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Expiry Date</h3>
                    <p className="text-gray-600">
                      {new Date(selectedMedicine.expireDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Created Date</h3>
                    <p className="text-gray-600">
                      {new Date(selectedMedicine.createDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Seller</h3>
                  <p className="text-gray-600">{selectedMedicine.sellerName}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  addToCart(selectedMedicine);
                  closeModal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Section */}
      {/* <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span>{item.medicineName}</span>
                  <span className="font-semibold">${item.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-right font-bold text-lg">
                Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ShopPage;