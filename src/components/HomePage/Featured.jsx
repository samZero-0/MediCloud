import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  { id: 1, name: "Advanced First Aid Kit", image: "https://www.mfasco.com/4503z.jpg", price: 49.99, rating: 4.8,  description: "Immune system support" },
  {
    id: 2,
    name: " Blood Pressure Monitor",
    image: "https://static-01.daraz.com.bd/p/9661b31e4316dc84034be27bd3fe17e6.jpg",
    price: 79.99,
    rating: 4.7,
    description: "Immune system support"
  },
  {
    id: 3,
    name: "Organic Multivitamin Pack",
    image: "https://m.media-amazon.com/images/I/61HSqy+PSnL._AC_SL1200_.jpg",
    price: 34.99,
    rating: 4.9,
    description: "Immune system support"
  },
  {
    id: 2,
    name: "Vitamin C Complex",
    price: 19.99,
   
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=300&h=300",
    description: "Immune system support"
  },
]

// const ProductCard = ({ product }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
//     <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-56 object-cover" />
//     <div className="p-4">
//       <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//       <div className="flex justify-between items-center">
//         <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
//         <div className="flex items-center">
//           <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//           <span className="ml-1 text-gray-600">{product.rating}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// )

const FeaturedProducts = () => {
  return (
    <section className="py-3">
    <div className="max-w-8xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Trending Products
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300  dark:bg-transparent border"
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
              <span className="text-sm text-blue-600 font-medium dark:text-gray-300">
                {product.category}
              </span>
              <h3 className="font-semibold text-xl text-gray-800 mt-2 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2 text-sm dark:text-gray-200">
                {product.description}
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-green-400">
                  ${product.price}
                </span>
               <Link to='/shop'>
               <button
                  className="flex items-center space-x-2 bg-[#FCA311] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Buy now</span>
                </button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FeaturedProducts

