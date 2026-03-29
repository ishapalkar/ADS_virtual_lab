import React, { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}

export default App
