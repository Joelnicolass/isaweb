"use client";

import { SectionId } from "@/shared/site";
import {
  MOTION_QUERIES,
  SCROLL_TO_DURATION,
  VINYL_PIN_ID,
  VINYL_PIN_PLAY,
} from "../constants";
import { gsap, ScrollTrigger } from "../gsap";

const PIN_BY_SECTION: Partial<Record<SectionId, string>> = {
  [SectionId.Vinyl]: VINYL_PIN_ID,
};

function scrollToTarget(targetId: string, pinId?: string) {
  gsap.killTweensOf(window);
  const reduce = window.matchMedia(MOTION_QUERIES.reduce).matches;
  const pin = pinId ? ScrollTrigger.getById(pinId) : undefined;
  if (pin && !reduce) {
    const timeline = gsap.timeline();
    timeline.to(window, {
      scrollTo: pin.start,
      duration: SCROLL_TO_DURATION,
      ease: "power2.inOut",
    });
    timeline.to(window, {
      scrollTo: pin.end,
      duration: VINYL_PIN_PLAY,
      ease: "none",
    });
    return;
  }
  gsap.to(window, {
    duration: SCROLL_TO_DURATION,
    scrollTo: { y: `#${targetId}`, offsetY: 0 },
    ease: "power2.inOut",
    overwrite: true,
  });
}

export function useScrollToSection() {
  return (id: string) => {
    scrollToTarget(id, PIN_BY_SECTION[id as SectionId]);
  };
}

export function useScrollToNext() {
  return (targetId: string, pinId?: string) => {
    scrollToTarget(targetId, pinId);
  };
}
