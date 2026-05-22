# Once Data Hub

**Memoria operativa de proyectos y proveedores**

Prototipo funcional desarrollado para demo comercial con Once Constructora.

---

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abre en: http://localhost:5173

**Credenciales de acceso:**
- Usuario: `admin@onceconstructora.com`
- Contraseña: `demo123`

---

## Stack tecnológico

- React 18 + Vite
- Tailwind CSS v3
- Recharts (gráficas)
- Lucide React (íconos)
- React Router v6
- Sin backend real — datos mock locales

---

## Estructura del proyecto

```
src/
├── App.jsx                    # Router principal + AuthGuard
├── context/AuthContext.jsx    # Autenticación simulada
├── layouts/AppLayout.jsx      # Shell: Sidebar + Header
├── constants/                 # Todos los datos mock
│   ├── projects.js            # 6 proyectos
│   ├── suppliers.js           # 10 proveedores
│   ├── documents.js           # ~27 archivos + carpetas
│   ├── dashboard.js           # Datos de gráficas
│   └── aiLog.js               # Log de IA
├── components/
│   ├── layout/                # Sidebar, Header
│   ├── ui/                    # Badge, Button, Card, KpiCard, Modal, ProgressBar
│   ├── projects/              # ProjectCard
│   ├── repository/            # FileExplorer
│   ├── suppliers/             # SupplierTable, SupplierCard
│   ├── dashboard/             # DashboardChart
│   ├── ai/                    # AiLogPanel
│   └── upload/                # UploadModal
└── pages/
    ├── LoginPage.jsx
    ├── HomePage.jsx
    ├── ProjectsPage.jsx
    ├── RepositoryPage.jsx
    ├── SuppliersPage.jsx
    ├── DashboardPage.jsx
    ├── AiPage.jsx
    └── ConfigPage.jsx
```

---

## Secciones del prototipo

| Sección | Ruta | Descripción |
|---------|------|-------------|
| Login | `/login` | Pantalla de acceso corporativa |
| Inicio | `/home` | Dashboard general con alertas y actividad |
| Proyectos | `/projects` | 6 proyectos con avance, estado y documentos |
| Repositorio | `/repository` | Explorer 3 paneles: proyectos → carpetas → archivos |
| Proveedores | `/suppliers` | Tabla con calificaciones, semáforo de riesgo |
| Dashboard | `/dashboard` | 6 gráficas + 6 KPIs operativos |
| IA / Organización | `/ai` | Log automático + simulación de clasificación |
| Configuración | `/config` | Perfil, integraciones Drive + SINCO ERP |

---

## Logo

Coloca el logo de Once Constructora en:
```
public/once-logo.png
```

La app muestra texto de respaldo ("O") si el archivo no existe.

---

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```
