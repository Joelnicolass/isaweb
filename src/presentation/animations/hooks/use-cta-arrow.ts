"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import {
  CTA_ARROW_DURATION,
  CTA_ARROW_HOVER,
  CTA_ARROW_HOVER_DURATION,
  CTA_ARROW_NUDGE,
  MOTION_QUERIES,
} from "../constants";
import { gsap, useGSAP } from "../gsap";

export function useCtaArrow(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const arrows = scope.current?.querySelectorAll(`[${DataAttr.CtaArrow}]`);
        if (!arrows?.length) {
          return;
        }

        arrows.forEach((arrow) => {
          const idle = gsap.to(arrow, {
            x: CTA_ARROW_NUDGE,
            duration: CTA_ARROW_DURATION,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
          });
          const host = arrow.closest("a") ?? arrow;
          const enter = () => {
            idle.pause();
            gsap.to(arrow, {
              x: CTA_ARROW_HOVER,
              duration: CTA_ARROW_HOVER_DURATION,
              ease: "power2.out",
            });
          };
          const leave = () => {
            gsap.to(arrow, {
              x: CTA_ARROW_NUDGE,
              duration: CTA_ARROW_HOVER_DURATION,
              ease: "power2.out",
              onComplete: () => {
                idle.restart();
              },
            });
          };
          host.addEventListener("mouseenter", enter);
          host.addEventListener("mouseleave", leave);
          host.addEventListener("focus", enter);
          host.addEventListener("blur", leave);
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
