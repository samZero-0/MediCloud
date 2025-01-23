
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <div className="relative w-full h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div className="w-full h-full bg-blue-500 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Slide 1</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full bg-green-500 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Slide 2</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full bg-red-500 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Slide 3</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;