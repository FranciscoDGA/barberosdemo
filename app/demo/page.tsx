'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DemoAlfredChat from '@/components/demo/DemoAlfredChat';
import { SALON } from '@/lib/config/salon';
import {
  Bot,
  Calendar,
  MessageSquare,
  BarChart3,
  CreditCard,
  Bell,
  Smartphone,
  Check,
  ArrowRight,
  Globe,
  Shield,
  Zap,
  ChevronRight,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Bot,
    title: 'Assistente AI Inteligente',
    description: 'Alfred responde dúvidas, agenda horários e identifica clientes automaticamente.',
    color: 'amber',
  },
  {
    icon: Calendar,
    title: 'Agendamento Online',
    description: 'Clientes agendam 24h pelo site, WhatsApp ou app. Sem ligações.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Painel Administrativo',
    description: 'Dashboard completo: agenda, financeiro, clientes, relatórios.',
    color: 'emerald',
  },
  {
    icon: CreditCard,
    title: 'PIX Integrado',
    description: 'Pagamento antecipado via PIX reduz faltas em até 80%.',
    color: 'purple',
  },
  {
    icon: Bell,
    title: 'Lembretes Automáticos',
    description: '3 lembretes por WhatsApp: 24h, 2h e 30min antes. Zero faltas.',
    color: 'rose',
  },
  {
    icon: Smartphone,
    title: 'App PWA para Clientes',
    description: 'Instalável no celular. Acesso rápido com notificações push.',
    color: 'cyan',
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
};

const STEPS = [
  { step: '1', title: 'Configure', description: 'Edite salon.ts com seus dados' },
  { step: '2', title: 'Deploy', description: 'Faça push para o GitHub' },
  { step: '3', title: 'Pronto!', description: 'Seu sistema está no ar' },
];

export default function DemoPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>DEMO INTERATIVA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Conheça o{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Alfred
            </span>{' '}
            trabalhando.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            Experimente o assistente AI que agenda, responde e vende para sua barbearia — enquanto você corta cabelo.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#demo-chat"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Testar o Alfred
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              href="/admin"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-sm transition-all active:scale-95"
            >
              Ver Painel Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Chat Section */}
      <section id="demo-chat" className="max-w-4xl mx-auto px-4 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2">Experimente agora</h2>
          <p className="text-sm text-slate-400">Clique nos botões ou digite para conversar com o Alfred</p>
        </div>
        <DemoAlfredChat className="w-full max-w-lg mx-auto h-[600px]" />
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">
            CÓDIGO + config ={' '}
            <span className="text-amber-400">NOVO CLIENTE</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Um arquivo de configuração. Push para GitHub. Sistema rodando.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="relative p-6 rounded-2xl bg-[#0f0f1a] border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-black text-lg mx-auto mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.description}</p>
              {i < 2 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-6 h-6 text-slate-600 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Tudo que sua barbearia precisa</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Agendamento, pagamentos, lembretes, painel e app — tudo pronto.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const colors = COLOR_MAP[f.color];
            const Icon = f.icon;
            return (
              <div
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  activeFeature === i
                    ? `${colors.bg} ${colors.border} shadow-lg`
                    : 'bg-[#0f0f1a] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white mb-3">Quanto custa?</h2>
          <p className="text-slate-400">Código aberto. Sem mensalidade. Sem lock-in.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0f0f1a] border border-slate-800">
            <div className="text-sm font-bold text-slate-400 mb-1">Template</div>
            <div className="text-3xl font-black text-white mb-3">Grátis</div>
            <ul className="space-y-2 mb-6">
              {['Código fonte completo', 'Configuração via salon.ts', 'Alfred AI integrado', 'PWA para clientes'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://github.com/FranciscoDGA/barberosdemo"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center text-sm font-bold text-slate-200 transition-all"
            >
              <Globe className="w-4 h-4 inline mr-1.5" />
              Ver no GitHub
            </a>
          </div>
          <div className="relative p-6 rounded-2xl bg-[#0f0f1a] border-2 border-amber-500/40">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-[10px] font-black text-black">
              POPULAR
            </div>
            <div className="text-sm font-bold text-amber-400 mb-1">Deploy + Suporte</div>
            <div className="text-3xl font-black text-white mb-3">Sob consulta</div>
            <ul className="space-y-2 mb-6">
              {[
                'Tudo do Template',
                'Deploy no Vercel',
                'Domínio próprio',
                'WhatsApp configurado',
                'Supabase configurado',
                'Suporte técnico',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${SALON.contato.whatsapp}?text=Olá! Tenho interesse no deploy do BarberOS para minha barbearia.`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-center text-sm font-extrabold text-black transition-all"
            >
              <Shield className="w-4 h-4 inline mr-1.5" />
              Falar com suporte
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#0f0f1a] to-[#0f0f1a] border border-amber-500/20 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Pronto para automa<span className="text-amber-400">tizar</span>?
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            Configure, deploy e comece a atender. Sem complicação.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://github.com/FranciscoDGA/barberosdemo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg shadow-amber-500/25 active:scale-95"
            >
              <Globe className="w-4 h-4" />
              Começar agora
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${SALON.contato.whatsapp}?text=Olá! Quero saber mais sobre o BarberOS.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>BarberOS — {SALON.nome}</span>
          <span>{SALON.endereco.cidade} - {SALON.endereco.estado}</span>
        </div>
      </footer>
    </div>
  );
}
