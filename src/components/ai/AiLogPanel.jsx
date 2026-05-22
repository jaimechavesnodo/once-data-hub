import { CheckCircle2, AlertCircle, Clock, Sparkles, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'

function ConfidenceBar({ value }) {
  const pct = Math.round(value * 100)
  const color = pct >= 85 ? 'bg-green-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-medium w-8 ${pct >= 85 ? 'text-green-600' : pct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
        {pct}%
      </span>
    </div>
  )
}

const STATUS_CONFIG = {
  success: { icon: CheckCircle2, color: 'text-green-600', badge: 'green', label: 'Clasificado' },
  review:  { icon: AlertCircle,  color: 'text-amber-600', badge: 'amber', label: 'Revisar' },
  pending: { icon: Clock,        color: 'text-gray-400',  badge: 'gray',  label: 'Pendiente' },
}

export default function AiLogPanel({ entries = [], isRunning = false }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Log de organización automática</h3>
          <p className="text-xs text-gray-400 mt-0.5">{entries.length} registros procesados</p>
        </div>
        {isRunning && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Procesando...
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Sparkles size={24} className="text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Sin actividad de IA registrada</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {entries.map(entry => {
              const sc = STATUS_CONFIG[entry.status] || STATUS_CONFIG.pending
              const StatusIcon = sc.icon
              return (
                <div key={entry.id} className="px-5 py-3.5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <StatusIcon size={16} className={`${sc.color} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium text-gray-800 truncate">{entry.file}</p>
                        <Badge variant={sc.badge} size="xs">{sc.label}</Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <span className="text-gray-400 truncate max-w-[120px]">{entry.fromFolder}</span>
                        <ArrowRight size={10} className="flex-shrink-0" />
                        <span className="text-gray-600 font-medium truncate">{entry.toFolder}</span>
                      </div>
                      {entry.category && (
                        <p className="text-xs text-gray-400 mt-0.5">{entry.category}</p>
                      )}
                      {entry.confidence && (
                        <div className="mt-1.5">
                          <ConfidenceBar value={entry.confidence} />
                        </div>
                      )}
                      <p className="text-xs text-gray-300 mt-1">{entry.timestamp}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
