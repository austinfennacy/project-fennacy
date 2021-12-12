import * as React from "react"

const authContext = React.createContext()

export function useAuth() {
  const [authed, setAuthed] = React.useState(false)
  const [user, setUser] = React.useState({})

  return {
    authed,
    user,
    login(formValues) {
      return new Promise((resolve) => {
        fetch('/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        })
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            setAuthed(true)
            setUser(response.user)
          }

          resolve(response)
        })
      })
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res()
      })
    }
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

export default function AuthConsumer() {
  return React.useContext(authContext)
}
