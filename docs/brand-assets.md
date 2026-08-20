# Fontes de logos

Os logos locais de WhatsApp, Shopee, Shopify e Instagram usam referências SVG compactas já armazenadas no projecto. Mercado Livre mantém o SVG local existente e a SHEIN usa o wordmark vectorial local em `public/shein.svg`. O asset Nuvemshop foi actualizado a partir do PNG actualmente servido pelo CDN oficial da marca, `https://app-insti-cdn.nuvemshop.com.br/site/dist/images/Nuvemshop.png?v=0cb7f09`, e está guardado em `public/brands/nuvemshop.png`.

## Validação visual

No Dashboard, Mercado Livre, Nuvemshop, Shopee e SHEIN aparecem com assets locais, e Aplicativo próprio mantém iconografia neutra. Na Central de Integrações, E-commerce próprio mantém o icon de loja genérico, enquanto Nuvemshop, Mercado Livre, Shopify, SHEIN, Shopee e WhatsApp Business usam logos de marca no mesmo frame global.

Clientes agora mostra Mercado Livre, Shopee, Nuvemshop e SHEIN com logos compactas no eixo da tabela; App Próprio mantém iconografia neutra. Pedidos usa os mesmos logos na origem da tabela, na lista mobile e no cartão de detalhe, e os filtros passaram a usar Nuvemshop e SHEIN com a nomenclatura consistente.

Campanhas usa a logo WhatsApp no card e na linha do canal. Conversas usa a mesma logo na fila, no selector de resposta e no compositor; E-mail e Outro canal permanecem com iconografia funcional neutra. O tratamento visual permanece alinhado aos frames e superfícies do Dashboard.

Mockups finais 1440×900 revistos: Dashboard mantém sidebar/header fixos, conteúdo alinhado e cards de canais abaixo da dobra; Integrações mostra catálogo em grelha 3×2 com logos compactas e botões de conexão consistentes. Não foi detectado defeito visual bloqueante nestas capturas.

Mockups adicionais 1440×900 revistos: Clientes mantém tabela horizontalmente contida, filtros alinhados e logos de Mercado Livre, Shopee e Nuvemshop com escala adequada; Conversas mantém layout de três painéis, fila de tickets, contexto 360º e selector WhatsApp sem overflow horizontal visível.

Mockups finais de Campanhas e Pedidos revistos: Campanhas mantém estados Activa/Agendada/Concluída/Rascunho, métricas e logo WhatsApp; Pedidos mantém origem, cliente, status, total, data, tracking/detalhe e logos de marketplace em linhas compactas.

## Auditoria de identidade e linguagem — Agosto de 2026

A documentação oficial do DevHub Nuvemshop recomenda títulos claros e contextuais, preferência por uma única frase sem ponto final e chamadas para acção auto-explicativas. Fonte: https://dev.nuvemshop.com.br/en/docs/design-guidelines/ux-writing-usage

A página institucional do SHEIN Group mantém a marca SHEIN em wordmark preto, com navegação e referências oficiais no domínio sheingroup.com. Fonte: https://www.sheingroup.com/

A homepage oficial actual da Nuvemshop apresenta o wordmark branco “nuvemshop” acompanhado do símbolo de nuvem entrelaçada sobre fundo azul forte, em https://www.nuvemshop.com.br/. A referência institucional SHEIN observada em https://www.sheingroup.com/ apresenta o wordmark preto “SHEIN” em caixa alta com espaçamento amplo. Estes tratamentos serão usados como referência oficial de marca, mantendo o uso compacto nos contextos densos do CRM.

## Validação intermédia da responsividade

A captura mobile de Campanhas mostrou o novo PageIntro, CTA e cartões KPI empilhados sem overflow visível. A primeira captura headless mobile de Conversas ficou no estado transitório “A carregar conversas…”, mas a navegação interactiva carregou correctamente a inbox completa; a refactorização de breakpoints foi mantida e será revalidada com espera de hidratação antes da captura final.

A captura mobile carregada de Conversas confirma a inbox completa em largura 390px: pesquisa, filtros, fila e início do contexto do ticket ficam contidos sem overflow horizontal. A captura desktop de Integrações confirma a nova Nuvemshop oficial em formato wordmark e a SHEIN em wordmark preto, ambas legíveis nos cards sem distorção.

Mockups finais revistos: o Dashboard ficou mais sóbrio com fundo plano, KPIs centralizados e hierarquia preservada; Integrações apresenta grelha responsiva em coluna no mobile, pesquisa contida e ações de conexão legíveis. Os wordmarks oficiais não provocam overflow nos frames disponíveis.

As capturas mobile de Clientes e Pedidos mostram CTAs agrupados sem cortar texto, KPIs empilhados, cabeçalhos legíveis e adaptação para cartões/listas a partir da largura reduzida. A rolagem fica reservada ao conteúdo principal, enquanto a barra superior permanece no topo.

Validação interactiva do Header concluída: o sino abre um resumo de notificações ancorado ao próprio botão e o perfil abre o menu de conta no mesmo ponto de origem. Nenhum dos dois fluxos usa modal central.

## Correcção de scroll e autenticação

A feature Conversas foi validada em desktop com a página contida no viewport: a fila, o histórico do chat e o contexto do ticket ficam em painéis internos, sem scroll global da página. A autenticação voltou a usar `public/bg.jpeg` como fundo, com uma camada clara de contraste para preservar a leitura do card de Login.

A captura mobile de Conversas confirma que o viewport não expande para além da página; fila, histórico e contexto ficam contidos no módulo. A captura mobile de Login confirma que o fundo permanece visível nas margens e que o formulário e os diferenciais continuam responsivos.

A versão final de Conversas foi recapturada: no mobile a fila fica limitada a uma faixa com scroll próprio, o chat ocupa o espaço restante e o contexto é ocultado para não empurrar o histórico; no desktop a grelha mantém fila, chat e contexto lado a lado, com o histórico central como área de scroll.

## Nova experiência de Conversas

A inbox foi reorganizada com métricas de tickets em aberto e prioridade alta no cabeçalho, filtros com contadores, fila com prioridade e SLA por ticket, cabeçalho do cliente com estado explícito, faixa de responsável/pedido/SLA, histórico com identificação de autor e contador de mensagens, e compositor com canal e instruções mais claras. A captura mobile confirma que a fila, o ticket e o selector de canal continuam legíveis em largura reduzida.

## Configurações e ligações de operação

A nova página Configurações foi validada em desktop com métricas de workspace, integrações, pedidos e alertas, navegação lateral de preferências e formulário de identidade. O deep-link `?integration=nuvemshop` abre directamente o modal de gestão da Nuvemshop e reconhece o estado partilhado como conectado.

As capturas mobile confirmam que Configurações empilha as métricas sem overflow e mantém a navegação de preferências acessível abaixo do primeiro viewport; Pedidos mantém os indicadores operacionais e o CTA de exportação legíveis no mesmo shell responsivo.

Validação interactiva concluída: `/clientes?cliente=ana-souza` abre automaticamente o sheet 360º de Ana Souza com ações de WhatsApp, E-mail e Outro canal; `/integracoes?integration=nuvemshop` abre o modal de gestão da Nuvemshop, exibindo a conta como conectada e a ação Desconectar conta.
