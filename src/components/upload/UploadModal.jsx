import { useState, useEffect } from 'react'
import { CheckCircle2, Loader2, Upload, Sparkles, FolderOpen } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { PROJECTS } from '../../constants/projects'
import { SUPPLIERS } from '../../constants/suppliers'

const FOLDERS = [
  'Planos', 'Contratos', 'Licencias y permisos', 'Presupuestos',
  'Cotizaciones', 'Evaluaciones', 'Cronogramas', 'Actas y reuniones',
  'Compras', 'Historial documental',
]

const DOC_TYPES = [
  'Plano arquitectónico', 'Plano estructural', 'Plano instalaciones',
  'Contrato de servicios', 'Cotización', 'Evaluación de proveedor',
  'Licencia y permiso', 'Presupuesto', 'Cronograma', 'Acta de reunión',
  'Orden de compra', 'Informe de avance',
]

const STEPS = [
  { text: 'Cargando archivo...', duration: 800 },
  { text: 'Analizando contenido con IA...', duration: 900 },
  { text: 'Identificando categoría documental...', duration: 700 },
  { text: 'Extrayendo metadata y etiquetas...', duration: 600 },
  { text: 'Clasificando en carpeta de destino...', duration: 500 },
]

export default function UploadModal({ isOpen, onClose }) {
  const [state, setState] = useState('idle') // idle | loading | success
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState({
    projectId: '',
    folder: '',
    docType: '',
    supplierId: '',
    fileName: '',
  })

  useEffect(() => {
    if (!isOpen) {
      setState('idle')
      setStepIndex(0)
      setForm({ projectId: '', folder: '', docType: '', supplierId: '', fileName: '' })
    }
  }, [isOpen])

  function handleSimulate() {
    if (!form.projectId || !form.folder) return
    setState('loading')
    setStepIndex(0)

    let idx = 0
    const total = STEPS.length

    function nextStep() {
      if (idx < total - 1) {
        idx++
        setStepIndex(idx)
        setTimeout(nextStep, STEPS[idx].duration)
      } else {
        setTimeout(() => setState('success'), 600)
      }
    }
    setTimeout(nextStep, STEPS[0].duration)
  }

  const project = PROJECTS.find(p => p.id === form.projectId)
  const supplier = SUPPLIERS.find(s => s.id === form.supplierId)

  return (
    <Modal isOpen={isOpen} onClose={state === 'loading' ? undefined : onClose} title="Subir documento" size="md">
      <div className="p-6">
        {state === 'idle' && (
          <div className="space-y-4">
            {/* Drop zone visual */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 hover:border-green-300 transition-colors cursor-pointer">
              <Upload size={28} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">Arrastra un archivo aquí</p>
              <p className="text-xs text-gray-400 mt-1">o haz clic para seleccionar</p>
              <input
                type="text"
                placeholder="Nombre del archivo (ej: Cotizacion_Proveedor.pdf)"
                value={form.fileName}
                onChange={e => setForm(f => ({ ...f, fileName: e.target.value }))}
                className="mt-3 w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Proyecto *</label>
                <select
                  value={form.projectId}
                  onChange={e => setForm(f => ({ ...f, projectId: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                >
                  <option value="">Seleccionar...</option>
                  {PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Carpeta destino *</label>
                <select
                  value={form.folder}
                  onChange={e => setForm(f => ({ ...f, folder: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                >
                  <option value="">Seleccionar...</option>
                  {FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tipo de documento</label>
                <select
                  value={form.docType}
                  onChange={e => setForm(f => ({ ...f, docType: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                >
                  <option value="">Seleccionar...</option>
                  {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Proveedor relacionado</label>
                <select
                  value={form.supplierId}
                  onChange={e => setForm(f => ({ ...f, supplierId: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                >
                  <option value="">Ninguno</option>
                  {SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            <Button
              variant="primary"
              icon={Upload}
              className="w-full justify-center"
              disabled={!form.projectId || !form.folder}
              onClick={handleSimulate}
            >
              Simular carga
            </Button>
          </div>
        )}

        {state === 'loading' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto">
              <Loader2 size={28} className="text-green-600 animate-spin" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Procesando documento</p>
              <p className="text-sm text-green-600 font-medium">{STEPS[stepIndex].text}</p>
            </div>
            <div className="space-y-2 text-left">
              {STEPS.map((step, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs transition-all duration-300 ${i <= stepIndex ? 'text-gray-700' : 'text-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i < stepIndex ? 'bg-green-500' : i === stepIndex ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-100'
                  }`}>
                    {i < stepIndex && <CheckCircle2 size={10} className="text-white" />}
                  </div>
                  {step.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {state === 'success' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">Documento cargado con éxito</p>
              <p className="text-sm text-gray-500 mt-1">Enviado a organización automática con IA</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-left space-y-2 border border-green-100">
              <div className="flex items-center gap-2 text-xs">
                <FolderOpen size={13} className="text-green-600" />
                <span className="text-gray-500">Destino:</span>
                <span className="font-medium text-gray-800">{project?.name} / {form.folder}</span>
              </div>
              {form.docType && (
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles size={13} className="text-green-600" />
                  <span className="text-gray-500">Clasificado como:</span>
                  <span className="font-medium text-gray-800">{form.docType}</span>
                </div>
              )}
              {supplier && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500">Proveedor:</span>
                  <span className="font-medium text-gray-800">{supplier.name}</span>
                </div>
              )}
            </div>
            <Button variant="primary" onClick={onClose} className="w-full justify-center">
              Listo
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
