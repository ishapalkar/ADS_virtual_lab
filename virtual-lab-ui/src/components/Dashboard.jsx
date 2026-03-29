import React, { useState } from 'react'
import { Activity, BarChart3, Layers, Zap, Database, Cpu } from 'lucide-react'
import Header from './Header'
import ModuleCard from './ModuleCard'
import DataViewer from './modules/DataViewer'
import CleaningModule from './modules/CleaningModule'
import PreprocessingModule from './modules/PreprocessingModule'
import ModelTrainingModule from './modules/ModelTrainingModule'
import FusionModule from './modules/FusionModule'
import './Dashboard.css'

function Dashboard() {
  const [activeModule, setActiveModule] = useState(null)

  const modules = [
    {
      id: 'data',
      title: 'Data Loader',
      description: 'Load & explore UCI Adult dataset',
      icon: Database,
      color: '#ffeb3b',
    },
    {
      id: 'cleaning',
      title: 'Data Cleaning',
      description: 'Handle missing values & duplicates',
      icon: Activity,
      color: '#51cf66',
    },
    {
      id: 'preprocessing',
      title: 'Preprocessing',
      description: 'Encode & scale features',
      icon: Zap,
      color: '#ff6b6b',
    },
    {
      id: 'training',
      title: 'Model Training',
      description: 'LR, Random Forest, XGBoost',
      icon: Cpu,
      color: '#bd93f9',
    },
    {
      id: 'unsupervised',
      title: 'Clustering',
      description: 'K-Means & visualization',
      icon: BarChart3,
      color: '#8be9fd',
    },
    {
      id: 'fusion',
      title: 'Data Fusion',
      description: 'Combine multiple sources',
      icon: Layers,
      color: '#ff79c6',
    },
  ]

  const getModuleComponent = () => {
    switch (activeModule) {
      case 'data':
        return <DataViewer onClose={() => setActiveModule(null)} />
      case 'cleaning':
        return <CleaningModule onClose={() => setActiveModule(null)} />
      case 'preprocessing':
        return <PreprocessingModule onClose={() => setActiveModule(null)} />
      case 'training':
        return <ModelTrainingModule onClose={() => setActiveModule(null)} />
      case 'fusion':
        return <FusionModule onClose={() => setActiveModule(null)} />
      default:
        return null
    }
  }

  return (
    <div className="dashboard">
      <Header />

      {activeModule ? (
        <div className="module-view">
          {getModuleComponent()}
        </div>
      ) : (
        <main className="dashboard-main">
          <div className="dashboard-intro">
            <h2 className="animate-slide-down">Data Science Lab</h2>
            <p className="animate-slide-up">
              Explore, clean, analyze, and fuse datasets
            </p>
          </div>

          <div className="modules-grid">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ModuleCard
                  module={module}
                  onClick={() => setActiveModule(module.id)}
                />
              </div>
            ))}
          </div>

          <div className="dashboard-footer">
            <div className="footer-stat">
              <span className="stat-label">Dataset</span>
              <span className="stat-value">UCI Adult</span>
            </div>
            <div className="footer-stat">
              <span className="stat-label">Rows</span>
              <span className="stat-value">~48K</span>
            </div>
            <div className="footer-stat">
              <span className="stat-label">Features</span>
              <span className="stat-value">14</span>
            </div>
            <div className="footer-stat">
              <span className="stat-label">Task</span>
              <span className="stat-value">Classification</span>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default Dashboard
