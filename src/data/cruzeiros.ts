export type TipoDaParada = 'porto' | 'mar' | 'cenico'

export interface Parada {
  dia: number
  tipo: TipoDaParada
  nome: string
  pais?: string
  lat?: number
  lon?: number
  texto: string
}

export interface Roteiro {
  id: string
  regiao: string
  titulo: string
  resumo: string
  temporada: string
  documentos: string
  paradas: Parada[]
}

export const roteiros: Roteiro[] = [
  {
    id: 'costa-brasileira',
    regiao: 'Costa brasileira',
    titulo: 'Litoral do Brasil',
    resumo: 'Saída de Santos sem passaporte, com praias da Bahia e do Rio de Janeiro no mesmo roteiro.',
    temporada: 'Novembro a abril',
    documentos: 'RG ou CNH dentro da validade. Menores de idade seguem as regras de autorização de viagem.',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Santos', pais: 'SP', lat: -23.96, lon: -46.33, texto: 'Embarque no Concais, o terminal de passageiros do porto de Santos.' },
      { dia: 2, tipo: 'mar', nome: 'Navegação', texto: 'Dia inteiro a bordo para aproveitar piscinas, spa e shows.' },
      { dia: 3, tipo: 'porto', nome: 'Salvador', pais: 'BA', lat: -12.97, lon: -38.51, texto: 'Pelourinho, Elevador Lacerda e Mercado Modelo a poucos passos do porto.' },
      { dia: 4, tipo: 'porto', nome: 'Ilhéus', pais: 'BA', lat: -14.79, lon: -39.03, texto: 'Terra de Jorge Amado, praias e fazendas de cacau.' },
      { dia: 5, tipo: 'mar', nome: 'Navegação', texto: 'Mais um dia a bordo enquanto o navio desce o litoral.' },
      { dia: 6, tipo: 'porto', nome: 'Búzios', pais: 'RJ', lat: -22.75, lon: -41.88, texto: 'Desembarque de lancha e praias como Ferradura e João Fernandes.' },
      { dia: 7, tipo: 'porto', nome: 'Ilhabela', pais: 'SP', lat: -23.78, lon: -45.36, texto: 'Cachoeiras, trilhas e praias, também com desembarque de lancha.' },
      { dia: 8, tipo: 'porto', nome: 'Santos', pais: 'SP', lat: -23.96, lon: -46.33, texto: 'Desembarque pela manhã.' },
    ],
  },
  {
    id: 'caribe',
    regiao: 'Caribe',
    titulo: 'Caribe Oriental',
    resumo: 'Saída de Miami para ilhas de água azul-turquesa, com Porto Rico, Ilhas Virgens e Bahamas.',
    temporada: 'O ano todo; de junho a novembro é a temporada de furacões',
    documentos: 'Passaporte válido e visto americano de turismo (B1/B2) para embarcar em Miami.',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Miami', pais: 'EUA', lat: 25.77, lon: -80.18, texto: 'Embarque no PortMiami, um dos maiores portos de cruzeiro do mundo.' },
      { dia: 2, tipo: 'mar', nome: 'Navegação', texto: 'Dia no mar rumo ao sudeste.' },
      { dia: 3, tipo: 'mar', nome: 'Navegação', texto: 'Segundo dia a bordo, ótimo para o spa e os toboáguas.' },
      { dia: 4, tipo: 'porto', nome: 'San Juan', pais: 'Porto Rico', lat: 18.47, lon: -66.11, texto: 'Ruas coloridas da Velha San Juan e as fortalezas El Morro e San Cristóbal.' },
      { dia: 5, tipo: 'porto', nome: 'St. Thomas', pais: 'Ilhas Virgens Americanas', lat: 18.34, lon: -64.93, texto: 'Praia de Magens Bay e compras em Charlotte Amalie.' },
      { dia: 6, tipo: 'mar', nome: 'Navegação', texto: 'Volta pelo Atlântico em direção às Bahamas.' },
      { dia: 7, tipo: 'porto', nome: 'Nassau', pais: 'Bahamas', lat: 25.08, lon: -77.35, texto: 'Praias de areia branca e passeios para as ilhas próximas.' },
      { dia: 8, tipo: 'porto', nome: 'Miami', pais: 'EUA', lat: 25.77, lon: -80.18, texto: 'Desembarque pela manhã.' },
    ],
  },
  {
    id: 'mediterraneo',
    regiao: 'Mediterrâneo',
    titulo: 'Mediterrâneo Ocidental',
    resumo: 'Espanha, França e Itália em uma semana, com Roma, Nápoles e a ilha de Maiorca.',
    temporada: 'Maio a outubro',
    documentos: 'Passaporte válido. A consultora confere as regras de entrada da União Europeia na data da viagem.',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Barcelona', pais: 'Espanha', lat: 41.38, lon: 2.18, texto: 'Sagrada Família, Las Ramblas e o Bairro Gótico antes do embarque.' },
      { dia: 2, tipo: 'porto', nome: 'Marselha', pais: 'França', lat: 43.3, lon: 5.37, texto: 'Porto Antigo e passeios para a Provença.' },
      { dia: 3, tipo: 'porto', nome: 'Gênova', pais: 'Itália', lat: 44.41, lon: 8.93, texto: 'Centro histórico medieval e o Aquário de Gênova.' },
      { dia: 4, tipo: 'porto', nome: 'Civitavecchia', pais: 'Itália', lat: 42.09, lon: 11.79, texto: 'Porta de entrada para Roma, a cerca de 1 hora de trem.' },
      { dia: 5, tipo: 'porto', nome: 'Nápoles', pais: 'Itália', lat: 40.84, lon: 14.25, texto: 'Pompeia, Costa Amalfitana e a pizza napolitana.' },
      { dia: 6, tipo: 'mar', nome: 'Navegação', texto: 'Travessia do Mar Tirreno.' },
      { dia: 7, tipo: 'porto', nome: 'Palma de Maiorca', pais: 'Espanha', lat: 39.57, lon: 2.65, texto: 'Catedral de La Seu e as enseadas da ilha.' },
      { dia: 8, tipo: 'porto', nome: 'Barcelona', pais: 'Espanha', lat: 41.38, lon: 2.18, texto: 'Desembarque pela manhã.' },
    ],
  },
  {
    id: 'fiordes',
    regiao: 'Norte da Europa e fiordes',
    titulo: 'Fiordes noruegueses',
    resumo: 'Paredões de rocha, cachoeiras e vilarejos coloridos, com dias longos no verão europeu.',
    temporada: 'Maio a setembro',
    documentos: 'Passaporte válido. Noruega e Alemanha fazem parte do Espaço Schengen.',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Kiel', pais: 'Alemanha', lat: 54.32, lon: 10.14, texto: 'Embarque no norte da Alemanha, a cerca de 1h30 de Hamburgo.' },
      { dia: 2, tipo: 'mar', nome: 'Navegação', texto: 'Travessia do Mar do Norte.' },
      { dia: 3, tipo: 'porto', nome: 'Stavanger', pais: 'Noruega', lat: 58.97, lon: 5.73, texto: 'Ponto de partida para o Preikestolen, o Púlpito sobre o Lysefjord.' },
      { dia: 4, tipo: 'porto', nome: 'Flåm', pais: 'Noruega', lat: 60.86, lon: 7.11, texto: 'Ferrovia de Flåm, uma das mais íngremes do mundo, no Sognefjord.' },
      { dia: 5, tipo: 'porto', nome: 'Geiranger', pais: 'Noruega', lat: 62.1, lon: 7.21, texto: 'Fiorde que é Patrimônio Mundial da Unesco e as cachoeiras Sete Irmãs.' },
      { dia: 6, tipo: 'porto', nome: 'Bergen', pais: 'Noruega', lat: 60.39, lon: 5.32, texto: 'Casas coloridas de Bryggen e o funicular do monte Fløyen.' },
      { dia: 7, tipo: 'mar', nome: 'Navegação', texto: 'Volta pelo Mar do Norte.' },
      { dia: 8, tipo: 'porto', nome: 'Kiel', pais: 'Alemanha', lat: 54.32, lon: 10.14, texto: 'Desembarque pela manhã.' },
    ],
  },
  {
    id: 'fluvial',
    regiao: 'Fluvial (rios da Europa)',
    titulo: 'Danúbio fluvial',
    resumo: 'Navios menores que atracam no centro das cidades, de Budapeste a Passau.',
    temporada: 'Março a dezembro; em dezembro, mercados de Natal',
    documentos: 'Passaporte válido. Todos os países do roteiro fazem parte do Espaço Schengen.',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Budapeste', pais: 'Hungria', lat: 47.5, lon: 19.04, texto: 'Parlamento às margens do Danúbio e banhos termais.' },
      { dia: 2, tipo: 'porto', nome: 'Bratislava', pais: 'Eslováquia', lat: 48.15, lon: 17.11, texto: 'Centro antigo compacto e o castelo sobre o rio.' },
      { dia: 3, tipo: 'porto', nome: 'Viena', pais: 'Áustria', lat: 48.21, lon: 16.37, texto: 'Palácio de Schönbrunn, cafés tradicionais e concertos.' },
      { dia: 4, tipo: 'porto', nome: 'Dürnstein', pais: 'Áustria', lat: 48.4, lon: 15.52, texto: 'Vale do Wachau, vinhedos e as ruínas do castelo.' },
      { dia: 5, tipo: 'porto', nome: 'Melk', pais: 'Áustria', lat: 48.23, lon: 15.33, texto: 'Abadia beneditina barroca no alto do rio.' },
      { dia: 6, tipo: 'porto', nome: 'Linz', pais: 'Áustria', lat: 48.31, lon: 14.29, texto: 'Centro histórico e o museu Ars Electronica.' },
      { dia: 7, tipo: 'porto', nome: 'Passau', pais: 'Alemanha', lat: 48.57, lon: 13.43, texto: 'A cidade dos três rios e a catedral de Santo Estêvão. Desembarque.' },
    ],
  },
  {
    id: 'patagonia',
    regiao: 'América do Sul e Patagônia',
    titulo: 'Patagônia e Cabo Horn',
    resumo: 'De Buenos Aires a Valparaíso contornando o fim do continente, com geleiras e fauna marinha.',
    temporada: 'Novembro a março',
    documentos: 'RG ou passaporte válido para Argentina, Uruguai e Chile.',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Buenos Aires', pais: 'Argentina', lat: -34.6, lon: -58.37, texto: 'Tango em San Telmo e o Caminito, em La Boca.' },
      { dia: 2, tipo: 'porto', nome: 'Montevidéu', pais: 'Uruguai', lat: -34.91, lon: -56.21, texto: 'Cidade Velha e o Mercado del Puerto.' },
      { dia: 3, tipo: 'mar', nome: 'Navegação', texto: 'Descida pelo Atlântico Sul.' },
      { dia: 4, tipo: 'porto', nome: 'Puerto Madryn', pais: 'Argentina', lat: -42.77, lon: -65.04, texto: 'Península Valdés, com leões e elefantes-marinhos.' },
      { dia: 5, tipo: 'mar', nome: 'Navegação', texto: 'Dia no mar rumo ao sul.' },
      { dia: 6, tipo: 'mar', nome: 'Navegação', texto: 'Último dia antes da Terra do Fogo.' },
      { dia: 7, tipo: 'porto', nome: 'Ushuaia', pais: 'Argentina', lat: -54.8, lon: -68.3, texto: 'A cidade mais austral do mundo e o Canal de Beagle.' },
      { dia: 8, tipo: 'cenico', nome: 'Cabo Horn', pais: 'Chile', lat: -55.98, lon: -67.27, texto: 'Navegação pelo ponto mais ao sul das Américas, se o tempo permitir.' },
      { dia: 9, tipo: 'porto', nome: 'Punta Arenas', pais: 'Chile', lat: -53.16, lon: -70.91, texto: 'Estreito de Magalhães e colônias de pinguins nas ilhas próximas.' },
      { dia: 10, tipo: 'cenico', nome: 'Fiordes chilenos', pais: 'Chile', lat: -49.8, lon: -74.6, texto: 'Navegação entre canais e geleiras.' },
      { dia: 11, tipo: 'mar', nome: 'Navegação', texto: 'Subida pelo Pacífico.' },
      { dia: 12, tipo: 'porto', nome: 'Puerto Montt', pais: 'Chile', lat: -41.47, lon: -72.94, texto: 'Vulcões, lagos e a porta de entrada da Patagônia chilena.' },
      { dia: 13, tipo: 'mar', nome: 'Navegação', texto: 'Último dia a bordo.' },
      { dia: 14, tipo: 'porto', nome: 'Valparaíso', pais: 'Chile', lat: -33.05, lon: -71.62, texto: 'Cerros coloridos e funiculares; Santiago fica a cerca de 1h30. Desembarque.' },
    ],
  },
  {
    id: 'alasca',
    regiao: 'Alasca',
    titulo: 'Passagem Interior do Alasca',
    resumo: 'Geleiras, baleias e cidades da corrida do ouro, com saída de Seattle.',
    temporada: 'Maio a setembro',
    documentos: 'Passaporte válido e visto americano. A parada no Canadá pode exigir autorização eletrônica (eTA).',
    paradas: [
      { dia: 1, tipo: 'porto', nome: 'Seattle', pais: 'EUA', lat: 47.6, lon: -122.34, texto: 'Pike Place Market e a Space Needle antes do embarque.' },
      { dia: 2, tipo: 'mar', nome: 'Navegação', texto: 'Subida pela costa do Pacífico.' },
      { dia: 3, tipo: 'porto', nome: 'Juneau', pais: 'Alasca', lat: 58.3, lon: -134.42, texto: 'Capital do Alasca, com a geleira Mendenhall e observação de baleias.' },
      { dia: 4, tipo: 'porto', nome: 'Skagway', pais: 'Alasca', lat: 59.46, lon: -135.31, texto: 'Trem histórico White Pass, dos tempos da corrida do ouro.' },
      { dia: 5, tipo: 'cenico', nome: 'Glacier Bay', pais: 'Alasca', lat: 58.67, lon: -136.9, texto: 'Parque nacional navegado entre geleiras que chegam ao mar.' },
      { dia: 6, tipo: 'porto', nome: 'Ketchikan', pais: 'Alasca', lat: 55.34, lon: -131.64, texto: 'Totens indígenas e a Creek Street sobre palafitas.' },
      { dia: 7, tipo: 'porto', nome: 'Victoria', pais: 'Canadá', lat: 48.43, lon: -123.37, texto: 'Capital da Colúmbia Britânica e os Jardins Butchart.' },
      { dia: 8, tipo: 'porto', nome: 'Seattle', pais: 'EUA', lat: 47.6, lon: -122.34, texto: 'Desembarque pela manhã.' },
    ],
  },
]

