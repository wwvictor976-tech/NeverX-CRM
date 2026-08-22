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

A validação de smoke test respondeu com HTTP 200 para Dashboard, Clientes, Conversas, Pedidos, Financeiro, Campanhas, Jornadas, Automações, Integrações, Relatórios e Configurações. Também responderam correctamente os deep-links `/clientes?cliente=CUS-000184`, `/pedidos?pedido=%23NX-4029` e `/integracoes?integration=nuvemshop`.
