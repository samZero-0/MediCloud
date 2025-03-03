import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDCardDemo } from './Demo';

const Banner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios
      .get('https://assignment-12-blue.vercel.app/active-banners')
      .then((res) => setBanner(res.data))
      .catch((err) => err);
  }, []);

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
        {banner.map((b) => (
          <SwiperSlide key={b._id}>
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover flex items-center justify-center"
              style={{ 
                backgroundImage: `url(${b.bannerImage})`
              }}
            >
              <div className='flex flex-col gap-3'>
              {/* <h2 className="text-4xl font-bold text-black text-center">{b.title}</h2> */}
              {/* <h3 className="text-4xl font-bold text-black text-center">{b.description}</h3> */}
              </div>
              {/* <ThreeDCardDemo></ThreeDCardDemo> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
};

export default Banner;