import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ParkMap } from '../components/map/ParkMap'
import { mappedParks, parkBySlug } from '../data/parks'

export default function Mapa() {
  const { park } = useParams()
  const [params] = useSearchParams()
  if (!park || !parkBySlug[park]?.hasMap) return <Navigate to={`/orlando/mapas/${mappedParks[0].slug}`} replace />
  return (
    <div className="bg-ink-950 pt-18 lg:pt-20">
      <ParkMap key={park} parkSlug={park} focusId={params.get('local') ?? undefined} />
    </div>
  )
}
