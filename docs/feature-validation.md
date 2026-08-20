# Validação das novas features

## Relatórios

A rota está integrada na navegação principal e apresenta indicadores, tendência de receita em SVG, sinal de negócio, performance por origem e tabela de segmentos. O desktop mantém a hierarquia premium e o filtro de período ocupa uma zona previsível.

## Campanhas

A rota está integrada na navegação, apresenta estados de Activa, Agendada, Rascunho e Concluída, métricas de campanha e o CTA Nova campanha. O modal partilhado foi ligado ao fluxo e os dados de campanha são filtráveis por estado e pesquisa.

## Próxima validação

Testar Pedidos em desktop e mobile, abrir o detalhe de pedido, validar o contexto de cliente/canal em Conversas, testar envio e resolução de ticket e confirmar o build de produção.

## Pedidos

A rota apresenta origem, cliente, código, status, total, data, filtros e o detalhe operacional previsto. A tabela mantém boa leitura em desktop e o layout alternativo mobile foi implementado para não depender de scroll horizontal.

## Conversas

A nova inbox está contextualizada com Ana Souza e WhatsApp via query string. O layout apresenta fila de tickets, estados, prioridade, canal, pedido associado, SLA, responsável, perfil do cliente e compositor. A densidade é alta, mas coerente com uma ferramenta de suporte e com leitura por colunas.

## Validação mobile — Relatórios e Campanhas

Relatórios adapta os filtros e os KPIs para uma coluna legível, sem overflow. Campanhas mantém a CTA e os indicadores empilhados com áreas de toque adequadas; a lista segue abaixo do viewport sem comprimir o conteúdo.

## Validação mobile — Pedidos e Conversas

Pedidos adapta os KPIs para uma coluna e reserva a listagem operacional para o trecho seguinte da página, evitando tabela apertada. Conversas mantém a fila tocável e a pesquisa, mas a coluna de detalhe fica naturalmente abaixo da fila em mobile, seguindo o padrão de inbox compacta. Não foi observado overflow horizontal crítico nas capturas.

## Modal partilhado de Campanhas

O CTA Nova campanha abre o mesmo fluxo partilhado com Clientes, com público de 386 clientes seleccionados, nome, canais E-mail/WhatsApp/Outro canal, mensagem inicial e acção Guardar rascunho. A abertura e os campos foram validados no navegador.

## Detalhe de Pedido

O pedido #NX-4029 abriu correctamente em modal, mostrando cliente Ana Souza, origem Mercado Livre, pagamento, transportadora, tracking e os dois itens do pedido. O fluxo não depende de uma página adicional e mantém o contexto operacional.

## Sincronização da instância

O repositório está na branch `main` em `1d812c7`, com as quatro rotas novas presentes em disco. O processo antigo de desenvolvimento foi encerrado, a cache `.next` foi removida e o servidor foi reiniciado. Após o reinício, Relatórios e Campanhas aparecem na Sidebar e renderizam integralmente no navegador.

Após o reinício, Pedidos e Conversas foram confirmados no navegador. Pedidos renderiza os seis registos com filtros e detalhe; Conversas renderiza a inbox mini Zendesk com Ana Souza, WhatsApp, pedido associado e contexto 360º.
