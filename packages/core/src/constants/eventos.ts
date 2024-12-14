import { Evento } from "../evento";

const eventos: Evento[] = [
  {
    id: "21ff36d7-8fa7-495e-9339-d1687458b660",
    alias: "evento-fullstack",
    senha: "senha123",
    nome: "Evento de Desenvolvimento Fullstack",
    data: new Date("2024-12-01T10:00:00Z"),
    local: "São Paulo, SP",
    descricao:
      "Um evento completo para aprender desenvolvimento fullstack do zero.",
    imagem:
      "https://images.prismic.io/vaultinum/0458a9f1-e149-4037-b9aa-aa4b4fb53c25_propriete-intellectuelle-code-source-protection-compressed.jpg?auto=compress,format&rect=0,0,2400,981&w=2400&h=981",
    imagemBackground:
      "https://images.prismic.io/vaultinum/0458a9f1-e149-4037-b9aa-aa4b4fb53c25_propriete-intellectuelle-code-source-protection-compressed.jpg?auto=compress,format&rect=0,0,2400,981&w=2400&h=981",
    publicoEsperado: 200,
    convidados: [
      {
        id: "9db594ba-2015-4126-923b-9453d7edd552",
        nome: "Alice Silva",
        email: "alice@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 1,
      },
      {
        id: "7f76598d-5025-45d7-950a-45dbc52307ab",
        nome: "Carlos Pereira",
        email: "carlos@example.com",
        confirmado: false,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
      {
        id: "be33b1e3-6d44-45d3-80dc-c9a4b61e389a",
        nome: "Beatriz Lima",
        email: "beatriz@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 2,
      },
    ],
  },
  {
    id: "f4b18eb7-13c6-4bde-aa26-a9551a5c31f2",
    alias: "evento-js-avancado",
    senha: "js2024",
    nome: "Workshop Avançado de JavaScript",
    data: new Date("2024-11-20T15:00:00Z"),
    local: "Rio de Janeiro, RJ",
    descricao: "Um workshop avançado para programadores JavaScript.",
    imagem:
      "https://www.datocms-assets.com/48401/1628644950-javascript.png?auto=format&fit=max&w=1200",
    imagemBackground:
      "https://blog.cronapp.io/wp-content/uploads/2020/09/javascript-1.jpg",
    publicoEsperado: 100,
    convidados: [
      {
        id: "ce7781f9-ce90-480b-b33f-79551b436b30",
        nome: "Eduardo Santos",
        email: "eduardo@example.com",
        confirmado: true,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
      {
        id: "89fe8fda-bdd2-4a0c-aa4c-efed7a4da7a7",
        nome: "Fernanda Costa",
        email: "fernanda@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 1,
      },
    ],
  },
  {
    id: "3a588693-650e-4c6d-868e-9090ff5c07b3",
    alias: "evento-dev-frontend",
    senha: "front123",
    nome: "Bootcamp de Desenvolvimento Frontend",
    data: new Date("2024-11-15T09:00:00Z"),
    local: "Belo Horizonte, MG",
    descricao: "Aprenda a criar interfaces incríveis e responsivas.",
    imagem:
      "https://www.simplilearn.com/ice9/free_resources_article_thumb/recact_angular_vue.jpg",
    imagemBackground:
      "https://www.frontendmag.com/wp-content/uploads/2023/01/easiest-front-end-framework.jpeg",
    publicoEsperado: 150,
    convidados: [
      {
        id: "961e8ef3-8492-4bb6-8e99-4e07d175a18c",
        nome: "Gabriela Rocha",
        email: "gabriela@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 1,
      },
      {
        id: "c9807f9f-d3c8-4dee-b49c-ae09cf3329e8",
        nome: "Hugo Nogueira",
        email: "hugo@example.com",
        confirmado: false,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
      {
        id: "d4f25df3-bd22-4b1d-a6ba-c8fd625ef117",
        nome: "Isabela Martins",
        email: "isabela@example.com",
        confirmado: true,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
    ],
  },
  {
    id: "7a0a5640-8e46-404d-bd90-dcba6589d57c",
    alias: "casamento-alberto-marina",
    senha: "casamento2024",
    nome: "Casamento do Alberto e Marina",
    data: new Date("2024-11-25T16:00:00Z"),
    local: "Florianópolis, SC",
    descricao:
      "Celebração do casamento de Alberto e Marina com amigos e familiares.",
    imagem:
      "https://i.em.com.br/IQ1l_dkc9VYK5P8PW-EaTphOuF4=/790x/smart/imgsapp.em.com.br/app/noticia_127983242361/2023/05/21/1496049/uma-cor-que-esta-totalmente-proibida-para-as-convidadas-de-acordo-com-a-etiqueta-de-casamento-e-o-branco-que-esta-reservado-para-as-noivas-a-nao-ser-que-o-casamento-seja-na-praia_1_55583.jpg",
    imagemBackground:
      "https://www.psicologo.com.br/wp-content/uploads/casamento-feliz-um-guia-para-casamentos-felizes.jpg",
    publicoEsperado: 150,
    convidados: [
      {
        id: "c7f15188-0f9a-454e-8d05-694308106b21",
        nome: "Bruno Cardoso",
        email: "bruno@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 1,
      },
      {
        id: "384493ec-f538-4af0-95bb-eff54a17d7eb",
        nome: "Carla Mendes",
        email: "carla@example.com",
        confirmado: true,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
    ],
  },
  {
    id: "5e25282b-cde5-45ff-9436-c4320d7c2f6f",
    alias: "aniversario-joao",
    senha: "joao2024",
    nome: "Aniversário do João - 30 Anos",
    data: new Date("2024-12-05T18:00:00Z"),
    local: "Curitiba, PR",
    descricao:
      "Comemoração dos 30 anos de João com amigos próximos e familiares.",
    imagem:
      "https://img.elo7.com.br/product/600x380/4C55C74/capa-painel-redondo-tema-feliz-aniversario-em-tecido-1-50m-festa.jpg",
    imagemBackground:
      "https://img.freepik.com/vetores-gratis/fundo-da-celebracao-dos-baloes-e-confetti_1048-2223.jpg",
    publicoEsperado: 80,
    convidados: [
      {
        id: "62f27c65-d52e-4e4b-aeb1-e6c861539806",
        nome: "Maria Souza",
        email: "maria@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 2,
      },
      {
        id: "eb5d60e7-ee91-4d6f-8365-33a2ef65ffd7",
        nome: "José Almeida",
        email: "jose@example.com",
        confirmado: false,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
    ],
  },
  {
    id: "53ae44ec-30fb-4e5a-9b0b-a9fbedd8e3c1",
    alias: "inauguracao-loja-estrela",
    senha: "estrela2024",
    nome: "Inauguração da Loja Estrela",
    data: new Date("2024-12-10T09:00:00Z"),
    local: "Porto Alegre, RS",
    descricao:
      "Evento de inauguração da nova loja Estrela com brindes e promoções.",
    imagem:
      "https://cosmeticinnovation.com.br/wp-content/uploads/2018/01/estrela_cosmeticos.png",
    imagemBackground:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ-0_VdF_lcXATRHDUaaI0AQCt8R6Y_ShR3A&s",
    publicoEsperado: 300,
    convidados: [
      {
        id: "56d33644-21e0-45d6-8374-b63492542957",
        nome: "Cláudia Lima",
        email: "claudia@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 3,
      },
      {
        id: "08ce7902-a86f-4991-97bc-8cf5661fa328",
        nome: "Ricardo Barbosa",
        email: "ricardo@example.com",
        confirmado: true,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
    ],
  },
  {
    id: "65965e1c-8055-4795-b4a3-da93bbe97e31",
    alias: "reuniao-familia-oliveira",
    senha: "familia2024",
    nome: "Reunião da Família Oliveira",
    data: new Date("2024-12-15T12:00:00Z"),
    local: "Salvador, BA",
    descricao: "Reunião de fim de ano da família Oliveira.",
    imagem:
      "https://www.themonastery.org/assets/themonastery/blog/scaled/duggars.jpg",
    imagemBackground:
      "https://img.freepik.com/fotos-premium/ondas-abstratas-brilhantes-de-celebracao-do-arco-iris-fluem-suavemente-geradas-por-ia_188544-9530.jpg?semt=ais_hybrid",
    publicoEsperado: 50,
    convidados: [
      {
        id: "70aad3a8-3307-4b4b-a8c6-a3796b7aef66",
        nome: "Thiago Oliveira",
        email: "thiago@example.com",
        confirmado: true,
        possuiAcompanhantes: true,
        qtdeAcompanhantes: 4,
      },
      {
        id: "5cf2c395-a931-4234-889f-7a8701c8e5fc",
        nome: "Letícia Oliveira",
        email: "leticia@example.com",
        confirmado: true,
        possuiAcompanhantes: false,
        qtdeAcompanhantes: 0,
      },
    ],
  },
];

export default eventos;
