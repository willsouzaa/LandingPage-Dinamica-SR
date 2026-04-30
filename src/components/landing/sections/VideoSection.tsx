import type { Development } from "@/types/development";

type VideoSectionProps = {
  development: Development;
};

export function VideoSection({ development }: VideoSectionProps) {
  return (
    <section className="hidden" aria-label={`Video do ${development.name}`} />
  );
}
