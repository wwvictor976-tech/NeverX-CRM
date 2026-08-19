# NeverX CRM

CRM para e-commerce focado em retenção, recompra e relacionamento com clientes.

## Requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Desenvolvimento

```bash
npm install
npm run dev
```

A aplicação fica disponível em `http://localhost:3000`.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run lint` | Verifica padrões e possíveis problemas no código |
| `npm run typecheck` | Executa a checagem estrita do TypeScript |
| `npm run build` | Gera e valida o build de produção |
| `npm start` | Inicia o build de produção |

## Rotas disponíveis

- `/login` e `/register`: autenticação demonstrativa
- `/auth/forgot-password`: recuperação de acesso
- `/dashboard`: visão geral de métricas e canais
- `/clientes`: base de clientes com busca, filtros e perfil detalhado

Os demais módulos aparecem na navegação como indisponíveis até que suas rotas sejam implementadas.

## Estrutura

- `src/app`: rotas e layouts do App Router
- `src/components`: componentes compartilhados de interface e layout
- `src/features`: regras de domínio organizadas por funcionalidade
- `public`: assets estáticos

O projeto utiliza Next.js, React, TypeScript, Tailwind CSS, React Hook Form, Zod, Lucide e Framer Motion.