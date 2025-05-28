import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTruck, FaLock, FaHeadset, FaRegCreditCard } from 'react-icons/fa';
import Hero from '../components/Hero';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = {
    videoUrl: "https://res.cloudinary.com/dzcd9eizd/video/upload/v1740649881/vdbaner_t3vuiv.mp4",
    title: "Des Solutions Avancées Pour L'Industrie Agro-Food, Pharmaceutique, Cosmétique Et Chimique",
    subtitle: "SMAB - Votre Partenaire en Équipements Industriels de Qualité"
  };

  const slides = [
    {
      image: '/slider/slide1.jpg',
      title: 'Équipements Industriels de Qualité',
      description: 'Des solutions innovantes pour optimiser votre production',
      link: '/products/industrial'
    },
    {
      image: '/slider/slide2.jpg',
      title: 'Automation & Contrôle',
      description: 'Technologies de pointe pour l\'industrie moderne',
      link: '/products/automation'
    },
    // Add more slides as needed
  ];

  const featuredCategories = [
    {
      name: 'Équipements Industriels',
      image: '/categories/industrial.jpg',
      link: '/category/industrial'
    },
    {
      name: 'Automation',
      image: '/categories/automation.jpg',
      link: '/category/automation'
    },
    {
      name: 'Sécurité',
      image: '/categories/security.jpg',
      link: '/category/security'
    },
    {
      name: 'Maintenance',
      image: '/categories/maintenance.jpg',
      link: '/category/maintenance'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])



  return (
    <div className="min-h-screen">
      <Hero 
        videoUrl={heroContent.videoUrl}
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        overlay={true}
        showLogo={true}
        showButton={true}
      />
      
      {/* Featured Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category, index) => (
              <Link 
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-semibold p-6 transform group-hover:translate-y-[-10px] transition-transform">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-[#e63812] text-4xl mb-4 flex justify-center">
                <FaTruck />
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison gratuite partout au Maroc pour les commandes supérieures à 5000 DH</p>
            </div>
            <div className="text-center p-6">
              <div className="text-[#e63812] text-4xl mb-4 flex justify-center">
                <FaLock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">Vos transactions sont sécurisées par les meilleurs systèmes de paiement</p>
            </div>
            <div className="text-center p-6">
              <div className="text-[#e63812] text-4xl mb-4 flex justify-center">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
              <p className="text-gray-600">Notre équipe est disponible pour vous assister à tout moment</p>
            </div>
            <div className="text-center p-6">
              <div className="text-[#e63812] text-4xl mb-4 flex justify-center">
                <FaRegCreditCard />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantie Satisfait</h3>
              <p className="text-gray-600">Garantie de satisfaction sur tous nos produits et services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Optimiser Votre Production?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez comment nos solutions peuvent transformer votre entreprise
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#e63812] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Contactez-nous
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
