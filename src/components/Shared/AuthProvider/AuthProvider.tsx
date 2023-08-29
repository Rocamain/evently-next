'use client'
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { authenticate, removeCookies, loginUser } from '@/app/actions/actions'
import { usePathname, useRouter } from 'next/navigation'
import { LoginData, LoginResponse } from '@/lib/interfaces'

// Define the user type

type IsAuthenticated = boolean

interface AuthContextType {
  login: (user: LoginData) => Promise<LoginResponse>
  logout: () => void
  isAuthenticated: boolean
  isMounted: boolean
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
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setAuthenticated] = useState<IsAuthenticated>(false)
  const [mount, setMount] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Prefetch the home pag
    router.prefetch('/')
  }, [router])

  // On mounted  check if the there cookies and authenticate the use
  useEffect(() => {
    setMount(false)
    const isLogged = async (): Promise<void> => {
      const { verified } = await authenticate()

      if (verified) {
        setAuthenticated(true)
      }
      //  Force render
      setMount(true)
    }
    isLogged()
  }, [pathname, router])

  // Function to log in the user
  const login = async (userData: LoginData) => {
    try {
      const response = await loginUser(userData)

      // Setting Authenticated
      response?.error ? setAuthenticated(false) : setAuthenticated(true)

      return response
    } catch (error) {
      return {
        error: {
          message: 'Oops something strange happened',
          name: 'Server error',
        },
      }
    }
  }

  // Function to log out the user
  const logout = () => {
    removeCookies()
    setAuthenticated(false)
  }

  // Provide the context values to children components
  const contextValue: AuthContextType = {
    login,
    logout,
    isAuthenticated,
    isMounted: mount,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