export interface Cabine {
  id: string
  nome: string
  area: string
  texto: string
  ideal: string
}

export const cabines: Cabine[] = [
  { id: 'interna', nome: 'Interna', area: '12 a 16 m²', texto: 'Sem janela. É a tarifa mais econômica do navio.', ideal: 'Para quem passa o dia fora da cabine e só volta para dormir.' },
  { id: 'externa', nome: 'Vista mar', area: '14 a 18 m²', texto: 'Janela ou escotilha para o mar, com luz natural.', ideal: 'Para acordar vendo o mar sem pagar por uma varanda.' },
  { id: 'varanda', nome: 'Varanda', area: '16 a 22 m² + varanda', texto: 'Varanda privativa com cadeiras e mesa.', ideal: 'Vale o investimento em roteiros de paisagem, como fiordes e Alasca.' },
  { id: 'suite', nome: 'Suíte', area: 'a partir de 25 m²', texto: 'Sala de estar e, em muitos navios, áreas e serviços exclusivos.', ideal: 'Para lua de mel, datas especiais e famílias que querem espaço.' },
]

export interface AreaDoNavio {
  id: string
  nome: string
  texto: string
}

export const areasDoNavio: AreaDoNavio[] = [
  { id: 'ponte', nome: 'Ponte de comando', texto: 'De onde o comandante e a tripulação conduzem o navio, com visão de 180° do mar.' },
  { id: 'piscinas', nome: 'Piscinas e toboáguas', texto: 'Piscinas, hidromassagens, toboáguas e bares ao ar livre no deck mais alto.' },
  { id: 'spa', nome: 'Spa e academia', texto: 'Massagens, saunas e academia com vista para o mar. Os tratamentos são pagos à parte.' },
  { id: 'teatro', nome: 'Teatro', texto: 'Shows e musicais todas as noites, já incluídos na tarifa.' },
  { id: 'restaurantes', nome: 'Restaurantes', texto: 'Restaurante principal e bufê incluídos; os restaurantes de especialidade são pagos à parte.' },
  { id: 'cabines', nome: 'Cabines', texto: 'Internas, vista mar, com varanda e suítes, distribuídas por vários decks.' },
  { id: 'kids', nome: 'Clube infantil', texto: 'Atividades com monitores para crianças e adolescentes, separadas por idade.' },
  { id: 'botes', nome: 'Botes e segurança', texto: 'Todo hóspede participa do treinamento de segurança antes da partida.' },
]

export const inclusos = ['Cabine e arrumação diária', 'Refeições no restaurante principal e no bufê', 'Shows no teatro', 'Piscinas, academia e atividades a bordo', 'Clube infantil']
export const aParte = ['Taxas portuárias e taxa de serviço', 'Bebidas e pacotes de bebidas', 'Excursões em terra', 'Restaurantes de especialidade e spa', 'Internet a bordo']

export const faixasDeNoites = ['3 a 4 noites', '5 a 7 noites', '8 a 12 noites', '13 noites ou mais']

export function noitesDoRoteiro(r: Roteiro) {
  return r.paradas[r.paradas.length - 1].dia - 1
}

export function portosDoRoteiro(r: Roteiro) {
  return new Set(r.paradas.filter((p) => p.tipo === 'porto').map((p) => p.nome)).size
}

export function coordenada(valor: number, eixo: 'lat' | 'lon') {
  const abs = Math.abs(valor)
  const graus = Math.floor(abs)
  const minutos = Math.round((abs - graus) * 60)
  const lado = eixo === 'lat' ? (valor < 0 ? 'S' : 'N') : valor < 0 ? 'W' : 'E'
  return `${graus}°${String(minutos).padStart(2, '0')}′${lado}`
}
