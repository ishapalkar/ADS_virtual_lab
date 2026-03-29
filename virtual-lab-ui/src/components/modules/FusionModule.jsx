import React from 'react'
import { X } from 'lucide-react'
import './FusionModule.css'

function FusionModule({ onClose }) {
  return (
    <div className="module-container">
      <div className="module-header neo-card">
        <div>
          <h2>Data Fusion</h2>
          <p>Combine multiple data sources</p>
        </div>
        <button className="neo-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="module-content">
        <div className="fusion-section">
          <div className="section-title">Data Sources</div>

          <div className="sources-grid">
            <div className="source-card neo-card">
              <div className="source-label">Source A</div>
              <div className="source-desc">Adult Dataset</div>
              <div className="status-active">Active</div>
            </div>

            <div className="source-card neo-card">
              <div className="source-label">Source B</div>
              <div className="source-desc">Synthetic Wages</div>
              <div className="status-pending">Pending</div>
            </div>

            <div className="source-card neo-card">
              <div className="source-label">Source C</div>
              <div className="source-desc">Financial Data</div>
              <div className="status-pending">Pending</div>
            </div>
          </div>

          <div className="section-title" style={{ marginTop: '32px' }}>Fusion Techniques</div>

          <div className="fusion-techniques">
            <div className="technique neo-card">
              <div className="technique-name">Early Fusion</div>
              <div className="technique-desc">Merge data → train single model</div>
            </div>

            <div className="technique neo-card">
              <div className="technique-name">Late Fusion</div>
              <div className="technique-desc">Train separate → combine predictions</div>
            </div>

            <div className="technique neo-card">
              <div className="technique-name">Weighted Fusion</div>
              <div className="technique-desc">Combine with optimal weights</div>
            </div>

            <div className="technique neo-card">
              <div className="technique-name">Hybrid Fusion</div>
              <div className="technique-desc">Multi-level integration</div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="neo-button primary">
              Run Fusion
            </button>
            <button className="neo-button">
              Compare Techniques
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FusionModule
