import { useState } from 'react'
import {
  FolderOpen, Folder, LayoutGrid, List, ChevronRight,
  Search, Cloud, RefreshCw
} from 'lucide-react'
import FileExplorer from '../components/repository/FileExplorer'
import Badge from '../components/ui/Badge'
import { PROJECTS } from '../constants/projects'
import { FOLDERS, FILES } from '../constants/documents'

const FOLDER_ICONS = {
  blueprint: '📐', file: '📄', shield: '🛡️', calculator: '🧮',
  tag: '🏷️', star: '⭐', calendar: '📅', users: '👥',
  shopping: '🛒', archive: '🗄️',
}

export default function RepositoryPage() {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0])
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const [search, setSearch] = useState('')

  const folders = selectedProject ? (FOLDERS[selectedProject.id] || []) : []

  const allProjectFiles = selectedProject ? FILES.filter(f => f.projectId === selectedProject.id) : []
  const folderFiles = selectedFolder
    ? allProjectFiles.filter(f => f.folderId === selectedFolder.id)
    : allProjectFiles

  const filteredFiles = search
    ? folderFiles.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : folderFiles

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-gray-900">Repositorio documental</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-gray-400">Organizado en Google Drive</p>
            <Badge variant="green" size="xs"><Cloud size={9} /> Sincronizado</Badge>
            <span className="text-xs text-gray-300">· Última sync: hace 12 min</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <RefreshCw size={15} />
          </button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={15} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Three panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel 1: Projects */}
        <div className="w-52 min-w-[208px] border-r border-gray-200 bg-white overflow-y-auto scrollbar-thin">
          <div className="p-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1">Proyectos</p>
            <div className="space-y-0.5 mt-1">
              {PROJECTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedProject(p); setSelectedFolder(null) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    selectedProject?.id === p.id
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen size={13} className={selectedProject?.id === p.id ? 'text-green-600' : 'text-gray-400'} />
                    <span className="truncate">{p.name}</span>
                  </div>
                  <div className="text-gray-400 font-normal mt-0.5 pl-5 truncate">{p.location.split(',')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Folders */}
        <div className="w-52 min-w-[208px] border-r border-gray-200 bg-white overflow-y-auto scrollbar-thin">
          <div className="p-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1">Carpetas</p>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => setSelectedFolder(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                  !selectedFolder ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FolderOpen size={13} className={!selectedFolder ? 'text-green-600' : 'text-gray-400'} />
                  <span>Todos los archivos</span>
                </div>
                <div className="text-gray-400 font-normal mt-0.5 pl-5">{allProjectFiles.length} documentos</div>
              </button>
              {folders.map(folder => {
                const count = FILES.filter(f => f.folderId === folder.id).length
                const isSelected = selectedFolder?.id === folder.id
                return (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                      isSelected ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Folder size={13} className={isSelected ? 'text-green-600' : 'text-gray-400'} />
                      <span className="truncate">{folder.name}</span>
                    </div>
                    <div className="text-gray-400 font-normal mt-0.5 pl-5">{count} documentos</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Panel 3: Files */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          {/* Breadcrumb + search */}
          <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 min-w-0">
              <span className="font-medium text-gray-700 truncate">{selectedProject?.name}</span>
              {selectedFolder && (
                <>
                  <ChevronRight size={12} className="text-gray-300 flex-shrink-0" />
                  <span className="text-gray-600 truncate">{selectedFolder.name}</span>
                </>
              )}
              <span className="text-gray-300 flex-shrink-0">({filteredFiles.length} docs)</span>
            </div>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar archivo..."
                className="pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-48"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <FileExplorer files={filteredFiles} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
