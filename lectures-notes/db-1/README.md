# Banco de Dados — DB-1

Nove aulas e 251 slides do Prof. Paulo Rettore, com a mesma identidade visual e organização simples de IAlg. As aulas são adaptações didáticas das [notas de Banco de Dados](https://www.rettore.com.br/lectures-notes/db-1/), com exemplos, diagramas e atividades com respostas reveláveis. Os nove PDFs originais estão incluídos em `notas/`.

## Estrutura

```text
banco-de-dados/
├── index.html
├── README.md
├── css/
│   └── style.css
├── assets/
│   ├── db-slides.js
│   └── ufla-logo.webp
├── notas/
│   └── nove PDFs originais, numerados de 01 a 09
├── bloco1/
│   ├── aula01.html
│   ├── aula02.html
│   └── aula03.html
├── bloco2/
│   ├── aula04.html
│   ├── aula05.html
│   └── aula06.html
└── bloco3/
    ├── aula07.html
    ├── aula08.html
    └── aula09.html
```

O bloco 1 reúne fundamentos e modelagem; o bloco 2, normalização e consultas; o bloco 3, indexação e ordenação externa. Essa divisão é pedagógica, não um calendário oficial.

## Usar e editar

Abra `index.html` no navegador ou copie esta pasta para uma subpasta do seu site, como `lectures-notes/db/`. Não é necessário instalar dependências nem executar um compilador. Edite o conteúdo diretamente em `blocoN/aulaNN.html`, os estilos em `css/style.css` e os controles em `assets/db-slides.js`.

No índice, clique em **Nota em PDF** para abrir a nota completa de uma aula. Nos slides com referências, clique em **Nota-base · p. N** para abrir o PDF local na página que fundamenta o conteúdo. Os links usam caminhos relativos para `notas/` e preservam o fragmento `#page=N`; quando há um intervalo, a abertura é na primeira página citada. O posicionamento depende do suporte do visualizador PDF do navegador. Os PDFs originais são incluídos sem alterações e podem ser consultados sem conexão à internet.

Reveal.js 4.3.1 é carregado por cdnjs; o tema `simple` carrega Lato e News Cycle por Google Fonts. **É necessária conexão à internet para carregar Reveal.js e as fontes das apresentações.** O CSS, o JavaScript próprio, o logotipo e os PDFs estão nesta pasta; nenhum recurso depende de arquivos localizados dentro de `ialg/` ou de buscar as notas no site original.

Navegue com setas, Espaço ou toque. Use Sumário para ir a um tópico, Visão geral para ver os slides e Índice para voltar às aulas. A−/A+ ajustam os códigos; Ver resposta abre o gabarito das atividades. Tela cheia depende da permissão e do suporte do navegador.

O pacote contém 23 arquivos: os 14 arquivos do portal e nove PDFs em `notas/`. Não inclui `public/`, fontes duplicadas JSON/MD/QMD, scripts de compilação, Reveal.js local ou fontes tipográficas locais. Nenhuma alteração ou publicação foi feita em rettore.com.br ou no repositório do professor.
