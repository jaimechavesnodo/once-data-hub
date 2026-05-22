import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home, Building2, FolderOpen, Users, BarChart3,
  Sparkles, Settings, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { label: 'Inicio',          icon: Home,       path: '/home' },
  { label: 'Proyectos',       icon: Building2,  path: '/projects' },
  { label: 'Repositorio',     icon: FolderOpen, path: '/repository' },
  { label: 'Proveedores',     icon: Users,      path: '/suppliers' },
  { label: 'Dashboard',       icon: BarChart3,  path: '/dashboard' },
  { label: 'IA / Organización', icon: Sparkles, path: '/ai' },
  { label: 'Configuración',   icon: Settings,   path: '/config' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-60 min-w-[240px] bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src="/once-logo.png"
              alt="ONCE"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'flex'
              }}
            />
            <span className="text-white font-bold text-xs hidden w-full h-full items-center justify-center">O</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">Once Data Hub</div>
            <div className="text-xs text-gray-400 truncate">Constructora Once</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin space-y-0.5">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
              ${isActive
                ? 'bg-green-50 text-green-700 border-l-2 border-green-600 pl-[10px]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={13} className="text-green-500" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-900 truncate">{user?.name}</div>
            <div className="text-xs text-gray-400 truncate">{user?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
