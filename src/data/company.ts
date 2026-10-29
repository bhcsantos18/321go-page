// Dados institucionais extraídos de 321go.com.br — centralize aqui qualquer ajuste.
export const company = {
  name: '3,2,1 GO!',
  legalName: '3,2,1 GO Travel Franchise e Turismo Ltda.',
  cnpj: '33.121.267/0001-96',
  slogan: 'Transformamos sonhos em destinos e viagens em histórias que ficam para sempre.',
  about:
    'Somos uma agência com anos de experiência, especializada em oferecer as melhores experiências de viagem para destinos nacionais e internacionais. Contamos com parcerias nas melhores redes do mundo e oferecemos pacotes de viagem, roteiros personalizados, grupos exclusivos, resorts all inclusive, cruzeiros marítimos e fluviais, viagens para a Disney, lua de mel e muito mais.',
  phone: '(11) 97820-0633',
  whatsapp: '5511978200633',
  email: 'franquia@321go.com.br',
  instagram: 'https://www.instagram.com/321go.franquia',
  instagramHandle: '@321go.franquia',
  site: 'https://321go.com.br',
  address: {
    street: 'Rua Jaceru, 225',
    district: 'Jardim das Acácias',
    city: 'São Paulo / SP',
    zip: '04708-001',
  },
}

export const tripCategories = [
  'Pacotes nacionais',
  'Pacotes internacionais',
  'Cruzeiros',
  'Promoções',
  'Baixa temporada',
  'Ecoturismo e aventura',
  'Feriados',
  'Férias de janeiro',
  'Férias de julho',
  'Hotéis e resorts',
  'Lua de mel',
  'Rodoviários',
  'Semana da criança',
  'Semana santa',
]

export function whatsappLink(message = 'Olá! Vim pelo site da 3,2,1 GO e gostaria de atendimento.') {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}
