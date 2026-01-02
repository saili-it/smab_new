import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActiveJobOffers } from '../services/jobOffersService';
import Seo from '../components/Seo';
import { FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaUserTie, FaCalendarAlt } from 'react-icons/fa';

const JobOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await getActiveJobOffers();
        if (response.success && response.data) {
          setOffers(response.data);
        } else {
          setError('No job offers available');
        }
      } catch (err) {
        setError(err.message || 'Failed to load job offers');
        console.error('Error fetching job offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBudget = (budget) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(budget);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#e63812] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des offres d'emploi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#e63812] text-white px-6 py-2 rounded-lg hover:bg-[#ff6b4a] transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <Seo
        title="Offres d'emploi - SMAB"
        description="Découvrez nos offres d'emploi et rejoignez l'équipe SMAB"
        keywords={['emploi', 'carrière', 'recrutement', 'SMAB']}
      />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Rejoignez Notre Équipe
          </h1>
          <p className="text-xl text-center text-white/90 max-w-2xl mx-auto">
            Découvrez les opportunités de carrière chez SMAB et faites partie d'une équipe passionnée
          </p>
        </div>
      </div>

      {/* Job Offers List */}
      <div className="container mx-auto px-4">
        {offers.length === 0 ? (
          <div className="text-center py-16">
            <FaBriefcase className="mx-auto text-gray-400 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Aucune offre disponible
            </h2>
            <p className="text-gray-500">
              Il n'y a actuellement aucune offre d'emploi disponible. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Link
                key={offer._id}
                to={`/offres/${offer._id}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#e63812] transition-colors">
                    {offer.title}
                  </h3>

                  {/* Department */}
                  <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <FaMapMarkerAlt className="text-[#e63812]" />
                    <span className="text-sm font-medium">{offer.departement}</span>
                  </div>

                  {/* Description Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {offer.description}
                  </p>

                  {/* Details Grid */}
                  <div className="space-y-2 mb-4">
                    {offer.budget && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <FaDollarSign className="text-[#e63812] text-sm" />
                        <span className="text-sm font-semibold">{formatBudget(offer.budget)}</span>
                      </div>
                    )}
                    {offer.profile && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <FaUserTie className="text-[#e63812] text-sm" />
                        <span className="text-sm">{offer.profile}</span>
                      </div>
                    )}
                    {offer.createdAt && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaCalendarAlt className="text-[#e63812] text-xs" />
                        <span className="text-xs">Publié le {formatDate(offer.createdAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Questions Count */}
                  {offer.questions && offer.questions.length > 0 && (
                    <div className="text-xs text-gray-500 mb-4">
                      {offer.questions.length} question{offer.questions.length > 1 ? 's' : ''} à répondre
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-[#e63812] font-semibold text-sm group-hover:underline">
                      Voir les détails →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOffers;

