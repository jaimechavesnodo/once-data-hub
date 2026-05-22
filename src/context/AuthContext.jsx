import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const VALID_CREDENTIALS = {
  email: 'admin@onceconstructora.com',
  password: 'demo123',
}

const STORAGE_KEY = 'once_hub_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    setLoading(false)
  }, [])

  function login(email, password) {
    if (
      email === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      const userData = {
        name: 'Administrador',
        email,
        role: 'Administrador',
        avatar: null,
      }
      setUser(userData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Credenciales incorrectas. Intente nuevamente.' }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
