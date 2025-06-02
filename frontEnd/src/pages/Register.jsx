import { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        // Validation
        let isValid = true;
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Le nom est requis';
            isValid = false;
        }

        if (!formData.email && !formData.tel) {
            newErrors.email = 'Email ou téléphone requis';
            newErrors.tel = 'Email ou téléphone requis';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
            isValid = false;
        }

        if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const result = await register(formData);
            if (result.success) {
                navigate('/');
            } else {
                setErrors(result.validationErrors || { general: result.error });
            }
        } catch (err) {
            setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
        }

        setLoading(false);
    };

    return (
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
                            Créer un compte
                        </h2>
                        <p className="text-gray-600">
                            Rejoignez la communauté SMAB
                        </p>
                    </div>

                    {errors.general && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg bg-red-50 p-4 mb-6"
                        >
                            <div className="text-sm text-red-700">{errors.general}</div>
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nom complet
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63812] focus:border-transparent transition-colors sm:text-sm"
                                    placeholder="Entrez votre nom complet"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.name}
                                </motion.p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63812] focus:border-transparent transition-colors sm:text-sm"
                                    placeholder="Entrez votre email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                                Téléphone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaPhone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="tel"
                                    name="tel"
                                    type="tel"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63812] focus:border-transparent transition-colors sm:text-sm"
                                    placeholder="Entrez votre numéro de téléphone"
                                    value={formData.tel}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.tel && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.tel}
                                </motion.p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
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
                                    placeholder="Créez votre mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmez le mot de passe
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
                            {errors.password_confirmation && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-1 text-sm text-red-600"
                                >
                                    {errors.password_confirmation}
                                </motion.p>
                            )}
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
                                        Créer mon compte
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
                                Se connecter à un compte existant
                                <FaArrowRight className="ml-2 text-sm" />
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default Register;