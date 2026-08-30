export const HERO_IMAGE_SIZES = "(min-width: 1024px) 640px, (min-width: 768px) 50vw, 42vh";

export const HERO_FRAMES = [
  "/images/hero-isa-soft.jpg",
  "/images/hero-isa-flare.jpg",
  "/images/hero-isa-glow.jpg",
] as const;

export const HERO_WHITE_KEYS = [
  "c1",
  "d1",
  "e1",
  "f1",
  "g1",
  "a1",
  "b1",
  "c2",
  "d2",
  "e2",
  "f2",
  "g2",
  "a2",
  "b2",
] as const;

export const HERO_BLACK_KEYS = [
  { id: "cs1", col: "col-start-1" },
  { id: "ds1", col: "col-start-2" },
  { id: "fs1", col: "col-start-4" },
  { id: "gs1", col: "col-start-5" },
  { id: "as1", col: "col-start-6" },
  { id: "cs2", col: "col-start-8" },
  { id: "ds2", col: "col-start-9" },
  { id: "fs2", col: "col-start-11" },
  { id: "gs2", col: "col-start-12" },
  { id: "as2", col: "col-start-13" },
] as const;
