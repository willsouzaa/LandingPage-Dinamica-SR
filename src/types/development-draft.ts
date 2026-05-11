import type { Development } from "./development";

export type LandingDraftStrategy = {
  commercialAngle?: string;
  mainPromise?: string;
  targetAudience?: string[];
  templateReason?: string;
  sectionReason?: string;
  missingInformation?: string[];
};

export type DevelopmentDraft = {
  schemaVersion: 1;
  status: "draft";
  createdAt: string;
  updatedAt: string;
  source: "ai" | "manual";
  strategy?: LandingDraftStrategy;
  validation: {
    ok: boolean;
    issues: string[];
    warnings: string[];
  };
  development: Development;
};
