import "server-only";

import fs from "fs";
import path from "path";
import type { DevelopmentDraft } from "@/types/development-draft";
import type { Development } from "@/types/development";
import { normalizeDevelopmentDraft, validateDevelopmentDraft } from "./landing-draft-validator";

const ROOT = process.cwd();

export function getDraftDir(slug: string) {
  return path.join(ROOT, "conteudo-marketing", slug, "landing");
}

export function getDraftPath(slug: string) {
  return path.join(getDraftDir(slug), "draft.json");
}

export function getPublishedPath(slug: string) {
  return path.join(getDraftDir(slug), "published.json");
}

export function saveDevelopmentDraft(draft: DevelopmentDraft) {
  const slug = draft.development.slug;
  fs.mkdirSync(getDraftDir(slug), { recursive: true });
  fs.writeFileSync(getDraftPath(slug), JSON.stringify(draft, null, 2), "utf-8");
}

export function getDevelopmentDraft(slug: string): DevelopmentDraft | null {
  const draftPath = getDraftPath(slug);
  if (!fs.existsSync(draftPath)) return null;
  const raw = JSON.parse(fs.readFileSync(draftPath, "utf-8")) as unknown;
  const development = normalizeDevelopmentDraft(raw);
  const validation = validateDevelopmentDraft(development);
  const now = new Date().toISOString();

  if (
    typeof raw === "object" &&
    raw !== null &&
    "schemaVersion" in raw &&
    "development" in raw
  ) {
    const draft = raw as DevelopmentDraft;
    return {
      ...draft,
      validation,
      development,
    };
  }

  return {
    schemaVersion: 1,
    status: "draft",
    source: "ai",
    createdAt: now,
    updatedAt: now,
    strategy: typeof raw === "object" && raw !== null && "strategy" in raw
      ? (raw as Pick<DevelopmentDraft, "strategy">).strategy
      : undefined,
    validation,
    development,
  };
}

export function publishDevelopmentDraft(slug: string) {
  const draft = getDevelopmentDraft(slug);
  if (!draft) return null;

  const published = {
    ...draft,
    status: "published",
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(getPublishedPath(slug), JSON.stringify(published, null, 2), "utf-8");
  return published;
}

export function getPublishedDevelopment(slug: string): Development | null {
  const publishedPath = getPublishedPath(slug);
  if (!fs.existsSync(publishedPath)) return null;
  const payload = JSON.parse(fs.readFileSync(publishedPath, "utf-8")) as DevelopmentDraft;
  return payload.development;
}

export function listPublishedDevelopments(): Development[] {
  const baseDir = path.join(ROOT, "conteudo-marketing");
  if (!fs.existsSync(baseDir)) return [];

  return fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => getPublishedDevelopment(entry.name))
    .filter((development): development is Development => Boolean(development));
}

export function listDevelopmentDrafts(): DevelopmentDraft[] {
  const baseDir = path.join(ROOT, "conteudo-marketing");
  if (!fs.existsSync(baseDir)) return [];

  return fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => getDevelopmentDraft(entry.name))
    .filter((draft): draft is DevelopmentDraft => Boolean(draft));
}
