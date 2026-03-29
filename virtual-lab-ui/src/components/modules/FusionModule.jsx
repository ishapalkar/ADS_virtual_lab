import React, { useState } from 'react'
import { X, Play } from 'lucide-react'
import { api } from '../../utils/api'
import { BarChart, LoadingSpinner, ErrorAlert } from '../ChartComponents'
import './FusionModule.css'

function FusionModule({ onClose }) {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runFusionComparison = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.fusion.compare()
      setResults(data.fusion_results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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
        <div className="module-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner text="Running fusion analysis..." />
        </div>
      </div>
    )
  }

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
        {error && <ErrorAlert error={error} onClose={() => setError(null)} />}

        <div className="fusion-section">
          <div className="section-title">Data Sources</div>

          <div className="sources-grid">
            <div className="source-card neo-card">
              <div className="source-label">Source A</div>
              <div className="source-desc">Core Features</div>
              <div className="status-active">Active</div>
            </div>

            <div className="source-card neo-card">
              <div className="source-label">Source B</div>
              <div className="source-desc">Wage Features</div>
              <div className="status-active">Active</div>
            </div>

            <div className="source-card neo-card">
              <div className="source-label">Source C</div>
              <div className="source-desc">Financial Data</div>
              <div className="status-active">Active</div>
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
            <button
              className="neo-button primary"
              onClick={runFusionComparison}
              disabled={loading}
            >
              <Play size={16} /> Run Fusion Comparison
            </button>
          </div>

          {results && results.length > 0 && (
            <div className="fusion-results">
              <div className="section-title">Fusion Results Comparison</div>

              {/* Accuracy Comparison */}
              <BarChart
                title="Fusion Techniques - Accuracy Comparison"
                data={results.map(r => ({
                  label: (r.technique || 'Unknown').substring(0, 10),
                  value: r.accuracy,
                }))}
                colors={['#ffeb3b', '#51cf66', '#bd93f9', '#8be9fd', '#ff79c6']}
              />

              {/* Detailed Results */}
              <div className="results-table neo-card">
                <h3>Detailed Comparison</h3>
                <table className="fusion-table">
                  <thead>
                    <tr>
                      <th>Technique</th>
                      <th>Accuracy</th>
                      <th>F1-Score</th>
                      <th>ROC-AUC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, idx) => (
                      <tr key={idx}>
                        <td className="technique-name-col">{result.technique}</td>
                        <td>{result.accuracy?.toFixed(4)}</td>
                        <td>{result.f1_score?.toFixed(4)}</td>
                        <td>{result.roc_auc?.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Best Technique */}
                {results.length > 0 && (
                  <div className="best-technique-info">
                    <div className="best-label">Best Technique</div>
                    <div className="best-name">
                      {results.reduce((a, b) => (a.accuracy > b.accuracy ? a : b)).technique}
                    </div>
                    <div className="best-accuracy">
                      Accuracy: {results.reduce((a, b) => (a.accuracy > b.accuracy ? a : b)).accuracy?.toFixed(4)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FusionModule
