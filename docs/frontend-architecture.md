# NeverX CRM — arquitectura frontend

## Objectivo

O frontend está organizado para que as páginas consumam entidades de domínio e selectores partilhados, em vez de manter números, relações ou nomenclatura dentro de cada componente visual. A fonte actual é demonstrativa, mas o contrato de acesso já está isolado em `src/lib/crm-repository.ts`.

## Entidades canónicas

| Entidade | Identificador | Relações principais |
|---|---|---|
| `CustomerProfile` | `CUS-000184` | Pedidos, conversas, campanhas, actividades e financeiro |
| `OrderRecord` | `#NX-4029` | Cliente, origem de integração, itens, pagamento e tracking |
| `ConversationRecord` | `CON-10429` / `#TCK-10429` | Cliente, pedido, canal, SLA, responsável e mensagens |
| `CampaignRecord` | `CMP-RECOMPRA-AGO` | Canal, audiência, clientes e receita atribuída |
| `FinancialEntry` | `FIN-0001` | Pedido, cliente, origem e estado financeiro |
| `IntegrationDefinition` | `nuvemshop` | Logo, categoria, campos de conexão e origem de pedidos |

## Relação operacional

```text
IntegrationDefinition
        │
        ├── origem do OrderRecord
        │       ├── CustomerProfile
        │       └── FinancialEntry
        │
        └── canal da ConversationRecord
                ├── CustomerProfile
                └── CampaignRecord
```

## Fluxos implementados

A criação manual de cliente gera um `customerId` oficial com prefixo `CUS`, cria o perfil completo com dados de contacto, endereço, saúde da relação, tags, actividades e campos financeiros, e insere-o imediatamente na listagem local. O mesmo perfil pode ser aberto por `/clientes?cliente=CUS-000184`.

Os pedidos usam `orderId` estável e `sourceIntegrationId`. O detalhe pode ser aberto por `/pedidos?pedido=%23NX-4029`, mostra o cliente, itens, pagamento, entrega, tracking e ligação directa para a integração de origem. O botão de cliente encaminha para o perfil 360º correspondente.

Conversas usa `customerId`, `orderId`, canal, SLA, prioridade e responsável. A inbox mostra todos os clientes do conjunto demonstrativo e preserva os links para perfil e pedido. O canal padrão vem das Configurações, sem substituir um canal definido num deep-link.

O Dashboard e Relatórios consomem selectores derivados de pedidos, conversas e clientes. Financeiro consome as entradas financeiras e os mesmos canais de origem, permitindo que receita, reembolsos e receita por canal sejam substituídos por uma resposta da API mantendo os componentes.

## Substituição futura por API

`CrmDataSource` define `getSnapshot`, `getCustomer`, `getOrder` e `getConversation`. O componente visual não deve conhecer endpoints. Para ligar o backend, deve ser criada uma implementação compatível com o mesmo contrato, com autenticação no servidor quando necessária, e substituída a exportação `crmDataSource` sem alterar as rotas ou os componentes de apresentação.

O estado de Configurações permanece no provider do layout privado durante a sessão. Este estado controla o canal padrão, a sincronização de pedidos, a moeda, os alertas e as conexões disponíveis. Em produção, este provider deve receber os dados do workspace autenticado e invalidar queries quando uma integração mudar de estado.

## Assets de marca

O catálogo global está em `src/components/platform-logo.tsx`; a lista de integrações usa `src/lib/integration-registry.ts`. Cada plataforma utiliza um `PlatformLogoKey`, evitando strings soltas e garantindo alt text único. As referências oficiais consultadas e os assets locais estão documentados em `docs/brand-assets.md`.

## Validação de rotas

A validação de smoke test respondeu com HTTP 200 para Dashboard, Clientes, Conversas, Pedidos, Financeiro, Campanhas, Jornadas, Automações, Integrações, Relatórios e Configurações. Também responderam corretamente os deep-links `/clientes?cliente=CUS-000184`, `/pedidos?pedido=%23NX-4029` e `/integracoes?integration=nuvemshop`.

## Dashboard operacional

O Dashboard usa `DashboardProvider` como estado de interface. O período selecionado é aplicado de forma consistente a KPIs, receita, canais de venda, canais de atendimento e feed de clientes/conversas. Os presets Hoje, últimos 7, 30 e 90 dias usam a data de referência do dataset demonstrativo; o intervalo personalizado valida início/fim e aceita as datas reais dos registros mockados.

A ação de atualização reprocessa o snapshot em memória, apresenta estado `Sincronizando`, atualiza o timestamp da sessão e recalcula os selectors. Quando o backend estiver conectado, este ponto é o local recomendado para invalidar cache e solicitar o novo `CrmSnapshot`. A exportação CSV usa os mesmos selectors do Dashboard; a opção de impressão delega para a janela nativa do navegador.

