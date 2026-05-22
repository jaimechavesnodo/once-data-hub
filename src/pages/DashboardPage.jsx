import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import KpiCard from '../components/ui/KpiCard'
import DashboardChart from '../components/dashboard/DashboardChart'
import {
  KPI_DATA, DOCS_BY_PROJECT, DOCS_BY_TYPE, ACTIVITY_TIMELINE,
  SUPPLIER_RATINGS, BUDGET_VS_SPENT, PROGRESS_BY_PROJECT
} from '../constants/dashboard'

const CHART_COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      {label && <p className="font-semibold text-gray-700 mb-1">{label}</p>}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name || p.dataKey}:</span>
          <span className="font-medium text-gray-800">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Indicadores operativos en tiempo real</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-4">
        {KPI_DATA.map(kpi => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <DashboardChart title="Documentos por proyecto" subtitle="Total de documentos registrados">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DOCS_BY_PROJECT} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="docs" fill="#16a34a" radius={[4, 4, 0, 0]} name="Documentos" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Actividad mensual" subtitle="Documentos cargados por mes">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ACTIVITY_TIMELINE} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="docs"
                stroke="#16a34a"
                strokeWidth={2.5}
                dot={{ fill: '#16a34a', r: 4 }}
                activeDot={{ r: 6 }}
                name="Documentos"
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardChart>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <DashboardChart title="Tipos de documentos">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DOCS_BY_TYPE}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {DOCS_BY_TYPE.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Calificación proveedores" subtitle="Ordenado de mayor a menor">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={SUPPLIER_RATINGS}
              margin={{ top: 5, right: 30, bottom: 5, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
              <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={65} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rating" radius={[0, 4, 4, 0]} name="Calificación">
                {SUPPLIER_RATINGS.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.rating >= 4 ? '#16a34a' : entry.rating >= 3 ? '#d97706' : '#dc2626'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Distribución de riesgo" subtitle="Proveedores por nivel de riesgo">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Riesgo Bajo', value: 5, color: '#16a34a' },
                  { name: 'Riesgo Medio', value: 3, color: '#d97706' },
                  { name: 'Riesgo Alto', value: 2, color: '#dc2626' },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {[{ color: '#16a34a' }, { color: '#d97706' }, { color: '#dc2626' }].map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </DashboardChart>
      </div>

      {/* Charts row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <DashboardChart title="Presupuesto vs Ejecutado" subtitle="En millones COP">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BUDGET_VS_SPENT} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ fontSize: 11, color: '#6b7280' }}>{value}</span>}
              />
              <Bar dataKey="presupuesto" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Presupuesto" />
              <Bar dataKey="ejecutado" fill="#16a34a" radius={[4, 4, 0, 0]} name="Ejecutado" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardChart>

        <DashboardChart title="Avance por proyecto" subtitle="Porcentaje de avance de obra">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PROGRESS_BY_PROJECT} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avance" radius={[4, 4, 0, 0]} name="Avance">
                {PROGRESS_BY_PROJECT.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.avance >= 70 ? '#16a34a' : entry.avance >= 40 ? '#f59e0b' : '#ef4444'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardChart>
      </div>
    </div>
  )
}
