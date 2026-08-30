import { ArrowDown, Menu, X } from "lucide";
import type { IconNode } from "lucide";

export enum IconName {
  Spotify = "spotify",
  Instagram = "instagram",
  TikTok = "tiktok",
  Arrow = "arrow",
  ArrowDown = "arrow-down",
  Menu = "menu",
  Close = "close",
}

export const ICON_NODE: Partial<Record<IconName, IconNode>> = {
  [IconName.ArrowDown]: ArrowDown,
  [IconName.Menu]: Menu,
  [IconName.Close]: X,
};

export const ICON_SIZE: Partial<Record<IconName, number>> = {
  [IconName.ArrowDown]: 20,
  [IconName.Menu]: 22,
  [IconName.Close]: 22,
};

export const ICON_STROKE = 1.75;
export const ICON_SPRING = "snappy";
