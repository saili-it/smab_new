import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaArrowRight } from 'react-icons/fa';
import * as authService from '../services/authService';
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const resetToken = searchParams.get('token');
    const email = searchParams.get('email');
    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    // If no token or email is present, show error
    if (!resetToken || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lien invalide</h2>
                    <p className="text-gray-600 mb-6">Le lien de réinitialisation est invalide ou a expiré.</p>
                    <Link
                        to="/forgot-password"
                        className="inline-flex items-center text-[#e63812] hover:text-[#ff6b4a] font-medium transition-colors"
                    >
                        Demander un nouveau lien
                        <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', content: '' });

        if (formData.password !== formData.password_confirmation) {
            setMessage({
                type: 'error',
                content: 'Les mots de passe ne correspondent pas'
            });
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setMessage({
                type: 'error',
                content: 'Le mot de passe doit contenir au moins 8 caractères'
            });
            setLoading(false);
            return;
        }        try {
            await authService.resetPassword(email, resetToken, formData.password);
            setMessage({
                type: 'success',
                content: 'Votre mot de passe a été réinitialisé avec succès'
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage({
                type: 'error',
                content: error.message || 'Une erreur est survenue. Veuillez réessayer.'
            });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-[#e63812] rounded-full blur-[100px] opacity-[0.08]" />
                <div className="absolute w-[500px] h-[500px] -bottom-48 -right-48 bg-[#e63812] rounded-full blur-[100px] opacity-[0.08]" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 via-transparent to-gray-900/5" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 relative overflow-hidden">
                    <div className="text-center mb-8">
                        <img src={logo} alt="SMAB Logo" className="h-16 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Réinitialiser le mot de passe
                        </h2>
                        <p className="text-gray-600">
                            Entrez votre nouveau mot de passe
                        </p>
                    </div>

                    {message.content && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-lg p-4 mb-6 ${
                                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}
                        >
                            <div className="text-sm">{message.content}</div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Nouveau mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63812] focus:border-transparent transition-colors sm:text-sm"
                                    placeholder="Entrez votre nouveau mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63812] focus:border-transparent transition-colors sm:text-sm"
                                    placeholder="Confirmez votre mot de passe"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#e63812] hover:bg-[#ff6b4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e63812] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Réinitialiser le mot de passe
                                        <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="mt-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Ou</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="inline-flex items-center text-[#e63812] hover:text-[#ff6b4a] font-medium transition-colors"
                            >
                                Retour à la connexion
                                <FaArrowRight className="ml-2 text-sm" />
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
