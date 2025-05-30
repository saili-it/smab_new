import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Dashboard from '../pages/Dashboard'
import Activity from '../pages/Activity'
import SubActivity from '../pages/SubActivity'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import ProtectedRoute from '../components/ProtectedRoute'

export const mainRoutes = [
  {
    index: true,
    element: <Home />
  },  
  {
    path: 'activite/:category',
    element: <Activity />
  },
  {
    path: 'activite/:category/:subcategory',
    element: <SubActivity />
  },  
  {
    path: 'produit/:slug',
    element: <ProductDetails />
  },
  {
    path: 'cart',
    element: <Cart />
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
