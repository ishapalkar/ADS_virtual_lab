import React, { useMemo, useState } from 'react'
import { X, Play, BookOpen, Trophy, Gauge, Lightbulb } from 'lucide-react'
import { api } from '../../utils/api'
import { BarChart, LoadingSpinner, ErrorAlert } from '../ChartComponents'
import './FusionModule.css'

const techniqueCards = [
  { name: 'No Fusion (Baseline)', desc: 'Single-source benchmark from Source A only' },
  { name: 'Early Fusion', desc: 'Merge all features and train one model' },
  { name: 'Late Fusion', desc: 'Train per source and average probabilities' },
  { name: 'Weighted Fusion', desc: 'Reliability-aware weighted averaging' },
  { name: 'CNN Fusion', desc: 'Neural-style nonlinear interactions (tabular approximation)' },
  { name: 'Attention Fusion', desc: 'Per-row source emphasis by confidence' },
  { name: 'Gated Fusion', desc: 'Meta-learner controls source influence' },
  { name: 'Hybrid Fusion', desc: 'Blend early, weighted, and gated strategies' },
]

const shortLabelMap = {
  'No Fusion (Baseline)': 'Baseline',
  'Early Fusion': 'Early',
  'Late Fusion': 'Late',
  'Weighted Fusion': 'Weighted',
  'CNN Fusion': 'CNN',
  'Attention Fusion': 'Attention',
  'Gated Fusion': 'Gated',
  'Hybrid Fusion': 'Hybrid',
}

const chartColors = ['#ffeb3b', '#51cf66', '#4dabf7', '#ffa94d', '#ff6b6b', '#20c997', '#748ffc', '#f783ac']

const defaultGuide = {
  'No Fusion (Baseline)': {
    concept: 'Single-source benchmark',
    best_for: 'Checking if fusion truly adds value',
    student_task: 'Use this as your reference score before comparing fusion methods.',
  },
  'Early Fusion': {
    concept: 'Feature-level fusion',
    best_for: 'Correlated modalities',
    student_task: 'Analyze whether combining features helps the model capture interactions.',
  },
  'Late Fusion': {
    concept: 'Decision-level fusion',
    best_for: 'Independent source models',
    student_task: 'Compare average probability fusion against the best individual source.',
  },
  'Weighted Fusion': {
    concept: 'Reliability-aware ensemble',
    best_for: 'Unequal source quality',
    student_task: 'Inspect learned source weights and connect them to source usefulness.',
  },
  'CNN Fusion': {
    concept: 'Deep nonlinear interactions',
    best_for: 'Complex cross-source feature patterns',
    student_task: 'Compare nonlinear neural behavior with tree-based fusion methods.',
  },
  'Attention Fusion': {
    concept: 'Dynamic source focus',
    best_for: 'Rows where importance changes by context',
    student_task: 'Check which source gets more attention on average and why.',
  },
  'Gated Fusion': {
    concept: 'Meta-learner controlled fusion',
    best_for: 'Confidence-aware blending',
    student_task: 'Study how gate signals improve consistency and reduce weak-source effects.',
  },
  'Hybrid Fusion': {
    concept: 'Multi-stage blended fusion',
    best_for: 'Balanced performance and robustness',
    student_task: 'Evaluate whether blending multiple strategies beats any single approach.',
  },
}

const toPercent = (value) => `${((Number(value) || 0) * 100).toFixed(2)}%`
const toScore = (value) => (typeof value === 'number' ? value.toFixed(4) : 'N/A')

const getMetricLevel = (value) => {
  const score = Number(value) || 0
  if (score >= 0.88) return 'high'
  if (score >= 0.82) return 'mid'
  return 'low'
}

