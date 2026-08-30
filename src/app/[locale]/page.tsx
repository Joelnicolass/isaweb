import { setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/presentation/components/layout/site-shell";
import { Hero } from "@/presentation/sections/hero";
import { Listen } from "@/presentation/sections/listen";
import { TrackMarquee } from "@/presentation/sections/track-marquee";
import { VinylReveal } from "@/presentation/sections/vinyl-reveal";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SiteShell>
      <Hero />
      <TrackMarquee />
      <VinylReveal />
      <Listen />
    </SiteShell>
  );
}
