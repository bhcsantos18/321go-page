// Gerado a partir de dados do OpenStreetMap (© colaboradores do OpenStreetMap, ODbL)
// com curadoria e descrições da equipe. Para editar, altere os itens abaixo.
import type { Poi } from './types'

export const parkBounds: Record<string, [[number, number], [number, number]]> = {
  'magic-kingdom': [[28.4148969, -81.5869975], [28.4232773, -81.5758593]],
  'epcot': [[28.3662488, -81.5544334], [28.3766564, -81.5429857]],
  'hollywood-studios': [[28.3525322, -81.5637875], [28.3620618, -81.5563928]],
  'animal-kingdom': [[28.3526551, -81.5981767], [28.3689118, -81.5833743]],
  'universal-studios': [[28.4728287, -81.47355], [28.4816483, -81.464924]],
  'islands-of-adventure': [[28.468597, -81.4746409], [28.4751517, -81.4672512]],
  'epic-universe': [[28.4372625, -81.4529484], [28.4497431, -81.4425336]],
  'seaworld': [[28.4029064, -81.4702184], [28.4186039, -81.4535524]],
  'busch-gardens': [[28.0327317, -82.426068], [28.0434821, -82.4164512]],
}

export const pois: Poi[] = [
  {
    "id": "cinderella-castle",
    "park": "magic-kingdom",
    "n": 1,
    "name": "Cinderella Castle",
    "category": "atracao",
    "lat": 28.419502,
    "lng": -81.581179,
    "area": "Main Street, U.S.A.",
    "intensity": "Leve",
    "description": "O ícone do parque e palco do espetáculo noturno de fogos e projeções. Ponto de encontro clássico para as melhores fotos da viagem.",
    "tags": [
      "Imperdível",
      "Fotos",
      "Show"
    ],
    "tip": "Para ver os fogos com calma, garanta lugar na Main Street uns 40 minutos antes."
  },
  {
    "id": "tron-lightcycle-run",
    "park": "magic-kingdom",
    "n": 2,
    "name": "TRON Lightcycle / Run",
    "category": "atracao",
    "lat": 28.420514,
    "lng": -81.57672,
    "area": "Tomorrowland",
    "intensity": "Radical",
    "description": "Montanha-russa em que você pilota uma lightcycle em alta velocidade, com lançamento e trecho ao ar livre sob um dossel iluminado.",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ],
    "tip": "Costuma operar com fila virtual ou Lightning Lane. Planeje logo na abertura do parque."
  },
  {
    "id": "space-mountain",
    "park": "magic-kingdom",
    "n": 3,
    "name": "Space Mountain",
    "category": "atracao",
    "lat": 28.41915,
    "lng": -81.577248,
    "area": "Tomorrowland",
    "intensity": "Radical",
    "description": "Montanha-russa clássica no escuro, que simula uma viagem pelo espaço sideral.",
    "tags": [
      "Adrenalina",
      "Clássico"
    ]
  },
  {
    "id": "big-thunder-mountain-railroad",
    "park": "magic-kingdom",
    "n": 4,
    "name": "Big Thunder Mountain Railroad",
    "category": "atracao",
    "lat": 28.420306,
    "lng": -81.584725,
    "area": "Frontierland",
    "intensity": "Moderada",
    "description": "Um trem desgovernado atravessa uma mina do Velho Oeste. Divertida para toda a família.",
    "tags": [
      "Família",
      "Clássico"
    ],
    "tip": "À noite, com as luzes acesas, a experiência fica ainda mais bonita."
  },
  {
    "id": "tiana-s-bayou-adventure",
    "park": "magic-kingdom",
    "n": 5,
    "name": "Tiana's Bayou Adventure",
    "category": "atracao",
    "lat": 28.419098,
    "lng": -81.5846,
    "area": "Frontierland",
    "intensity": "Moderada",
    "description": "Passeio de tronco pelos pântanos da Louisiana com a princesa Tiana, música ao vivo e uma queda final molhada.",
    "tags": [
      "Família",
      "Água"
    ],
    "tip": "Leve uma capa de chuva ou roupa extra: a queda molha de verdade."
  },
  {
    "id": "pirates-of-the-caribbean",
    "park": "magic-kingdom",
    "n": 6,
    "name": "Pirates of the Caribbean",
    "category": "atracao",
    "lat": 28.418038,
    "lng": -81.584231,
    "area": "Adventureland",
    "intensity": "Leve",
    "description": "Passeio de barco por batalhas, vilas e tesouros dos piratas mais famosos da Disney.",
    "tags": [
      "Família",
      "Clássico"
    ]
  },
  {
    "id": "the-haunted-mansion",
    "park": "magic-kingdom",
    "n": 7,
    "name": "The Haunted Mansion",
    "category": "atracao",
    "lat": 28.420849,
    "lng": -81.582905,
    "area": "Liberty Square",
    "intensity": "Leve",
    "description": "A mansão mal-assombrada com 999 fantasmas felizes. Mais divertida do que assustadora.",
    "tags": [
      "Família",
      "Clássico"
    ]
  },
  {
    "id": "peter-pan-s-flight",
    "park": "magic-kingdom",
    "n": 8,
    "name": "Peter Pan's Flight",
    "category": "atracao",
    "lat": 28.420154,
    "lng": -81.581999,
    "area": "Fantasyland",
    "intensity": "Leve",
    "description": "Voe em um navio pirata sobre Londres até a Terra do Nunca. Uma das filas mais disputadas do parque.",
    "tags": [
      "Crianças",
      "Clássico"
    ],
    "tip": "Faça logo cedo ou use Lightning Lane: a fila cresce rápido."
  },
  {
    "id": "it-s-a-small-world",
    "park": "magic-kingdom",
    "n": 9,
    "name": "\"it's a small world\"",
    "category": "atracao",
    "lat": 28.420796,
    "lng": -81.58204,
    "area": "Fantasyland",
    "intensity": "Leve",
    "description": "Passeio de barco por bonecos de culturas do mundo todo, embalado pela canção mais famosa da Disney.",
    "tags": [
      "Crianças",
      "Família"
    ]
  },
  {
    "id": "buzz-lightyear-s-space-ranger-spin",
    "park": "magic-kingdom",
    "n": 10,
    "name": "Buzz Lightyear's Space Ranger Spin",
    "category": "atracao",
    "lat": 28.418016,
    "lng": -81.579777,
    "area": "Tomorrowland",
    "intensity": "Leve",
    "description": "Use blasters a laser contra o Imperador Zurg e dispute pontos com a família.",
    "tags": [
      "Crianças",
      "Interativo"
    ]
  },
  {
    "id": "under-the-sea-journey-of-the-little-mermaid",
    "park": "magic-kingdom",
    "n": 11,
    "name": "Under the Sea: Journey of the Little Mermaid",
    "category": "atracao",
    "lat": 28.421332,
    "lng": -81.579883,
    "area": "Fantasyland",
    "intensity": "Leve",
    "description": "Mergulhe na história da Pequena Sereia em conchas que passeiam por cenários submarinos.",
    "tags": [
      "Crianças"
    ]
  },
  {
    "id": "be-our-guest-restaurant",
    "park": "magic-kingdom",
    "n": 1,
    "name": "Be Our Guest Restaurant",
    "category": "restaurante",
    "lat": 28.42146,
    "lng": -81.580873,
    "area": "Fantasyland",
    "description": "Jante dentro do castelo da Fera, em salões inspirados em A Bela e a Fera.",
    "tags": [
      "Temático",
      "Reserva"
    ],
    "tip": "Reserve com antecedência: as vagas esgotam rápido."
  },
  {
    "id": "cinderella-s-royal-table",
    "park": "magic-kingdom",
    "n": 2,
    "name": "Cinderella's Royal Table",
    "category": "restaurante",
    "lat": 28.419554,
    "lng": -81.581138,
    "area": "Main Street, U.S.A.",
    "description": "Refeição com princesas dentro do Castelo da Cinderela.",
    "tags": [
      "Personagens",
      "Reserva"
    ]
  },
  {
    "id": "casey-s-corner",
    "park": "magic-kingdom",
    "n": 3,
    "name": "Casey's Corner",
    "category": "restaurante",
    "lat": 28.417939,
    "lng": -81.581329,
    "area": "Main Street, U.S.A.",
    "description": "Cachorros-quentes clássicos com vista para o castelo.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "cosmic-ray-s-starlight-cafe",
    "park": "magic-kingdom",
    "n": 4,
    "name": "Cosmic Ray's Starlight Café",
    "category": "restaurante",
    "lat": 28.419349,
    "lng": -81.579888,
    "area": "Tomorrowland",
    "description": "Lanchonete ampla com hambúrgueres e frango, embalada por um alienígena cantor.",
    "tags": [
      "Rápido",
      "Família"
    ]
  },
  {
    "id": "columbia-harbor-house",
    "park": "magic-kingdom",
    "n": 5,
    "name": "Columbia Harbor House",
    "category": "restaurante",
    "lat": 28.419974,
    "lng": -81.582322,
    "area": "Liberty Square",
    "description": "Peixes e frutos do mar num ambiente de casa colonial da Nova Inglaterra.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "emporium",
    "park": "magic-kingdom",
    "n": 1,
    "name": "Emporium",
    "category": "compras",
    "lat": 28.41729,
    "lng": -81.581413,
    "area": "Main Street, U.S.A.",
    "description": "A maior loja do parque: pelúcias, orelhinhas e lembranças de todos os personagens.",
    "tags": [
      "Souvenirs"
    ],
    "tip": "Deixe as compras para o fim do dia e retire na saída."
  },
  {
    "id": "main-street-confectionery",
    "park": "magic-kingdom",
    "n": 2,
    "name": "Main Street Confectionery",
    "category": "compras",
    "lat": 28.417122,
    "lng": -81.581047,
    "area": "Main Street, U.S.A.",
    "description": "Doces feitos na hora, maçãs do amor e guloseimas temáticas.",
    "tags": [
      "Doces"
    ]
  },
  {
    "id": "sir-mickey-s",
    "park": "magic-kingdom",
    "n": 3,
    "name": "Sir Mickey's",
    "category": "compras",
    "lat": 28.419773,
    "lng": -81.580999,
    "area": "Fantasyland",
    "description": "Loja encantada com produtos dos clássicos da Fantasyland.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "spaceship-earth",
    "park": "epcot",
    "n": 1,
    "name": "Spaceship Earth",
    "category": "atracao",
    "lat": 28.375293,
    "lng": -81.549397,
    "area": "World Celebration",
    "intensity": "Leve",
    "description": "A esfera geodésica símbolo do EPCOT, com um passeio pela história da comunicação humana.",
    "tags": [
      "Ícone",
      "Clássico"
    ]
  },
  {
    "id": "guardians-of-the-galaxy-cosmic-rewind",
    "park": "epcot",
    "n": 2,
    "name": "Guardians of the Galaxy: Cosmic Rewind",
    "category": "atracao",
    "lat": 28.37552,
    "lng": -81.546947,
    "area": "World Discovery",
    "intensity": "Radical",
    "description": "Montanha-russa que gira 360° ao som de clássicos dos anos 80. Uma das melhores da Disney.",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ],
    "tip": "Costuma operar com fila virtual. Entre no app no horário de abertura."
  },
  {
    "id": "test-track",
    "park": "epcot",
    "n": 3,
    "name": "Test Track",
    "category": "atracao",
    "lat": 28.372856,
    "lng": -81.547218,
    "area": "World Discovery",
    "intensity": "Moderada",
    "description": "Projete seu carro conceito e teste-o em alta velocidade numa pista que sai do pavilhão.",
    "tags": [
      "Adrenalina",
      "Família"
    ]
  },
  {
    "id": "mission-space",
    "park": "epcot",
    "n": 4,
    "name": "Mission: SPACE",
    "category": "atracao",
    "lat": 28.373901,
    "lng": -81.546716,
    "area": "World Discovery",
    "intensity": "Moderada",
    "description": "Simulador de missão espacial, com versão mais intensa (laranja) e mais suave (verde).",
    "tags": [
      "Simulador"
    ],
    "tip": "Quem enjoa com facilidade deve escolher a versão verde."
  },
  {
    "id": "soarin-around-the-world",
    "park": "epcot",
    "n": 5,
    "name": "Soarin' Around the World",
    "category": "atracao",
    "lat": 28.372853,
    "lng": -81.552699,
    "area": "World Nature",
    "intensity": "Leve",
    "description": "Voo de asa-delta sobre paisagens icônicas do planeta, em tela gigante e com aromas.",
    "tags": [
      "Família",
      "Imperdível"
    ]
  },
  {
    "id": "frozen-ever-after",
    "park": "epcot",
    "n": 6,
    "name": "Frozen Ever After",
    "category": "atracao",
    "lat": 28.370803,
    "lng": -81.546235,
    "area": "World Showcase · Noruega",
    "intensity": "Leve",
    "description": "Passeio de barco por Arendelle com Elsa, Anna e Olaf.",
    "tags": [
      "Crianças",
      "Personagens"
    ]
  },
  {
    "id": "remys-ratatouille-adventure",
    "park": "epcot",
    "n": 7,
    "name": "Remy’s Ratatouille Adventure",
    "category": "atracao",
    "lat": 28.367924,
    "lng": -81.55286,
    "area": "World Showcase · França",
    "intensity": "Leve",
    "description": "Encolha ao tamanho do Remy e corra pela cozinha do Gusteau’s numa aventura em 3D.",
    "tags": [
      "Família",
      "Imperdível"
    ]
  },
  {
    "id": "the-seas-with-nemo-friends",
    "park": "epcot",
    "n": 8,
    "name": "The Seas with Nemo & Friends",
    "category": "atracao",
    "lat": 28.375334,
    "lng": -81.550894,
    "area": "World Nature",
    "intensity": "Leve",
    "description": "Um dos maiores aquários do mundo, com tubarões, raias, golfinhos e tartarugas.",
    "tags": [
      "Família",
      "Animais"
    ]
  },
  {
    "id": "journey-of-water-inspired-by-moana",
    "park": "epcot",
    "n": 9,
    "name": "Journey of Water, Inspired by Moana",
    "category": "atracao",
    "lat": 28.374657,
    "lng": -81.550398,
    "area": "World Nature",
    "intensity": "Leve",
    "description": "Trilha interativa onde a água \"brinca\" com os visitantes, inspirada em Moana.",
    "tags": [
      "Crianças",
      "Água"
    ]
  },
  {
    "id": "pavilhao-do-mexico",
    "park": "epcot",
    "n": 10,
    "name": "Pavilhão do México",
    "category": "atracao",
    "lat": 28.371361,
    "lng": -81.547578,
    "area": "World Showcase · México",
    "intensity": "Leve",
    "description": "Pirâmide maia com mercado ao entardecer e o passeio de barco Gran Fiesta Tour.",
    "tags": [
      "Cultura"
    ]
  },
  {
    "id": "pavilhao-do-japao",
    "park": "epcot",
    "n": 11,
    "name": "Pavilhão do Japão",
    "category": "atracao",
    "lat": 28.36778,
    "lng": -81.550496,
    "area": "World Showcase · Japão",
    "intensity": "Leve",
    "description": "Pagode, jardins e a enorme loja Mitsukoshi num pedacinho do Japão.",
    "tags": [
      "Cultura"
    ]
  },
  {
    "id": "space-220-restaurant",
    "park": "epcot",
    "n": 1,
    "name": "Space 220 Restaurant",
    "category": "restaurante",
    "lat": 28.373385,
    "lng": -81.54639,
    "area": "World Discovery",
    "description": "Restaurante que simula uma estação espacial em órbita, com vista para a Terra.",
    "tags": [
      "Temático",
      "Reserva"
    ]
  },
  {
    "id": "le-cellier-steakhouse",
    "park": "epcot",
    "n": 2,
    "name": "Le Cellier Steakhouse",
    "category": "restaurante",
    "lat": 28.371621,
    "lng": -81.551553,
    "area": "World Showcase · Canadá",
    "description": "Carnes nobres em uma adega de pedra no pavilhão do Canadá.",
    "tags": [
      "Serviço à mesa"
    ]
  },
  {
    "id": "via-napoli-ristorante-e-pizzeria",
    "park": "epcot",
    "n": 3,
    "name": "Via Napoli Ristorante e Pizzeria",
    "category": "restaurante",
    "lat": 28.367175,
    "lng": -81.548071,
    "area": "World Showcase · Itália",
    "description": "Pizza napolitana em forno a lenha, ótima para a família.",
    "tags": [
      "Serviço à mesa",
      "Família"
    ]
  },
  {
    "id": "la-hacienda-de-san-angel",
    "park": "epcot",
    "n": 4,
    "name": "La Hacienda de San Angel",
    "category": "restaurante",
    "lat": 28.371241,
    "lng": -81.547688,
    "area": "World Showcase · México",
    "description": "Cozinha mexicana com vista para a lagoa, ótima para ver os fogos.",
    "tags": [
      "Vista"
    ]
  },
  {
    "id": "les-halles-boulangerie-patisserie",
    "park": "epcot",
    "n": 5,
    "name": "Les Halles Boulangerie & Pâtisserie",
    "category": "restaurante",
    "lat": 28.368461,
    "lng": -81.553043,
    "area": "World Showcase · França",
    "description": "Croissants, quiches e doces franceses para um lanche rápido.",
    "tags": [
      "Rápido",
      "Doces"
    ]
  },
  {
    "id": "creations-shop",
    "park": "epcot",
    "n": 1,
    "name": "Creations Shop",
    "category": "compras",
    "lat": 28.373555,
    "lng": -81.54881,
    "area": "World Celebration",
    "description": "A loja principal do EPCOT, com produtos exclusivos do parque.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "mitsukoshi-department-store",
    "park": "epcot",
    "n": 2,
    "name": "Mitsukoshi Department Store",
    "category": "compras",
    "lat": 28.367218,
    "lng": -81.550603,
    "area": "World Showcase · Japão",
    "description": "Loja de departamentos japonesa com doces, kimonos, anime e cerâmicas.",
    "tags": [
      "Cultura"
    ]
  },
  {
    "id": "karamell-kuche",
    "park": "epcot",
    "n": 3,
    "name": "Karamell Küche",
    "category": "compras",
    "lat": 28.368361,
    "lng": -81.546974,
    "area": "World Showcase · Alemanha",
    "description": "Doces artesanais de caramelo feitos na hora.",
    "tags": [
      "Doces"
    ]
  },
  {
    "id": "star-wars-rise-of-the-resistance",
    "park": "hollywood-studios",
    "n": 1,
    "name": "Star Wars: Rise of the Resistance",
    "category": "atracao",
    "lat": 28.354287,
    "lng": -81.560481,
    "area": "Star Wars: Galaxy's Edge",
    "intensity": "Moderada",
    "description": "Uma das atrações mais impressionantes do mundo: você é capturado pela Primeira Ordem e precisa escapar de um Destróier Estelar.",
    "tags": [
      "Imperdível",
      "Star Wars"
    ],
    "tip": "Faça logo na abertura ou ao fim do dia, quando a fila costuma diminuir."
  },
  {
    "id": "millennium-falcon-smugglers-run",
    "park": "hollywood-studios",
    "n": 2,
    "name": "Millennium Falcon: Smugglers Run",
    "category": "atracao",
    "lat": 28.353524,
    "lng": -81.561703,
    "area": "Star Wars: Galaxy's Edge",
    "intensity": "Moderada",
    "description": "Pilote a Millennium Falcon em equipe, como piloto, artilheiro ou engenheiro.",
    "tags": [
      "Interativo",
      "Star Wars"
    ]
  },
  {
    "id": "slinky-dog-dash",
    "park": "hollywood-studios",
    "n": 3,
    "name": "Slinky Dog Dash",
    "category": "atracao",
    "lat": 28.356454,
    "lng": -81.563122,
    "area": "Toy Story Land",
    "intensity": "Moderada",
    "description": "Montanha-russa familiar no quintal do Andy, com lançamento e vistas lindas.",
    "tags": [
      "Família",
      "Imperdível"
    ]
  },
  {
    "id": "toy-story-mania",
    "park": "hollywood-studios",
    "n": 4,
    "name": "Toy Story Mania!",
    "category": "atracao",
    "lat": 28.356023,
    "lng": -81.561335,
    "area": "Toy Story Land",
    "intensity": "Leve",
    "description": "Jogo 4D em que você dispara em alvos de feira com os personagens de Toy Story.",
    "tags": [
      "Crianças",
      "Interativo"
    ]
  },
  {
    "id": "the-twilight-zone-tower-of-terror",
    "park": "hollywood-studios",
    "n": 5,
    "name": "The Twilight Zone Tower of Terror",
    "category": "atracao",
    "lat": 28.360016,
    "lng": -81.55994,
    "area": "Sunset Boulevard",
    "intensity": "Radical",
    "description": "Queda livre em um elevador de hotel assombrado, com sequências que mudam a cada volta.",
    "tags": [
      "Adrenalina",
      "Clássico"
    ]
  },
  {
    "id": "rock-n-roller-coaster-starring-the-muppets",
    "park": "hollywood-studios",
    "n": 6,
    "name": "Rock ’n’ Roller Coaster Starring the Muppets",
    "category": "atracao",
    "lat": 28.359642,
    "lng": -81.561521,
    "area": "Sunset Boulevard",
    "intensity": "Radical",
    "description": "Montanha-russa com lançamento explosivo e inversões no escuro, agora com os Muppets.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "mickey-and-minnie-s-runaway-railway",
    "park": "hollywood-studios",
    "n": 7,
    "name": "Mickey and Minnie's Runaway Railway",
    "category": "atracao",
    "lat": 28.356255,
    "lng": -81.560447,
    "area": "Hollywood Boulevard",
    "intensity": "Leve",
    "description": "Entre em um desenho do Mickey numa viagem cheia de efeitos e surpresas.",
    "tags": [
      "Família",
      "Personagens"
    ]
  },
  {
    "id": "star-tours-the-adventures-continue",
    "park": "hollywood-studios",
    "n": 8,
    "name": "Star Tours: The Adventures Continue",
    "category": "atracao",
    "lat": 28.355226,
    "lng": -81.558705,
    "area": "Echo Lake",
    "intensity": "Moderada",
    "description": "Simulador 3D com rotas que mudam a cada viagem pela galáxia.",
    "tags": [
      "Simulador",
      "Star Wars"
    ]
  },
  {
    "id": "fantasmic",
    "park": "hollywood-studios",
    "n": 9,
    "name": "Fantasmic!",
    "category": "atracao",
    "lat": 28.361213,
    "lng": -81.55831,
    "area": "Sunset Boulevard",
    "intensity": "Leve",
    "description": "Espetáculo noturno com Mickey, água, fogo e projeções.",
    "tags": [
      "Show",
      "Imperdível"
    ],
    "tip": "Chegue com antecedência: o anfiteatro lota."
  },
  {
    "id": "indiana-jones-epic-stunt-spectacular",
    "park": "hollywood-studios",
    "n": 10,
    "name": "Indiana Jones Epic Stunt Spectacular!",
    "category": "atracao",
    "lat": 28.356646,
    "lng": -81.558376,
    "area": "Echo Lake",
    "intensity": "Leve",
    "description": "Show de dublês com explosões e cenas clássicas de Indiana Jones.",
    "tags": [
      "Show"
    ]
  },
  {
    "id": "beauty-and-the-beast-live-on-stage",
    "park": "hollywood-studios",
    "n": 11,
    "name": "Beauty and the Beast – Live on Stage",
    "category": "atracao",
    "lat": 28.359124,
    "lng": -81.559352,
    "area": "Sunset Boulevard",
    "intensity": "Leve",
    "description": "Musical ao ar livre com as canções de A Bela e a Fera.",
    "tags": [
      "Show",
      "Crianças"
    ]
  },
  {
    "id": "sci-fi-dine-in-theater",
    "park": "hollywood-studios",
    "n": 1,
    "name": "Sci-Fi Dine-In Theater",
    "category": "restaurante",
    "lat": 28.355799,
    "lng": -81.559771,
    "area": "Commissary Lane",
    "description": "Coma dentro de carros conversíveis enquanto assiste a filmes B de ficção científica.",
    "tags": [
      "Temático",
      "Reserva"
    ]
  },
  {
    "id": "docking-bay-7-food-and-cargo",
    "park": "hollywood-studios",
    "n": 2,
    "name": "Docking Bay 7 Food and Cargo",
    "category": "restaurante",
    "lat": 28.354089,
    "lng": -81.561537,
    "area": "Star Wars: Galaxy's Edge",
    "description": "Pratos inspirados na culinária da galáxia em um hangar de Batuu.",
    "tags": [
      "Rápido",
      "Star Wars"
    ]
  },
  {
    "id": "oga-s-cantina",
    "park": "hollywood-studios",
    "n": 3,
    "name": "Oga's Cantina",
    "category": "restaurante",
    "lat": 28.353978,
    "lng": -81.562113,
    "area": "Star Wars: Galaxy's Edge",
    "description": "A cantina de Batuu, com drinques coloridos e o droide DJ R-3X.",
    "tags": [
      "Bar",
      "Star Wars"
    ]
  },
  {
    "id": "woody-s-lunch-box",
    "park": "hollywood-studios",
    "n": 4,
    "name": "Woody's Lunch Box",
    "category": "restaurante",
    "lat": 28.355705,
    "lng": -81.562206,
    "area": "Toy Story Land",
    "description": "Sanduíches e lanches no clima de lancheira do Woody.",
    "tags": [
      "Rápido",
      "Família"
    ]
  },
  {
    "id": "50-s-prime-time-cafe",
    "park": "hollywood-studios",
    "n": 5,
    "name": "50's Prime Time Cafe",
    "category": "restaurante",
    "lat": 28.357441,
    "lng": -81.558708,
    "area": "Echo Lake",
    "description": "Comida caseira americana numa cozinha dos anos 50. A \"mãe\" manda comer tudo!",
    "tags": [
      "Temático"
    ]
  },
  {
    "id": "savi-s-workshop",
    "park": "hollywood-studios",
    "n": 1,
    "name": "Savi's Workshop",
    "category": "compras",
    "lat": 28.354346,
    "lng": -81.561966,
    "area": "Star Wars: Galaxy's Edge",
    "description": "Monte seu próprio sabre de luz em uma experiência guiada.",
    "tags": [
      "Experiência"
    ],
    "tip": "Experiência paga com reserva antecipada."
  },
  {
    "id": "droid-depot",
    "park": "hollywood-studios",
    "n": 2,
    "name": "Droid Depot",
    "category": "compras",
    "lat": 28.354518,
    "lng": -81.562035,
    "area": "Star Wars: Galaxy's Edge",
    "description": "Escolha as peças e monte seu droide personalizado.",
    "tags": [
      "Experiência"
    ]
  },
  {
    "id": "mickey-s-of-hollywood",
    "park": "hollywood-studios",
    "n": 3,
    "name": "Mickey's of Hollywood",
    "category": "compras",
    "lat": 28.357802,
    "lng": -81.559185,
    "area": "Hollywood Boulevard",
    "description": "A loja principal do parque, logo na entrada.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "avatar-flight-of-passage",
    "park": "animal-kingdom",
    "n": 1,
    "name": "Avatar Flight of Passage",
    "category": "atracao",
    "lat": 28.354861,
    "lng": -81.592826,
    "area": "Pandora – The World of Avatar",
    "intensity": "Moderada",
    "description": "Monte num banshee e voe sobre Pandora em um simulador 3D de tirar o fôlego.",
    "tags": [
      "Imperdível",
      "Simulador"
    ],
    "tip": "Faça logo cedo: é a fila mais longa do parque."
  },
  {
    "id": "na-vi-river-journey",
    "park": "animal-kingdom",
    "n": 2,
    "name": "Na'vi River Journey",
    "category": "atracao",
    "lat": 28.354764,
    "lng": -81.592192,
    "area": "Pandora – The World of Avatar",
    "intensity": "Leve",
    "description": "Passeio de barco por uma floresta bioluminescente de Pandora.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "kilimanjaro-safaris",
    "park": "animal-kingdom",
    "n": 3,
    "name": "Kilimanjaro Safaris",
    "category": "atracao",
    "lat": 28.359727,
    "lng": -81.592406,
    "area": "Africa",
    "intensity": "Leve",
    "description": "Safári em caminhão aberto pela savana, com girafas, elefantes, leões e rinocerontes.",
    "tags": [
      "Animais",
      "Imperdível"
    ],
    "tip": "Os animais costumam estar mais ativos pela manhã."
  },
  {
    "id": "expedition-everest",
    "park": "animal-kingdom",
    "n": 4,
    "name": "Expedition Everest",
    "category": "atracao",
    "lat": 28.358611,
    "lng": -81.587202,
    "area": "Asia",
    "intensity": "Radical",
    "description": "Montanha-russa no Himalaia com trecho de ré e encontro com o Yeti.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "kali-river-rapids",
    "park": "animal-kingdom",
    "n": 5,
    "name": "Kali River Rapids",
    "category": "atracao",
    "lat": 28.359387,
    "lng": -81.588205,
    "area": "Asia",
    "intensity": "Moderada",
    "description": "Bote pelas corredeiras de uma floresta tropical. Você vai se molhar!",
    "tags": [
      "Água",
      "Família"
    ]
  },
  {
    "id": "gorilla-falls-exploration-trail",
    "park": "animal-kingdom",
    "n": 6,
    "name": "Gorilla Falls Exploration Trail",
    "category": "atracao",
    "lat": 28.359887,
    "lng": -81.592037,
    "area": "Africa",
    "intensity": "Leve",
    "description": "Trilha a pé com gorilas, hipopótamos e aves africanas.",
    "tags": [
      "Animais"
    ]
  },
  {
    "id": "maharajah-jungle-trek",
    "park": "animal-kingdom",
    "n": 7,
    "name": "Maharajah Jungle Trek",
    "category": "atracao",
    "lat": 28.359806,
    "lng": -81.589201,
    "area": "Asia",
    "intensity": "Leve",
    "description": "Trilha entre ruínas asiáticas com tigres, morcegos gigantes e aves.",
    "tags": [
      "Animais"
    ]
  },
  {
    "id": "festival-of-the-lion-king",
    "park": "animal-kingdom",
    "n": 8,
    "name": "Festival of the Lion King",
    "category": "atracao",
    "lat": 28.358458,
    "lng": -81.592908,
    "area": "Africa",
    "intensity": "Leve",
    "description": "Casa do Festival of the Lion King, um dos shows mais bonitos da Disney.",
    "tags": [
      "Show",
      "Imperdível"
    ]
  },
  {
    "id": "zootopia-better-zoogether",
    "park": "animal-kingdom",
    "n": 9,
    "name": "Zootopia: Better Zoogether!",
    "category": "atracao",
    "lat": 28.357765,
    "lng": -81.590485,
    "area": "Discovery Island",
    "intensity": "Leve",
    "description": "Show em 4D com os personagens de Zootopia, dentro da Árvore da Vida.",
    "tags": [
      "Crianças",
      "Show"
    ]
  },
  {
    "id": "arvore-da-vida-e-trilhas",
    "park": "animal-kingdom",
    "n": 10,
    "name": "Árvore da Vida e trilhas",
    "category": "atracao",
    "lat": 28.35792,
    "lng": -81.591228,
    "area": "Discovery Island",
    "intensity": "Leve",
    "description": "Trilhas ao redor da Árvore da Vida, com mais de 300 animais esculpidos no tronco.",
    "tags": [
      "Fotos"
    ]
  },
  {
    "id": "satu-li-canteen",
    "park": "animal-kingdom",
    "n": 1,
    "name": "Satu'li Canteen",
    "category": "restaurante",
    "lat": 28.356126,
    "lng": -81.592658,
    "area": "Pandora – The World of Avatar",
    "description": "Bowls personalizáveis com proteínas e molhos inspirados em Pandora.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "tiffins",
    "park": "animal-kingdom",
    "n": 2,
    "name": "Tiffins",
    "category": "restaurante",
    "lat": 28.356964,
    "lng": -81.591659,
    "area": "Discovery Island",
    "description": "Restaurante assinado com sabores da África, Ásia e América do Sul.",
    "tags": [
      "Serviço à mesa",
      "Reserva"
    ]
  },
  {
    "id": "yak-yeti-restaurant",
    "park": "animal-kingdom",
    "n": 3,
    "name": "Yak & Yeti Restaurant",
    "category": "restaurante",
    "lat": 28.358756,
    "lng": -81.589523,
    "area": "Asia",
    "description": "Cozinha pan-asiática em ambiente decorado com peças do Nepal.",
    "tags": [
      "Serviço à mesa"
    ]
  },
  {
    "id": "tusker-house-restaurant",
    "park": "animal-kingdom",
    "n": 4,
    "name": "Tusker House Restaurant",
    "category": "restaurante",
    "lat": 28.358641,
    "lng": -81.592111,
    "area": "Africa",
    "description": "Buffet com sabores africanos e encontro com personagens.",
    "tags": [
      "Personagens",
      "Buffet"
    ]
  },
  {
    "id": "flame-tree-barbecue",
    "park": "animal-kingdom",
    "n": 5,
    "name": "Flame Tree Barbecue",
    "category": "restaurante",
    "lat": 28.357354,
    "lng": -81.589375,
    "area": "Discovery Island",
    "description": "Churrasco americano com mesas à beira do rio.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "windtraders",
    "park": "animal-kingdom",
    "n": 1,
    "name": "Windtraders",
    "category": "compras",
    "lat": 28.355717,
    "lng": -81.592715,
    "area": "Pandora – The World of Avatar",
    "description": "Loja de Pandora, com os banshees de pelúcia que viram sucesso.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "island-mercantile",
    "park": "animal-kingdom",
    "n": 2,
    "name": "Island Mercantile",
    "category": "compras",
    "lat": 28.35697,
    "lng": -81.590696,
    "area": "Discovery Island",
    "description": "A loja principal do parque, com produtos exclusivos.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "serka-zong-bazaar",
    "park": "animal-kingdom",
    "n": 3,
    "name": "Serka Zong Bazaar",
    "category": "compras",
    "lat": 28.358425,
    "lng": -81.587069,
    "area": "Asia",
    "description": "Lembranças do Everest e do Yeti na saída da montanha-russa.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "harry-potter-and-the-escape-from-gringotts",
    "park": "universal-studios",
    "n": 1,
    "name": "Harry Potter and the Escape from Gringotts",
    "category": "atracao",
    "lat": 28.480158,
    "lng": -81.470037,
    "area": "The Wizarding World of Harry Potter – Diagon Alley",
    "intensity": "Moderada",
    "description": "Montanha-russa com cenas em 3D dentro do banco dos bruxos, com Voldemort e Bellatrix no caminho.",
    "tags": [
      "Imperdível",
      "Harry Potter"
    ],
    "tip": "Repare no dragão no topo do banco: ele solta fogo de tempos em tempos."
  },
  {
    "id": "ollivander-s-wand-shop",
    "park": "universal-studios",
    "n": 2,
    "name": "Ollivander's Wand Shop",
    "category": "atracao",
    "lat": 28.479739,
    "lng": -81.469747,
    "area": "The Wizarding World of Harry Potter – Diagon Alley",
    "intensity": "Leve",
    "description": "\"A varinha escolhe o bruxo\": experiência na loja do Ollivander.",
    "tags": [
      "Harry Potter",
      "Experiência"
    ]
  },
  {
    "id": "revenge-of-the-mummy",
    "park": "universal-studios",
    "n": 3,
    "name": "Revenge of the Mummy",
    "category": "atracao",
    "lat": 28.476863,
    "lng": -81.469985,
    "area": "New York",
    "intensity": "Radical",
    "description": "Montanha-russa indoor com lançamento, escuridão e muitos efeitos.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "transformers-the-ride-3d",
    "park": "universal-studios",
    "n": 4,
    "name": "Transformers: The Ride-3D",
    "category": "atracao",
    "lat": 28.4764,
    "lng": -81.468439,
    "area": "Production Central",
    "intensity": "Moderada",
    "description": "Batalha 3D entre Autobots e Decepticons pelas ruas da cidade.",
    "tags": [
      "Simulador"
    ]
  },
  {
    "id": "men-in-black-alien-attack",
    "park": "universal-studios",
    "n": 5,
    "name": "Men in Black: Alien Attack",
    "category": "atracao",
    "lat": 28.480905,
    "lng": -81.467587,
    "area": "World Expo",
    "intensity": "Moderada",
    "description": "Atire em alienígenas e dispute pontuação com o carrinho ao lado.",
    "tags": [
      "Interativo"
    ]
  },
  {
    "id": "the-simpsons-ride",
    "park": "universal-studios",
    "n": 6,
    "name": "The Simpsons Ride",
    "category": "atracao",
    "lat": 28.479453,
    "lng": -81.467509,
    "area": "Springfield",
    "intensity": "Moderada",
    "description": "Simulador pelo parque Krustyland com a família Simpson.",
    "tags": [
      "Simulador"
    ]
  },
  {
    "id": "despicable-me-minion-mayhem",
    "park": "universal-studios",
    "n": 7,
    "name": "Despicable Me Minion Mayhem",
    "category": "atracao",
    "lat": 28.47531,
    "lng": -81.468194,
    "area": "Minion Land",
    "intensity": "Leve",
    "description": "Vire um Minion no laboratório do Gru em um simulador divertido.",
    "tags": [
      "Crianças",
      "Simulador"
    ]
  },
  {
    "id": "illuminations-villain-con-minion-blast",
    "park": "universal-studios",
    "n": 8,
    "name": "Illumination’s Villain-Con Minion Blast",
    "category": "atracao",
    "lat": 28.475569,
    "lng": -81.467864,
    "area": "Minion Land",
    "intensity": "Leve",
    "description": "Atração interativa em que você testa suas habilidades de vilão.",
    "tags": [
      "Interativo",
      "Crianças"
    ]
  },
  {
    "id": "e-t-adventure",
    "park": "universal-studios",
    "n": 9,
    "name": "E.T. Adventure",
    "category": "atracao",
    "lat": 28.477618,
    "lng": -81.466557,
    "area": "Hollywood",
    "intensity": "Leve",
    "description": "Clássico de bicicleta voadora para levar o E.T. de volta para casa.",
    "tags": [
      "Clássico",
      "Família"
    ]
  },
  {
    "id": "race-through-new-york-starring-jimmy-fallon",
    "park": "universal-studios",
    "n": 10,
    "name": "Race Through New York Starring Jimmy Fallon",
    "category": "atracao",
    "lat": 28.475706,
    "lng": -81.469482,
    "area": "New York",
    "intensity": "Leve",
    "description": "Corrida em 3D pelas ruas de Nova York com Jimmy Fallon.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "leaky-cauldron",
    "park": "universal-studios",
    "n": 1,
    "name": "Leaky Cauldron",
    "category": "restaurante",
    "lat": 28.479369,
    "lng": -81.469543,
    "area": "The Wizarding World of Harry Potter – Diagon Alley",
    "description": "Café da manhã inglês e fish & chips no pub do Beco Diagonal.",
    "tags": [
      "Temático"
    ]
  },
  {
    "id": "florean-fortescue-s-ice-cream-parlor",
    "park": "universal-studios",
    "n": 2,
    "name": "Florean Fortescue's Ice-Cream Parlor",
    "category": "restaurante",
    "lat": 28.479598,
    "lng": -81.469869,
    "area": "The Wizarding World of Harry Potter – Diagon Alley",
    "description": "Sorvetes mágicos, incluindo o de cerveja amanteigada.",
    "tags": [
      "Doces"
    ]
  },
  {
    "id": "illumination-s-minion-cafe",
    "park": "universal-studios",
    "n": 3,
    "name": "Illumination's Minion Cafe",
    "category": "restaurante",
    "lat": 28.475953,
    "lng": -81.468588,
    "area": "Minion Land",
    "description": "Cardápio colorido no clima dos Minions.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "mel-s-drive-in",
    "park": "universal-studios",
    "n": 4,
    "name": "Mel's Drive-In",
    "category": "restaurante",
    "lat": 28.476457,
    "lng": -81.467801,
    "area": "Hollywood",
    "description": "Hambúrgueres e milk-shakes em uma lanchonete dos anos 50.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "lombard-s-seafood-grille",
    "park": "universal-studios",
    "n": 5,
    "name": "Lombard's Seafood Grille",
    "category": "restaurante",
    "lat": 28.478782,
    "lng": -81.469074,
    "area": "San Francisco",
    "description": "Frutos do mar com vista para a lagoa.",
    "tags": [
      "Serviço à mesa"
    ]
  },
  {
    "id": "weasley-s-wizard-wheezes",
    "park": "universal-studios",
    "n": 1,
    "name": "Weasley's Wizard Wheezes",
    "category": "compras",
    "lat": 28.479593,
    "lng": -81.469432,
    "area": "The Wizarding World of Harry Potter – Diagon Alley",
    "description": "A loja de logros e brincadeiras dos gêmeos Weasley.",
    "tags": [
      "Harry Potter"
    ]
  },
  {
    "id": "kwik-e-mart",
    "park": "universal-studios",
    "n": 2,
    "name": "Kwik-E-Mart",
    "category": "compras",
    "lat": 28.478995,
    "lng": -81.467792,
    "area": "Springfield",
    "description": "A loja de conveniência de Springfield, com produtos dos Simpsons.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "universal-studios-store",
    "park": "universal-studios",
    "n": 3,
    "name": "Universal Studios Store",
    "category": "compras",
    "lat": 28.475068,
    "lng": -81.467572,
    "area": "Production Central",
    "description": "Loja principal com produtos de todas as franquias.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "hagrid-s-magical-creatures-motorbike-adventure",
    "park": "islands-of-adventure",
    "n": 1,
    "name": "Hagrid's Magical Creatures Motorbike Adventure",
    "category": "atracao",
    "lat": 28.473436,
    "lng": -81.473509,
    "area": "The Wizarding World of Harry Potter – Hogsmeade",
    "intensity": "Radical",
    "description": "Montanha-russa com vários lançamentos pela Floresta Proibida. Favorita de muitos fãs.",
    "tags": [
      "Imperdível",
      "Harry Potter"
    ],
    "tip": "A fila costuma ser longa o dia todo. Vá na abertura."
  },
  {
    "id": "harry-potter-and-the-forbidden-journey",
    "park": "islands-of-adventure",
    "n": 2,
    "name": "Harry Potter and the Forbidden Journey",
    "category": "atracao",
    "lat": 28.471876,
    "lng": -81.473948,
    "area": "The Wizarding World of Harry Potter – Hogsmeade",
    "intensity": "Moderada",
    "description": "Voe com Harry por Hogwarts em uma atração dentro do próprio castelo.",
    "tags": [
      "Harry Potter",
      "Imperdível"
    ]
  },
  {
    "id": "jurassic-world-velocicoaster",
    "park": "islands-of-adventure",
    "n": 3,
    "name": "Jurassic World VelociCoaster",
    "category": "atracao",
    "lat": 28.471099,
    "lng": -81.472491,
    "area": "Jurassic Park",
    "intensity": "Radical",
    "description": "Uma das montanhas-russas mais intensas de Orlando, com lançamentos e inversões entre raptors.",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ]
  },
  {
    "id": "the-incredible-hulk-coaster",
    "park": "islands-of-adventure",
    "n": 4,
    "name": "The Incredible Hulk Coaster",
    "category": "atracao",
    "lat": 28.471502,
    "lng": -81.468776,
    "area": "Marvel Super Hero Island",
    "intensity": "Radical",
    "description": "Lançamento em subida e várias inversões sobre a lagoa.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "the-amazing-adventures-of-spider-man",
    "park": "islands-of-adventure",
    "n": 5,
    "name": "The Amazing Adventures of Spider-Man",
    "category": "atracao",
    "lat": 28.470055,
    "lng": -81.469659,
    "area": "Marvel Super Hero Island",
    "intensity": "Moderada",
    "description": "Clássico em 3D que mistura cenários reais e projeções pelas ruas de Nova York.",
    "tags": [
      "Clássico",
      "Família"
    ]
  },
  {
    "id": "skull-island-reign-of-kong",
    "park": "islands-of-adventure",
    "n": 6,
    "name": "Skull Island: Reign of Kong",
    "category": "atracao",
    "lat": 28.469061,
    "lng": -81.473049,
    "area": "Skull Island",
    "intensity": "Moderada",
    "description": "Expedição em caminhão pela ilha do King Kong, com encontro de perto com o gorila.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "jurassic-park-river-adventure",
    "park": "islands-of-adventure",
    "n": 7,
    "name": "Jurassic Park River Adventure",
    "category": "atracao",
    "lat": 28.470252,
    "lng": -81.473782,
    "area": "Jurassic Park",
    "intensity": "Moderada",
    "description": "Passeio de barco entre dinossauros que termina com uma grande queda molhada.",
    "tags": [
      "Água"
    ]
  },
  {
    "id": "flight-of-the-hippogriff",
    "park": "islands-of-adventure",
    "n": 8,
    "name": "Flight of the Hippogriff",
    "category": "atracao",
    "lat": 28.472447,
    "lng": -81.473834,
    "area": "The Wizarding World of Harry Potter – Hogsmeade",
    "intensity": "Leve",
    "description": "Montanha-russa familiar ao redor da cabana do Hagrid.",
    "tags": [
      "Família",
      "Crianças"
    ]
  },
  {
    "id": "doctor-doom-s-fearfall",
    "park": "islands-of-adventure",
    "n": 9,
    "name": "Doctor Doom's Fearfall",
    "category": "atracao",
    "lat": 28.470524,
    "lng": -81.469297,
    "area": "Marvel Super Hero Island",
    "intensity": "Radical",
    "description": "Torre que dispara você para cima com vista para todo o parque.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "dudley-do-right-s-ripsaw-falls",
    "park": "islands-of-adventure",
    "n": 10,
    "name": "Dudley Do-Right's Ripsaw Falls",
    "category": "atracao",
    "lat": 28.46922,
    "lng": -81.47183,
    "area": "Toon Lagoon",
    "intensity": "Moderada",
    "description": "Toras na água com queda final. Molha bastante!",
    "tags": [
      "Água"
    ]
  },
  {
    "id": "three-broomsticks",
    "park": "islands-of-adventure",
    "n": 1,
    "name": "Three Broomsticks",
    "category": "restaurante",
    "lat": 28.47276,
    "lng": -81.472651,
    "area": "The Wizarding World of Harry Potter – Hogsmeade",
    "description": "Comida inglesa e a famosa cerveja amanteigada em Hogsmeade.",
    "tags": [
      "Temático"
    ]
  },
  {
    "id": "mythos",
    "park": "islands-of-adventure",
    "n": 2,
    "name": "Mythos",
    "category": "restaurante",
    "lat": 28.472451,
    "lng": -81.471391,
    "area": "The Lost Continent",
    "description": "Restaurante de serviço à mesa dentro de uma caverna esculpida.",
    "tags": [
      "Serviço à mesa"
    ]
  },
  {
    "id": "thunder-falls-terrace",
    "park": "islands-of-adventure",
    "n": 3,
    "name": "Thunder Falls Terrace",
    "category": "restaurante",
    "lat": 28.46957,
    "lng": -81.473443,
    "area": "Jurassic Park",
    "description": "Frango e costela com vista para a queda do River Adventure.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "green-eggs-and-ham",
    "park": "islands-of-adventure",
    "n": 4,
    "name": "Green Eggs and Ham",
    "category": "restaurante",
    "lat": 28.472566,
    "lng": -81.469968,
    "area": "Seuss Landing",
    "description": "Lanches coloridos no mundo do Dr. Seuss.",
    "tags": [
      "Crianças"
    ]
  },
  {
    "id": "honeydukes",
    "park": "islands-of-adventure",
    "n": 1,
    "name": "Honeydukes",
    "category": "compras",
    "lat": 28.472978,
    "lng": -81.472612,
    "area": "The Wizarding World of Harry Potter – Hogsmeade",
    "description": "A doceria de Hogsmeade, com sapos de chocolate e feijõezinhos de todos os sabores.",
    "tags": [
      "Doces",
      "Harry Potter"
    ]
  },
  {
    "id": "ollivanders",
    "park": "islands-of-adventure",
    "n": 2,
    "name": "Ollivanders",
    "category": "compras",
    "lat": 28.472837,
    "lng": -81.473099,
    "area": "The Wizarding World of Harry Potter – Hogsmeade",
    "description": "Varinhas interativas e a experiência de escolha da varinha.",
    "tags": [
      "Harry Potter"
    ]
  },
  {
    "id": "jurassic-outfitters",
    "park": "islands-of-adventure",
    "n": 3,
    "name": "Jurassic Outfitters",
    "category": "compras",
    "lat": 28.470526,
    "lng": -81.473454,
    "area": "Jurassic Park",
    "description": "Produtos de dinossauros e da franquia Jurassic World.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "stardust-racers",
    "park": "epic-universe",
    "n": 1,
    "name": "Stardust Racers",
    "category": "atracao",
    "lat": 28.441555,
    "lng": -81.446542,
    "area": "Celestial Park",
    "intensity": "Radical",
    "description": "Montanha-russa dupla com carrinhos que \"competem\" e se cruzam no ar.",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ]
  },
  {
    "id": "constellation-carousel",
    "park": "epic-universe",
    "n": 2,
    "name": "Constellation Carousel",
    "category": "atracao",
    "lat": 28.440293,
    "lng": -81.447783,
    "area": "Celestial Park",
    "intensity": "Leve",
    "description": "Carrossel com constelações que giram enquanto você se move.",
    "tags": [
      "Crianças"
    ]
  },
  {
    "id": "astronomica",
    "park": "epic-universe",
    "n": 3,
    "name": "Astronomica",
    "category": "atracao",
    "lat": 28.440776,
    "lng": -81.447943,
    "area": "Celestial Park",
    "intensity": "Leve",
    "description": "Fonte interativa com jatos de água sincronizados. Diversão para os pequenos.",
    "tags": [
      "Crianças",
      "Água"
    ]
  },
  {
    "id": "mine-cart-madness",
    "park": "epic-universe",
    "n": 4,
    "name": "Mine-Cart Madness",
    "category": "atracao",
    "lat": 28.438127,
    "lng": -81.448869,
    "area": "Super Nintendo World",
    "intensity": "Moderada",
    "description": "Carrinho de mina do Donkey Kong que parece saltar sobre trilhos quebrados.",
    "tags": [
      "Família",
      "Imperdível"
    ]
  },
  {
    "id": "harry-potter-and-the-battle-at-the-ministry",
    "park": "epic-universe",
    "n": 5,
    "name": "Harry Potter and the Battle at the Ministry",
    "category": "atracao",
    "lat": 28.443753,
    "lng": -81.448174,
    "area": "The Wizarding World of Harry Potter – Ministry of Magic",
    "intensity": "Moderada",
    "description": "Os elevadores do Ministério da Magia levam você a um julgamento que sai do controle.",
    "tags": [
      "Harry Potter",
      "Imperdível"
    ]
  },
  {
    "id": "monsters-unchained-the-frankenstein-experiment",
    "park": "epic-universe",
    "n": 6,
    "name": "Monsters Unchained: The Frankenstein Experiment",
    "category": "atracao",
    "lat": 28.440751,
    "lng": -81.450971,
    "area": "Dark Universe",
    "intensity": "Moderada",
    "description": "Dark ride em braço robótico pelo laboratório do Dr. Frankenstein.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "curse-of-the-werewolf",
    "park": "epic-universe",
    "n": 7,
    "name": "Curse of the Werewolf",
    "category": "atracao",
    "lat": 28.439683,
    "lng": -81.449637,
    "area": "Dark Universe",
    "intensity": "Moderada",
    "description": "Montanha-russa familiar com carrinhos que giram pela floresta do lobisomem.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "hiccup-s-wing-gliders",
    "park": "epic-universe",
    "n": 8,
    "name": "Hiccup's Wing Gliders",
    "category": "atracao",
    "lat": 28.441252,
    "lng": -81.444494,
    "area": "How to Train Your Dragon – Isle of Berk",
    "intensity": "Moderada",
    "description": "Montanha-russa lançada que voa entre as casas de Berk.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "dragon-racer-s-rally",
    "park": "epic-universe",
    "n": 9,
    "name": "Dragon Racer's Rally",
    "category": "atracao",
    "lat": 28.44145,
    "lng": -81.445343,
    "area": "How to Train Your Dragon – Isle of Berk",
    "intensity": "Moderada",
    "description": "Faça manobras como um piloto de dragão: você controla os giros.",
    "tags": [
      "Interativo"
    ]
  },
  {
    "id": "fyre-drill",
    "park": "epic-universe",
    "n": 10,
    "name": "Fyre Drill",
    "category": "atracao",
    "lat": 28.440374,
    "lng": -81.445271,
    "area": "How to Train Your Dragon – Isle of Berk",
    "intensity": "Leve",
    "description": "Barco com canhões de água para apagar incêndios — e molhar os outros.",
    "tags": [
      "Água",
      "Crianças"
    ]
  },
  {
    "id": "atlantic",
    "park": "epic-universe",
    "n": 1,
    "name": "Atlantic",
    "category": "restaurante",
    "lat": 28.439447,
    "lng": -81.447001,
    "area": "Celestial Park",
    "description": "Frutos do mar em serviço à mesa com vista para o lago central.",
    "tags": [
      "Serviço à mesa"
    ]
  },
  {
    "id": "toadstool-cafe",
    "park": "epic-universe",
    "n": 2,
    "name": "Toadstool Cafe",
    "category": "restaurante",
    "lat": 28.439005,
    "lng": -81.447956,
    "area": "Super Nintendo World",
    "description": "Comida temática do Mario dentro do Reino dos Cogumelos.",
    "tags": [
      "Temático"
    ]
  },
  {
    "id": "cafe-l-air-de-la-sirene",
    "park": "epic-universe",
    "n": 3,
    "name": "Café L'air de la Sirène",
    "category": "restaurante",
    "lat": 28.442611,
    "lng": -81.447886,
    "area": "The Wizarding World of Harry Potter – Ministry of Magic",
    "description": "Café parisiense do mundo bruxo, com pratos franceses.",
    "tags": [
      "Temático"
    ]
  },
  {
    "id": "mead-hall",
    "park": "epic-universe",
    "n": 4,
    "name": "Mead Hall",
    "category": "restaurante",
    "lat": 28.440799,
    "lng": -81.444978,
    "area": "How to Train Your Dragon – Isle of Berk",
    "description": "Salão viking com comida farta para a família.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "the-burning-blade-tavern",
    "park": "epic-universe",
    "n": 5,
    "name": "The Burning Blade Tavern",
    "category": "restaurante",
    "lat": 28.439722,
    "lng": -81.450583,
    "area": "Dark Universe",
    "description": "Taverna sombria com drinques e petiscos.",
    "tags": [
      "Bar"
    ]
  },
  {
    "id": "nintendo-super-star-store",
    "park": "epic-universe",
    "n": 1,
    "name": "Nintendo Super Star Store",
    "category": "compras",
    "lat": 28.439619,
    "lng": -81.448135,
    "area": "Celestial Park",
    "description": "Produtos de Mario, Zelda, Donkey Kong e outros clássicos da Nintendo.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "cosme-acajor-baguettes-magique",
    "park": "epic-universe",
    "n": 2,
    "name": "Cosme Acajor Baguettes Magique",
    "category": "compras",
    "lat": 28.442976,
    "lng": -81.447282,
    "area": "The Wizarding World of Harry Potter – Ministry of Magic",
    "description": "A loja de varinhas da Paris bruxa.",
    "tags": [
      "Harry Potter"
    ]
  },
  {
    "id": "other-worlds-mercantile",
    "park": "epic-universe",
    "n": 3,
    "name": "Other Worlds Mercantile",
    "category": "compras",
    "lat": 28.439037,
    "lng": -81.446562,
    "area": "Celestial Park",
    "description": "A loja principal do parque, com produtos de todos os mundos.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "mako",
    "park": "seaworld",
    "n": 1,
    "name": "Mako",
    "category": "atracao",
    "lat": 28.409238,
    "lng": -81.459925,
    "area": "Shark Wreck Reef",
    "intensity": "Radical",
    "description": "Montanha-russa gigante inspirada no tubarão mais rápido do oceano, com muitos momentos de \"frio na barriga\".",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ]
  },
  {
    "id": "kraken",
    "park": "seaworld",
    "n": 2,
    "name": "Kraken",
    "category": "atracao",
    "lat": 28.411695,
    "lng": -81.458751,
    "area": "Sea of Legends",
    "intensity": "Radical",
    "description": "Montanha-russa sem chão, com várias inversões sobre a água.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "manta",
    "park": "seaworld",
    "n": 3,
    "name": "Manta",
    "category": "atracao",
    "lat": 28.412078,
    "lng": -81.46167,
    "area": "Sea of Delight",
    "intensity": "Radical",
    "description": "Voe de bruços, como uma raia, rente à água.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "ice-breaker",
    "park": "seaworld",
    "n": 4,
    "name": "Ice Breaker",
    "category": "atracao",
    "lat": 28.408816,
    "lng": -81.462959,
    "area": "Sea of Legends",
    "intensity": "Moderada",
    "description": "Montanha-russa com lançamentos para frente e para trás e um pico vertical.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "infinity-falls",
    "park": "seaworld",
    "n": 5,
    "name": "Infinity Falls",
    "category": "atracao",
    "lat": 28.407865,
    "lng": -81.460138,
    "area": "Sea of Mystery",
    "intensity": "Moderada",
    "description": "Rafting em corredeiras com uma grande queda final.",
    "tags": [
      "Água",
      "Família"
    ]
  },
  {
    "id": "journey-to-atlantis",
    "park": "seaworld",
    "n": 6,
    "name": "Journey to Atlantis",
    "category": "atracao",
    "lat": 28.413065,
    "lng": -81.459222,
    "area": "Sea of Legends",
    "intensity": "Moderada",
    "description": "Barco-montanha-russa com quedas molhadas pela cidade perdida.",
    "tags": [
      "Água"
    ]
  },
  {
    "id": "estadio-das-orcas",
    "park": "seaworld",
    "n": 7,
    "name": "Estádio das Orcas",
    "category": "atracao",
    "lat": 28.40874,
    "lng": -81.461572,
    "area": "Sea of Shallows",
    "intensity": "Leve",
    "description": "Estádio das orcas, com apresentações educativas sobre esses animais.",
    "tags": [
      "Animais",
      "Show"
    ]
  },
  {
    "id": "dolphin-lagoon",
    "park": "seaworld",
    "n": 8,
    "name": "Dolphin Lagoon",
    "category": "atracao",
    "lat": 28.405014,
    "lng": -81.464076,
    "area": "Sea of Delight",
    "intensity": "Leve",
    "description": "Lagoa onde dá para observar golfinhos de perto.",
    "tags": [
      "Animais"
    ]
  },
  {
    "id": "turtle-trek",
    "park": "seaworld",
    "n": 9,
    "name": "Turtle Trek",
    "category": "atracao",
    "lat": 28.41401,
    "lng": -81.460149,
    "area": "Sea of Delight",
    "intensity": "Leve",
    "description": "Habitat de tartarugas e peixes-boi com filme em domo 360°.",
    "tags": [
      "Animais",
      "Família"
    ]
  },
  {
    "id": "shark-encounter",
    "park": "seaworld",
    "n": 10,
    "name": "Shark Encounter",
    "category": "atracao",
    "lat": 28.409757,
    "lng": -81.45963,
    "area": "Shark Wreck Reef",
    "intensity": "Leve",
    "description": "Túnel submerso com tubarões, raias e peixes passando sobre sua cabeça.",
    "tags": [
      "Animais"
    ]
  },
  {
    "id": "sharks-underwater-grill-bar",
    "park": "seaworld",
    "n": 1,
    "name": "Sharks Underwater Grill & Bar",
    "category": "restaurante",
    "lat": 28.409774,
    "lng": -81.459986,
    "area": "Shark Wreck Reef",
    "description": "Refeição com vista para o aquário dos tubarões.",
    "tags": [
      "Temático",
      "Serviço à mesa"
    ]
  },
  {
    "id": "voyagers-smokehouse-bbq",
    "park": "seaworld",
    "n": 2,
    "name": "Voyagers Smokehouse BBQ",
    "category": "restaurante",
    "lat": 28.411061,
    "lng": -81.46083,
    "area": "Sea of Legends",
    "description": "Churrasco defumado com acompanhamentos americanos.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "lakeside-grill",
    "park": "seaworld",
    "n": 3,
    "name": "Lakeside Grill",
    "category": "restaurante",
    "lat": 28.410197,
    "lng": -81.460624,
    "area": "Sea of Delight",
    "description": "Hambúrgueres e lanches à beira do lago central.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "dine-with-orcas",
    "park": "seaworld",
    "n": 4,
    "name": "Dine with Orcas",
    "category": "restaurante",
    "lat": 28.408892,
    "lng": -81.461574,
    "area": "Sea of Shallows",
    "description": "Experiência de refeição ao lado do habitat das orcas.",
    "tags": [
      "Experiência",
      "Reserva"
    ]
  },
  {
    "id": "seaworld-store",
    "park": "seaworld",
    "n": 1,
    "name": "SeaWorld Store",
    "category": "compras",
    "lat": 28.411832,
    "lng": -81.462881,
    "area": "Port of Entry",
    "description": "A loja principal do parque.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "kraken-gift-shop",
    "park": "seaworld",
    "n": 2,
    "name": "Kraken Gift Shop",
    "category": "compras",
    "lat": 28.411851,
    "lng": -81.459064,
    "area": "Sea of Legends",
    "description": "Produtos temáticos da montanha-russa Kraken.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "build-a-bear-workshop",
    "park": "seaworld",
    "n": 3,
    "name": "Build-A-Bear Workshop",
    "category": "compras",
    "lat": 28.412782,
    "lng": -81.461672,
    "area": "Sea of Delight",
    "description": "Monte seu bichinho de pelúcia personalizado.",
    "tags": [
      "Crianças"
    ]
  },
  {
    "id": "iron-gwazi",
    "park": "busch-gardens",
    "n": 1,
    "name": "Iron Gwazi",
    "category": "atracao",
    "lat": 28.033984,
    "lng": -82.423085,
    "area": "Gwazi Gulch",
    "intensity": "Radical",
    "description": "Montanha-russa híbrida de madeira e aço, entre as mais altas e rápidas do gênero.",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ]
  },
  {
    "id": "sheikra",
    "park": "busch-gardens",
    "n": 2,
    "name": "SheiKra",
    "category": "atracao",
    "lat": 28.036581,
    "lng": -82.424708,
    "area": "Stanleyville",
    "intensity": "Radical",
    "description": "Dive coaster com queda vertical de 90° depois de uma pausa no topo.",
    "tags": [
      "Adrenalina",
      "Imperdível"
    ]
  },
  {
    "id": "montu",
    "park": "busch-gardens",
    "n": 3,
    "name": "Montu",
    "category": "atracao",
    "lat": 28.034361,
    "lng": -82.417572,
    "area": "Egypt",
    "intensity": "Radical",
    "description": "Montanha-russa invertida com os pés soltos, cheia de inversões.",
    "tags": [
      "Adrenalina"
    ]
  },
  {
    "id": "kumba",
    "park": "busch-gardens",
    "n": 4,
    "name": "Kumba",
    "category": "atracao",
    "lat": 28.039555,
    "lng": -82.422739,
    "area": "Congo",
    "intensity": "Radical",
    "description": "Clássica montanha-russa com loopings gigantes.",
    "tags": [
      "Adrenalina",
      "Clássico"
    ]
  },
  {
    "id": "cheetah-hunt",
    "park": "busch-gardens",
    "n": 5,
    "name": "Cheetah Hunt",
    "category": "atracao",
    "lat": 28.035923,
    "lng": -82.420449,
    "area": "Morocco",
    "intensity": "Moderada",
    "description": "Montanha-russa lançada que corre ao lado da planície dos guepardos.",
    "tags": [
      "Família",
      "Animais"
    ]
  },
  {
    "id": "cobra-s-curse",
    "park": "busch-gardens",
    "n": 6,
    "name": "Cobra's Curse",
    "category": "atracao",
    "lat": 28.034765,
    "lng": -82.418516,
    "area": "Egypt",
    "intensity": "Moderada",
    "description": "Montanha-russa familiar com trecho de ré e uma cobra gigante.",
    "tags": [
      "Família"
    ]
  },
  {
    "id": "congo-river-rapids",
    "park": "busch-gardens",
    "n": 7,
    "name": "Congo River Rapids",
    "category": "atracao",
    "lat": 28.040065,
    "lng": -82.42393,
    "area": "Congo",
    "intensity": "Moderada",
    "description": "Bote nas corredeiras para se refrescar no calor da Flórida.",
    "tags": [
      "Água",
      "Família"
    ]
  },
  {
    "id": "stanleyville-falls",
    "park": "busch-gardens",
    "n": 8,
    "name": "Stanleyville Falls",
    "category": "atracao",
    "lat": 28.037792,
    "lng": -82.424087,
    "area": "Stanleyville",
    "intensity": "Moderada",
    "description": "Toras com uma queda bem molhada.",
    "tags": [
      "Água"
    ]
  },
  {
    "id": "walkabout-way-cangurus",
    "park": "busch-gardens",
    "n": 9,
    "name": "Walkabout Way (cangurus)",
    "category": "atracao",
    "lat": 28.032991,
    "lng": -82.425758,
    "area": "Jungala",
    "intensity": "Leve",
    "description": "Contato de perto com cangurus e outros animais australianos.",
    "tags": [
      "Animais",
      "Crianças"
    ]
  },
  {
    "id": "air-grover",
    "park": "busch-gardens",
    "n": 10,
    "name": "Air Grover",
    "category": "atracao",
    "lat": 28.034607,
    "lng": -82.425313,
    "area": "Sesame Street Safari of Fun",
    "intensity": "Leve",
    "description": "Primeira montanha-russa ideal para os pequenos.",
    "tags": [
      "Crianças"
    ]
  },
  {
    "id": "zambia-smokehouse",
    "park": "busch-gardens",
    "n": 1,
    "name": "Zambia Smokehouse",
    "category": "restaurante",
    "lat": 28.037065,
    "lng": -82.425745,
    "area": "Stanleyville",
    "description": "Churrasco defumado com vista para a SheiKra.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "dragon-fire-grill",
    "park": "busch-gardens",
    "n": 2,
    "name": "Dragon Fire Grill",
    "category": "restaurante",
    "lat": 28.037094,
    "lng": -82.422765,
    "area": "Pantopia",
    "description": "Lanches variados e mesas cobertas.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "zagora-cafe",
    "park": "busch-gardens",
    "n": 3,
    "name": "Zagora Cafe",
    "category": "restaurante",
    "lat": 28.033797,
    "lng": -82.422368,
    "area": "Morocco",
    "description": "Café com refeições leves na área do Marrocos.",
    "tags": [
      "Rápido"
    ]
  },
  {
    "id": "twisted-tails",
    "park": "busch-gardens",
    "n": 4,
    "name": "Twisted Tails",
    "category": "restaurante",
    "lat": 28.037861,
    "lng": -82.422816,
    "area": "Pantopia",
    "description": "Pretzels e petiscos para o meio da tarde.",
    "tags": [
      "Doces"
    ]
  },
  {
    "id": "emporium",
    "park": "busch-gardens",
    "n": 1,
    "name": "Emporium",
    "category": "compras",
    "lat": 28.033177,
    "lng": -82.421832,
    "area": "Morocco",
    "description": "Loja principal com souvenirs do parque.",
    "tags": [
      "Souvenirs"
    ]
  },
  {
    "id": "build-a-bear-workshop",
    "park": "busch-gardens",
    "n": 2,
    "name": "Build-A-Bear Workshop",
    "category": "compras",
    "lat": 28.033177,
    "lng": -82.422056,
    "area": "Morocco",
    "description": "Monte seu bichinho de pelúcia personalizado.",
    "tags": [
      "Crianças"
    ]
  }
]
