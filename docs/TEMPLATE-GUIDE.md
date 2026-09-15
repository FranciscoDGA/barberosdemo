# Como Criar um Novo Cliente — BarberOS Template

Guia completo para transformar o template BarberOS em um sistema funcional para uma barbearia específica.

---

## Visão Geral

O BarberOS é um template de sistema de agendamento para barbearias. Para criar um novo cliente, você precisa:

1. Copiar o template
2. Configurar os dados do negócio
3. Subir o banco de dados
4. Deploy

**Fórmula:** `CÓDIGO + lib/config/salon.ts = NOVO CLIENTE`

---

## Checklist de Onboarding

### Pré-requisitos

- [ ] Node.js 18+ instalado
- [ ] Conta no GitHub
- [ ] Conta no Vercel (gratuita)
- [ ] Conta no Supabase (gratuita)
- [ ] API key do Google Gemini (gratuita)

### 1. Copiar Template

```bash
# Clone o repositório
git clone https://github.com/FranciscoDGA/barberosdemo.git nome-da-barbearia
cd nome-da-barbearia

# Instale as dependências
npm install

# Crie o arquivo de ambiente
cp .env.example .env.local
```

### 2. Definir Nome e Identidade

Edite `lib/config/salon.ts` — seção `identidade`:

```ts
identidade: {
  nome: 'Nome da Barbearia',
  slogan: 'Seu slogan aqui.',
  descricao: 'Descrição curta do negócio',
  logo: '/logo.png',        // Substitua o arquivo em public/
  favicon: '/favicon.ico',  // Substitua o arquivo em public/
  cores: {
    primaria: '#c9a84c',        // Cor principal (botões, destaques)
    primariaEscura: '#a8893a',  // Hover
    primariaClara: '#d4b96a',   // Light
    fundo: '#0f0f1a',           // Fundo da página
    fundoCard: '#1a1a2e',       // Fundo dos cards
    fundoCardHover: '#252542',  // Hover dos cards
    texto: '#ffffff',            // Texto principal
    textoSecundario: '#a0a0b8',  // Texto secundário
    borda: '#2a2a45',            // Bordas
  },
},
```

**⚠️ Importante:** After changing colors, also update `app/globals.css` CSS variables to match:

```css
:root {
  --color-primary: #c9a84c;
  --color-primary-dark: #a8893a;
  --color-primary-light: #d4b96a;
  --color-bg: #0f0f1a;
  --color-bg-card: #1a1a2e;
  --color-bg-card-hover: #252542;
  --color-text: #ffffff;
  --color-text-secondary: #a0a0b8;
  --color-border: #2a2a45;
}
```

### 3. Definir Logo e Imagens

Substitua os arquivos na pasta `public/`:

| Arquivo | Tamanho | Uso |
|---------|---------|-----|
| `logo.png` | 512x512px | Logo do salão (aparece no header, login, PWA) |
| `favicon.ico` | 32x32px | Ícone do navegador |
| `barber-1.jpg` | 800x1000px | Foto do barbeiro 1 |
| `barber-2.jpg` | 800x1000px | Foto do barbeiro 2 |
| `pwa-192x192.png` | 192x192px | Ícone PWA |
| `pwa-512x512.png` | 512x512px | Ícone PWA grande |
| `pwa-maskable-512x512.png` | 512x512px | Ícone PWA maskable |
| `apple-touch-icon.png` | 180x180px | Ícone iOS |

### 4. Cadastrar Contato

Edite `lib/config/salon.ts` — seção `contato`:

```ts
contato: {
  telefone: '(11) 3256-8800',
  whatsapp: '5511999990000',           // Formato internacional sem espaços
  whatsappFormatado: '(11) 99999-0000', // Formato legível
  instagram: '@nomebarbearia',
  facebook: '@nomebarbearia',
  email: 'contato@nomebarbearia.com.br',
  endereco: {
    rua: 'Rua Exemplo, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    completo: 'Rua Exemplo, 123 - Centro, São Paulo - SP, CEP 01234-567',
    referencia: 'Em frente ao banco',
    googleMaps: 'https://www.google.com/maps/search/...',
    coordenadas: { lat: -23.5505, lng: -46.6333 },
  },
},
```

### 5. Configurar Horários

Edite `lib/config/salon.ts` — seção `funcionamento`:

