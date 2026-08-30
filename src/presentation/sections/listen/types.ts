import type { RefObject } from "react";
import type { SocialLink } from "@/presentation/content/site";

export type ListenViewModel = {
  scope: RefObject<HTMLElement | null>;
  socials: readonly SocialLink[];
};
