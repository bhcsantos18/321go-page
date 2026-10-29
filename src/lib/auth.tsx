import { createContext, useContext, useState, type ReactNode } from 'react'

export interface ClientDocument {
  id: string
  name: string
  type: 'voucher' | 'bilhete' | 'seguro' | 'roteiro' | 'contrato'
  size: string
  date: string
}

export interface ClientTrip {
  id: string
  title: string
  destination: string
  image: string
  start: string
  end: string
  travelers: string
  /** 0 Solicitado · 1 Proposta · 2 Confirmado · 3 Documentos emitidos · 4 Boa viagem */
  stage: number
  services: string[]
  documents: ClientDocument[]
}

export interface ClientUser {
  name: string
  email: string
  consultant: string
  trips: ClientTrip[]
}

// Cliente de demonstração. Em produção, substitua `login` por uma chamada à API
// de autenticação (ex.: POST /api/auth/login) e carregue viagens/documentos do backend.
const DEMO_EMAIL = 'cliente@321go.com.br'
const DEMO_PASSWORD = '321go'

function addDays(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

const demoUser: ClientUser = {
  name: 'Ana Souza',
  email: DEMO_EMAIL,
  consultant: 'Equipe 3,2,1 GO',
  trips: [
    {
      id: 'orl-2026',
      title: 'Orlando em família',
      destination: 'Orlando, EUA',
      image: '/img/photos/disney.webp',
      start: addDays(48),
      end: addDays(58),
      travelers: '2 adultos, 2 crianças',
      stage: 3,
      services: ['Aéreo', 'Hotel', 'Ingressos Disney', 'Carro', 'Seguro'],
      documents: [
        { id: 'd1', name: 'Bilhete aéreo — GRU ⇄ MCO', type: 'bilhete', size: '182 KB', date: addDays(-12) },
        { id: 'd2', name: 'Voucher do hotel', type: 'voucher', size: '96 KB', date: addDays(-10) },
        { id: 'd3', name: 'Ingressos Disney 4 parques', type: 'voucher', size: '240 KB', date: addDays(-9) },
        { id: 'd4', name: 'Apólice do seguro viagem', type: 'seguro', size: '310 KB', date: addDays(-8) },
        { id: 'd5', name: 'Roteiro dia a dia', type: 'roteiro', size: '1,2 MB', date: addDays(-2) },
      ],
    },
    {
      id: 'mcz-2027',
      title: 'Férias em Maragogi',
      destination: 'Maceió + Maragogi, AL',
      image: '/img/photos/nordeste.webp',
      start: addDays(160),
      end: addDays(167),
      travelers: '2 adultos',
      stage: 1,
      services: ['Aéreo', 'Resort pé na areia', 'Passeios'],
      documents: [{ id: 'd6', name: 'Proposta comercial', type: 'contrato', size: '420 KB', date: addDays(-1) }],
    },
  ],
}

interface AuthValue {
  user: ClientUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  demo: { email: string; password: string }
}

const AuthContext = createContext<AuthValue | null>(null)
const SESSION_KEY = 'go321:sessao'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) ? demoUser : null
    } catch {
      return null
    }
  })

  async function login(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 700))
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      throw new Error('E-mail ou senha incorretos.')
    }
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* sessão só em memória */
    }
    setUser(demoUser)
  }

  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* noop */
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, demo: { email: DEMO_EMAIL, password: DEMO_PASSWORD } }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
