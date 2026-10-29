import { AnimatePresence, motion } from 'framer-motion'
import { Building2, MapPin, Plane, type LucideIcon } from 'lucide-react'
import { useId, useMemo, useRef, useState } from 'react'
import { placeLabel, places, type Place } from '../../data/places'
import { cn, normalize } from '../../lib/utils'

function search(q: string, airportsOnly: boolean): Place[] {
  const n = normalize(q)
  if (n.length < 1) return []
  const scored: { p: Place; s: number }[] = []
  for (const p of places) {
    if (airportsOnly && p.kind !== 'aeroporto') continue
    const code = p.code?.toLowerCase() ?? ''
    const city = normalize(p.city)
    const name = normalize(p.name ?? '')
    const country = normalize(p.country)
    let s = 0
    if (code && code === n) s = 100
    else if (city.startsWith(n)) s = 80
    else if (city.split(/[\s(-]+/).some((w) => w.startsWith(n))) s = 60
    else if (name.includes(n)) s = 40
    else if (country.startsWith(n)) s = 30
    else if (n.length > 2 && city.includes(n)) s = 20
    if (s) scored.push({ p, s: s + (p.kind === 'aeroporto' ? 1 : 0) })
  }
  return scored
    .sort((a, b) => b.s - a.s || a.p.city.localeCompare(b.p.city))
    .slice(0, 7)
    .map((x) => x.p)
}

export function PlaceSearch({
  value,
  onChange,
  placeholder = 'Cidade ou aeroporto',
  icon: Icon = MapPin,
  airportsOnly = false,
  id,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  icon?: LucideIcon
  airportsOnly?: boolean
  id?: string
  invalid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => search(value, airportsOnly), [value, airportsOnly])
  const show = open && results.length > 0 && !(results.length === 1 && placeLabel(results[0]) === value)

  function pick(p: Place) {
    onChange(placeLabel(p))
    setOpen(false)
  }

  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-ink-400" />
      <input
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={show}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={invalid || undefined}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
          setActive(0)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (!show) return
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActive((a) => (a + 1) % results.length)
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActive((a) => (a - 1 + results.length) % results.length)
          } else if (e.key === 'Enter') {
            e.preventDefault()
            pick(results[active])
          } else if (e.key === 'Escape') setOpen(false)
        }}
        className={cn('field pl-10', invalid && 'border-go-500 ring-4 ring-go-500/15')}
      />
      <AnimatePresence>
        {show && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 min-w-64 overflow-auto rounded-2xl border border-ink-100 bg-white p-1.5 shadow-2xl shadow-ink-900/15"
          >
            {results.map((p, i) => {
              const ItemIcon = p.kind === 'aeroporto' ? Plane : Building2
              return (
                <li
                  key={`${p.code ?? ''}${p.city}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    pick(p)
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={cn('flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition', i === active ? 'bg-go-50' : '')}
                >
                  <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg', i === active ? 'bg-go-500 text-white' : 'bg-ink-100 text-ink-500')}>
                    <ItemIcon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink-900">
                      {p.city}
                      {p.code && <span className="ml-1.5 rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[11px] text-ink-600">{p.code}</span>}
                    </span>
                    <span className="block truncate text-xs text-ink-400">{p.name ? `${p.name} · ${p.country}` : p.country}</span>
                  </span>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
