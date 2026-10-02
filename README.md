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

> **Ordem importa:** o CSS depende da cascata (`01` → `12`) e os scripts são carregados
> com `defer` na ordem listada no `<head>` do `index.html`. Ao criar um arquivo novo,
> adicione-o no ponto correto.

## Publicar no GitHub Pages

1. Crie o repositório e envie os arquivos na raiz:
   ```bash
   git init
   git add .
   git commit -m "Site inicial"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```
2. No GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**,
   branch `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/SEU-REPO/`.

### Domínio próprio (jwcmoura.com.br)

Crie um arquivo `CNAME` na raiz contendo apenas `jwcmoura.com.br`, configure o DNS
(registros `A` do GitHub Pages ou `CNAME` para `SEU-USUARIO.github.io`) e ative
**Enforce HTTPS** em Settings → Pages.

## Testar localmente

Abrir o `index.html` direto funciona. Para simular o servidor:

```bash
python3 -m http.server 8000   # depois acesse http://localhost:8000
```

## Onde editar

| Quero mudar…                         | Arquivo                                  |
|--------------------------------------|------------------------------------------|
| Textos da página (português)         | `index.html`                             |
| Traduções EN/ES/FR                   | `assets/js/data/i18n.js`                 |
| Áreas de atuação                     | `assets/js/data/areas.js`                |
| Etapas dos carrosséis                | `assets/js/data/flow.js`, `protective-measures.js` |
| Cores e tema                         | `assets/css/01-base.css`, `11-theme.css` |
| Fotos                                | `assets/img/`                            |

## Pilha de cards

Os cards do **Direito Penal**, das **Medidas Protetivas** e das demais áreas (Família, Cível,
Previdenciário) usam o mesmo componente, `assets/js/card-stack.js`: o card de cima acompanha o
dedo/mouse, e ao soltar ele vai para o fim da fila. As setas, os números e as teclas ← → também
funcionam. Para ajustar o visual (quantos aparecem atrás, deslocamento, escala), edite
`assets/css/13-card-stack.css` (`calc(var(--p) * 20px)` e `* .05`) e `VISIBLE` em `card-stack.js`.
