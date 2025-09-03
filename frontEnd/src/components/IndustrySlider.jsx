import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const IndustrySlider = ({ title, subtitle, slides, }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#e63812] to-[#ff6b4a]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="industry-slider !overflow-visible !pt-10 !pb-20 custom-swiper-nav"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="!w-[900px] max-w-[90vw]">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(230,56,18,0.2)]">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="w-full h-[300px] md:h-[500px] object-cover transform transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent md:bg-gradient-to-r" />
                  </div>
                  
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#e63812] to-[#ff6b4a] bg-clip-text text-transparent">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {slide.description}
                    </p>
                    <button className="group relative inline-flex items-center justify-start overflow-hidden rounded-lg bg-[#e63812] px-8 py-3 font-semibold text-white transition-all duration-300">
                      <span className="absolute left-0 top-0 h-full w-0 bg-[#ff6b4a] transition-all duration-300 group-hover:w-full"></span>
                      <span className="relative flex items-center gap-2">
                        En savoir plus
                        <svg 
                          className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Custom Swiper navigation styles to move buttons outside the slider */}
      <style>{`
        .custom-swiper-nav .swiper-button-next,
        .custom-swiper-nav .swiper-button-prev {
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          background: rgba(230,56,18,0.9);
          color: #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          z-index: 20;
        }
        .custom-swiper-nav .swiper-button-next {
          right: -32px;
        }
        .custom-swiper-nav .swiper-button-prev {
          left: -32px;
        }
        .custom-swiper-nav .swiper-button-next:after,
        .custom-swiper-nav .swiper-button-prev:after {
          font-size: 20px;
        }
        @media (max-width: 900px) {
          .custom-swiper-nav .swiper-button-next {
            right: 0;
          }
          .custom-swiper-nav .swiper-button-prev {
            left: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default IndustrySlider;
