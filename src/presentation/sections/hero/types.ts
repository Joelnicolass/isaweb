import type { RefObject } from "react";
import type { HERO_BLACK_KEYS, HERO_FRAMES, HERO_WHITE_KEYS } from "./constants";

export type HeroViewModel = {
  scope: RefObject<HTMLElement | null>;
  frames: typeof HERO_FRAMES;
  whiteKeys: typeof HERO_WHITE_KEYS;
  blackKeys: typeof HERO_BLACK_KEYS;
  goNext: () => void;
};