```ts
funcionamento: {
  horarios: {
    segSab: {
      abertura: '09:00',
      almocoInicio: '12:00',
      almocoFim: '14:00',
      fechamento: '20:00',
    },
    domingo: {
      abertura: '10:00',
      almocoInicio: null,    // Sem almoço
      almocoFim: null,
      fechamento: '18:00',
    },
    // Se não atende domingo:
    // domingo: null,
  },
  bloqueios: [],  // Ex: [{ data: '2026-01-01', motivo: 'Ano Novo' }]
  feriados: [
    { data: '2026-01-01', nome: 'Ano Novo', aberto: false },
    // Adicione feriados nacionais e locais
  ],
  horariosResumo: 'Seg-Sáb: 09:00-12:00 / 14:00-20:00 | Dom: 10:00-18:00',
  horariosResumoAI: 'Segunda a Sábado das 09:00 às 20:00 com intervalo das 12h às 14h. Domingos das 10:00 às 18:00.',
},
```

### 6. Cadastrar Serviços

Edite `lib/config/salon.ts` — seção `servicos`:

```ts
servicos: [
  {
    id: 'srv-1',           // ID único
    nome: 'Corte Degradê',
    categoria: 'cabelo',   // 'cabelo' | 'barba' | 'combos' | 'tratamentos'
    descricao: 'Descrição do serviço',
    preco: 50,             // Preço em reais (sem centavos)
    duracaoMinutos: 40,
    pontos: 50,            // Pontos de fidelidade
    profissionaisIds: ['barber-1', 'barber-2'],  // IDs dos profissionais
    ativo: true,
  },
  // ... mais serviços
],
```

### 7. Cadastrar Profissionais

Edite `lib/config/salon.ts` — seção `profissionais`:

```ts
profissionais: [
  {
    id: 'barber-1',        // ID único
    nome: 'João Silva',
    especialidade: 'Master Barber',
    bio: '10 anos de experiência em degradê e navalha.',
    telefone: '(11) 99999-0001',
    foto: '/barber-1.jpg',  // Substitua o arquivo em public/
    avaliacao: 5.0,
    totalAvaliacoes: 100,
    servicosIds: ['srv-1', 'srv-2', 'srv-3'],  // IDs dos serviços
    horarios: {
      segunda: '09:00-19:00',
      terca: '09:00-19:00',
      quarta: '09:00-19:00',
      quinta: '09:00-19:00',
      sexta: '09:00-19:00',
      sabado: '09:00-17:00',
      domingo: null,  // Não trabalha
    },
    ativo: true,
  },
  // ... mais profissionais
],
```

### 8. Configurar Alfred (Assistente AI)

Edite `lib/config/salon.ts` — seção `alfred`:

```ts
alfred: {
  nome: 'Alfred',  // Nome do assistente
  cargo: 'Assistente de Atendimento',
  personalidade: {
    tom: 'Sofisticado, atencioso, profissional',
    estilo: [
      'Respostas elegantes e diretas',
      'Usar emojis com moderação',
      // ... ajuste ao tom da barbearia
    ],
    evitar: [
      'Textos longos',
      'Respostas genéricas de robô',
      // ... regras de comportamento
    ],
  },
  saudacao: 'Olá! Bem-vindo à [Nome]. Como posso ajudar?',
  informacoesEmpresa: {
    publicoAtendido: 'Masculino, Feminino e Crianças',
    diferenciais: ['Qualidade', 'Experiência'],
    carroChefe: 'Nome do Combo Principal',
    maisPedidos: ['Serviço 1', 'Serviço 2'],
    formaPagamento: ['PIX', 'Dinheiro', 'Débito', 'Crédito'],
  },
  regrasAtendimento: [
    'NUNCA inventar preço.',
    'NUNCA inventar horário disponível.',
    // ... ajuste as regras
  ],
},
```

### 9. Configurar Pagamento (PIX)

Edite `lib/config/salon.ts` — seção `pagamento`:

```ts
pagamento: {
  pix: {
    chave: 'pagamento@nomebarbearia.com.br',
    tipo: 'E-mail',  // 'E-mail' | 'CNPJ' | 'Telefone' | 'Chave Aleatória'
    beneficiario: 'Nome da Empresa ME',
    cnpj: '12.345.678/0001-90',
    cidade: 'SÃO PAULO',
  },
  formasPagamento: ['PIX', 'Dinheiro', 'Débito', 'Crédito'],
},
```

### 10. Configurar Banco de Dados

