const VARIANTS = {
  green:  'bg-green-50 text-green-700 border border-green-200',
  amber:  'bg-amber-50 text-amber-700 border border-amber-200',
  red:    'bg-red-50 text-red-700 border border-red-200',
  blue:   'bg-blue-50 text-blue-700 border border-blue-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  gray:   'bg-gray-100 text-gray-600 border border-gray-200',
  dark:   'bg-gray-800 text-white',
}

const SIZES = {
  xs: 'text-xs px-1.5 py-0.5',
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
}

export default function Badge({ variant = 'gray', size = 'sm', children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full leading-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`}>
      {children}
    </span>
  )
}
