import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png';

const Hero = ({ videoUrl, imageUrl, mobileImag, imageAlt, title, subtitle, overlay = true, showLogo = false, showButton = true, ctaText, ctaLink }) => {
  return (
    <div className="relative h-[37vh] sm:h-[67vh] md:h-screen w-full overflow-hidden">
      {/* Mobile media */}
      <div className="block md:hidden">
        {mobileImag && (
          <img
          onClick={() => window.location.href = '/contact'}
            src={mobileImag}
            alt={imageAlt}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>
      
      {/* Desktop Version */}
      <div className="hidden md:block">
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
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

      
      {/* Content (hidden on mobile, visible from md) */}
      <div className="hidden md:flex md:relative h-full flex-col items-center justify-center text-white px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mt-10 md:mt-20">
          {showLogo && (
            <div className="flex justify-center mb-6 md:mb-8">
              <img src={logo} alt="SMAB logo" className="h-10 md:h-12 w-auto" />
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 md:mb-8">
              {subtitle}
            </p>
          )}

          {showButton && ctaText && ctaLink && (
            typeof ctaLink === 'string' && ctaLink.startsWith('http') ? (
              <a
                href={ctaLink}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white px-8 py-3 md:px-10 md:py-4 rounded-full hover:from-[#ff6b4a] hover:to-[#e63812] transition-all duration-300 font-bold text-base md:text-lg shadow-2xl hover:shadow-[#e63812]/50 hover:scale-105 transform hover:-translate-y-1 border-2 border-white/20 hover:border-white/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10">{ctaText}</span>
                <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ) : (
              <Link
                to={typeof ctaLink === 'string' && ctaLink.startsWith('/') ? ctaLink : `/${ctaLink}`}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white px-8 py-3 md:px-10 md:py-4 rounded-full hover:from-[#ff6b4a] hover:to-[#e63812] transition-all duration-300 font-bold text-base md:text-lg shadow-2xl hover:shadow-[#e63812]/50 hover:scale-105 transform hover:-translate-y-1 border-2 border-white/20 hover:border-white/40"
              >
                <span className="relative z-10">{ctaText}</span>
                <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
