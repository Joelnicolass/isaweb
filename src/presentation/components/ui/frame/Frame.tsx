import { cn } from "@/shared/cn";
import { s } from "./styles";
import type { FrameProps } from "./types";

export function Frame({ children, className }: FrameProps) {
  return <div className={cn(s.root, className)}>{children}</div>;
}
