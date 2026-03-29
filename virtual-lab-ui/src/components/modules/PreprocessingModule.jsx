import React from 'react'
import { X } from 'lucide-react'
import './PreprocessingModule.css'

function PreprocessingModule({ onClose }) {
  return (
    <div className="module-container">
      <div className="module-header neo-card">
        <div>
          <h2>Preprocessing</h2>
          <p>Encoding and feature scaling</p>
        </div>
        <button className="neo-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="module-content">
        <div className="preprocessing-section">
          <div className="section-title">Preprocessing Steps</div>

          <div className="preprocessing-grid">
            <div className="process-card neo-card">
              <div className="card-title">One-Hot Encoding</div>
              <div className="card-value">Categorical Features</div>
              <div className="status-badge">Active</div>
            </div>

            <div className="process-card neo-card">
              <div className="card-title">StandardScaler</div>
              <div className="card-value">Numerical Features</div>
              <div className="status-badge">Active</div>
            </div>

            <div className="process-card neo-card">
              <div className="card-title">Train-Test Split</div>
              <div className="card-value">80-20 ratio</div>
              <div className="status-badge">Ready</div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="neo-button primary">
              Start Preprocessing
            </button>
            <button className="neo-button">
              View Pipeline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreprocessingModule
