# PULSEBOARD

Dashboard SaaS / Plataforma de Gestão

Projeto de uma interface SaaS desenvolvida para centralizar indicadores, dados operacionais e informações de gestão em uma experiência moderna, responsiva e orientada à visualização de dados.

## Preview

### 01 — Capa

![Pulseboard — Capa de apresentação do projeto](./SLIDES/SLIDE%201.png)

### 02 — Visão geral

![Pulseboard — Visão geral do dashboard](./SLIDES/SLIDE%202.png)

### 03 — Dashboard

![Pulseboard — Indicadores, receita e aquisição](./SLIDES/SLIDE%203.png)

### 04 — Gestão

![Pulseboard — Gestão de clientes e transações](./SLIDES/SLIDE%204.png)

### 05 — Analytics

![Pulseboard — Página de analytics](./SLIDES/SLIDE%205.png)

### 06 — Experiência

![Pulseboard — Interface no desktop, tablet e mobile](./SLIDES/SLIDE%206.png)

### 07 — Tecnologia

![Pulseboard — Tecnologias do front-end](./SLIDES/SLIDE%207.png)

### 08 — CTA

![Pulseboard — Chamada final](./SLIDES/SLIDE%208.png)

## Sobre o projeto

O Pulseboard foi desenvolvido como um projeto de Front-end com foco em dashboard, visualização de dados, organização de informações, componentes reutilizáveis, responsividade, acessibilidade, temas claro e escuro e experiência de usuário.

O projeto simula a interface de uma plataforma SaaS de gestão: todos os dados apresentados são fictícios e não há backend, banco de dados ou autenticação real — toda a interação acontece no cliente.

## Funcionalidades

- Dashboard com indicadores de negócio
- Cards de KPI (receita, usuários ativos, conversão, transações)
- Gráfico de receita por período
- Gráfico de aquisição por canal
- Atividades recentes
- Tabela de transações recentes
- Gerenciamento visual de clientes (busca, filtro por status, ordenação, drawer de detalhes, cadastro demonstrativo)
- Página de analytics (receita, aquisição, conversão, retenção, atividade)
- Página de transações (filtros, ordenação, seleção, paginação, menu de ações, detalhes)
- Página de configurações (perfil, aparência, notificações, segurança)
- Filtros, busca e paginação nas listas
- Tema claro, tema escuro e tema do sistema, com persistência da preferência
- Sidebar responsiva (fixa no desktop, recolhível, drawer no mobile)
- Estados de loading (skeletons), vazio e erro
- Feedback visual (toasts e confirmações)
- Componentes reutilizáveis
- Navegação por teclado
- Suporte a `prefers-reduced-motion`

## Tecnologias

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- next-themes
- ESLint

## Interface

A interface foi desenvolvida com uma abordagem de SaaS moderno, priorizando hierarquia visual, leitura rápida de informações e consistência entre diferentes áreas da plataforma.

Os mesmos padrões de dashboard, cards, gráficos, tabelas, navegação lateral, topbar e estados de interface se repetem em todas as páginas, nos modos claro e escuro.

## Design System

O projeto utiliza um conjunto de componentes reutilizáveis com padrões consistentes: botões, inputs, cards, badges de status, dropdowns, modais, drawers, tabelas, paginação, switches, avatares, controles de tema e componentes de feedback (loading, vazio e erro).

Não se trata de um design system formal publicado, mas de uma base componentizada organizada para reutilização em todo o projeto.

## Responsividade

A interface foi desenvolvida para desktop, tablet e mobile: a sidebar vira drawer no mobile e pode ser recolhida no desktop, as tabelas usam rolagem interna quando necessário, os gráficos se adaptam ao contêiner e os componentes se reorganizam conforme a largura da tela.

## Acessibilidade

Cuidados implementados no projeto:

- HTML semântico
- Labels associados aos inputs
- Atributos ARIA quando necessários
- Foco visível
- Navegação e interação por teclado
- Suporte a `Escape` em menus, modais e drawers
- Suporte a `prefers-reduced-motion`
- Contraste adequado
- Áreas de toque apropriadas

Sem auditoria formal de conformidade WCAG.

## Arquitetura

```text
src/
├── app/
│   ├── analytics/
│   ├── clientes/
│   ├── configuracoes/
│   ├── login/
│   ├── transacoes/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── brand/
│   ├── dashboard/
│   ├── layout/
│   ├── ui/
│   └── views/
│
├── data/
├── lib/
└── types/
```

- `app/` — rotas e layouts (Server Components por padrão; wrappers server + views client)
- `components/brand/` — logo (símbolo + wordmark)
- `components/dashboard/` — blocos específicos do dashboard (KPIs, gráficos, atividade, transações recentes)
- `components/layout/` — Providers, AppShell, Sidebar e Topbar
- `components/ui/` — componentes reutilizáveis
- `components/views/` — telas client de cada página
- `data/` — dados fictícios organizados por domínio
- `lib/` — formatação, classes CSS e guarda de hidratação do tema
- `types/` — tipos TypeScript compartilhados

## Principais páginas

```text
/                Visão geral com indicadores, gráficos e atividade
/clientes        Busca, filtros, ordenação, paginação e detalhes do cliente
/analytics       Receita, aquisição, conversão, retenção e atividade
/transacoes      Filtros, seleção, ações e detalhes da transação
/configuracoes   Perfil, aparência, notificações e segurança
/login           Tela conceitual de entrada (sem autenticação real)
```

## Experiência de tema

A plataforma oferece Light, Dark e System, com persistência da preferência no navegador. A troca é imediata e toda a interface acompanha: superfícies, textos, bordas, tabelas, modais, dropdowns e as cores dos gráficos.

## Qualidade e boas práticas

- TypeScript em modo `strict`, sem `any`
- Componentes reutilizáveis com props tipadas
- Separação de responsabilidades por pasta e por componente
- Dados organizados por domínio, separados da interface
- ESLint sem erros nem avisos
- Tratamento de estados (loading, vazio, erro, sucesso)
- Server Components por padrão, Client Components apenas onde há interação

## Validação

```bash
npm run lint
```

Verifica o código com o ESLint.

```bash
npx tsc --noEmit
```

Verifica os tipos sem emitir arquivos.

```bash
npm run build
```

Gera o build de produção (inclui a checagem de tipos).

Os três comandos foram executados com sucesso.

## Como executar

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
npm install
npm run dev
```

Depois, acesse:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Aprendizados

- Construção de dashboards e hierarquia de informação
- Visualização de dados com gráficos responsivos
- Organização de componentes reutilizáveis
- Responsividade em interfaces densas
- Gerenciamento de temas claro/escuro/sistema
- Estados de interface (loading, vazio, erro)
- Animações discretas e acessíveis
- Arquitetura de Front-end com App Router

## Próximos passos

Possibilidades futuras (não implementadas):

- Integração com API
- Autenticação real
- Banco de dados
- Dados em tempo real
- Permissões de usuário

## Observação

Todos os nomes, empresas, e-mails, valores e métricas exibidos são fictícios e existem apenas para demonstração da interface.
