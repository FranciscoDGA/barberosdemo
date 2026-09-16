'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, ArrowRight } from 'lucide-react';
import { SALON } from '@/lib/config/salon';

interface DemoMessage {
  role: 'user' | 'assistant';
  content: string;
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Agendar horário', action: 'agendar' },
  { label: 'Ver serviços', action: 'servicos' },
  { label: 'Conhecer profissionais', action: 'profissionais' },
  { label: 'Horários de funcionamento', action: 'horarios' },
  { label: 'Como chegar', action: 'como_chegar' },
];

function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(0).replace('.', ',')}`;
}

function getAlfredResponse(action: string): DemoMessage {
  const servicos = SALON.servicos.filter(s => s.ativo);
  const profissionais = SALON.barbeiros.filter(p => p.ativo);

  switch (action) {
    case 'agendar':
      return {
        role: 'assistant',
        content: `Claro! Vou te ajudar a agendar. Temos ${profissionais.length} profissionais disponíveis: ${profissionais.map(p => p.nome).join(' e ')}. Qual serviço você tem interesse?`,
        quickActions: [
          ...servicos.slice(0, 4).map(s => ({ label: s.nome, action: `servico_${s.id}` })),
          { label: 'Ver todos os serviços', action: 'servicos' },
        ],
      };

    case 'servicos':
      return {
        role: 'assistant',
        content: `Aqui estão nossos serviços:\n\n${servicos.map(s => `• ${s.nome} — ${formatCurrency(s.preco)} (${s.duracaoMinutos}min)`).join('\n')}\n\nPara agendar, é só me dizer qual serviço te interessa!`,
        quickActions: [
          ...servicos.slice(0, 3).map(s => ({ label: s.nome, action: `servico_${s.id}` })),
          { label: 'Agendar agora', action: 'agendar' },
        ],
      };

    case 'profissionais':
      return {
        role: 'assistant',
        content: `Nossa equipe:\n\n${profissionais.map(p => ` barber ${p.nome}\n${p.especialidade}\nAvaliação: ${p.avaliacao} (${p.totalAvaliacoes} avaliações)`).join('\n\n')}\n\nQuer agendar com algum deles?`,
        quickActions: profissionais.map(p => ({ label: p.nome, action: `barbeiro_${p.id}` })),
      };

    case 'horarios':
      return {
        role: 'assistant',
        content: `Nossos horários:\n\nSeg-Sáb: ${SALON.horarios.segSab.abertura} às ${SALON.horarios.segSab.fechamento}\nAlmoço: ${SALON.horarios.segSab.almocoInicio} às ${SALON.horarios.segSab.almocoFim}\nDom: ${SALON.horarios.domingo?.abertura} às ${SALON.horarios.domingo?.fechamento}\n\n${SALON.horariosResumo}`,
        quickActions: [{ label: 'Agendar horário', action: 'agendar' }],
      };

    case 'como_chegar':
      return {
        role: 'assistant',
        content: `Estamos localizados em:\n\n${SALON.endereco.completo}\nReferência: ${SALON.endereco.referencia}\n\nPode acessar o Google Maps para ver a rota.`,
        quickActions: [
          { label: 'Abrir no Maps', action: 'maps' },
          { label: 'Agendar horário', action: 'agendar' },
        ],
      };

    case 'maps':
      return {
        role: 'assistant',
        content: `Abrindo Google Maps...\n\n${SALON.endereco.googleMaps}`,
        quickActions: [{ label: 'Agendar horário', action: 'agendar' }],
      };

    default:
      if (action.startsWith('servico_')) {
        const servicoId = action.replace('servico_', '');
        const servico = servicos.find(s => s.id === servicoId);
        if (servico) {
          return {
            role: 'assistant',
            content: `Ótima escolha! ${servico.nome}\n\n${servico.descricao}\n\nPreço: ${formatCurrency(servico.preco)}\nDuração: ${servico.duracaoMinutos} minutos\nPontos de fidelidade: ${servico.pontos}\n\nCom qual profissional você gostaria de agendar?`,
            quickActions: profissionais.map(p => ({ label: p.nome, action: `agendar_${servicoId}_${p.id}` })),
          };
        }
      }

      if (action.startsWith('barbeiro_')) {
        const barbeiroId = action.replace('barbeiro_', '');
        const barbeiro = profissionais.find(p => p.id === barbeiroId);
        if (barbeiro) {
          const barbeiroServicos = servicos.filter(s => s.profissionaisIds.includes(barbeiroId));
          return {
            role: 'assistant',
            content: `${barbeiro.nome} — ${barbeiro.especialidade}\n\n${barbeiro.bio}\n\nServiços disponíveis: ${barbeiroServicos.map(s => s.nome).join(', ')}\n\nPara agendar, acesse ${SALON.url}/agendar e escolha o ${barbeiro.nome}.`,
            quickActions: [
              { label: 'Agendar com ' + barbeiro.nome, action: 'agendar' },
              { label: 'Ver outros profissionais', action: 'profissionais' },
            ],
          };
        }
      }

      if (action.startsWith('agendar_')) {
        const parts = action.replace('agendar_', '').split('_');
        const servicoId = parts[0];
        const barbeiroId = parts[1];
        const servico = servicos.find(s => s.id === servicoId);
        const barbeiro = profissionais.find(p => p.id === barbeiroId);
        if (servico && barbeiro) {
          return {
            role: 'assistant',
            content: `Perfeito! ${servico.nome} com ${barbeiro.nome}.\n\nPara finalizar o agendamento, acesse:\n${SALON.url}/agendar\n\nLá você escolhe a data e horário disponível. Simples e rápido!`,
            quickActions: [
              { label: 'Ir para agendamento', action: 'link_agendar' },
              { label: 'Escolher outro serviço', action: 'servicos' },
            ],
          };
        }
      }

      return getFreeFormResponse(action);
  }
}

function getFreeFormResponse(input: string): DemoMessage {
  const lower = input.toLowerCase();

  if (lower.includes('preço') || lower.includes('preco') || lower.includes('quanto') || lower.includes('valor')) {
    const servicos = SALON.servicos.filter(s => s.ativo);
    return {
      role: 'assistant',
      content: `Nossos preços:\n\n${servicos.map(s => `• ${s.nome}: ${formatCurrency(s.preco)}`).join('\n')}\n\nTodos os valores incluem atendimento completo.`,
      quickActions: [{ label: 'Agendar horário', action: 'agendar' }],
    };
  }

  if (lower.includes('horário') || lower.includes('horario') || lower.includes('hora') || lower.includes('funciona') || lower.includes('abre') || lower.includes('fecha')) {
    return getAlfredResponse('horarios');
  }

  if (lower.includes('serviço') || lower.includes('servico') || lower.includes('corte') || lower.includes('barba')) {
    return getAlfredResponse('servicos');
  }

  if (lower.includes('barbeiro') || lower.includes('profissional') || lower.includes('quem') || lower.includes('equipe')) {
    return getAlfredResponse('profissionais');
  }

  if (lower.includes('agendar') || lower.includes('marcar') || lower.includes('horário')) {
    return getAlfredResponse('agendar');
  }

  if (lower.includes('onde') || lower.includes('endereço') || lower.includes('endereco') || lower.includes('local') || lower.includes('chegar') || lower.includes('mapa') || lower.includes('maps')) {
    return getAlfredResponse('como_chegar');
  }

  if (lower.includes('obrigad') || lower.includes('valeu') || lower.includes('thanks')) {
    return {
      role: 'assistant',
      content: `De nada! Fico à disposição. Para agendar, acesse ${SALON.url}/agendar. Até mais!`,
      quickActions: [{ label: 'Agendar horário', action: 'agendar' }],
    };
  }

  return {
    role: 'assistant',
    content: `Posso ajudar com informações sobre:\n\n• Serviços e preços\n• Profissionais disponíveis\n• Horários de funcionamento\n• Localização\n• Agendamento\n\nO que deseja saber?`,
    quickActions: QUICK_ACTIONS,
  };
}

interface DemoAlfredChatProps {
  className?: string;
}

export default function DemoAlfredChat({ className = '' }: DemoAlfredChatProps) {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!hasGreeted) {
      setMessages([{
        role: 'assistant',
        content: `Olá! Bem-vindo à ${SALON.nome}. 👋\n\nSou o ${SALON.assistente.nome}, assistente de atendimento. Como posso ajudar?`,
        quickActions: QUICK_ACTIONS,
      }]);
      setHasGreeted(true);
    }
  }, [hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleQuickAction = async (action: string) => {
    if (action === 'link_agendar') {
      window.open(`${SALON.url}/agendar`, '_blank');
      return;
    }

    if (action === 'maps') {
      window.open(SALON.endereco.googleMaps, '_blank');
      const userMsg: DemoMessage = { role: 'user', content: 'Abrir no Maps' };
      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, getAlfredResponse('maps')]);
        setIsLoading(false);
      }, 600);
      return;
    }

    const userLabel = QUICK_ACTIONS.find(q => q.action === action)?.label
      || SALON.servicos.find(s => s.id === action.replace('servico_', ''))?.nome
      || SALON.barbeiros.find(p => p.id === action.replace('barbeiro_', ''))?.nome
      || action;

    const userMsg: DemoMessage = { role: 'user', content: userLabel };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, getAlfredResponse(action)]);
      setIsLoading(false);
    }, 700);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: DemoMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, getFreeFormResponse(text)]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col bg-[#0b1120] rounded-2xl border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-black/30 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-extrabold text-black">{SALON.assistente.nome}</h3>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-700 animate-pulse" />
            <p className="text-[11px] text-black/60 font-medium">Online agora</p>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-black/20 text-[10px] font-bold text-black/70">
          DEMO
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[400px] max-h-[500px]">
        {messages.map((msg, i) => (
          <div key={i} className="space-y-2">
            <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-emerald-500 text-black rounded-2xl rounded-br-md font-medium'
                  : 'bg-slate-800 text-slate-100 rounded-2xl rounded-bl-md'
              }`}>
                {msg.content}
              </div>
            </div>
            {msg.quickActions && msg.quickActions.length > 0 && (
              <div className={`flex flex-wrap gap-2 ${msg.role === 'assistant' ? 'ml-9' : 'justify-end'}`}>
                {msg.quickActions.map((qa, j) => (
                  <button
                    key={j}
                    onClick={() => handleQuickAction(qa.action)}
                    disabled={isLoading}
                    className="group flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-all disabled:opacity-50"
                  >
                    <span>{qa.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 mr-2 mt-0.5">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="px-4 py-3 bg-slate-800 rounded-2xl rounded-bl-md">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-800/60 shrink-0">
        <div className="flex items-end gap-2 bg-slate-900 rounded-2xl border border-slate-800 focus-within:border-emerald-500/40 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            rows={1}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-500 resize-none outline-none max-h-24"
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 flex items-center justify-center transition-colors m-1.5 shrink-0"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
