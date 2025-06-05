import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import * as authService from '../services/authService';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

const UserProfile = () => {
  const { user, token, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    tel: user?.tel || '',
    address: user?.address || '',
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });
    setLoading(true);
    
    try {
      if (activeSection === 'info') {
        const updatedUser = await authService.updateProfile(token, formData);
        updateUser(updatedUser);
        setMessage({ type: 'success', content: 'Profile mis à jour avec succès!' });
        setIsEditing(false);
      } else {
        if (passwordData.new_password !== passwordData.confirm_password) {
          throw new Error('Les mots de passe ne correspondent pas');
        }
        await authService.updatePassword(token, {
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
        });
        setMessage({ type: 'success', content: 'Mot de passe mis à jour avec succès!' });
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: '',
        });
      }
    } catch (error) {
      setMessage({ type: 'error', content: error.message });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Header with tabs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mon Profile</h2>
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveSection('info')}
              className={`pb-4 px-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                activeSection === 'info'
                  ? 'border-[#e63812] text-[#e63812]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Informations Personnelles
            </button>
            <button
              onClick={() => setActiveSection('password')}
              className={`pb-4 px-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                activeSection === 'password'
                  ? 'border-[#e63812] text-[#e63812]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Changer le Mot de Passe
            </button>
          </div>
        </div>

        {message.content && (
          <div className={`p-4 mb-6 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {message.type === 'success' ? '✓' : '⚠'} {message.content}
            </div>
          </div>
        )}

        {activeSection === 'info' ? (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2
                  ${isEditing 
                    ? 'text-gray-700 bg-gray-100 hover:bg-gray-200' 
                    : 'text-white bg-[#e63812] hover:bg-[#ff6b4a] shadow-md hover:shadow-lg'
                  }`}
              >
                {isEditing ? (
                  <>
                    <FaTimes className="w-4 h-4" />
                    <span>Annuler</span>
                  </>
                ) : (
                  <>
                    <FaEdit className="w-4 h-4" />
                    <span>Modifier Profile</span>
                  </>
                )}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.tel}
                      onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                      placeholder="+212 XXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                      placeholder="Votre adresse"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#e63812] rounded-xl hover:bg-[#ff6b4a] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave className="w-4 h-4" />
                    <span>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Nom</h3>
                  <div className="flex items-center gap-3">
                    <FaUser className="w-5 h-5 text-[#e63812]" />
                    <p className="text-lg text-gray-900">{user?.name}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Email</h3>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="w-5 h-5 text-[#e63812]" />
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Téléphone</h3>
                  <div className="flex items-center gap-3">
                    <FaPhone className="w-5 h-5 text-[#e63812]" />
                    <p className="text-lg text-gray-900">{user?.tel || '-'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Adresse</h3>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#e63812]" />
                    <p className="text-lg text-gray-900">{user?.address || '-'}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaKey className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                  className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.current ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaKey className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.new ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaKey className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                  className="pl-10 w-full px-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#e63812] focus:border-[#e63812] block transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.confirm ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-sm font-medium text-white bg-[#e63812] rounded-xl hover:bg-[#ff6b4a] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaKey className="w-4 h-4" />
                <span>{loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
