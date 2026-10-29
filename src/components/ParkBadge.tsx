import {
  Blocks,
  Castle,
  Clapperboard,
  Compass,
  Droplets,
  Film,
  Fish,
  Flame,
  Globe,
  Orbit,
  RollerCoaster,
  Rocket,
  Shell,
  ShoppingBag,
  Snowflake,
  Sparkles,
  TreePalm,
  Waves,
  type LucideIcon,
} from 'lucide-react'
import type { Park } from '../data/types'
import { cn } from '../lib/utils'

export const parkIcons: Record<string, LucideIcon> = {
  Blocks,
  Castle,
  Clapperboard,
  Compass,
  Droplets,
  Film,
  Fish,
  Flame,
  Globe,
  Orbit,
  RollerCoaster,
  Rocket,
  Shell,
  ShoppingBag,
  Snowflake,
  Sparkles,
  TreePalm,
  Waves,
}

/**
 * Selo visual do parque. Os logotipos oficiais são marcas registradas —
 * para usá-los, substitua este componente por <img> com os arquivos licenciados.
 */
export function ParkBadge({ park, size = 'md', className }: { park: Park; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const Icon = parkIcons[park.icon] ?? Sparkles
  const dims = { sm: 'size-10 rounded-xl', md: 'size-14 rounded-2xl', lg: 'size-20 rounded-3xl' }[size]
  const icon = { sm: 'size-5', md: 'size-7', lg: 'size-10' }[size]
  return (
    <span
      className={cn('relative grid shrink-0 place-items-center overflow-hidden text-white shadow-lg ring-1 ring-white/20', dims, className)}
      style={{ background: `linear-gradient(135deg, ${park.colors[0]}, ${park.colors[1]})` }}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
      <Icon className={cn('relative drop-shadow', icon)} strokeWidth={1.75} />
    </span>
  )
}
