import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

  // Get website content from Redux store
  const contentWebSite = useSelector(state => state.content.data);
  console.log(contentWebSite)

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
            category: product.category || "",
            productRef: product.ProductRef
          }));

        setBestSellingProducts(shuffledProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Get hero data from contentWebSite if available
  const heroData = contentWebSite?.smabHomePage?.hero;

  // Build video or image URL using VITE_API_CONTENT
  let heroMediaUrl = '';
  if (heroData && heroData.bannier) {
    heroMediaUrl = `${import.meta.env.VITE_API_CONTENT}/media/${heroData.bannier}`;
  }



  return (
    <div className="min-h-screen">
      <Hero
        videoUrl={heroData?.isVideo ? heroMediaUrl : undefined}
        imageUrl={!heroData?.isVideo ? heroMediaUrl : undefined}
        title={heroData?.title || ''}
        subtitle={heroData?.text || ''}
        overlay={true}
        showLogo={true}
        showButton={!!heroData?.ctaText}
        ctaText={heroData?.ctaText}
        ctaLink={heroData?.ctaLink}
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
            >
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
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
            image: extractionHuilesImg, link: "/activite/extraction-des-huiles"
            
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
            link: "/activite/nettoyage-separation"
          },
          {
            title: "EXTRACTION DES FRUITS",
            description: "Solutions pour le traitement des fruits",
            image: extractionFruitsImg,
            link: "/activite/extraction-fruits"
          },
          {
            title: "SÉCHAGE ET TORRÉFACTION",
            description: "Équipements de séchage professionnels",
            image: sechageImg,
            link: "/activite/sechage-torrefaction"
          },
          {
            title: "BROYAGE ET MOUTURE",
            description: "Solutions de broyage industriel",
            image: broyageImg,
            link: "/activite/broyage-mouture"
          }
        ]}
      />

      {/* Industry Section */}
      <IndustrySlider
        title={contentWebSite?.smabHomePage?.decouvrez?.title || "DÉCOUVREZ SMAB"}
        subtitle={contentWebSite?.smabHomePage?.decouvrez?.text || "Votre expert en solutions industrielles pour tous vos besoins en transformation et fin de ligne dans divers secteurs."}
        slides={
          Array.isArray(contentWebSite?.smabHomePage?.decouvrez?.swiper)
            ? contentWebSite.smabHomePage.decouvrez.swiper.map(item => ({
                image: item.image ? `${import.meta.env.VITE_API_CONTENT}/media/${item.image}` : '',
                title: item.title,
                description: item.desc
              }))
            : []
        }
      />

      {/* Project Showcase Section */}      
      <ProjectShowcase
        title="Nos projets et réalisations"
        projects={
          Array.isArray(contentWebSite?.smabHomePage?.projets)
            ? contentWebSite.smabHomePage.projets.map((item, idx) => ({
                id: item._id || idx,
                name: item.title,
                video: item.videoUrl
              }))
            : []
        }
      />
      {/* Best Sellers Section */}
      <BestSellers
        title="Nos Meilleures Ventes"
        products={bestSellingProducts}
      />
      {/* Stats Section */}
      <Stats
        projetsRealises={contentWebSite?.smabHomePage?.counter?.projetsRealises}
        partenaires={contentWebSite?.smabHomePage?.counter?.partenaires}
        ansExpertise={contentWebSite?.smabHomePage?.counter?.ansExpertise}
      />

      {/* Partners Section */}
      <Partners
        images={Array.isArray(contentWebSite?.smabHomePage?.partenaires?.images)
          ? contentWebSite.smabHomePage.partenaires.images.map(img => `${import.meta.env.VITE_API_CONTENT}/media/${img}`)
          : []}
        title={contentWebSite?.smabHomePage?.partenaires?.title}
        text={contentWebSite?.smabHomePage?.partenaires?.text}
      />

    </div>
  )
}

export default Home
