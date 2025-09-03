import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Seo from '../components/Seo';

const Services = () => {
  // Get dynamic hero image and services data from Redux store
  const contentWebSite = useSelector(state => state.content.data);
  const smabNosServicesPage = contentWebSite?.smabNosServicesPage || {};
  const cards = smabNosServicesPage.cards || [];
  const details = smabNosServicesPage.details || [];
  const seoData = smabNosServicesPage.seo || {};
  const apiBase = import.meta.env.VITE_API_CONTENT;

  // Build dynamic services array by matching cards and details by key
  const services = cards.map((card, idx) => {
    const detail = details.find(d => d.key === card.key) || {};
    return {
      id: card.key,
      title: card.title,
      description: card.desc,
      image: card.icon ? `${apiBase}/media/${card.icon}` : '',
      detailImage: detail.image ? `${apiBase}/media/${detail.image}` : '',
      features: detail.pointsCles || [],
      detailedDescription: detail.pointsFort || [],
      delay: 0.1 + idx * 0.1,
    };
  });

  // Use a single ref object for all service sections
  const refs = React.useRef({});
  React.useEffect(() => {
    services.forEach(service => {
      if (!refs.current[service.id]) {
        refs.current[service.id] = React.createRef();
      }
    });
  }, [services]);

  const scrollToSection = (id) => {
    refs.current[id]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Hero banner
  const heroImageId = smabNosServicesPage?.hero?.image;
  const heroBanner = heroImageId ? `${apiBase}/media/${heroImageId}` : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo
        title={seoData?.metaTitle || "Nos Services - SMAB"}
        description={seoData?.metaDescription  || "Découvrez nos services professionnels"}
        keywords={seoData?.keywords || ["services", "industriel", "SMAB"]}
        focusKeyphrase={seoData?.focusKeyphrase}
        ogImage={heroBanner}
      />
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        {heroBanner ? (
          <img
            src={heroBanner}
            alt={smabNosServicesPage?.hero?.imageAlt || "Nos Services Banner"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">Aucune image</div>
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            {/* Optionally add hero text here */}
          </motion.div>
        </div>
      </div>
      {/* Services Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{smabNosServicesPage?.hero?.title || "Nos Services Professionnels"}</h1>
          <div className="h-1 w-20 bg-[#e63812] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {smabNosServicesPage?.hero?.text || "Découvrez notre gamme complète de services professionnels conçus pour répondre à vos besoins industriels."}
          </p>
        </motion.div>

        {services.length === 0 ? (
          <div className="text-center text-gray-400">Aucun service disponible.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100"
              >
                <div className="mb-6 relative">
                  <div
                    onClick={() => scrollToSection(service.id)}
                    className="w-20 h-20 mx-auto mb-4 bg-[#e63812]/10 rounded-2xl p-4 group-hover:bg-[#e63812] transition-colors duration-300 cursor-pointer transform hover:scale-105"
                  >
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">No Icon</div>
                    )}
                  </div>
                  <div className="h-1 w-12 bg-[#e63812] mx-auto transform origin-left group-hover:w-20 transition-all duration-300"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-[#e63812] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <motion.button
                    onClick={() => scrollToSection(service.id)}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-[#e63812] font-semibold group/btn cursor-pointer"
                  >
                    En savoir plus
                    <FaArrowRight className="ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Detailed Service Sections */}
      {services.map((service, index) => (
        <div
          ref={refs.current[service.id]}
          key={service.id}
          className="relative overflow-hidden py-24 scroll-mt-24"
          style={{
            backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc'
          }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-16`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {service.detailImage ? (
                      <img
                        src={service.detailImage}
                        alt={service.imageAlt}
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-gray-300">No Image</div>
                    )}
                  </motion.div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e63812]/10 rounded-full"></div>
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#e63812]/5 rounded-full"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">
                    {service.title}
                  </h3>
                  <div className="h-1 w-20 bg-[#e63812] mb-8"></div>
                  {service.detailedDescription.length === 0 ? (
                    <div className="text-gray-400 mb-6">Aucune description détaillée.</div>
                  ) : (
                    service.detailedDescription.map((desc, idx) => (
                      <div key={idx} className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 mt-1">
                          <FaCheckCircle className="w-5 h-5 text-[#e63812]" />
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    ))
                  )}
                  <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Points clés :
                    </h4>
                    {service.features.length === 0 ? (
                      <div className="text-gray-400">Aucun point clé.</div>
                    ) : (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e63812]"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e63812] opacity-10 pattern-diagonal-lines pattern-black pattern-bg-white pattern-size-4 pattern-opacity-10"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative p-12 text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e63812] to-transparent"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#e63812] to-[#ff6b4a] bg-clip-text text-transparent">
                Prêt à commencer votre projet ?
              </h2>
              <p className="text-lg md:text-xl mb-8 text-gray-600">
                {`Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider.`}
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5"
                >
                  Nous contacter
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
