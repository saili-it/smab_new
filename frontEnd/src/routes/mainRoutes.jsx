import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'

export const mainRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: 'about',
    element: <About />
  },
  {
    path: 'contact',
    element: <Contact />
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }
]
