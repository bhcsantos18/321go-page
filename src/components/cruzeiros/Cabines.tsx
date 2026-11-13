import { AnimatePresence, motion } from 'framer-motion'
import { Ruler, Send } from 'lucide-react'
import { useState } from 'react'
import { cabines, type Cabine } from '../../data/cruzeiros'
import { useQuote } from '../../lib/quote'
import { cn } from '../../lib/utils'
import { Button } from '../ui'

const TRACO = '#9cf0fc'

const plantas: Record<string, { largura: number; janela: boolean; varanda: boolean; sala: boolean }> = {
  interna: { largura: 150, janela: false, varanda: false, sala: false },
  externa: { largura: 170, janela: true, varanda: false, sala: false },
  varanda: { largura: 190, janela: false, varanda: true, sala: false },
  suite: { largura: 280, janela: false, varanda: true, sala: true },
}

function Planta({ c }: { c: Cabine }) {
  const p = plantas[c.id]
  const x0 = (340 - p.largura) / 2
  const y0 = 24
  const fundo = 196
  return (
    <svg viewBox="0 0 340 300" className="mx-auto block h-auto w-full max-w-md" role="img" aria-label={`Planta da cabine ${c.nome}`}>
      <rect x={x0} y={y0} width={p.largura} height={fundo} fill={TRACO} fillOpacity="0.04" stroke={TRACO} strokeWidth="2" />
      <rect x={x0} y={y0} width="58" height="66" fill="none" stroke={TRACO} strokeOpacity="0.7" />
      <circle cx={x0 + 18} cy={y0 + 46} r="9" fill="none" stroke={TRACO} strokeOpacity="0.6" />
      <rect x={x0 + 34} y={y0 + 10} width="16" height="22" rx="4" fill="none" stroke={TRACO} strokeOpacity="0.6" />
      <path d={`M${x0 + 64} ${y0} A24 24 0 0 1 ${x0 + 88} ${y0 + 24} L${x0 + 64} ${y0 + 24}`} fill="none" stroke={TRACO} strokeOpacity="0.5" strokeDasharray="3 3" />
      <rect x={x0 + p.largura - 92} y={y0 + 74} width="82" height="96" rx="4" fill="none" stroke={TRACO} />
      <rect x={x0 + p.largura - 88} y={y0 + 78} width="34" height="16" rx="4" fill="none" stroke={TRACO} strokeOpacity="0.7" />
      <rect x={x0 + p.largura - 50} y={y0 + 78} width="34" height="16" rx="4" fill="none" stroke={TRACO} strokeOpacity="0.7" />
      <line x1={x0 + p.largura - 92} x2={x0 + p.largura - 10} y1={y0 + 110} y2={y0 + 110} stroke={TRACO} strokeOpacity="0.4" />
      <rect x={x0 + 8} y={y0 + 96} width="18" height="62" rx="4" fill="none" stroke={TRACO} strokeOpacity="0.8" />
      {p.sala && (
        <>
          <line x1={x0 + 120} x2={x0 + 120} y1={y0 + 70} y2={y0 + fundo} stroke={TRACO} strokeOpacity="0.5" strokeDasharray="4 4" />
          <rect x={x0 + 34} y={y0 + 110} width="60" height="24" rx="6" fill="none" stroke={TRACO} strokeOpacity="0.8" />
          <circle cx={x0 + 64} cy={y0 + 160} r="12" fill="none" stroke={TRACO} strokeOpacity="0.6" />
        </>
      )}
      {p.janela && <line x1={x0 + 24} x2={x0 + p.largura - 24} y1={y0 + fundo} y2={y0 + fundo} stroke="#22cfe9" strokeWidth="6" />}
      {p.varanda && (
        <>
          <line x1={x0 + 10} x2={x0 + p.largura - 10} y1={y0 + fundo} y2={y0 + fundo} stroke="#22cfe9" strokeWidth="4" />
          <rect x={x0} y={y0 + fundo} width={p.largura} height="56" fill="#ff7337" fillOpacity="0.08" stroke="#ff9e70" strokeDasharray="5 4" />
          <circle cx={x0 + 34} cy={y0 + fundo + 28} r="10" fill="none" stroke="#ff9e70" />
          <circle cx={x0 + 62} cy={y0 + fundo + 28} r="7" fill="none" stroke="#ff9e70" strokeOpacity="0.7" />
          <circle cx={x0 + 90} cy={y0 + fundo + 28} r="10" fill="none" stroke="#ff9e70" />
          <text x={x0 + p.largura - 8} y={y0 + fundo + 34} textAnchor="end" fontSize="10" letterSpacing="1.4" fill="#ff9e70">
            VARANDA
          </text>
        </>
      )}
      <text x="170" y="16" textAnchor="middle" fontSize="10" letterSpacing="1.6" fill={TRACO} fillOpacity="0.7">
        CORREDOR
      </text>
      {!p.varanda && (
        <text x="170" y={y0 + fundo + 26} textAnchor="middle" fontSize="10" letterSpacing="1.6" fill={TRACO} fillOpacity="0.7">
          {p.janela ? 'JANELA PARA O MAR' : 'SEM JANELA'}
        </text>
      )}
    </svg>
  )
}

export function Cabines() {
  const { openQuote } = useQuote()
  const [id, setId] = useState('varanda')
  const c = cabines.find((x) => x.id === id) ?? cabines[0]
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2" role="tablist" aria-label="Tipos de cabine">
          {cabines.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={x.id === id}
              onClick={() => setId(x.id)}
              className={cn('cursor-pointer rounded-2xl p-4 text-left transition', x.id === id ? 'bg-ink-900 text-white shadow-xl shadow-ink-900/15' : 'bg-white text-ink-800 ring-1 ring-ink-100 hover:ring-ink-200')}
            >
              <span className="block font-display text-lg font-semibold">{x.nome}</span>
              <span className={cn('mt-1 block text-xs tabular-nums', x.id === id ? 'text-aqua-200' : 'text-ink-400')}>{x.area}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-6">
            <p className="text-lg leading-relaxed text-ink-700">{c.texto}</p>
            <p className="mt-2 text-ink-500">{c.ideal}</p>
            <Button
              size="lg"
              className="mt-6"
              onClick={() => openQuote({ service: 'cruzeiro', source: `cruzeiros:cabine-${c.id}`, notes: `Cabine de interesse: ${c.nome}` })}
            >
              <Send className="size-5" /> Cotar cabine {c.nome.toLowerCase()}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-[#071a33] p-5 ring-1 ring-aqua-300/20 sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: 'linear-gradient(rgba(156,240,252,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(156,240,252,0.07) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-aqua-200 uppercase">
          <span>Planta · {c.nome}</span>
          <span className="flex items-center gap-1.5 text-white tabular-nums normal-case">
            <Ruler className="size-3.5 text-aqua-300" /> {c.area}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={c.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="relative mt-4">
            <Planta c={c} />
          </motion.div>
        </AnimatePresence>
        <p className="relative mt-2 text-xs text-ink-400">Ilustração. Medidas aproximadas, que variam de navio para navio.</p>
      </div>
    </div>
  )
}
