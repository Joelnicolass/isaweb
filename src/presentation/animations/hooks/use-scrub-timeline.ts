"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import {
  MOTION_QUERIES,
  PIN_ANTICIPATE,
  VINYL_COPY_Y,
  VINYL_DISC_END_SCALE,
  VINYL_DISC_START_SCALE,
  VINYL_GHOST_X_END,
  VINYL_GHOST_X_START,
  VINYL_GLOW_ROTATION,
  VINYL_MASK_END_SCALE,
  VINYL_MASK_START_SCALE,
  VINYL_PIN_END,
  VINYL_PIN_ID,
  VINYL_SCRUB,
  VINYL_TITLE_STAGGER,
  VINYL_TITLE_Y_PERCENT,
} from "../constants";
import { gsap, SplitText, useGSAP } from "../gsap";

export function useVinylScrub(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.reduce, () => {
        const root = scope.current;
        if (!root) {
          return;
        }
        gsap.set(`[${DataAttr.VinylDisc}]`, { rotation: 0, scale: VINYL_DISC_END_SCALE });
        gsap.set(`[${DataAttr.VinylMask}]`, { rotation: 0, scale: VINYL_MASK_END_SCALE });
        gsap.set(
          [
            `[${DataAttr.VinylTitle}]`,
            `[${DataAttr.VinylCopy}]`,
            `[${DataAttr.VinylGhost}]`,
            `[${DataAttr.VinylRule}]`,
            `[${DataAttr.VinylGlow}]`,
          ],
          { autoAlpha: 1, y: 0, xPercent: 0, scaleX: 1, rotation: 0, scale: 1 },
        );
      });
      mm.add(MOTION_QUERIES.motion, () => {
        const root = scope.current;
        const pin = root?.querySelector(`[${DataAttr.VinylPin}]`);
        const disc = root?.querySelector(`[${DataAttr.VinylDisc}]`);
        const mask = root?.querySelector(`[${DataAttr.VinylMask}]`);
        const title = root?.querySelector(`[${DataAttr.VinylTitle}]`);
        const copy = root?.querySelector(`[${DataAttr.VinylCopy}]`);
        const ghost = root?.querySelector(`[${DataAttr.VinylGhost}]`);
        const rule = root?.querySelector(`[${DataAttr.VinylRule}]`);
        const glow = root?.querySelector(`[${DataAttr.VinylGlow}]`);
        if (!root || !pin || !disc || !mask || !title || !copy) {
          return;
        }
        const split = SplitText.create(title, {
          type: "words",
          aria: "auto",
          mask: "words",
        });
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: VINYL_PIN_END,
            pin: true,
            pinSpacing: true,
            anticipatePin: PIN_ANTICIPATE,
            scrub: VINYL_SCRUB,
            invalidateOnRefresh: true,
            id: VINYL_PIN_ID,
          },
        });
        timeline.fromTo(
          disc,
          { scale: VINYL_DISC_START_SCALE, rotation: 0 },
          { scale: VINYL_DISC_END_SCALE, rotation: 0, duration: 0.55 },
          0,
        );
        timeline.fromTo(
          mask,
          { scale: VINYL_MASK_START_SCALE, rotation: 0 },
          { scale: VINYL_MASK_END_SCALE, rotation: 0, duration: 0.55 },
          0,
        );
        if (glow) {
          timeline.fromTo(
            glow,
            { rotation: 0, scale: 0.75, autoAlpha: 0.35 },
            { rotation: VINYL_GLOW_ROTATION, scale: 1.2, autoAlpha: 1, duration: 1 },
            0,
          );
        }
        if (ghost) {
          timeline.fromTo(
            ghost,
            { xPercent: VINYL_GHOST_X_START, autoAlpha: 0.25 },
            { xPercent: VINYL_GHOST_X_END, autoAlpha: 0.7, duration: 1 },
            0,
          );
        }
        timeline.fromTo(
          split.words,
          { yPercent: VINYL_TITLE_Y_PERCENT, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, stagger: VINYL_TITLE_STAGGER, duration: 0.28 },
          0.08,
        );
        if (rule) {
          timeline.fromTo(
            rule,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.18 },
            0.32,
          );
        }
        timeline.fromTo(
          copy,
          { y: VINYL_COPY_Y, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.28 },
          0.38,
        );
      });
      return () => mm.revert();
    },
    { scope },
  );
}
