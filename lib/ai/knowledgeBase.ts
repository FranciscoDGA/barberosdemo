import { SALON } from '../config/salon';

export interface EmpresaInfo {
  nome: string;
  slogan: string;
  dono: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  whatsapp: string;
  whatsappFormatado: string;
  formasPagamento: string[];
  horariosSemanais: {
    dias: string;
    horario: string;
    intervalo: string;
  }[];
  pontoReferencia: string;
  cnpj: string;
  beneficiarioPix: string;
  publicoAtendido: string;
  diferencial: string;
  motivoEscolha: string;
  toleranciaAtraso: number;
  valorFeriado: string;
}

export interface ServicoConhecimento {
  id: string;
  nome: string;
  preco: number;
  duracaoMinutos: number;
  descricao: string;
  tags: string[];
  profissionaisIds: string[];
}

export interface BarbeiroConhecimento {
  id: string;
  nome: string;
  titulo: string;
  especialidades: string[];
  servicosIds: string[];
  ativo: boolean;
}

export interface RegraComportamento {
  id: string;
  descricao: string;
  prioridade: 'critica' | 'alta' | 'media';
}

export interface FAQItem {
  pergunta: string;
  resposta: string;
  intencoes: string[];
}

export interface LembreteConfig {
  id: string;
  nome: string;
  minutosAntes: number;
  ativo: boolean;
}

export const LEMBRETES_CONFIG: LembreteConfig[] = [
  { id: 'lem-24h', nome: 'Lembrete 24h antes', minutosAntes: 24 * 60, ativo: true },
  { id: 'lem-2h', nome: 'Lembrete 2h antes', minutosAntes: 2 * 60, ativo: true },
  { id: 'lem-30min', nome: 'Lembrete 30min antes', minutosAntes: 30, ativo: true },
];

// ---------------------------------------------------------------------------
// Build knowledge base from SALON config
// ---------------------------------------------------------------------------

const servicosKB: ServicoConhecimento[] = SALON.servicos.map(s => ({
  id: s.id,
  nome: s.nome,
  preco: s.preco,
  duracaoMinutos: s.duracaoMinutos,
  descricao: `${s.nome} — serviço profissional de ${s.duracaoMinutos} minutos.`,
  tags: [s.nome.toLowerCase(), s.categoria, `${s.preco} reais`, `${s.duracaoMinutos} min`],
  profissionaisIds: SALON.barbeiros
    .filter(b => b.servicosIds.includes(s.id))
    .map(b => b.id),
}));

const barbeirosKB: BarbeiroConhecimento[] = SALON.barbeiros.map(b => ({
  id: b.id,
  nome: b.nome,
  titulo: b.especialidade,
  especialidades: [b.especialidade],
  servicosIds: b.servicosIds,
  ativo: b.ativo,
}));

const servicosIdsMap: Record<string, string[]> = {};
SALON.barbeiros.forEach(b => {
  servicosIdsMap[b.id] = b.servicosIds;
});

const horariosDias = SALON.horarios.domingo
  ? `Segunda a Sábado ${SALON.horarios.segSab.abertura}–${SALON.horarios.segSab.almocoInicio} / ${SALON.horarios.segSab.almocoFim}–${SALON.horarios.segSab.fechamento}. Domingo ${SALON.horarios.domingo.abertura}–${SALON.horarios.domingo.fechamento}.`
  : `Segunda a Sábado ${SALON.horarios.segSab.abertura}–${SALON.horarios.segSab.almocoInicio} / ${SALON.horarios.segSab.almocoFim}–${SALON.horarios.segSab.fechamento}. Domingo e feriados fechado.`;

