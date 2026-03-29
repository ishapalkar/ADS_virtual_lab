import React, { useState } from 'react'
import { X, Download } from 'lucide-react'
import './DataViewer.css'

function DataViewer({ onClose }) {
  const [dataStats] = useState({
    rows: 48842,
    columns: 14,
    missingValues: 6,
    features: [
      'age', 'workclass', 'fnlwgt', 'education', 'education-num',
      'marital-status', 'occupation', 'relationship', 'race', 'sex',
      'capital-gain', 'capital-loss', 'hours-per-week', 'income'
    ]
  })

  return (
    <div className="module-container">
      <div className="module-header neo-card">
        <div>
          <h2>Data Loader</h2>
          <p>UCI Adult Dataset Analysis</p>
        </div>
        <button className="neo-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="module-content">
        <div className="data-section">
          <div className="section-title">Dataset Overview</div>

          <div className="stats-grid">
            <div className="stat-box neo-card">
              <div className="stat-label">Total Rows</div>
              <div className="stat-number">{dataStats.rows.toLocaleString()}</div>
            </div>
            <div className="stat-box neo-card">
              <div className="stat-label">Features</div>
              <div className="stat-number">{dataStats.columns}</div>
            </div>
            <div className="stat-box neo-card">
              <div className="stat-label">Missing Values</div>
              <div className="stat-number">{dataStats.missingValues}</div>
            </div>
            <div className="stat-box neo-card">
              <div className="stat-label">Target</div>
              <div className="stat-value">income</div>
            </div>
          </div>

          <div className="features-section neo-card">
            <div className="subsection-title">Features</div>
            <div className="features-grid">
              {dataStats.features.map((feature, idx) => (
                <div key={idx} className="feature-tag">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="neo-button primary">
              <Download size={16} /> Load Dataset
            </button>
            <button className="neo-button">
              View Full Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataViewer
