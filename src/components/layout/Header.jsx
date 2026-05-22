import { useNavigate } from 'react-router-dom'
import { Sparkles, Upload, CloudIcon, CheckCircle2 } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function Header({ onUploadClick }) {
  const navigate = useNavigate()

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between gap-4 flex-shrink-0">
      {/* Left: branding */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md overflow-hidden bg-green-600 flex items-center justify-center">
            <img
              src="/once-logo.png"
              alt="Once"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
            />
            <span className="text-white font-bold text-xs hidden w-full h-full items-center justify-center">O</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Once Data Hub</span>
            <span className="text-xs text-gray-400 ml-2">Memoria operativa de proyectos y proveedores</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-1">
          <Badge variant="gray" size="xs">Prototipo funcional</Badge>
          <Badge variant="green" size="xs">
            <CheckCircle2 size={10} />
            Google Drive conectado
          </Badge>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={Sparkles}
          onClick={() => navigate('/ai')}
        >
          Organizar con IA
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={Upload}
          onClick={onUploadClick}
        >
          Subir documento
        </Button>
      </div>
    </header>
  )
}
