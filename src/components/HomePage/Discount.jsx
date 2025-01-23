
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

// Mock data for discount products
const discountProducts = [
  {
    id: 1,
    name: "Pain Relief Gel",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 29.99,
    discountPrice: 24.99,
    discountPercentage: 17,
  },
  {
    id: 2,
    name: "Allergy Relief Tablets",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 19.99,
    discountPrice: 15.99,
    discountPercentage: 20,
  },
  {
    id: 3,
    name: "Vitamin C Supplements",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 14.99,
    discountPrice: 11.99,
    discountPercentage: 20,
  },
  {
    id: 4,
    name: "Digestive Health Capsules",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 24.99,
    discountPrice: 19.99,
    discountPercentage: 20,
  },
  {
    id: 5,
    name: "Sleep Aid Tablets",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 34.99,
    discountPrice: 27.99,
    discountPercentage: 20,
  },
  {
    id: 6,
    name: "Multivitamin Gummies",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 21.99,
    discountPrice: 17.59,
    discountPercentage: 20,
  },
  {
    id: 7,
    name: "Omega-3 Fish Oil",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 39.99,
    discountPrice: 31.99,
    discountPercentage: 20,
  },
  {
    id: 8,
    name: "Probiotic Supplement",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 29.99,
    discountPrice: 23.99,
    discountPercentage: 20,
  },
]

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="text-xl font-bold text-green-600 ml-2">${product.discountPrice.toFixed(2)}</span>
        </div>
        <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
          {product.discountPercentage}% OFF
        </span>
      </div>
    </div>
  </div>
)

const Discount = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Discount Products</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="discount-swiper"
        >
          {discountProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Discount

