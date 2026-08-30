"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import { MARQUEE_DURATION, MOTION_QUERIES } from "../constants";
import { gsap, useGSAP } from "../gsap";

export function useMarquee(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const track = scope.current?.querySelector(`[${DataAttr.MarqueeTrack}]`);
        if (!track) {
          return;
        }
        gsap.to(track, {
          xPercent: -50,
          duration: MARQUEE_DURATION,
          ease: "none",
          repeat: -1,
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
