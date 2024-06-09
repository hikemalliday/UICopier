import React from 'react'
import './App.css'
import { Header } from './components/Header'
import { MainView } from './components/MainView'
import { MainContextProvider } from './context/MainContext'

function App() {
  return (
    <>
      <MainContextProvider>
        <Header />
        <MainView />
      </MainContextProvider>
    </>
  )
}

export default App
