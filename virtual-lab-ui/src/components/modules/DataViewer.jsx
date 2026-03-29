import React, { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import { api } from '../../utils/api'
import { LoadingSpinner, ErrorAlert } from '../ChartComponents'
import './DataViewer.css'

function DataViewer({ onClose }) {
  const [dataStats, setDataStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.data.load()
      setDataStats(data)
    } catch (err) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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
        <div className="module-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner text="Loading dataset..." />
        </div>
      </div>
    )
  }

  if (error) {
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
          <ErrorAlert error={error} onClose={() => setError(null)} />
        </div>
      </div>
    )
  }

  if (!dataStats) return null

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
              <div className="stat-number">{dataStats.rows?.toLocaleString()}</div>
            </div>
            <div className="stat-box neo-card">
              <div className="stat-label">Features</div>
              <div className="stat-number">{dataStats.columns}</div>
            </div>
            <div className="stat-box neo-card">
              <div className="stat-label">Missing Values</div>
              <div className="stat-number">{Object.values(dataStats.missing_values || {}).reduce((a, b) => a + b, 0)}</div>
            </div>
            <div className="stat-box neo-card">
              <div className="stat-label">Target</div>
              <div className="stat-value">income</div>
            </div>
          </div>

          <div className="features-section neo-card">
            <div className="subsection-title">Features ({dataStats.features?.length})</div>
            <div className="features-grid">
              {dataStats.features?.map((feature, idx) => (
                <div key={idx} className="feature-tag">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {dataStats.class_distribution && Object.keys(dataStats.class_distribution).length > 0 && (
            <div className="class-dist-section neo-card">
              <div className="subsection-title">Class Distribution</div>
              <div className="class-dist-grid">
                {Object.entries(dataStats.class_distribution).map(([label, count]) => (
                  <div key={label} className="class-dist-item">
                    <span className="class-label">{label}</span>
                    <span className="class-count">{count?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="neo-button primary" onClick={loadData}>
              <Download size={16} /> Reload Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataViewer
