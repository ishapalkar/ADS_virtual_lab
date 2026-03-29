import React from 'react'
import { X } from 'lucide-react'
import './ModelTrainingModule.css'

function ModelTrainingModule({ onClose }) {
  return (
    <div className="module-container">
      <div className="module-header neo-card">
        <div>
          <h2>Model Training</h2>
          <p>Supervised learning models</p>
        </div>
        <button className="neo-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="module-content">
        <div className="training-section">
          <div className="section-title">Available Models</div>

          <div className="models-grid">
            <div className="model-card neo-card">
              <div className="model-name">Logistic Regression</div>
              <div className="model-info">
                <span className="param">Linear model</span>
              </div>
              <button className="neo-button">Train</button>
            </div>

            <div className="model-card neo-card">
              <div className="model-name">Random Forest</div>
              <div className="model-info">
                <span className="param">Ensemble method</span>
              </div>
              <button className="neo-button">Train</button>
            </div>

            <div className="model-card neo-card">
              <div className="model-name">XGBoost</div>
              <div className="model-info">
                <span className="param">Gradient boosting</span>
              </div>
              <button className="neo-button">Train</button>
            </div>
          </div>

          <div className="metrics-section neo-card">
            <div className="subsection-title">Metrics</div>
            <div className="metrics-list">
              <div className="metric">Accuracy</div>
              <div className="metric">Precision</div>
              <div className="metric">Recall</div>
              <div className="metric">F1-Score</div>
              <div className="metric">ROC-AUC</div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="neo-button primary">
              Train All Models
            </button>
            <button className="neo-button">
              Compare Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelTrainingModule
