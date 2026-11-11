import { REDE } from './unidade'

const CARBY_URL = ((import.meta.env?.VITE_CARBY_URL as string | undefined)?.trim() || 'https://carby.gniall.com.br').replace(/\/+$/, '')

export type FotoDoPacote = { url: string; url_miniatura: string | null; largura: number | null; altura: number | null }

export type PacoteDoSite = {
  id: string
  codigo: string
  titulo: string
  destino: string
  descricao: string | null
  tipo: string
  preco_por_pessoa: number | null
  moeda: 'BRL' | 'USD' | 'EUR'
  duracao_dias: number | null
  duracao_noites: number | null
  saida_cidade: string | null
  data_ida: string | null
  data_volta: string | null
  validade: string | null
  inclui: string[]
  nao_inclui: string | null
  condicoes_pagamento: string | null
  fotos: FotoDoPacote[]
}

export type UnidadeDoSite = {
  endereco: string
  nome: string
  frase_destaque: string | null
  sobre: string | null
  especialidades: string[]
  consultores: string | null
  whatsapp: string | null
  telefone: string | null
  email: string | null
  horario: string | null
  tipo_atendimento: 'presencial' | 'online' | 'presencial_online' | null
  cep: string | null
  logradouro: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cidade: string | null
  uf: string | null
  maps_url: string | null
  instagram: string | null
  facebook: string | null
  tiktok: string | null
  youtube: string | null
  site_proprio: string | null
  razao_social: string | null
  cnpj: string | null
  cadastur: string | null
  recebe_orcamento: boolean
}

export type MarcaDoSite = { nome: string | null; cor_primaria: string | null; cor_secundaria: string | null; logo_url: string | null; fundo_url: string | null }

export type SiteDaUnidade = { unidade: UnidadeDoSite; marca: MarcaDoSite | null; pacotes: PacoteDoSite[] }

export type ResultadoDoOrcamento = { ok: true; protocolo: string | null } | { ok: false; motivo: 'unidade' | 'sem_destino' | 'dados' | 'limite' }

export type PedidoDeOrcamento = {
  nome: string
  whatsapp: string
  email: string
  resumo: string
  protocolo: string
  pagina: string
  dados: unknown
}

async function chamar<T>(funcao: string, corpo: Record<string, unknown>): Promise<T> {
  const resposta = await fetch(`${CARBY_URL}/rest/v1/rpc/${funcao}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(corpo),
  })
  if (!resposta.ok) throw new Error(`Falha ao falar com o Carby (${resposta.status})`)
  return (await resposta.json()) as T
}

export function buscarSiteDaUnidade(endereco: string) {
  return chamar<SiteDaUnidade | null>('site_da_unidade', { p_rede: REDE, p_endereco: endereco })
}

export function enviarOrcamentoAoCarby(endereco: string, pedido: PedidoDeOrcamento) {
  return chamar<ResultadoDoOrcamento>('site_enviar_orcamento', {
    p_rede: REDE,
    p_endereco: endereco,
    p_nome: pedido.nome.trim().slice(0, 120),
    p_whatsapp: pedido.whatsapp,
    p_email: pedido.email.trim() || null,
    p_resumo: pedido.resumo.slice(0, 8000),
    p_protocolo: pedido.protocolo,
    p_pagina: pedido.pagina.slice(0, 300),
    p_dados: pedido.dados,
  })
}
