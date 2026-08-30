"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import { MOTION_QUERIES } from "../constants";
import { gsap, useGSAP } from "../gsap";

export function useMenuOverlay(
  overlay: RefObject<HTMLElement | null>,
  open: boolean,
) {
  useGSAP(
    () => {
      const el = overlay.current;
      if (!el || !open) {
        return;
      }
      const links = el.querySelectorAll(`[${DataAttr.OverlayLink}]`);
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        gsap.from(links, {
          y: 28,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: overlay, dependencies: [open], revertOnUpdate: true },
  );
}
