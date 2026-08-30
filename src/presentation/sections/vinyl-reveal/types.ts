import type { RefObject } from "react";
import type { Track } from "@/presentation/content/site";

export type VinylRevealViewModel = {
  scope: RefObject<HTMLDivElement | null>;
  track: Track;
  goNext: () => void;
};
