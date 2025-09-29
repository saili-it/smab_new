import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png'; 

const Hero = ({ videoUrl, imageUrl, mobileImag, imageAlt, title, subtitle, overlay = true, showLogo = false, showButton = true, ctaText , ctaLink  }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Mobile Version */}
      <Link to="/contact" className="block md:hidden">
        <img
          src={mobileImag}
          alt={imageAlt}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ height:'50%'}}
        />
      </Link>

      {/* Desktop Version */}
      <div className="hidden md:block">
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
      </div>

      <div className="hidden md:block">
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
          
          {showButton && ctaText && ctaLink && (
            typeof ctaLink === 'string' && ctaLink.startsWith('http') ? (
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 bg-[#e63812] text-white px-8 py-3 rounded-lg hover:bg-[#ff6b4a] transition-colors font-semibold mt-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                {ctaText}
                <FaArrowRight />
              </a>
            ) : (
              <Link
                to={typeof ctaLink === 'string' && ctaLink.startsWith('/') ? ctaLink : `/${ctaLink}`}
                className="inline-flex items-center gap-2 bg-[#e63812] text-white px-8 py-3 rounded-lg hover:bg-[#ff6b4a] transition-colors font-semibold mt-6"
              >
                {ctaText}
                <FaArrowRight />
              </Link>
            )
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;
