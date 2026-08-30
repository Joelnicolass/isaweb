import type { ComponentProps } from "react";
import { ButtonVariant } from "./constants";

export type ButtonProps = ComponentProps<"button"> &
  ComponentProps<"a"> & {
    variant?: ButtonVariant;
    asChild?: boolean;
  };
