import React from 'react'

const Dashboard = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <p className="text-gray-600">Your dashboard content here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Activity feed goes here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <p className="text-gray-600">Action buttons here</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
