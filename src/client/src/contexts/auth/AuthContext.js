import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({})
  const authed = () => !!loggedInUser

  useEffect(async () => {
    const fetchData = async () => {
      const response = await fetch('/loggedInUser')
      const newData = await response.json()
      setLoggedInUser(newData)
    }
    await fetchData()
  })

  // todo delete this after I find the infinite rerender loop bug in react
  console.log(loggedInUser.id)

  return (
    <AuthContext.Provider value={{authed, loggedInUser}}>
      {children}
    </AuthContext.Provider>
  )
}
