import { useState } from 'react'
import { Building2, Plus } from 'lucide-react'
import ProjectCard from '../components/projects/ProjectCard'
import Button from '../components/ui/Button'
import { PROJECTS, PROJECT_STATUS_LABELS } from '../constants/projects'

const TABS = [
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'En ejecución' },
  { key: 'planning', label: 'En planeación' },
  { key: 'evaluation', label: 'En evaluación' },
  { key: 'closed', label: 'Cerrado' },
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.status === activeTab)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-sm text-gray-400 mt-0.5">{PROJECTS.length} proyectos registrados</p>
        </div>
        <Button variant="outline" size="sm" icon={Plus} disabled>
          Nuevo proyecto
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {TABS.map(tab => {
          const count = tab.key === 'all'
            ? PROJECTS.length
            : PROJECTS.filter(p => p.status === tab.key).length
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className={`ml-1.5 text-xs ${
                  activeTab === tab.key ? 'text-gray-500' : 'text-gray-400'
                }`}>({count})</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Building2 size={32} className="text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">No hay proyectos en esta categoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  )
}
