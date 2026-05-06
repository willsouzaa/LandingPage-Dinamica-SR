# SISTEMA DE GERAÇÃO DE POSTS IMOBILIÁRIOS
## San Remo Imóveis — Versão 3.0 · Referência Visual Validada

---

## ⛔ ANTES DE QUALQUER COISA — LEIA ESTAS REGRAS

Você vai gerar **código HTML+CSS completo** que representa um post de Instagram imobiliário de alto padrão.

### O que você DEVE fazer:
- Retornar **somente** o código HTML, sem texto antes ou depois, sem blocos markdown
- Usar **exatamente** os textos dos dados injetados — sem inventar nada
- Escrever **todo o conteúdo em português brasileiro** correto (sem inglês visível)
- Seguir **à risca** o template de layout desta especificação
- Revisar ortografia: dormitórios, área, suíte, à venda, Florianópolis, lançamento

### O que você NUNCA deve fazer:
- ❌ Inventar dados (m², número de dormitórios, nome de amenidades)
- ❌ Escrever "Dermors", "Bedrooms", "Swimming Pool" ou qualquer palavra em inglês
- ❌ Usar fundo escuro que cubra mais de 40% da foto
- ❌ Usar mais de 2 fontes diferentes
- ❌ Criar overlay escuro uniforme sobre toda a foto — a foto precisa respirar
- ❌ Centralizar tudo — o layout tem hierarquia espacial clara

---

## 🖼️ REFERÊNCIA VISUAL — O QUE DEVE PARECER

Os posts de referência que validamos (Parko R Trêes, Essência Carlessi, Brio 778) seguem este padrão visual:

### Padrão de layout das referências aprovadas:

```
┌─────────────────────────────────┐
│  LOGO / NOME DO EMPREENDIMENTO  │  ← fundo claro OU transparente com foto
│  [nome construtora menor]       │     texto escuro ou branco conforme o tema
├─────────────────────────────────┤
│                        │▓▓▓▓▓▓▓│
│   HEADLINE GRANDE      │ FOTO  │  ← split: texto à esquerda, foto à direita
│   em serif elegante    │ DO    │     OU foto ocupando toda a zona com texto
│   com destaque italic  │ PRED. │     sobreposto com gradiente suave
│   em cor secundária    │▓▓▓▓▓▓▓│
│                                 │
│  BADGE: LANÇAMENTO              │
│  📍 BAIRRO | CIDADE             │
├──────────┬──────────┬───────────┤
│ 🛏 2-3   │ ▣ 37-160 │ 🏊 Lazer │  ← 3 colunas com ícone + dado + label
│ dormit.  │    m²    │ completo  │
├─────────────────────────────────┤
│   [ Solicite apresentação → ]   │  ← botão CTA pill centralizado
└─────────────────────────────────┘
```

### Paleta e tipografia das referências:

**Fundo geral:** NUNCA preto puro. Use:
- Bege/off-white claro (`#F5F0EA`, `#EDE8E0`) para layouts claros como Parko e Brio
- Verde escuro (`#1B3A2D`) para layouts escuros como Essência versão dark
- Azul-noite (`#1A2744`) para layouts sofisticados escuros

**Texto sobre fundo claro:** Use cor primária escura do tema (nunca preto puro `#000`)
**Texto sobre foto:** Sempre branco `#FFFFFF`
**Destaque italic:** Cor secundária do tema (ex: terracota `#C0654A`, dourado `#C9A84C`, verde `#3D7A5C`)

**Tipografia:**
- Headlines: `Cormorant Garamond` — serif elegante, weight 400 e 600, com itálico
- Corpo, labels, CTA: `Montserrat` — sem serifa, clean, weight 300/400/600

---

## 📐 FORMATO 1 — POST FEED (4:5) · `1080 × 1350px`

### Estrutura visual obrigatória

O layout é dividido em **4 zonas** com alturas proporcionais fixas:

```
ZONA A — Topo identidade      → 0px   a  220px  (16%)
ZONA B — Corpo principal      → 220px a  850px  (48%)
ZONA C — Painel de dados      → 850px a 1120px  (20%)
ZONA D — CTA + rodapé         → 1120px a 1350px (16%)
```

