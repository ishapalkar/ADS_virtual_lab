const API_BASE = 'http://localhost:5000/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'API error')
  }
  return response.json()
}

export const api = {
  // Health
  health: () =>
    fetch(`${API_BASE}/health`).then(handleResponse),

  // Data Loading
  data: {
    load: () =>
      fetch(`${API_BASE}/data/load`).then(handleResponse),
    sample: (n = 5) =>
      fetch(`${API_BASE}/data/sample?n=${n}`).then(handleResponse),
  },

  // Data Cleaning
  cleaning: {
    run: (method = 'all') =>
      fetch(`${API_BASE}/cleaning/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method }),
      }).then(handleResponse),
    getMissingValues: () =>
      fetch(`${API_BASE}/cleaning/missing-values`).then(handleResponse),
  },

  // Data Imputation
  imputation: {
    run: (method = 'mode') =>
      fetch(`${API_BASE}/cleaning/impute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method }),
      }).then(handleResponse),
    compare: () =>
      fetch(`${API_BASE}/cleaning/impute/compare`, {
        method: 'POST',
      }).then(handleResponse),
  },

  // Preprocessing
  preprocessing: {
    run: (config = {}) =>
      fetch(`${API_BASE}/preprocessing/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      }).then(handleResponse),
  },

  // Models
  models: {
    train: (model = 'random_forest') =>
      fetch(`${API_BASE}/models/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model }),
      }).then(handleResponse),
    compare: () =>
      fetch(`${API_BASE}/models/compare`, {
        method: 'POST',
      }).then(handleResponse),
  },

  // Clustering
  clustering: {
    analyze: () =>
      fetch(`${API_BASE}/clustering/analyze`, {
        method: 'POST',
      }).then(handleResponse),
    getPCA: (k = 3) =>
      fetch(`${API_BASE}/clustering/pca`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ k }),
      }).then(handleResponse),
    getElbow: () =>
      fetch(`${API_BASE}/clustering/elbow`).then(handleResponse),
  },

  // Fusion
  fusion: {
    compare: () =>
      fetch(`${API_BASE}/fusion/compare`, {
        method: 'POST',
      }).then(handleResponse),
    early: () =>
      fetch(`${API_BASE}/fusion/early`, {
        method: 'POST',
      }).then(handleResponse),
    late: () =>
      fetch(`${API_BASE}/fusion/late`, {
        method: 'POST',
      }).then(handleResponse),
    weighted: () =>
      fetch(`${API_BASE}/fusion/weighted`, {
        method: 'POST',
      }).then(handleResponse),
    hybrid: () =>
      fetch(`${API_BASE}/fusion/hybrid`, {
        method: 'POST',
      }).then(handleResponse),
  },

  // Pipeline
  pipeline: {
    runAll: () =>
      fetch(`${API_BASE}/pipeline/run-all`, {
        method: 'POST',
      }).then(handleResponse),
  },
}