A validação interativa do Dashboard confirmou que o botão de atualização apresenta `Sincronizando`, recalcula a interface e termina com timestamp da sessão. O preset Hoje reduziu os indicadores ao conjunto do dia, e o intervalo personalizado de 14/08/2026 a 18/08/2026 atualizou receita, pedidos, canais e feed para os registros correspondentes. A série de receita também foi agrupada por dia para evitar rótulos duplicados.

A exportação CSV foi testada no intervalo personalizado e apresentou confirmação no modal após gerar o arquivo no navegador. O mockup desktop atualizado demonstra o estado final com o resumo operacional, período personalizado, receita agregada por dia e canais filtrados.

## Clientes — auditoria e conexões

A feature Clientes foi reorganizada com uma tabela controlada por estado, seleção em massa, busca por ID/nome/contato/canal/tag, ordenação por recência/LTV/pedidos, métricas derivadas e ações por perfil. O deep-link `/clientes?cliente=CUS-000184` continua abrindo o perfil 360º de Ana Souza.

A seleção de cinco clientes ativa a barra de ações e o botão de campanha com a audiência correta. O modal de campanha recebe os `customerIds` selecionados. O perfil 360º foi validado nas relações: conversa `#TCK-10429`, campanha `CMP-RECOMPRA-AGO` e lançamento financeiro aparecem ligados ao customerId oficial; o pedido fica acessível pela aba correspondente. O modal de tags foi preparado para adicionar etiquetas tanto em lote como no perfil individual.

O teste do modal individual de tags foi concluído: a tag `alto potencial` foi aplicada a Ana Souza e apareceu imediatamente no bloco de segmentação do perfil, sem fechar a página principal. A aplicação confirma que o estado da listagem e o objeto selecionado são atualizados em conjunto.

O fluxo de cadastro manual foi validado com nome, e-mail, telefone e tags. O formulário apresenta origem e segmento inicial, valida e-mail, gera `CUS-*` e está preparado para abrir o perfil recém-criado com as relações vazias prontas para sincronização.

O cadastro manual foi concluído no navegador com o cliente Carolina Freitas. A base passou de 5 para 6 perfis, o ID `CUS-C69E750B` foi criado, o perfil abriu automaticamente no drawer 360º com origem, tags, campos vazios e estados de sem compra, e o botão de rodapé fechou o drawer sem bloquear a listagem.

A validação visual final incluiu o estado limpo desktop e um viewport mobile de 390×844. No mobile, o header, ações, indicadores e toolbar empilham corretamente; a tabela permanece navegável por rolagem horizontal sem forçar a largura da página. Os mockups finais foram atualizados em `mockups/final-v2/desktop/clientes.png` e `mockups/final-v2/mobile/clientes.png`.

O modal de exportação foi validado com cinco perfis visíveis: o download CSV foi executado e mostrou confirmação `5 perfis exportados com IDs oficiais.`. O arquivo inclui customerId, nome, contatos, origem, status, LTV, pedidos e última compra.

A criação de campanha a partir da seleção foi testada com cinco clientes. O modal exibiu a audiência correta e aceitou nome, canal e mensagem; ao salvar, o rascunho foi entregue ao contexto de workspace para permanecer disponível entre as rotas privadas.

Durante a validação, foi identificado que o primeiro teste de campanha navegou antes do effect de persistência escrever o estado no sessionStorage. O contexto foi corrigido para persistir imediatamente em cada mutação (`addCustomer`, `updateCustomer`, `removeCustomers` e `addCampaign`), mantendo também a sincronização posterior por effect.

O segundo teste foi repetido após a correção: cinco clientes foram selecionados e o modal recebeu nome e mensagem de campanha. A próxima etapa de validação é confirmar o novo registro em Campanhas após o salvamento imediato.

A persistência entre rotas foi confirmada: após salvar `Campanha VIP da base` em Clientes, a rota `/campanhas` exibiu o rascunho no topo com `5 clientes selecionados · Editada agora`. O contexto compartilhado também mantém os customerIds nos perfis associados.

A validação final do perfil Ana Souza confirmou duas campanhas relacionadas: a campanha base e `Campanha VIP da base`, além da conversa e do movimento financeiro. O novo rascunho aparece via link `/campanhas?campanha=CMP-*`, demonstrando a ligação por customerId e a persistência do workspace entre rotas.

