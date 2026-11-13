import { useEffect, useState } from 'react'

export interface Ponto {
  lat: number
  lon: number
}

const rad = (g: number) => (g * Math.PI) / 180
const graus = (r: number) => (r * 180) / Math.PI

export function rumoEntre(a: Ponto, b: Ponto) {
  const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat))
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon))
  return (graus(Math.atan2(y, x)) + 360) % 360
}

export function distanciaEmMilhas(a: Ponto, b: Ponto) {
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2
  return Math.round(2 * 3440.065 * Math.asin(Math.sqrt(h)))
}

export function useMidia(consulta: string) {
  const [casa, setCasa] = useState(() => (typeof window === 'undefined' ? true : window.matchMedia(consulta).matches))
  useEffect(() => {
    const m = window.matchMedia(consulta)
    const aoMudar = () => setCasa(m.matches)
    aoMudar()
    m.addEventListener('change', aoMudar)
    return () => m.removeEventListener('change', aoMudar)
  }, [consulta])
  return casa
}

export interface Projecao {
  xy: (p: Ponto) => [number, number]
  latDe: (y: number) => number
  lonDe: (x: number) => number
  pxPorGrauLat: number
}

export function projetar(pontos: Ponto[], largura: number, altura: number, margem: number): Projecao {
  const lats = pontos.map((p) => p.lat)
  const lons = pontos.map((p) => p.lon)
  const latMin = Math.min(...lats)
  const latMax = Math.max(...lats)
  const lonMin = Math.min(...lons)
  const lonMax = Math.max(...lons)
  const k = Math.cos(rad((latMin + latMax) / 2))
  const vaoX = Math.max((lonMax - lonMin) * k, 0.6)
  const vaoY = Math.max(latMax - latMin, 0.6)
  const escala = Math.min((largura - 2 * margem) / vaoX, (altura - 2 * margem) / vaoY)
  const ox = (largura - (lonMax - lonMin) * k * escala) / 2
  const oy = (altura - (latMax - latMin) * escala) / 2
  return {
    xy: (p) => [ox + (p.lon - lonMin) * k * escala, oy + (latMax - p.lat) * escala],
    latDe: (y) => latMax - (y - oy) / escala,
    lonDe: (x) => lonMin + (x - ox) / (k * escala),
    pxPorGrauLat: escala,
  }
}

export function passoDaGrade(vao: number) {
  return [0.5, 1, 2, 5, 10, 20].find((p) => vao / p <= 7) ?? 20
}

export function rotuloDoGrau(valor: number, eixo: 'lat' | 'lon') {
  const lado = eixo === 'lat' ? (valor < 0 ? 'S' : valor > 0 ? 'N' : '') : valor < 0 ? 'W' : valor > 0 ? 'E' : ''
  return `${Math.abs(valor).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}°${lado}`
}

export function escalaGrafica(pxPorMilha: number) {
  const valor = [10, 20, 50, 100, 200, 500, 1000].find((v) => v * pxPorMilha >= 70) ?? 1000
  return { milhas: valor, px: valor * pxPorMilha }
}
