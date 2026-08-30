"use client";

import { useRef } from "react";
import { useCtaArrow } from "@/presentation/animations/hooks/use-cta-arrow";
import { useVinylScrub } from "@/presentation/animations/hooks/use-scrub-timeline";
import { useScrollToNext } from "@/presentation/animations/hooks/use-scroll-to";
import { SITE } from "@/presentation/content/site";
import { SectionId } from "@/shared/site";
import type { VinylRevealViewModel } from "./types";

export function useVinylRevealViewModel(): VinylRevealViewModel {
  const scope = useRef<HTMLDivElement>(null);
  const scrollToNext = useScrollToNext();
  useVinylScrub(scope);
  useCtaArrow(scope);
  return {
    scope,
    track: SITE.track,
    goNext: () => scrollToNext(SectionId.Listen),
  };
}
