// ============================================================================
// BARBEROS — SALON CONFIGURATION
// ============================================================================
// This is the SINGLE SOURCE OF TRUTH for all business-specific data.
// To customize for a new client, only edit this file.
//
// CÓDIGO + CONFIGURAÇÃO = NOVO CLIENTE
// ============================================================================

export const SALON = {
  // ---------------------------------------------------------------------------
  // 1. IDENTIDADE
  // ---------------------------------------------------------------------------
  nome: 'BarberOS Demo',
  slogan: 'Sua barbearia, seu estilo.',
  description: 'Sistema de agendamento para barbearias',
  logo: '/logo.png',

  // ---------------------------------------------------------------------------
  // 2. CONTATO
  // ---------------------------------------------------------------------------
  telefone: '(11) 99999-0000',
  whatsapp: '5511999990000',
  whatsappFormatado: '(11) 99999-0000',
  instagram: '@barberosdemo',

  // ---------------------------------------------------------------------------
  // 3. ENDEREÇO
  // ---------------------------------------------------------------------------
  endereco: {
    rua: 'Rua da Liberdade, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    completo: 'Rua da Liberdade, 123 - Centro, São Paulo - SP, CEP 01234-567',
    referencia: 'Em frente ao Shopping Center',
    googleMaps: 'https://www.google.com/maps/search/São+Paulo+SP',
    coordenadas: { lat: -23.5505, lng: -46.6333 },
  },

  // ---------------------------------------------------------------------------
  // 4. SERVIÇOS
  // ---------------------------------------------------------------------------
  servicos: [
    { id: 'srv-1', nome: 'Corte Social', categoria: 'cabelo', preco: 45, duracaoMinutos: 30, pontos: 45, ativo: true },
    { id: 'srv-2', nome: 'Corte Degradê', categoria: 'cabelo', preco: 50, duracaoMinutos: 40, pontos: 50, ativo: true },
    { id: 'srv-3', nome: 'Barba Simples', categoria: 'barba', preco: 35, duracaoMinutos: 30, pontos: 35, ativo: true },
    { id: 'srv-4', nome: 'Cabelo + Barba', categoria: 'combos', preco: 75, duracaoMinutos: 50, pontos: 75, ativo: true },
    { id: 'srv-5', nome: 'Cabelo + Sobrancelha', categoria: 'combos', preco: 60, duracaoMinutos: 45, pontos: 60, ativo: true },
    { id: 'srv-6', nome: 'Combo Completo', categoria: 'combos', preco: 110, duracaoMinutos: 60, pontos: 110, ativo: true },
  ],

  // ---------------------------------------------------------------------------
  // 5. PROFISSIONAIS
  // ---------------------------------------------------------------------------
  barbeiros: [
    {
      id: 'barber-1',
      nome: 'Carlos Silva',
      especialidade: 'Barbeiro Chefe & Especialista em Todos os Cortes',
      telefone: '(11) 99999-0001',
      foto: '/barber-1.jpg',
      avaliacao: 5.0,
      totalAvaliacoes: 120,
      ativo: true,
      servicosIds: ['srv-1', 'srv-2', 'srv-3', 'srv-4', 'srv-5', 'srv-6'],
    },
    {
      id: 'barber-2',
      nome: 'André Santos',
      especialidade: 'Especialista em Cortes Sociais e Degradê',
      telefone: '(11) 99999-0002',
      foto: '/barber-2.jpg',
      avaliacao: 4.9,
      totalAvaliacoes: 85,
      ativo: true,
      servicosIds: ['srv-1', 'srv-2', 'srv-3', 'srv-4'],
    },
  ],

  // ---------------------------------------------------------------------------
  // 6. HORÁRIOS DE FUNCIONAMENTO
  // ---------------------------------------------------------------------------
  horarios: {
    segSab: {
      abertura: '09:00',
      almocoInicio: '12:00',
      almocoFim: '14:00',
      fechamento: '20:00',
    },
    domingo: null, // null = fechado
    feriados: 'fechado',
  },

  // Resumo legível
  horariosResumo: 'Seg-Sáb: 09:00-12:00 / 14:00-20:00 | Dom: Fechado',
  horariosResumoAI: 'Segunda a Sábado 09:00-12:00 / 14:00-20:00. Domingos e feriados fechado.',

  // ---------------------------------------------------------------------------
  // 7. REGRAS DE NEGÓCIO
  // ---------------------------------------------------------------------------
  regras: {
    toleranciaMinutos: 10,
    cancelamentoHoras: 2,
    acrescimoFeriados: 0.10,
    selosMeta: 10,
    intervaloMinutos: 30,
    antiNoShowAutomatico: true,
    lembreteHorasAntes: 2,
  },

  // ---------------------------------------------------------------------------
  // 8. PAGAMENTO / PIX
  // ---------------------------------------------------------------------------
  pix: {
    chave: 'demo@barberos.com.br',
    tipo: 'E-mail',
    beneficiario: 'BarberOS Demo LTDA',
    cnpj: '00.000.000/0001-00',
    cidade: 'SÃO PAULO',
  },

  formasPagamento: ['PIX', 'Dinheiro', 'Débito', 'Crédito'],

  // ---------------------------------------------------------------------------
  // 9. CORES (CSS Variables geradas em globals.css)
  // ---------------------------------------------------------------------------
  cores: {
    primaria: '#f59e0b',        // amber-500
    primariaEscura: '#d97706',  // amber-600
    primariaClara: '#fbbf24',   // amber-400
    fundo: '#070a12',
    fundoCard: '#0f172a',
    fundoCardHover: '#1e293b',
    texto: '#ffffff',
    textoSecundario: '#94a3b8',
    borda: '#1e293b',
  },

  // ---------------------------------------------------------------------------
  // 10. ASSISTENTE AI
  // ---------------------------------------------------------------------------
  assistente: {
    nome: 'Alfred',
    cargo: 'Assistente Digital',
    tom: 'Profissional, moderno, educado e simpático',
    mensagemBoasVindas: 'Olá! Sou o Alfred, assistente da {nome}. Como posso ajudar? Posso tirar dúvidas sobre serviços, preços, horários e disponibilidade.',
    fallback: 'Desculpe, tive um problema técnico. Tente novamente ou acesse {url}/agendar para agendar diretamente.',
    humanHandoff: 'Vou encaminhar você para o atendimento humano com a equipe da {nome}.',
  },

  // ---------------------------------------------------------------------------
  // 11. URL DO SITE
  // ---------------------------------------------------------------------------
  url: 'https://barberos-demo.vercel.app',

  // ---------------------------------------------------------------------------
  // 12. LEMBRETES / NOTIFICAÇÕES
  // ---------------------------------------------------------------------------
  lembretes: {
    titulo1BIBE: '1º BIBE: Seu horário é amanhã',
    titulo2BIBE: '2º BIBE: Seu horário é em 2 horas',
    titulo3BIBE: '3º BIBE: Último aviso de horário',
    tmplLembrete: (horario: string, servico: string, barbeiro: string) =>
      `Olá! Você agendou um horário conosco, tudo certo! 💈\n\nLembrete: Amanhã às ${horario} você tem *${servico}* com ${barbeiro} na ${SALON.nome}.\n\nAté lá!`,
    tmplConfirmacao: (horario: string, servico: string, barbeiro: string) =>
      `Olá! Você agendou um horário conosco, tudo certo! 💈\n\nSeu horário é daqui a 2 horas:\n*${servico}* com ${barbeiro}\nHorário: ${horario}\n\nEstamos te esperando!`,
    tmplUrgente: (horario: string, servico: string, barbeiro: string) =>
      `Olá! Você agendou um horário conosco, tudo certo! 💈\n\nFalta apenas 30 minutos!\n*${servico}* com ${barbeiro}\nHorário: ${horario}\n\nChegue com 10 minutos de antecedência.`,
    tmplPosAtendimento: (nome: string) =>
      `Obrigado por escolher a ${SALON.nome}, ${nome}! 💈 Foi um prazer atender você. Seu feedback é muito importante para nós.`,
    tmplAvaliacao: (nome: string) =>
      `${nome}, como foi seu atendimento na ${SALON.nome}? ⭐\n\nSe puder, avalie de 1 a 5 estrelas e deixe um comentário. Isso nos ajuda a melhorar cada vez mais! 🙏`,
  },

  // ---------------------------------------------------------------------------
  // 13. PLACEHOLDERS / EXEMPLOS
  // ---------------------------------------------------------------------------
  placeholders: {
    telefone: '(11) 99999-0000',
    email: 'dono@barberos.com',
    whatsapp: '(11) 99999-8888',
  },
} as const;

export type SalonConfig = typeof SALON;
