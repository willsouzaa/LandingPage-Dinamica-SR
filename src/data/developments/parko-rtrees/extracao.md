# Extração — PARKO R TRĒES

**Material analisado:** BOOK.pdf (56 páginas)
**Data de extração:** 2026-05-04

---

## Fase 1 — Análise visual

### 1.1 Estilo visual geral

**Natureza/bem-estar + Luxo moderno**

O material combina editorial de saúde e longevidade com identidade visual sofisticada — paleta sage green, tipografia serif editorial e conceito "Ageing in Place" multigeracional. Não é um lançamento imobiliário comum: é uma proposta de estilo de vida com arquitetura integrada à natureza.

---

### 1.2 Paleta de cores

```
primary    → #4A6741  | verde sage — botões, CTAs, ícones e elementos de marca
secondary  → #1A1A1A  | preto — fundos de seções escuras, headers e contrastes
background → #F0EDE6  | bege/off-white — fundo geral das seções informativas
surface    → #FFFFFF  | branco — cards, formulários e áreas internas
text       → #1A1A1A  | preto — texto principal sobre fundo claro
muted      → #7B8B79  | verde-cinza — textos de apoio, labels e legendas
accent     → #6B8F64  | verde claro — realce, animações e elementos decorativos
```

**Tom geral:** Mista (clara/natural com contrastes escuros)

---

### 1.3 Tipografia

```
Fonte para títulos (fontTitle): Cormorant Garant
Fonte para textos (fontBody):   Inter
```

**Estilo tipográfico:** Editorial — O material usa serif alto-contraste para títulos (similar a Cormorant ou Playfair Display) e sans-serif limpa para textos corridos.

---

### 1.4 Imagens para extrair

```
Imagem: Fachada principal do prédio (vista frontal com vegetação) — p. 17
Caminho: /empreendimentos/parko-rtrees/catalogo/fachada-hero.webp
Uso: hero.buildingImage
Prioridade: Obrigatória

Imagem: Vista aérea da Trindade com marcador PARKO — p. 13
Caminho: /empreendimentos/parko-rtrees/catalogo/localizacao-aerea.webp
Uso: hero.backgroundImage / location.image
Prioridade: Obrigatória

Imagem: Fachada lateral (vista da esquina) — p. 18
Caminho: /empreendimentos/parko-rtrees/catalogo/transicao1.webp
Uso: hero.transitionImages[0]
Prioridade: Recomendada

Imagem: Fachada entrada com café/comércio — p. 19
Caminho: /empreendimentos/parko-rtrees/catalogo/transicao2.webp
Uso: hero.transitionImages[1]
Prioridade: Recomendada

Imagem: Detalhe varandas com vegetação — p. 20
Caminho: /empreendimentos/parko-rtrees/catalogo/transicao3.webp
Uso: hero.transitionImages[2]
Prioridade: Recomendada

Imagem: O Bosque — vista diurna — p. 21
Caminho: /empreendimentos/parko-rtrees/catalogo/bosque.webp
Uso: spotlight.image / gallery
Prioridade: Obrigatória

Imagem: O Bosque — vista noturna com 500m² privativos — p. 22
Caminho: /empreendimentos/parko-rtrees/catalogo/bosque-noturno.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Piscina no Rooftop — p. 26
Caminho: /empreendimentos/parko-rtrees/catalogo/piscina-rooftop.webp
Uso: gallery
Prioridade: Obrigatória

Imagem: Fireplace no terraço — p. 27
Caminho: /empreendimentos/parko-rtrees/catalogo/fireplace.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Gourmet 01 — p. 28
Caminho: /empreendimentos/parko-rtrees/catalogo/gourmet-01.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Academia com vista para natureza — p. 31
Caminho: /empreendimentos/parko-rtrees/catalogo/academia.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Spa — p. 32
Caminho: /empreendimentos/parko-rtrees/catalogo/spa.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Pet Place — p. 33
Caminho: /empreendimentos/parko-rtrees/catalogo/pet-place.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Hall de entrada — p. 34
Caminho: /empreendimentos/parko-rtrees/catalogo/hall.webp
Uso: gallery
Prioridade: Opcional

Imagem: Modelo Studio decorado — p. 48
Caminho: /empreendimentos/parko-rtrees/catalogo/modelo-studio.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Modelo 02 Suítes decorado — p. 49
Caminho: /empreendimentos/parko-rtrees/catalogo/modelo-02-suites.webp
Uso: gallery
Prioridade: Recomendada

Imagem: Logo PARKO R TRĒES
Caminho: /empreendimentos/parko-rtrees/catalogo/logo-parko.webp
Uso: brand.logo
Prioridade: Obrigatória
```

