export const s = {
  root: "relative flex min-h-dvh flex-col overflow-hidden bg-ink",
  stage:
    "@container relative z-10 mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-5 pb-28 pt-24 md:px-8 lg:px-12",
  cluster:
    "relative flex w-full flex-col items-center gap-8 md:flex-row md:items-center md:justify-between",
  copy: "relative z-10 flex w-full flex-col gap-6 md:w-[46%] md:shrink-0",
  photo:
    "relative z-0 flex w-[min(70cqi,40dvh)] shrink-0 justify-center p-6 md:ml-auto md:w-[54%] md:justify-end md:p-8",
  polaroidWrap: "relative w-full md:w-[min(100%,46dvh)]",
  photoSlab:
    "absolute inset-0 -translate-x-6 translate-y-6 bg-ember md:-translate-x-10 md:translate-y-8",
  polaroid:
    "pointer-events-none relative z-10 w-full origin-center rotate-[-6deg] bg-paper px-3 pt-3 pb-3 shadow-[12px_28px_60px_rgba(10,9,8,0.7)] md:px-4 md:pt-4 md:pb-4",
  frame: "relative aspect-square overflow-hidden bg-ink ring-1 ring-ink/20",
  layer: "absolute inset-0",
  image: "object-cover object-center",
  shutters:
    "pointer-events-none absolute inset-0 z-10 grid grid-cols-[repeat(14,minmax(0,1fr))]",
  shutter: "h-full w-full bg-ink will-change-transform",
  piano: "relative mt-2 h-11 select-none md:h-12",
  whites: "grid h-full grid-cols-[repeat(14,minmax(0,1fr))] gap-px bg-ink/25",
  whiteKey: "h-full origin-top bg-paper will-change-transform",
  blacks: "pointer-events-none absolute inset-x-0 top-0 grid h-[58%] grid-cols-[repeat(14,minmax(0,1fr))]",
  blackKey:
    "relative z-10 h-full w-[68%] translate-x-1/2 bg-ink shadow-[0_3px_0_rgba(10,9,8,0.45)] will-change-transform",
  meta: "flex flex-wrap items-center gap-3",
  kicker:
    "inline-block bg-ember px-3 py-2 font-mono text-[11px] uppercase tracking-[0.32em] text-ink",
  title:
    "max-w-[18ch] text-[16cqi] drop-shadow-[0_4px_18px_rgba(10,9,8,0.85)] md:text-[9cqi] lg:text-[8cqi]",
  subtitle: "font-serif text-2xl italic text-paper/80 md:text-3xl",
  cta: "bg-paper px-4 py-2 text-ink hover:bg-paper hover:text-ember",
};
