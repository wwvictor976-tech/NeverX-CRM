# Validação visual — captura 1 e 2

## Conversas

A rota `/conversas?cliente=ana-souza&canal=email` renderiza a inbox contextual com Ana Souza seleccionada, o canal E-mail activo e os canais WhatsApp/Outro disponíveis. A navegação lateral exibe Dashboard, Clientes, Conversas e Integrações como itens activos, mantendo os restantes recursos como brevemente disponíveis.

## Dashboard

A rota `/dashboard` mantém a composição original de KPI, gráfico e performance por canal. O novo cabeçalho mostra o período `Últimos 30 dias`, o controlo de actualização e o relatório sem romper a hierarquia visual. O modal de período é detectável no DOM pelo selector e pelos intervalos rápidos.

## Assets

- `conversas-contexto.webp`: captura limpa da inbox contextual.
- `dashboard.webp`: captura a guardar a partir da segunda verificação.

## Integrações

A rota `/integracoes` apresenta os grupos Canais de venda, Canais de relacionamento e Operação e dados, com E-commerce próprio, Mercado Livre, Shopify, Shein, Shopee, WhatsApp Business, E-mail, ERP/Gateway e PDV. Cada card mostra o estado Não conectado e as acções Configurar/Conectar conta.

O modal de E-commerce próprio abre correctamente com Nome da loja, URL da loja e Chave de API, além de avisar que a autenticação real será acrescentada numa etapa posterior. O estado está explicitamente local ao protótipo.

## Assets adicionais

- Captura de Integrações: `/home/ubuntu/screenshots/localhost_2026-08-20_14-08-01_1646.webp`.
- Captura do modal de ligação: `/home/ubuntu/screenshots/localhost_2026-08-20_14-08-10_4473.webp`.

## Clientes

A rota `/clientes` preserva os KPIs, filtros e tabela existentes. Os três CTAs do cabeçalho estão visíveis e o modal Novo cliente abre com Nome completo, E-mail, Telefone, Canal de origem, Segmento inicial e Tags. A estrutura usa a mesma superfície branca, bordas suaves e acento dourado do restante do produto.

## Assets adicionais

- Captura de Clientes: `/home/ubuntu/screenshots/localhost_2026-08-20_14-08-32_7800.webp`.
- Captura do modal Novo cliente: `/home/ubuntu/screenshots/localhost_2026-08-20_14-08-40_9528.webp`.

## Clientes → Conversas

Ao seleccionar Ana Souza, o sheet 360º continua a abrir com métricas, tabs, contacto e timeline. As acções superiores agora mostram explicitamente WhatsApp, E-mail e Outro canal, e o CTA inferior Iniciar Atendimento permanece disponível. Cada acção foi ligada ao mesmo cliente por query string para a rota Conversas.

## Asset adicional

- Captura do sheet 360º com os canais: `/home/ubuntu/screenshots/localhost_2026-08-20_14-09-08_6749.webp`.

## Fluxo contextual e Header

Ao activar WhatsApp no sheet de Ana Souza, a URL mudou para `/conversas?cliente=ana-souza&canal=whatsapp`, e a inbox abriu o mesmo cliente com o canal WhatsApp activo. Isto confirma o fluxo pedido sem abrir serviços externos.

O sino do Header abre o modal Notificações com eventos agrupados por conversa, integração e risco de cliente, mantendo o padrão de superfície, sombra e acento do CRM.

## Asset adicional

- Captura da Conversa após o redireccionamento WhatsApp: `/home/ubuntu/screenshots/localhost_2026-08-20_14-09-29_8396.webp`.
- Captura do modal Notificações: `/home/ubuntu/screenshots/localhost_2026-08-20_14-09-38_7910.webp`.
