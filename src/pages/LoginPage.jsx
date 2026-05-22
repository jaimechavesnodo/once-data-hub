import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@onceconstructora.com')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/home')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#166534 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="w-full max-w-sm relative">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-600/20 overflow-hidden">
              <img
                src="/once-logo.png"
                alt="Once"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'block'
                }}
              />
              <span className="text-white font-bold text-2xl hidden">O</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Once Data Hub</h1>
            <p className="text-sm text-gray-400 mt-1 text-center">
              Memoria operativa de proyectos y proveedores
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-600/20"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          {/* Hint */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Acceso demo</p>
            <p className="text-xs text-gray-500 mt-1 font-mono">admin@onceconstructora.com / demo123</p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Powered by NODO · Prototipo v1.0 · 2026
        </p>
      </div>
    </div>
  )
}
