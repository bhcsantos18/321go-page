export const CASCO = 'M60 152 L948 138 C955 160 938 205 912 236 L96 236 C84 210 70 180 60 152 Z'
export const LINHA_DAGUA = 232

export interface Deck {
  x1: number
  x2: number
  topo: number
  base: number
}

export const DECKS: Deck[] = [
  { x1: 100, x2: 905, topo: 134, base: 152 },
  { x1: 112, x2: 884, topo: 116, base: 134 },
  { x1: 124, x2: 862, topo: 98, base: 116 },
  { x1: 138, x2: 838, topo: 80, base: 98 },
  { x1: 170, x2: 772, topo: 62, base: 80 },
  { x1: 300, x2: 660, topo: 48, base: 62 },
]

export function poligonoDoDeck(d: Deck) {
  const rampa = (d.base - d.topo) * 0.8
  return `${d.x1},${d.base} ${d.x1 + 4},${d.topo} ${d.x2 - rampa},${d.topo} ${d.x2},${d.base}`
}

export const CHAMINE = '230,62 300,62 276,16 214,16'
export const FAIXA_DA_CHAMINE = '214,16 276,16 283.3,30 218.9,30'

export const TOBOAGUA = 'M430 62 C400 40 470 28 472 46 C474 62 522 58 514 36 C508 20 452 18 454 34'

export const MASTRO = '682,48 698,48 693,22 687,22'

export const BOTES = Array.from({ length: 10 }, (_, i) => 252 + i * 47)

export const ZONAS: Record<string, { x: number; y: number; w: number; h: number }> = {
  ponte: { x: 772, y: 80, w: 66, h: 18 },
  piscinas: { x: 330, y: 22, w: 300, h: 58 },
  spa: { x: 640, y: 62, w: 128, h: 36 },
  teatro: { x: 770, y: 116, w: 135, h: 36 },
  restaurantes: { x: 100, y: 98, w: 150, h: 54 },
  cabines: { x: 260, y: 98, w: 500, h: 24 },
  kids: { x: 170, y: 62, w: 150, h: 36 },
  botes: { x: 250, y: 122, w: 470, h: 16 },
}
