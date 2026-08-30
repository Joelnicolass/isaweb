"use client";

import type { RefObject } from "react";
import { DataAttr } from "@/presentation/shared/data-attr";
import {
  MOTION_QUERIES,
  PIANO_ARPEGGIO,
  PIANO_ARPEGGIO_EACH,
  PIANO_CHORD_DURATION,
  PIANO_CLIP_DURATION,
  PIANO_CLOSE_DURATION,
  PIANO_FILL_EACH,
  PIANO_INTRO_DELAY,
  PIANO_KEY_HIT,
  PIANO_KEY_IDLE,
  PIANO_PHRASE_HOLD,
  PIANO_PRESS_DURATION,
  PIANO_PRESS_SCALE,
  PIANO_REPEAT_DELAY,
  PIANO_REVEAL_DURATION,
} from "../constants";
import { gsap, useGSAP } from "../gsap";

export function usePianoPortrait(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: MOTION_QUERIES.reduce,
          isMotion: MOTION_QUERIES.motion,
        },
        (context) => {
          const root = scope.current;
          if (!root) {
            return;
          }

          const piano = root.querySelector<HTMLElement>(`[${DataAttr.HeroPiano}]`);
          const frames = gsap.utils.toArray<HTMLElement>(`[${DataAttr.HeroFrame}]`, root);
          const keys = gsap.utils.toArray<HTMLElement>(`[${DataAttr.HeroKey}]`, root);
          const blacks = gsap.utils.toArray<HTMLElement>(`[${DataAttr.HeroBlackKey}]`, root);
          const shutters = gsap.utils.toArray<HTMLElement>(`[${DataAttr.HeroShutter}]`, root);
          const count = keys.length;

          if (!piano || frames.length < 3 || count === 0) {
            return;
          }

          const [, flare, glow] = frames;
          const reduceMotion = context.conditions?.reduceMotion;
          const stepsEase = `steps(${count})`;

          gsap.set(keys, { transformOrigin: "50% 0%", backgroundColor: PIANO_KEY_IDLE });
          gsap.set(blacks, { transformOrigin: "50% 0%" });
          gsap.set(shutters, { transformOrigin: "50% 100%", scaleY: 1 });
          gsap.set([flare, glow], { autoAlpha: 1 });
          gsap.set(flare, { clipPath: "inset(0 100% 0 0)" });
          gsap.set(glow, { clipPath: "inset(0 0 0 100%)" });

          if (reduceMotion) {
            gsap.set(shutters, { scaleY: 0 });
            gsap.set([flare, glow], { autoAlpha: 0 });
            return;
          }

          const loop = gsap.timeline({
            delay: PIANO_INTRO_DELAY,
            repeat: -1,
            repeatDelay: PIANO_REPEAT_DELAY,
          });

          loop.set(shutters, { scaleY: 1 });
          loop.set(flare, { clipPath: "inset(0 100% 0 0)", autoAlpha: 1 });
          loop.set(glow, { clipPath: "inset(0 0 0 100%)", autoAlpha: 1 });

          const press = (target: Element | undefined, at: number) => {
            if (!target) {
              return;
            }
            loop.fromTo(
              target,
              { scaleY: 1, backgroundColor: PIANO_KEY_IDLE },
              {
                scaleY: PIANO_PRESS_SCALE,
                backgroundColor: PIANO_KEY_HIT,
                duration: PIANO_PRESS_DURATION,
                ease: "power3.in",
                yoyo: true,
                repeat: 1,
                immediateRender: false,
              },
              at,
            );
          };

          const opened = new Set<number>();
          let time = 0;

          PIANO_ARPEGGIO.forEach((index) => {
            press(keys[index], time);
            const shutter = shutters[index];
            if (shutter && !opened.has(index)) {
              loop.to(
                shutter,
                { scaleY: 0, duration: PIANO_REVEAL_DURATION, ease: "power3.inOut" },
                time,
              );
              opened.add(index);
            }
            time += PIANO_ARPEGGIO_EACH;
          });

          const rest = Array.from({ length: count }, (_, index) => index).filter((index) => !opened.has(index));
          rest.forEach((index, step) => {
            const at = time + step * PIANO_FILL_EACH;
            press(keys[index], at);
            const shutter = shutters[index];
            if (shutter) {
              loop.to(
                shutter,
                { scaleY: 0, duration: PIANO_REVEAL_DURATION, ease: "power3.inOut" },
                at,
              );
            }
          });

          const lastRevealStart = rest.length
            ? time + (rest.length - 1) * PIANO_FILL_EACH
            : Math.max(0, time - PIANO_ARPEGGIO_EACH);
          time = lastRevealStart + PIANO_REVEAL_DURATION + PIANO_PHRASE_HOLD;

          loop.addLabel("flareRun", time);
          loop.to(
            keys,
            {
              scaleY: PIANO_PRESS_SCALE,
              backgroundColor: PIANO_KEY_HIT,
              duration: PIANO_PRESS_DURATION,
              ease: "power3.in",
              yoyo: true,
              repeat: 1,
              stagger: { each: PIANO_FILL_EACH, from: "start" },
              immediateRender: false,
            },
            "flareRun",
          );
          loop.to(
            flare,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: PIANO_CLIP_DURATION,
              ease: stepsEase,
            },
            "flareRun",
          );

          loop.addLabel("glowRun", `+=${PIANO_PHRASE_HOLD}`);
          loop.to(
            keys,
            {
              scaleY: PIANO_PRESS_SCALE,
              backgroundColor: PIANO_KEY_HIT,
              duration: PIANO_PRESS_DURATION,
              ease: "power3.in",
              yoyo: true,
              repeat: 1,
              stagger: { each: PIANO_FILL_EACH, from: "end" },
              immediateRender: false,
            },
            "glowRun",
          );
          loop.to(
            glow,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: PIANO_CLIP_DURATION,
              ease: stepsEase,
            },
            "glowRun",
          );

          loop.addLabel("close", `+=${PIANO_PHRASE_HOLD}`);
          loop.to(
            [...keys, ...blacks],
            {
              scaleY: PIANO_PRESS_SCALE,
              duration: PIANO_CHORD_DURATION,
              ease: "power2.in",
              yoyo: true,
              repeat: 1,
            },
            "close",
          );
          loop.set(flare, { clipPath: "inset(0 100% 0 0)" }, "close");
          loop.set(glow, { clipPath: "inset(0 0 0 100%)" }, "close");
          loop.to(
            shutters,
            {
              scaleY: 1,
              duration: PIANO_CLOSE_DURATION,
              ease: "power3.in",
              stagger: { each: PIANO_FILL_EACH, from: "edges" },
            },
            "close",
          );

          return () => {
            loop.kill();
          };
        },
        scope,
      );
      return () => mm.revert();
    },
    { scope },
  );
}
