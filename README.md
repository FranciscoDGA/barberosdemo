# BarberOS — Sistema de Agendamento para Barbearias

Sistema completo de agendamento online com WhatsApp, fidelidade, pagamentos PIX e assistente AI.

## Como Personalizar

**Para configurar para a sua barbearia, edite APENAS um arquivo:**

```
lib/config/salon.ts
```

Tudo que precisa mudar está nesse arquivo:
- Nome do estabelecimento
- Logo
- Endereço e contato
- Serviços e preços
- Profissionais
- Horários de funcionamento
- Regras de negócio
- Chave PIX
- Cores do tema
- Configurações do assistente AI

## Fórmula

```
CÓDIGO + CONFIGURAÇÃO = NOVO CLIENTE
```

## Estrutura do Config

```typescript
export const SALON = {
  nome: 'Nome da Barbearia',
  slogan: 'Seu slogan',
  logo: '/logo.png',
  
  telefone: '(11) 99999-0000',
  whatsapp: '5511999990000',
  
  endereco: {
    rua: 'Rua...',
    cidade: 'Cidade',
    estado: 'SP',
    // ...
  },
  
  servicos: [
    { id: 'srv-1', nome: 'Corte Social', preco: 45, duracaoMinutos: 30 },
    // ...
  ],
  
  barbeiros: [
    { id: 'barber-1', nome: 'Carlos', especialidade: 'Barbeiro Chefe' },
    // ...
  ],
  
  horarios: {
    segSab: { abertura: '09:00', fechamento: '20:00' },
    domingo: null,
  },
  
  // ... mais configurações
}
```

## Setup

```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.local.example .env.local

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Funcionalidades

- Agendamento online com seleção de profissional
- WhatsApp automático (confirmação, lembretes, follow-up)
- Sistema de fidelidade (selos + pontos)
- Pagamentos PIX com QR Code
- Assistente AI (Alfred) para atendimento via WhatsApp
- Painel administrativo completo
- PWA (instalável no celular)
- Dashboard financeiro
- Marketing automatizado

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (banco de dados)
- Google Gemini AI
- WhatsApp (Uazapi / Z-API)
- PWA
