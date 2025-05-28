import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CategorySlider = ({ title, categories }) => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {title}
        </h2>
        
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          className="categories-swiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Link 
                to={category.link}
                className="block group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={category.image}
                    alt={category.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="text-gray-200 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 inline-flex items-center text-[#e63812] bg-white px-4 py-2 rounded-lg transform group-hover:translate-x-2 transition-transform duration-300 delay-100">
                        En savoir plus
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySlider;
