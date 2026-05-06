/**
 * Gera a estrutura de pastas de marketing para um empreendimento.
 *
 * Lê: src/data/developments/[slug]/dados.json
 * Cria: conteudo-marketing/[slug]/dados/*.json + imagens categorizadas
 *
 * Como rodar:
 *   node scripts/gerar-estrutura-marketing.mjs parko-rtrees
 *   npm run marketing parko-rtrees
 */

import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, "..");

// ─── 1. Argumento: slug do empreendimento ───────────────────────────────────

const slug = process.argv[2];

if (!slug) {
  console.error("\n  Erro: informe o slug do empreendimento.");
  console.error("  Uso: node scripts/gerar-estrutura-marketing.mjs [slug]");
  console.error("  Ex:  node scripts/gerar-estrutura-marketing.mjs parko-rtrees\n");
  process.exit(1);
}

// ─── 2. Lê o dados.json gerado pela IA de extração ──────────────────────────

const dadosPath = path.join(ROOT, "src", "data", "developments", slug, "dados.json");

if (!fs.existsSync(dadosPath)) {
  console.error(`\n  Erro: arquivo não encontrado: ${dadosPath}`);
  console.error(`  Certifique-se de que a extração gerou o dados.json para o slug "${slug}".\n`);
  process.exit(1);
}

const dev = JSON.parse(fs.readFileSync(dadosPath, "utf-8"));

// ─── 3. Define caminhos base ────────────────────────────────────────────────

const ORIGEM   = path.join(ROOT, "public", "empreendimentos", slug, "catalogo");
const DESTINO  = path.join(ROOT, "conteudo-marketing", slug);

// ─── 4. Cria toda a estrutura de pastas ─────────────────────────────────────

const pastas = [
  "dados",
  "imagens/fachada",
  "imagens/lazer",
  "imagens/apartamento",
  "imagens/plantas",
  "imagens/localizacao",
  "imagens/logo",
  "marketing",
];

pastas.forEach(p => fs.mkdirSync(path.join(DESTINO, p), { recursive: true }));

// ─── 5. Gera info.json ───────────────────────────────────────────────────────

salvar("dados/info.json", {
  slug:        dev.slug,
  nome:        dev.nome,
  status:      dev.status,
  template:    dev.template,
  construtora: dev.construtora,
  localizacao: {
    bairro:    dev.localizacao.bairro,
    cidade:    dev.localizacao.cidade,
    estado:    dev.localizacao.estado,
    endereco:  dev.localizacao.endereco   || null,
    mapa_url:  dev.localizacao.mapa_url   || null,
    destaques: dev.localizacao.destaques  || [],
  },
  entrega: dev.entrega || null,
  seo: {
    titulo:    dev.seo.titulo,
    descricao: dev.seo.descricao,
  },
});

// ─── 6. Gera tipologias.json ─────────────────────────────────────────────────

salvar("dados/tipologias.json", {
  plantas: (dev.plantas || []).map(p => ({
    nome:    p.nome,
    area:    p.area    || "não identificado",
    quartos: p.quartos || "não identificado",
    suites:  p.suites  || "não identificado",
    vagas:   p.vagas   || "não identificado",
    imagem:  p.imagem  || null,
  })),
});

// ─── 7. Gera diferenciais.json ───────────────────────────────────────────────

salvar("dados/diferenciais.json", {
  destaques_empreendimento: dev.highlights            || [],
  areas_lazer:              dev.amenities             || [],
  acabamentos_apartamento:  dev.apartmentFeatures     || [],
  tecnologia:               dev.tecnologia            || null,
  spotlight:                dev.spotlight             || null,
});

// ─── 8. Gera copy.json ───────────────────────────────────────────────────────

salvar("dados/copy.json", {
  palavra_gigante_hero: dev.hero.backgroundWord,
  titulo_hero:          dev.hero.titulo,
  subtitulo_hero:       dev.hero.subtitulo,
  frase_impacto:        dev.hero.fraseImpacto   || null,
  selo_hero:            dev.hero.seloBadge      || null,
  essencia:             dev.essencia            || null,
  publico_alvo:         dev.publicoAlvo         || null,
  tom_comunicacao:      dev.tomComunicacao      || null,
  cta: {
    botao_principal:   dev.cta.botaoPrincipal,
    botao_secundario:  dev.cta.botaoSecundario  || null,
    mensagem_whatsapp: dev.cta.mensagemWhatsapp,
  },
});

