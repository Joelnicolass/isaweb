"use client";

import { MorphIcon } from "morphicons/react";
import { cn } from "@/shared/cn";
import { ICON_NODE, ICON_SIZE, ICON_SPRING, ICON_STROKE } from "./constants";
import { maskStyles, s } from "./styles";
import type { IconProps } from "./types";

export function Icon({ name, className, ...props }: IconProps) {
  const node = ICON_NODE[name];
  if (node) {
    return (
      <MorphIcon
        icon={node}
        size={ICON_SIZE[name]}
        strokeWidth={ICON_STROKE}
        spring={ICON_SPRING}
        reducedMotion="user"
        className={cn(s.morph, className)}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(s.mask, maskStyles[name as keyof typeof maskStyles], className)}
      {...props}
    />
  );
}
