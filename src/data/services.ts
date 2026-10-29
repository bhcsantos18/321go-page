import { BedDouble, Car, Luggage, Plane, ShieldCheck, Ship, Ticket, type LucideIcon } from 'lucide-react'
import type { ServiceId } from './types'

export interface ServiceDef {
  id: ServiceId
  label: string
  /** Usado em "Adicionar outro ..." */
  singular: string
  icon: LucideIcon
  blurb: string
}

export const services: ServiceDef[] = [
  { id: 'aereo', label: 'Aéreo', singular: 'aéreo', icon: Plane, blurb: 'Passagens nacionais e internacionais' },
  { id: 'hospedagem', label: 'Hospedagem', singular: 'hospedagem', icon: BedDouble, blurb: 'Hotéis, resorts e casas' },
  { id: 'pacote', label: 'Pacote', singular: 'pacote', icon: Luggage, blurb: 'Aéreo + hotel + passeios' },
  { id: 'carro', label: 'Carro', singular: 'carro', icon: Car, blurb: 'Locação no Brasil e exterior' },
  { id: 'ingressos', label: 'Ingressos', singular: 'ingresso', icon: Ticket, blurb: 'Parques, shows e atrações' },
  { id: 'seguro', label: 'Seguro', singular: 'seguro', icon: ShieldCheck, blurb: 'Seguro viagem completo' },
  { id: 'cruzeiro', label: 'Cruzeiros', singular: 'cruzeiro', icon: Ship, blurb: 'Marítimos e fluviais' },
]

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<ServiceId, ServiceDef>

export const cruiseRegions = [
  'Costa brasileira',
  'Caribe',
  'Mediterrâneo',
  'Norte da Europa e fiordes',
  'Fluvial (rios da Europa)',
  'América do Sul e Patagônia',
  'Alasca',
  'Outro / ainda não sei',
]

export const carCategories = ['Econômico', 'Intermediário', 'SUV', 'Minivan (7+ lugares)', 'Conversível', 'Luxo']
export const insuranceCoverages = ['Básico', 'Intermediário', 'Completo', 'Com cobertura para esportes', 'Para gestantes / idosos']
export const flexOptions = ['Datas exatas', '± 3 dias', '± 7 dias', 'Mês flexível']
export const cabinOptions = ['Econômica', 'Premium Economy', 'Executiva', 'Primeira classe']
export const hotelOptions = ['Indiferente', '3 estrelas', '4 estrelas', '5 estrelas / luxo']
export const boardOptions = ['Só hospedagem', 'Café da manhã', 'Meia pensão', 'All inclusive']
export const budgetOptions = ['Prefiro não informar', 'Até R$ 5 mil por pessoa', 'R$ 5 a 10 mil por pessoa', 'R$ 10 a 20 mil por pessoa', 'Acima de R$ 20 mil por pessoa']
