# Site do Prof. Dr. Paulo Rettore

Este repositório contém o site acadêmico estático do **Prof. Dr. Paulo Rettore**, publicado em [prettore.github.io](https://prettore.github.io/).

## Atualizações desta versão

O site agora mantém o inglês como idioma inicial e oferece um seletor persistente para alternar entre **English** e **Português** em todas as páginas. A tradução é aplicada dinamicamente pelo `script.js`, sem duplicar páginas HTML, e a preferência escolhida é preservada no navegador.

A identidade textual foi padronizada para **Prof. Dr. Paulo Rettore**. O padrão visual preto foi substituído por um tema mais claro, convidativo e responsivo, com superfícies brancas, fundo azul-claro, acentos azul-petróleo e sombras suaves. Também foram corrigidos caminhos Windows-style em links de aulas e teses, referências inconsistentes a `css/` e `js/`, o estado ativo da navegação, a acessibilidade básica do menu e o bug de interação da word cloud.

Como os anexos originais recebidos não continham a pasta de imagens, o site possui um fallback visual em SVG para que os cards não exibam ícones de imagem quebrada. Quando os assets originais forem adicionados, eles serão usados automaticamente.

## Estrutura do site

| Arquivo | Função |
|---|---|
| `index.html` | Página inicial |
| `about-me.html` | Biografia, especialidades e word cloud |
| `research.html` | Grupo RISE e visão geral da pesquisa |
| `research-tactical-networks.html` | Detalhe de Redes Táticas |
| `research-data-fusion.html` | Detalhe de Fusão de Dados em Sistemas de Transporte |
| `lectures.html` | Aulas e notas |
| `students.html` | Orientações atuais e concluídas, com gráfico |
| `publications.html` | Perfis acadêmicos, datasets e curso breve |
| `style.css` | Tema, layout, responsividade e acessibilidade visual |
| `script.js` | Seletor de idioma, navegação, menu móvel e fallbacks |
| `wordcloud.js` | Word cloud responsiva e sensível ao idioma |
| `CNAME` | Configuração de domínio personalizado |

## Desenvolvimento local

Como o site é estático e não exige build, execute na raiz do repositório:

```bash
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000/index.html` no navegador. Para testar o idioma português, selecione **Português** no cabeçalho; a escolha será mantida entre páginas.

## Publicação no GitHub Pages

O projeto pode ser publicado diretamente a partir da branch principal, sem etapa de compilação. Consulte `DEPLOYMENT.md` para o procedimento de configuração e atualização do GitHub Pages.

## Licença

Este projeto é destinado a fins educacionais e acadêmicos.
