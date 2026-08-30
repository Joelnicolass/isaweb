"use client";

import { useRef } from "react";
import { useListenStagger } from "@/presentation/animations/hooks/use-listen-stagger";
import { SITE } from "@/presentation/content/site";
import type { ListenViewModel } from "./types";

export function useListenViewModel(): ListenViewModel {
  const scope = useRef<HTMLElement>(null);
  useListenStagger(scope);
  return { scope, socials: SITE.socials };
}
