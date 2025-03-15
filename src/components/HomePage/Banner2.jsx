import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MedicalEquipmentBanner = () => {
  // Equipment categories for the rotating text
  const equipmentCategories = [
    "Diagnostic Equipment",
    "Patient Monitoring",
    "Surgical Instruments",
    "Rehabilitation Devices",
    "Medical Imaging",
    "Laboratory Equipment"
  ];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Rotate through equipment categories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex(prev => (prev + 1) % equipmentCategories.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Hero Banner Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {/* Slide 1 - Premium Equipment */}
        <SwiperSlide>
          <div className="relative h-full">
            <div className="absolute inset-0">
              <img 
                src="/public/banner1.png" 
                alt="Modern operating room with advanced equipment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 text-white z-10 mb-8 md:mb-0">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">Premium Medical Equipment Solutions</h1>
                  <p className="text-lg md:text-xl mb-8 max-w-xl">
                    Industry-leading technology for hospitals, clinics, and healthcare professionals with guaranteed reliability and performance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/shop">
                      <button className="bg-white text-blue-900 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors">
                        Browse Equipment
                      </button>
                    </Link>
                    <Link to="/consultation">
                      <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded font-medium hover:bg-white/10 transition-colors">
                        Request Consultation
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow-xl max-w-md">
                    <h3 className="text-2xl text-white font-semibold mb-4">Featured Equipment</h3>
                    <ul className="text-white space-y-3">
                      <li className="flex items-center">
                        <div className="mr-3 bg-blue-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        Patient Monitoring Systems
                      </li>
                      <li className="flex items-center">
                        <div className="mr-3 bg-blue-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        Diagnostic Imaging Devices
                      </li>
                      <li className="flex items-center">
                        <div className="mr-3 bg-blue-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        Surgical Instruments & Tools
                      </li>
                    </ul>
                    <div className="mt-6">
                      <span className="text-white/80 block mb-2">Currently browsing:</span>
                      <span className="text-xl font-bold text-white">{equipmentCategories[currentCategoryIndex]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Solutions for Every Practice */}
        <SwiperSlide>
          <div className="relative h-full">
            <div className="absolute inset-0">
              <img 
                src="/banner2.png" 
                alt="Modern medical clinic with diverse equipment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 md:px-16">
                <div className="w-full md:w-3/5 text-white z-10">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">Solutions for Every Practice</h1>
                  <p className="text-lg md:text-xl mb-8 max-w-xl">
                    From small clinics to major hospitals, we provide customized equipment solutions that fit your specific needs and budget.
                  </p>
                  <Link to="/shop">
                    <button className="bg-white text-blue-900 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors">
                      Explore Solutions
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Service & Support */}
        <SwiperSlide>
          <div className="relative h-full">
            <div className="absolute inset-0">
              <img 
                src="/banner3.png" 
                alt="Medical equipment technician providing support" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 md:px-16">
                <div className="w-full md:w-3/5 ml-auto text-white z-10">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">Expert Service & Support</h1>
                  <p className="text-lg md:text-xl mb-8 max-w-xl">
                    Our dedicated team provides comprehensive training, maintenance, and technical support for all equipment.
                  </p>
                  <Link to="/shop">
                    <button className="bg-white text-blue-900 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors">
                      View Support Options
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Trusted by section */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-4">
        <div className="container mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-white font-medium mb-3 sm:mb-0">Trusted by leading healthcare institutions:</p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-24 h-8 bg-white/20 rounded"></div>
              <div className="w-24 h-8 bg-white/20 rounded"></div>
              <div className="w-24 h-8 bg-white/20 rounded"></div>
              <div className="w-24 h-8 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalEquipmentBanner;