import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDevelopmentBySlug, getDevelopmentSlugs } from "@/data/developments";
import { getPublishedDevelopment } from "@/lib/landing-drafts";
import { themeToStyle } from "@/lib/themes";
import { LandingTemplateRenderer } from "@/components/landing/templates";

type DevelopmentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getDevelopmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DevelopmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug) ?? getPublishedDevelopment(slug);

  if (!development) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const canonicalUrl = `${siteUrl}/empreendimento/${slug}`;
  const ogImage = development.seo.image
    ? `${siteUrl}${development.seo.image}`
    : undefined;

  return {
    title: development.seo.title,
    description: development.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: development.seo.title,
      description: development.seo.description,
      url: canonicalUrl,
      type: "website",
      locale: "pt_BR",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: development.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: development.seo.title,
      description: development.seo.description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function DevelopmentPage({ params }: DevelopmentPageProps) {
  const { slug } = await params;
  const development = getDevelopmentBySlug(slug) ?? getPublishedDevelopment(slug);

  if (!development) {
    notFound();
  }

  return (
    <main style={themeToStyle(development.theme)}>
      <LandingTemplateRenderer development={development} />
    </main>
  );
}
