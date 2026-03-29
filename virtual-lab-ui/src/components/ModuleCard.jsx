import React from 'react'
import './ModuleCard.css'

function ModuleCard({ module, onClick }) {
  const IconComponent = module.icon

  return (
    <div
      className="module-card neo-card"
      onClick={onClick}
      style={{
        borderColor: '#000',
      }}
    >
      <div className="card-header">
        <div
          className="card-icon"
          style={{
            backgroundColor: module.color,
          }}
        >
          <IconComponent size={32} strokeWidth={3} />
        </div>
      </div>

      <div className="card-content">
        <h3>{module.title}</h3>
        <p>{module.description}</p>
      </div>

      <div className="card-footer">
        <span className="arrow">→</span>
      </div>

      <div className="card-hover-effect"></div>
    </div>
  )
}

export default ModuleCard
