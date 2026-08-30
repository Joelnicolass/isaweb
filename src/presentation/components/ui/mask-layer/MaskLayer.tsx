import { cn } from "@/shared/cn";
import { kindStyles, s } from "./styles";
import type { MaskLayerProps } from "./types";

export function MaskLayer({ kind, children, className, ...props }: MaskLayerProps) {
  return (
    <div className={cn(s.root, kindStyles[kind], className)} {...props}>
      {children}
    </div>
  );
}
