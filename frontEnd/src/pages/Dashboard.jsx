import React, { useState } from 'react'
import { useAuth } from '../store/AuthContext'
import UserProfile from '../components/UserProfile'

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Mon Profile' },
    { id: 'orders', label: 'Mes Commandes' },
    { id: 'settings', label: 'Paramètres' }
  ]

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Welcome Message */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold">Bienvenue, {user?.name}!</h2>
          <p className="text-gray-600 mt-2">Gérez votre compte et suivez vos activités.</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
          {activeTab === 'profile' && <UserProfile />}
          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mes Commandes</h2>
              <p className="text-gray-600">Historique des commandes à venir...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Paramètres du Compte</h2>
              <p className="text-gray-600">Paramètres à venir...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
