import React, { useState } from 'react'
import { X, Play } from 'lucide-react'
import { api } from '../../utils/api'
import { BarChart, MetricsTable, LoadingSpinner, ErrorAlert } from '../ChartComponents'
import './ModelTrainingModule.css'

function ModelTrainingModule({ onClose }) {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const trainAllModels = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.models.compare()
      setResults(data.models)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const models = [
    { name: 'Logistic Regression', desc: 'Linear model' },
    { name: 'Random Forest', desc: 'Ensemble method' },
    { name: 'XGBoost', desc: 'Gradient boosting' },
  ]

  if (loading) {
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
        <div className="module-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner text="Training models..." />
        </div>
      </div>
    )
  }

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
        {error && <ErrorAlert error={error} onClose={() => setError(null)} />}

        <div className="training-section">
          <div className="section-title">Available Models</div>

          <div className="models-grid">
            {models.map((model) => (
              <div key={model.name} className="model-card neo-card">
                <div className="model-name">{model.name}</div>
                <div className="model-info">
                  <span className="param">{model.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons" style={{ marginBottom: '24px' }}>
            <button
              className="neo-button primary"
              onClick={trainAllModels}
              disabled={loading}
            >
              <Play size={16} /> Train All Models
            </button>
          </div>

          {results && results.length > 0 && (
            <>
              <div className="results-section">
                <div className="section-title">Model Comparison Results</div>

                {/* Accuracy Chart */}
                <BarChart
                  title="Model Accuracy Comparison"
                  data={results
                    .filter(r => r.model && r.accuracy)
                    .map(r => ({
                      label: r.model.replace(/_/g, ' ').substring(0, 12),
                      value: r.accuracy,
                    }))}
                />

                {/* Metrics Table */}
                {results[0] && results[0].model && (
                  <div className="best-result neo-card">
                    <h3>Best Model: {results[results.length - 1]?.best_model || results[0].model}</h3>
                    <div className="results-grid">
                      {results
                        .filter(r => r.model)
                        .map((result, idx) => (
                          <div key={idx} className="model-result-card neo-card">
                            <div className="result-model-name">{result.model}</div>
                            <div className="metric-item">
                              <span>Accuracy</span>
                              <span className="value">{result.accuracy?.toFixed(4)}</span>
                            </div>
                            <div className="metric-item">
                              <span>F1-Score</span>
                              <span className="value">{result.f1_score?.toFixed(4)}</span>
                            </div>
                            <div className="metric-item">
                              <span>ROC-AUC</span>
                              <span className="value">{result.roc_auc?.toFixed(4)}</span>
                            </div>
                            <div className="metric-item">
                              <span>Time (ms)</span>
                              <span className="value">{result.training_time_ms?.toFixed(0)}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModelTrainingModule
