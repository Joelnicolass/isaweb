import { MaskKind } from "./constants";

export const s = {
  root: "[mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] will-change-transform",
};

export const kindStyles: Record<MaskKind, string> = {
  [MaskKind.Vinyl]: "[mask-image:url(/svg/vinyl-mask.svg)]",
  [MaskKind.Guitar]: "[mask-image:url(/svg/guitar-silhouette.svg)]",
};
