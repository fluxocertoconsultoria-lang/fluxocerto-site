import { Routes, Route, Navigate } from 'react-router-dom'
import { ContentProvider } from './lib/ContentContext.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import Mentoria from './pages/Mentoria.jsx'
import NotFound from './pages/NotFound.jsx'
import Privacidade from './pages/Privacidade.jsx'
import AdminApp from './admin/AdminApp.jsx'

/** Árvore de rotas compartilhada pelo navegador (main.jsx) e pela pré-renderização (entry-server.jsx). */
export default function App({ conteudoInicial = null }) {
  return (
    <ContentProvider inicial={conteudoInicial}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Navigate to="/" replace />} />
          <Route path="/mentoria" element={<Mentoria />} />
          <Route path="/politica-de-privacidade" element={<Privacidade />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </ContentProvider>
  )
}
