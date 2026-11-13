import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Moon, Ship, Sun, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { coordenada, roteiros } from '../../data/cruzeiros'
import { cn } from '../../lib/utils'
import { Button, Kicker } from '../ui'
import { CenaDoMar, sorteador, type Modo } from './CenaDoMar'
import { distanciaEmMilhas, rumoEntre, useMidia } from './navegacao'

function tocarApito() {
  const Contexto = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Contexto) return
  const ctx = new Contexto()
  const agora = ctx.currentTime
  const volume = ctx.createGain()
  volume.gain.setValueAtTime(0, agora)
  volume.gain.linearRampToValueAtTime(0.2, agora + 0.15)
  volume.gain.setValueAtTime(0.2, agora + 1.6)
  volume.gain.linearRampToValueAtTime(0, agora + 2.2)
  const filtro = ctx.createBiquadFilter()
  filtro.type = 'lowpass'
  filtro.frequency.value = 480
  filtro.connect(volume)
  volume.connect(ctx.destination)
  for (const frequencia of [69, 92, 138]) {
    const oscilador = ctx.createOscillator()
    oscilador.type = 'sawtooth'
    oscilador.frequency.value = frequencia
    oscilador.connect(filtro)
    oscilador.start(agora)
    oscilador.stop(agora + 2.3)
  }
  window.setTimeout(() => void ctx.close(), 2600)
}

function Estrelas({ visivel }: { visivel: boolean }) {
  const estrelas = useMemo(() => {
    const r = sorteador(1209)
    return Array.from({ length: 90 }, () => ({ x: r() * 1600, y: r() * 560, raio: 0.6 + r() * 1.4, atraso: -r() * 5, pisca: r() > 0.6 }))
  }, [])
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMin slice" className="absolute inset-0 -z-10 size-full transition-opacity duration-1000" style={{ opacity: visivel ? 1 : 0 }} aria-hidden>
      {estrelas.map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={e.raio} fill="#fff" className={e.pisca ? 'cz-pisca' : undefined} style={{ animationDelay: `${e.atraso}s` }} opacity={e.pisca ? undefined : 0.55} />
      ))}
    </svg>
  )
}

const portos = roteiros[0].paradas.filter((p) => p.tipo === 'porto')
const trechos = portos.slice(0, -1).map((de, i) => {
  const para = portos[i + 1]
  const a = { lat: de.lat!, lon: de.lon! }
  const b = { lat: para.lat!, lon: para.lon! }
  return { de, para, rumo: rumoEntre(a, b), milhas: distanciaEmMilhas(a, b) }
})

function Bussola({ rumo }: { rumo: number }) {
  return (
    <svg viewBox="0 0 120 120" className="size-28 shrink-0" aria-hidden>
      <circle cx="60" cy="60" r="56" fill="none" stroke="#9cf0fc" strokeOpacity="0.25" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#9cf0fc" strokeOpacity="0.15" strokeDasharray="2 4" />
      <motion.g animate={{ rotate: -rumo }} transition={{ type: 'spring', stiffness: 40, damping: 12 }} style={{ originX: '60px', originY: '60px' }}>
        {Array.from({ length: 36 }, (_, i) => (
          <line key={i} x1="60" y1="6" x2="60" y2={i % 9 === 0 ? 16 : 11} stroke="#9cf0fc" strokeOpacity={i % 9 === 0 ? 0.9 : 0.4} strokeWidth={i % 9 === 0 ? 2 : 1} transform={`rotate(${i * 10} 60 60)`} />
        ))}
        {['N', 'L', 'S', 'O'].map((l, i) => (
          <text key={l} x="60" y="29" textAnchor="middle" fontSize="10" fontWeight="700" fill={l === 'N' ? '#ff7337' : '#c9f7fe'} transform={`rotate(${i * 90} 60 60)`}>
            {l}
          </text>
        ))}
      </motion.g>
      <path d="M60 36 L66 64 L60 58 L54 64 Z" fill="#ff4d00" />
      <circle cx="60" cy="60" r="3" fill="#fff" />
    </svg>
  )
}

