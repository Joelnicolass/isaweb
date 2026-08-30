import { ButtonVariant } from "./constants";

export const s = {
  root: "inline-flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-[0.28em] transition-colors duration-200 cursor-pointer disabled:opacity-40",
};

export const variantStyles: Record<ButtonVariant, string> = {
  [ButtonVariant.Solid]:
    "border border-paper bg-paper px-6 py-3 text-ink hover:border-ember hover:bg-ember",
  [ButtonVariant.Ghost]:
    "border border-transparent px-4 py-2 text-paper hover:text-ember",
  [ButtonVariant.Arrow]:
    "border-0 px-0 py-2 text-paper hover:text-ember",
};
