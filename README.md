# JWCMOURA ADVOCACIA

Site institucional estático (HTML + CSS + JavaScript puros, sem build), pronto para o **GitHub Pages**.

## Estrutura

```
.
├── index.html                  # Marcação da página (sem CSS/JS/imagens embutidos)
├── robots.txt · sitemap.xml    # SEO (ajuste o domínio se mudar)
├── .nojekyll                   # Diz ao GitHub Pages para servir os arquivos como estão
└── assets/
    ├── css/                    # Estilos, na ORDEM de carregamento (o prefixo numérico importa)
    │   ├── 01-base.css             variáveis, reset, fundo animado
    │   ├── 02-header.css           barra de navegação e hero
    │   ├── 03-sections.css         seções, FAQ, rodapé
    │   ├── 04-components.css       botões/CTAs, popup, seção WillTag
    │   ├── 05-whatsapp.css         botão e WhatsApp flutuante
    │   ├── 06-responsive.css       media queries
    │   ├── 07-apple-ui.css         botões, tipografia e reveal dos comentários
    │   ├── 08-video-modal.css      popup do vídeo
    │   ├── 09-content-blocks.css   linha do tempo, áreas, benefícios
    │   ├── 10-interactions.css     foto, WhatsApp arrastável, cascata, play orbitando
    │   ├── 11-theme.css            tema escuro (padrão) e claro
    │   ├── 12-carousels.css        carrosséis (Penal e Medidas Protetivas)
    │   └── 13-card-stack.css       pilha de cards (um sobre o outro, arrastar para trocar)
    ├── js/                     # Comportamentos (um arquivo por funcionalidade)
    │   ├── main.js                 menu, FAQ, popup de lead, vídeo
    │   ├── areas.js · i18n.js      áreas de atuação e troca de idioma
    │   ├── card-stack.js           componente da pilha de cards (arrastar → vai para o fim da fila)
    │   ├── flow-modal.js · protective-measures.js   cards do Penal e das Medidas Protetivas
    │   ├── theme.js · share.js · willtag.js · reveal.js · testimonials.js
    │   ├── whatsapp-*.js           avatar, arrastar, visibilidade, balão
    │   └── data/                   textos/traduções (edite aqui para mudar conteúdo)
    │       ├── areas.js · i18n.js · flow.js · protective-measures.js
    └── img/
        ├── logo.png  (logo + favicon) · avatar.jpg · about.webp
```
