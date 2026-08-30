"use client";

import { Icon, IconName } from "@/presentation/components/ui/icon";
import { s } from "./styles";
import type { NextSectionButtonProps } from "./types";

export function NextSectionButton({ label, onClick }: NextSectionButtonProps) {
  return (
    <button type="button" className={s.root} onClick={onClick} aria-label={label}>
      <Icon name={IconName.ArrowDown} />
    </button>
  );
}
