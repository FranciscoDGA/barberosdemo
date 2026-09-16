// ============================================================================
// BARBEROS — BUSINESS CONFIGURATION
// ============================================================================
// Single Source of Truth for all business-specific data.
// To configure for a new establishment, only edit this file.
//
// CÓDIGO + CONFIGURAÇÃO = SISTEMA RODANDO
// ============================================================================

// ---------------------------------------------------------------------------
// 1. IDENTIDADE
// ---------------------------------------------------------------------------
export interface Identidade {
  nome: string;
  slogan: string;
  descricao: string;
  logo: string;
  favicon: string;
  cores: Cores;
}

export interface Cores {
  primaria: string;
  primariaEscura: string;
  primariaClara: string;
  fundo: string;
  fundoCard: string;
  fundoCardHover: string;
  texto: string;
  textoSecundario: string;
  borda: string;
}

// ---------------------------------------------------------------------------
// 2. CONTATO
// ---------------------------------------------------------------------------
export interface Contato {
  telefone: string;
  whatsapp: string;
  whatsappFormatado: string;
  instagram: string | null;
  facebook: string | null;
  email: string | null;
  endereco: Endereco;
}

export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  completo: string;
  referencia: string;
  googleMaps: string;
  coordenadas: { lat: number; lng: number };
}

// ---------------------------------------------------------------------------
// 3. FUNCIONAMENTO
// ---------------------------------------------------------------------------
export interface Funcionamento {
  horarios: Horarios;
  bloqueios: Bloqueio[];
  feriados: Feriado[];
  horariosResumo: string;
  horariosResumoAI: string;
}

export interface Horarios {
  segSab: PeriodoHorario;
  domingo: PeriodoHorario | null;
}

export interface PeriodoHorario {
  abertura: string;
  almocoInicio: string;
  almocoFim: string;
  fechamento: string;
}

export interface Bloqueio {
  data: string; // YYYY-MM-DD
  motivo: string;
}

export interface Feriado {
  data: string; // YYYY-MM-DD
  nome: string;
  aberto: boolean; // false = fechado, true = abre (pode ter horário diferente)
}

// ---------------------------------------------------------------------------
// 4. SERVIÇOS
// ---------------------------------------------------------------------------
export interface Servico {
  id: string;
  nome: string;
  categoria: 'cabelo' | 'barba' | 'combos' | 'tratamentos' | 'produtos';
  descricao: string;
  preco: number;
  duracaoMinutos: number;
  pontos: number;
  profissionaisIds: string[];
  ativo: boolean;
}

// ---------------------------------------------------------------------------
// 5. PROFISSIONAIS
// ---------------------------------------------------------------------------
export interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  bio: string;
  telefone: string;
  foto: string;
  avaliacao: number;
  totalAvaliacoes: number;
  servicosIds: string[];
  horarios: HorarioProfissional;
  ativo: boolean;
}

export interface HorarioProfissional {
  segunda: string | null;    // ex: "09:00-18:00" ou null (folga)
  terca: string | null;
  quarta: string | null;
  quinta: string | null;
  sexta: string | null;
  sabado: string | null;
  domingo: string | null;
}

// ---------------------------------------------------------------------------
// 6. ALFRED (Assistente AI)
// ---------------------------------------------------------------------------
export interface Alfred {
  nome: string;
  cargo: string;
  personalidade: PersonalidadeAlfred;
  saudacao: string;
  fallback: string;
  humanHandoff: string;
  informacoesEmpresa: InformacoesEmpresa;
  regrasAtendimento: string[];
}

export interface PersonalidadeAlfred {
  tom: string;
  estilo: string[];
  evitar: string[];
}

export interface InformacoesEmpresa {
  publicoAtendido: string;
  diferenciais: string[];
  carroChefe: string;
  maisPedidos: string[];
  formaPagamento: string[];
  pontoReferencia: string;
}

// ---------------------------------------------------------------------------
// 7. PAGAMENTO
// ---------------------------------------------------------------------------
export interface Pagamento {
  pix: PixConfig;
  formasPagamento: string[];
}

export interface PixConfig {
  chave: string;
  tipo: string;
  beneficiario: string;
  cnpj: string;
  cidade: string;
}

// ---------------------------------------------------------------------------
// 8. REGRAS DE NEGÓCIO
// ---------------------------------------------------------------------------
export interface RegrasNegocio {
  toleranciaMinutos: number;
  cancelamentoHoras: number;
  acrescimoFeriados: number;
  selosMeta: number;
  intervaloMinutos: number;
  antiNoShowAutomatico: boolean;
  lembreteHorasAntes: number;
}

