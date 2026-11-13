import { motion, useReducedMotion } from 'framer-motion'
import { Anchor, CalendarDays, IdCard, Mountain, Pause, Play, Send, Waves } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { coordenada, noitesDoRoteiro, portosDoRoteiro, roteiros, type Parada, type Roteiro } from '../../data/cruzeiros'
import { useQuote } from '../../lib/quote'
import { cn } from '../../lib/utils'
import { Button } from '../ui'
import { escalaGrafica, passoDaGrade, projetar, rotuloDoGrau, useMidia, type Projecao } from './navegacao'

interface Dimensoes {
  w: number
  h: number
  margem: number
}

const GRANDE: Dimensoes = { w: 800, h: 540, margem: 72 }
const PEQUENA: Dimensoes = { w: 400, h: 500, margem: 44 }
const VELOCIDADE = 120
const PAUSA_PORTO = 1.6
const PAUSA_CENICO = 1
const PAUSA_FINAL = 2.6
const TEMPO_POR_DIA_NO_MAR = 1.1

interface Marco {
  indice: number
  x: number
  y: number
  tipo: Parada['tipo']
  repetido: boolean
}

interface Trecho {
  de: Marco
  para: Marco
  cx: number
  cy: number
  comprimento: number
  noMar: number[]
}

type Etapa = { tipo: 'parada'; marco: number; inicio: number; duracao: number } | { tipo: 'trajeto'; trecho: number; inicio: number; duracao: number }

interface Rotulo {
  marco: Marco
  nome: string
  dias: string
  x: number
  y: number
  largura: number
  ancora: 'start' | 'end'
}

function bezier(t: Trecho, f: number) {
  const u = 1 - f
  return {
    x: u * u * t.de.x + 2 * u * f * t.cx + f * f * t.para.x,
    y: u * u * t.de.y + 2 * u * f * t.cy + f * f * t.para.y,
    angulo: (Math.atan2(2 * u * (t.cy - t.de.y) + 2 * f * (t.para.y - t.cy), 2 * u * (t.cx - t.de.x) + 2 * f * (t.para.x - t.cx)) * 180) / Math.PI,
  }
}

