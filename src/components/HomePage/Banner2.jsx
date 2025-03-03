import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDCardDemo } from './Demo';
import { Link } from 'react-router-dom';

const Banner2 = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Full-width background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://st2.depositphotos.com/1017986/7924/i/450/depositphotos_79248614-stock-photo-young-woman-pharmacist-drugstore-or.jpg" 
          alt="Medical background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content container with both text and 3D card */}
      <div className="relative z-10 w-full h-full flex items-center">
        {/* Text content on the left */}
        <div className="w-1/2 px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-lg mb-8">
            Get your prescriptions delivered to your doorstep. Quality medications, 
            expert pharmacists, and convenient service - all in one place.
          </p>
          <Link to='/shop'><button className="bg-emerald-500 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-600 transition-colors">
            Shop Medicines
          </button></Link>
        </div>
        
        {/* 3D card on the right */}
        <div className="w-1/2 flex justify-center items-center">
          <ThreeDCardDemo />
        </div>
      </div>
    </div>
  );
};

export default Banner2;