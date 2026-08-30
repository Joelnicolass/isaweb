export const MOTION_QUERIES = {
  reduce: "(prefers-reduced-motion: reduce)",
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px)",
} as const;

export const MARQUEE_DURATION = 22;
export const VINYL_PIN_END = "+=1600";
export const SCROLL_TO_DURATION = 0.9;
export const HERO_STAGGER = 0.03;
export const HERO_PHOTO_Y = 28;
export const HERO_PHOTO_DURATION = 1.1;
export const LISTEN_STAGGER = 0.12;
export const VINYL_DISC_START_SCALE = 0.32;
export const VINYL_DISC_END_SCALE = 1;
export const VINYL_MASK_START_SCALE = 0.22;
export const VINYL_MASK_END_SCALE = 1;
export const VINYL_TITLE_Y_PERCENT = 110;
export const VINYL_TITLE_STAGGER = 0.14;
export const VINYL_COPY_Y = 48;
export const VINYL_GHOST_X_START = -12;
export const VINYL_GHOST_X_END = 8;
export const VINYL_GLOW_ROTATION = 160;
export const VINYL_SCRUB = 0.4;
export const VINYL_PIN_ID = "vinyl-pin";
export const VINYL_PIN_PLAY = 2.2;
export const PIN_ANTICIPATE = 1;
export const CTA_ARROW_NUDGE = 8;
export const CTA_ARROW_HOVER = 14;
export const CTA_ARROW_DURATION = 0.9;
export const CTA_ARROW_HOVER_DURATION = 0.28;
export const PIANO_PRESS_SCALE = 0.78;
export const PIANO_PRESS_DURATION = 0.12;
export const PIANO_ARPEGGIO_EACH = 0.2;
export const PIANO_FILL_EACH = 0.09;
export const PIANO_REVEAL_DURATION = 0.36;
export const PIANO_CLOSE_DURATION = 0.22;
export const PIANO_CLIP_DURATION = 1.4;
export const PIANO_PHRASE_HOLD = 0.45;
export const PIANO_CHORD_DURATION = 0.18;
export const PIANO_INTRO_DELAY = 0.45;
export const PIANO_REPEAT_DELAY = 0.4;
export const PIANO_KEY_IDLE = "#E8DFD0";
export const PIANO_KEY_HIT = "#E85D04";
export const PIANO_ARPEGGIO = [0, 4, 7, 11, 7, 4, 2, 5, 9, 13, 9, 5] as const;
