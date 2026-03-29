import React from 'react'
import { Zap } from 'lucide-react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo-icon">
            <Zap size={24} strokeWidth={3} />
          </div>
          <h1>ADS Virtual Lab</h1>
        </div>

        <div className="header-stats">
          <div className="stat-badge">
            <span>Python</span>
          </div>
          <div className="stat-badge">
            <span>ML</span>
          </div>
          <div className="stat-badge">
            <span>Fusion</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
