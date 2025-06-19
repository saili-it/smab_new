import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png'; 

const Hero = ({ videoUrl, imageUrl, title, subtitle, overlay = true, showLogo = false, showButton = false }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Hero background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : null}

      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 md:px-8">
        {showLogo && (
          <img 
            src={logo} 
            alt="SMAB Logo" 
            className="w-48 md:w-64 mb-8"
          />
        )}
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              {subtitle}
            </p>
          )}
          
          {showButton && (
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#e63812] text-white px-8 py-3 rounded-lg hover:bg-[#ff6b4a] transition-colors font-semibold mt-6"
            >
              Contactez-nous
              <FaArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
