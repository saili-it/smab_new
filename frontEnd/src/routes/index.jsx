import RootLayout from '../layout/RootLayout'
import NotFound from '../pages/NotFound'
import { mainRoutes } from './mainRoutes'

export const rootRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: mainRoutes
  }
]