// ─── 9. Gera visual.json ─────────────────────────────────────────────────────

salvar("dados/visual.json", {
  template:     dev.template,
  hero_variant: dev.hero.variant || null,
  cores: {
    primary:    dev.tema.primary,
    secondary:  dev.tema.secondary,
    background: dev.tema.background,
    surface:    dev.tema.surface,
    text:       dev.tema.text,
    muted:      dev.tema.muted,
    accent:     dev.tema.accent,
  },
  tipografia: {
    titulo: dev.tema.fontTitle,
    corpo:  dev.tema.fontBody,
  },
  logo: {
    arquivo:   dev.logo.arquivo,
    contraste: dev.logo.contraste || null,
  },
});

// ─── 10. Categoriza imagens, copia e gera imagens.json ──────────────────────

const indice = {
  fachada:     [],
  lazer:       [],
  apartamento: [],
  plantas:     [],
  localizacao: [],
  logo:        [],
};

// Galeria principal — já vem com category no dados.json
(dev.galeria || []).forEach(img => {
  const pasta = resolverCategoria(img.categoria);
  const nome  = path.basename(img.arquivo);
  copiarImagem(
    path.join(ORIGEM, nome),
    path.join(DESTINO, "imagens", pasta, nome)
  );
  indice[pasta].push({
    arquivo:      `imagens/${pasta}/${nome}`,
    descricao:    img.descricao,
    uso_sugerido: img.usoSugerido || "carrossel, story",
  });
});

// Plantas
(dev.plantas || []).forEach(p => {
  if (!p.imagem) return;
  const nome = path.basename(p.imagem);
  copiarImagem(
    path.join(ORIGEM, nome),
    path.join(DESTINO, "imagens", "plantas", nome)
  );
  indice.plantas.push({
    arquivo:      `imagens/plantas/${nome}`,
    descricao:    p.nome,
    uso_sugerido: "post de tipologia, carrossel de plantas",
  });
});

// Logo
if (dev.logo?.arquivo) {
  const nome = path.basename(dev.logo.arquivo);
  copiarImagem(
    path.join(ORIGEM, nome),
    path.join(DESTINO, "imagens", "logo", nome)
  );
  indice.logo.push({
    arquivo:      `imagens/logo/${nome}`,
    descricao:    `Logotipo — ${dev.nome}`,
    uso_sugerido: "marca em todos os posts",
  });
}

salvar("dados/imagens.json", indice);

// ─── 11. Relatório final ─────────────────────────────────────────────────────

const totalImagens = Object.values(indice).flat().length;

console.log(`
  ✓ Estrutura de marketing criada com sucesso!
  ──────────────────────────────────────────────
  Empreendimento : ${dev.nome}
  Slug           : ${slug}
  Destino        : conteudo-marketing/${slug}/

  Arquivos gerados em dados/:
    ✓ info.json
    ✓ tipologias.json
    ✓ diferenciais.json
    ✓ copy.json
    ✓ visual.json
    ✓ imagens.json  (${totalImagens} imagens categorizadas)

  Imagens copiadas por categoria:
    fachada      → ${indice.fachada.length} imagem(ns)
    lazer        → ${indice.lazer.length} imagem(ns)
    apartamento  → ${indice.apartamento.length} imagem(ns)
    plantas      → ${indice.plantas.length} imagem(ns)
    localizacao  → ${indice.localizacao.length} imagem(ns)
    logo         → ${indice.logo.length} imagem(ns)

  → Próximo passo: Content Agent gera a pasta marketing/
`);

// ─── Funções auxiliares ──────────────────────────────────────────────────────

function salvar(relativo, dados) {
  fs.writeFileSync(
    path.join(DESTINO, relativo),
    JSON.stringify(dados, null, 2),
    "utf-8"
  );
}

function copiarImagem(origem, destino) {
  if (fs.existsSync(origem)) {
    fs.copyFileSync(origem, destino);
  } else {
    console.warn(`  ⚠ Imagem não encontrada: ${path.basename(origem)}`);
  }
}

function resolverCategoria(categoria) {
  if (!categoria) return "lazer";
  const c = categoria.toLowerCase();
  if (c.includes("fachada"))                         return "fachada";
  if (c.includes("apartamento") || c.includes("apt")) return "apartamento";
  if (c.includes("localiza"))                        return "localizacao";
  return "lazer";
}
