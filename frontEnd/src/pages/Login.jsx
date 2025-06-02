import { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(identifier, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error || 'Failed to login');
            }
        } catch (err) {
            setError('Failed to login. Please try again.');
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
                            Bienvenue
                        </h2>
                        <p className="text-gray-600">
                            Connectez-vous pour accéder à votre compte
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg bg-red-50 p-4 mb-6"
                        >
                            <div className="text-sm text-red-700">{error}</div>
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
                                Email ou Téléphone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63812] focus:border-transparent transition-colors sm:text-sm"
                                    placeholder="Entrez votre email ou téléphone"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>
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
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                        Se connecter
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
                                to="/register"
                                className="inline-flex items-center text-[#e63812] hover:text-[#ff6b4a] font-medium transition-colors"
                            >
                                Créer un compte
                                <FaArrowRight className="ml-2 text-sm" />
                            </Link>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;