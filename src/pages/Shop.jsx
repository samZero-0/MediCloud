import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ShopPage = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    window.scrollTo(0, 0);
    
  },[])

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  
  // Sorting states
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("price");
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 100 },
    discountOnly: false,
    manufacturers: []
  });
  
  // Derived states
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueManufacturers, setUniqueManufacturers] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://assignment-12-blue.vercel.app/allMedicines")
      .then((res) => {
        setMedicines(res.data);
        
        // Extract unique categories and manufacturers
        const categories = [...new Set(res.data.map(med => med.category))];
        const manufacturers = [...new Set(res.data.map(med => med.manufactureName))];
        
        // Find min and max prices
        const prices = res.data.map(med => med.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        
        setUniqueCategories(categories);
        setUniqueManufacturers(manufacturers);
        setPriceRange({ min, max });
        setFilters(prev => ({ 
          ...prev, 
          priceRange: { min, max }
        }));
        
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load medicines. Please try again later.");
        setLoading(false);
        console.error("Error fetching medicines:", err);
      });
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
    toast.success(`${medicine.medicineName} added to cart`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleCategory = (category) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories: newCategories };
    });
    setCurrentPage(1);
  };

  const toggleManufacturer = (manufacturer) => {
    setFilters(prev => {
      const newManufacturers = prev.manufacturers.includes(manufacturer)
        ? prev.manufacturers.filter(m => m !== manufacturer)
        : [...prev.manufacturers, manufacturer];
      
      return { ...prev, manufacturers: newManufacturers };
    });
    setCurrentPage(1);
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: Number(value) }
    }));
    setCurrentPage(1);
  };

  const toggleDiscountOnly = () => {
    setFilters(prev => ({
      ...prev,
      discountOnly: !prev.discountOnly
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: priceRange.min, max: priceRange.max },
      discountOnly: false,
      manufacturers: []
    });
    setSearchQuery("");
    setSortBy("price");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  // Filter medicines based on all criteria
  const filteredMedicines = medicines.filter(medicine => {
    // Text search filter
    const matchesSearch = searchQuery === "" || 
      Object.values(medicine).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    // Category filter
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(medicine.category);
      
    // Price range filter
    const matchesPrice = medicine.price >= filters.priceRange.min && 
      medicine.price <= filters.priceRange.max;
      
    // Discount filter
    const matchesDiscount = !filters.discountOnly || medicine.discountStatus;
    
    // Manufacturer filter
    const matchesManufacturer = filters.manufacturers.length === 0 ||
      filters.manufacturers.includes(medicine.manufactureName);
      
    return matchesSearch && matchesCategory && matchesPrice && 
      matchesDiscount && matchesManufacturer;
  });

  // Sort filtered medicines
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.medicineName.localeCompare(b.medicineName)
        : b.medicineName.localeCompare(a.medicineName);
    }
    return 0;
  });

  // Paginate results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedMedicines.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-transparent min-h-screen">
      <Helmet>
        <title>MediShop - Browse Medicines</title>
      </Helmet>
      
      {/* Mobile filter toggle button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button 
          onClick={() => setMobileFilterVisible(!mobileFilterVisible)}
          className="bg-[#3A506B] text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for Desktop */}
          <aside className="lg:w-1/4 sticky top-4 self-start hidden lg:block bg-white dark:bg-transparent dark:text-white dark:border p-5 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:underline"
              >
                Reset all filters
              </button>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 dark:text-white mb-2">Categories</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {uniqueCategories.map(category => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-white">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2 dark:text-white">Price Range</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-white">$</span>
                <input
                  type="number"
                  min={priceRange.min}
                  max={filters.priceRange.max}
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="w-full border border-gray-300 rounded p-1 text-sm"
                />
                <span className="text-gray-600 dark:text-white">to</span>
                <input
                  type="number"
                  min={filters.priceRange.min}
                  max={priceRange.max}
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="w-full border border-gray-300 rounded p-1 text-sm"
                />
              </div>
            </div>
            
            {/* Discount Filter */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.discountOnly}
                  onChange={toggleDiscountOnly}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-white">Discount Only</span>
              </label>
            </div>
            
            {/* Manufacturers */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2 dark:text-white">Manufacturers</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {uniqueManufacturers.map(manufacturer => (
                  <label key={manufacturer} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.manufacturers.includes(manufacturer)}
                      onChange={() => toggleManufacturer(manufacturer)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 truncate dark:text-white">{manufacturer}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>
          
          {/* Mobile Sidebar */}
          <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${mobileFilterVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed right-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto transition-transform duration-300 transform ${mobileFilterVisible ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-5">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                  <button 
                    onClick={() => setMobileFilterVisible(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <button 
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:underline mb-4 block"
                >
                  Reset all filters
                </button>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 dark:text-white">Categories</h3>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {uniqueCategories.map(category => (
                      <label key={category} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-white">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 dark:text-white">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-white">$</span>
                    <input
                      type="number"
                      min={priceRange.                      min}
                      max={filters.priceRange.max}
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="w-full border border-gray-300 rounded p-1 text-sm"
                    />
                    <span className="text-gray-600 dark:text-white">to</span>
                    <input
                      type="number"
                      min={filters.priceRange.min}
                      max={priceRange.max}
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="w-full border border-gray-300 rounded p-1 text-sm"
                    />
                  </div>
                </div>
                
                {/* Discount Filter */}
                <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.discountOnly}
                      onChange={toggleDiscountOnly}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-white">Discount Only</span>
                  </label>
                </div>
                
                {/* Manufacturers */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 dark:text-white">Manufacturers</h3>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {uniqueManufacturers.map(manufacturer => (
                      <label key={manufacturer} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.manufacturers.includes(manufacturer)}
                          onChange={() => toggleManufacturer(manufacturer)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 truncate dark:text-white">{manufacturer}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search by medicine name, generic name, company, etc."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent"
              />
            </div>
            
            {/* Sort and Filter Summary */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSort("price")}
                  className={`px-4 py-2 rounded-md transition ${
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
              
              <div className="text-sm text-gray-600 dark:text-white">
                Showing {currentMedicines.length} of {filteredMedicines.length} results
              </div>
            </div>
            
            {/* Medicine Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-6">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentMedicines.map((medicine) => (
                  <div
                    key={medicine._id}
                    className="bg-white dark:bg-transparent dark:text-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition"
                  >
                    <div className="p-4 flex-grow">
                      <div className="w-full flex justify-center">
                        <img 
                          src={medicine.image} 
                          alt={medicine.medicineName} 
                          className="w-full h-48 object-cover rounded-sm"
                        />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 truncate mt-2">{medicine.medicineName}</h3>
                      <p className="text-[#14213D] font-bold text-xl dark:text-white">${medicine.price}</p>
                      <p className="text-sm text-gray-600 mt-2 truncate dark:text-white">{medicine.manufactureName}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(medicine)}
                          className="flex-1 bg-[#14213D] text-white px-3 py-2 rounded transition"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => addToCart(medicine)}
                          className="flex-1 bg-[#FCA311] text-white px-3 py-2 rounded transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <div>
                <label className="flex items-center dark:text-white">
                  Items per page:
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="ml-2 p-1 border border-gray-300 rounded-md dark:bg-transparent"
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={20}>20</option>
                  </select>
                </label>
              </div>
              <div className="flex flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => (
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
          </div>
        </div>
      </div>
      
      {/* Medicine Details Modal */}
      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
          <div className="bg-white dark:bg-black p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedMedicine.medicineName}</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 dark:text-white hover:text-gray-800 text-3xl"
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
                <div className="bg-blue-50 dark:bg-black dark:text-white p-4 rounded-lg">
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
                  <h3 className="font-semibold text-gray-700 dark:text-white ">Category</h3>
                  <p className="text-gray-600 dark:text-white">{selectedMedicine.category}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-white">Symptoms</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMedicine.symptoms?.map((symptom, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100  text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-white">Dosage</h3>
                  <p className="text-gray-600 dark:text-white">{selectedMedicine.dosage}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-white">Manufacturer</h3>
                  <p className="text-gray-600 dark:text-white">{selectedMedicine.manufactureName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-white">Expiry Date</h3>
                    <p className="text-gray-600 dark:text-white">
                      {new Date(selectedMedicine.expireDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-white">Created Date</h3>
                    <p className="text-gray-600 dark:text-white">
                      {new Date(selectedMedicine.createDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-white">Seller</h3>
                  <p className="text-gray-600 dark:text-white">{selectedMedicine.sellerName}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-white"
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
    </div>
  );
};

export default ShopPage;