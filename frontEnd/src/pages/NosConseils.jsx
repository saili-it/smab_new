import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/blogs/blog1.png';
import blog2 from '../assets/images/blogs/blog Production Amlou.jpg';
import blog3 from '../assets/images/blogs/blogId3(3).png';

const blogs = [    { 
        id: 1, 
        title: "Secteurs Porteurs pour les Jeunes Entrepreneurs au Maroc en 2024", 
        image: blog1, 
        link: '/conseils/1', 
        description: "En 2024, les jeunes entrepreneurs au Maroc ont l'opportunité de se lancer dans des secteurs en pleine expansion..."
    },    {
        id: 2, 
        title: "Révolutionner la Production d'Amlou : Le Rôle des Machines Modernes", 
        image: blog2, 
        link: '/conseils/2',
        description: "La production d'Amlou repose sur des ingrédients de qualité, mais également sur des processus optimisés. L'intégration de machines comme le moulin à beurre a transformé l'industrie"
    },    {
        id: 3, 
        title: "Comment optimiser votre production avec des machines d'ensachage automatiques", 
        image: blog3, 
        link: '/conseils/3',
        description: "L'ensachage est une étape essentielle dans de nombreuses industries, notamment alimentaire, cosmétique et pharmaceutique"
    }
];

const NosConseils = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Conseils</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez nos articles et conseils pour optimiser votre production et développer votre entreprise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blogs Grid Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={blog.link} className="block">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.description}
                    </p>
                    <div className="flex items-center text-[#e63812] font-semibold">
                      Lire la suite
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NosConseils;
