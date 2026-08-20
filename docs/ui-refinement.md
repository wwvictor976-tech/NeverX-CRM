# Direcção de refinamento UI/UX

## Princípio visual

A interface deve continuar a ser NeverX, mas com mais presença visual: fundo global ligeiramente mais escuro, bordas com contraste suficiente para separar superfícies, cards brancos reservados para conteúdos importantes, sombras mais controladas e acento dourado usado apenas para acções e estados de foco.

## Header

O Header não utiliza modais para tarefas rápidas. A busca mantém-se visível no campo original e, enquanto o utilizador escreve, mostra resultados num dropdown ancorado abaixo do campo, sem bloquear o conteúdo. As notificações são um popover estreito ancorado ao sino, com resumo, horário e CTA discreto. O menu do perfil segue o mesmo padrão ancorado ao botão do utilizador. Modal de ecrã inteiro fica reservado para formulários, configurações ou fluxos que exigem decisão.

## Contraste e superfícies

O fundo de aplicação passa para um cinza frio mais profundo, sem se tornar escuro. A superfície dos cards continua clara para leitura e passa a ter borda e sombra com maior definição. Inputs, tabelas, cabeçalhos de secção e estados vazios ganham separação visual coerente através dos tokens globais, evitando cores aleatórias por página.

## UX

Cada overlay tem uma âncora espacial evidente, fecha com Escape e clique fora, não rouba o foco do conteúdo e não cria sensação de interrupção desnecessária. As interacções rápidas do Header permanecem no contexto actual; os modais existentes de Cliente, Integração, Dashboard e formulários continuam centrados apenas quando a tarefa precisa de atenção exclusiva.

## Validação visual 20 ago 2026

O Dashboard refinado apresenta fundo de aplicação ligeiramente mais profundo, cards com bordas mais definidas e sombras mais legíveis. O sino abre um popover compacto directamente abaixo do ícone, sem bloquear a página nem centralizar o conteúdo. O popover apresenta três resumos, badge de novas notificações, acção Marcar como lidas e ligação para Conversas.

## Busca inline

Ao escrever `Rafael` no campo do Header, o resultado apareceu imediatamente abaixo do campo, no contexto do Dashboard, sem modal. O resultado mostrou Rafael Mendes como conversa WhatsApp e, ao clicar, navegou para `/conversas?cliente=rafael-mendes&canal=whatsapp`, abrindo o cliente e o canal correctos.