---

### 1.5 Recorte da imagem principal

```
Imagem indicada: fachada-hero.webp (p. 17 — vista frontal com vegetação exuberante)
Qualidade para recorte: alto
Fundo prejudica o recorte: sim (vegetação, árvores e carros em primeiro plano)
Recomendação: usar com hero "side-impact" ou "editorial-luxury"; o fundo natural agrega ao conceito do empreendimento e pode ser mantido para dar profundidade ao hero.
```

---

### 1.6 Variante de hero recomendada

**`"side-impact"`**

O material usa fortemente o nome "PARKO" em destaque tipográfico gigante. A variante side-impact, com a palavra de fundo e o prédio recortado sobreposto, reforça o impacto visual de lançamento e é consistente com o padrão do sistema.

---

## Fase 2 — Extração comercial

### 2.1 Dados do empreendimento

```
Nome do empreendimento:     PARKO R TRĒES
Slug sugerido:              parko-rtrees
Construtora/incorporadora:  RTRĒES (RTREES INCORPORACAO E CONSTRUCAO SPE LTDA.)
Bairro:                     Trindade
Cidade:                     Florianópolis
Estado:                     SC
Endereço completo:          Rua José Batista Rosa, lotes 7, 9, 11, 13 e 15
Status comercial:           launch
Tipo de imóvel:             Residencial misto (residencial + comercial)
Tipologias:                 Studios, 1 Suíte, 2 Suítes, Garden Diferenciados, Coberturas
Total de unidades:          83 unidades residenciais + 3 lojas comerciais
Previsão de entrega:        Julho/2029
Obra iniciada:              Novembro/2025
Projeto aprovado:           Processo 178865/2024 — deferido 24/04/2025 — Nº 72262
Registro de incorporação:   Protocolo 468.962 / Registro 193.894 - Livro 2/RG
```

---

### 2.2 Highlights

- "850 m² de lazer e bem-estar multigeracional"
- "500 m² de bosque privativo no coração da Trindade"
- "Piscina aquecida e Fireplace no rooftop com vista panorâmica"
- "Ecossistema de saúde com Concierge e monitoramento remoto"
- "A Praça: comércio e serviços integrados já em operação no térreo"
- "Projeto aprovado e alvará de construção emitido"

---

### 2.3 Diferenciais internos do apartamento

- "Sacada com churrasqueira a carvão"
- "Piso porcelanato 90×90 cm nas áreas sociais"
- "Piso vinílico nos dormitórios"
- "Fechadura eletrônica na porta principal"
- "Persiana motorizada nos dormitórios"
- "Cozinha Gourmet com ponto para grill a gás"
- "Banheiros com nicho, pastilhas e azulejo na área do box"
- "Plantas adaptáveis para PCD sem custo adicional"

---

### 2.4 Amenities

Bosque privativo, Piscina aquecida no rooftop, Fireplace, Gourmet 01, Gourmet 02, Academia, Spa, Pet Place, Hall com design exclusivo, Espaço de Saúde, Concierge de Saúde, Wellness Check, A Praça (comércio integrado), Qualidade do Ar nas áreas comuns, Manutenção integrada à zeladoria

---

### 2.5 Localização

```
Bairro:   Trindade
Cidade:   Florianópolis
Estado:   SC
Endereço: Rua José Batista Rosa, lotes 7, 9, 11, 13 e 15
Destaques:
  - Beira Mar a 400 m — natureza e conveniência juntas
  - UFSC e UDESC a menos de 2 km — alta demanda de moradia e investimento
  - Terminal TITRI a 380 m — mobilidade urbana garantida
  - Angeloni Beira Mar a 1,2 km — tudo o que precisa, perto
  - Hospital HU a 1,5 km — segurança para todas as idades
```

---

### 2.6 Tecnologia e sustentabilidade

```
Título:   Tecnologia e sustentabilidade que inspiram o viver
Subtítulo: Inovação e responsabilidade ambiental em perfeita sintonia.
Itens:
  - Controle de acesso inteligente
  - Central de monitoramento remoto com integração Apple Watch
  - Placas solares instaladas para energia limpa
  - Cisterna para reaproveitamento da água da chuva
  - Infraestrutura para carregamento de carros elétricos em todas as vagas
  - Iluminação LED com sensores de presença
  - Peças sanitárias com tecnologia de baixa vazão
  - Central de resíduos com triagem e coleta seletiva
```

---

### 2.7 Spotlight

