import type { SocialLink } from "@/presentation/content/site";
import type { NavItem } from "@/shared/site";
import type { Dispatch, RefObject, SetStateAction } from "react";

export type HeaderViewModel = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  overlay: RefObject<HTMLDivElement | null>;
  goTo: (id: string) => void;
  navItems: readonly NavItem[];
  socials: readonly SocialLink[];
};
