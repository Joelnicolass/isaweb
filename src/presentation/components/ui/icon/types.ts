import type { ComponentProps } from "react";
import type { IconName } from "./constants";

export type IconProps = {
  name: IconName;
  className?: string;
} & Omit<ComponentProps<"span">, "children">;
