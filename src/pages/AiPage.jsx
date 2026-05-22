import { useState, useRef, useEffect } from 'react'
import { Sparkles, Play, CheckCircle2, FileText, Brain, Tag, FolderOpen } from 'lucide-react'
import AiLogPanel from '../components/ai/AiLogPanel'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import { AI_LOG_ENTRIES, AI_PROCESSING_STEPS } from '../constants/aiLog'

const NEW_ENTRY = {
  id: 'ai_new',
  timestamp: '2025-05-22 09:30:00',
  file: 'Comparativo_Materiales_TorreAlameda_v2.xlsx',
  action: 'Clasificado automáticamente',
  fromFolder: 'Sin clasificar',
  toFolder: 'Cotizaciones / Torre Alameda',
  category: 'Análisis Comparativo',
  supplier: null,
  project: 'Torre Alameda',
  confidence: 0.93,
  tags: ['comparativo', 'materiales', 'v2'],
  status: 'success',
}

export default function AiPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [stepIndex, setStepIndex] = useState(-1)
  const [done, setDone] = useState(false)
  const [entries, setEntries] = useState(AI_LOG_ENTRIES)
  const intervalRef = useRef(null)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  function handleRun() {
    if (isRunning) return
    setIsRunning(true)
    setDone(false)
    setStepIndex(0)

    let idx = 0
    intervalRef.current = setInterval(() => {
      idx++
      if (idx >= AI_PROCESSING_STEPS.length) {
        clearInterval(intervalRef.current)
        setIsRunning(false)
        setDone(true)
        setStepIndex(-1)
        setEntries(prev => [{ ...NEW_ENTRY, timestamp: new Date().toLocaleString('es-CO') }, ...prev])
      } else {
        setStepIndex(idx)
      }
    }, 600)
  }

  const successCount = entries.filter(e => e.status === 'success').length
  const reviewCount = entries.filter(e => e.status === 'review').length

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">IA / Organización automática</h1>
        <p className="text-sm text-gray-400 mt-0.5">Clasificación inteligente de documentos con extracción de metadata</p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Log panel */}
        <div className="col-span-3" style={{ height: 'calc(100vh - 220px)' }}>
          <AiLogPanel entries={entries} isRunning={isRunning} />
        </div>

        {/* Control panel */}
        <div className="col-span-2 space-y-4">
          {/* Organizer card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Brain size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">IA Organizadora</h3>
                <p className="text-xs text-gray-400">Once Data Hub</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Detecta documentos sin clasificar, extrae metadata, identifica proveedores y proyectos relacionados, y los organiza automáticamente en las carpetas correctas.
            </p>

            {/* Processing animation */}
            {isRunning && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-700">Procesando...</span>
                </div>
                {AI_PROCESSING_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                      i < stepIndex ? 'text-green-700' : i === stepIndex ? 'text-green-600 font-medium' : 'text-gray-300'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
                      i < stepIndex ? 'bg-green-500 border-green-500' :
                      i === stepIndex ? 'border-green-500 bg-green-100' :
                      'border-gray-200 bg-white'
                    }`}>
                      {i < stepIndex && <CheckCircle2 size={8} className="text-white" />}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            )}

            {done && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={15} className="text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Organización completada</span>
                </div>
                <p className="text-xs text-green-700">1 documento clasificado y organizado automáticamente.</p>
              </div>
            )}

            <Button
              variant="primary"
              icon={isRunning ? undefined : Sparkles}
              loading={isRunning}
              className="w-full justify-center"
              onClick={handleRun}
            >
              {isRunning ? 'Procesando...' : 'Organizar con IA'}
            </Button>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{successCount}</div>
              <div className="text-xs text-gray-500 mt-1">Clasificados</div>
              <Badge variant="green" size="xs" className="mt-2">Exitosos</Badge>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{reviewCount}</div>
              <div className="text-xs text-gray-500 mt-1">Para revisar</div>
              <Badge variant="amber" size="xs" className="mt-2">Confianza baja</Badge>
            </Card>
          </div>

          {/* How it works */}
          <Card className="p-5">
            <h4 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Cómo funciona</h4>
            <div className="space-y-3">
              {[
                { icon: FileText, label: 'Detecta documentos nuevos o sin clasificar', color: 'text-blue-500' },
                { icon: Brain, label: 'Analiza contenido y extrae metadata clave', color: 'text-purple-500' },
                { icon: Tag, label: 'Asigna categoría, proveedor y proyecto', color: 'text-amber-500' },
                { icon: FolderOpen, label: 'Organiza en la carpeta correcta de Drive', color: 'text-green-600' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon size={14} className={`${color} mt-0.5 flex-shrink-0`} />
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Drive integration note */}
          <Card className="p-4 bg-blue-50 border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Google Drive conectado.</strong> Los documentos organizados se sincronizan automáticamente y quedan accesibles para todo el equipo de Once Constructora.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
