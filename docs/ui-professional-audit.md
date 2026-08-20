# Auditoria crítica da UI profissional

## Desktop — Dashboard

A base visual já tem boa consistência de cor, mas ainda comunica um protótipo por usar muitos cards brancos de peso semelhante, vários badges de crescimento e áreas com hierarquia pouco diferenciada. O gráfico ocupa a maior área, enquanto os KPIs e secções inferiores têm a mesma intensidade visual. O Header está funcional, mas a faixa superior continua compacta e pouco editorial.

## Desktop — Clientes

A tabela e os filtros são úteis, mas o topo acumula selo, título, descrição, três CTAs, quatro KPIs e o bloco de filtros num curto intervalo vertical. Isto cria sensação de dashboard genérico em vez de ferramenta operacional. A acção Nova Campanha para Seleccionados aparece disponível mesmo sem seleção e a tabela não oferece uma hierarquia de acção suficientemente clara em telas menores.

## Direcção de refatoração

Reduzir a quantidade de elementos competindo pela atenção, tornar títulos e números mais editoriais, aproximar a navegação de um produto SaaS maduro, substituir badges decorativos por estados contextuais e criar uma escala clara de superfícies: aplicação, secções, conteúdo primário e acção.

## Desktop e mobile — captura real

A captura desktop agora tem boa presença e hierarquia, mas ainda há títulos truncados em alguns KPIs por falta de largura mínima. A captura mobile não apresenta overflow horizontal, porém o Header comprime demasiado o título da página (`Dashb...`) e a barra de ferramentas fica apertada. Os KPIs empilhados ocupam bastante altura, mas continuam legíveis e com áreas de toque adequadas. O principal ajuste responsivo será dar prioridade ao título contextual no mobile, simplificar a busca no Header e evitar truncamentos desnecessários nos cards.

## Segunda rodada de responsividade

O título Dashboard ficou legível no mobile e a busca foi reduzida para `Buscar...`, preservando os controlos do Header. O desktop mantém boa escala de conteúdo e a barra lateral agora tem um estado activo mais forte e mais profissional. Os KPIs continuam legíveis em mobile, embora a rolagem vertical seja naturalmente longa devido à prioridade de leitura individual.

## Fluxos mobile — Clientes e Conversas

Clientes está legível e os CTAs quebram correctamente para duas linhas, mas a campanha continua visualmente activa quando não há seleção — será necessário confirmar que o estado disabled chega à captura final. Os KPIs são legíveis e adequados a toque.

Conversas mantém a lista de threads legível, mas em mobile o painel de conversa fica abaixo da lista e exige rolagem, o que é aceitável para uma primeira inbox, desde que a lista tenha altura controlada e o compositor não desapareça atrás do conteúdo. O título de duas linhas está visualmente forte e coerente com a função.

## Validação final mobile

Clientes agora apresenta Nova campanha claramente indisponível sem seleção, sem competir com Exportar CSV e Novo cliente. Conversas mantém a lista e os estados de canal legíveis, sem overflow horizontal crítico na captura final. Os dois fluxos mantêm a mesma casca de navegação e o mesmo tratamento de superfícies.
