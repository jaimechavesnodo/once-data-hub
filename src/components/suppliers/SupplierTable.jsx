import { useState } from 'react'
import { ChevronUp, ChevronDown, Star, AlertCircle, ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import { getRiskColor, getRiskLabel } from '../../constants/suppliers'
import { PROJECTS } from '../../constants/projects'

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={12}
          className={n <= Math.round(value) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  )
}

function RatingDot({ rating }) {
  const color = rating >= 4.0 ? 'bg-green-500' : rating >= 3.0 ? 'bg-amber-500' : 'bg-red-500'
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${color} flex-shrink-0`} />
}

export default function SupplierTable({ suppliers, onRowClick }) {
  const [sortDir, setSortDir] = useState('desc')

  const sorted = [...suppliers].sort((a, b) =>
    sortDir === 'desc' ? b.rating - a.rating : a.rating - b.rating
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Proveedor</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoría</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <button
                className="flex items-center gap-1 hover:text-gray-800 transition-colors"
                onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
              >
                Calificación
                {sortDir === 'desc' ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
              </button>
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Riesgo</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Proyectos</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Última actividad</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sorted.map(supplier => {
            const riskColor = getRiskColor(supplier.rating)
            const riskLabel = getRiskLabel(supplier.riskLevel)
            const projectNames = supplier.projects
              .map(pid => PROJECTS.find(p => p.id === pid)?.name?.split(' ')[0])
              .filter(Boolean)

            return (
              <tr
                key={supplier.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onRowClick?.(supplier)}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{supplier.name}</div>
                      <div className="text-xs text-gray-400">{supplier.contact}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant="gray" size="xs">{supplier.category}</Badge>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <RatingDot rating={supplier.rating} />
                    <span className={`font-bold text-sm ${
                      supplier.rating >= 4.0 ? 'text-green-600' :
                      supplier.rating >= 3.0 ? 'text-amber-600' : 'text-red-600'
                    }`}>{supplier.rating.toFixed(1)}</span>
                    <StarRating value={supplier.rating} />
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Badge variant={riskColor} size="xs">{riskLabel}</Badge>
                  {supplier.delays > 2 && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle size={10} className="text-amber-500" />
                      <span className="text-xs text-amber-600">{supplier.delays} retrasos</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-wrap gap-1">
                    {projectNames.slice(0, 2).map(n => (
                      <Badge key={n} variant="gray" size="xs">{n}</Badge>
                    ))}
                    {projectNames.length > 2 && (
                      <Badge variant="gray" size="xs">+{projectNames.length - 2}</Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-500">{supplier.lastActivity}</td>
                <td className="px-4 py-3.5">
                  <button
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={e => { e.stopPropagation(); onRowClick?.(supplier) }}
                  >
                    <ExternalLink size={14} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
