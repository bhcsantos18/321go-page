import { AnimatePresence, motion } from 'framer-motion'
import { BedDouble, Compass, Drama, LifeBuoy, Smile, Sparkles, UtensilsCrossed, Waves, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { areasDoNavio } from '../../data/cruzeiros'
import { cn } from '../../lib/utils'
import { BOTES, CASCO, CHAMINE, DECKS, LINHA_DAGUA, MASTRO, TOBOAGUA, ZONAS, poligonoDoDeck } from './geometria'

const icones: Record<string, LucideIcon> = {
  ponte: Compass,
  piscinas: Waves,
  spa: Sparkles,
  teatro: Drama,
  restaurantes: UtensilsCrossed,
  cabines: BedDouble,
  kids: Smile,
  botes: LifeBuoy,
}

const TRACO = '#9cf0fc'

export function RaioXDoNavio() {
  const [ativa, setAtiva] = useState(areasDoNavio[0].id)
  const [tour, setTour] = useState(true)

  useEffect(() => {
    if (!tour) return
    const id = window.setInterval(() => {
      setAtiva((atual) => {
        const i = areasDoNavio.findIndex((a) => a.id === atual)
        return areasDoNavio[(i + 1) % areasDoNavio.length].id
      })
    }, 3800)
    return () => window.clearInterval(id)
  }, [tour])

  function escolher(id: string) {
    setTour(false)
    setAtiva(id)
  }

  const area = areasDoNavio.find((a) => a.id === ativa) ?? areasDoNavio[0]
  const zona = ZONAS[area.id]
  const Icone = icones[area.id]

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-center">
      <div className="relative overflow-hidden rounded-[28px] bg-[#071a33] ring-1 ring-aqua-300/20">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(rgba(156,240,252,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(156,240,252,0.07) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-aqua-200 uppercase">
          <span>Corte lateral · navio oceânico</span>
          <span className="text-ink-400">{tour ? 'Tour automático' : 'Toque em uma área'}</span>
        </div>
        <div className="no-scrollbar relative overflow-x-auto">
          <svg viewBox="30 0 960 262" className="block h-auto w-full min-w-[640px]" role="img" aria-label="Planta lateral do navio com as áreas de bordo">
            <defs>
              <linearGradient id="cz-raio" x1="0" x2="1">
                <stop offset="0" stopColor={TRACO} stopOpacity="0" />
                <stop offset="1" stopColor={TRACO} stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <line x1="30" x2="990" y1={LINHA_DAGUA} y2={LINHA_DAGUA} stroke={TRACO} strokeOpacity="0.5" strokeDasharray="6 5" />
            <text x="984" y={LINHA_DAGUA - 6} textAnchor="end" fontSize="9" letterSpacing="1.2" fill={TRACO} fillOpacity="0.7">
              LINHA D’ÁGUA
            </text>

            <polygon points={CHAMINE} fill="none" stroke={TRACO} strokeWidth="1.2" />
            <path d={TOBOAGUA} fill="none" stroke={TRACO} strokeWidth="1.2" />
            <polygon points={MASTRO} fill="none" stroke={TRACO} strokeWidth="1.2" />
            <line x1="672" y1="34" x2="708" y2="34" stroke={TRACO} strokeWidth="1.2" />
            <circle cx="672" cy="29" r="5.5" fill="none" stroke={TRACO} strokeWidth="1.2" />
            <circle cx="708" cy="29" r="5.5" fill="none" stroke={TRACO} strokeWidth="1.2" />
            <line x1="674" y1="18.5" x2="706" y2="18.5" stroke={TRACO} strokeWidth="1.2" />

            {DECKS.map((d, i) => (
              <polygon key={i} points={poligonoDoDeck(d)} fill={TRACO} fillOpacity="0.03" stroke={TRACO} strokeWidth="1" strokeOpacity="0.8" />
            ))}
            {BOTES.map((x) => (
              <rect key={x} x={x} y="122" width="36" height="12" rx="6" fill="none" stroke="#ff9e70" strokeWidth="1" strokeOpacity="0.8" />
            ))}
            <path d={CASCO} fill={TRACO} fillOpacity="0.04" stroke={TRACO} strokeWidth="1.6" />
            {[176, 200].map((y) => (
              <line key={y} x1="92" x2="924" y1={y} y2={y} stroke={TRACO} strokeOpacity="0.35" strokeDasharray="3 4" />
            ))}
            <text x="500" y="192" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill={TRACO} fillOpacity="0.5">
              CABINES INTERNAS · TRIPULAÇÃO
            </text>
            <text x="500" y="219" textAnchor="middle" fontSize="9" letterSpacing="1.6" fill={TRACO} fillOpacity="0.5">
              CASA DE MÁQUINAS
            </text>

            {areasDoNavio.map((a) => {
              const z = ZONAS[a.id]
              const ligada = a.id === ativa
              return (
                <g key={a.id} className="cursor-pointer" onClick={() => escolher(a.id)} onMouseEnter={() => escolher(a.id)}>
                  <rect
                    x={z.x}
                    y={z.y}
                    width={z.w}
                    height={z.h}
                    rx="3"
                    fill={ligada ? '#ff7337' : TRACO}
                    fillOpacity={ligada ? 0.28 : 0.06}
                    stroke={ligada ? '#ff9e70' : TRACO}
                    strokeOpacity={ligada ? 1 : 0.35}
                    strokeDasharray={ligada ? undefined : '3 3'}
                    style={{ transition: 'fill-opacity .35s, stroke-opacity .35s' }}
                  />
                </g>
              )
            })}

            <AnimatePresence mode="wait">
              <motion.g key={area.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ pointerEvents: 'none' }}>
                {[
                  [zona.x - 4, zona.y - 4, 1, 1],
                  [zona.x + zona.w + 4, zona.y - 4, -1, 1],
                  [zona.x - 4, zona.y + zona.h + 4, 1, -1],
                  [zona.x + zona.w + 4, zona.y + zona.h + 4, -1, -1],
                ].map(([x, y, sx, sy], i) => (
                  <path key={i} d={`M${x} ${y + 9 * sy} L${x} ${y} L${x + 9 * sx} ${y}`} fill="none" stroke="#ff9e70" strokeWidth="1.8" />
                ))}
                <line x1={zona.x + zona.w / 2} y1={zona.y - 4} x2={zona.x + zona.w / 2} y2="6" stroke="#ff9e70" strokeOpacity="0.6" strokeDasharray="2 3" />
              </motion.g>
            </AnimatePresence>

            <rect x="30" y="0" width="120" height="262" fill="url(#cz-raio)" className="cz-varredura" style={{ transformBox: 'view-box', pointerEvents: 'none' }} />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          <motion.div key={area.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="rounded-[28px] bg-white p-6 ring-1 ring-ink-100">
            <span className="grid size-12 place-items-center rounded-2xl bg-go-50 text-go-600 ring-1 ring-go-100">
              <Icone className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900">{area.nome}</h3>
            <p className="mt-2 leading-relaxed text-ink-600">{area.texto}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Áreas do navio">
          {areasDoNavio.map((a) => {
            const I = icones[a.id]
            const ligada = a.id === ativa
            return (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={ligada}
                onClick={() => escolher(a.id)}
                className={cn('flex h-10 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm font-medium transition', ligada ? 'bg-ink-900 text-white' : 'bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300')}
              >
                <I className={cn('size-4', ligada ? 'text-go-400' : 'text-ink-400')} /> {a.nome}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