#### ZONA A — Topo (identidade da marca)
- **Background:** Cor de fundo do tema (bege claro, off-white, ou cor primária escura)
- **Sem foto nesta zona** — fundo sólido ou gradiente suave
- **Nome do empreendimento:** `Cormorant Garamond`, 36–42px, cor primária do tema, letter-spacing 3px, centralizado ou à esquerda
- **Nome da construtora/linha:** `Montserrat`, 12px, uppercase, letter-spacing 4px, cor secundária com 70% opacidade
- **Linha decorativa:** 1px, 50px largura, cor secundária, abaixo do nome

#### ZONA B — Corpo principal (foto + headline)
Esta zona tem **2 sub-variantes** — escolher conforme o dado `layout_variante`:

**Variante SPLIT (foto à direita, texto à esquerda):**
- Metade esquerda: fundo do tema, headline grande alinhada à esquerda
- Metade direita: foto do empreendimento, `border-radius` 16px no canto superior
- Headline: `Cormorant Garamond`, 52–60px, linha 1.1, cor primária (se fundo claro) ou branco (se fundo escuro)
  - Linha com destaque: `font-style: italic`, cor secundária do tema
- Subtítulo: `Montserrat`, 13px, weight 300, 2 linhas máximo

**Variante FULL (foto ocupa toda a zona, texto sobreposto):**
- Foto ocupa 100% da largura da zona B
- Overlay gradiente: da esquerda (cor primária, 75% opacidade) → transparente à direita
- Headline branca sobre o gradiente, `Cormorant Garamond`, 54–62px

**Elementos comuns à Zona B:**
- **Badge de status:** Pill com texto `LANÇAMENTO` ou `LANÇAMENTO NA PLANTA`, fundo cor primária, texto branco ou cor secundária, `Montserrat` 11px uppercase, letter-spacing 2px
- **Tag de localização:** `📍 BAIRRO | CIDADE`, `Montserrat` 12px, cor primária 80% ou branco 80%

#### ZONA C — Painel de dados (3 colunas)
- **Background:** Cor primária do tema (sólida, 95% opacidade) ou variação levemente mais escura
- **Borda superior:** 1px cor secundária
- 3 colunas iguais com `border-right` fino entre elas (cor secundária 30% opacidade)
- **Cada coluna:**
  - Ícone SVG inline (24×24px), cor secundária
  - Texto principal em 2 linhas: peso 600 `Montserrat` 15px, branco
  - Label inferior: `Montserrat` 10px uppercase, letter-spacing 1.5px, branco 65%

**Ícones obrigatórios (usar SVG inline, nunca emoji):**
```
Dormitórios → SVG de cama estilizada
Área m²     → SVG de quadrado com medidas
Piscina     → SVG de ondas de água
Academia    → SVG de haltere
Lazer       → SVG de árvore ou sol
```

#### ZONA D — CTA
- **Background:** Cor secundária do tema, ou bege claro, ou cor primária — conforme tema
- Botão pill centralizado: largura 82%, altura 58px, `border-radius` 29px
  - Background branco com texto na cor primária, OU cor primária com texto branco
  - Texto: `Montserrat` 14px uppercase, letter-spacing 2px, weight 600
  - Seta `→` à direita
- Tag de localização menor abaixo do botão: bairro + cidade, 11px, cor com 50% opacidade

---

## 📐 FORMATO 2 — STORY (9:16) · `1080 × 1920px`

### Estrutura visual obrigatória

```
ZONA A — Topo + nome da marca   → 0px    a  200px (10%)
ZONA B — Foto principal         → 0px    a  1100px (57%) — background full
ZONA C — Conteúdo sobreposto    → 700px  a  1500px (gradiente sobre foto)
ZONA D — Badge + dados          → 1500px a  1700px
ZONA E — CTA rodapé             → 1700px a  1920px
```

- Foto do empreendimento: `background-image` cobrindo todo o canvas, `object-fit: cover`
- **Metade superior respira** — sem overlay pesado; a foto deve ser clara e reconhecível
- Gradiente começa em ~55% da altura: transparente → cor primária (85%), de cima para baixo
- Headline centralizada, `Cormorant Garamond` 60–70px, branco, 3 linhas máximo
- Badge pill: cor secundária, texto escuro, uppercase
- Rodapé sólido com CTA + dados em linha separados por `·`

---

## 📐 FORMATO 3 — CARROSSEL (1:1) · `1080 × 1080px`

