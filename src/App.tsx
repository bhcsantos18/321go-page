import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer, WhatsAppFab } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { QuoteModal } from './components/quote/QuoteModal'
import { AuthProvider } from './lib/auth'
import { QuoteProvider } from './lib/quote'
import Home from './pages/Home'

const Destinos = lazy(() => import('./pages/Destinos'))
const Destino = lazy(() => import('./pages/Destino'))
const Orlando = lazy(() => import('./pages/Orlando'))
const Parque = lazy(() => import('./pages/Parque'))
const Local = lazy(() => import('./pages/Local'))
const Mapa = lazy(() => import('./pages/Mapa'))
const Calculadora = lazy(() => import('./pages/Calculadora'))
const AreaCliente = lazy(() => import('./pages/AreaCliente'))
const Painel = lazy(() => import('./pages/Painel'))
const Privacidade = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacidade })))
const Termos = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Termos })))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteProgress() {
  const { pathname } = useLocation()
  const [key, setKey] = useState(pathname)
  useEffect(() => setKey(pathname), [pathname])
  return (
    <motion.div
      key={key}
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gradient-to-r from-go-500 via-go-400 to-aqua-300"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: [1, 1, 0] }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

function PageFallback() {
  return <div className="min-h-[100svh] bg-ink-950" />
}

export default function App() {
  const location = useLocation()
  // O mapa em tela cheia funciona como app: sem rodapé e sem botão flutuante sobre os controles
  const isMapPage = location.pathname.startsWith('/orlando/mapas')

  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <QuoteProvider>
          <RouteProgress />
          <Header />
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Suspense fallback={<PageFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/destinos" element={<Destinos />} />
                  <Route path="/destinos/:slug" element={<Destino />} />
                  <Route path="/orlando" element={<Orlando />} />
                  <Route path="/orlando/parques/:park" element={<Parque />} />
                  <Route path="/orlando/parques/:park/local/:poi" element={<Local />} />
                  <Route path="/orlando/mapas" element={<Mapa />} />
                  <Route path="/orlando/mapas/:park" element={<Mapa />} />
                  <Route path="/orlando/calculadora" element={<Calculadora />} />
                  <Route path="/area-do-cliente" element={<AreaCliente />} />
                  <Route path="/painel" element={<Painel />} />
                  <Route path="/privacidade" element={<Privacidade />} />
                  <Route path="/termos" element={<Termos />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </motion.main>
          </AnimatePresence>
          {!isMapPage && <Footer />}
          {!isMapPage && <WhatsAppFab />}
          <QuoteModal />
        </QuoteProvider>
      </AuthProvider>
    </MotionConfig>
  )
}
