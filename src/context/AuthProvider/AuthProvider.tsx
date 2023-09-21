'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { authenticate, loginUser } from '@/app/actions'
import { LoginData, LoginResponse, UserInfo } from '@/lib/interfaces'

// Define the user type
interface User {
  userInfo: UserInfo | null
}

// Define the context type
interface AuthContextType {
  login: (user: LoginData) => Promise<LoginResponse>
  logout: () => void
  isAuthenticated: boolean
  user: User
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create a custom hook to access the AuthContext
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Create the AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({ userInfo: null })

  useEffect(() => {
    const isLogged = async (): Promise<void> => {
      try {
        const { verified, userInfo } = await authenticate()

        if (verified && userInfo) {
          setUser({ userInfo })
        }
      } catch (error) {
        console.error('Authentication error:', error)
      }
    }
    isLogged()
  }, [])

  // Function to log in the user
  const login = async (userData: LoginData): Promise<LoginResponse> => {
    try {
      const response = await loginUser(userData)

      if (response.error) {
        setUser({ userInfo: null })
        return {
          message: null,
          error: response.error,
          userInfo: null,
        }
      } else {
        setUser({ userInfo: response.userInfo })
        return {
          message: 'Login successful',
          error: null,
          userInfo: null,
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        message: null,
        error: {
          message: 'Oops, something strange happened',
          name: 'Server error',
        },
        userInfo: null,
      }
    }
  }

  // Function to log out the user
  const logout = () => {
    setUser({ userInfo: null })
  }

  const contextValue: AuthContextType = {
    login,
    logout,
    isAuthenticated: Boolean(user.userInfo),
    user,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