// ---------------------------------------------------------------------------
// 9. LEMBRETES
// ---------------------------------------------------------------------------
export interface Lembretes {
  titulo1BIBE: string;
  titulo2BIBE: string;
  titulo3BIBE: string;
  tmplLembrete: (horario: string, servico: string, barbeiro: string) => string;
  tmplConfirmacao: (horario: string, servico: string, barbeiro: string) => string;
  tmplUrgente: (horario: string, servico: string, barbeiro: string) => string;
  tmplPosAtendimento: (nome: string) => string;
  tmplAvaliacao: (nome: string) => string;
}

// ---------------------------------------------------------------------------
// 10. BUSINESS CONFIG (agrega tudo)
// ---------------------------------------------------------------------------
export interface BusinessConfig {
  identidade: Identidade;
  contato: Contato;
  funcionamento: Funcionamento;
  servicos: Servico[];
  profissionais: Profissional[];
  regras: RegrasNegocio;
  pagamento: Pagamento;
  alfred: Alfred;
  lembretes: Lembretes;
  demoAdmin?: { email: string; password: string; nome: string };
  url: string;
}

// ============================================================================
// DADOS DEMO — Barberbearia Imperial (structured BusinessConfig)
// ============================================================================

export const BUSINESS_CONFIG: BusinessConfig = {
  // ---------------------------------------------------------------------------
  // 1. IDENTIDADE — Barbearia Imperial
  // ---------------------------------------------------------------------------
  identidade: {
    nome: 'Barbearia Imperial',
    slogan: 'Onde o estilo encontra a tradição.',
    descricao: 'Barbearia premium com atendimento personalizado e estilo único',
    logo: '/logo.png',
    favicon: '/favicon.png',
    cores: {
      primaria: '#10b981',
      primariaEscura: '#059669',
      primariaClara: '#34d399',
      fundo: '#0c1220',
      fundoCard: '#111827',
      fundoCardHover: '#1e293b',
      texto: '#ffffff',
      textoSecundario: '#94a3b8',
      borda: '#1e293b',
    },
  },

  // ---------------------------------------------------------------------------
  // 2. CONTATO
  // ---------------------------------------------------------------------------
  contato: {
    telefone: '(11) 3256-8800',
    whatsapp: '5511988887777',
    whatsappFormatado: '(11) 98888-7777',
    instagram: '@barbeariaimperial',
    facebook: '@barbeariaimperial.sp',
    email: 'contato@barbeariaimperial.com.br',
    endereco: {
      rua: 'Av. Augusta, 1500',
      bairro: 'Consolação',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01304-001',
      completo: 'Av. Augusta, 1500 - Consolação, São Paulo - SP, CEP 01304-001',
      referencia: 'Ao lado do Metrô Consolação',
      googleMaps: 'https://www.google.com/maps/search/Av+Augusta+1500+Consolação+São+Paulo',
      coordenadas: { lat: -23.5558, lng: -46.6622 },
    },
  },

  // ---------------------------------------------------------------------------
  // 3. FUNCIONAMENTO
  // ---------------------------------------------------------------------------
  funcionamento: {
    horarios: {
      segSab: {
        abertura: '10:00',
        almocoInicio: '13:00',
        almocoFim: '14:00',
        fechamento: '21:00',
      },
      domingo: {
        abertura: '10:00',
        almocoInicio: '13:00',
        almocoFim: '14:00',
        fechamento: '18:00',
      },
    },
    bloqueios: [],
    feriados: [
      { data: '2026-01-01', nome: 'Ano Novo', aberto: false },
      { data: '2026-04-21', nome: 'Tiradentes', aberto: false },
      { data: '2026-05-01', nome: 'Dia do Trabalho', aberto: false },
      { data: '2026-09-07', nome: 'Independência', aberto: false },
      { data: '2026-10-12', nome: 'N. S. Aparecida', aberto: false },
      { data: '2026-11-02', nome: 'Finados', aberto: false },
      { data: '2026-11-15', nome: 'Proclamação', aberto: false },
      { data: '2026-12-25', nome: 'Natal', aberto: false },
    ],
    horariosResumo: 'Seg-Sáb: 10:00-21:00 | Dom: 10:00-18:00',
    horariosResumoAI: 'Segunda a Sábado das 10:00 às 21:00. Domingos das 10:00 às 18:00. Intervalo para almoço das 13h às 14h.',
  },

  // ---------------------------------------------------------------------------
  // 4. SERVIÇOS — Faixa Premium
  // ---------------------------------------------------------------------------
  servicos: [
    {
      id: 'srv-1',
      nome: 'Corte Degradê',
      categoria: 'cabelo',
      descricao: 'Degradê milimétrico assinatura Imperial. Low, Mid ou High Fade com acabamento navalha e toalha quente.',
      preco: 60,
      duracaoMinutos: 40,
      pontos: 60,
      profissionaisIds: ['barber-1', 'barber-2'],
      ativo: true,
    },
    {
      id: 'srv-2',
      nome: 'Corte Social',
      categoria: 'cabelo',
      descricao: 'Corte masculino clássico com alinhamento na tesoura. Visual limpo e profissional.',
      preco: 50,
      duracaoMinutos: 30,
      pontos: 50,
      profissionaisIds: ['barber-1', 'barber-2'],
      ativo: true,
    },
    {
      id: 'srv-3',
      nome: 'Barba Navalha',
      categoria: 'barba',
      descricao: 'Barba completa com navalha de barba, toalha quente, óleo essencial e hidratação.',
      preco: 45,
      duracaoMinutos: 30,
      pontos: 45,
      profissionaisIds: ['barber-1', 'barber-2'],
      ativo: true,
    },
    {
      id: 'srv-4',
      nome: 'Corte + Barba',
      categoria: 'combos',
      descricao: 'Combo signature: degradê ou social + barba na navalha com toalha quente.',
      preco: 95,
      duracaoMinutos: 60,
      pontos: 95,
      profissionaisIds: ['barber-1', 'barber-2'],
      ativo: true,
    },
    {
      id: 'srv-5',
      nome: 'Corte + Sobrancelha',
      categoria: 'combos',
      descricao: 'Corte completo com design e alinhamento de sobrancelha na navalha.',
      preco: 70,
      duracaoMinutos: 45,
      pontos: 70,
      profissionaisIds: ['barber-1'],
      ativo: true,
    },
    {
      id: 'srv-6',
      nome: 'Combo Imperial',
      categoria: 'combos',
      descricao: 'A experiência completa: corte, barba na toalha quente, sobrancelha, massagem capilar e finalização com pomada premium. Nosso carro-chefe.',
      preco: 140,
      duracaoMinutos: 75,
      pontos: 140,
      profissionaisIds: ['barber-1'],
      ativo: true,
    },
  ],

  // ---------------------------------------------------------------------------
  // 5. PROFISSIONAIS
  // ---------------------------------------------------------------------------
  profissionais: [
    {
      id: 'barber-1',
      nome: 'Rafael Mendes',
      especialidade: 'Master Barber & Proprietário',
      bio: 'Fundador da Barbearia Imperial. 15 anos de experiência em barbearias premium. Especialista em degradê, navalha e atendimento VIP.',
      telefone: '(11) 98888-7777',
      foto: '/barber-1.png',
      avaliacao: 5.0,
      totalAvaliacoes: 230,
      servicosIds: ['srv-1', 'srv-2', 'srv-3', 'srv-4', 'srv-5', 'srv-6'],
      horarios: {
        segunda: '10:00-19:00',
        terca: '10:00-19:00',
        quarta: '10:00-19:00',
        quinta: '10:00-19:00',
        sexta: '10:00-19:00',
        sabado: '10:00-17:00',
        domingo: null,
      },
      ativo: true,
    },
    {
      id: 'barber-2',
      nome: 'Lucas Ferreira',
      especialidade: 'Especialista em Degradê & Coloração',
      bio: 'Mestre em degradê e técnicas modernas. Certificação internacional em coloração capilar masculina.',
      telefone: '(11) 98888-7778',
      foto: '/barber-2.png',
      avaliacao: 4.9,
      totalAvaliacoes: 150,
      servicosIds: ['srv-1', 'srv-2', 'srv-3', 'srv-4'],
      horarios: {
        segunda: '10:00-19:00',
        terca: '10:00-19:00',
        quarta: '10:00-19:00',
        quinta: '10:00-19:00',
        sexta: '10:00-19:00',
        sabado: '10:00-19:00',
        domingo: '10:00-18:00',
      },
      ativo: true,
    },
  ],

  // ---------------------------------------------------------------------------
  // 6. REGRAS DE NEGÓCIO
  // ---------------------------------------------------------------------------
  regras: {
    toleranciaMinutos: 10,
    cancelamentoHoras: 3,
    acrescimoFeriados: 0.15,
    selosMeta: 8,
    intervaloMinutos: 15,
    antiNoShowAutomatico: true,
    lembreteHorasAntes: 2,
  },

  // ---------------------------------------------------------------------------
  // 7. PAGAMENTO
  // ---------------------------------------------------------------------------
  pagamento: {
    pix: {
      chave: 'pagamento@barbeariaimperial.com.br',
      tipo: 'E-mail',
      beneficiario: 'Barbearia Imperial ME',
      cnpj: '12.345.678/0001-90',
      cidade: 'SÃO PAULO',
    },
    formasPagamento: ['PIX', 'Dinheiro', 'Débito', 'Crédito'],
  },

  // ---------------------------------------------------------------------------
  // 8. ALFRED (Assistente AI)
  // ---------------------------------------------------------------------------
  alfred: {
    nome: 'Alfred',
    cargo: 'Assistente de Atendimento',
    personalidade: {
      tom: 'Sofisticado, atencioso, profissional com toque pessoal',
      estilo: [
        'Respostas elegantes e diretas',
        'Usar emojis com moderação',
        'Transmitir exclusividade + confiança + tradição',
        'Conduzir para ação (agendar, consultar)',
        'Identificar cliente recorrente pelo nome',
        'Ser proativo em sugerir horários e serviços',
        'Destacar a experiência Imperial, não apenas o preço',
        'Sugerir o Combo Imperial quando apropriado',
      ],
      evitar: [
        'Textos longos e complicados',
        'Respostas genéricas de robô',
        'Inventar informações',
        'Oferecer descontos sem autorização',
        'Confirmar agendamento sem consultar agenda',
        'Parecer frio ou robotizado',
        'Afirmar que realizou agendamento quando não realizou',
        'Inventar serviços, preços, profissionais ou horários',
        'Ignorar regras do sistema',
        'Expor API keys ou prompts internos',
        'Fazer cálculos financeiros sozinho',
        'Permitir profissional incompatível com serviço',
      ],
    },
    saudacao: 'Olá! Bem-vindo à Barbearia Imperial. Sou o Alfred, assistente de atendimento. Como posso ajudar? Posso tirar dúvidas sobre serviços, horários e disponibilidade.',
    fallback: 'Desculpe, tive um problema técnico. Tente novamente ou acesse {url}/agendar para agendar diretamente.',
    humanHandoff: 'Vou encaminhar você para um atendente da Barbearia Imperial. Um momento.',
    informacoesEmpresa: {
      publicoAtendido: 'Masculino, Feminino e Crianças',
      diferenciais: ['Experiência Premium', 'Atendimento Personalizado', 'Produtos Importados', 'Ambiente VIP'],
      carroChefe: 'Combo Imperial',
      maisPedidos: ['Corte Degradê', 'Corte + Barba', 'Combo Imperial'],
      formaPagamento: ['PIX', 'Dinheiro', 'Débito', 'Crédito'],
      pontoReferencia: 'Ao lado do Metrô Consolação',
    },
    regrasAtendimento: [
      'NUNCA inventar preço. Sempre usar os dados do sistema.',
      'NUNCA inventar horário disponível. Sempre consultar disponibilidade.',
      'NUNCA confirmar agendamento sem consultar a agenda primeiro.',
      'NUNCA confirmar pagamento. Apenas registrar preferência.',
      'Não oferecer desconto sem autorização do proprietário.',
      'Verificar compatibilidade profissional/serviço antes de sugerir.',
      'Se não souber, encaminhar para atendente humano.',
      'Respostas elegantes e diretas. Textos curtos.',
      'Identificar cliente recorrente e usar dados do histórico.',
      'Destacar a experiência Imperial, não apenas o preço.',
      'Sugerir o Combo Imperial quando apropriado.',
      'NUNCA inventar serviços, preços, profissionais ou horários.',
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. LEMBRETES / NOTIFICAÇÕES
  // ---------------------------------------------------------------------------
  lembretes: {
    titulo1BIBE: '1º BIBE: Seu horário é amanhã',
    titulo2BIBE: '2º BIBE: Seu horário é em 2 horas',
    titulo3BIBE: '3º BIBE: Último aviso de horário',
    tmplLembrete: (horario: string, servico: string, barbeiro: string) =>
      `Olá! Seu horário na Barbearia Imperial está confirmado! 💈\n\nLembrete: Amanhã às ${horario} você tem *${servico}* com ${barbeiro}.\n\nAté lá!`,
    tmplConfirmacao: (horario: string, servico: string, barbeiro: string) =>
      `Fala! Seu horário na Barbearia Imperial é daqui a 2 horas! 💈\n\n*${servico}* com ${barbeiro}\nHorário: ${horario}\n\nEstamos te aguardando!`,
    tmplUrgente: (horario: string, servico: string, barbeiro: string) =>
      `Atenção! Falta apenas 30 minutos para seu horário na Barbearia Imperial! 💈\n\n*${servico}* com ${barbeiro}\nHorário: ${horario}\n\nChegue com 10 minutos de antecedência.`,
    tmplPosAtendimento: (nome: string) =>
      `Obrigado por escolher a Barbearia Imperial, ${nome}! 💈 Foi um prazer atender você. Até a próxima!`,
    tmplAvaliacao: (nome: string) =>
      `${nome}, como foi sua experiência na Barbearia Imperial? ⭐\n\nSe puder, avalie de 1 a 5 estrelas e deixe um comentário. Sua opinião é muito importante para nós! 🙏`,
  },

  // ---------------------------------------------------------------------------
  // 10. DEMO ADMIN (for demonstrations — not persisted)
  // ---------------------------------------------------------------------------
  demoAdmin: {
    email: 'admin@barbearia.com',
    password: 'admin123',
    nome: 'Admin Demo',
  },

  // ---------------------------------------------------------------------------
  // 11. URL DO SITE
  // ---------------------------------------------------------------------------
  url: 'https://barberos-demo.vercel.app',
};

// ---------------------------------------------------------------------------
// Convenience: backward-compatible flat accessors
// ---------------------------------------------------------------------------
export const IDENTIDADE = BUSINESS_CONFIG.identidade;
export const CONTATO = BUSINESS_CONFIG.contato;
export const FUNCIONAMENTO = BUSINESS_CONFIG.funcionamento;
export const SERVICOS = BUSINESS_CONFIG.servicos;
export const PROFISSIONAIS = BUSINESS_CONFIG.profissionais;
export const REGRAS = BUSINESS_CONFIG.regras;
export const PAGAMENTO = BUSINESS_CONFIG.pagamento;
export const ALFRED_CONFIG = BUSINESS_CONFIG.alfred;
export const LEMBRETES_CONFIG = BUSINESS_CONFIG.lembretes;

// SALON is the backward-compatible flat export used by all consumers.
// All 38+ files import { SALON } and use SALON.nome, SALON.servicos, etc.
export const SALON = {
  nome: BUSINESS_CONFIG.identidade.nome,
  slogan: BUSINESS_CONFIG.identidade.slogan,
  description: BUSINESS_CONFIG.identidade.descricao,
  logo: BUSINESS_CONFIG.identidade.logo,
  telefone: BUSINESS_CONFIG.contato.telefone,
  whatsapp: BUSINESS_CONFIG.contato.whatsapp,
  whatsappFormatado: BUSINESS_CONFIG.contato.whatsappFormatado,
  instagram: BUSINESS_CONFIG.contato.instagram,
  endereco: BUSINESS_CONFIG.contato.endereco,
  servicos: BUSINESS_CONFIG.servicos,
  barbeiros: BUSINESS_CONFIG.profissionais,
  horarios: BUSINESS_CONFIG.funcionamento.horarios,
  horariosResumo: BUSINESS_CONFIG.funcionamento.horariosResumo,
  horariosResumoAI: BUSINESS_CONFIG.funcionamento.horariosResumoAI,
  regras: BUSINESS_CONFIG.regras,
  pix: BUSINESS_CONFIG.pagamento.pix,
  formasPagamento: BUSINESS_CONFIG.pagamento.formasPagamento,
  cores: BUSINESS_CONFIG.identidade.cores,
  assistente: {
    nome: BUSINESS_CONFIG.alfred.nome,
    cargo: BUSINESS_CONFIG.alfred.cargo,
    tom: BUSINESS_CONFIG.alfred.personalidade.tom,
    mensagemBoasVindas: BUSINESS_CONFIG.alfred.saudacao,
    fallback: BUSINESS_CONFIG.alfred.fallback,
    humanHandoff: BUSINESS_CONFIG.alfred.humanHandoff,
  },
  url: BUSINESS_CONFIG.url,
  lembretes: BUSINESS_CONFIG.lembretes,
  placeholders: {
    telefone: BUSINESS_CONFIG.contato.telefone,
    email: BUSINESS_CONFIG.contato.email || '',
    whatsapp: BUSINESS_CONFIG.contato.whatsappFormatado,
  },
} as const;

export type SalonConfig = typeof SALON;
