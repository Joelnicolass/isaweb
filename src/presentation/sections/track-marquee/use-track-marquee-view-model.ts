"use client";

import { useRef } from "react";
import { useMarquee } from "@/presentation/animations/hooks/use-marquee";
import { SITE } from "@/presentation/content/site";
import { MARQUEE_REPEAT } from "./constants";
import type { TrackMarqueeViewModel } from "./types";

export function useTrackMarqueeViewModel(): TrackMarqueeViewModel {
  const scope = useRef<HTMLElement>(null);
  useMarquee(scope);
  const items = Array.from({ length: MARQUEE_REPEAT }, () => SITE.track.title);
  return { scope, items };
}
