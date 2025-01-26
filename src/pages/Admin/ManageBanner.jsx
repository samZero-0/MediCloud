import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBanner = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [activeAds, setActiveAds] = useState([]);

  // Fetch all banners on component mount
  useEffect(() => {
    axios
      .get("https://assignment-12-blue.vercel.app/banners")
      .then((res) => setAdvertisements(res.data))
      .catch((err) => console.error("Error fetching banners:", err));
  }, []);

  // Toggle active status of a banner
  const handleToggleActive = (id) => {
    setAdvertisements((ads) =>
      ads.map((ad) => {
        if (ad._id === id) {
          const newStatus = !ad.activeStatus;
          // Update the activeAds array based on the new activeStatus
          setActiveAds((prev) => {
            if (newStatus) {
              return [...prev, ad._id]; // Add to activeAds
            } else {
              return prev.filter((adId) => adId !== ad._id); // Remove from activeAds
            }
          });
          return { ...ad, activeStatus: newStatus };
        }
        return ad;
      })
    );
  };



  // Save the selected active banners
  const handleSave = () => {
    console.log("Active Ads:", activeAds); 

    axios
      .patch("https://assignment-12-blue.vercel.app/update-active-banners", { activeAds })
      .then((res) => {
        toast.success("Active ads updated successfully");
      })
      .catch((err) => {
        console.error("Error updating active ads:", err.response?.data || err.message);
        toast.error("Failed to update active ads");
      });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Banner Advertisements</h1>
        <p className="text-gray-600">Control which banners appear in the homepage slider</p>
        <div className="flex justify-end w-full">
          <button
            onClick={handleSave}
            className="p-4 bg-green-500 text-white rounded-xl w-[100px]"
          >
            Save
          </button>
        </div>
      </div>

      {/* Active Banners Preview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Banners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements
            .filter((ad) => ad.activeStatus)
            .map((ad, index) => (
              <motion.div
                key={ad._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={ad.bannerImage}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{ad.title}</h3>
                    <p className="text-sm text-gray-200">{ad.sellerName}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* All Advertisements */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {advertisements.map((ad, index) => (
                <motion.tr
                  key={ad._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={ad.bannerImage}
                        alt={ad.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {ad.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ad.sellerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ad.activeStatus
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {ad.activeStatus ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(ad._id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                        ad.activeStatus
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {ad.activeStatus ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Remove from Slider
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Add to Slider
                        </>
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBanner;