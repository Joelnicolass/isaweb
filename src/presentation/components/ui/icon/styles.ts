import { IconName } from "./constants";

export const s = {
  morph: "inline-flex shrink-0 cursor-pointer text-current",
  mask: "inline-block shrink-0 bg-current [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]",
};

export const maskStyles: Record<
  IconName.Spotify | IconName.Instagram | IconName.TikTok | IconName.Arrow,
  string
> = {
  [IconName.Spotify]:
    "size-5 [mask-image:url(/svg/icon-spotify.svg)] [-webkit-mask-image:url(/svg/icon-spotify.svg)]",
  [IconName.Instagram]:
    "size-5 [mask-image:url(/svg/icon-instagram.svg)] [-webkit-mask-image:url(/svg/icon-instagram.svg)]",
  [IconName.TikTok]:
    "size-5 [mask-image:url(/svg/icon-tiktok.svg)] [-webkit-mask-image:url(/svg/icon-tiktok.svg)]",
  [IconName.Arrow]:
    "h-3 w-24 [mask-image:url(/svg/icon-arrow.svg)] [-webkit-mask-image:url(/svg/icon-arrow.svg)]",
};
