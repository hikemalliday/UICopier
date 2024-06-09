// IMPORTANT:
// Possibly add a useEffect to set the eqDir upon page load, with [] dependency
import React, { useState, useEffect, createContext, useContext } from 'react'

import { getEqDir } from '../fetches'

export const MainContext = createContext(null)

export const useMainContext = () => {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error('useMainContext must be used within a MainContextProvider')
  }
  return context
}

export const MainContextProvider = ({ children }) => {
  const [eqDir, setEqDir] = useState('')
  const [logData, setLogData] = useState()

  // Set the EqDir once after first render
  useEffect(() => {
    const setEqDirUseEffect = async () => {
      const response = await getEqDir()
      if (response !== null) {
        setEqDir(response)
      }
    }
    setEqDirUseEffect()
  }, [])

  return (
    <MainContext.Provider value={{ eqDir, setEqDir, logData, setLogData }}>
      {children}
    </MainContext.Provider>
  )
}
