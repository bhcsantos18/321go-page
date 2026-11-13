import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo, type CSSProperties, type PointerEvent } from 'react'
import { BOTES, CASCO, CHAMINE, DECKS, FAIXA_DA_CHAMINE, LINHA_DAGUA, MASTRO, TOBOAGUA, poligonoDoDeck } from './geometria'

export type Modo = 'noite' | 'dia'

const LARGURA = 1600
const ALTURA = 640
const HORIZONTE = 300
const ESCALA = 0.92
const NAVIO_X = 600
const NAVIO_Y = 238
const AGUA_DO_NAVIO = NAVIO_Y + LINHA_DAGUA * ESCALA

export function sorteador(semente: number) {
  let s = semente
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function linhaDeOnda(y: number, amplitude: number, periodo: number) {
  const inicio = -periodo
  const fim = LARGURA + periodo * 2
  const passo = periodo / 12
  let d = `M${inicio} ${y}`
  for (let x = inicio; x <= fim; x += passo) {
    d += ` L${x.toFixed(1)} ${(y + amplitude * Math.sin((2 * Math.PI * (x - inicio)) / periodo)).toFixed(1)}`
  }
  return d
}

const ondas = Array.from({ length: 17 }, (_, i) => {
  const t = i / 16
  const y = HORIZONTE + 6 + 334 * Math.pow(t, 1.7)
  const periodo = Math.round(70 + 280 * t)
  return {
    y,
    d: linhaDeOnda(y, 0.6 + 7 * t, periodo),
    periodo,
    duracao: 16 - 10 * t,
    opacidade: 0.1 + 0.4 * t,
    espessura: 0.6 + 1.4 * t,
  }
})

function local(x: number, y: number) {
  return { x: NAVIO_X + x * ESCALA, y: NAVIO_Y + y * ESCALA }
}

const chamadas = [
  { alvo: local(472, 40), rotulo: 'Toboáguas', detalhe: 'deck superior', caixa: { x: 1090, y: 150 }, alinhar: 'inicio' as const },
  { alvo: local(805, 89), rotulo: 'Ponte de comando', detalhe: 'visão de 180°', caixa: { x: 1380, y: 196 }, alinhar: 'inicio' as const },
  { alvo: local(150, 125), rotulo: 'Restaurantes', detalhe: 'na popa', caixa: { x: 520, y: 262 }, alinhar: 'fim' as const },
]

export function CenaDoMar({ modo, apitos, desktop, onExplorar }: { modo: Modo; apitos: number; desktop: boolean; onExplorar: () => void }) {
  const noite = modo === 'noite'
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })
  const navioX = useTransform(sx, (v) => v * 14)
  const navioY = useTransform(sy, (v) => v * 6)
  const astroX = useTransform(sx, (v) => v * -10)
  const astroY = useTransform(sy, (v) => v * -6)

  const luzes = useMemo(() => {
    const r = sorteador(321)
    return Array.from({ length: 34 }, () => {
      const d = DECKS[Math.floor(r() * 5)]
      const largura = d.x2 - d.x1 - 40 - (d.base - d.topo)
      const x = d.x1 + 10 + Math.floor((r() * largura) / 9) * 9 + 1.5
      return { x, y: d.topo + 5, atraso: -r() * 6, duracao: 2.4 + r() * 4 }
    })
  }, [])

  function mover(e: PointerEvent<SVGSVGElement>) {
    const caixa = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - caixa.left) / caixa.width) * 2 - 1)
    py.set(((e.clientY - caixa.top) / caixa.height) * 2 - 1)
  }

  const viewBox = desktop ? `0 0 ${LARGURA} ${ALTURA}` : '610 150 980 490'
  const variaveis = {
    '--cz-janela': noite ? '#ffd58a' : '#1c2742',
    '--cz-escotilha': noite ? '#ffc874' : '#2f3b59',
  } as CSSProperties

  return (
    <svg
      viewBox={viewBox}
      className="block h-auto w-full"
      style={{ ...variaveis, aspectRatio: desktop ? `${LARGURA} / ${ALTURA}` : '980 / 490' }}
      onPointerMove={mover}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      role="img"
      aria-label="Navio de cruzeiro navegando em alto-mar"
    >
      <defs>
        <linearGradient id="cz-mar-noite" x1="0" y1={HORIZONTE} x2="0" y2={ALTURA} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#10284a" />
          <stop offset="1" stopColor="#04070f" />
        </linearGradient>
        <linearGradient id="cz-mar-dia" x1="0" y1={HORIZONTE} x2="0" y2={ALTURA} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#73a9cd" />
          <stop offset="1" stopColor="#1f3c56" />
        </linearGradient>
        <linearGradient id="cz-casco" x1="0" y1="138" x2="0" y2="236" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfd8e6" />
        </linearGradient>
        <linearGradient id="cz-deck" x1="0" y1="40" x2="0" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e3e9f2" />
        </linearGradient>
        <linearGradient id="cz-esteira-fade" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cz-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cz-sol" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.25" stopColor="#ffe2a6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe2a6" stopOpacity="0" />
        </radialGradient>
        <pattern id="cz-janelas" width="9" height="8" patternUnits="userSpaceOnUse">
          <rect x="1.5" y="0" width="6" height="8" rx="1" className="cz-janela" />
        </pattern>
        <pattern id="cz-escotilhas" width="14" height="13" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="6.5" r="2.1" className="cz-escotilha" />
        </pattern>
        <clipPath id="cz-casco-clip">
          <path d={CASCO} />
        </clipPath>
        <filter id="cz-brilho-luz" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      <g style={{ opacity: noite ? 1 : 0, transition: 'opacity 1s ease' }}>
        <rect x="0" y={HORIZONTE} width={LARGURA} height={ALTURA - HORIZONTE} fill="url(#cz-mar-noite)" />
      </g>
      <g style={{ opacity: noite ? 0 : 1, transition: 'opacity 1s ease' }}>
        <rect x="0" y={HORIZONTE} width={LARGURA} height={ALTURA - HORIZONTE} fill="url(#cz-mar-dia)" />
      </g>
      <rect x="0" y={HORIZONTE - 1} width={LARGURA} height="2" fill={noite ? '#5ce3f7' : '#ffffff'} opacity={noite ? 0.35 : 0.5} style={{ transition: 'opacity 1s ease' }} />

      <motion.g style={{ x: astroX, y: astroY }}>
        <g style={{ opacity: noite ? 1 : 0, transition: 'opacity 1s ease' }}>
          <circle cx="1460" cy="128" r="90" fill="url(#cz-halo)" />
          <circle cx="1460" cy="128" r="30" fill="#eef4ff" />
          <circle cx="1450" cy="120" r="6" fill="#d5dbe6" opacity="0.6" />
          <circle cx="1470" cy="138" r="4" fill="#d5dbe6" opacity="0.5" />
        </g>
        <g style={{ opacity: noite ? 0 : 1, transition: 'opacity 1s ease' }}>
          <circle cx="1460" cy="140" r="140" fill="url(#cz-sol)" />
          <circle cx="1460" cy="140" r="38" fill="#ffd27a" />
        </g>
      </motion.g>

      <g>
        {Array.from({ length: 12 }, (_, i) => {
          const y = HORIZONTE + 8 + i * 22 + i * i * 0.6
          const largura = 14 + i * 8 + (i % 3) * 6
          return (
            <rect
              key={i}
              opacity="0.7"
              x={1460 - largura / 2 + Math.sin(i * 2.3) * 7}
              y={y}
              width={largura}
              height={1.6 + i * 0.25}
              rx="1"
              fill={noite ? '#eef4ff' : '#ffe2a6'}
              className="cz-brilho"
              style={{ animationDelay: `${-i * 0.37}s`, transition: 'fill 1s ease' }}
            />
          )
        })}
      </g>

      {ondas
        .filter((o) => o.y < AGUA_DO_NAVIO)
        .map((o) => (
          <path
            key={o.y}
            d={o.d}
            fill="none"
            stroke={noite ? '#5ce3f7' : '#ffffff'}
            strokeWidth={o.espessura}
            opacity={o.opacidade * (noite ? 1 : 0.7)}
            className="cz-deriva"
            style={{ '--cz-dx': `${-o.periodo}px`, animationDuration: `${o.duracao}s` } as CSSProperties}
          />
        ))}

      <motion.g style={{ x: navioX, y: navioY }}>
        <g transform={`translate(${NAVIO_X} ${NAVIO_Y}) scale(${ESCALA})`}>
          <g opacity="0.85">
            {[0, 5, 10, 16].map((dy, i) => (
              <path
                key={dy}
                d={`M100 ${LINHA_DAGUA + 3 + dy} L${-700 + i * 60} ${LINHA_DAGUA + 3 + dy * 2.4}`}
                stroke="url(#cz-esteira-fade)"
                strokeWidth={2.4 - i * 0.4}
                strokeDasharray="40 18"
                strokeLinecap="round"
                className="cz-esteira"
                style={{ animationDuration: `${1.2 + i * 0.3}s` }}
              />
            ))}
          </g>

          <g className="cz-balanco" onClick={onExplorar} style={{ cursor: 'pointer' }}>
            {noite && <ellipse cx="520" cy={LINHA_DAGUA + 20} rx="430" ry="16" fill="#ffb347" opacity="0.12" filter="url(#cz-brilho-luz)" />}

            <polygon points={CHAMINE} fill="url(#cz-deck)" stroke="#c4cedd" strokeWidth="0.8" />
            <polygon points={FAIXA_DA_CHAMINE} fill="#ff4d00" />
            <text x="256" y="50" textAnchor="middle" fontSize="12" fontWeight="800" fill="#111a30" fontFamily="Sora Variable, sans-serif">
              321
            </text>
            {Array.from({ length: 5 }, (_, i) => (
              <circle key={`${apitos}-${i}`} cx={244} cy={10} r={9 + i * 2} fill="#e9eef5" className={apitos ? 'cz-fumaca' : undefined} opacity={0} style={{ animationDelay: `${i * 0.18}s` }} />
            ))}

            <polygon points={MASTRO} fill="url(#cz-deck)" stroke="#c4cedd" strokeWidth="0.8" />
            <line x1="672" y1="34" x2="708" y2="34" stroke="#c4cedd" strokeWidth="2" />
            <circle cx="672" cy="29" r="5.5" fill="#f4f7fb" stroke="#c4cedd" strokeWidth="0.8" />
            <circle cx="708" cy="29" r="5.5" fill="#f4f7fb" stroke="#c4cedd" strokeWidth="0.8" />
            <rect x="674" y="17" width="32" height="3.5" rx="1.75" fill="#e3e9f2" className="cz-radar" />
            <circle cx="690" cy="12" r="2.4" fill="#fff" className={noite ? 'cz-pisca' : undefined} opacity={noite ? 1 : 0.6} />

            <rect x="505" y="28" width="10" height="34" fill="#cfd8e6" />
            <path d={TOBOAGUA} fill="none" stroke="#22cfe9" strokeWidth="7" strokeLinecap="round" />
            <path d={TOBOAGUA} fill="none" stroke="#c9f7fe" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />

            {DECKS.map((d, i) => (
              <g key={i}>
                <polygon points={poligonoDoDeck(d)} fill="url(#cz-deck)" stroke="#c4cedd" strokeWidth="0.8" />
                {i < 5 && (
                  <rect
                    x={d.x1 + 10}
                    y={d.topo + 5}
                    width={d.x2 - d.x1 - 30 - (d.base - d.topo)}
                    height="8"
                    fill="url(#cz-janelas)"
                    style={{ filter: noite ? 'drop-shadow(0 0 2px rgba(255,180,80,0.9))' : 'none', transition: 'filter 1s ease' }}
                  />
                )}
              </g>
            ))}
            <rect x="248" y="121" width="472" height="15" fill="#2f3b59" opacity="0.35" />
            {BOTES.map((x) => (
              <rect key={x} x={x} y="122" width="36" height="12" rx="6" fill="#ff4d00" stroke="#be3500" strokeWidth="0.8" />
            ))}
            <rect x="772" y="84" width="58" height="8" rx="1.5" fill="#0a1020" />
            <rect x="774" y="85" width="20" height="2" fill="#5ce3f7" opacity="0.6" />
            <circle cx="842" cy="90" r="2.8" fill="#22e08a" style={{ filter: noite ? 'drop-shadow(0 0 4px #22e08a)' : 'none' }} />

            {noite &&
              luzes.map((l, i) => (
                <rect key={i} x={l.x} y={l.y} width="6" height="8" rx="1" fill="#fff4d6" className="cz-pisca" style={{ animationDelay: `${l.atraso}s`, animationDuration: `${l.duracao}s` }} />
              ))}

            <path d={CASCO} fill="url(#cz-casco)" />
            <g clipPath="url(#cz-casco-clip)">
              <rect x="40" y="206" width="940" height="40" fill="#111a30" />
              <rect x="40" y="196" width="940" height="4" fill="#ff4d00" />
              <rect x="110" y="160" width="770" height="28" fill="url(#cz-escotilhas)" />
            </g>
          </g>
          <ellipse cx="505" cy={LINHA_DAGUA + 7} rx="440" ry="8" fill={noite ? '#06101f' : '#2c5a78'} opacity="0.75" filter="url(#cz-brilho-luz)" style={{ transition: 'fill 1s ease' }} />
          <path d="M906 234 Q928 224 952 238" fill="none" stroke="#fff" strokeWidth="2.4" opacity="0.8" className="cz-brilho" />
          <path d="M880 238 Q915 230 960 244" fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.5" className="cz-brilho" style={{ animationDelay: '-1.2s' }} />
          <path d={`M96 ${LINHA_DAGUA + 2} L912 ${LINHA_DAGUA + 2}`} stroke="#fff" strokeWidth="1.2" opacity="0.35" />
        </g>

        {desktop &&
          chamadas.map((c, i) => {
            const largura = 168
            const caixaX = c.alinhar === 'fim' ? c.caixa.x - largura : c.caixa.x
            return (
              <motion.g key={c.rotulo} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.25, duration: 0.8 }} style={{ pointerEvents: 'none' }}>
                <line x1={c.alvo.x} y1={c.alvo.y} x2={c.caixa.x} y2={c.caixa.y + 22} stroke="#9cf0fc" strokeWidth="1" opacity="0.7" />
                <circle cx={c.alvo.x} cy={c.alvo.y} r="4" fill="#9cf0fc" />
                <circle cx={c.alvo.x} cy={c.alvo.y} r="4" fill="none" stroke="#9cf0fc" className="cz-pulso" />
                <rect x={caixaX} y={c.caixa.y} width={largura} height="44" rx="10" fill="#060a14" fillOpacity="0.55" stroke="#9cf0fc" strokeOpacity="0.35" />
                <text x={caixaX + 14} y={c.caixa.y + 19} fontSize="14" fontWeight="600" fill="#fff" fontFamily="Sora Variable, sans-serif">
                  {c.rotulo}
                </text>
                <text x={caixaX + 14} y={c.caixa.y + 35} fontSize="11" letterSpacing="1.4" fill="#9cf0fc" fontFamily="Inter Variable, sans-serif">
                  {c.detalhe.toUpperCase()}
                </text>
              </motion.g>
            )
          })}
      </motion.g>

      {ondas
        .filter((o) => o.y >= AGUA_DO_NAVIO)
        .map((o) => (
          <path
            key={o.y}
            d={o.d}
            fill="none"
            stroke={noite ? '#5ce3f7' : '#ffffff'}
            strokeWidth={o.espessura}
            opacity={o.opacidade * (noite ? 1 : 0.7)}
            className="cz-deriva"
            style={{ '--cz-dx': `${-o.periodo}px`, animationDuration: `${o.duracao}s` } as CSSProperties}
          />
        ))}
    </svg>
  )
}
