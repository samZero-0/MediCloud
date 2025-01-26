
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
    image: "https://d1dyj6segvzycq.cloudfront.net/96a7134c-2faa-4e69-9788-8da21a83dc9a/9cdec8ed-35e7-4720-8e2a-844547848493/9cdec8ed-5d3c-4385-b2fc-44eb7944ad40/Evoflex-Pain-Relief-Gel-120g-Evoflex_20120g.png",
    originalPrice: 29.99,
    discountPrice: 24.99,
    discountPercentage: 17,
  },
  {
    id: 2,
    name: "Allergy Relief Tablets",
    image: "https://i5.walmartimages.com/seo/Equate-Allergy-Relief-Cetirizine-Hydrochloride-Tablets-10-mg-14-Count_8f6c1020-60c9-4748-b521-627d1a3f7c8b.ebe8a776dd3bed9af918db01e9c21499.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    originalPrice: 19.99,
    discountPrice: 15.99,
    discountPercentage: 20,
  },
  {
    id: 3,
    name: "Vitamin C Supplements",
    image: "https://m.media-amazon.com/images/I/81gG6xbCv2L._AC_SL1500_.jpg",
    originalPrice: 14.99,
    discountPrice: 11.99,
    discountPercentage: 20,
  },
  {
    id: 4,
    name: "Digestive Health Capsules",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQePx2HeanAVWwlS-uqm9Asib2j_JLL6C-zXg&s",
    originalPrice: 24.99,
    discountPrice: 19.99,
    discountPercentage: 20,
  },
  {
    id: 5,
    name: "Sleep Aid Tablets",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCITAsrAS3RKYgC0OrqG0_RgfyeyT86lsbAw&s",
    originalPrice: 34.99,
    discountPrice: 27.99,
    discountPercentage: 20,
  },
  {
    id: 6,
    name: "Multivitamin Gummies",
    image: "https://careshopbd.com/wp-content/uploads/2020/10/vita-gummies-multi-vitamin-vegies.png",
    originalPrice: 21.99,
    discountPrice: 17.59,
    discountPercentage: 20,
  },
  {
    id: 7,
    name: "Omega-3 Fish Oil",
    image: "https://i5.walmartimages.com/seo/Spring-Valley-Omega-3-from-Fish-Oil-Maximum-Care-Softgels-2000mg-180-Count_6015924e-0079-4ffd-ab1b-36593502df28.be9fb0ead7568ec7b149935b8ec494d0.jpeg",
    originalPrice: 39.99,
    discountPrice: 31.99,
    discountPercentage: 20,
  },
  {
    id: 8,
    name: "Probiotic Supplement",
    image: "https://images-cdn.ubuy.co.in/65ef3a1a20d941274a2ed1b3-spring-valley-inulin-probiotic.jpg",
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
    <section className="py-12 ">
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

