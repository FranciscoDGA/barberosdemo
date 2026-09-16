# BarberOS

### Sistema de Atendimento, Agendamento e Gestão para Barbearias e Salões

BarberOS é um sistema completo que automatiza o atendimento, agenda horários, gerencia pagamentos e mantém seus clientes fiéis — tudo com um assistente AI que trabalha 24h por dia.

---

## O que é o Alfred

Alfred é o funcionário digital de atendimento do BarberOS. Ele responde dúvidas, agenda horários, envia lembretes e identifica clientes automaticamente pelo WhatsApp — enquanto você foca no que faz de melhor: cortar cabelo.

---

## Funcionalidades

| Módulo | O que faz |
|--------|-----------|
| **Alfred (AI)** | Atende via WhatsApp, agenda, responde preços, identifica clientes |
| **Agendamento Online** | Clientes agendam 24h pelo site, WhatsApp ou app |
| **Painel Administrativo** | Dashboard completo: agenda, financeiro, clientes, relatórios |
| **PIX Integrado** | Pagamento antecipado reduz faltas em até 80% |
| **Lembretes Automáticos** | 3 lembretes por WhatsApp: 24h, 2h e 30min antes |
| **App PWA** | Instalável no celular com notificações push |
| **Fidelidade** | Selos e pontos para reter clientes |
| **Marketing** | Campanhas automatizadas por WhatsApp |

---

## Como Funciona

```
CÓDIGO + lib/config/salon.ts = SISTEMA RODANDO
```

Um único arquivo de configuração. Push para GitHub. Sistema no ar.

### 1. Configure

Edite `lib/config/salon.ts` com os dados do estabelecimento:

```typescript
export const BUSINESS_CONFIG = {
  identidade: {
    nome: 'Nome da Barbearia',
    slogan: 'Seu slogan',
    cores: { primaria: '#c9a84c', fundo: '#0f0f1a' },
  },
  contato: {
    whatsapp: '5511999990000',
    endereco: { rua: '...', cidade: '...', estado: 'SP' },
  },
  servicos: [
    { id: 'srv-1', nome: 'Corte Degradê', preco: 50, duracaoMinutos: 40 },
  ],
  profissionais: [
    { id: 'barber-1', nome: 'Carlos', especialidade: 'Master Barber' },
  ],
  alfred: {
    nome: 'Alfred',
    personalidade: { tom: 'Sofisticado, atencioso, profissional' },
  },
  // ... horários, regras, PIX, lembretes
}
```

### 2. Deploy

```bash
git add . && git commit -m "Setup: Nome da Barbearia" && git push
```

O Vercel detecta automaticamente o Next.js e faz o deploy.

### 3. Pronto

Seu sistema está no ar. Seus clientes podem agendar pelo site, WhatsApp ou app.

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS 4 |
| Banco de dados | Supabase (PostgreSQL) |
| AI | Google Gemini |
| WhatsApp | Uazapi / Z-API |
| Deploy | Vercel |
| PWA | Service Worker + Manifest |

---

## Para Desenvolvedores

### Setup Local

```bash
git clone https://github.com/FranciscoDGA/barberosdemo.git
cd barber-os-demo
npm install
cp .env.example .env.local
npm run dev
```

### Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.5-flash
```

### Estrutura

```
lib/config/salon.ts     ← Único arquivo para editar (dados do negócio)
app/                    ← Pages (App Router)
components/             ← UI components
lib/ai/                 ← Alfred (brain, tools, knowledge)
lib/config/             ← Configuração centralizada
public/                 ← Imagens, ícones, PWA
```

### Comandos

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
```

---

## Licença

Código aberto. Use como quiser. Sem lock-in.
