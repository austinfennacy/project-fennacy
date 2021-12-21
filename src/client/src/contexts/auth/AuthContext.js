import { createContext } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const isAuthed = !!(localStorage.getItem('isAuthed'))
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <AuthContext.Provider value={{isAuthed, user}}>
      {children}
    </AuthContext.Provider>
  )
}
