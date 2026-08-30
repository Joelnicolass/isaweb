import { cn } from "@/shared/cn";
import { s } from "./styles";
import type { SectionLabelProps } from "./types";

export function SectionLabel({ label, index, className }: SectionLabelProps) {
  return (
    <p className={cn(s.root, className)}>
      <span>{label}</span>
      <span className={s.index}>{index}</span>
    </p>
  );
}
