# Debug de alinhamento — Clientes

Medição no viewport 1280×1100:

- Sidebar: `left: 0`, `right: 256`.
- Header: `left: 256`, `right: 1280`, `padding-left: 32px`.
- Main: `left: 256`, `right: 1280`, `padding-left: 32px`.
- Main inner: `left: 288`, `right: 1248`.
- H1 de Clientes: `left: 288`.
- Primeira section: `left: 288`.

Conclusão: o shell Header/Main já partilha exactamente o mesmo eixo (`288px`). O desalinhamento visual da referência vem do conteúdo interno do selo de sincronização, cuja linha começa no ícone e cujo texto começa depois do gap. A correcção deve alinhar o selo como bloco com o mesmo eixo do Header, em vez de comparar o texto interno do selo com o título.

A medição adicional confirmou que Header H1, Main H1 e primeiro SVG de Clientes começam todos no mesmo eixo `left: 288px`, com `padding-left: 32px` tanto no Header como no Main. Portanto, a divergência é óptica no selo: o ícone está a ser percebido como deslocado em relação ao título, embora a caixa DOM esteja alinhada. O ajuste final deve normalizar o selo como uma linha de conteúdo com o mesmo alinhamento visual do título, reduzindo o gap e evitando que o ícone seja interpretado como uma nova margem.
