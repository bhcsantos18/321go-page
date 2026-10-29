# 3,2,1 GO! — Site da agência

Site da 3,2,1 GO! Viagens: React 19, Vite, TypeScript, Tailwind CSS 4, Framer Motion e Leaflet com OpenStreetMap.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (site estático)
```

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Home: hero com caixa de orçamento por abas, serviços, como funciona, destinos, Orlando, Área do Cliente e franquia |
| `/destinos` | "Inspirações para a sua próxima viagem": carrossel com filtro por categoria e guia rápido |
| `/destinos/:slug` | Dicas do destino (melhor época, clima, documentos, o que fazer), ofertas ou estado "Fale com a equipe" |
| `/orlando` | Resorts (Disney, Universal, SeaWorld, Busch Gardens e outros) com os selos de cada parque |
| `/orlando/parques/:park` | Descrição, destaques, dicas e mapa interativo do parque |
| `/orlando/parques/:park/local/:poi` | Detalhes de cada atração, restaurante ou loja |
| `/orlando/mapas/:park` | Mapa em tela cheia (um por parque) |
| `/orlando/calculadora` | Calculadora de dias de parques, que envia o resultado junto com o pedido de ingressos |
| `/area-do-cliente` | Login e painel com viagens e documentos |
| `/painel` | Painel do consultor com as solicitações recebidas |
| `/privacidade`, `/termos` | Política de Privacidade e Termos de Uso (LGPD) |

## Onde editar o conteúdo

- `src/data/company.ts`: contatos, endereço, CNPJ, WhatsApp e redes sociais.
- `src/data/destinations.ts`: destinos, dicas e ofertas. Com `offers: []`, a página mostra o estado "Fale com a equipe".
- `src/data/parks.ts`: parques, resorts, dias sugeridos e movimento por mês.
- `src/data/pois.ts`: pontos dos mapas. As coordenadas vêm do OpenStreetMap e as descrições foram escritas pela equipe.
- `src/data/places.ts`: cidades e aeroportos usados na busca com autocompletar.
- `public/img/photos`: fotos do Unsplash, que podem ser usadas comercialmente sem atribuição.

## Integrações a conectar em produção

1. **Envio das solicitações.** Configure `VITE_QUOTE_ENDPOINT` (veja `.env.example`) com um webhook (n8n, Make, Zapier), o Formspree ou a API do CRM. O site faz um POST com o JSON completo e um resumo em texto. Sem essa variável, as solicitações ficam só no `/painel` do navegador em que foram feitas. Na tela de confirmação, o cliente também pode mandar o resumo pelo WhatsApp ou por e-mail.
2. **Área do Cliente.** `src/lib/auth.tsx` usa um cliente de demonstração (`cliente@321go.com.br` / `321go`). Para produção, troque a função `login` por uma chamada à API de autenticação e carregue viagens e documentos do backend.
3. **Painel do consultor.** Hoje o `/painel` lê do `localStorage`. Em produção, ele deve ler do mesmo backend ou CRM que recebe as solicitações e ficar protegido por login.
4. **Mapas.** Os mapas usam os tiles públicos do OpenStreetMap, que têm política de uso justo. Com tráfego alto, use um provedor de tiles (MapTiler, Stadia, Carto) ou um mapa ilustrado próprio, trocando `TILE_URL` em `src/components/map/ParkMap.tsx`.
5. **Logos dos parques.** Os selos são ícones estilizados. Os logotipos oficiais são marcas registradas e só podem entrar no `ParkBadge` com licença de uso.
6. **Textos legais.** Revise a Política de Privacidade e os Termos de Uso com a assessoria jurídica antes de publicar.
