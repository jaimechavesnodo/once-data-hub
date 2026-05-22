import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import RepositoryPage from './pages/RepositoryPage'
import SuppliersPage from './pages/SuppliersPage'
import DashboardPage from './pages/DashboardPage'
import AiPage from './pages/AiPage'
import ConfigPage from './pages/ConfigPage'

function RequireAuth() {
  const { isAuthenticated, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/repository" element={<RepositoryPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ai" element={<AiPage />} />
              <Route path="/config" element={<ConfigPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
