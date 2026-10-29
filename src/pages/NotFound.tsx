import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Aurora } from '../components/Hero'
import { LinkButton } from '../components/ui'

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-ink-950 px-4 text-center text-white">
      <Aurora className="-z-10" intense />
      <div>
        <motion.p initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 12 }} className="text-gradient font-display text-[8rem] leading-none font-bold sm:text-[12rem]">
          404
        </motion.p>
        <h1 className="mt-4 text-3xl font-semibold">Esse destino ainda não está no mapa</h1>
        <p className="mt-3 text-ink-300">A página que você procura não existe ou mudou de lugar.</p>
        <LinkButton to="/" size="lg" className="mt-8">
          <ArrowLeft className="size-5" /> Voltar ao início
        </LinkButton>
      </div>
    </section>
  )
}
