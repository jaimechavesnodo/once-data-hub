const COLOR_MAP = {
  green:  'bg-green-500',
  amber:  'bg-amber-500',
  red:    'bg-red-500',
  blue:   'bg-blue-500',
}

export default function ProgressBar({ value = 0, color = 'green', showLabel = false, height = 'h-2', className = '' }) {
  const barColor = value >= 70 ? 'green' : value >= 40 ? 'amber' : 'red'
  const resolvedColor = color === 'auto' ? barColor : color

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ${COLOR_MAP[resolvedColor]}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-500 mt-0.5">{value}%</span>
      )}
    </div>
  )
}
