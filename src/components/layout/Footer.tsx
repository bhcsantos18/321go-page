import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, tripCategories, whatsappLink } from '../../data/company'
import { useQuote } from '../../lib/quote'
import { AnchorButton, Button, InstagramIcon, WhatsAppIcon } from '../ui'
import { Logo, navItems } from './Header'

export function Footer() {
  const { openQuote } = useQuote()
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-go-500/20 blur-[120px]" />
      <div className="grid-lines pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-go-400 uppercase">3 · 2 · 1 ·</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.02] font-semibold text-white sm:text-6xl">
              Sua próxima história começa no{' '}
              <motion.span
                className="text-gradient inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                GO!
              </motion.span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => openQuote({ source: 'rodape' })}>
              Solicitar orçamento <ArrowRight className="size-5 transition group-hover/btn:translate-x-1" />
            </Button>
            <AnchorButton size="lg" variant="glass" href={whatsappLink()}>
              <WhatsAppIcon className="size-5" /> WhatsApp
            </AnchorButton>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">{company.slogan}</p>
            <div className="mt-6 flex gap-2">
              <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="glass grid size-11 place-items-center rounded-full text-white transition hover:bg-go-500">
                <InstagramIcon className="size-5" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="glass grid size-11 place-items-center rounded-full text-white transition hover:bg-[#25d366]">
                <WhatsAppIcon className="size-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Navegação</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="transition hover:text-go-400">
                    {i.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/area-do-cliente" className="transition hover:text-go-400">
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Viagens</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {tripCategories.slice(0, 10).map((c) => (
                <li key={c}>
                  <button type="button" onClick={() => openQuote({ service: 'pacote', source: 'rodape', notes: `Interesse: ${c}` })} className="cursor-pointer text-left transition hover:text-go-400">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Contato</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-go-400" />
                <span>
                  {company.address.street} — {company.address.district}
                  <br />
                  {company.address.city} · CEP {company.address.zip}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-4 shrink-0 text-go-400" />
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 shrink-0 text-go-400" />
                <a href={`mailto:${company.email}`} className="break-all hover:text-white">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName} · CNPJ {company.cnpj}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacidade" className="hover:text-white">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-white">
              Termos de Uso
            </Link>
            <Link to="/painel" className="hover:text-white">
              Painel do consultor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30 [animation-duration:2.4s]" />
      <WhatsAppIcon className="relative size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-ink-900 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
        Fale com a gente
      </span>
    </motion.a>
  )
}
