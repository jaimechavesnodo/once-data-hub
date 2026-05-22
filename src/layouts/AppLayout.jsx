import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import UploadModal from '../components/upload/UploadModal'

export default function AppLayout() {
  const [uploadOpen, setUploadOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onUploadClick={() => setUploadOpen(true)} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <Outlet />
          <div className="px-6 py-3 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-300">Powered by NODO · Prototipo v1.0 · 2026</p>
          </div>
        </main>
      </div>
      <UploadModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  )
}