function PainelDeBordo() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % trechos.length), 3600)
    return () => window.clearInterval(id)
  }, [])
  const t = trechos[i]
  return (
    <div className="glass relative overflow-hidden rounded-[28px] p-5">
      <div className="cz-varredura pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(156,240,252,0.12) 12%, transparent 24%)' }} />
      <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] text-aqua-200 uppercase">
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-aqua-300" /> Painel de bordo
        </span>
        <span className="tabular-nums text-ink-300">
          Trecho {i + 1}/{trechos.length}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <Bussola rumo={t.rumo} />
        <AnimatePresence mode="wait">
          <motion.dl key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="grid min-w-0 flex-1 gap-2.5 text-sm">
            <div>
              <dt className="text-[10px] tracking-[0.16em] text-ink-400 uppercase">Próximo porto</dt>
              <dd className="truncate font-display text-xl font-semibold text-white">{t.para.nome}</dd>
              <dd className="text-xs text-aqua-200 tabular-nums">
                {coordenada(t.para.lat!, 'lat')} {coordenada(t.para.lon!, 'lon')}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-ink-400 uppercase">Rumo</dt>
                <dd className="font-semibold text-white tabular-nums">{String(Math.round(t.rumo)).padStart(3, '0')}°</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.16em] text-ink-400 uppercase">Distância</dt>
                <dd className="font-semibold text-white tabular-nums">{t.milhas.toLocaleString('pt-BR')} mn</dd>
              </div>
            </div>
          </motion.dl>
        </AnimatePresence>
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-ink-400">
        {roteiros[0].titulo}: saída de {t.de.nome}. Distâncias em milhas náuticas, em linha reta entre os portos.
      </p>
    </div>
  )
}

export function HeroCruzeiros({ onRoteiros, onMontar, onExplorar }: { onRoteiros: () => void; onMontar: () => void; onExplorar: () => void }) {
  const [modo, setModo] = useState<Modo>('noite')
  const [apitos, setApitos] = useState(0)
  const desktop = useMidia('(min-width: 768px)')

  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 -z-20" aria-hidden>
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: modo === 'noite' ? 1 : 0, background: 'linear-gradient(180deg, #060a14 0%, #0a1428 55%, #142c50 100%)' }} />
        <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: modo === 'dia' ? 1 : 0, background: 'linear-gradient(180deg, #2c495d 0%, #437fa6 50%, #a9cfe4 100%)' }} />
      </div>
      <Estrelas visivel={modo === 'noite'} />
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Kicker dark>Exclusivo · Cruzeiros</Kicker>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-3xl text-4xl leading-[1.04] font-semibold sm:text-6xl lg:text-7xl"
            >
              O mar inteiro em <span className="text-gradient">uma só viagem</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
              Escolha a rota na carta náutica, conheça o navio por dentro e monte o cruzeiro com a cabine certa. A consultora cuida de reserva, documentos e excursões.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={onMontar}>
                <Ship className="size-5" /> Montar meu cruzeiro
              </Button>
              <Button size="lg" variant="glass" onClick={onRoteiros}>
                Ver os roteiros <ArrowDown className="size-5" />
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex flex-wrap items-center gap-2">
              <div className="glass flex rounded-full p-1" role="group" aria-label="Horário da cena">
                {(
                  [
                    { id: 'noite', rotulo: 'Noite', Icone: Moon },
                    { id: 'dia', rotulo: 'Dia', Icone: Sun },
                  ] as const
                ).map(({ id, rotulo, Icone }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={modo === id}
                    onClick={() => setModo(id)}
                    className={cn('relative flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition', modo === id ? 'text-ink-900' : 'text-ink-200 hover:text-white')}
                  >
                    {modo === id && <motion.span layoutId="cz-modo" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                    <Icone className="relative size-4" />
                    <span className="relative">{rotulo}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setApitos((v) => v + 1)
                  tocarApito()
                }}
                className="glass flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-white transition hover:bg-white/15"
              >
                <Volume2 className="size-4" /> Tocar o apito
              </button>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="hidden lg:block">
            <PainelDeBordo />
          </motion.div>
        </div>
      </div>

      <div className="relative mt-6 sm:-mt-6 lg:-mt-44">
        <CenaDoMar modo={modo} apitos={apitos} desktop={desktop} onExplorar={onExplorar} />
      </div>
      <div className="px-4 pb-10 transition-colors duration-1000 sm:px-6 lg:hidden" style={{ backgroundColor: modo === 'noite' ? '#04070f' : '#1f3c56' }}>
        <PainelDeBordo />
      </div>
    </section>
  )
}
