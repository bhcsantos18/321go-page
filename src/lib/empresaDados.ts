import { company } from '../data/company'
import type { PacoteDoSite, SiteDaUnidade, UnidadeDoSite } from './carby'

export type EnderecoPostal = { street: string; district: string; city: string; zip: string }

export type DadosLegais = { name: string; cnpj: string; address: EnderecoPostal | null }

export type EstadoDaUnidade = 'rede' | 'carregando' | 'unidade' | 'nao-encontrada'

export type RedeSocial = { rede: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'site'; rotulo: string; url: string }

export type Empresa = {
  estado: EstadoDaUnidade
  name: string
  nomeCurto: string
  slogan: string
  phone: string
  whatsapp: string
  email: string
  instagram: string
  instagramHandle: string
  address: EnderecoPostal | null
  legal: DadosLegais
  redes: RedeSocial[]
  unidade: UnidadeDoSite | null
  pacotes: PacoteDoSite[]
  recebeOrcamento: boolean
}

const MENSAGEM_PADRAO = 'Olá! Vim pelo site da 3,2,1 GO e gostaria de atendimento.'

export const soDigitos = (texto: string) => texto.replace(/\D/g, '')

export function telefoneParaExibir(digitos: string): string {
  const nacional = digitos.startsWith('55') && digitos.length >= 12 ? digitos.slice(2) : digitos
  if (nacional.length === 11) return `(${nacional.slice(0, 2)}) ${nacional.slice(2, 7)}-${nacional.slice(7)}`
  if (nacional.length === 10) return `(${nacional.slice(0, 2)}) ${nacional.slice(2, 6)}-${nacional.slice(6)}`
  return digitos
}

export function formatarCnpj(digitos: string): string {
  const d = soDigitos(digitos)
  return d.length === 14 ? `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}` : digitos
}

export function formatarCep(digitos: string): string {
  const d = soDigitos(digitos)
  return d.length === 8 ? `${d.slice(0, 5)}-${d.slice(5)}` : digitos
}

export function nomeCurtoDaUnidade(nome: string): string {
  const curto = nome.replace(/^\s*(3\s*,?\s*2\s*,?\s*1\s*go!?|321\s*go!?)\s*[-–—:·]?\s*/i, '').trim()
  return curto || nome.trim()
}

function semProtocolo(valor: string) {
  return valor.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/+$/, '')
}

export function linkDaRede(rede: RedeSocial['rede'], valor: string | null): string | null {
  const texto = (valor || '').trim()
  if (!texto) return null
  if (/^https?:\/\//i.test(texto)) return texto
  const usuario = texto.replace(/^@/, '')
  const caminho = semProtocolo(texto)
  switch (rede) {
    case 'instagram':
      return caminho.includes('instagram.com') ? `https://${caminho}` : `https://www.instagram.com/${usuario}`
    case 'tiktok':
      return caminho.includes('tiktok.com') ? `https://${caminho}` : `https://www.tiktok.com/@${usuario}`
    case 'facebook':
      return caminho.includes('facebook.com') ? `https://${caminho}` : `https://www.facebook.com/${usuario}`
    case 'youtube':
      return caminho.includes('youtube.com') || caminho.includes('youtu.be') ? `https://${caminho}` : `https://www.youtube.com/@${usuario}`
    default:
      return `https://${caminho}`
  }
}

export function arrobaDoInstagram(valor: string | null): string | null {
  const link = linkDaRede('instagram', valor)
  if (!link) return null
  const usuario = link.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').split(/[/?#]/)[0]
  return usuario ? `@${usuario}` : null
}

function enderecoDaUnidade(u: UnidadeDoSite): EnderecoPostal | null {
  if (!u.logradouro && !u.cidade) return null
  const rua = [u.logradouro, u.numero].filter(Boolean).join(', ')
  return {
    street: [rua, u.complemento].filter(Boolean).join(' · '),
    district: u.bairro || '',
    city: [u.cidade, u.uf].filter(Boolean).join(' / '),
    zip: u.cep ? formatarCep(u.cep) : '',
  }
}

export function linhasDoEndereco(endereco: EnderecoPostal): [string, string] {
  return [
    [endereco.street, endereco.district].filter(Boolean).join(' — '),
    [endereco.city, endereco.zip && `CEP ${endereco.zip}`].filter(Boolean).join(' · '),
  ]
}

export function empresaDaRede(estado: EstadoDaUnidade = 'rede'): Empresa {
  return {
    estado,
    name: company.name,
    nomeCurto: company.name,
    slogan: company.slogan,
    phone: company.phone,
    whatsapp: company.whatsapp,
    email: company.email,
    instagram: company.instagram,
    instagramHandle: company.instagramHandle,
    address: company.address,
    legal: { name: company.legalName, cnpj: company.cnpj, address: company.address },
    redes: [{ rede: 'instagram', rotulo: company.instagramHandle, url: company.instagram }],
    unidade: null,
    pacotes: [],
    recebeOrcamento: false,
  }
}

export function montarEmpresa(site: SiteDaUnidade): Empresa {
  const u = site.unidade
  const rede = empresaDaRede('unidade')
  const whatsapp = u.whatsapp || rede.whatsapp
  const instagram = linkDaRede('instagram', u.instagram)
  const endereco = enderecoDaUnidade(u)
  const redes: RedeSocial[] = (
    [
      ['instagram', arrobaDoInstagram(u.instagram) || 'Instagram', instagram],
      ['facebook', 'Facebook', linkDaRede('facebook', u.facebook)],
      ['tiktok', 'TikTok', linkDaRede('tiktok', u.tiktok)],
      ['youtube', 'YouTube', linkDaRede('youtube', u.youtube)],
      ['site', 'Site', linkDaRede('site', u.site_proprio)],
    ] as [RedeSocial['rede'], string, string | null][]
  )
    .filter(([, , url]) => url)
    .map(([redeSocial, rotulo, url]) => ({ rede: redeSocial, rotulo, url: url as string }))

  return {
    ...rede,
    name: u.nome,
    nomeCurto: nomeCurtoDaUnidade(u.nome),
    slogan: u.frase_destaque || rede.slogan,
    phone: u.telefone || (u.whatsapp ? telefoneParaExibir(u.whatsapp) : rede.phone),
    whatsapp,
    email: u.email || rede.email,
    instagram: instagram || rede.instagram,
    instagramHandle: arrobaDoInstagram(u.instagram) || rede.instagramHandle,
    address: endereco,
    legal: u.razao_social && u.cnpj ? { name: u.razao_social, cnpj: formatarCnpj(u.cnpj), address: endereco } : rede.legal,
    redes: redes.length ? redes : rede.redes,
    unidade: u,
    pacotes: site.pacotes || [],
    recebeOrcamento: u.recebe_orcamento === true,
  }
}

export function linkDoWhatsapp(numero: string, mensagem = MENSAGEM_PADRAO): string {
  return `https://wa.me/${soDigitos(numero)}?text=${encodeURIComponent(mensagem)}`
}
