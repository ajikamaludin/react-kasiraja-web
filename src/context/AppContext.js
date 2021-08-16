import React, { useState, useMemo, useContext } from 'react'
import is from 'is_js'

const userManager = {
  set(val) {
    window.localStorage.setItem('KASIRAJA_USER', val)
  },
  get() {
    return window.localStorage.getItem('KASIRAJA_USER')
  },
  remove() {
    window.localStorage.removeItem('KASIRAJA_USER')
  }
}

const AppContext = React.createContext()

function AppProvider(props) {
  const [user, setUser] = useState(userManager.get())

  const value = useMemo(
    () => ({ user, setUser }),
    [user]
  )
  return <AppContext.Provider value={value} {...props} />
}

function useAuth() {
  const appContext = useContext(AppContext)
  if (!appContext) {
    throw Error('useAuth must be used within AppProvider')
  }
  const {
    user,
    setUser,
  } = appContext

  const isLoggedIn = () => {
    return is.not.empty(user) && is.not.null(user)
  }
  const persistUser = user => {
    userManager.set(user)
    setUser(user)
  }
  const logout = () => {
    userManager.remove()
    setUser(null)
  }

  return {
    isLoggedIn,
    persistUser,
    logout
  }
}

export { AppProvider, useAuth }