A inbox de Conversas foi redesenhada sem o PageIntro externo: a nova estrutura ocupa toda a área útil entre o header e a navegação fixa. A validação no navegador confirmou a fila operacional, filtros Todos/Não lidos/Minha fila/Aguardando/Em atendimento/Resolvidas, filtros avançados por canal e prioridade, e a redução correta para 2 tickets ao aplicar WhatsApp. O compositor aceita resposta pública e mantém a ligação com o cliente e o pedido.

A validação funcional da nova inbox confirmou o filtro avançado por WhatsApp, a resposta pública enviada via WhatsApp, a inclusão imediata da mensagem no histórico, o feedback `Mensagem enviada via WhatsApp`, a alteração para `Em atendimento` e a resolução posterior do ticket, com contadores e painel 360º atualizados.

O painel de contexto 360º pode ser ocultado no desktop para expandir o atendimento central. Após ocultá-lo, o botão `Contexto` reaparece na toolbar e reabre o painel sem alterar o ticket selecionado, mantendo a inbox inteira operacional.

A validação visual final da inbox confirmou o shell de tela cheia, fila de tickets, filtros, atendimento e contexto. O painel 360º pode ser ocultado e reaberto pelo botão `Contexto`; o atendimento central expande sem deslocar a página. O estado inicial voltou a 5 tickets, 1 não lido, 3 em atendimento e 1 resolvido.

O mockup mobile final de Conversas foi inspecionado em 390×844. A toolbar reduz ações para ícones acessíveis, a fila ocupa a faixa superior com rolagem horizontal dos filtros, o ticket selecionado e o compositor permanecem abaixo, e o contexto 360º está preparado para abrir como painel sobreposto. Não foi identificado overflow visual da página.

O assistente Ever foi integrado ao Header global como ação persistente do workspace. A validação no Dashboard confirmou o painel lateral responsivo, estado Online, mensagem inicial contextual, sugestões operacionais, links para Dashboard/Conversas e composer com Enter/Shift+Enter. A experiência informa que o contexto atual é usado para sugerir próximos passos e que a conexão generativa segura deverá entrar pela camada de serviço/API.

A validação do Ever confirmou a resposta contextual para a pergunta `Quais tickets devo priorizar?`, com contagem de tickets abertos, prioridade alta, SLA e links para abrir a inbox ou atender Ana Souza. Jornadas foi elevada com KPIs calculados, filtros com contagem, criação de rascunho e modal de detalhe com estado, inscritos, conversão, gatilho e controle de pausa/ativação.

Configurações passou a incluir a seção `Ever, seu copiloto de operação`. A validação confirmou que o toggle `Exibir o Ever no Header` usa o provider global e controla a disponibilidade do assistente em todas as rotas privadas, com persistência de sessão preparada.

O toggle do Ever em Configurações foi testado em ambos os sentidos: ao desativar, a ação desaparece do Header global; ao reativar, volta imediatamente em todas as rotas. O estado padrão foi restaurado para ativo antes da validação final.

A inspeção visual confirmou que Jornadas mantém a hierarquia global em desktop, com cards de lifecycle legíveis e detalhe centralizado. O modal mostrou estado, público, inscritos, conversão, gatilho e controles de pausa/ativação. Em Configurações, o Ever pode ser desativado e reativado pelo toggle, refletindo imediatamente no Header.

Relatórios foi validado com o recorte `Este ano`: receita, período exibido, série e sinais operacionais permaneceram sincronizados com os selectors. O novo painel apresenta exportação CSV configurável por tipo de relatório e período, além de estados vazios sem canais fictícios.

Financeiro foi validado com o período `Últimos 90 dias`: a toolbar altera o recorte exibido, os movimentos e os KPIs permanecem relacionados a pedidos e clientes, e a receita bruta/líquida fica explicitamente separada dos reembolsos. A página agora exporta CSV real dos movimentos filtrados.

Integrações foi validada com a Shopify: o catálogo mantém logos e estados conectados, o modal abre a origem correta e uma tentativa de conectar sem domínio/token não altera o estado, exibindo quais campos precisam ser preenchidos. O fluxo continua preparado para OAuth/API real sem expor credenciais no frontend.

A captura final do Ever em estado aberto foi validada no Dashboard: overlay lateral, backdrop, sugestões de perguntas, resposta contextual e composer ficam isolados sem deslocar o layout principal. O assistente está disponível globalmente quando habilitado em Configurações.

A revisão visual dos mockups confirmou a adaptação mobile de Campanhas sem overflow da toolbar: o botão de nova campanha permanece acessível e os indicadores empilham com leitura vertical. Em desktop, Relatórios mantém uma composição premium e legível, com filtros no topo, quatro KPIs, série de receita, sinal do período e blocos operacionais.
