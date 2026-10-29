export type ServiceId = 'aereo' | 'hospedagem' | 'pacote' | 'carro' | 'ingressos' | 'seguro' | 'cruzeiro'

export type PoiCategory = 'atracao' | 'restaurante' | 'compras'

export interface Poi {
  id: string
  park: string
  /** Número do ponto dentro da sua categoria (Atrações 1..n, Restaurantes 1..n...) */
  n: number
  name: string
  category: PoiCategory
  lat: number
  lng: number
  area: string
  intensity?: 'Leve' | 'Moderada' | 'Radical'
  description: string
  tags: string[]
  tip?: string
}

export interface Offer {
  title: string
  nights: string
  includes: string[]
  tag?: string
}

export interface Destination {
  slug: string
  title: string
  /** Forma com preposição para frases: "no Japão", "na Grécia" */
  inName: string
  /** "para o Japão", "para a Grécia" */
  toName: string
  region: string
  category: string
  image: string
  gallery: string[]
  summary: string
  intro: string
  bestSeason: string
  climate: string
  documents: string
  currency: string
  todo: { title: string; text: string }[]
  tips: string[]
  offers: Offer[]
  /** Link interno extra (ex.: Orlando → página de parques) */
  related?: { label: string; to: string }
}

export interface Park {
  slug: string
  resort: string
  name: string
  short: string
  kind: 'tema' | 'aquatico' | 'experiencia'
  icon: string
  /** Gradiente do selo do parque */
  colors: [string, string]
  description: string
  highlights: string[]
  tips: string[]
  idealFor: string[]
  days: number
  hasMap: boolean
  location?: string
}

export interface Resort {
  slug: string
  name: string
  tagline: string
  image: string
  accent: string
  parks: string[]
}

export interface CalculatorSummary {
  dateMode: 'datas' | 'meses' | 'indefinido'
  arrival?: string
  departure?: string
  months?: string[]
  adults: number
  children: number
  selection: { name: string; days: number }[]
  parkDays: number
  restDays: number
  travelDays: number
  totalDays: number
}
