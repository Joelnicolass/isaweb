import type { RefObject } from "react";

export type TrackMarqueeViewModel = {
  scope: RefObject<HTMLElement | null>;
  items: readonly string[];
};
