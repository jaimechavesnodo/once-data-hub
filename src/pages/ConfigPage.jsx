import { CheckCircle2, Bell, Palette, Shield, Globe } from 'lucide-react'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'

function Toggle({ checked = false, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-gray-700">{label}</span>
      <div className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-green-600' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
    </label>
  )
}

export default function ConfigPage() {
  const { user } = useAuth()

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-400 mt-0.5">Perfil, integraciones y preferencias</p>
      </div>

      {/* Profile */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Shield size={15} className="text-gray-400" /> Perfil de usuario
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <Badge variant="green" size="xs" className="mt-1">{user?.role}</Badge>
          </div>
        </div>
      </Card>

      {/* Integrations */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Globe size={15} className="text-gray-400" /> Integraciones
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M6 4L2 12L8 12L12 4Z" fill="#4285F4"/>
                  <path d="M18 4L22 12L16 12L12 4Z" fill="#34A853"/>
                  <path d="M2 12L8 12L12 20L6 20Z" fill="#FBBC05"/>
                  <path d="M22 12L16 12L12 20L18 20Z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Google Drive</p>
                <p className="text-xs text-gray-400">Repositorio documental sincronizado</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="green" size="xs"><CheckCircle2 size={10} /> Conectado</Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">ERP</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">SINCO ERP</p>
                <p className="text-xs text-gray-400">Proyectos, presupuestos y órdenes de compra</p>
              </div>
            </div>
            <Badge variant="blue" size="xs">API disponible</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">WA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">WhatsApp Business</p>
                <p className="text-xs text-gray-400">Notificaciones y alertas de documentos</p>
              </div>
            </div>
            <Badge variant="gray" size="xs">Próximamente</Badge>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Bell size={15} className="text-gray-400" /> Notificaciones
        </h2>
        <div className="space-y-4">
          <Toggle checked={true} label="Alertas de proveedores críticos" />
          <Toggle checked={true} label="Documentos clasificados por IA" />
          <Toggle checked={true} label="Licencias próximas a vencer" />
          <Toggle checked={false} label="Resumen semanal de proyectos" />
          <Toggle checked={false} label="Nuevos documentos en Drive" />
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Palette size={15} className="text-gray-400" /> Apariencia
        </h2>
        <div className="flex items-center gap-3">
          {['Claro', 'Oscuro', 'Sistema'].map((mode, i) => (
            <button
              key={mode}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                i === 0
                  ? 'bg-white border-green-500 text-green-700 shadow-sm'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </Card>

      <p className="text-xs text-gray-300 text-center pb-4">Once Data Hub · Prototipo funcional v0.1 · 2025</p>
    </div>
  )
}