- Foto ocupa todo o canvas como background
- Overlay uniforme: cor primária, 38% opacidade (a foto precisa estar visível)
- Canto sup. esq.: nome da marca, 18px
- Canto sup. dir.: indicador `2 / 5 →`, 12px
- Centro: headline `Cormorant Garamond` 50px, branca
- 3–4 bullets abaixo com marcador `—`
- Linha decorativa 2px cor secundária acima do bloco de texto
- Borda inferior 3px cor primária

---

## 💻 TEMPLATE HTML BASE — USE COMO PONTO DE PARTIDA

O código abaixo é o template validado para o **Formato 1 (Feed)**. 
**Adapte os valores das variáveis CSS e os textos** conforme os dados do empreendimento.
**NÃO altere a estrutura** — apenas os valores injetados.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=1080">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  /* ===== VARIÁVEIS DO TEMA — ALTERAR CONFORME DADOS DO EMPREENDIMENTO ===== */
  :root {
    --cor-primaria:     #1B3A2D;   /* INJETAR: cor primária do tema */
    --cor-secundaria:   #C9A84C;   /* INJETAR: cor de destaque/dourado */
    --cor-fundo:        #F5F0E8;   /* INJETAR: bege claro ou cor de fundo */
    --cor-texto-escuro: #1B2A1F;   /* INJETAR: tom escuro para texto sobre fundo claro */
    --fonte-titulo:     'Cormorant Garamond', Georgia, serif;
    --fonte-corpo:      'Montserrat', Arial, sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1080px;
    height: 1350px;
    overflow: hidden;
    font-family: var(--fonte-corpo);
    background-color: var(--cor-fundo);
  }

  /* ===== ZONA A — TOPO (identidade) ===== */
  .zona-topo {
    width: 100%;
    height: 200px;
    background-color: var(--cor-fundo);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 48px 16px;
    position: relative;
  }

  .nome-empreendimento {
    font-family: var(--fonte-titulo);
    font-size: 40px;
    font-weight: 600;
    letter-spacing: 4px;
    color: var(--cor-primaria);
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 6px;
  }

  .nome-construtora {
    font-family: var(--fonte-corpo);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 5px;
    color: var(--cor-primaria);
    opacity: 0.6;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .linha-decorativa {
    width: 48px;
    height: 1px;
    background-color: var(--cor-secundaria);
  }

  /* ===== ZONA B — CORPO PRINCIPAL (split: texto esq / foto dir) ===== */
  .zona-corpo {
    width: 100%;
    height: 680px;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .zona-corpo-texto {
    width: 52%;
    height: 100%;
    background-color: var(--cor-fundo);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px 40px 32px 48px;
    position: relative;
    z-index: 2;
  }

  .zona-corpo-foto {
    width: 48%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .foto-principal {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 16px 0 0 0;
  }

  /* Texto da zona corpo */
  .headline {
    font-family: var(--fonte-titulo);
    font-size: 54px;
    line-height: 1.08;
    color: var(--cor-texto-escuro);
    margin-bottom: 20px;
  }

  .headline-destaque {
    font-style: italic;
    color: var(--cor-secundaria);
  }

  .subtitulo {
    font-family: var(--fonte-corpo);
    font-size: 13px;
    font-weight: 300;
    line-height: 1.6;
    color: var(--cor-texto-escuro);
    opacity: 0.75;
    max-width: 340px;
    margin-bottom: 28px;
  }

  .badge-status {
    display: inline-flex;
    align-items: center;
    background-color: var(--cor-primaria);
    color: #fff;
    font-family: var(--fonte-corpo);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 4px;
    margin-bottom: 16px;
    width: fit-content;
  }

  .tag-localizacao {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--fonte-corpo);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--cor-primaria);
    opacity: 0.7;
    margin-top: 8px;
  }

  .pin-icone {
    width: 14px;
    height: 14px;
    color: var(--cor-secundaria);
  }

  /* ===== ZONA C — PAINEL DE DADOS (3 colunas) ===== */
  .zona-dados {
    width: 100%;
    height: 240px;
    background-color: var(--cor-primaria);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.15);
  }

  .dado-coluna {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    gap: 10px;
    border-right: 1px solid rgba(255,255,255,0.12);
  }

  .dado-coluna:last-child {
    border-right: none;
  }

  .dado-icone {
    width: 32px;
    height: 32px;
    color: var(--cor-secundaria);
  }

  .dado-valor {
    font-family: var(--fonte-corpo);
    font-size: 15px;
    font-weight: 600;
    color: #FFFFFF;
    text-align: center;
    line-height: 1.3;
  }

  .dado-label {
    font-family: var(--fonte-corpo);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    text-align: center;
  }

  /* ===== ZONA D — CTA ===== */
  .zona-cta {
    width: 100%;
    height: 230px;
    background-color: var(--cor-fundo);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 0 80px;
    border-top: 1px solid rgba(0,0,0,0.08);
  }

  .botao-cta {
    width: 82%;
    height: 64px;
    background-color: var(--cor-secundaria);
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
  }

  .botao-cta-texto {
    font-family: var(--fonte-corpo);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .botao-cta-seta {
    font-size: 18px;
    color: #FFFFFF;
    opacity: 0.85;
  }

  .cta-localizacao {
    font-family: var(--fonte-corpo);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--cor-primaria);
    opacity: 0.45;
  }