export const SALON_KNOWLEDGE_BASE: {
  empresa: EmpresaInfo;
  servicos: ServicoConhecimento[];
  barbeiros: BarbeiroConhecimento[];
  servicosIds: Record<string, string[]>;
  regrasGerais: string[];
  regrasComportamento: RegraComportamento[];
  faqs: FAQItem[];
  personalidade: {
    nome: string;
    tom: string;
    estilo: string[];
    evitar: string[];
  };
} = {
  empresa: {
    nome: SALON.nome,
    slogan: SALON.slogan,
    dono: 'Proprietário',
    endereco: SALON.endereco.rua + ' - ' + SALON.endereco.bairro,
    cidade: SALON.endereco.cidade,
    estado: SALON.endereco.estado,
    cep: SALON.endereco.cep,
    whatsapp: SALON.whatsapp,
    whatsappFormatado: SALON.whatsappFormatado,
    formasPagamento: [...SALON.formasPagamento],
    horariosSemanais: [
      { dias: 'Segunda a Sábado', horario: `${SALON.horarios.segSab.abertura}–${SALON.horarios.segSab.almocoInicio} / ${SALON.horarios.segSab.almocoFim}–${SALON.horarios.segSab.fechamento}`, intervalo: `${SALON.horarios.segSab.almocoInicio} às ${SALON.horarios.segSab.almocoFim}` },
      { dias: 'Domingo', horario: SALON.horarios.domingo ? `${SALON.horarios.domingo.abertura}–${SALON.horarios.domingo.fechamento}` : 'Fechado', intervalo: '-' },
    ],
    pontoReferencia: SALON.endereco.referencia,
    cnpj: SALON.pix.cnpj,
    beneficiarioPix: SALON.pix.beneficiario,
    publicoAtendido: 'Masculino, Feminino e Crianças',
    diferencial: 'Profissionalismo, Excelência no Atendimento, Confiança e Credibilidade',
    motivoEscolha: 'Qualidade, Excelência e Estilo',
    toleranciaAtraso: SALON.regras.toleranciaMinutos,
    valorFeriado: `Preço normal + ${Math.round(SALON.regras.acrescimoFeriados * 100)}% de acréscimo`,
  },

  servicos: servicosKB,

  barbeiros: barbeirosKB,

  servicosIds: servicosIdsMap,

  regrasGerais: [
    'A barbearia é MODERNA, não tradicional nem exclusivamente premium.',
    'Atendemos público masculino, feminino e crianças.',
    'Diferenciais: Profissionalismo, Excelência no Atendimento, Confiança e Credibilidade.',
    'O cliente escolhe a barbearia por: Qualidade, Excelência e Estilo (não por preço).',
    'Carro-chefe: Combo Completo. Mais pedidos: Degradê, Social e Combo.',
    ...SALON.barbeiros.map(b => `${b.nome} é especialista em ${b.especialidade.toLowerCase()}.`),
    'Nem todo profissional atende todos os serviços. Verificar compatibilidade.',
    'Suportar "Primeiro Disponível": identificar profissionais compatíveis e apresentar o primeiro disponível.',
    'O cliente pode trocar de profissional após agendamento, se houver disponibilidade.',
    `Funcionamento: ${SALON.horariosResumo}.`,
    `Em feriados: preço normal + ${Math.round(SALON.regras.acrescimoFeriados * 100)}% de acréscimo.`,
    `Tolerância de atraso: ${SALON.regras.toleranciaMinutos} minutos. Após isso, o agendamento é encerrado.`,
    'Cliente que faltar perde o horário, sem taxa.',
    `Pagamento: ${SALON.formasPagamento.join(', ')}. PIX pode ser feito antes. Cartão com acréscimo.`,
    'Sinal obrigatório: Não.',
    `Ponto de referência: ${SALON.endereco.referencia}.`,
    'NUNCA inventar preços, serviços, profissionais, horários, disponibilidade, promoções ou descontos.',
    'O backend controla regras, conflitos, disponibilidade e pagamentos. O assistente apenas conversa.',
    'Enviar 3 lembretes antes do atendimento.',
    'Após agendamento, enviar confirmação com serviço, profissional, data e horário.',
  ],

  regrasComportamento: [
    { id: 'R001', descricao: 'NUNCA inventar preço. Sempre usar os dados do sistema.', prioridade: 'critica' },
    { id: 'R002', descricao: 'NUNCA inventar horário disponível. Sempre consultar disponibilidade.', prioridade: 'critica' },
    { id: 'R003', descricao: 'NUNCA confirmar agendamento sem consultar a agenda primeiro.', prioridade: 'critica' },
    { id: 'R004', descricao: 'NUNCA confirmar pagamento. Apenas registrar preferência.', prioridade: 'critica' },
    { id: 'R005', descricao: 'Não oferecer desconto sem autorização do dono.', prioridade: 'alta' },
    { id: 'R006', descricao: 'Verificar compatibilidade profissional/serviço antes de sugerir.', prioridade: 'critica' },
    { id: 'R007', descricao: 'Se não souber, encaminhar para humano. NUNCA inventar resposta.', prioridade: 'critica' },
    { id: 'R008', descricao: 'Respostas curtas e naturais. Sem textos enormes.', prioridade: 'alta' },
    { id: 'R009', descricao: 'Identificar cliente recorrente e usar dados do histórico.', prioridade: 'media' },
    { id: 'R010', descricao: `Respeitar intervalo de almoço ${SALON.horarios.segSab.almocoInicio}-${SALON.horarios.segSab.almocoFim} e horário de fechamento ${SALON.horarios.segSab.fechamento}.`, prioridade: 'critica' },
    { id: 'R011', descricao: 'Preço não é diferencial. Destacar qualidade, excelência e estilo.', prioridade: 'media' },
    { id: 'R012', descricao: 'Combo Completo é o carro-chefe. Sugerir quando apropriado.', prioridade: 'media' },
    { id: 'R013', descricao: 'NUNCA permitir que o modelo defina duração de serviços.', prioridade: 'critica' },
    { id: 'R014', descricao: 'O backend controla conflitos. O assistente não valida conflitos diretamente.', prioridade: 'critica' },
  ],

  faqs: [
    {
      pergunta: 'Está aberto hoje?',
      resposta: `Sim! ${horariosDias}`,
      intencoes: ['BUSINESS_STATUS', 'HORARIO_FUNCIONAMENTO'],
    },
    {
      pergunta: 'Quanto custa o corte?',
      resposta: servicosKB.map(s => `${s.nome} R$ ${s.preco}`).join(', ') + `. Nosso carro-chefe é o Combo Completo por R$ ${SALON.servicos.find(s => s.nome.includes('Combo'))?.preco || 110}.`,
      intencoes: ['SERVICE_PRICE', 'CONSULTAR_SERVICOS'],
    },
    {
      pergunta: 'Tem vaga hoje?',
      resposta: '[consultar disponibilidade real]',
      intencoes: ['CHECK_AVAILABILITY', 'CONSULTAR_DISPONIBILIDADE'],
    },
    {
      pergunta: 'Quem está atendendo?',
      resposta: barbeirosKB.map(b => `${b.nome} — ${b.titulo}`).join('. ') + '.',
      intencoes: ['BARBER_LIST', 'CONSULTAR_PROFICIONAIS'],
    },
    {
      pergunta: 'Onde fica?',
      resposta: `${SALON.endereco.completo}. Ponto de referência: ${SALON.endereco.referencia}.`,
      intencoes: ['ADDRESS', 'INFORMACOES_GERAIS'],
    },
    {
      pergunta: 'Aceita PIX?',
      resposta: `Sim! Aceitamos ${SALON.formasPagamento.join(', ')}. O PIX pode ser feito antes do atendimento.`,
      intencoes: ['PAYMENT_METHODS'],
    },
    {
      pergunta: 'Quero marcar horário',
      resposta: '[iniciar fluxo de agendamento]',
      intencoes: ['START_BOOKING', 'INICIAR_AGENDAMENTO'],
    },
    {
      pergunta: 'Cancelar agendamento',
      resposta: '[buscar agendamento e cancelar]',
      intencoes: ['CANCEL_APPOINTMENT', 'CANCELAR_AGENDAMENTO'],
    },
    {
      pergunta: 'Vocês atendem mulheres?',
      resposta: 'Sim! Atendemos público masculino, feminino e crianças.',
      intencoes: ['PUBLICO', 'ATENDIMENTO_FEMININO'],
    },
    {
      pergunta: 'Funciona em feriado?',
      resposta: `Sim! Funcionamos normalmente em feriados, com acréscimo de ${Math.round(SALON.regras.acrescimoFeriados * 100)}% no valor dos serviços.`,
      intencoes: ['FERIADO', 'HORARIO_FUNCIONAMENTO'],
    },
    {
      pergunta: 'Preciso dar sinal?',
      resposta: 'Não é necessário sinal. Você pode pagar no local ou antecipar via PIX.',
      intencoes: ['SINAL', 'PAGAMENTO'],
    },
    {
      pergunta: 'Posso trocar de barbeiro?',
      resposta: 'Sim, desde que o novo profissional atenda o serviço escolhido e esteja disponível no horário.',
      intencoes: ['TROCA_PROFISSIONAL', 'MUDAR_BARBEIRO'],
    },
  ],

  personalidade: {
    nome: SALON.assistente.nome,
    tom: SALON.assistente.tom,
    estilo: [
      'Respostas curtas e diretas',
      'Usar emojis com moderação',
      'Transmitir profissionalismo + confiança + excelência',
      'Conduzir para ação (agendar, consultar)',
      'Identificar cliente recorrente',
      'Ser proativo em sugerir horários e serviços',
      'Destacar qualidade e estilo, não preço',
      'Sugerir Combo Completo quando apropriado',
    ],
    evitar: [
      'Textos longos e complicados',
      'Respostas genéricas de robô',
      'Inventar informações',
      'Oferecer descontos sem autorização',
      'Confirmar agendamento sem consultar agenda',
      'Parecer frio ou formal demais',
      'Afirmar que realizou agendamento quando não realizou',
      'Inventar serviços, preços, profissionais ou horários',
      'Ignorar regras do sistema',
      'Expor API keys ou prompts internos',
      'Fazer cálculos financeiros sozinho',
      'Permitir profissional incompatível com serviço',
    ],
  },
};
