import { MapPin, FileText, Users, User, Calendar } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../../constants/projects'

function formatCOP(value) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`
  return `$${value.toLocaleString('es-CO')}`
}

export default function ProjectCard({ project, onClick }) {
  const statusColor = PROJECT_STATUS_COLORS[project.status] || 'gray'
  const statusLabel = PROJECT_STATUS_LABELS[project.status] || project.status

  return (
    <Card hover onClick={onClick} className="flex flex-col">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{project.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={11} className="text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-500 truncate">{project.location}</span>
            </div>
          </div>
          <Badge variant={statusColor} size="xs">{statusLabel}</Badge>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <Badge variant="gray" size="xs">{project.phase}</Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="px-5 py-3 border-t border-gray-50">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-500">Avance de obra</span>
          <span className={`text-xs font-bold ${
            project.progress >= 70 ? 'text-green-600' :
            project.progress >= 40 ? 'text-amber-600' : 'text-red-500'
          }`}>{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} color="auto" />
      </div>

      {/* Stats */}
      <div className="px-5 py-3 border-t border-gray-50 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-1.5">
          <FileText size={13} className="text-gray-400" />
          <span className="text-xs text-gray-600">{project.documentsCount} documentos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={13} className="text-gray-400" />
          <span className="text-xs text-gray-600">{project.suppliersCount} proveedores</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 rounded-b-xl border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <User size={12} className="text-gray-400" />
          <span className="text-xs text-gray-500">{project.manager}</span>
        </div>
        <span className="text-xs text-gray-400">{formatCOP(project.budget)}</span>
      </div>
    </Card>
  )
}
