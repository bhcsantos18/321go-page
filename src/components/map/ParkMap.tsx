import { AnimatePresence, motion } from 'framer-motion'
import L from 'leaflet'
import { ArrowRight, ChevronDown, FerrisWheel, Minus, Plus, Scan, Search, ShoppingBag, Utensils, X, type LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { Link, useNavigate } from 'react-router-dom'
import { mappedParks, parkBySlug } from '../../data/parks'
import { parkBounds, pois } from '../../data/pois'
import type { Poi, PoiCategory } from '../../data/types'
import { cn, normalize } from '../../lib/utils'
import { ParkBadge } from '../ParkBadge'

export const categoryMeta: Record<PoiCategory, { label: string; singular: string; color: string; light: string; icon: LucideIcon }> = {
  atracao: { label: 'Atrações', singular: 'Atração', color: '#ff4d00', light: '#ff9e70', icon: FerrisWheel },
  restaurante: { label: 'Restaurantes', singular: 'Restaurante', color: '#0f9d76', light: '#5eead4', icon: Utensils },
  compras: { label: 'Compras', singular: 'Loja', color: '#7c3aed', light: '#c4b5fd', icon: ShoppingBag },
}
const categories = Object.keys(categoryMeta) as PoiCategory[]

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'

export function poiIcon(p: Pick<Poi, 'category' | 'n'>, active = false) {
  return L.divIcon({
    className: 'poi-wrap',
    html: `<div class="poi-pin is-${p.category}${active ? ' is-active' : ''}"><span>${p.n}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 36],
    tooltipAnchor: [0, -34],
  })
}

export function PinBadge({ p, className }: { p: Pick<Poi, 'category' | 'n'>; className?: string }) {
  return (
    <span className={cn('grid size-7 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white', className)} style={{ background: categoryMeta[p.category].color }}>
      {p.n}
    </span>
  )
}

export const poiPath = (p: Poi) => `/orlando/parques/${p.park}/local/${p.id}`

function Bridge({ onReady }: { onReady: (m: L.Map) => void }) {
  const map = useMap()
  useEffect(() => onReady(map), [map, onReady])
  return null
}

function PoiMarker({
  p,
  active,
  tooltip,
  onHover,
  onSelect,
  register,
}: {
  p: Poi
  active: boolean
  tooltip: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
  register: (id: string, m: L.Marker | null) => void
}) {
  const icon = useMemo(() => poiIcon(p, active), [p, active])
  return (
    <Marker
      ref={(m) => register(p.id, m)}
      position={[p.lat, p.lng]}
      icon={icon}
      zIndexOffset={active ? 1000 : 0}
      keyboard
      title={p.name}
      eventHandlers={{
        mouseover: () => onHover(p.id),
        mouseout: () => onHover(null),
        click: () => onSelect(p.id),
      }}
    >
      {tooltip && (
        <Tooltip direction="top" className="poi-tooltip" opacity={1}>
          <span className="block text-[11px] font-semibold tracking-wide uppercase" style={{ color: categoryMeta[p.category].light }}>
            {categoryMeta[p.category].singular} {p.n}
          </span>
          <span className="block font-display text-sm font-semibold">{p.name}</span>
          <span className="mt-0.5 line-clamp-2 block text-xs text-ink-300">{p.description}</span>
        </Tooltip>
      )}
    </Marker>
  )
}

export function ParkMap({ parkSlug, embedded, focusId }: { parkSlug: string; embedded?: boolean; focusId?: string }) {
  const park = parkBySlug[parkSlug]
  const navigate = useNavigate()
  const all = useMemo(() => pois.filter((p) => p.park === parkSlug), [parkSlug])
  const [cats, setCats] = useState<Set<PoiCategory>>(() => new Set(categories))
  const [q, setQ] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(focusId ?? null)
  const [map, setMap] = useState<L.Map | null>(null)
  const markers = useRef<Record<string, L.Marker | null>>({})
  const items = useRef<Record<string, HTMLLIElement | null>>({})
  const listRef = useRef<HTMLUListElement>(null)
  // No toque, a prévia aparece no card de baixo; o tooltip de hover fica só para mouse
  const canHover = useMemo(() => window.matchMedia('(hover: hover)').matches, [])

  const bounds = useMemo(() => L.latLngBounds(parkBounds[parkSlug]), [parkSlug])
  const matches = useMemo(() => {
    const n = normalize(q)
    return n ? all.filter((p) => normalize(`${p.name} ${p.area} ${p.description} ${p.tags.join(' ')}`).includes(n)) : all
  }, [all, q])
  const visible = useMemo(() => matches.filter((p) => cats.has(p.category)), [matches, cats])
  const selectedPoi = all.find((p) => p.id === selected) ?? null

  function frame(list: Poi[] = visible) {
    if (!map) return
    const b = list.length ? L.latLngBounds(list.map((p) => [p.lat, p.lng] as [number, number])) : bounds
    map.flyToBounds(b, { padding: [48, 48], duration: 0.8, maxZoom: 18 })
  }

  // Enquadra ao abrir e quando o filtro/busca muda
  useEffect(() => {
    if (!map) return
    if (focusId) {
      const p = all.find((x) => x.id === focusId)
      if (p) {
        map.setView([p.lat, p.lng], 18)
        return
      }
    }
    map.fitBounds(bounds, { padding: [24, 24] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map])

  useEffect(() => {
    if (map && (q || cats.size < categories.length)) frame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cats])

  // Lista → mapa: realça o marcador e abre a prévia
  useEffect(() => {
    if (!hovered) return
    const m = markers.current[hovered]
    m?.openTooltip()
    return () => {
      m?.closeTooltip()
    }
  }, [hovered])

  function select(id: string, fly = true) {
    setSelected(id)
    const p = all.find((x) => x.id === id)
    if (p && map && fly) map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 18), { duration: 0.7 })
    const el = items.current[id]
    if (el && listRef.current) {
      // A <ul> é `relative`, então offsetTop do item já é relativo à lista
      listRef.current.scrollTo({ top: el.offsetTop - 12, behavior: 'smooth' })
    }
  }

  function toggleCat(c: PoiCategory) {
    setCats((s) => {
      const n = new Set(s)
      if (n.has(c)) n.delete(c)
      else n.add(c)
      return n
    })
  }

  const ctrl = 'grid size-11 cursor-pointer place-items-center bg-white text-ink-800 transition hover:bg-ink-50 hover:text-go-600'

  return (
    <div
      className={cn(
        'grid overflow-hidden bg-white lg:grid-cols-[380px_1fr] lg:grid-rows-[auto_1fr]',
        embedded ? 'rounded-[28px] border border-ink-100 shadow-2xl shadow-ink-900/10 lg:h-[680px]' : 'lg:h-[calc(100dvh-5rem)]',
      )}
    >
      {/* Controles */}
      <div className="border-b border-ink-100 p-4 lg:col-start-1 lg:row-start-1 lg:border-r">
        {!embedded && (
          <div className="relative mb-3">
            <div className="flex items-center gap-3 rounded-2xl bg-ink-50 p-2 pr-3">
              <ParkBadge park={park} size="sm" />
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold tracking-wider text-ink-400 uppercase">Mapa do parque</span>
                <select
                  aria-label="Escolher parque"
                  value={parkSlug}
                  onChange={(e) => navigate(`/orlando/mapas/${e.target.value}`)}
                  className="-ml-0.5 w-full cursor-pointer appearance-none bg-transparent pr-6 font-display font-semibold text-ink-900 outline-none"
                >
                  {mappedParks.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown className="pointer-events-none size-4 text-ink-400" />
            </div>
          </div>
        )}
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar atração, restaurante ou loja" aria-label="Buscar no mapa" className="field pr-10 pl-10" />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Limpar busca" className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ink-400 hover:bg-ink-100">
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          {categories.map((c) => {
            const meta = categoryMeta[c]
            const on = cats.has(c)
            const count = matches.filter((p) => p.category === c).length
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => toggleCat(c)}
                className={cn('flex cursor-pointer items-center gap-1.5 rounded-full border py-1.5 pr-3 pl-1.5 text-sm font-medium transition', on ? 'border-transparent text-white' : 'border-ink-200 bg-white text-ink-500')}
                style={on ? { background: meta.color } : undefined}
              >
                <span className={cn('grid size-6 place-items-center rounded-full', on ? 'bg-white/20' : 'bg-ink-100')}>
                  <meta.icon className="size-3.5" />
                </span>
                {meta.label}
                <span className={cn('rounded-full px-1.5 text-xs', on ? 'bg-white/20' : 'bg-ink-100')}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mapa */}
      <div className="relative h-[58vh] min-h-[380px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-auto">
        <MapContainer
          bounds={bounds}
          zoomControl={false}
          scrollWheelZoom={!embedded}
          maxBounds={bounds.pad(1.2)}
          minZoom={14}
          maxZoom={19}
          className="size-full"
          attributionControl
        >
          <Bridge onReady={setMap} />
          <TileLayer url={TILE_URL} attribution={TILE_ATTR} maxZoom={19} />
          {visible.map((p) => (
            <PoiMarker
              key={p.id}
              p={p}
              active={hovered === p.id || selected === p.id}
              tooltip={canHover}
              onHover={setHovered}
              onSelect={(id) => select(id, false)}
              register={(id, m) => (markers.current[id] = m)}
            />
          ))}
        </MapContainer>

        <div className="absolute top-4 right-4 z-[500] flex flex-col overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink-900/5">
          <button type="button" className={ctrl} onClick={() => map?.zoomIn()} aria-label="Aproximar">
            <Plus className="size-5" />
          </button>
          <span className="h-px bg-ink-100" />
          <button type="button" className={ctrl} onClick={() => map?.zoomOut()} aria-label="Afastar">
            <Minus className="size-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => frame()}
          className="absolute top-4 left-4 z-[500] flex h-11 cursor-pointer items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-ink-800 shadow-xl ring-1 ring-ink-900/5 transition hover:text-go-600"
        >
          <Scan className="size-4.5" /> Enquadrar mapa
        </button>

        <AnimatePresence>
          {selectedPoi && (
            <motion.div
              key={selectedPoi.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-3 bottom-8 z-[500] rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-ink-900/5 sm:right-auto sm:left-4 sm:w-96"
            >
              <button type="button" onClick={() => setSelected(null)} aria-label="Fechar prévia" className="absolute top-3 right-3 grid size-8 cursor-pointer place-items-center rounded-full text-ink-400 hover:bg-ink-100">
                <X className="size-4" />
              </button>
              <div className="flex items-center gap-2 pr-8">
                <PinBadge p={selectedPoi} />
                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: categoryMeta[selectedPoi.category].color }}>
                  {categoryMeta[selectedPoi.category].label}
                </span>
                {selectedPoi.intensity && <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-semibold text-ink-600">{selectedPoi.intensity}</span>}
              </div>
              <h3 className="mt-2.5 font-display text-lg leading-snug font-semibold">{selectedPoi.name}</h3>
              <p className="text-xs text-ink-400">{selectedPoi.area}</p>
              <p className="mt-2 line-clamp-2 text-sm text-ink-600">{selectedPoi.description}</p>
              <Link to={poiPath(selectedPoi)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-go-600 hover:gap-2.5 hover:text-go-700">
                Ver detalhes <ArrowRight className="size-4 transition-all" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lista sincronizada */}
      <ul ref={listRef} className="relative max-h-[60vh] overflow-y-auto p-2 lg:col-start-1 lg:row-start-2 lg:max-h-none lg:border-r lg:border-ink-100" aria-label="Locais do parque">
        {visible.length === 0 && (
          <li className="p-8 text-center text-sm text-ink-400">{cats.size === 0 ? 'Selecione ao menos uma categoria.' : 'Nenhum local encontrado para esta busca.'}</li>
        )}
        {visible.map((p) => {
          const active = selected === p.id
          return (
            <li
              key={p.id}
              ref={(el) => {
                items.current[p.id] = el
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                onClick={() => select(p.id)}
                className={cn(
                  'flex w-full cursor-pointer items-start gap-3 rounded-2xl p-3 text-left transition',
                  active ? 'bg-go-50 ring-1 ring-go-200' : hovered === p.id ? 'bg-ink-50' : 'hover:bg-ink-50',
                )}
              >
                <PinBadge p={p} className="mt-0.5" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink-900">{p.name}</span>
                  <span className="block truncate text-xs text-ink-400">{p.area}</span>
                </span>
                {p.intensity && (
                  <span
                    className={cn(
                      'mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold',
                      p.intensity === 'Radical' ? 'bg-go-100 text-go-700' : p.intensity === 'Moderada' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-50 text-emerald-700',
                    )}
                  >
                    {p.intensity}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Mapa estático de um único ponto (página de detalhes). */
export function PoiMiniMap({ poi, neighbors }: { poi: Poi; neighbors: Poi[] }) {
  return (
    <MapContainer center={[poi.lat, poi.lng]} zoom={18} zoomControl={false} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} touchZoom={false} className="size-full">
      <TileLayer url={TILE_URL} attribution={TILE_ATTR} maxZoom={19} />
      {neighbors.map((n) => (
        <Marker key={n.id} position={[n.lat, n.lng]} icon={poiIcon(n)} opacity={0.55} interactive={false} />
      ))}
      <Marker position={[poi.lat, poi.lng]} icon={poiIcon(poi, true)} interactive={false} zIndexOffset={1000} />
    </MapContainer>
  )
}
