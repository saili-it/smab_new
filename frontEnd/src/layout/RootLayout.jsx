import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const RootLayout = () => {  return (
    <div className="min-h-screen flex flex-col pt-[120px]">
      <Navigation />
      <main className="container mx-auto flex-grow py-8 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