function montarCarta(r: Roteiro, { w: W, h: H, margem: MARGEM }: Dimensoes) {
  const mapeadas = r.paradas.map((p, indice) => ({ p, indice })).filter(({ p }) => p.lat !== undefined && p.lon !== undefined)
  const proj = projetar(
    mapeadas.map(({ p }) => ({ lat: p.lat!, lon: p.lon! })),
    W,
    H,
    MARGEM,
  )
  const vistos = new Set<string>()
  const marcos: Marco[] = mapeadas.map(({ p, indice }) => {
    const [x, y] = proj.xy({ lat: p.lat!, lon: p.lon! })
    const chave = `${p.lat},${p.lon}`
    const repetido = vistos.has(chave)
    vistos.add(chave)
    return { indice, x, y, tipo: p.tipo, repetido }
  })
  const trechos: Trecho[] = marcos.slice(0, -1).map((de, k) => {
    const para = marcos[k + 1]
    const dx = para.x - de.x
    const dy = para.y - de.y
    const t: Trecho = { de, para, cx: (de.x + para.x) / 2 - dy * 0.14, cy: (de.y + para.y) / 2 + dx * 0.14, comprimento: 0, noMar: [] }
    let ax = de.x
    let ay = de.y
    for (let s = 1; s <= 24; s++) {
      const b = bezier(t, s / 24)
      t.comprimento += Math.hypot(b.x - ax, b.y - ay)
      ax = b.x
      ay = b.y
    }
    for (let i = de.indice + 1; i < para.indice; i++) t.noMar.push(i)
    return t
  })

  const etapas: Etapa[] = []
  let relogio = 0
  marcos.forEach((m, k) => {
    const ultimo = k === marcos.length - 1
    const pausa = ultimo ? PAUSA_FINAL : m.tipo === 'cenico' ? PAUSA_CENICO : PAUSA_PORTO
    etapas.push({ tipo: 'parada', marco: k, inicio: relogio, duracao: pausa })
    relogio += pausa
    if (!ultimo) {
      const t = trechos[k]
      const duracao = Math.max(1.2, t.comprimento / VELOCIDADE) + t.noMar.length * TEMPO_POR_DIA_NO_MAR
      etapas.push({ tipo: 'trajeto', trecho: k, inicio: relogio, duracao })
      relogio += duracao
    }
  })

  const ocupados: { x: number; y: number; w: number; h: number }[] = [{ x: W - 72, y: 40, w: 56, h: 62 }, ...marcos.map((m) => ({ x: m.x - 9, y: m.y - 9, w: 18, h: 18 }))]
  const rotulos: Rotulo[] = []
  marcos.forEach((m) => {
    if (m.repetido) return
    const p = r.paradas[m.indice]
    const dias = r.paradas
      .filter((q) => q.lat === p.lat && q.lon === p.lon)
      .map((q) => q.dia)
    const largura = Math.max(p.nome.length * 7.6, 58) + 6
    const altura = 32
    const opcoes = [
      { x: m.x + 13, y: m.y - 16, ancora: 'start' as const },
      { x: m.x - 13 - largura, y: m.y - 16, ancora: 'end' as const },
      { x: m.x - largura / 2, y: m.y - 14 - altura, ancora: 'start' as const },
      { x: m.x - largura / 2, y: m.y + 14, ancora: 'start' as const },
    ]
    const cabe = (o: { x: number; y: number }) =>
      o.x > 4 && o.x + largura < W - 4 && o.y > 4 && o.y + altura < H - 34 && !ocupados.some((b) => o.x < b.x + b.w && o.x + largura > b.x && o.y < b.y + b.h && o.y + altura > b.y)
    const escolhida = opcoes.find(cabe) ?? opcoes[0]
    ocupados.push({ x: escolhida.x, y: escolhida.y, w: largura, h: altura })
    rotulos.push({ marco: m, nome: p.nome, dias: dias.length > 1 ? `DIAS ${dias.join(' E ')}` : `DIA ${dias[0]}`, x: escolhida.ancora === 'end' ? escolhida.x + largura : escolhida.x, y: escolhida.y, largura, ancora: escolhida.ancora })
  })

  return { proj, marcos, trechos, etapas, total: relogio, rotulos }
}

function Grade({ proj, w: W, h: H }: { proj: Projecao; w: number; h: number }) {
  const latTopo = proj.latDe(0)
  const latBase = proj.latDe(H)
  const lonEsq = proj.lonDe(0)
  const lonDir = proj.lonDe(W)
  const passoLat = passoDaGrade(latTopo - latBase)
  const passoLon = passoDaGrade(lonDir - lonEsq)
  const lats: number[] = []
  for (let n = Math.ceil(latBase / passoLat); n * passoLat <= latTopo; n++) if (proj.xy({ lat: n * passoLat, lon: lonEsq })[1] > 34) lats.push(n * passoLat)
  const lons: number[] = []
  for (let n = Math.ceil(lonEsq / passoLon); n * passoLon <= lonDir; n++) if (proj.xy({ lat: latTopo, lon: n * passoLon })[0] > 40) lons.push(n * passoLon)
  const escala = escalaGrafica(proj.pxPorGrauLat / 60)
  return (
    <g>
      {lats.map((v) => {
        const y = proj.xy({ lat: v, lon: lonEsq })[1]
        return (
          <g key={`la${v}`}>
            <line x1="0" x2={W} y1={y} y2={y} stroke="#5ce3f7" strokeOpacity="0.12" />
            <text x="10" y={y - 5} fontSize="10" fill="#9cf0fc" fillOpacity="0.6" letterSpacing="0.6">
              {rotuloDoGrau(v, 'lat')}
            </text>
          </g>
        )
      })}
      {lons.map((v) => {
        const x = proj.xy({ lat: latTopo, lon: v })[0]
        return (
          <g key={`lo${v}`}>
            <line y1="0" y2={H} x1={x} x2={x} stroke="#5ce3f7" strokeOpacity="0.12" />
            <text x={x + 5} y="18" fontSize="10" fill="#9cf0fc" fillOpacity="0.6" letterSpacing="0.6">
              {rotuloDoGrau(v, 'lon')}
            </text>
          </g>
        )
      })}
      <g transform={`translate(${W - 24 - escala.px} ${H - 20})`}>
        <rect x="0" y="-4" width={escala.px / 2} height="4" fill="#9cf0fc" fillOpacity="0.8" />
        <rect x={escala.px / 2} y="-4" width={escala.px / 2} height="4" fill="none" stroke="#9cf0fc" strokeOpacity="0.8" />
        <text x={escala.px} y="-10" textAnchor="end" fontSize="10" fill="#9cf0fc" fillOpacity="0.8" letterSpacing="0.6">
          {escala.milhas} MILHAS NÁUTICAS
        </text>
      </g>
      <g transform={`translate(${W - 44} 74)`}>
        <circle r="22" fill="none" stroke="#9cf0fc" strokeOpacity="0.3" />
        <path d="M0 -20 L5 0 L0 -4 L-5 0 Z" fill="#ff7337" />
        <path d="M0 20 L5 0 L0 4 L-5 0 Z" fill="#9cf0fc" fillOpacity="0.5" />
        <text y="-26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ff9e70">
          N
        </text>
      </g>
    </g>
  )
}

