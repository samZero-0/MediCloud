import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Pain Relief Plus",
    price: 29.99,
    category: "Pain Management",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Fast-acting pain relief formula"
  },
  {
    id: 2,
    name: "Vitamin C Complex",
    price: 19.99,
    category: "Vitamins",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Immune system support"
  },
  {
    id: 3,
    name: "Sleep Well",
    price: 24.99,
    category: "Sleep Aid",
    image: "https://m.media-amazon.com/images/I/61p3SGQsLwL._AC_UF1000,1000_QL80_.jpg",
    description: "Natural sleep support formula"
  },
  {
    id: 4,
    name: "Omega-3 Fish Oil",
    price: 34.99,
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Heart and brain health support"
  }
];

const RecentProducts = () => {
  return (
    <section className="py-3 ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Recent Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>
              
              <div className="p-6">
                <span className="text-sm text-blue-600 font-medium">
                  {product.category}
                </span>
                <h3 className="font-semibold text-xl text-gray-800 mt-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {product.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">
                    ${product.price}
                  </span>
                  <button
                    className="flex items-center space-x-2 bg-[#FCA311] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;