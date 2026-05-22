import { Mail, Phone, MapPin, FileText, Star, AlertTriangle, Award, Building2 } from 'lucide-react'
import Modal from '../ui/Modal'
import Badge from '../ui/Badge'
import { getRiskColor, getRiskLabel } from '../../constants/suppliers'
import { PROJECTS } from '../../constants/projects'

function StatBox({ label, value, color = 'gray' }) {
  const colors = {
    gray:   'bg-gray-50 text-gray-700',
    green:  'bg-green-50 text-green-700',
    amber:  'bg-amber-50 text-amber-700',
    red:    'bg-red-50 text-red-700',
  }
  return (
    <div className={`rounded-lg p-3 text-center ${colors[color]}`}>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs mt-0.5 opacity-70">{label}</div>
    </div>
  )
}

function RatingRow({ label, value }) {
  const pct = (value / 5) * 100
  const color = value >= 4 ? 'bg-green-500' : value >= 3 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold w-8 text-right ${
        value >= 4 ? 'text-green-600' : value >= 3 ? 'text-amber-600' : 'text-red-600'
      }`}>{value.toFixed(1)}</span>
    </div>
  )
}

export default function SupplierCard({ supplier, isOpen, onClose }) {
  if (!supplier) return null
  const riskColor = getRiskColor(supplier.rating)
  const riskLabel = getRiskLabel(supplier.riskLevel)
  const projectNames = supplier.projects.map(pid => PROJECTS.find(p => p.id === pid)).filter(Boolean)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ficha de proveedor" size="lg">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600">
              {supplier.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">{supplier.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="gray" size="xs">{supplier.category}</Badge>
                <Badge variant={riskColor} size="xs">Riesgo {riskLabel}</Badge>
              </div>
              <p className="text-xs text-gray-400 mt-1">NIT: {supplier.nit}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${
              supplier.rating >= 4 ? 'text-green-600' :
              supplier.rating >= 3 ? 'text-amber-600' : 'text-red-600'
            }`}>{supplier.rating.toFixed(1)}</div>
            <div className="text-xs text-gray-400">/ 5.0</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatBox label="Retrasos" value={supplier.delays} color={supplier.delays > 3 ? 'red' : supplier.delays > 1 ? 'amber' : 'green'} />
          <StatBox label="Reclamos" value={supplier.claims} color={supplier.claims > 2 ? 'red' : supplier.claims > 0 ? 'amber' : 'green'} />
          <StatBox label="Documentos" value={supplier.documentsCount} color="gray" />
          <StatBox label="Contratos activos" value={supplier.activeContracts} color="gray" />
        </div>

        {/* Ratings detail */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Evaluación detallada</h4>
          <div className="space-y-2">
            <RatingRow label="Tiempo de respuesta" value={supplier.ratingTime} />
            <RatingRow label="Cumplimiento" value={supplier.ratingCompliance} />
            <RatingRow label="Calidad del producto" value={supplier.ratingQuality} />
            <RatingRow label="Calificación general" value={supplier.rating} />
          </div>
        </div>

        {/* Contact + Projects */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Mail size={13} className="text-gray-400" /> {supplier.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Phone size={13} className="text-gray-400" /> {supplier.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin size={13} className="text-gray-400" /> {supplier.city}
              </div>
            </div>
            {supplier.certifications.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Certificaciones</h4>
                <div className="flex flex-wrap gap-1">
                  {supplier.certifications.map(c => (
                    <Badge key={c} variant="blue" size="xs">
                      <Award size={9} /> {c}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Proyectos relacionados</h4>
            <div className="space-y-1.5">
              {projectNames.map(p => (
                <div key={p.id} className="flex items-center gap-2 text-xs text-gray-600">
                  <Building2 size={12} className="text-gray-400" />
                  <span>{p.name}</span>
                  <Badge variant={p.status === 'active' ? 'green' : 'gray'} size="xs">
                    {p.status === 'active' ? 'Activo' : 'Otro'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        {supplier.notes && (
          <div className={`rounded-xl p-4 border ${
            supplier.riskLevel === 'high' ? 'bg-red-50 border-red-100' :
            supplier.riskLevel === 'medium' ? 'bg-amber-50 border-amber-100' :
            'bg-green-50 border-green-100'
          }`}>
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className={
                supplier.riskLevel === 'high' ? 'text-red-500 mt-0.5' :
                supplier.riskLevel === 'medium' ? 'text-amber-500 mt-0.5' :
                'text-green-600 mt-0.5'
              } />
              <p className="text-xs text-gray-700 leading-relaxed">{supplier.notes}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
