import { createContext } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const isAuthed = !!(sessionStorage.getItem('isAuthed'))
  const user = JSON.parse(sessionStorage.getItem('user'))

  return (
    <AuthContext.Provider value={{isAuthed, user}}>
      {children}
    </AuthContext.Provider>
  )
}
