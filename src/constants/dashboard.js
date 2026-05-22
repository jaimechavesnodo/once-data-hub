export const KPI_DATA = [
  { id: 'k1', label: 'Proyectos Activos', value: 4, icon: 'Building2', trend: '+1 este mes', trendUp: true, color: 'green' },
  { id: 'k2', label: 'Documentos Totales', value: 325, icon: 'FileText', trend: '+28 esta semana', trendUp: true, color: 'blue' },
  { id: 'k3', label: 'Proveedores Activos', value: 8, icon: 'Users', trend: 'sin cambios', trendUp: null, color: 'purple' },
  { id: 'k4', label: 'Alertas Pendientes', value: 3, icon: 'AlertTriangle', trend: '+2 nuevas', trendUp: false, color: 'amber' },
  { id: 'k5', label: 'Docs Organizados IA', value: 289, icon: 'Sparkles', trend: '89% del total', trendUp: true, color: 'green' },
  { id: 'k6', label: 'Ahorro estimado', value: '46h', icon: 'Clock', trend: 'este mes', trendUp: true, color: 'green' },
]

export const DOCS_BY_PROJECT = [
  { name: 'Miralindo', docs: 47, color: '#16a34a' },
  { name: 'CasaLoma', docs: 38, color: '#16a34a' },
  { name: 'R. Bosque', docs: 91, color: '#16a34a' },
  { name: 'T. Alameda', docs: 22, color: '#16a34a' },
  { name: 'P. Río', docs: 53, color: '#16a34a' },
  { name: 'H. San Marcos', docs: 74, color: '#16a34a' },
]

export const DOCS_BY_TYPE = [
  { name: 'PDF', value: 142, color: '#ef4444' },
  { name: 'Excel', value: 87, color: '#16a34a' },
  { name: 'DWG', value: 54, color: '#3b82f6' },
  { name: 'Word', value: 31, color: '#6366f1' },
  { name: 'Otros', value: 11, color: '#9ca3af' },
]

export const ACTIVITY_TIMELINE = [
  { month: 'Dic', docs: 18 },
  { month: 'Ene', docs: 34 },
  { month: 'Feb', docs: 41 },
  { month: 'Mar', docs: 57 },
  { month: 'Abr', docs: 48 },
  { month: 'May', docs: 62 },
]

export const SUPPLIER_RATINGS = [
  { name: 'C. Andinos', rating: 4.8 },
  { name: 'Aceros C.', rating: 4.5 },
  { name: 'Concreto T.', rating: 4.2 },
  { name: 'Maquinaria C.', rating: 4.3 },
  { name: 'HidroSol.', rating: 4.1 },
  { name: 'Eléctr. Nova', rating: 3.9 },
  { name: 'Transporte A.', rating: 3.6 },
  { name: 'Carpintería N.', rating: 3.3 },
  { name: 'Seguridad I.', rating: 2.8 },
  { name: 'Acabados P.', rating: 2.1 },
]

export const BUDGET_VS_SPENT = [
  { name: 'Miralindo', presupuesto: 4200, ejecutado: 2856 },
  { name: 'CasaLoma', presupuesto: 6800, ejecutado: 3060 },
  { name: 'R. Bosque', presupuesto: 9500, ejecutado: 7790 },
  { name: 'T. Alameda', presupuesto: 12000, ejecutado: 1800 },
  { name: 'P. Río', presupuesto: 5100, ejecutado: 2907 },
  { name: 'H. San Marcos', presupuesto: 3800, ejecutado: 3458 },
]

export const PROGRESS_BY_PROJECT = [
  { name: 'Miralindo', avance: 68 },
  { name: 'CasaLoma', avance: 45 },
  { name: 'R. Bosque', avance: 82 },
  { name: 'T. Alameda', avance: 15 },
  { name: 'P. Río', avance: 57 },
  { name: 'H. San Marcos', avance: 91 },
]

export const RISK_DISTRIBUTION = [
  { name: 'Bajo', value: 5, color: '#16a34a' },
  { name: 'Medio', value: 3, color: '#d97706' },
  { name: 'Alto', value: 2, color: '#dc2626' },
]