1. Crie um projeto no [Supabase](https://supabase.com)
2. Vá em **Settings > API** e copie as credenciais
3. Atualize `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

4. Execute o seed para popular dados iniciais:

```bash
node scripts/seed-supabase.js
```

### 11. Configurar IA (Gemini)

1. Crie uma API key no [Google AI Studio](https://aistudio.google.com/apikey)
2. Atualize `.env.local`:

```env
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.5-flash
```

### 12. Configurar Domínio e Deploy

1. Faça push para o GitHub:

```bash
git add .
git commit -m "Setup: [Nome da Barbearia]"
git push origin master
```

2. Importe no [Vercel](https://vercel.com):
   - Conecte o repositório GitHub
   - O Vercel detecta automaticamente o Next.js
   - Adicione as variáveis de ambiente no painel do Vercel
   - Deploy automático

3. Configure domínio próprio (opcional):
   - Compre um domínio
   - No Vercel, vá em **Settings > Domains**
   - Adicione o domínio e configure o DNS

### 13. Testar

- [ ] Acesse o site e verifique o layout
- [ ] Teste o agendamento completo (serviço → profissional → data → horário → confirmação)
- [ ] Teste o Alfred (digite "horários", "preço", "agendar")
- [ ] Teste o painel admin (5 toques no logo → login)
- [ ] Teste o PWA (instale no celular)
- [ ] Verifique as notificações push
- [ ] Teste o fluxo WhatsApp

### 14. Segurança

- [ ] Nunca commite `.env.local` no git (já está no `.gitignore`)
- [ ] Use `SUPABASE_SERVICE_ROLE_KEY` apenas no servidor (API routes)
- [ ] Configure RLS (Row Level Security) no Supabase
- [ ] Teste o rate limiting em `/api/alfred`
- [ ] Verifique que o Alfred não expõe dados sensíveis

---

## Estrutura de Arquivos

```
lib/config/salon.ts     ← ÚNICO ARQUIVO PARA EDITAR (dados do negócio)
app/globals.css         ← Cores CSS (espelhar cores do salon.ts)
.env.local              ← Credenciais (Supabase, Gemini, WhatsApp)
public/                 ← Imagens (logo, fotos, ícones PWA)
```

---

## Referência Rápida

| Campo | Arquivo | Seção |
|-------|---------|-------|
| Nome do salão | `lib/config/salon.ts` | `identidade.nome` |
| Cores | `lib/config/salon.ts` | `identidade.cores` |
| Cores CSS | `app/globals.css` | `:root` |
| Telefone | `lib/config/salon.ts` | `contato.telefone` |
| WhatsApp | `lib/config/salon.ts` | `contato.whatsapp` |
| Instagram | `lib/config/salon.ts` | `contato.instagram` |
| Endereço | `lib/config/salon.ts` | `contato.endereco` |
| Horários | `lib/config/salon.ts` | `funcionamento` |
| Serviços | `lib/config/salon.ts` | `servicos` |
| Profissionais | `lib/config/salon.ts` | `profissionais` |
| Personalidade AI | `lib/config/salon.ts` | `alfred` |
| PIX | `lib/config/salon.ts` | `pagamento` |
| URL do site | `lib/config/salon.ts` | `url` |
| Supabase | `.env.local` | `NEXT_PUBLIC_SUPABASE_*` |
| Gemini AI | `.env.local` | `GEMINI_API_KEY` |

---

## Solução de Problemas

### "Cannot find module '@supabase/supabase-js'"
Execute `npm install`.

### "Supabase URL and Anon Key must be defined"
Verifique se `.env.local` está preenchido corretamente.

### Alfred não responde
Verifique se `GEMINI_API_KEY` está configurada no `.env.local`.

### Cores não atualizaram
Verifique se atualizou tanto `lib/config/salon.ts` quanto `app/globals.css`.

### Logo não aparece
Verifique se o arquivo `logo.png` está na pasta `public/`.

---

## Personalização Avançada

### Adicionar novo profissional
1. Adicione o profissional em `profissionais` no `salon.ts`
2. Adicione a foto em `public/`
3. Adicione os serviços que ele atende em `servicosIds`

### Adicionar novo serviço
1. Adicione o serviço em `servicos` no `salon.ts`
2. Adicione o ID do serviço em `servicosIds` dos profissionais que o realizam

### Alterar frases do Alfred
1. Edite `alfred.personalidade` no `salon.ts`
2. Edite `alfred.regrasAtendimento` no `salon.ts`
3. Edite as mensagens em `alfred.saudacao` e `alfred.fallback`

### Adicionar feriados
1. Edite `funcionamento.feriados` no `salon.ts`
2. Formato: `{ data: '2026-12-25', nome: 'Natal', aberto: false }`
