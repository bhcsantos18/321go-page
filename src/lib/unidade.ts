const CHAVE_DA_UNIDADE = 'go321:unidade'
const ENDERECO_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/

export const REDE = (import.meta.env?.VITE_REDE as string | undefined)?.trim() || '321go'
export const DOMINIO_DA_REDE = (import.meta.env?.VITE_DOMINIO_DA_REDE as string | undefined)?.trim().toLowerCase() || '321go.com.br'

type Armazenamento = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export function enderecoDoHost(host: string, dominio = DOMINIO_DA_REDE): string | null {
  const nome = host.toLowerCase().replace(/:\d+$/, '')
  if (!nome.endsWith(`.${dominio}`)) return null
  const sub = nome.slice(0, -(dominio.length + 1))
  if (!sub || sub === 'www' || sub.includes('.')) return null
  return ENDERECO_VALIDO.test(sub) ? sub : null
}

export function enderecoDaUnidade(host: string, busca: string, armazenamento: Armazenamento | null): string | null {
  const doHost = enderecoDoHost(host)
  if (doHost) return doHost

  const pedido = new URLSearchParams(busca).get('unidade')
  if (pedido !== null) {
    const endereco = pedido.trim().toLowerCase()
    const valido = ENDERECO_VALIDO.test(endereco) && endereco.length <= 40
    try {
      if (valido) armazenamento?.setItem(CHAVE_DA_UNIDADE, endereco)
      else armazenamento?.removeItem(CHAVE_DA_UNIDADE)
    } catch {
      return valido ? endereco : null
    }
    return valido ? endereco : null
  }

  try {
    const guardado = armazenamento?.getItem(CHAVE_DA_UNIDADE) ?? null
    return guardado && ENDERECO_VALIDO.test(guardado) ? guardado : null
  } catch {
    return null
  }
}

export function enderecoDestaVisita(): string | null {
  let armazenamento: Armazenamento | null = null
  try {
    armazenamento = window.sessionStorage
  } catch {
    armazenamento = null
  }
  return enderecoDaUnidade(window.location.hostname, window.location.search, armazenamento)
}
