import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/cn";
import { ButtonVariant } from "./constants";
import { s, variantStyles } from "./styles";
import type { ButtonProps } from "./types";

export function Button({
  variant = ButtonVariant.Solid,
  asChild,
  className,
  href,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : href ? "a" : "button";
  return (
    <Comp
      className={cn(s.root, variantStyles[variant], className)}
      href={href}
      {...props}
    />
  );
}