const iconeDoTipo = { porto: Anchor, mar: Waves, cenico: Mountain }

export function CartaNautica() {
  const { openQuote } = useQuote()
  const reduzir = useReducedMotion()
  const [id, setId] = useState(roteiros[0].id)
  const roteiro = roteiros.find((r) => r.id === id) ?? roteiros[0]
  const pequena = !useMidia('(min-width: 640px)')
  const dims = pequena ? PEQUENA : GRANDE
  const { w: W, h: H } = dims
  const carta = useMemo(() => montarCarta(roteiro, dims), [roteiro, dims])
  const [tocando, setTocando] = useState(!reduzir)
  const [ativo, setAtivo] = useState(0)
  const [navegando, setNavegando] = useState(false)

  const tempo = useRef(0)
  const visivel = useRef(false)
  const caixa = useRef<HTMLDivElement>(null)
  const navio = useRef<SVGGElement>(null)
  const rastros = useRef<(SVGPathElement | null)[]>([])
  const textoPosicao = useRef<HTMLSpanElement>(null)
  const textoRumo = useRef<HTMLSpanElement>(null)
  const lista = useRef<HTMLOListElement>(null)
  const ultimoAtivo = useRef(-1)
  const ultimoNavegando = useRef(false)

  useEffect(() => {
    tempo.current = 0
    ultimoAtivo.current = -1
  }, [carta])

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => (visivel.current = e.isIntersecting), { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let quadro = 0
    let antes = performance.now()
    const desenhar = () => {
      const { etapas, trechos, marcos, proj } = carta
      const t = tempo.current
      const etapa = etapas.find((e) => t >= e.inicio && t < e.inicio + e.duracao) ?? etapas[etapas.length - 1]
      let x: number
      let y: number
      let angulo: number
      let indiceAtivo: number
      let emTrajeto = false
      let trechoAtual: number
      let fracao = 0
      if (etapa.tipo === 'parada') {
        const m = marcos[etapa.marco]
        x = m.x
        y = m.y
        const vizinho = trechos[etapa.marco] ?? trechos[etapa.marco - 1]
        angulo = vizinho ? bezier(vizinho, trechos[etapa.marco] ? 0 : 1).angulo : 0
        indiceAtivo = m.indice
        trechoAtual = etapa.marco
      } else {
        const tr = trechos[etapa.trecho]
        fracao = Math.min(1, (t - etapa.inicio) / etapa.duracao)
        const b = bezier(tr, fracao)
        x = b.x
        y = b.y
        angulo = b.angulo
        emTrajeto = true
        indiceAtivo = tr.noMar.length ? tr.noMar[Math.min(tr.noMar.length - 1, Math.floor(fracao * tr.noMar.length))] : fracao < 0.5 ? tr.de.indice : tr.para.indice
        trechoAtual = etapa.trecho
      }
      navio.current?.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angulo.toFixed(1)})`)
      rastros.current.forEach((p, k) => {
        if (!p) return
        const feito = k < trechoAtual ? 1 : k === trechoAtual && emTrajeto ? fracao : 0
        p.style.strokeDashoffset = String(1 - feito)
      })
      if (textoPosicao.current) textoPosicao.current.textContent = `${coordenada(proj.latDe(y), 'lat')} ${coordenada(proj.lonDe(x), 'lon')}`
      if (textoRumo.current) textoRumo.current.textContent = `${String(Math.round((angulo + 90 + 360) % 360)).padStart(3, '0')}°`
      if (indiceAtivo !== ultimoAtivo.current) {
        ultimoAtivo.current = indiceAtivo
        setAtivo(indiceAtivo)
      }
      if (emTrajeto !== ultimoNavegando.current) {
        ultimoNavegando.current = emTrajeto
        setNavegando(emTrajeto)
      }
    }
    const passo = (agora: number) => {
      const dt = Math.min(0.1, (agora - antes) / 1000)
      antes = agora
      if (visivel.current) {
        if (tocando) tempo.current = (tempo.current + dt) % carta.total
        desenhar()
      }
      quadro = requestAnimationFrame(passo)
    }
    desenhar()
    quadro = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(quadro)
  }, [carta, tocando])

  useEffect(() => {
    const ol = lista.current
    const item = ol?.querySelector<HTMLElement>(`[data-indice="${ativo}"]`)
    if (!ol || !item) return
    ol.scrollTo({ top: item.offsetTop - ol.clientHeight / 2 + item.clientHeight / 2, behavior: 'smooth' })
  }, [ativo])

  function irPara(indice: number) {
    const { etapas, trechos, marcos } = carta
    const k = marcos.findIndex((m) => m.indice === indice)
    if (k >= 0) {
      const e = etapas.find((x) => x.tipo === 'parada' && x.marco === k)
      if (e) tempo.current = e.inicio + 0.01
      return
    }
    const j = trechos.findIndex((t) => t.noMar.includes(indice))
    const e = etapas.find((x) => x.tipo === 'trajeto' && x.trecho === j)
    if (e && j >= 0) {
      const n = trechos[j].noMar
      tempo.current = e.inicio + (e.duracao * (n.indexOf(indice) + 0.5)) / n.length
    }
  }

  const paradaAtiva = roteiro.paradas[ativo]
  const embarque = roteiro.paradas[0]

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Regiões">
        {roteiros.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={r.id === id}
            onClick={() => setId(r.id)}
            className={cn('relative h-10 shrink-0 cursor-pointer rounded-full px-4 text-sm font-medium transition', r.id === id ? 'text-ink-950' : 'text-ink-200 ring-1 ring-white/15 hover:bg-white/10 hover:text-white')}
          >
            {r.id === id && <motion.span layoutId="cz-regiao" className="absolute inset-0 rounded-full bg-aqua-300" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative">{r.regiao}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div ref={caixa} className="relative flex flex-col overflow-hidden rounded-[28px] bg-[#050b18] ring-1 ring-aqua-300/15">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-aqua-200 uppercase">
            <span className="flex min-w-0 items-center gap-2">
              <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-aqua-300" />
              <span className="truncate">Carta náutica · {roteiro.titulo}</span>
            </span>
            <button
              type="button"
              onClick={() => setTocando((v) => !v)}
              aria-label={tocando ? 'Pausar a navegação' : 'Continuar a navegação'}
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-white ring-1 ring-white/15 transition hover:bg-white/10"
            >
              {tocando ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>
          </div>

          <div className="relative flex flex-1 items-center" style={{ background: 'radial-gradient(ellipse at 50% 45%, #0d2240, #050b18 75%)' }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Mapa do roteiro ${roteiro.titulo}`}>
              <defs>
                <radialGradient id="cz-carta-fundo" cx="0.5" cy="0.45" r="0.75">
                  <stop offset="0" stopColor="#0d2240" />
                  <stop offset="1" stopColor="#050b18" />
                </radialGradient>
                <linearGradient id="cz-varredura" x1="0" x2="1">
                  <stop offset="0" stopColor="#5ce3f7" stopOpacity="0" />
                  <stop offset="0.85" stopColor="#5ce3f7" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#9cf0fc" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <rect width={W} height={H} fill="url(#cz-carta-fundo)" />
              <Grade proj={carta.proj} w={W} h={H} />
              <rect x="0" y="0" width="160" height={H} fill="url(#cz-varredura)" className="cz-varredura" style={{ transformBox: 'view-box' }} />

              {carta.trechos.map((t, k) => (
                <path key={`b${k}`} d={`M${t.de.x} ${t.de.y} Q${t.cx} ${t.cy} ${t.para.x} ${t.para.y}`} fill="none" stroke="#9cf0fc" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 6" />
              ))}
              {carta.trechos.map((t, k) => (
                <path
                  key={`r${roteiro.id}${k}`}
                  ref={(el) => {
                    rastros.current[k] = el
                  }}
                  d={`M${t.de.x} ${t.de.y} Q${t.cx} ${t.cy} ${t.para.x} ${t.para.y}`}
                  fill="none"
                  stroke="#ff7337"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: 1, filter: 'drop-shadow(0 0 4px rgba(255,115,55,0.7))' }}
                />
              ))}

              {carta.marcos
                .filter((m) => !m.repetido)
                .map((m) => {
                  const atual = roteiro.paradas[ativo]
                  const p = roteiro.paradas[m.indice]
                  const destaque = atual && atual.lat === p.lat && atual.lon === p.lon && !navegando
                  return (
                    <g key={m.indice} transform={`translate(${m.x} ${m.y})`} className="cursor-pointer" onClick={() => irPara(m.indice)}>
                      <circle r="18" fill="transparent" />
                      {destaque && <circle r="9" fill="none" stroke="#ff7337" strokeWidth="1.5" className="cz-pulso" />}
                      {m.tipo === 'cenico' ? (
                        <rect x="-5.5" y="-5.5" width="11" height="11" transform="rotate(45)" fill="#050b18" stroke={destaque ? '#ff7337' : '#9cf0fc'} strokeWidth="1.6" strokeDasharray="2 2" />
                      ) : (
                        <circle r="6" fill={destaque ? '#ff4d00' : '#050b18'} stroke={destaque ? '#ffc5a8' : '#9cf0fc'} strokeWidth="1.8" />
                      )}
                    </g>
                  )
                })}

              {carta.rotulos.map((r) => (
                <g key={`t${r.marco.indice}`} style={{ pointerEvents: 'none' }}>
                  <text x={r.x} y={r.y + 13} textAnchor={r.ancora} fontSize="13" fontWeight="600" fill="#fff" fontFamily="Sora Variable, sans-serif" stroke="#050b18" strokeWidth="3" paintOrder="stroke">
                    {r.nome}
                  </text>
                  <text x={r.x} y={r.y + 27} textAnchor={r.ancora} fontSize="9.5" fill="#ff9e70" letterSpacing="1" stroke="#050b18" strokeWidth="3" paintOrder="stroke">
                    {r.dias}
                  </text>
                </g>
              ))}

              <g ref={navio}>
                <circle r="10" fill="none" stroke="#9cf0fc" strokeWidth="1.2" className="cz-pulso" />
                <path d="M16 0 L6 -6.5 L-12 -6.5 L-14 0 L-12 6.5 L6 6.5 Z" fill="#fff" stroke="#050b18" strokeWidth="1" />
                <rect x="-7" y="-2.6" width="9" height="5.2" rx="1.5" fill="#ff4d00" />
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/10 px-5 py-3 text-[11px] tracking-[0.12em] text-ink-400 uppercase sm:grid-cols-3">
            <div className="col-span-2 min-w-0 sm:col-span-1">
              Posição
              <span ref={textoPosicao} className="mt-0.5 block truncate text-xs font-semibold tracking-normal text-white tabular-nums normal-case" />
            </div>
            <div>
              Rumo
              <span ref={textoRumo} className="mt-0.5 block text-xs font-semibold tracking-normal text-white tabular-nums" />
            </div>
            <div className="min-w-0">
              {navegando ? 'Navegando' : 'Atracado'}
              <span className="mt-0.5 block truncate text-xs font-semibold tracking-normal text-white normal-case">
                Dia {paradaAtiva?.dia} de {roteiro.paradas[roteiro.paradas.length - 1].dia}
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col rounded-[28px] bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl font-semibold text-white">{roteiro.titulo}</h3>
            <span className="text-sm text-aqua-200 tabular-nums">
              {noitesDoRoteiro(roteiro)} noites · {portosDoRoteiro(roteiro)} portos
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-300">{roteiro.resumo}</p>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="flex gap-2.5 rounded-2xl bg-white/[0.04] p-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-aqua-300" />
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-ink-400 uppercase">Temporada</dt>
                <dd className="text-ink-100">{roteiro.temporada}</dd>
              </div>
            </div>
            <div className="flex gap-2.5 rounded-2xl bg-white/[0.04] p-3">
              <IdCard className="mt-0.5 size-4 shrink-0 text-aqua-300" />
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-ink-400 uppercase">Documentos</dt>
                <dd className="text-ink-100">{roteiro.documentos}</dd>
              </div>
            </div>
          </dl>

          <ol ref={lista} className="no-scrollbar relative mt-4 max-h-[22rem] flex-1 space-y-1.5 overflow-y-auto pr-1">
            {roteiro.paradas.map((p, i) => {
              const Icone = iconeDoTipo[p.tipo]
              const atual = i === ativo
              return (
                <li key={`${roteiro.id}-${i}`} data-indice={i}>
                  <button
                    type="button"
                    onClick={() => irPara(i)}
                    className={cn('flex w-full cursor-pointer gap-3 rounded-2xl p-3 text-left transition', atual ? 'bg-go-500/15 ring-1 ring-go-400/60' : 'hover:bg-white/[0.06]')}
                  >
                    <span className={cn('grid size-9 shrink-0 place-items-center rounded-xl', atual ? 'bg-go-500 text-white' : 'bg-white/[0.06] text-aqua-200')}>
                      <Icone className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate font-semibold text-white">
                          {p.nome}
                          {p.pais && <span className="font-normal text-ink-400"> · {p.pais}</span>}
                        </span>
                        <span className="shrink-0 text-xs text-ink-400 tabular-nums">Dia {p.dia}</span>
                      </span>
                      <span className={cn('mt-0.5 block text-sm text-ink-300', !atual && 'line-clamp-1')}>{p.texto}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <Button
            size="lg"
            className="mt-5 w-full"
            onClick={() =>
              openQuote({
                service: 'cruzeiro',
                item: { origin: embarque.nome, details: { region: roteiro.regiao } },
                source: `cruzeiros:${roteiro.id}`,
                notes: `Roteiro de interesse: ${roteiro.titulo} (${noitesDoRoteiro(roteiro)} noites, saída de ${embarque.nome})`,
              })
            }
          >
            <Send className="size-5" /> Quero um roteiro assim
          </Button>
        </div>
      </div>
      <p className="mt-4 text-xs text-ink-400">Roteiros de exemplo. Portos, datas e navios mudam a cada temporada e companhia; a consultora envia as saídas disponíveis.</p>
    </div>
  )
}
