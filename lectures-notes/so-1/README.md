# Sistemas Operacionais — Prof. Paulo Rettore

13 aulas e 319 slides HTML, com o padrão visual de IAlg e uma estrutura simples para navegação e manutenção.

```text
so/
├── index.html
├── README.md
├── css/style.css
├── assets/
│   ├── ufla-logo.webp
│   └── so.js
├── bloco1/                 # aulas 01–04
├── bloco2/                 # aulas 05–09
├── bloco3/                 # aulas 10–13
└── notas/                  # PDFs originais e complementares
```

## Usar e editar

Abra `index.html` no navegador. Use as setas ou espaço para avançar nos slides; Sumário e Visão geral ajudam a localizar tópicos. Os botões A−/A+ ajustam códigos. As atividades têm respostas reveláveis e as visualizações permitem acompanhar os passos.

Edite diretamente os arquivos HTML das aulas, `css/style.css` para o estilo e `assets/so.js` para os controles. Não há compilação, scripts de build, npm, bibliotecas locais ou dependências da pasta `ialg`.

Reveal.js 4.3.1 e seu tema simple vêm do CDN cdnjs, como em IAlg. As fontes são carregadas pelos imports do tema. Portanto, é necessária conexão à internet para carregar esses recursos. O logo, CSS e JS próprios estão nesta pasta.

## Notas de referência

A pasta `notas/` contém os 13 PDFs das aulas e os três PDFs complementares. O link “Nota em PDF” no índice abre a nota local. Em cada slide de conteúdo, “Nota-base · p. …” abre o PDF correspondente com uma indicação da página (`#page=N`); a navegação à página depende do visualizador de PDF do navegador.

As notas foram obtidas de https://www.rettore.com.br/lectures-notes/so-1/. O slide redundante “Nota original e fontes editáveis” continua removido. Os JSON/Markdown/QMD do professor são entregues separadamente e não devem ser colocados no site público.

## Instalar

Copie a pasta `so/` inteira, inclusive `notas/`, para `lectures-notes/so/` no repositório do seu site. O índice ficará em `lectures-notes/so/index.html`. Todos os caminhos internos são relativos à própria pasta de SO e não dependem de arquivos em `ialg`.

## Referência

Notas originais do Prof. Paulo Rettore: https://www.rettore.com.br/lectures-notes/so-1/

Modelo de estrutura e estilo: https://github.com/prettore/prettore.github.io/tree/main/lectures-notes/ialg

As apresentações são adaptações didáticas das notas. O logo é da UFLA; Reveal.js mantém sua licença MIT no CDN. A organização em blocos é pedagógica, não um calendário oficial.
