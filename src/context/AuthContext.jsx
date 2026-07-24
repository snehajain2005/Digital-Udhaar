import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('smartkhata_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email) => {
    const shopName = email.split('@')[0]
    const u = {
      name: shopName.charAt(0).toUpperCase() + shopName.slice(1) + ' General Store',
      email,
      owner: 'Rakesh Kumar',
    }
    sessionStorage.setItem('smartkhata_user', JSON.stringify(u))
    setUser(u)
    return u
  }

  const logout = () => {
    sessionStorage.removeItem('smartkhata_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
