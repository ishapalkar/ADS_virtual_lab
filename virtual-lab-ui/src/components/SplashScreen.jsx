import React from 'react'
import { Zap } from 'lucide-react'
import './SplashScreen.css'

function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-background">
        {/* Animated dots pattern */}
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
        <div className="dot dot-4"></div>
        <div className="dot dot-5"></div>
      </div>

      <div className="splash-content">
        <div className="logo-wrapper animate-bounce">
          <div className="logo-box">
            <Zap size={60} strokeWidth={3} />
          </div>
        </div>

        <div className="splash-title animate-slide-down">
          <h1>ADS Virtual Lab</h1>
          <div className="title-underline"></div>
        </div>

        <div className="splash-subtitle animate-slide-up">
          <p>Advanced Data Science</p>
        </div>

        <div className="splash-progress">
          <div className="progress-bar"></div>
          <div className="progress-text">Initializing...</div>
        </div>

        <div className="floating-elements">
          <div className="element elem-1">◆</div>
          <div className="element elem-2">■</div>
          <div className="element elem-3">▲</div>
          <div className="element elem-4">◇</div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
