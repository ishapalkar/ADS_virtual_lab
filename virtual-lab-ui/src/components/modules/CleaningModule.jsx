import React from 'react'
import { X } from 'lucide-react'
import './CleaningModule.css'

function CleaningModule({ onClose }) {
  return (
    <div className="module-container">
      <div className="module-header neo-card">
        <div>
          <h2>Data Cleaning</h2>
          <p>Handle missing values and duplicates</p>
        </div>
        <button className="neo-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="module-content">
        <div className="cleaning-section">
          <div className="section-title">Cleaning Pipeline</div>

          <div className="pipeline-steps">
            <div className="step neo-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Identify Missing Values</h4>
                <p>Found 6 records with '?' marks</p>
              </div>
            </div>

            <div className="step neo-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Remove Duplicates</h4>
                <p>Removed 0 duplicate records</p>
              </div>
            </div>

            <div className="step neo-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Fix Categories</h4>
                <p>Standardized categorical values</p>
              </div>
            </div>

            <div className="step neo-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Detect Outliers</h4>
                <p>Using IQR method</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="neo-button primary">
              Run Cleaning
            </button>
            <button className="neo-button">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CleaningModule
