import { Clock, Mail, MapPin, Phone, Sparkles, Users } from 'lucide-react'
import { useEmpresa } from '../lib/empresa'
import { linhasDoEndereco } from '../lib/empresaDados'
import { AnchorButton, Reveal, SectionTitle, WhatsAppIcon } from './ui'

const ATENDIMENTO: Record<string, string> = {
  presencial: 'Atendimento presencial',
  online: 'Atendimento online',
  presencial_online: 'Atendimento presencial e online',
}

export function SobreAUnidade() {
  const empresa = useEmpresa()
  const u = empresa.unidade
  if (!u) return null
  const endereco = empresa.address ? linhasDoEndereco(empresa.address) : null

  return (
    <section className="bg-ink-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <SectionTitle kicker="Sua unidade" title={empresa.name} text={u.sobre || undefined} />
          {u.especialidades.length > 0 && (
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
              {u.especialidades.map((e) => (
                <span key={e} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-800 ring-1 ring-ink-100">
                  <Sparkles className="size-4 text-go-500" /> {e}
                </span>
              ))}
            </Reveal>
          )}
          {u.consultores && (
            <Reveal delay={0.15} className="mt-6 flex items-start gap-2 text-ink-600">
              <Users className="mt-0.5 size-5 shrink-0 text-go-500" />
              <span>
                <span className="font-semibold text-ink-800">Consultores:</span> {u.consultores}
              </span>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-[30px] bg-white p-8 ring-1 ring-ink-100">
            <h3 className="font-display text-2xl font-semibold text-ink-900">Fale com a unidade</h3>
            <ul className="mt-6 space-y-4 text-sm text-ink-600">
              {endereco && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-go-500" />
                  <span>
                    {endereco[0]}
                    <br />
                    {endereco[1]}
                    {u.maps_url && (
                      <>
                        <br />
                        <a href={u.maps_url} target="_blank" rel="noreferrer" className="font-semibold text-go-600 hover:underline">
                          Ver no mapa
                        </a>
                      </>
                    )}
                  </span>
                </li>
              )}
              {u.horario && (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-go-500" />
                  <span>
                    {u.horario}
                    {u.tipo_atendimento && <span className="block text-ink-400">{ATENDIMENTO[u.tipo_atendimento]}</span>}
                  </span>
                </li>
              )}
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-go-500" />
                <span>{empresa.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-go-500" />
                <a href={`mailto:${empresa.email}`} className="break-all hover:text-ink-900">
                  {empresa.email}
                </a>
              </li>
            </ul>
            <AnchorButton href={empresa.whatsappLink()} target="_blank" rel="noreferrer" size="lg" className="mt-8 w-full bg-[#25d366] hover:bg-[#1fb457]">
              <WhatsAppIcon className="size-5" /> Chamar no WhatsApp
            </AnchorButton>
            {empresa.redes.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                {empresa.redes.map((r) => (
                  <a key={r.rede} href={r.url} target="_blank" rel="noreferrer" className="font-medium text-ink-500 hover:text-go-600">
                    {r.rotulo}
                  </a>
                ))}
              </div>
            )}
            {u.cadastur && <p className="mt-5 text-center text-xs text-ink-400">Cadastur {u.cadastur}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