```
Imagem:   bosque.webp (p. 21 — O Bosque)
Título:   500 m² de bosque dentro do seu prédio.
Descrição: Um refúgio de natureza privativo onde você pode viver em comunidade, envelhecer com saúde e se cercar de verde todos os dias.
Itens:
  - Bosque privativo de 500 m²
  - Paisagismo para bem-estar e convivência multigeracional
  - Pet Place integrado ao bosque
  - Espaços de meditação e descanso ao ar livre
```

---

### 2.8 Público-alvo

```
Perfis: Famílias multigeracionais, pessoas 45+, investidores
Motivo: O conceito "Ageing in Place" e a proposta de saúde/bem-estar atendem famílias com diferentes gerações sob o mesmo teto ou condomínio. Florianópolis tem valorização anual de 15,71% (FipeZap), atraindo investidores. Studios e 1 suíte atraem jovens e estudantes da UFSC/UDESC.
```

---

### 2.9 Tom de comunicação

```
Tom: Sofisticado + Inspiracional
Palavras-chave: longevidade, natureza, comunidade, bem-estar, bosque, saúde, paz, multigeracional, viver, refúgio
```

---

## Fase 3 — Copywriting

### 3.1 Palavra de impacto

```
Opção 1: PARKO
Opção 2: VIVER
Opção 3: NATUREZA
Melhor opção: PARKO — é o nome forte da marca, amplamente utilizado no material e imediatamente reconhecível.
```

### 3.2 Headlines

1. "PARKO R TRĒES"
2. "O futuro do viver."
3. "Viva. Com bosque."
4. "Natureza, saúde, paz."
5. "Celebre o tempo."

### 3.3 Subtítulos

1. "Ecossistema de saúde e bem-estar no coração da Trindade, com 500 m² de bosque privativo."
2. "Onde a natureza e a cidade se encontram — a 400m da Beira Mar, com concierge de saúde e piscina no rooftop."
3. "Um refúgio urbano na Trindade. Bosque, rooftop e comunidade multigeracional."
4. "Redefinindo os critérios sobre longevidade. Lançamento na Trindade, Florianópolis."
5. "A cidade, na rua ao lado, parece distante. PARKO, a paz de estar em casa."

### 3.4 Frases de impacto

1. "A cidade, na rua ao lado, parece distante."
2. "Aqui, envelhecer é um privilégio compartilhado."
3. "Celebre o tempo e redescubra o futuro do viver."

### 3.5 Selos

1. "LANÇAMENTO NA TRINDADE"
2. "BOSQUE PRIVATIVO 500 M²"
3. "ECOSSISTEMA DE SAÚDE"
4. "OBRA INICIADA NOV/2025"
5. "LANÇAMENTO FLORIANÓPOLIS"

### 3.6 Manifesto

```
A cidade existe lá fora.
Aqui dentro, existe outra coisa.
O cheiro da manhã, a sombra das árvores, o silêncio do bosque.
Viver perto da natureza não é um luxo — é uma necessidade.
Saúde não começa na academia. Começa no espaço que você escolheu habitar.
Comunidade não é uma palavra bonita. É o vizinho que te reconhece no hall.
O tempo avança. Mas o modo de envelhecer é uma escolha.
Escolha o bosque. Escolha o rooftop ao entardecer. Escolha a paz de estar em casa.
Aqui, cada fase da vida tem espaço para ser vivida com intensidade e com cuidado.
Multigeracional não é uma tipologia. É uma filosofia.
Parko é o lugar onde o verde é arquitetura.
Onde saúde, convivência e natureza vivem em perfeita integração.
Celebre o tempo. Redescubra o futuro do viver.

PARKO R TRĒES — A paz de estar em casa.
```

### 3.7 CTAs

```
CTA principal:    Receber catálogo
CTA secundário:   Falar com consultor
Mensagem WA: Olá, tenho interesse no PARKO R TRĒES e quero receber mais informações sobre o lançamento na Trindade.
```

### 3.8 SEO

```
Título SEO:     PARKO R TRĒES | Lançamento na Trindade, Florianópolis  (57 caracteres)
Descrição SEO:  Conheça o PARKO R TRĒES, ecossistema de saúde e natureza na Trindade. Bosque privativo, piscina no rooftop e concierge de saúde. Florianópolis, SC.  (152 caracteres)
```

### 3.9 Template recomendado

```
Template: launch-impact
Motivo: lançamento ativo com forte apelo emocional, hero de impacto com palavra gigante e prédio em destaque. Conceito premium que se encaixa na proposta visual do template.
```
