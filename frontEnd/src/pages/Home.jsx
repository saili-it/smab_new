import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTruck, FaLock, FaHeadset, FaRegCreditCard } from 'react-icons/fa';
import Hero from '../components/Hero';
import CategorySlider from '../components/CategorySlider';
import IndustrySlider from '../components/IndustrySlider';
import ProjectShowcase from '../components/ProjectShowcase';
import Stats from '../components/Stats';
import BestSellers from '../components/BestSellers';
import { getProduitsCategory } from '../services/productService';
import Partners from '../components/Partners';

// Import industry images
import agroFoodImg from '../assets/industrielle/agroFood.jpg';
import pharmaceutiqueImg from '../assets/industrielle/pharmaceutique.jpg';
import cosmetiqueImg from '../assets/industrielle/cosmetique.jpg';

// Import images for categories
import extractionHuilesImg from '../assets/images/extraction_huiles.jpg';
import packagingImg from '../assets/images/packaging.jpg';
import nettoyageImg from '../assets/images/nettoyage_sepparation.jpg';
import extractionFruitsImg from '../assets/images/extraction_fruits.jpg';
import sechageImg from '../assets/images/sechage_torrefaction.jpg';
import broyageImg from '../assets/images/broyage_mouture.jpg';

// Import USP icons
import conseilIcon from '../assets/uspIcons/conseil.png';
import installationIcon from '../assets/uspIcons/Installation.png';
import livraisonIcon from '../assets/uspIcons/Livraison.png';
import miseEnMarcheIcon from '../assets/uspIcons/Mise en marche.png';
import receptionIcon from '../assets/uspIcons/Reception.png';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from multiple categories and get random 4
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categories = ['Extraction des huiles', 'Packaging', 'Nettoyage et séparation', 'Extraction des fruits'];
        const productsPromises = categories.map(category => getProduitsCategory(category));
        const results = await Promise.all(productsPromises);
        
        // Flatten the array and get all products
        const allProducts = results.flatMap(result => result.products || []);
          // Shuffle array and get first 4 items
        const shuffledProducts = allProducts
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
          .map(product => ({
            id: product.ProductId,
            name: product.ProductLabel,
            description: product.shortDescription || product.ProductDescription || 'Description à venir',
            image: product.ImageFilenames?.length > 0 
              ? `https://www.kelmohub.com/product-images/${product.ProductRef}/${product.ImageFilenames[0]}` 
              : extractionHuilesImg,
            category: product.category || ""
          }));

        setBestSellingProducts(shuffledProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to default products if API fails
        setBestSellingProducts([
          {
            id: 1,
            name: "Machine d'extraction d'huile PRO-2000",
            description: "Machine professionnelle pour l'extraction d'huile avec une capacité de 2000L/jour.",
            image: extractionHuilesImg
          },
          {
            id: 2,
            name: "Ligne de conditionnement automatique",
            description: "Système complet de conditionnement avec une cadence de 1200 unités/heure.",
            image: packagingImg
          },
          {
            id: 3,
            name: "Système de nettoyage industriel",
            description: "Équipement de nettoyage et séparation haute performance pour grains et céréales.",
            image: nettoyageImg
          },
          {
            id: 4,
            name: "Extracteur de fruits industriel",
            description: "Machine d'extraction pour fruits et légumes avec système de pressage à froid.",
            image: extractionFruitsImg
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const heroContent = {
    videoUrl: "https://res.cloudinary.com/dzcd9eizd/video/upload/v1740649881/vdbaner_t3vuiv.mp4",
    title: "Des Solutions Avancées Pour L'Industrie Agro-Food, Pharmaceutique, Cosmétique Et Chimique",
    subtitle: "SMAB - Votre Partenaire en Équipements Industriels de Qualité"
  };

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

      {/* USP Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Pourquoi Choisir <span className="text-[#e63812]">SMAB</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">            {[
            {
              icon: conseilIcon,
              title: "Conseils et Accompagnement",
              description: "Expertise personnalisée pour vos projets industriels"
            },
            {
              icon: installationIcon,
              title: "Installation et Formation",
              description: "Service complet d'installation et formation incluse"
            },
            {
              icon: livraisonIcon,
              title: "Livraison Flexible",
              description: "Solutions de livraison adaptées à vos besoins"
            },
            {
              icon: miseEnMarcheIcon,
              title: "Mise en Marche",
              description: "Démarrage et configuration optimale de vos équipements"
            },
            {
              icon: receptionIcon,
              title: "Réception et Support",
              description: "Assistance technique et suivi continu"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >                <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#e63812]/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="relative w-14 h-14 object-contain transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-lg font-semibold text-center mb-3 text-gray-800 group-hover:text-[#e63812] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-sm text-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <CategorySlider
        title="NOTRE EXPERTISE COUVRE DIFFÉRENTES ACTIVITÉS"
        categories={[
          {
            title: "EXTRACTION DES HUILES",
            description: "Solutions complètes pour l'extraction d'huiles",
            image: extractionHuilesImg,            link: "/activite/extraction-des-huiles"
          },
          {
            title: "PACKAGING",
            description: "Équipements de conditionnement innovants",
            image: packagingImg,
            link: "/activite/packaging"
          },
          {
            title: "NETTOYAGE ET SÉPARATION",
            description: "Technologies avancées de traitement",
            image: nettoyageImg,            
            link: "/activite/nettoyage-et-separation"
          },
          {
            title: "EXTRACTION DES FRUITS",
            description: "Solutions pour le traitement des fruits",
            image: extractionFruitsImg,
            link: "/activite/extraction-des-fruits"
          },
          {
            title: "SÉCHAGE ET TORRÉFACTION",
            description: "Équipements de séchage professionnels",
            image: sechageImg,
            link: "/activite/sechage-et-torrefaction"
          },
          {
            title: "BROYAGE ET MOUTURE",
            description: "Solutions de broyage industriel",
            image: broyageImg,
            link: "/activite/broyage-et-mouture"
          }
        ]}
      />

      {/* Industry Section */}
      <IndustrySlider
        title="DÉCOUVREZ SMAB"
        subtitle="Votre expert en solutions industrielles pour tous vos besoins en transformation et fin de ligne dans divers secteurs."
        slides={[
          {
            image: agroFoodImg,
            title: "Agro-food",
            description: "Solutions complètes pour l'optimisation et la transformation des produits destinés à l'alimentation humaine et animale, visant à améliorer l'efficacité et la qualité de vos opérations."
          },
          {
            image: pharmaceutiqueImg,
            title: "Pharmaceutique",
            description: "Technologies avancées pour le conditionnement et la manipulation des produits pharmaceutiques, garantissant des normes de sécurité et de précision élevées."
          },
          {
            image: cosmetiqueImg,
            title: "Cosmétique",
            description: "Équipements pour la production et le conditionnement de produits cosmétiques, assurant une conformité rigoureuse aux standards de qualité et de sécurité."
          }
        ]}      />

      {/* Project Showcase Section */}      
      <ProjectShowcase
        title="Nos projets et réalisations"
        projects={[
          {
            id: 1,
            name: "Ils nous ont fait confiance : Bimbo",
            video: "https://www.youtube.com/embed/rHN63sxe61I?si=jIpI3wQqcq7ppL7G"
          },
          {
            id: 2,
            name: "Ils nous ont fait confiance : OFPPT",
            video: "https://www.youtube.com/embed/pfpbR4yBXfU?si=GfQqg9QZoZu5fcN0"
          },
          {
            id: 3,
            name: "Ils nous ont fait confiance : DRA de Fès - Meknès",
            video: "https://www.youtube.com/embed/9Hw0WgkBn08?si=aANGVo-qW2_CepGX"
          }
        ]}
      />      
      {/* Best Sellers Section */}
      <BestSellers 
        title="Nos Meilleures Ventes"
        products={bestSellingProducts}
      />      
      {/* Stats Section */}
      <Stats />

      {/* Partners Section */}
      <Partners />

    </div>
  )
}

export default Home
