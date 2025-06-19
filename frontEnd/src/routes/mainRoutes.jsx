import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Dashboard from '../pages/Dashboard'
import Activity from '../pages/Activity'
import SubActivity from '../pages/SubActivity'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Services from '../pages/Services'
import NosConseils from '../pages/NosConseils'
import BlogDetails from '../pages/BlogDetails'
import ProtectedRoute from '../components/ProtectedRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import CGV from '../pages/CGV'
import MentionLegal from '../pages/MentionLegal'

export const mainRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: 'cgv',
    element: <CGV />
  },
  {
    path: 'mention-legal',
    element: <MentionLegal />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />
  },
  {
    path: 'reset-password',
    element: <ResetPassword />
  },
  {
    path: 'services',
    element: <Services />
  },
  {
    path: 'conseils',
    element: <NosConseils />
  },
  {
    path: 'conseils/:id',
    element: <BlogDetails />
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
