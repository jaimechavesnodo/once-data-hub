import {
  Building2, FileText, Users, AlertTriangle, Sparkles, Clock,
  TrendingUp, TrendingDown, Minus
} from 'lucide-react'

const ICONS = { Building2, FileText, Users, AlertTriangle, Sparkles, Clock }

const COLOR_MAP = {
  green:  { bg: 'bg-green-50', icon: 'text-green-600', badge: 'bg-green-100 text-green-700' },
  blue:   { bg: 'bg-blue-50',  icon: 'text-blue-600',  badge: 'bg-blue-100 text-blue-700' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  amber:  { bg: 'bg-amber-50', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
}

export default function KpiCard({ label, value, icon, trend, trendUp, color = 'green' }) {
  const Icon = ICONS[icon] || FileText
  const c = COLOR_MAP[color] || COLOR_MAP.green

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
          <Icon size={20} className={c.icon} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trendUp === true  ? 'bg-green-50 text-green-700' :
            trendUp === false ? 'bg-red-50 text-red-600' :
                                'bg-gray-100 text-gray-500'
          }`}>
            {trendUp === true  ? <TrendingUp size={11} /> :
             trendUp === false ? <TrendingDown size={11} /> :
                                 <Minus size={11} />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900 leading-none">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
      </div>
    </div>
  )
}
