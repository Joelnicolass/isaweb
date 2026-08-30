"use client";

import { useRef } from "react";
import { VINYL_PIN_ID } from "@/presentation/animations/constants";
import { useCtaArrow } from "@/presentation/animations/hooks/use-cta-arrow";
import { usePianoPortrait } from "@/presentation/animations/hooks/use-piano-portrait";
import { useHeroPhoto, useSplitReveal } from "@/presentation/animations/hooks/use-split-reveal";
import { useScrollToNext } from "@/presentation/animations/hooks/use-scroll-to";
import { DataAttr } from "@/presentation/shared/data-attr";
import { SectionId } from "@/shared/site";
import { HERO_BLACK_KEYS, HERO_FRAMES, HERO_WHITE_KEYS } from "./constants";
import type { HeroViewModel } from "./types";

export function useHeroViewModel(): HeroViewModel {
  const scope = useRef<HTMLElement>(null);
  const scrollToNext = useScrollToNext();
  useSplitReveal(scope, `[${DataAttr.HeroTitle}]`);
  useHeroPhoto(scope);
  usePianoPortrait(scope);
  useCtaArrow(scope);
  return {
    scope,
    frames: HERO_FRAMES,
    whiteKeys: HERO_WHITE_KEYS,
    blackKeys: HERO_BLACK_KEYS,
    goNext: () => scrollToNext(SectionId.Vinyl, VINYL_PIN_ID),
  };
}
