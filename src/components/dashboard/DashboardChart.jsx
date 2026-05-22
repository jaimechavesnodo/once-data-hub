export default function DashboardChart({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-64">
        {children}
      </div>
    </div>
  )
}
