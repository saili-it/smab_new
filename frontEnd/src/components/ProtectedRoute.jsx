import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