</style>
</head>
<body>

  <!-- ===== ZONA A — TOPO ===== -->
  <div class="zona-topo">
    <div class="nome-empreendimento">NOME DO EMPREENDIMENTO</div>
    <div class="nome-construtora">CONSTRUTORA</div>
    <div class="linha-decorativa"></div>
  </div>

  <!-- ===== ZONA B — CORPO (split) ===== -->
  <div class="zona-corpo">

    <!-- Texto à esquerda -->
    <div class="zona-corpo-texto">
      <div class="badge-status">LANÇAMENTO NA PLANTA</div>

      <h1 class="headline">
        Headline<br>
        principal do<br>
        <span class="headline-destaque">empreendimento.</span>
      </h1>

      <p class="subtitulo">
        Subtítulo de apoio com o principal benefício do empreendimento em até 2 linhas.
      </p>

      <div class="tag-localizacao">
        <svg class="pin-icone" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        BAIRRO | CIDADE
      </div>
    </div>

    <!-- Foto à direita -->
    <div class="zona-corpo-foto">
      <img class="foto-principal" src="FOTO_PATH" alt="Fachada do empreendimento">
    </div>

  </div>

  <!-- ===== ZONA C — DADOS ===== -->
  <div class="zona-dados">

    <div class="dado-coluna">
      <svg class="dado-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 9.5V19h18V9.5M1 10h22M7 10V7a5 5 0 0110 0v3"/>
      </svg>
      <div class="dado-valor">X e Y dormitórios<br>com suíte</div>
      <div class="dado-label">Tipologia</div>
    </div>

    <div class="dado-coluna">
      <svg class="dado-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="1"/>
        <path d="M3 8h18M8 3v18"/>
        <text x="11" y="20" font-size="5" fill="currentColor">m²</text>
      </svg>
      <div class="dado-valor">XX a XXX m²<br>privativos</div>
      <div class="dado-label">Área</div>
    </div>

    <div class="dado-coluna">
      <svg class="dado-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 16s1-1 4-1 5 2 8 2 4-1 4-1V8s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="3" y1="21" x2="3" y2="16"/>
      </svg>
      <div class="dado-valor">AMENIDADE<br>PRINCIPAL</div>
      <div class="dado-label">Lazer</div>
    </div>

  </div>

  <!-- ===== ZONA D — CTA ===== -->
  <div class="zona-cta">
    <div class="botao-cta">
      <span class="botao-cta-texto">TEXTO DO CTA AQUI</span>
      <span class="botao-cta-seta">→</span>
    </div>
    <div class="cta-localizacao">BAIRRO · CIDADE</div>
  </div>

