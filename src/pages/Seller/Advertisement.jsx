import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
const AskForAdvertisement = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext)
  const [newBanner, setNewBanner] = useState({
    bannerImage: '',
    title: '',
    description: '',
    sellerName: user.email,
    activeStatus: false,
  });

  // Fetch banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('https://assignment-12-blue.vercel.app/banners');
        //  // Replace with your API endpoint
        const userBanners = response.data.filter(
            banner => banner.sellerName === user.email
          );
          setBanners(userBanners);
        // setBanners(response.data);
      } catch (error) {
        
      }
    };
    fetchBanners();
  }, []);

  // Handle input change for the modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBanner({ ...newBanner, [name]: value });
  };

  // Handle form submission for adding a new banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://assignment-12-blue.vercel.app/banners', newBanner); // Replace with your API endpoint
      setBanners([...banners, response.data]);
      setIsModalOpen(false);
      setNewBanner({ bannerImage: '', title: '', description: ''});
    } catch (error) {
      
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ask for Advertisement</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Advertisement
      </button>

      {/* Banner List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={banner.bannerImage}
              alt={banner.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{banner.title}</h3>
            <p className="text-gray-600">{banner.description}</p>
            <p className={`mt-2 text-sm ${banner.activeStatus ? 'text-green-600' : 'text-red-600'}`}>
              {banner.activeStatus ? 'Active' : 'Inactive'}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Adding Advertisement */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Advertisement</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Banner Image URL</label>
                <input
                  type="text"
                  name="bannerImage"
                  value={newBanner.bannerImage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newBanner.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newBanner.description}
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

export default AskForAdvertisement;