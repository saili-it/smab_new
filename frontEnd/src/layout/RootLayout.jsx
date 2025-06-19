import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import NotificationMenu from '../components/NotificationMenu'

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col pt-[120px]">
      <Navigation>
        <NotificationMenu />
      </Navigation>
      <main className="container mx-auto flex-grow py-8 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
