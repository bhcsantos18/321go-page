import { motion } from 'framer-motion'
import { Send, Ship } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { cabines, faixasDeNoites } from '../../data/cruzeiros'
import { cruiseRegions } from '../../data/services'
import { useEmpresa } from '../../lib/empresa'
import { useQuote } from '../../lib/quote'
import { cn } from '../../lib/utils'
import { Button, Stepper } from '../ui'

function proximosMeses() {
  const hoje = new Date()
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() + 1 + i, 1)
    const valor = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const mes = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    return { valor, rotulo: `${mes}/${String(d.getFullYear()).slice(2)}` }
  })
}

function Chips<T extends string>({ opcoes, valor, onChange, rotulo }: { opcoes: { valor: T; rotulo: string }[]; valor: T; onChange: (v: T) => void; rotulo: string }) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold tracking-[0.12em] text-ink-500 uppercase">{rotulo}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <button
            key={o.valor}
            type="button"
            aria-pressed={o.valor === valor}
            onClick={() => onChange(o.valor)}
            className={cn('h-9 cursor-pointer rounded-full px-3.5 text-sm font-medium transition', o.valor === valor ? 'bg-go-500 text-white shadow-[0_8px_20px_-8px_var(--color-go-500)]' : 'bg-ink-50 text-ink-700 ring-1 ring-ink-200 hover:ring-ink-300')}
          >
            {o.rotulo}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function codigoDeBarras(texto: string) {
  let h = 2166136261
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return Array.from({ length: 42 }, (_, i) => {
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995)
    return { x: i * 4, w: 1 + (Math.abs(h) % 3) }
  })
}

function Campo({ rotulo, children, className }: { rotulo: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[10px] font-semibold tracking-[0.16em] text-ink-400 uppercase">{rotulo}</div>
      <div className="mt-0.5 truncate font-display text-lg font-semibold text-white">{children}</div>
    </div>
  )
}

export function MonteSeuCruzeiro() {
  const { openQuote } = useQuote()
  const empresa = useEmpresa()
  const meses = useMemo(proximosMeses, [])
  const regioes = cruiseRegions.filter((r) => !r.startsWith('Outro'))
  const [regiao, setRegiao] = useState(regioes[0])
  const [mes, setMes] = useState(meses[2].valor)
  const [noites, setNoites] = useState(faixasDeNoites[1])
  const [cabine, setCabine] = useState('varanda')
  const [adultos, setAdultos] = useState(2)
  const [criancas, setCriancas] = useState(0)

  const nomeDaCabine = cabines.find((c) => c.id === cabine)?.nome ?? ''
  const rotuloDoMes = meses.find((m) => m.valor === mes)?.rotulo ?? mes
  const hospedes = `${adultos} ${adultos === 1 ? 'adulto' : 'adultos'}${criancas ? ` + ${criancas} ${criancas === 1 ? 'criança' : 'crianças'}` : ''}`
  const barras = codigoDeBarras(`${regiao}${mes}${noites}${cabine}${adultos}${criancas}`)

  function enviar() {
    openQuote({
      service: 'cruzeiro',
      item: { adults: adultos, children: criancas, details: { region: regiao, month: mes } },
      source: 'cruzeiros:planejador',
      notes: `Cabine: ${nomeDaCabine} · Duração: ${noites}`,
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-6 rounded-[28px] bg-white p-6 text-ink-900 sm:p-8">
        <Chips rotulo="Região" valor={regiao} onChange={setRegiao} opcoes={regioes.map((r) => ({ valor: r, rotulo: r }))} />
        <Chips rotulo="Mês de embarque" valor={mes} onChange={setMes} opcoes={meses.map((m) => ({ valor: m.valor, rotulo: m.rotulo }))} />
        <Chips rotulo="Duração" valor={noites} onChange={setNoites} opcoes={faixasDeNoites.map((n) => ({ valor: n, rotulo: n }))} />
        <Chips rotulo="Cabine" valor={cabine} onChange={setCabine} opcoes={cabines.map((c) => ({ valor: c.id, rotulo: c.nome }))} />
        <div className="grid gap-x-8 border-t border-ink-100 pt-2 sm:grid-cols-2">
          <Stepper label="Adultos" value={adultos} onChange={setAdultos} min={1} max={9} />
          <Stepper label="Crianças" hint="2 a 11 anos" value={criancas} onChange={setCriancas} min={0} max={6} />
        </div>
      </div>

      <motion.div layout className="relative">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink-800 via-ink-900 to-[#071a33] text-white shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative flex items-center justify-between bg-go-500 px-6 py-3">
            <span className="flex items-center gap-2 font-display text-sm font-semibold tracking-[0.18em] uppercase">
              <Ship className="size-4" /> Cartão de embarque
            </span>
            <span className="text-xs font-semibold opacity-80">3,2,1 GO!</span>
          </div>
          <div className="relative grid grid-cols-2 gap-x-4 gap-y-4 px-6 pt-6 pb-5">
            <Campo rotulo="Região" className="col-span-2">
              {regiao}
            </Campo>
            <Campo rotulo="Embarque">{rotuloDoMes}</Campo>
            <Campo rotulo="Duração">{noites}</Campo>
            <Campo rotulo="Cabine">{nomeDaCabine}</Campo>
            <Campo rotulo="Hóspedes">{hospedes}</Campo>
          </div>
          <div className="relative flex items-center">
            <span className="-ml-3 size-6 rounded-full bg-ink-950" />
            <span className="flex-1 border-t-2 border-dashed border-white/20" />
            <span className="-mr-3 size-6 rounded-full bg-ink-950" />
          </div>
          <div className="relative flex items-end justify-between gap-4 px-6 pt-4 pb-6">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold tracking-[0.16em] text-ink-400 uppercase">Consultoria</div>
              <div className="truncate text-sm font-semibold">{empresa.unidade ? empresa.name : '3,2,1 GO! Viagens'}</div>
            </div>
            <svg viewBox="0 0 168 44" className="h-11 w-40 shrink-0" aria-hidden>
              {barras.map((b) => (
                <rect key={b.x} x={b.x} y="0" width={b.w} height="44" fill="#fff" opacity="0.85" />
              ))}
            </svg>
          </div>
        </div>
        <Button size="lg" className="mt-5 w-full" onClick={enviar}>
          <Send className="size-5" /> Enviar para a consultora
        </Button>
        <p className="mt-3 text-center text-sm text-ink-400">Você confere tudo e deixa seu contato no próximo passo.</p>
      </motion.div>
    </div>
  )
}
