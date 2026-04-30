import type { Development } from "@/types/development";
import { brio778 } from "./brio778/index";

export const developments: Development[] = [brio778];

export function getDevelopmentBySlug(slug: string) {
  return developments.find((development) => development.slug === slug);
}

export function getDevelopmentSlugs() {
  return developments.map((development) => development.slug);
}