function FusionModule({ onClose }) {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runFusionComparison = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.fusion.compare()
      const fusionResults = Array.isArray(data.fusion_results)
        ? data.fusion_results
        : Array.isArray(data.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : []
      setResults(fusionResults)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const rankedResults = useMemo(() => {
    if (!results || !results.length) return []
    return [...results].sort((a, b) => (Number(b.accuracy) || 0) - (Number(a.accuracy) || 0))
  }, [results])

  const bestTechnique = rankedResults[0] || null
  const worstTechnique = rankedResults[rankedResults.length - 1] || null
  const baseline = rankedResults.find((item) =>
    (item.technique || '').toLowerCase().includes('baseline')
  )

  const averageAccuracy = rankedResults.length
    ? rankedResults.reduce((sum, item) => sum + (Number(item.accuracy) || 0), 0) / rankedResults.length
    : 0

  const gainVsBaseline = bestTechnique && baseline
    ? (Number(bestTechnique.accuracy) || 0) - (Number(baseline.accuracy) || 0)
    : null

  const accuracySpread = bestTechnique && worstTechnique
    ? (Number(bestTechnique.accuracy) || 0) - (Number(worstTechnique.accuracy) || 0)
    : 0

  const mostBalanced = useMemo(() => {
    if (!rankedResults.length) return null

    return rankedResults.reduce((best, current) => {
      const bestBalance = ((Number(best.precision) || 0) + (Number(best.recall) || 0) + (Number(best.f1) || 0)) / 3
      const currentBalance = ((Number(current.precision) || 0) + (Number(current.recall) || 0) + (Number(current.f1) || 0)) / 3
      return currentBalance > bestBalance ? current : best
    })
  }, [rankedResults])

  const hasRocAuc = rankedResults.some((item) => typeof item.roc_auc === 'number')

  const learningCards = useMemo(() => {
    return rankedResults.map((item) => {
      const fallback = defaultGuide[item.technique] || {}
      return {
        technique: item.technique,
        concept: item.concept || fallback.concept || 'Fusion strategy',
        best_for: item.best_for || fallback.best_for || 'General multimodal tasks',
        student_task: item.student_task || fallback.student_task || 'Compare this method against baseline.',
      }
    })
  }, [rankedResults])

  if (loading) {
    return (
      <div className="module-container">
        <div className="module-header neo-card">
          <div>
            <h2>Data Fusion</h2>
            <p>Compare multimodal fusion strategies</p>
          </div>
          <button className="neo-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="module-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner text="Running full fusion benchmark report..." />
        </div>
      </div>
    )
  }

  return (
    <div className="module-container">
      <div className="module-header neo-card">
        <div>
          <h2>Data Fusion</h2>
          <p>Compare multimodal fusion strategies</p>
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
              <div className="source-desc">Financial Features</div>
              <div className="status-active">Active</div>
            </div>
          </div>

          <div className="section-title" style={{ marginTop: '32px' }}>Fusion Techniques</div>

          <div className="fusion-techniques">
            {techniqueCards.map((technique) => (
              <div key={technique.name} className="technique neo-card">
                <div className="technique-name">{technique.name}</div>
                <div className="technique-desc">{technique.desc}</div>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button
              className="neo-button primary"
              onClick={runFusionComparison}
              disabled={loading}
            >
              <Play size={16} /> Compare Fusion Techniques
            </button>
          </div>

          {rankedResults.length > 0 && (
            <div className="fusion-results">
              <div className="section-title">Fusion Performance Report</div>

              <div className="fusion-insights-grid">
                <div className="insight-card neo-card">
                  <div className="insight-head"><Trophy size={16} /> Best Technique</div>
                  <div className="insight-main">{bestTechnique?.technique || 'N/A'}</div>
                  <div className="insight-sub">Accuracy: {toPercent(bestTechnique?.accuracy)}</div>
                </div>

                <div className="insight-card neo-card">
                  <div className="insight-head"><Gauge size={16} /> Average Accuracy</div>
                  <div className="insight-main">{toPercent(averageAccuracy)}</div>
                  <div className="insight-sub">Spread: {toPercent(accuracySpread)}</div>
                </div>

                <div className="insight-card neo-card">
                  <div className="insight-head"><Lightbulb size={16} /> Gain vs Baseline</div>
                  <div className="insight-main">
                    {gainVsBaseline !== null ? `${gainVsBaseline >= 0 ? '+' : ''}${toPercent(gainVsBaseline)}` : 'N/A'}
                  </div>
                  <div className="insight-sub">Baseline: {baseline?.technique || 'Not available'}</div>
                </div>

                <div className="insight-card neo-card">
                  <div className="insight-head"><BookOpen size={16} /> Most Balanced</div>
                  <div className="insight-main">{mostBalanced?.technique || 'N/A'}</div>
                  <div className="insight-sub">Best precision/recall/F1 balance</div>
                </div>
              </div>

              <BarChart
                title="Accuracy Ranking Across Fusion Techniques"
                data={rankedResults.map((result) => ({
                  label: shortLabelMap[result.technique] || result.technique,
                  value: Number(result.accuracy) || 0,
                }))}
                colors={chartColors}
              />

              {hasRocAuc && (
                <BarChart
                  title="ROC-AUC Comparison"
                  data={rankedResults.map((result) => ({
                    label: shortLabelMap[result.technique] || result.technique,
                    value: Number(result.roc_auc) || 0,
                  }))}
                  colors={chartColors}
                />
              )}

              <div className="results-table neo-card">
                <h3>Detailed Comparison</h3>
                <table className="fusion-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Technique</th>
                      <th>Accuracy</th>
                      <th>Precision</th>
                      <th>Recall</th>
                      <th>F1-Score</th>
                      <th>ROC-AUC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankedResults.map((result, idx) => (
                      <tr key={`${result.technique}-${idx}`}>
                        <td>#{idx + 1}</td>
                        <td className="technique-name-col">{result.technique}</td>
                        <td><span className={`metric-chip ${getMetricLevel(result.accuracy)}`}>{toScore(result.accuracy)}</span></td>
                        <td><span className={`metric-chip ${getMetricLevel(result.precision)}`}>{toScore(result.precision)}</span></td>
                        <td><span className={`metric-chip ${getMetricLevel(result.recall)}`}>{toScore(result.recall)}</span></td>
                        <td><span className={`metric-chip ${getMetricLevel(result.f1)}`}>{toScore(result.f1)}</span></td>
                        <td><span className={`metric-chip ${getMetricLevel(result.roc_auc)}`}>{toScore(result.roc_auc)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {rankedResults.length > 0 && (
                  <div className="best-technique-info">
                    <div className="best-label">Best Technique</div>
                    <div className="best-name">{bestTechnique?.technique}</div>
                    <div className="best-accuracy">
                      Accuracy: {toScore(bestTechnique?.accuracy)}
                    </div>
                  </div>
                )}
              </div>

              <div className="learning-hub neo-card">
                <h3>Virtual Lab Knowledge Hub</h3>
                <div className="learning-grid">
                  {learningCards.map((item) => (
                    <div key={item.technique} className="learning-card">
                      <div className="learning-title">{item.technique}</div>
                      <div className="learning-line"><strong>Concept:</strong> {item.concept}</div>
                      <div className="learning-line"><strong>Best For:</strong> {item.best_for}</div>
                      <div className="learning-line"><strong>Student Task:</strong> {item.student_task}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lab-activities neo-card">
                <h3>Guided Student Activities</h3>
                <ol>
                  <li>Start from baseline and explain why each fusion method improves or fails compared to no fusion.</li>
                  <li>Identify whether the best method also has the best F1 and ROC-AUC, then discuss trade-offs.</li>
                  <li>Compare weighted and attention fusion to understand fixed weights versus row-wise dynamic weights.</li>
                  <li>Write a short conclusion on which technique you would deploy in production and why.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FusionModule
