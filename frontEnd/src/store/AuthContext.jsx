import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('smab_user')
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Error parsing user from localStorage:', error)
      return null
    }
  })

  const [token, setToken] = useState(() => {
    try {
      const storedToken = localStorage.getItem('smab_token')
      return storedToken || null
    } catch (error) {
      console.error('Error getting token from localStorage:', error)
      return null
    }
  })

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('smab_user', JSON.stringify(user))
      localStorage.setItem('smab_token', token)
    } else {
      localStorage.removeItem('smab_user')
      localStorage.removeItem('smab_token')
    }
  }, [user, token])

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('smab_token')
      const storedUser = localStorage.getItem('smab_user')
      
      if (storedToken && storedUser) {
        try {
          const data = await authService.getProfile(storedToken)
          if (data && (data.user || data)) {
            setUser(data.user || data)
            setToken(storedToken)
          } else {
            throw new Error('Invalid user data')
          }
        } catch (err) {
          console.error('Token validation failed:', err)
          localStorage.removeItem('smab_token')
          localStorage.removeItem('smab_user')
          setUser(null)
          setToken(null)
        }
      }
    }
    checkAuth()
  }, [])  
  const login = async (identifier, password) => {
    try {
      const data = await authService.login(identifier, password)
      
      if (!data.access_token || !data.user) {
        throw new Error('Invalid login response');
      }

      // First, store in localStorage
      localStorage.setItem('smab_token', data.access_token);
      localStorage.setItem('smab_user', JSON.stringify(data.user));
      
      // Then update state
      setUser(data.user);
      setToken(data.access_token);
      
      console.log('Login successful:', { 
        user: data.user, 
        token: data.access_token,
        type: data.token_type,
        expires: data.expires_in 
      });
      return { success: true }
    } catch (err) {
      console.error('Login failed:', err)
      return { success: false, error: err.message }
    }
  }

  const register = async (formData) => {
    try {
      const data = await authService.register(formData)
      
      localStorage.setItem('smab_token', data.access_token)
      localStorage.setItem('smab_user', JSON.stringify(data.user))
      
      setUser(data.user)
      setToken(data.access_token)
      return { success: true }
    } catch (err) {
      return { success: false, validationErrors: { general: err.message } }
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token)
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      localStorage.removeItem('smab_token')
      localStorage.removeItem('smab_user')
      setUser(null)
      setToken(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
