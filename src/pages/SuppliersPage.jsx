import { useState } from 'react'
import { Search, AlertTriangle, TrendingUp, Filter } from 'lucide-react'
import SupplierTable from '../components/suppliers/SupplierTable'
import SupplierCard from '../components/suppliers/SupplierCard'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import { SUPPLIERS } from '../constants/suppliers'

const CATEGORIES = ['Todas', 'Cemento', 'Acero', 'Concreto', 'Transporte', 'Instalaciones eléctricas', 'Instalaciones hidráulicas', 'Seguridad', 'Carpintería', 'Acabados', 'Maquinaria']

export default function SuppliersPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [selected, setSelected] = useState(null)

  const filtered = SUPPLIERS.filter(s => {
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Todas' || s.category === category
    return matchSearch && matchCat
  })

  const critical = SUPPLIERS.filter(s => s.riskLevel === 'high')
  const top = SUPPLIERS.filter(s => s.rating >= 4.5)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Proveedores</h1>
          <p className="text-sm text-gray-400 mt-0.5">{SUPPLIERS.length} proveedores registrados</p>
        </div>
      </div>

      {/* Alert strip */}
      {critical.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Proveedores con riesgo alto</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {critical.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {s.name} ({s.rating.toFixed(1)})
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
            <TrendingUp size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">Proveedores destacados</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {top.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {s.name} ({s.rating.toFixed(1)})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar proveedor..."
            className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 w-52"
          />
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {filtered.length !== SUPPLIERS.length && (
          <span className="text-xs text-gray-500">Mostrando {filtered.length} de {SUPPLIERS.length}</span>
        )}
      </div>

      {/* Table */}
      <SupplierTable suppliers={filtered} onRowClick={setSelected} />

      {/* Detail modal */}
      <SupplierCard
        supplier={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
