# Milton Assis — Portfolio Cyberpunk Workspace

> **SPEC-DRIVEN DEVELOPMENT (SDD) — DOCUMENTO DE ESPECIFICAÇÃO OFICIAL**
>
> Este arquivo é o contrato de design, arquitetura e comportamento deste projeto.
> **Somente o criador Milton Assis pode autorizar alterações neste documento e nos arquivos do projeto.**
> Toda IA, agente, ferramenta automatizada ou colaborador deve ler e respeitar integralmente este spec antes de qualquer modificação.

---

## Índice

1. [Visão geral](#1-visão-geral)
2. [Paleta de cores — imutável](#2-paleta-de-cores--imutável)
3. [Tipografia — imutável](#3-tipografia--imutável)
4. [Design tokens e variáveis CSS — imutáveis](#4-design-tokens-e-variáveis-css--imutáveis)
5. [Estrutura de arquivos — imutável](#5-estrutura-de-arquivos--imutável)
6. [Arquitetura e layout — imutável](#6-arquitetura-e-layout--imutável)
7. [Seções e IDs — imutáveis](#7-seções-e-ids--imutáveis)
8. [Componentes visuais — imutáveis](#8-componentes-visuais--imutáveis)
9. [Comportamentos JavaScript — imutáveis](#9-comportamentos-javascript--imutáveis)
10. [Regras de acessibilidade — obrigatórias](#10-regras-de-acessibilidade--obrigatórias)
11. [Regras de segurança — obrigatórias](#11-regras-de-segurança--obrigatórias)
12. [Regras para IA e agentes automatizados](#12-regras-para-ia-e-agentes-automatizados)
13. [Changelog autorizado](#13-changelog-autorizado)
14. [Como visualizar e publicar](#14-como-visualizar-e-publicar)

---

## 1. Visão geral

Portfólio profissional estático de Milton Assis. Apresenta perfil, cases, stack, método de trabalho e canais de contato.

- **Tipo:** site estático, 100% client-side, sem backend, sem banco de dados.
- **Estética:** cyberpunk com inspiração em interface de editor de código (VS Code-like).
- **Tecnologia:** HTML5 + CSS3 + JavaScript Vanilla. Sem frameworks (React, Vue, Tailwind etc.).
- **Deploy alvo:** GitHub Pages, Netlify, Vercel ou Cloudflare Pages.

---

## 2. Paleta de cores — imutável

A paleta é definida integralmente via variáveis CSS no seletor `:root` em `styles.css`.
**Nenhuma cor deve ser adicionada como valor hardcoded fora das variáveis abaixo.**

| Variável CSS      | Valor hex / rgba                  | Uso principal                           |
| ----------------- | --------------------------------- | --------------------------------------- |
| `--bg`            | `#070711`                         | Fundo base da página                    |
| `--bg-2`          | `#0d1020`                         | Fundo secundário e painéis              |
| `--panel`         | `rgba(15, 18, 34, 0.78)`          | Painéis com transparência               |
| `--panel-2`       | `rgba(20, 25, 48, 0.64)`          | Painéis secundários                     |
| `--border`        | `rgba(130, 245, 255, 0.14)`       | Bordas padrão sutis                     |
| `--border-strong` | `rgba(159, 114, 255, 0.34)`       | Bordas de destaque (modais, focus)      |
| `--text`          | `#edf7ff`                         | Texto principal                         |
| `--muted`         | `#91a4bc`                         | Texto secundário / metadados            |
| `--cyan`          | `#55f7ff`                         | Cor de destaque primária (glows, links) |
| `--purple`        | `#9f72ff`                         | Cor de destaque secundária (gradientes) |
| `--pink`          | `#ff4fd8`                         | Acentuação terciária (orbs, dots)       |
| `--green`         | `#6cffb5`                         | Indicadores positivos / status          |
| `--yellow`        | `#f7e46a`                         | Indicadores de atenção / dots           |
| `--shadow`        | `0 30px 80px rgba(0, 0, 0, 0.45)` | Sombra padrão de cards e modais         |

### Gradientes de fundo (body)

Quatro camadas combinadas:

```css
radial-gradient(circle at top left, rgba(85, 247, 255, 0.12), transparent 34rem),
radial-gradient(circle at 70% 20%, rgba(159, 114, 255, 0.14), transparent 28rem),
radial-gradient(circle at 80% 90%, rgba(255, 79, 216, 0.10), transparent 28rem),
linear-gradient(135deg, #05050c 0%, #080914 46%, #0c0c18 100%)
```

### Grid de fundo (body::before)

```css
background-image:
  linear-gradient(rgba(85, 247, 255, 0.035) 1px, transparent 1px),
  linear-gradient(90deg, rgba(85, 247, 255, 0.035) 1px, transparent 1px);
background-size: 46px 46px;
```

---

## 3. Tipografia — imutável

| Variável CSS | Valor                                                                                        | Uso                                  |
| ------------ | -------------------------------------------------------------------------------------------- | ------------------------------------ |
| `--font`     | `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Texto corrido e headings             |
| `--mono`     | `"Cascadia Code", "Fira Code", "SFMono-Regular", Consolas, monospace`                        | Labels, kickers, terminal, mono tags |

### Escala de tamanhos de heading

| Tag  | Propriedade                                                               |
| ---- | ------------------------------------------------------------------------- |
| `h1` | `clamp(3rem, 7vw, 6.6rem)`, `line-height: 0.9`, `letter-spacing: -0.08em` |
| `h2` | `clamp(2rem, 4vw, 4rem)`, `letter-spacing: -0.055em`                      |
| `h3` | `1.2rem`, `letter-spacing: -0.02em`                                       |

---

## 4. Design tokens e variáveis CSS — imutáveis

| Variável CSS | Valor  | Uso                                      |
| ------------ | ------ | ---------------------------------------- |
| `--radius`   | `22px` | `border-radius` padrão de cards e modais |

**Regra:** `--radius` deve ser usado em todos os cards, modais e painéis. Nunca inserir valores numéricos de raio diretamente.

---

## 5. Estrutura de arquivos — imutável

```
site_link/
├── index.html                  # Página principal do portfólio
├── politica_privacidade.html   # Página legal de privacidade (LGPD)
├── styles.css                  # Design system completo e responsividade
├── script.js                   # Comportamentos interativos
└── README.md                   # Este documento SDD
```

**Regras:**

- Não criar subpastas sem autorização explícita de Milton.
- Não renomear arquivos existentes.
- Novas páginas devem usar o mesmo `styles.css` e seguir o mesmo template visual.
- Não introduzir dependências externas (npm, CDN de frameworks) sem autorização.

---

## 6. Arquitetura e layout — imutável

### Shell principal (`index.html`)

O layout usa CSS Grid com **3 colunas fixas** no desktop:

```css
.workspace-shell {
  grid-template-columns: 64px 260px minmax(0, 1fr);
}
```

| Coluna | Classe CSS        | Componente                           |
| ------ | ----------------- | ------------------------------------ |
| 1      | `.activity-bar`   | Barra lateral de ícones de navegação |
| 2      | `.explorer-panel` | Painel explorador com file-tree      |
| 3      | `.editor-surface` | Área de conteúdo principal           |

### Breakpoints responsivos

| Largura máxima | Comportamento                                                                      |
| -------------- | ---------------------------------------------------------------------------------- |
| `1120px`       | Explorer panel oculto; grid colapsa para 2 colunas em grids de conteúdo            |
| `760px`        | `workspace-shell` vira `display: block`; activity bar fixa na base como dock móvel |

### Camadas visuais (z-index)

| Elemento              | z-index |
| --------------------- | ------- |
| `.workspace-shell`    | 1       |
| `.topbar`             | 10      |
| `.command-palette`    | 50      |
| `.construction-modal` | 55      |

---

## 7. Seções e IDs — imutáveis

Todas as seções e IDs abaixo são âncoras de navegação interna. **Não renomear nem remover.**

| ID          | Seção                         | Label no file-tree |
| ----------- | ----------------------------- | ------------------ |
| `#top`      | Hero principal                | `hero.md`          |
| `#about`    | Perfil profissional           | `about.json`       |
| `#projects` | Cases e frentes de construção | `cases.ts`         |
| `#stack`    | Stack e competências          | `stack.yaml`       |
| `#method`   | Método de construção          | `playbook.ai`      |
| `#contact`  | Contato                       | `contact.env`      |

---

## 8. Componentes visuais — imutáveis

### Cards (`.glass-card`, `.project-card`, `.stack-column`, `.contact-card`)

```css
border: 1px solid var(--border);
background: linear-gradient(
  180deg,
  rgba(255, 255, 255, 0.055),
  rgba(255, 255, 255, 0.025)
);
box-shadow: var(--shadow);
border-radius: var(--radius);
padding: 26px;
```

### Terminal card (`.terminal-card`, `.code-window`)

- Usa os mesmos estilos de card acima.
- Cabeçalho com três dots coloridos: `var(--pink)`, `var(--yellow)`, `var(--green)`.
- Conteúdo em tag `<pre><code>` com fonte `--mono` e cor `#daf8ff`.

### Activity bar (`.activity-bar`)

- Largura fixa: `64px` no desktop.
- Links: `42x42px`, `border-radius: 14px`.
- Estado hover/ativo: cor `var(--cyan)`, borda `rgba(85,247,255,0.2)`, fundo `rgba(85,247,255,0.07)`.

### File tree (`.file-tree`)

- Cada item tem um `.dot` com `box-shadow: 0 0 18px currentColor` (glow).
- Cores dos dots mapeadas em classes utilitárias: `.cyan`, `.purple`, `.green`, `.yellow`, `.pink`.

### Tags (`.tags span`, `.stack-column span`)

```css
border: 1px solid rgba(85, 247, 255, 0.15);
background: rgba(85, 247, 255, 0.055);
color: #c9faff;
border-radius: 999px;
```

### Botões (`.btn`)

- `.btn.primary`: gradiente `linear-gradient(135deg, var(--cyan), var(--purple))`, texto `#02030b`.
- `.btn.ghost`: `border: 1px solid var(--border-strong)`, fundo `rgba(255,255,255,0.04)`.
- Hover: `transform: translateY(-2px)`.

### Modais (`.command-palette`, `.construction-modal`)

- Overlay com `background: rgba(0,0,0,0.46~0.50)` e `backdrop-filter: blur(10px)`.
- Box interna: `border: 1px solid var(--border-strong)`, `background: rgba(10,12,24,0.94~0.95)`, `border-radius: 22px`.
- Z-index: `50` (command-palette) e `55` (construction-modal).

### Efeito reveal (`.reveal`)

Elementos com classe `.reveal` iniciam invisíveis e surgem ao entrar no viewport:

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Observado por `IntersectionObserver` com `threshold: 0.12` em `script.js`.

### Orbs e ruído

- `.orb`: `width: 28rem`, `height: 28rem`, `filter: blur(80px)`, `opacity: 0.22`.
- `.orb-a`: cor `var(--cyan)`, posição `left: -12rem; top: 8rem`.
- `.orb-b`: cor `var(--pink)`, posição `right: -12rem; bottom: 4rem`.
- `.noise`: ruído SVG inline com `opacity: 0.08`, `z-index: 0`, fixed.

---

## 9. Comportamentos JavaScript — imutáveis

O arquivo `script.js` é **Vanilla JS**, sem dependências externas.

### Command Palette

- Ativação: botão `#commandButton` ou atalho `Ctrl/Cmd + K`.
- Fechamento: `Esc`, clique no overlay ou clique em qualquer link interno.
- Acessibilidade: foco automático no primeiro item ao abrir; foco-trap por Tab; retorno de foco ao fechar.
- ARIA: `role="dialog"`, `aria-modal="true"`, `aria-hidden` gerenciado dinamicamente.

### Abas em construção (`.js-construction-tab`)

- Abas com `data-feature="nome"` abrem o `#constructionModal` com o nome da feature.
- O texto visível em `#constructionFeatureName` é inserido via `textContent` (nunca `innerHTML`).
- Fechamento: botão `#constructionCloseButton`, `Esc` ou clique no overlay.
- Acessibilidade: mesmas regras do command palette.

### Reveal on scroll

- `IntersectionObserver` com `threshold: 0.12`.
- Ao entrar no viewport, adiciona `.visible` e deixa de observar o elemento.

### Regra geral de JavaScript

- **Proibido** usar `innerHTML`, `document.write`, `eval`, `new Function`, `setTimeout(string)`.
- Todo conteúdo dinâmico deve ser inserido via `textContent`, `createElement` ou atributos explícitos.
- Sem `console.log` em produção.
- Sem dependências externas (CDN ou npm).

---

## 10. Regras de acessibilidade — obrigatórias

- Todo elemento interativo tem `aria-label` ou texto visível.
- `role="dialog"` + `aria-modal="true"` em todos os modais.
- `aria-hidden` gerenciado programaticamente ao abrir/fechar modais.
- Foco inicial ao abrir modal, foco-trap por Tab, retorno de foco ao fechar.
- `:focus-visible` com outline `2px solid rgba(85, 247, 255, 0.8)` em todo o projeto.
- `.sr-only` disponível para textos de contexto acessíveis apenas a leitores de tela.
- Links externos devem sempre ter `target="_blank" rel="noreferrer"`.

---

## 11. Regras de segurança — obrigatórias

- **CSP declarativa:** não inserir scripts inline sem nonce ou hash aprovado.
- **innerHTML proibido em todo JS:** usar `textContent` para qualquer texto dinâmico.
- **Links externos:** validados pela função `isSafeExternalUrl()` em `script.js` antes de qualquer navegação programática.
- **data-\* attributes:** valores de `data-feature` são sanitizados pelo JS antes do uso.
- **Inputs do usuário:** este site não possui forms, mas qualquer campo futuro deve ser sanitizado antes de processamento.
- **Sem eval, new Function, setTimeout(string):** proibidos sem exceção.
- **SRI (Subresource Integrity):** qualquer recurso externo futuro deve ter atributos `integrity` e `crossorigin`.

---

## 12. Regras para IA e agentes automatizados

> Estas regras aplicam-se a qualquer modelo de linguagem, agente, copiloto ou ferramenta automatizada que interaja com este repositório.

### O que é PERMITIDO (somente com autorização explícita de Milton)

- Atualizar conteúdo de texto dentro das seções existentes.
- Adicionar novos `project-card` dentro do grid existente, seguindo o template de card.
- Atualizar links de contato (email, LinkedIn, GitHub).
- Corrigir erros ortográficos no conteúdo.
- Implementar novas features descritas por Milton, seguindo todos os tokens deste spec.

### O que é PROIBIDO sem exceção

- Alterar variáveis CSS do `:root`.
- Alterar paleta de cores, fontes ou design tokens.
- Renomear IDs de seções (`#top`, `#about`, `#projects`, `#stack`, `#method`, `#contact`).
- Renomear ou remover arquivos do projeto.
- Introduzir frameworks CSS ou JS.
- Inserir scripts externos sem SRI.
- Usar `innerHTML` ou equivalentes em JavaScript.
- Alterar o layout de 3 colunas ou os breakpoints definidos.
- Modificar os atributos ARIA de acessibilidade.
- Remover ou alterar as funções de guardrail em `script.js`.
- Alterar este documento README sem autorização de Milton.

### Instrução obrigatória antes de qualquer edição

Antes de editar qualquer arquivo, o agente deve:

1. Ler o estado atual do arquivo (não assumir).
2. Confirmar que a edição está dentro do escopo autorizado.
3. Confirmar que nenhuma variável CSS, ID de seção, nome de arquivo ou padrão de acessibilidade será quebrado.
4. Aplicar apenas a mudança mínima necessária para atender ao pedido.

---

## 13. Changelog autorizado

| Data       | Autor        | Alteração                                                                          |
| ---------- | ------------ | ---------------------------------------------------------------------------------- |
| 02/06/2026 | Milton Assis | Criação do projeto e estrutura base                                                |
| 02/06/2026 | Milton Assis | Acessibilidade da command palette (foco-trap, ARIA, retorno de foco)               |
| 02/06/2026 | Milton Assis | Link de política de privacidade no rodapé e na command palette                     |
| 02/06/2026 | Milton Assis | Revisão da política de privacidade com tom formal e conformidade LGPD              |
| 02/06/2026 | Milton Assis | Links de contato LinkedIn e GitHub sem protocolo http                              |
| 02/06/2026 | Milton Assis | Modal de página em construção para abas `agentic.workflow` e `hyperautomation.map` |
| 02/06/2026 | Milton Assis | SDD completo no README e guardrails de segurança no script.js                      |

---

## 14. Como visualizar e publicar

### Visualização local

```bash
cd site_link
python -m http.server 8080
```

Acesse: `http://localhost:8080`

### Deploy rápido

- **GitHub Pages:** repositório público + ativar Pages nas configurações.
- **Netlify / Vercel / Cloudflare Pages:** arrastar a pasta `site_link` ou conectar o repositório.

### Observação de confidencialidade

Os cases foram descritos de forma genérica para preservar dados de clientes, empresas, sistemas internos, URLs, endpoints, planilhas e regras de negócio específicas.
