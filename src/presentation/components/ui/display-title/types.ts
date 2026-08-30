import type { ComponentProps, ReactNode } from "react";

export type DisplayTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "p";
  className?: string;
} & Omit<ComponentProps<"h1">, "className" | "children">;
