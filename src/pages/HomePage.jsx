import { useNavigate } from 'react-router-dom'
import {
  Building2, FolderOpen, Users, BarChart3,
  AlertTriangle, ArrowRight, Sparkles, Clock, CheckCircle2, FileText
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { PROJECTS, PROJECT_STATUS_LABELS } from '../constants/projects'
import { AI_LOG_ENTRIES } from '../constants/aiLog'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'

const FEATURE_CARDS = [
  {
    icon: FolderOpen,
    title: 'Repositorio centralizado',
    description: 'Todos los documentos de cada proyecto organizados en carpetas inteligentes.',
    path: '/repository',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Proveedores evaluados',
    description: 'Calificaciones, riesgos y alertas de cada proveedor en tiempo real.',
    path: '/suppliers',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Sparkles,
    title: 'Organización con IA',
    description: 'Clasificación automática de documentos con metadatos extraídos.',
    path: '/ai',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: BarChart3,
    title: 'Dashboards en tiempo real',
    description: 'KPIs, presupuestos y avance de todos los proyectos de un vistazo.',
    path: '/dashboard',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
]

const ALERTS = [
  {
    type: 'red',
    icon: AlertTriangle,
    title: 'Proveedor crítico detectado',
    description: 'Acabados Premium tiene calificación 2.1 y 4 reclamos abiertos.',
    action: 'Ver proveedor',
    path: '/suppliers',
  },
  {
    type: 'amber',
    icon: Clock,
    title: 'Licencia por vencer',
    description: 'Licencia de construcción Hacienda San Marcos vence en 39 días.',
    action: 'Ver documento',
    path: '/repository',
  },
  {
    type: 'amber',
    icon: FileText,
    title: '3 documentos sin clasificar',
    description: 'Documentos pendientes de organización automática en Torre Alameda.',
    action: 'Organizar ahora',
    path: '/ai',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const recentProjects = [...PROJECTS].sort((a, b) => b.lastUpdate.localeCompare(a.lastUpdate)).slice(0, 3)
  const recentActivity = AI_LOG_ENTRIES.slice(0, 5)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="pt-2">
        <p className="text-xs font-medium text-green-600 mb-1">Bienvenido, {user?.name}</p>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Toda la información de proyectos y<br />proveedores en un solo lugar.
        </h1>
        <p className="text-gray-400 mt-2 text-sm max-w-xl">
          Centraliza documentos, evalúa proveedores, controla avances y toma decisiones con información clara y accesible.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-4 gap-4">
        {FEATURE_CARDS.map(({ icon: Icon, title, description, path, color, iconColor }) => (
          <Card key={path} hover onClick={() => navigate(path)} className="p-5">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
              <Icon size={20} className={iconColor} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{description}</p>
            <div className={`flex items-center gap-1 text-xs font-medium ${iconColor}`}>
              Ver más <ArrowRight size={12} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent projects */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Proyectos recientes</h2>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              Ver todos <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {recentProjects.map(p => {
              const statusLabel = PROJECT_STATUS_LABELS[p.status]
              const statusVariant = p.status === 'active' ? 'green' : p.status === 'planning' ? 'blue' : p.status === 'evaluation' ? 'amber' : 'gray'
              return (
                <Card key={p.id} hover onClick={() => navigate('/projects')} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Building2 size={16} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{p.name}</span>
                        <Badge variant={statusVariant} size="xs">{statusLabel}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5">
                        <div className="flex-1">
                          <ProgressBar value={p.progress} color="auto" height="h-1.5" />
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{p.progress}%</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-gray-400">{p.documentsCount} docs</div>
                      <div className="text-xs text-gray-300 mt-0.5">{p.lastUpdate}</div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">Actividad reciente (IA)</h2>
          <Card className="divide-y divide-gray-50">
            {recentActivity.map(entry => (
              <div key={entry.id} className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={13} className={`mt-0.5 flex-shrink-0 ${entry.status === 'success' ? 'text-green-500' : 'text-amber-500'}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{entry.file}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{entry.category || entry.action}</p>
                    <p className="text-xs text-gray-300 mt-0.5">{entry.timestamp.split(' ')[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Alertas importantes</h2>
        <div className="grid grid-cols-3 gap-4">
          {ALERTS.map((alert, i) => {
            const Icon = alert.icon
            return (
              <div
                key={i}
                className={`rounded-xl p-4 border cursor-pointer hover:shadow-sm transition-shadow ${
                  alert.type === 'red'
                    ? 'bg-red-50 border-red-100'
                    : 'bg-amber-50 border-amber-100'
                }`}
                onClick={() => navigate(alert.path)}
              >
                <div className="flex items-start gap-3">
                  <Icon size={16} className={alert.type === 'red' ? 'text-red-500 mt-0.5' : 'text-amber-500 mt-0.5'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{alert.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{alert.description}</p>
                    <div className={`flex items-center gap-1 text-xs font-medium mt-2 ${
                      alert.type === 'red' ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {alert.action} <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Drive + SINCO */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M6 4L2 12L8 12L12 4Z" fill="#4285F4"/>
                <path d="M18 4L22 12L16 12L12 4Z" fill="#34A853"/>
                <path d="M2 12L8 12L12 20L6 20Z" fill="#FBBC05"/>
                <path d="M22 12L16 12L12 20L18 20Z" fill="#EA4335"/>
                <path d="M8 12L16 12L12 20Z" fill="#4285F4" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Google Drive</h3>
                <Badge variant="green" size="xs"><CheckCircle2 size={9} /> Conectado</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Los documentos se organizan automáticamente en Drive y se visualizan en el portal.
              </p>
              <p className="text-xs text-gray-400 mt-1.5">Última sincronización: hace 12 minutos</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-gray-600">ERP</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">SINCO ERP</h3>
                <Badge variant="blue" size="xs">API disponible</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Fuente de información operativa. Proyectos, presupuestos, órdenes de compra y proveedores disponibles vía API.
              </p>
              <p className="text-xs text-gray-400 mt-1.5">Listo para integración</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
