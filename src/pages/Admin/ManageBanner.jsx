import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const ManageBanner = () => {
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      medicine: 'Premium Vitamin C',
      description: 'Boost your immunity with our premium Vitamin C supplements',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
      seller: 'seller1@example.com',
      active: true
    },
    {
      id: 2,
      medicine: 'Omega-3 Fish Oil',
      description: 'High-quality Omega-3 supplements for heart health',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800',
      seller: 'seller2@example.com',
      active: false
    },
    {
      id: 3,
      medicine: 'Calcium Plus',
      description: 'Complete bone health solution with added Vitamin D',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800',
      seller: 'seller3@example.com',
      active: true
    }
  ]);

  const handleToggleActive = (id) => {
    setAdvertisements(ads =>
      ads.map(ad =>
        ad.id === id ? { ...ad, active: !ad.active } : ad
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Banner Advertisements</h1>
        <p className="text-gray-600">Control which medicines appear in the homepage slider</p>
      </div>

      {/* Active Banners Preview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Banners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advertisements.filter(ad => ad.active).map((ad, index) => (
            <motion.div
              key={ad.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={ad.image}
                  alt={ad.medicine}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-white">{ad.medicine}</h3>
                  <p className="text-sm text-gray-200">{ad.seller}</p>
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
                  Medicine
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
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={ad.image}
                        alt={ad.medicine}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{ad.medicine}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {ad.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ad.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ad.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ad.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(ad.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                        ad.active
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      {ad.active ? (
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