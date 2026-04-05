import React from 'react'
import './ChartComponents.css'

// Simple Bar Chart
export function BarChart({ data, title, colors = ['#ffeb3b', '#51cf66', '#bd93f9'] }) {
  if (!data || data.length === 0) return null

  const safeValues = data.map((d) => Number(d.value) || 0)
  const maxValue = Math.max(...safeValues, 0.01)

  const width = Math.max(420, data.length * 72)
  const height = 280
  const padding = {
    top: 20,
    right: 20,
    bottom: data.length > 5 ? 78 : 56,
    left: 46,
  }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const slotWidth = chartWidth / data.length
  const barWidth = Math.max(14, slotWidth * 0.72)
  const rotateLabels = data.length > 5
  const yTicks = 4

  return (
    <div className="chart-container neo-card">
      <h3>{title}</h3>
      <div className="chart-scroll">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Horizontal grid and y-axis labels */}
          {Array.from({ length: yTicks + 1 }).map((_, idx) => {
            const fraction = idx / yTicks
            const y = padding.top + chartHeight - chartHeight * fraction
            const tickValue = maxValue * fraction

            return (
              <g key={`grid-${idx}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#ddd"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {tickValue.toFixed(2)}
                </text>
              </g>
            )
          })}

          {/* Bars */}
          {data.map((item, idx) => {
            const value = Number(item.value) || 0
            const barHeight = (value / maxValue) * chartHeight
            const x = padding.left + idx * slotWidth + (slotWidth - barWidth) / 2
            const y = padding.top + chartHeight - barHeight
            const labelX = x + barWidth / 2
            const labelY = height - padding.bottom + 18

            return (
              <g key={idx}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={colors[idx % colors.length]}
                  stroke="#000"
                  strokeWidth="2"
                />
                <text
                  x={labelX}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {value.toFixed(3)}
                </text>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  transform={rotateLabels ? `rotate(-35 ${labelX} ${labelY})` : undefined}
                >
                  {item.label}
                </text>
              </g>
            )
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={width - padding.right}
            y2={padding.top + chartHeight}
            stroke="#000"
            strokeWidth="2"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke="#000"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  )
}

// Confusion Matrix Heatmap
export function ConfusionMatrix({ matrix, title = 'Confusion Matrix' }) {
  const size = Math.sqrt(matrix.flat().length)
  const maxVal = Math.max(...matrix.flat())

  const getColor = (value) => {
    const intensity = value / maxVal
    if (intensity > 0.7) return '#51cf66'
    if (intensity > 0.4) return '#ffeb3b'
    return '#ff6b6b'
  }

  return (
    <div className="chart-container neo-card">
      <h3>{title}</h3>
      <div className="confusion-matrix">
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <div
              key={`${i}-${j}`}
              className="matrix-cell"
              style={{
                backgroundColor: getColor(val),
                gridColumn: j + 1,
                gridRow: i + 1,
              }}
            >
              <span className="matrix-value">{val}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Metrics Table
export function MetricsTable({ metrics, title = 'Model Metrics' }) {
  const entries = Object.entries(metrics)

  return (
    <div className="chart-container neo-card">
      <h3>{title}</h3>
      <table className="metrics-table">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td className="metric-name">{key}</td>
              <td className="metric-value">
                {typeof value === 'number' ? value.toFixed(4) : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Simple Line Chart (for elbow curve)
export function LineChart({ data, title, xLabel = 'X', yLabel = 'Y' }) {
  if (!data || data.length === 0) return null

  const xValues = data.map(d => d[0])
  const yValues = data.map(d => d[1])
  const minX = Math.min(...xValues)
  const maxX = Math.max(...xValues)
  const minY = Math.min(...yValues)
  const maxY = Math.max(...yValues)

  const padding = 40
  const width = 400
  const height = 250

  const scaleX = (x) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding)
  const scaleY = (y) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding)

  const pathData = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(d[0])} ${scaleY(d[1])}`)
    .join(' ')

  return (
    <div className="chart-container neo-card">
      <h3>{title}</h3>
      <svg width="100%" height="250" viewBox="0 0 400 250">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`grid-h-${i}`}
            x1={padding}
            y1={padding + (i * (height - 2 * padding)) / 4}
            x2={width - padding}
            y2={padding + (i * (height - 2 * padding)) / 4}
            stroke="#ddd"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#000" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#000" strokeWidth="2" />

        {/* Line */}
        <path d={pathData} stroke="#000" strokeWidth="2" fill="none" />

        {/* Points */}
        {data.map((d, i) => (
          <circle
            key={`point-${i}`}
            cx={scaleX(d[0])}
            cy={scaleY(d[1])}
            r="3"
            fill="#ffeb3b"
            stroke="#000"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="10" fontWeight="bold">
          {xLabel}
        </text>
        <text x={15} y={height / 2} textAnchor="middle" fontSize="10" fontWeight="bold" transform={`rotate(-90 15 ${height / 2})`}>
          {yLabel}
        </text>
      </svg>
    </div>
  )
}

// Loading Spinner
export function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  )
}

// Error Alert
export function ErrorAlert({ error, onClose }) {
  return (
    <div className="error-alert neo-card">
      <div className="error-content">
        <h4>Error</h4>
        <p>{error}</p>
      </div>
      <button className="neo-button" onClick={onClose} style={{ marginTop: '12px' }}>
        Dismiss
      </button>
    </div>
  )
}

// Success Alert
export function SuccessAlert({ message, onClose }) {
  return (
    <div className="success-alert neo-card">
      <div className="success-content">
        <h4>Success</h4>
        <p>{message}</p>
      </div>
      <button className="neo-button" onClick={onClose} style={{ marginTop: '12px' }}>
        Close
      </button>
    </div>
  )
}
