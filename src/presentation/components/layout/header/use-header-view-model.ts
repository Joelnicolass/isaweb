"use client";

import { useRef, useState } from "react";
import { useMenuOverlay } from "@/presentation/animations/hooks/use-menu-overlay";
import { useScrollToSection } from "@/presentation/animations/hooks/use-scroll-to";
import { SITE } from "@/presentation/content/site";
import { NAV_ITEMS } from "@/shared/site";
import type { HeaderViewModel } from "./types";

export function useHeaderViewModel(): HeaderViewModel {
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  useMenuOverlay(overlay, open);
  const scrollTo = useScrollToSection();

  const goTo = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  const toggle = () => setOpen((current) => !current);

  return {
    open,
    setOpen,
    toggle,
    overlay,
    goTo,
    navItems: NAV_ITEMS,
    socials: SITE.socials,
  };
}
