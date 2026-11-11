import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { buscarSiteDaUnidade, type SiteDaUnidade } from './carby'
import { empresaDaRede, linkDoWhatsapp, montarEmpresa, type Empresa } from './empresaDados'
import { enderecoDestaVisita } from './unidade'

type ValorDaEmpresa = Empresa & { endereco: string | null; whatsappLink: (mensagem?: string) => string }

const TITULO_DA_REDE = document.title

const Contexto = createContext<ValorDaEmpresa | null>(null)

export function EmpresaProvider({ children }: { children: ReactNode }) {
  const [endereco] = useState(enderecoDestaVisita)
  const [resultado, setResultado] = useState<{ site: SiteDaUnidade | null } | null>(null)

  useEffect(() => {
    if (!endereco) return
    let ativo = true
    buscarSiteDaUnidade(endereco)
      .then((site) => {
        if (ativo) setResultado({ site })
      })
      .catch(() => {
        if (ativo) setResultado({ site: null })
      })
    return () => {
      ativo = false
    }
  }, [endereco])

  const valor = useMemo<ValorDaEmpresa>(() => {
    const empresa = !endereco ? empresaDaRede() : !resultado ? empresaDaRede('carregando') : resultado.site ? montarEmpresa(resultado.site) : empresaDaRede('nao-encontrada')
    return { ...empresa, endereco, whatsappLink: (mensagem?: string) => linkDoWhatsapp(empresa.whatsapp, mensagem) }
  }, [endereco, resultado])

  useEffect(() => {
    document.title = valor.unidade ? `${valor.name} — 3,2,1 GO! Viagens` : TITULO_DA_REDE
  }, [valor.unidade, valor.name])

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

export function useEmpresa(): ValorDaEmpresa {
  const valor = useContext(Contexto)
  if (!valor) throw new Error('useEmpresa precisa estar dentro de <EmpresaProvider>')
  return valor
}
