import { cn } from "@/shared/cn";
import { s } from "./styles";
import type { DisplayTitleProps } from "./types";

export function DisplayTitle({
  children,
  as: Tag = "h1",
  className,
  ...props
}: DisplayTitleProps) {
  return (
    <Tag className={cn(s.root, className)} {...props}>
      {children}
    </Tag>
  );
}
