# Arquitetura das novas features

## Princípios preservados

A implementação mantém a identidade visual NeverX já existente: fundo `#F5F6F8`, superfícies brancas, tipografia Plus Jakarta Sans, acento dourado, cantos arredondados e elevação discreta via `card-surface`. Os dados continuam locais e explicitamente demonstrativos, sem sugerir sincronização real com APIs.

## Fluxos

### Dashboard

O seletor de período abre um modal com intervalos rápidos e opção de período personalizado. O botão de relatório abre um modal de exportação com formato e escopo. O botão de atualizar mantém-se não destrutivo, exibindo estado de carregamento e confirmação inline.

### Header

A busca global abre um modal de pesquisa com resultados agrupados por clientes, conversas e integrações. O sino abre uma central compacta de notificações. O perfil abre um menu contextual com acesso a configurações e encerramento de sessão demonstrativo.

### Clientes

A tabela e o sheet 360º permanecem preservados. As ações de contacto deixam de abrir `mailto:` ou uma nova aba de WhatsApp: passam a navegar para `/conversas?cliente={id}&canal={canal}`, permitindo que o operador continue o atendimento dentro do CRM. O sheet disponibiliza os canais E-mail, WhatsApp e Outro canal.

### Conversas

A nova página funciona como inbox contextual. A lista lateral permite seleccionar o cliente; o painel principal mostra cabeçalho, histórico e compositor de mensagem. O canal ativo é lido da query string (`email`, `whatsapp` ou `outro`) e fica visível no selector de canais. Sem backend, o envio altera apenas o estado local e apresenta confirmação de demonstração.

### Integrações

A página é organizada por domínio: canais de venda, canais de relacionamento e operação. Cada integração tem estado local (`Conectar conta`, `Conectado` ou `Desconectar`) e abre modal com campos específicos ao provedor. A estrutura de dados usa `id`, `category`, `name`, `description`, `status` e `fields`, permitindo adicionar novos canais sem reescrever a tela.

## Componentes novos

- `src/components/ui/modal.tsx`: overlay acessível e reutilizável.
- `src/app/(private)/dashboard/_components/dashboard-modals.tsx`: seleção de período e exportação.
- `src/app/(private)/clientes/_components/customer-action-modals.tsx`: novo cliente, campanha e exportação.
- `src/app/(private)/conversas/page.tsx` e `_components/conversations-content.tsx`.
- `src/app/(private)/integracoes/page.tsx` e `_components/integrations-content.tsx`.

## Responsividade

A experiência desktop mantém o painel lateral e o conteúdo em duas colunas; em tablet e mobile as colunas passam a uma única coluna, os modais ocupam a largura disponível e os controlos de ação permitem quebra de linha.
