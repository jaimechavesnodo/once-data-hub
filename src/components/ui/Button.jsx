import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
  outline: 'border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 bg-white',
  ghost:   'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  danger:  'bg-red-600 hover:bg-red-700 text-white shadow-sm',
}

const SIZES = {
  sm:  'text-xs px-3 py-1.5 gap-1.5',
  md:  'text-sm px-4 py-2 gap-2',
  lg:  'text-base px-5 py-2.5 gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        Icon && <Icon size={size === 'sm' ? 13 : size === 'lg' ? 18 : 15} />
      )}
      {children}
      {IconRight && !loading && <IconRight size={size === 'sm' ? 13 : size === 'lg' ? 18 : 15} />}
    </button>
  )
}
