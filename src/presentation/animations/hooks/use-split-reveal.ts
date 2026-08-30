"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import { HERO_PHOTO_DURATION, HERO_PHOTO_Y, HERO_STAGGER, MOTION_QUERIES } from "../constants";
import { gsap, SplitText, useGSAP } from "../gsap";

export function useSplitReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: MOTION_QUERIES.reduce,
          isMotion: MOTION_QUERIES.motion,
        },
        (context) => {
          const reduceMotion = context.conditions?.reduceMotion;
          const target = scope.current?.querySelector(selector);
          if (!target) {
            return;
          }
          if (reduceMotion) {
            gsap.set(target, { autoAlpha: 1, y: 0 });
            return;
          }
          const split = SplitText.create(target, {
            type: "chars,words",
            aria: "auto",
          });
          gsap.from(split.chars, {
            yPercent: 110,
            autoAlpha: 0,
            stagger: HERO_STAGGER,
            duration: 0.85,
            ease: "power3.out",
          });
        },
        scope,
      );
      return () => mm.revert();
    },
    { scope },
  );
}

export function useHeroPhoto(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERIES.motion, () => {
        const photo = scope.current?.querySelector(`[${DataAttr.HeroPhoto}]`);
        if (!photo) {
          return;
        }
        gsap.from(photo, {
          y: HERO_PHOTO_Y,
          autoAlpha: 0,
          duration: HERO_PHOTO_DURATION,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
