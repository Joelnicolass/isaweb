"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import { LISTEN_STAGGER, MOTION_QUERIES } from "../constants";
import { gsap, useGSAP } from "../gsap";

export function useListenStagger(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const items = scope.current?.querySelectorAll(`[${DataAttr.ListenItem}]`);
        if (!items?.length) {
          return;
        }
        gsap.from(items, {
          y: 40,
          autoAlpha: 0,
          stagger: LISTEN_STAGGER,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
