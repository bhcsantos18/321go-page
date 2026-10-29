import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, Download, Eye, EyeOff, FileText, LoaderCircle, Lock, LogOut, Mail, Plane, Plus, ShieldCheck, Ticket, Users } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Aurora } from '../components/Hero'
import { AnchorButton, Button, Label, WhatsAppIcon } from '../components/ui'
import { company, whatsappLink } from '../data/company'
import { useAuth, type ClientDocument, type ClientTrip } from '../lib/auth'
import { useQuote } from '../lib/quote'
import { cn, daysBetween, formatDate, todayISO } from '../lib/utils'

export default function AreaCliente() {
  const { user } = useAuth()
  return (
    <AnimatePresence mode="wait">
      {user ? (
        <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Dashboard />
        </motion.div>
      ) : (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Login />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Login() {
  const { login, demo } = useAuth()
  const { openQuote } = useQuote()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [forgot, setForgot] = useState(false)
  const shake = useAnimationControls()

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError((err as Error).message)
      shake.start({ x: [0, -10, 10, -8, 8, -4, 0], transition: { duration: 0.5 } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950 pt-28 pb-16 lg:pt-32">
      <Aurora className="-z-10" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative hidden h-[560px] overflow-hidden rounded-[32px] lg:block">
          <img src="/img/photos/planejamento.webp" alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <h2 className="font-display text-4xl leading-tight font-semibold">Sua viagem, organizada em um só lugar.</h2>
            <ul className="mt-6 space-y-3 text-ink-200">
              {['Acompanhe cada etapa da sua viagem', 'Baixe vouchers, bilhetes e apólices', 'Fale com a agência em um toque'].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-go-500">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div animate={shake} className="w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mx-auto w-full max-w-md rounded-[32px] bg-white p-7 shadow-2xl sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-700">
              <Lock className="size-3.5" /> Acesso exclusivo para clientes
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold text-ink-900">Área do Cliente</h1>
            <p className="mt-2 text-ink-500">Entre com o e-mail e a senha enviados pelo seu consultor.</p>

            <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
              <div>
                <Label htmlFor="login-email">E-mail</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
                  <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className="field pl-10" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-pass">Senha</Label>
                  <button type="button" onClick={() => setForgot((v) => !v)} className="mb-1.5 cursor-pointer text-xs font-semibold text-go-600 hover:underline">
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
                  <input
                    id="login-pass"
                    type={show ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="field pr-12 pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                    aria-pressed={show}
                    className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-ink-400 transition hover:bg-ink-100 hover:text-ink-800"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span key={show ? 'off' : 'on'} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }}>
                        {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {forgot && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="rounded-2xl bg-ocean-50 p-3 text-sm text-ocean-800">
                    Para redefinir a senha, fale com seu consultor pelo{' '}
                    <a href={whatsappLink('Olá! Preciso redefinir minha senha da Área do Cliente.')} target="_blank" rel="noreferrer" className="font-semibold underline">
                      WhatsApp
                    </a>
                    .
                  </motion.p>
                )}
                {error && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role="alert" className="rounded-2xl bg-go-50 p-3 text-sm text-go-700">
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? <LoaderCircle className="size-5 animate-spin" /> : <>Entrar <ArrowRight className="size-5" /></>}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-dashed border-ink-200 p-4 text-sm text-ink-500">
              <p className="font-semibold text-ink-700">Ambiente de demonstração</p>
              <p className="mt-1">
                {demo.email} · senha <code className="rounded bg-ink-100 px-1.5 font-mono">{demo.password}</code>
              </p>
              <button
                type="button"
                onClick={() => {
                  setEmail(demo.email)
                  setPassword(demo.password)
                }}
                className="mt-2 cursor-pointer font-semibold text-go-600 hover:underline"
              >
                Preencher automaticamente
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-ink-500">
              Ainda não é cliente?{' '}
              <button type="button" onClick={() => openQuote({ source: 'area-cliente' })} className="cursor-pointer font-semibold text-go-600 hover:underline">
                Solicite um orçamento
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const stages = ['Solicitado', 'Proposta', 'Confirmado', 'Documentos', 'Boa viagem!']
const docIcons: Record<ClientDocument['type'], typeof FileText> = { voucher: Ticket, bilhete: Plane, seguro: ShieldCheck, roteiro: CalendarDays, contrato: FileText }

function downloadDemo(doc: ClientDocument, trip: ClientTrip) {
  const content = `${company.name}\n\n${doc.name}\nViagem: ${trip.title} — ${trip.destination}\nPeríodo: ${formatDate(trip.start)} a ${formatDate(trip.end)}\n\nDocumento de demonstração.`
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${doc.name.replace(/[^\w]+/g, '-').toLowerCase()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

function Dashboard() {
  const { user, logout } = useAuth()
  const { openQuote } = useQuote()
  const [tripId, setTripId] = useState(user!.trips[0].id)
  const trip = user!.trips.find((t) => t.id === tripId)!
  const next = [...user!.trips].sort((a, b) => a.start.localeCompare(b.start))[0]
  const daysLeft = daysBetween(todayISO(), next.start)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-14 text-white sm:pt-36">
        <Aurora className="-z-10" />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <p className="text-sm text-ink-300">Área do Cliente</p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-4xl font-semibold sm:text-5xl">
              Olá, {user!.name.split(' ')[0]}!
            </motion.h1>
            <p className="mt-3 text-ink-300">
              Faltam <strong className="text-white">{daysLeft} dias</strong> para {next.title.toLowerCase()}.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="glass rounded-3xl px-6 py-4 text-center">
              <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="font-display text-4xl font-bold text-go-400">
                {daysLeft}
              </motion.p>
              <p className="text-xs text-ink-300">dias para embarcar</p>
            </div>
            <Button variant="glass" onClick={logout} className="h-auto self-stretch rounded-3xl px-5">
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Minhas viagens</h2>
              <Button size="sm" variant="outline" onClick={() => openQuote({ source: 'area-cliente' })}>
                <Plus className="size-4" /> Nova viagem
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {user!.trips.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTripId(t.id)}
                  className={cn('group relative cursor-pointer overflow-hidden rounded-3xl text-left ring-2 transition', t.id === tripId ? 'ring-go-500' : 'ring-transparent hover:ring-ink-200')}
                >
                  <img src={t.image} alt="" className="h-36 w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="bg-white p-5">
                    <p className="text-xs font-semibold text-go-500">{t.destination}</p>
                    <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                      <CalendarDays className="size-4" /> {formatDate(t.start)} – {formatDate(t.end)}
                    </p>
                  </div>
                  {t.id === tripId && <motion.span layoutId="trip-sel" className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-go-500 text-white"><Check className="size-4" strokeWidth={3} /></motion.span>}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={trip.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} className="space-y-6">
                <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-100 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold">Acompanhamento</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                        <Users className="size-4" /> {trip.travelers}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {trip.services.map((s) => (
                        <span key={s} className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ol className="relative mt-8 grid grid-cols-5 gap-1">
                    <div className="absolute top-4 right-[10%] left-[10%] h-0.5 bg-ink-100">
                      <motion.div className="h-full bg-gradient-to-r from-go-500 to-go-400" initial={{ width: 0 }} animate={{ width: `${(trip.stage / (stages.length - 1)) * 100}%` }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
                    </div>
                    {stages.map((s, i) => (
                      <li key={s} className="relative flex flex-col items-center text-center">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.1, type: 'spring' }}
                          className={cn('grid size-8 place-items-center rounded-full text-xs font-bold', i < trip.stage ? 'bg-go-500 text-white' : i === trip.stage ? 'bg-ink-900 text-white ring-4 ring-go-500/25' : 'bg-ink-100 text-ink-400')}
                        >
                          {i < trip.stage ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                        </motion.span>
                        <span className={cn('mt-2 text-[11px] leading-tight font-medium sm:text-xs', i <= trip.stage ? 'text-ink-800' : 'text-ink-400')}>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-100 sm:p-8">
                  <h3 className="font-display text-xl font-semibold">Documentos disponibilizados</h3>
                  <ul className="mt-5 divide-y divide-ink-100">
                    {trip.documents.map((d, i) => {
                      const Icon = docIcons[d.type]
                      return (
                        <motion.li key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 py-3.5">
                          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-go-50 text-go-500">
                            <Icon className="size-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{d.name}</p>
                            <p className="text-xs text-ink-400">
                              {formatDate(d.date)} · {d.size}
                            </p>
                          </div>
                          <button type="button" onClick={() => downloadDemo(d, trip)} aria-label={`Baixar ${d.name}`} className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-ink-200 text-ink-600 transition hover:border-go-500 hover:bg-go-500 hover:text-white">
                            <Download className="size-4" />
                          </button>
                        </motion.li>
                      )
                    })}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-6 text-white">
              <div className="absolute -top-16 -right-16 size-48 rounded-full bg-go-500/40 blur-3xl" />
              <img src="/img/brand/logo-sm.png" alt="" className="relative size-14" />
              <h3 className="relative mt-4 font-display text-xl font-semibold">Precisa de ajuda?</h3>
              <p className="relative mt-1 text-sm text-ink-300">{user!.consultant} está à disposição antes, durante e depois da viagem.</p>
              <AnchorButton href={whatsappLink(`Olá! Sou ${user!.name}, cliente da 3,2,1 GO, e tenho uma dúvida sobre a viagem "${trip.title}".`)} className="relative mt-5 w-full bg-[#25d366] shadow-none hover:bg-[#1fb957]">
                <WhatsAppIcon className="size-5" /> Falar com a agência
              </AnchorButton>
              <a href={`mailto:${company.email}`} className="relative mt-3 flex items-center justify-center gap-2 text-sm text-ink-300 hover:text-white">
                <Mail className="size-4" /> {company.email}
              </a>
            </div>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-100">
              <p className="text-sm text-ink-500">Conectado como</p>
              <p className="font-semibold">{user!.email}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
