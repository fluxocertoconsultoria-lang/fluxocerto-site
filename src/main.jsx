import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { ContentProvider } from './lib/ContentContext.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import Mentoria from './pages/Mentoria.jsx'
import NotFound from './pages/NotFound.jsx'
import AdminApp from './admin/AdminApp.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Navigate to="/" replace />} />
            <Route path="/mentoria" element={<Mentoria />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
