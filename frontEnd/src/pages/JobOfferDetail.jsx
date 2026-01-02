import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobOfferById } from '../services/jobOffersService';
import Seo from '../components/Seo';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaUserTie, 
  FaCalendarAlt,
  FaQuestionCircle,
  FaArrowLeft,
  FaExternalLinkAlt
} from 'react-icons/fa';

const JobOfferDetail = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const response = await getJobOfferById(id);
        if (response.success && response.data) {
          setOffer(response.data);
        } else {
          setError('Job offer not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load job offer');
        console.error('Error fetching job offer:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOffer();
    }
  }, [id]);

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

  const applicationUrl = offer 
    ? `https://platform.smab-co.com/${offer._id}/automatic-application`
    : '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#e63812] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de l'offre d'emploi...</p>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Offre non trouvée'}</p>
          <Link
            to="/offres"
            className="bg-[#e63812] text-white px-6 py-2 rounded-lg hover:bg-[#ff6b4a] transition-colors inline-block"
          >
            Retour aux offres
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <Seo
        title={`${offer.title} - Offres d'emploi SMAB`}
        description={offer.description?.substring(0, 160) || 'Découvrez cette offre d\'emploi chez SMAB'}
        keywords={['emploi', offer.title, offer.departement, 'SMAB'].filter(Boolean)}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/offres"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#e63812] transition-colors mb-6"
        >
          <FaArrowLeft />
          <span>Retour aux offres</span>
        </Link>

        {/* Header Card */}
        <div className="bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{offer.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span className="font-medium">{offer.departement}</span>
            </div>
            {offer.profile && (
              <div className="flex items-center gap-2">
                <FaUserTie />
                <span>{offer.profile}</span>
              </div>
            )}
            {offer.budget && (
              <div className="flex items-center gap-2">
                <FaDollarSign />
                <span className="font-semibold">{formatBudget(offer.budget)}</span>
              </div>
            )}
            {offer.status && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                {offer.status}
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBriefcase className="text-[#e63812]" />
                Description du poste
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {offer.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            {offer.requirements && offer.requirements.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Exigences</h2>
                <ul className="space-y-2">
                  {offer.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#e63812] mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Questions */}
            {offer.questions && offer.questions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaQuestionCircle className="text-[#e63812]" />
                  Questions
                </h2>
                <ul className="space-y-3">
                  {offer.questions.map((question, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="bg-[#e63812] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Informations</h3>
              
              <div className="space-y-4 mb-6">
                {offer.createdAt && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-[#e63812]" />
                    <div>
                      <p className="text-sm font-medium">Date de publication</p>
                      <p className="text-xs">{formatDate(offer.createdAt)}</p>
                    </div>
                  </div>
                )}
                {offer.updatedAt && offer.updatedAt !== offer.createdAt && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt className="text-[#e63812]" />
                    <div>
                      <p className="text-sm font-medium">Dernière mise à jour</p>
                      <p className="text-xs">{formatDate(offer.updatedAt)}</p>
                    </div>
                  </div>
                )}
                {offer.candidats && (
                  <div className="text-gray-600">
                    <p className="text-sm font-medium">Candidats</p>
                    <p className="text-xs">{offer.candidats.length} candidat(s)</p>
                  </div>
                )}
              </div>

              {/* Application Button */}
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#e63812] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#ff6b4a] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Postuler maintenant</span>
                <FaExternalLinkAlt className="text-sm" />
              </a>

              <p className="text-xs text-gray-500 text-center mt-3">
                Vous serez redirigé vers la plateforme de candidature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetail;