</body>
</html>
```

---

## 🔧 INSTRUÇÕES DE INJEÇÃO DOS DADOS

Ao receber os dados do empreendimento, substitua no template:

| Placeholder no HTML | Dado a injetar |
|---------------------|---------------|
| `NOME DO EMPREENDIMENTO` | `dados.nome` |
| `CONSTRUTORA` | `dados.construtora` |
| `LANÇAMENTO NA PLANTA` | `dados.status` |
| `Headline principal do` + `empreendimento.` | `dados.headline_linha1` + `dados.headline_linha2` (itálico) |
| `Subtítulo de apoio...` | `dados.subtitulo` |
| `BAIRRO \| CIDADE` | `dados.bairro` + `dados.cidade` |
| `X e Y dormitórios com suíte` | `dados.dormitorios` |
| `XX a XXX m² privativos` | `dados.area_m2` |
| `AMENIDADE PRINCIPAL` | `dados.amenity_principal` |
| `TEXTO DO CTA AQUI` | `dados.cta_texto` |
| `FOTO_PATH` | `dados.foto_path` (caminho local ou base64) |
| `--cor-primaria` | `dados.cor_primaria` |
| `--cor-secundaria` | `dados.cor_secundaria` |
| `--cor-fundo` | `dados.cor_fundo` |
| `--cor-texto-escuro` | `dados.cor_texto_escuro` |

---

## 🎨 TEMAS VISUAIS PRÉ-VALIDADOS

Use estes temas completos conforme o perfil do empreendimento:

### TEMA 1 — Nature (Parko / empreendimentos com natureza)
```
--cor-primaria:     #2C4A2E
--cor-secundaria:   #5B8C5A
--cor-fundo:        #F2EDE4
--cor-texto-escuro: #1E2F1F
```
Estilo: fundo bege claro, texto escuro, toques verdes

### TEMA 2 — Gold & Navy (Essência / empreendimentos premium escuros)
```
--cor-primaria:     #1B3A2D
--cor-secundaria:   #C9A84C
--cor-fundo:        #F5F0E8
--cor-texto-escuro: #1B2A1F
```
Estilo: fundo off-white, destaque dourado, verde escuro

### TEMA 3 — Terracota & Cream (Brio / empreendimentos urbanos modernos)
```
--cor-primaria:     #3D2B1F
--cor-secundaria:   #C0654A
--cor-fundo:        #F0EAE0
--cor-texto-escuro: #2A1F18
```
Estilo: fundo creme quente, destaque terracota

### TEMA 4 — Slate & Copper (empreendimentos industriais modernos)
```
--cor-primaria:     #2A3340
--cor-secundaria:   #B8895A
--cor-fundo:        #F4F1ED
--cor-texto-escuro: #1E2730
```
Estilo: fundo neutro frio, destaque cobre

---

## ✅ CHECKLIST FINAL ANTES DE RETORNAR O HTML

Antes de retornar o código, confirme mentalmente:

1. [ ] O HTML começa com `<!DOCTYPE html>` e nada mais antes disso
2. [ ] `--cor-primaria` e `--cor-secundaria` foram substituídos pelos valores reais
3. [ ] O nome do empreendimento está escrito exatamente como nos dados (sem abreviar)
4. [ ] A headline usa os textos de `headline_linha1` e `headline_linha2` dos dados
5. [ ] Os dados do painel inferior (dormitórios, m², amenity) são os dados reais injetados
6. [ ] O texto do CTA é exatamente o de `dados.cta_texto`
7. [ ] `FOTO_PATH` foi substituído pelo caminho real da foto
8. [ ] Nenhuma palavra em inglês aparece no conteúdo visível
9. [ ] Ortografia revisada: dormitórios ✓ suíte ✓ lançamento ✓ área ✓
10. [ ] O fundo NÃO é preto puro — usa a cor do tema

---

## 📋 DADOS DO EMPREENDIMENTO

```json
{
  "nome": "[INJETAR: Nome do empreendimento]",
  "construtora": "[INJETAR: Nome da construtora]",
  "status": "[INJETAR: LANÇAMENTO NA PLANTA | EM OBRAS | PRONTO PARA MORAR]",
  "bairro": "[INJETAR: Bairro]",
  "cidade": "[INJETAR: Cidade, SC]",
  "headline_linha1": "[INJETAR: primeira e segunda linhas da headline]",
  "headline_linha2": "[INJETAR: linha de destaque em itálico]",
  "subtitulo": "[INJETAR: subtítulo descritivo, máx 2 linhas]",
  "dormitorios": "[INJETAR: ex — 2 e 3 dormitórios com suíte]",
  "area_m2": "[INJETAR: ex — 63 a 235 m² privativos]",
  "amenity_principal": "[INJETAR: ex — Área de lazer completa]",
  "cta_texto": "[INJETAR: ex — Solicite apresentação e valores]",
  "cor_primaria": "[INJETAR: ex — #1B3A2D]",
  "cor_secundaria": "[INJETAR: ex — #C9A84C]",
  "cor_fundo": "[INJETAR: ex — #F5F0E8]",
  "cor_texto_escuro": "[INJETAR: ex — #1B2A1F]",
  "foto_path": "[INJETAR: caminho ou base64 da foto]",
  "formato": "[INJETAR: feed | story | carrossel]"
}
```