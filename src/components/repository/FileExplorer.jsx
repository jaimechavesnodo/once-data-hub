import { FileText, Download, MoreHorizontal, Sparkles, Eye } from 'lucide-react'
import Badge from '../ui/Badge'
import { FILE_TYPE_STYLES, FILE_STATUS_LABELS, FILE_STATUS_COLORS } from '../../constants/documents'

function FileIcon({ type }) {
  const style = FILE_TYPE_STYLES[type] || FILE_TYPE_STYLES.pdf
  return (
    <div className={`w-9 h-9 rounded-lg ${style.bg} border ${style.border} flex items-center justify-center flex-shrink-0`}>
      <span className={`text-xs font-bold ${style.color}`}>{style.label}</span>
    </div>
  )
}

function FileRow({ file }) {
  const statusColor = FILE_STATUS_COLORS[file.status] || 'gray'
  const statusLabel = FILE_STATUS_LABELS[file.status] || file.status

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-lg group transition-colors">
      <FileIcon type={file.type} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800 truncate">{file.name}</span>
          {file.aiClassified && (
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 border border-green-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
              <Sparkles size={9} /> IA
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          {file.aiClassified && file.aiCategory && (
            <span className="text-xs text-gray-400 truncate">{file.aiCategory}</span>
          )}
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{file.size}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{file.uploadedAt}</span>
        </div>
      </div>
      <Badge variant={statusColor} size="xs">{statusLabel}</Badge>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" title="Ver">
          <Eye size={14} />
        </button>
        <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors" title="Descargar">
          <Download size={14} />
        </button>
      </div>
    </div>
  )
}

function FileGrid({ file }) {
  const style = FILE_TYPE_STYLES[file.type] || FILE_TYPE_STYLES.pdf

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div className={`w-12 h-12 rounded-xl ${style.bg} border ${style.border} flex items-center justify-center`}>
          <span className={`text-sm font-bold ${style.color}`}>{style.label}</span>
        </div>
        {file.aiClassified && (
          <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-100 px-1.5 py-0.5 rounded-full">
            <Sparkles size={9} /> IA
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-gray-800 line-clamp-2 mb-2">{file.name}</p>
      {file.aiCategory && (
        <p className="text-xs text-gray-400 mb-2 truncate">{file.aiCategory}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{file.uploadedAt}</span>
        <span className="text-xs text-gray-400">{file.size}</span>
      </div>
    </div>
  )
}

export default function FileExplorer({ files = [], viewMode = 'list' }) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <FileText size={20} className="text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-500">Sin documentos en esta carpeta</p>
        <p className="text-xs text-gray-400 mt-1">Sube el primer documento con el botón de arriba</p>
      </div>
    )
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 p-4">
        {files.map(f => <FileGrid key={f.id} file={f} />)}
      </div>
    )
  }

  return (
    <div className="p-2 space-y-0.5">
      {files.map(f => <FileRow key={f.id} file={f} />)}
    </div>
  )
}
